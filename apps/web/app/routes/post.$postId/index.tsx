import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import {
  Outlet,
  useActionData,
  useFetcher,
  useLoaderData,
  useRouteLoaderData,
} from "@remix-run/react";
import type {
  ActionFunction,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/server-runtime";
import { json, redirect } from "@remix-run/server-runtime";
import type { FormikHelpers } from "formik";
import { FormikProvider, useFormik } from "formik";
import { Container } from "gestalt";
import { useCallback, useEffect, useMemo } from "react";
import slug from "slug";
import Editor from "~/components/Editor";
import PlaygroundNodes from "~/components/editor/nodes/PlaygroundNodes";
import { sdk } from "~/graphql/graphqlWrapper.server";
import type { RootData } from "~/root";
import PlaygroundEditorTheme from "../../components/editor/themes/PlaygroundEditorTheme";
import { Autosave } from "./AutoSave";
import Controls from "./Controls";
import ShareAfterSubmit from "./ShareAfterSubmit";
import type { PostActionData, PostData, PostFormValues } from "./types";
import { PostActionEnum, UpdatePostSchema } from "./types";

import playgourndCss from "@bespoke/common/dist/index.css";
import eidtorCss from "../../components/editor/editor.css";
import editorTextAreaCss from "../../components/editor/editorTextArea.css";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot } from "lexical";
import { links as editorLinks } from "../../components/Editor";
import { isPrivateRoute } from "../../utils/utils.server";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

export const meta: MetaFunction = ({ parentsData, data }) => {
  const rootData = parentsData.root as RootData;
  const loaderData = data as PostData;

  const title = `${
    loaderData.post?.title ? loaderData.post.title : "Untitled"
  } | ${rootData.store?.name}`;
  return {
    title,
    description: `${loaderData.post?.subTitle}`,
  };
};

export const links: LinksFunction = () => {
  return [
    ...editorLinks(),
    {
      rel: "stylesheet",
      href: eidtorCss,
    },
    {
      rel: "stylesheet",
      href: editorTextAreaCss,
    },
    {
      rel: "stylesheet",
      href: playgourndCss,
    },
  ];
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const isPrivate = await isPrivateRoute(request);
  if (isPrivate == false) {
    return redirect("/");
  }

  const postId = params.postId;
  if (!postId) return redirect("/");

  const post = await sdk.GetPost(
    {
      postId,
    },
    { request }
  );

  return json<PostData>({
    post: post.getPost,
  });
};

export const action: ActionFunction = async ({ request, params }) => {
  try {
    const formData = await request.formData();
    const action = formData.get("_action");
    const postId = params.postId;

    if (!postId) return null;

    const updatePost = async () => {
      const bodyLexical = formData.get("bodyLexical") as string;
      const bodyHTML = formData.get("bodyHTML") as string;
      const subTitle = formData.get("subTitle") as string;
      const title = formData.get("title") as string;
      const imageSrc = formData.get("imageSrc") as string;
      const imageHeight = formData.get("imageHeight") as string;
      const imageWidth = formData.get("imageWidth") as string;
      return await sdk.UpdatePost(
        {
          input: {
            bodyLexical,
            bodyHTML,
            postId,
            subTitle,
            title,
            image:
              imageSrc === "undefined"
                ? undefined
                : {
                    src: imageSrc,
                    height: Number(imageHeight),
                    width: Number(imageWidth),
                  },
          },
        },
        { request, forbiddenRedirect: "/" }
      );
    };

    if (action === PostActionEnum.updatePost) {
      const saved = await updatePost();
      return saved.updatePost;
    }

    if (action === PostActionEnum.deletePost) {
      const isDraft = formData.get("isDraft") as string;
      await sdk.DeletePost(
        {
          postId,
        },
        {
          request,
        }
      );
      if (isDraft === "true") {
        return redirect("/drafts");
      } else {
        return redirect("/");
      }
    }

    if (action === PostActionEnum.publishPostHere) {
      await updatePost();
      const handle = formData.get("handle") as string;
      const response = await sdk.PublishPostHere(
        {
          postId,
          postHandle: slug(handle),
        },
        { request, forbiddenRedirect: "/" }
      );
      if (response.publishPostHere) {
        return json<PostActionData>({
          share: true,
        });
      }
    }
    if (action === PostActionEnum.unpublish) {
      await sdk.UnpublishPost(
        {
          postId,
        },
        { request, forbiddenRedirect: "/" }
      );
    }
    if (action === PostActionEnum.publishPostToList) {
      await updatePost();
      const listId = formData.get("listId") as string;
      const handle = formData.get("handle") as string;
      const response = await sdk.PublishPostToList(
        { listId, postId, postHandle: slug(handle) },
        { request }
      );

      if (response.publishPostToList) {
        return json<PostActionData>({
          share: true,
        });
      }
    }

    return null;
  } catch (err) {
    if (err instanceof Response) throw err;
    return { errors: err };
  }
};

