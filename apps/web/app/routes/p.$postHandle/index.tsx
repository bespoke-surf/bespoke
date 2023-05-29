import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import type {
  HeadersFunction,
  LinksFunction,
  LoaderArgs,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { FormikProvider, useFormik } from "formik";
import { Container } from "gestalt";
import { useMemo } from "react";
import type { StructuredDataFunction } from "remix-utils";
import { getClientIPAddress, redirectBack } from "remix-utils";
import PlaygroundNodes from "../../components/editor/nodes/PlaygroundNodes";
import PlaygroundEditorTheme from "../../components/editor/themes/PlaygroundEditorTheme";
import { sdk } from "../../graphql/graphqlWrapper.server";
import type { RootData } from "../../root";
import AfterPost from "./AfterPost";
import type { PostByHandleData, PostByHandleValues } from "./types";

import playgourndCss from "@bespoke/common/dist/index.css";
import type { BlogPosting } from "schema-dts";
import eidtorCss from "../../components/editor/editor.css";
import editorTextAreaCss from "../../components/editor/editorTextArea.css";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import { parseCampaign } from "../../utils/utmExtractor.server";

import Editor, { links as editorLinks } from "../../components/Editor";
import { isPrivateRoute } from "../../utils/utils.server";
import PostFooter from "./Footer";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return {
    "cache-control": loaderHeaders.get("cache-control") ?? "no-store",
  };
};

let structuredData: StructuredDataFunction<PostByHandleData, BlogPosting> = ({
  data,
}) => {
  let { post } = data;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    about: post?.subTitle ?? undefined,
    headline: post?.title ?? undefined,
    thumbnailUrl: post?.image?.src ?? undefined,
    datePublished: post?.publishedDate,
    image: post?.image?.src,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${post?.postHandle}`,
    },
  };
};

export let handle = { structuredData };

export const meta: MetaFunction = ({ parentsData, data }) => {
  const rootData = parentsData.root as RootData;
  const loaderData = data as PostByHandleData;

  const title = `${loaderData.post?.title} | ${rootData.store?.name}`;
  const description = `${loaderData.post?.subTitle}`;
  return {
    title,
    description: `${loaderData.post?.subTitle}`,
    "og:url": `https://${rootData.store?.subdomain}.bespoke.surf/p/${loaderData.post?.postHandle}`,
    "og:title": title,
    "og:site_name": `Bespoke`,
    "og:type": "website",
    "og:description": description,
    "og:image": loaderData.post?.image?.src,
    "og:image:secure_url": loaderData.post?.image?.src,
    "og:image:width": `${loaderData.post?.image?.width}`,
    "og:image:height": `${loaderData.post?.image?.height}`,
    "og:image:alt": loaderData.post?.title,
    "twitter:card": "summary_large_image",
    "twitter:title": title,
    "twitter:image": loaderData.post?.image?.src,
    "twitter:image:alt": loaderData.post?.title,
    "twitter:description": description,
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

export async function loader({ params, request }: LoaderArgs) {
  const postHandle = params.postHandle;

  const ipAddress = getClientIPAddress(request);
  const isPrivate = await isPrivateRoute(request, true);

  const referer = request.headers.get("referer");

  const campaign = parseCampaign(request.url);

  if (!postHandle) return redirectBack(request, { fallback: "/" });

  const response = await Promise.all([
    sdk.GetPostByHandle(
      {
        postHandle,
      },
      { request }
    ),
    sdk.GetMorePosts(
      {
        postHandle,
      },
      { request }
    ),
    sdk.CreatePostViewed({
      input: {
        postHandle,
        ipAddress,
        referer,
        utmData: {
          ...campaign,
        },
      },
    }),
  ]);
  const post = response[0].getPostByHandle;
  const morePosts = response[1].getMorePosts;

  let oneDayMs = 8640000000;
  let millisecondPublised = Date.now() - Date.parse(post?.publishedDate);

  const getMaxAge = millisecondPublised < oneDayMs ? "1800" : "2628000";

  return json<PostByHandleData>(
    {
      post,
      morePosts,
    },
    {
      headers: {
        "cache-control": isPrivate
          ? "private, max-age=1"
          : `public, s-maxage=${getMaxAge}, stale-while-revalidate=31536000, stale-if-error=86400`,
      },
    }
  );
}

export default function PostHandle() {
  const loaderData = useLoaderData<PostByHandleData>();

  const initialConfig = useMemo(
    () => ({
      editorState:
        loaderData.post?.bodyLexical === ""
          ? null
          : loaderData.post?.bodyLexical,
      editable: false,
      namespace: "Playground",
      nodes: PlaygroundNodes,
      onError: (error: Error) => {
        throw error;
      },
      theme: PlaygroundEditorTheme,
    }),
    [loaderData.post?.bodyLexical]
  );

  const formik = useFormik<PostByHandleValues>({
    initialValues: {
      title: loaderData.post?.title ?? "",
      subTitle: loaderData.post?.subTitle ?? "",
      bodyLexical: loaderData.post?.bodyLexical ?? "",
      bodyHTML: loaderData.post?.bodyHTML ?? "",
      imageSrc: loaderData.post?.image?.src,
      imageWidth: loaderData.post?.image?.width,
      imageHeight: loaderData.post?.image?.height,
    },
    onSubmit: () => undefined,
  });

  return (
    <Container>
      <FormikProvider value={formik}>
        <LexicalComposer initialConfig={initialConfig}>
          <div className="editor-shell">
            <Editor
              disableToolbar={true}
              editable={false}
              disableTitle
              disableSubtitle
              enableHeading
            />
          </div>
          <HistoryPlugin />
        </LexicalComposer>
      </FormikProvider>
      <Outlet />
      <AfterPost />
      <PostFooter />
    </Container>
  );
}
