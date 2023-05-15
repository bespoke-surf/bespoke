import { CompositeZIndex, FixedZIndex, Layer, Modal } from "gestalt";

import type { InitialConfigType } from "@lexical/react/LexicalComposer";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { useFormikContext } from "formik";
import { useMemo } from "react";
import type { CommentEditorFormikValues } from "../../components/CommentEditor";
import CommentEditor from "../../components/CommentEditor";
import PlaygroundNodes from "../../components/editor/nodes/PlaygroundNodes";
import PlaygroundEditorTheme from "../../components/editor/themes/PlaygroundEditorTheme";

const HEADER_ZINDEX = new FixedZIndex(10);
const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

export default function ShowMore({ close }: { close: () => void }) {
  const { values } = useFormikContext<CommentEditorFormikValues>();

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
        onDismiss={close}
        size="md"
      >
        <LexicalComposer initialConfig={initialConfig}>
          <div className="editor-shell">
            <CommentEditor renderAsComment={true} />
          </div>
          <HistoryPlugin />
        </LexicalComposer>
      </Modal>
    </Layer>
  );
}