function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.focus();
    const rootElement = editor.getRootElement();
    if (rootElement !== null) {
      editor.update(() => {
        const root = $getRoot();
        if (root.getChildrenSize() === 0) {
          root.selectStart();
        }
      });
    }
  }, [editor]);
  return null;
}

const Home = () => {
  const fetcher = useFetcher();
  const loaderData = useLoaderData<PostData>();
  const rootLoader = useRouteLoaderData("root") as RootData;
  const actionData = useActionData<PostActionData>();

  const initialConfig = useMemo(
    () => ({
      editorState:
        !loaderData.post?.bodyLexical ||
        loaderData.post.bodyLexical === "" ||
        loaderData.post.bodyLexical ===
          '{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}'
          ? null
          : loaderData.post?.bodyLexical,
      editable: rootLoader?.isUserSubdomain,
      namespace: "Playground",
      nodes: [...PlaygroundNodes],
      onError: (error: Error) => {
        throw error;
      },
      theme: PlaygroundEditorTheme,
    }),
    [loaderData.post?.bodyLexical, rootLoader?.isUserSubdomain]
  );

  const handleSubmit = useCallback(
    (values: PostFormValues, action: FormikHelpers<PostFormValues>) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("subTitle", values.subTitle ? values.subTitle : "");
      formData.append("bodyLexical", values.bodyLexical);
      formData.append("bodyHTML", values.bodyHTML);
      formData.append(
        "imageSrc",
        values.imageSrc ? values.imageSrc : "undefined"
      );
      formData.append(
        "imageWidth",
        values.imageWidth ? String(values.imageWidth) : "undefined"
      );
      formData.append(
        "imageHeight",
        values.imageHeight ? String(values.imageHeight) : "undefined"
      );
      if (values.submitState === "save") {
        formData.append("_action", PostActionEnum.updatePost);
        fetcher.submit(formData, { method: "post", replace: true });
      } else if (values.submitState === "publishToBespoke") {
        formData.append("_action", PostActionEnum.publishPostHere);
        if (values.handle === "") {
          return action.setFieldError("handle", "Please add a post URL");
        } else {
          formData.append("handle", values.handle);
          fetcher.submit(formData, { method: "post", replace: true });
        }
      } else if (values.submitState === "unpublish") {
        formData.append("_action", PostActionEnum.unpublish);
        fetcher.submit(formData, { method: "post", replace: true });
      } else if (values.submitState === "emailBlast") {
        if (values.handle === "") {
          return action.setFieldError("handle", "Please add a post URL");
        } else {
          formData.append("listId", values.listId);
          formData.append("handle", values.handle);
          formData.append("_action", PostActionEnum.publishPostToList);
          fetcher.submit(formData, { method: "post", replace: true });
        }
      }
    },
    [fetcher]
  );

  const formik = useFormik<PostFormValues>({
    initialValues: {
      title: loaderData.post?.title ?? "",
      subTitle: loaderData.post?.subTitle ?? "",
      bodyLexical: loaderData.post?.bodyLexical ?? "",
      bodyHTML: loaderData.post?.bodyHTML ?? "",
      imageSrc: loaderData.post?.image?.src,
      imageWidth: loaderData.post?.image?.width,
      imageHeight: loaderData.post?.image?.height,
      submitState: "save",
      listId: "",
      handle: loaderData.post?.postHandle
        ? loaderData.post.postHandle
        : loaderData.post?.title
        ? slug(loaderData.post.title)
        : "untitled",
    },
    onSubmit: handleSubmit,
    validationSchema: UpdatePostSchema,
  });

  if (actionData?.share === true) {
    return <ShareAfterSubmit />;
  }

  return (
    <Container>
      <FormikProvider value={formik}>
        <LexicalComposer initialConfig={initialConfig}>
          <Controls fetcher={fetcher} />
          <div className="editor-shell">
            <Editor
              disableOptionAndTime={true}
              editable={rootLoader?.isUserSubdomain}
            />
          </div>
          <HistoryPlugin />
          <MyCustomAutoFocusPlugin />
          <Autosave />
        </LexicalComposer>
      </FormikProvider>
      <Outlet />
    </Container>
  );
};
export default Home;
