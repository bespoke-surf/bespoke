import playgourndCss from "@bespoke/common/dist/index.css";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import type { LinksFunction } from "@remix-run/node";
import { useLoaderData, useRouteLoaderData, useSubmit } from "@remix-run/react";
import { FormikProvider, useFormik } from "formik";
import {
  Box,
  CompositeZIndex,
  Container,
  FixedZIndex,
  Flex,
  Layer,
  Text,
} from "gestalt";
import { useCallback, useEffect } from "react";
import PlaygroundNodes from "~/components/editor/nodes/PlaygroundNodes";
import type { RootData } from "~/root";
import type { EditorFormikValues } from "../../components/Editor";
import Editor, { links as editorLinks } from "../../components/Editor";
import PlaygroundEditorTheme from "../../components/editor/themes/PlaygroundEditorTheme";
import { Autosave } from "./reader/AutoSave";
import Controls from "./reader/Controls";
import type { IndexData } from "./types";
import { CreateNewPostSchema, IndexActionEnum } from "./types";

import eidtorCss from "../../components/editor/editor.css";
import editorTextAreaCss from "../../components/editor/editorTextArea.css";
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

const HEADER_ZINDEX = new FixedZIndex(2);
const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

const PostCreate = ({ close }: { close: () => void }) => {
  const loaderData = useLoaderData<IndexData>();
  const rootLoaderData = useRouteLoaderData("root") as RootData;

  const postIsEmpty = !loaderData?.posts || loaderData?.posts?.length === 0;

  if (postIsEmpty && !rootLoaderData?.isUserSubdomain) {
    return (
      <Flex alignItems="center" height="100vh" justifyContent="center">
        <Text>{rootLoaderData?.store?.name} hasn't published anything</Text>
      </Flex>
    );
  }

  return (
    <Layer zIndex={zIndex}>
      <Box color="default">
        <Container>
          <PostEditor close={close} />
        </Container>
      </Box>
    </Layer>
  );
};
export default PostCreate;

function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus();
  }, [editor]);

  return null;
}

const initialConfig = {
  editorState: null,
  editable: true,
  namespace: "Playground",
  nodes: [...PlaygroundNodes],
  onError: (error: Error) => {
    throw error;
  },
  theme: PlaygroundEditorTheme,
};

const PostEditor = ({ close }: { close: () => void }) => {
  const submit = useSubmit();
  const rootLoaderData = useRouteLoaderData("root") as RootData;

  const handleSubmit = useCallback(
    (values: EditorFormikValues) => {
      if (!rootLoaderData?.store?.id) return;
      const formData = new FormData();
      formData.append("_action", IndexActionEnum.createPost);
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
      formData.append("storeId", rootLoaderData.store?.id);
      submit(formData, { method: "post" });
    },
    [submit, rootLoaderData?.store?.id]
  );

  const formik = useFormik<EditorFormikValues>({
    initialValues: {
      title: "",
      subTitle: "",
      bodyLexical: "",
      bodyHTML: "",
      imageSrc: undefined,
      imageHeight: undefined,
      imageWidth: undefined,
    },
    enableReinitialize: true,
    onSubmit: handleSubmit,
    validationSchema: CreateNewPostSchema,
  });

  return (
    <Container>
      <FormikProvider value={formik}>
        <LexicalComposer initialConfig={initialConfig}>
          <Controls close={close} />
          <div className="editor-shell">
            <Editor disableToolbar={false} disableOptionAndTime={true} />
          </div>
          <Autosave />
          <HistoryPlugin />
          <MyCustomAutoFocusPlugin />
          <ClearEditorPlugin />
        </LexicalComposer>
      </FormikProvider>
    </Container>
  );
};
