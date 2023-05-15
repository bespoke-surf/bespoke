import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useRouteLoaderData } from "@remix-run/react";
import { FormikProvider, useFormik } from "formik";
import React, { useMemo } from "react";
import type { EditorFormikValues } from "~/components/Editor";
import Editor from "~/components/Editor";
import PlaygroundNodes from "~/components/editor/nodes/PlaygroundNodes";
import type { RootData } from "~/root";
import PlaygroundEditorTheme from "../../components/editor/themes/PlaygroundEditorTheme";
import { prepopulatedAboutEditor } from "../about.edit/prepopulateAboutEditor";

export default function AboutIndex() {
  const rootLoader = useRouteLoaderData("root") as RootData;

  const initialConfig: React.ComponentProps<
    typeof LexicalComposer
  >["initialConfig"] = useMemo(
    () => ({
      editorState:
        rootLoader?.store?.about?.aboutLexical === null ||
        rootLoader.store?.about?.aboutLexical === undefined
          ? prepopulatedAboutEditor
          : rootLoader.store.about.aboutLexical,
      editable: false,
      namespace: "Playground",
      nodes: [...PlaygroundNodes],
      onError: (error: Error) => {
        throw error;
      },
      theme: PlaygroundEditorTheme,
    }),
    [rootLoader.store?.about?.aboutLexical]
  );

  const formik = useFormik<EditorFormikValues>({
    initialValues: {
      title: "About",
      bodyHTML: rootLoader?.store?.about?.aboutHTML ?? "",
      bodyLexical: rootLoader?.store?.about?.aboutLexical ?? "",
    },
    onSubmit: () => undefined,
  });
  return (
    <FormikProvider value={formik}>
      <LexicalComposer initialConfig={initialConfig}>
        <div className="editor-shell">
          <Editor
            disableEditorTopMargin
            disableButtons
            disableProduct
            disablePostImage={true}
            disableToolbar={true}
            disableOptionAndTime={true}
            disableSubtitle
            disableTitle
          />
        </div>
      </LexicalComposer>
    </FormikProvider>
  );
}
