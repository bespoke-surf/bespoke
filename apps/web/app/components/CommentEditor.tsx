import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { useRouteLoaderData } from "@remix-run/react";
import { useFormikContext } from "formik";
import { Box, CompositeZIndex, Text } from "gestalt";
import type { RootData } from "~/root";
import { CommentEditorToolbarPlugin } from "./commentEditor/ToolbarPlugin";
import LexicalAutoLinkPlugin from "./editor/plugins/AutoLinkPlugin";
import ClickableLinkPlugin from "./editor/plugins/ClickableLinkPlugin";
import CodeHighlightPlugin from "./editor/plugins/CodeHighlightPlugin";
import EmojisPlugin from "./editor/plugins/EmojisPlugin";
import TabFocusPlugin from "./editor/plugins/TabFocusPlugin";
import { replaceIconZIndex } from "./editor/PostImage";

export interface CommentEditorFormikValues {
  descriptionLexical: string | null;
  descriptionHTML: string | null;
}

export const EDITOR_TOOLBAR_ZINDEX = new CompositeZIndex([replaceIconZIndex]);

export default function CommentEditor({
  renderAsComment = false,
}: {
  renderAsComment?: boolean;
}) {
  const { errors, touched } = useFormikContext<CommentEditorFormikValues>();
  const rootLoader = useRouteLoaderData("root") as RootData;

  return (
    <>
      <Box
        dangerouslySetInlineStyle={{
          __style: {
            // borderStyle: "solid",
            border: renderAsComment
              ? undefined
              : `${
                  touched.descriptionLexical && errors.descriptionHTML
                    ? "#CC0000"
                    : "var(--color-border-container)"
                } 1px solid`,
          },
        }}
        rounding={2}
      >
        {rootLoader?.isUserSubdomain && renderAsComment === false ? (
          <Box>
            <CommentEditorToolbarPlugin />
          </Box>
        ) : null}

        <Box marginTop={4}>
          <div className="editor-container">
            <RichTextPlugin
              contentEditable={
                <div
                  className="editor-scroller"
                  style={{
                    minHeight: renderAsComment ? "0px !important" : "150px",
                    resize:
                      rootLoader.isUserSubdomain && renderAsComment === false
                        ? "vertical"
                        : "none",
                  }}
                >
                  <Box as="div" height="100%" position="relative">
                    <ContentEditable
                      style={{
                        paddingBottom: "8px",
                        cursor: renderAsComment ? "default" : "auto",
                        paddingLeft: renderAsComment ? "0px" : "8px",
                        paddingRight: renderAsComment ? "0px" : "8px",
                      }}
                      className="ContentEditable__root"
                    />
                  </Box>
                </div>
              }
              placeholder={
                <div
                  className="Placeholder__root"
                  hidden={!rootLoader.isUserSubdomain}
                >
                  <Text color="subtle">Text (required)</Text>
                </div>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
            <EmojisPlugin />
            <LexicalAutoLinkPlugin />
            <CodeHighlightPlugin />
            <LinkPlugin />
            <ListPlugin />
            <ClickableLinkPlugin />
            <CheckListPlugin />
            <TabIndentationPlugin />
            <TabFocusPlugin />
          </div>
        </Box>
      </Box>
      {touched.descriptionLexical && errors.descriptionLexical && (
        <Box padding={2}>
          <Text color="error" size="100">
            please add a description
          </Text>
        </Box>
      )}
    </>
  );
}
