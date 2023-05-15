import { $generateHtmlFromNodes } from "@lexical/html";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLoaderData, useRouteLoaderData } from "@remix-run/react";
import { useFormikContext } from "formik";
import type { EditorState, LexicalEditor } from "lexical";
import { useCallback, useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import type { RootData } from "../../root";
import type { PostData, PostFormValues, submitStateType } from "./types";

export function Autosave() {
  const rootLoader = useRouteLoaderData("root") as RootData;
  const loaderData = useLoaderData<PostData>();
  const { values, handleSubmit, setFieldValue } =
    useFormikContext<PostFormValues>();

  const debouncedEditor = useDebounce(values.bodyLexical, 2000);

  useEffect(() => {
    if (debouncedEditor && debouncedEditor !== loaderData.post?.bodyLexical) {
      console.log("submitted");
      handleSubmit();
    }
  }, [debouncedEditor, handleSubmit, loaderData.post?.bodyLexical]);

  const handleOnChange = useCallback(
    (editorState: EditorState, editor: LexicalEditor) => {
      editor.update(() => {
        const generatedHtml = $generateHtmlFromNodes(editor, null);
        setFieldValue("bodyHTML", generatedHtml);
      });
      setFieldValue("bodyLexical", JSON.stringify(editorState));
      setFieldValue("submitState", "save" as submitStateType);
    },
    [setFieldValue]
  );

  if (!rootLoader?.isUserSubdomain) return null;

  return <OnChangePlugin onChange={handleOnChange} />;
}
