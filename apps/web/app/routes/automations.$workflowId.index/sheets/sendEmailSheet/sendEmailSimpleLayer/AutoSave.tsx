import { $generateHtmlFromNodes } from "@lexical/html";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useRouteLoaderData } from "@remix-run/react";
import { useFormikContext } from "formik";
import type { EditorState, LexicalEditor } from "lexical";
import { useCallback } from "react";
import type { RootData } from "../../../../../root";
import type { SendEmailSimpleLayerValue } from "../SendEmailSimpleLayer";

export function UpdateOnChange() {
  const rootLoader = useRouteLoaderData("root") as RootData;
  const { setFieldValue } = useFormikContext<SendEmailSimpleLayerValue>();

  const handleOnChange = useCallback(
    (editorState: EditorState, editor: LexicalEditor) => {
      editor.update(() => {
        const generatedHtml = $generateHtmlFromNodes(editor, null);
        setFieldValue("bodyHTML", generatedHtml);
      });
      setFieldValue("bodyLexical", JSON.stringify(editorState));
    },
    [setFieldValue]
  );

  if (!rootLoader?.isUserSubdomain) return null;

  return <OnChangePlugin onChange={handleOnChange} />;
}
