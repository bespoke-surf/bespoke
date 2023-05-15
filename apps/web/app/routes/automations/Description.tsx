import type { InitialConfigType } from "@lexical/react/LexicalComposer";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { useFormikContext } from "formik";
import { Box, Flex } from "gestalt";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CommentEditorFormikValues } from "../../components/CommentEditor";
import CommentEditor from "../../components/CommentEditor";
import PlaygroundNodes from "../../components/editor/nodes/PlaygroundNodes";
import PlaygroundEditorTheme from "../../components/editor/themes/PlaygroundEditorTheme";

function UpdateEditoState() {
  const { values } = useFormikContext<CommentEditorFormikValues>();

  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (typeof values.descriptionLexical === "string") {
      const parsedEditorState = editor.parseEditorState(
        values.descriptionLexical
      );
      editor.setEditorState(parsedEditorState);
    }
  }, [editor, values.descriptionLexical]);
  return null;
}

export default function Descirpition() {
  const { values } = useFormikContext<CommentEditorFormikValues>();

  const divRef = useRef<HTMLDivElement>(null);
  const [hiddenMore, setHiddenMore] = useState(false);

  useEffect(() => {
    if (
      divRef &&
      divRef.current?.clientHeight &&
      divRef.current?.clientHeight < 150
    ) {
      console.log(divRef.current.clientHeight);
      setHiddenMore(true);
    }
  }, []);

  const initialConfig: InitialConfigType = useMemo(
    () => ({
      editorState: values.descriptionLexical,
      editable: false,
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
    <Box maxHeight={150} overflow="hidden" position="relative" ref={divRef}>
      <LexicalComposer initialConfig={initialConfig}>
        <div className="editor-shell">
          <CommentEditor renderAsComment={true} />
        </div>
        <HistoryPlugin />
        <UpdateEditoState />
      </LexicalComposer>
      <Box
        bottom
        height="100%"
        position="absolute"
        width="100%"
        display={hiddenMore ? "none" : "block"}
      >
        <Flex
          alignItems="stretch"
          direction="column"
          height="100%"
          justifyContent="end"
        >
          <Box
            height="100px"
            dangerouslySetInlineStyle={{
              __style: {
                background: `linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.78) 51.04%, rgb(255, 255, 255) 100%)`,
              },
            }}
          />
        </Flex>
      </Box>
    </Box>
  );
}
