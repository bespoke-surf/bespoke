import { Flex, IconButton, Tooltip } from "gestalt";
import type { LexicalEditor } from "lexical";
import { REDO_COMMAND, UNDO_COMMAND } from "lexical";
import { arrowBackwardPath } from "../../../../icon/iconPaths";
import { NewPostLayerZIndex } from "../../../../routes/index/reader/zIndex";

export default function UndoRedo({
  activeEditor,
  canRedo,
  canUndo,
}: {
  activeEditor: LexicalEditor;
  canUndo: boolean;
  canRedo: boolean;
}) {
  return (
    <Flex justifyContent="between" alignItems="center" gap={1}>
      <Tooltip
        idealDirection="down"
        zIndex={NewPostLayerZIndex}
        text="Undo"
        accessibilityLabel="Undo"
      >
        <IconButton
          accessibilityLabel="undo"
          dangerouslySetSvgPath={{
            __path: arrowBackwardPath,
          }}
          iconColor="darkGray"
          size="sm"
          onClick={() => {
            activeEditor.dispatchCommand(UNDO_COMMAND, undefined);
          }}
          disabled={!canUndo}
        />
      </Tooltip>
      <Tooltip
        idealDirection="down"
        zIndex={NewPostLayerZIndex}
        text="Redo"
        accessibilityLabel="redo"
      >
        <IconButton
          accessibilityLabel="redo"
          icon="arrow-circle-forward"
          size="sm"
          iconColor="darkGray"
          onClick={() => {
            activeEditor.dispatchCommand(REDO_COMMAND, undefined);
          }}
          disabled={!canRedo}
        />
      </Tooltip>
    </Flex>
  );
}
