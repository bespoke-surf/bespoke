import {
  Box,
  Button,
  CompositeZIndex,
  FixedZIndex,
  Flex,
  Heading,
  IconButton,
  Layer,
  Modal,
  Spinner,
  Text,
} from "gestalt";
import { useEffect, useMemo } from "react";

import type { InitialConfigType } from "@lexical/react/LexicalComposer";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { useFormikContext } from "formik";
import { $getRoot } from "lexical";
import type { CommentEditorFormikValues } from "../../components/CommentEditor";
import CommentEditor from "../../components/CommentEditor";
import PlaygroundNodes from "../../components/editor/nodes/PlaygroundNodes";
import PlaygroundEditorTheme from "../../components/editor/themes/PlaygroundEditorTheme";
import { UpdateOnChange } from "./UpdateOnChange";

const HEADER_ZINDEX = new FixedZIndex(10);
const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

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

export default function ShareToCommunity({
  close,
  convert,
  loading,
}: {
  convert: boolean;
  close: () => void;
  loading: boolean;
}) {
  const { handleSubmit, values } =
    useFormikContext<CommentEditorFormikValues>();

  const initialConfig: InitialConfigType = useMemo(
    () => ({
      editorState: values.descriptionLexical ?? null,
      editable: true,
      namespace: "Playground",
      nodes: [...PlaygroundNodes],
      onError: (error: Error) => {
        throw error;
      },
      theme: PlaygroundEditorTheme,
    }),
    [values.descriptionLexical]
  );

  return (
    <Layer zIndex={zIndex}>
      <Modal
        accessibilityModalLabel="Choose how to claim site"
        align="start"
        heading={
          <Flex direction="column" gap={2}>
            <Flex justifyContent="between">
              <Heading size="500" accessibilityLevel={1}>
                {convert ? "Share To Community" : "Edit Description"}
              </Heading>
              <IconButton
                accessibilityLabel="Dismiss modal"
                bgColor="white"
                icon="cancel"
                iconColor="darkGray"
                onClick={close}
                size="sm"
              />
            </Flex>
            <Text>
              Please provide a description of the automation system you have
              developed so the community can easily understand before
              replicating.
            </Text>
          </Flex>
        }
        onDismiss={close}
        footer={
          <>
            {loading ? (
              <Flex justifyContent="end">
                <Box>
                  <Spinner accessibilityLabel="loading" show={true} />
                </Box>
              </Flex>
            ) : (
              <>
                <Flex justifyContent="end" gap={2}>
                  <Button
                    color="gray"
                    text="Cancel"
                    onClick={close}
                    size="lg"
                  />

                  <Button
                    color="red"
                    text={convert ? "Share" : "Update"}
                    size="lg"
                    onClick={() => handleSubmit()}
                    disabled={loading}
                  />
                </Flex>
              </>
            )}
          </>
        }
        size="md"
      >
        <LexicalComposer initialConfig={initialConfig}>
          <div className="editor-shell">
            <CommentEditor />
          </div>
          <HistoryPlugin />
          <MyCustomAutoFocusPlugin />
          <UpdateOnChange />
        </LexicalComposer>
      </Modal>
    </Layer>
  );
}
