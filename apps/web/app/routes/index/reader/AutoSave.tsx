import { $generateHtmlFromNodes } from "@lexical/html";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useRouteLoaderData } from "@remix-run/react";
import { useFormikContext } from "formik";
import type { EditorState, LexicalEditor } from "lexical";
import { useCallback, useEffect } from "react";
import type { EditorFormikValues } from "../../../components/Editor";
import { useDebounce } from "../../../hooks/useDebounce";
import type { RootData } from "../../../root";

export function Autosave() {
  const rootLoader = useRouteLoaderData("root") as RootData;
  const { values, handleSubmit, setFieldValue } =
    useFormikContext<EditorFormikValues>();

  const debouncedEditor = useDebounce(values.bodyLexical, 2000);

  useEffect(() => {
    if (
      debouncedEditor &&
      debouncedEditor !== null &&
      debouncedEditor !== undefined
    ) {
      handleSubmit();
    }
  }, [debouncedEditor, handleSubmit]);

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
