import { Box, Flex } from "gestalt";

import type { InitialConfigType } from "@lexical/react/LexicalComposer";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useEffect, useMemo, useRef, useState } from "react";
import CommentEditor from "../../components/CommentEditor";
import PlaygroundNodes from "../../components/editor/nodes/PlaygroundNodes";
import PlaygroundEditorTheme from "../../components/editor/themes/PlaygroundEditorTheme";
export const Descirpition = ({
  descriptionLexical,
}: {
  descriptionLexical: string | null;
}) => {
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
      editorState: descriptionLexical,
      editable: false,
      namespace: "Playground",
      nodes: [...PlaygroundNodes],
      onError: (error: Error) => {
        throw error;
      },
      theme: PlaygroundEditorTheme,
    }),
    [descriptionLexical]
  );

  return (
    <Box
      maxHeight={150}
      overflow="hidden"
      position="relative"
      ref={divRef}
      marginTop={-2}
    >
      <LexicalComposer initialConfig={initialConfig}>
        <div className="editor-shell">
          <CommentEditor renderAsComment={true} />
        </div>
      </LexicalComposer>
      <Box
        bottom
        height="100%"
        marginTop={1}
        display={hiddenMore ? "none" : "block"}
        position="absolute"
        width="100%"
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
};
