import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useRouteLoaderData } from "@remix-run/react";
import { FormikProvider, useFormik } from "formik";
import { Box, CompositeZIndex, Container, FixedZIndex, Layer } from "gestalt";
import { useCallback, useEffect, useMemo } from "react";
import type { EditorFormikValues } from "../../components/Editor";
import Editor from "../../components/Editor";
import PlaygroundNodes from "../../components/editor/nodes/PlaygroundNodes";
import PlaygroundEditorTheme from "../../components/editor/themes/PlaygroundEditorTheme";

import type { RootData } from "../../root";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import { isPrivateRoute } from "../../utils/utils.server";
import { action } from "../about.edit/action";
import Controls from "./Control";
import { prepopulatedAboutEditor } from "./prepopulateAboutEditor";
import { AboutActionEnum } from "./types";
import { UpdateOnChange } from "./UpdateOnChange";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};
export { action };

export const meta: MetaFunction = () => {
  return {
    title: "Edit About Page",
    description: "Edit the about page",
  };
};

export async function loader({ request }: LoaderArgs) {
  const isPrivate = await isPrivateRoute(request);
  if (isPrivate == false) {
    return redirect("/");
  }

  return null;
}

const HEADER_ZINDEX = new FixedZIndex(2);
const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    editor.focus();
  }, [editor]);
  return null;
}

export default function EditAbout() {
  const rootLoader = useRouteLoaderData("root") as RootData;
  const fetcher = useFetcher();

  const loading = fetcher.state === "loading" || fetcher.state === "submitting";

  const initialConfig: React.ComponentProps<
    typeof LexicalComposer
  >["initialConfig"] = useMemo(
    () => ({
      editorState:
        rootLoader?.store?.about?.aboutLexical === null ||
        rootLoader.store?.about?.aboutLexical === undefined
          ? prepopulatedAboutEditor
          : rootLoader.store.about.aboutLexical,
      editable: true,
      namespace: "Playground",
      nodes: [...PlaygroundNodes],
      onError: (error: Error) => {
        throw error;
      },
      theme: PlaygroundEditorTheme,
    }),
    [rootLoader?.store?.about?.aboutLexical]
  );

  const formik = useFormik<EditorFormikValues>({
    initialValues: {
      title: "About",
      bodyHTML: rootLoader?.store?.about?.aboutHTML ?? "",
      bodyLexical: rootLoader?.store?.about?.aboutLexical ?? "",
    },
    onSubmit: useCallback(
      (values: EditorFormikValues) => {
        const formData = new FormData();
        formData.append("aboutLexical", values.bodyLexical);
        formData.append("aboutHTML", values.bodyHTML);
        formData.append("about", rootLoader?.store?.about?.about ?? "");
        formData.append("aboutId", rootLoader?.store?.about?.id ?? "");
        formData.append("_action", AboutActionEnum.updateAbout);
        fetcher.submit(formData, { method: "post" });
      },
      [fetcher, rootLoader?.store?.about?.about, rootLoader?.store?.about?.id]
    ),
  });

  return (
    <Layer zIndex={zIndex}>
      <Box
        color="default"
        position="fixed"
        top
        left
        right
        bottom
        display="flex"
        direction="column"
      >
        <Container>
          <FormikProvider value={formik}>
            <LexicalComposer initialConfig={initialConfig}>
              <Controls loading={loading} />
              <div className="editor-shell">
                <Editor
                  disableShare
                  disableProduct
                  disablePostImage={true}
                  disableOptionAndTime={true}
                  disableSubtitle
                  disableTitle
                />
              </div>
              <HistoryPlugin />
              <MyCustomAutoFocusPlugin />
              <UpdateOnChange />
            </LexicalComposer>
          </FormikProvider>
        </Container>
      </Box>
    </Layer>
  );
}
