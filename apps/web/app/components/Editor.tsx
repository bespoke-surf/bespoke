import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HorizontalRulePlugin } from "@lexical/react/LexicalHorizontalRulePlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import type { LinksFunction } from "@remix-run/node";
import { useRouteLoaderData } from "@remix-run/react";
import { useFormikContext } from "formik";
import { Box, CompositeZIndex, Heading, Sticky, Text } from "gestalt";
import React, { useCallback, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { ClientOnly } from "remix-utils";
import slug from "slug";
import type { RootData } from "~/root";
import { preventEnter } from "~/utils/preventEnter";
import AbandonedCartButtonPlugin from "./editor/plugins/AbandonedCartButtonPlugin";
import AbandonedCartProductPlugin from "./editor/plugins/AbandonedCartProductPlugin";
import LexicalAutoLinkPlugin from "./editor/plugins/AutoLinkPlugin";
import ClickableLinkPlugin from "./editor/plugins/ClickableLinkPlugin";
import CodeHighlightPlugin from "./editor/plugins/CodeHighlightPlugin";
import DraggableBlockPlugin from "./editor/plugins/DraggableBlockPlugin";
import EmojisPlugin from "./editor/plugins/EmojisPlugin";
import ImagesPlugin from "./editor/plugins/ImagesPlugin";
import ProductPlugin from "./editor/plugins/ProductPlugin";
import ShareButtonPlugin from "./editor/plugins/ShareButtonPlugin";
import SubscribeWithCaptionPlugin from "./editor/plugins/SubscribeButtonPlugin";
import TabFocusPlugin from "./editor/plugins/TabFocusPlugin";
import ToolbarPlugin from "./editor/plugins/ToolbarPlugin";
import { links as uploadImage } from "./editor/plugins/toolbarPlugin/linkToQuote/UploadImage";
import PostDetails from "./editor/PostDetails";
import PostImage, { replaceIconZIndex } from "./editor/PostImage";

export const links: LinksFunction = () => {
  return [...uploadImage()];
};
export interface EditorFormikValues {
  title: string;
  bodyLexical: string;
  bodyHTML: string;
  subTitle?: string;
  imageSrc?: string;
  imageWidth?: number;
  imageHeight?: number;
}
export const EDITOR_TOOLBAR_ZINDEX = new CompositeZIndex([replaceIconZIndex]);

export default function Editor({
  disableToolbar = false,
  disableOptionAndTime = false,
  disablePostImage = false,
  disableSubtitle = false,
  disableTitle = false,
  titlePlaceholder = "Enter title...",
  disableButtons = false,
  disableProduct = false,
  disableShare = false,
  editable = true,
  isSubject = false,
  enableHeading = false,
  disableEditorTopMargin = false,
}: {
  disableEditorTopMargin?: boolean;
  enableHeading?: boolean;
  disableToolbar?: boolean;
  disableOptionAndTime?: boolean;
  disablePostImage?: boolean;
  disableSubtitle?: boolean;
  disableTitle?: boolean;
  disableButtons?: boolean;
  disableProduct?: boolean;
  disableShare?: boolean;
  titlePlaceholder?: string;
  editable?: boolean;
  isSubject?: boolean;
}) {
  const { setFieldValue, values, touched, errors } =
    useFormikContext<EditorFormikValues>();
  const rootLoader = useRouteLoaderData("root") as RootData;

  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  const subTitleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setFieldValue("subTitle", e.target.value);
      setFieldValue("handle", slug(e.target.value));
    },
    [setFieldValue]
  );

  const titleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setFieldValue("title", e.target.value);
    },
    [setFieldValue]
  );

  return (
    <>
      {rootLoader?.isUserSubdomain && disableToolbar === false ? (
        <Sticky top={0} zIndex={EDITOR_TOOLBAR_ZINDEX}>
          <Box color="default" marginBottom={12} marginTop={2} paddingX={2}>
            <ToolbarPlugin
              disableButtons={disableButtons}
              disableProduct={disableProduct}
              disableShare={disableShare}
            />
          </Box>
        </Sticky>
      ) : null}
      {enableHeading && (
        <Box paddingX={2} marginTop={6}>
          <Heading>{values.title}</Heading>
          {values.subTitle && (
            <Box marginTop={2}>
              <Text size="500">{values.subTitle}</Text>
            </Box>
          )}
        </Box>
      )}
      {disableTitle ? null : (
        <Box
          marginTop={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
          direction="column"
          paddingX={2}
        >
          <TextareaAutosize
            className="TextArea__textArea TextArea__bold TextArea__enabled TextArea__large"
            placeholder={titlePlaceholder}
            value={
              values.title === "Subject..." || values.title === "Untitled"
                ? ""
                : values.title
            }
            maxLength={250}
            onChange={titleOnChange}
            onKeyDown={preventEnter}
            rows={1}
            disabled={!rootLoader?.isUserSubdomain}
            style={
              isSubject ? { fontSize: "18px", fontWeight: "normal" } : undefined
            }
          />
          {touched.title && errors.title && (
            <Text color="error">{errors.title}</Text>
          )}
        </Box>
      )}
      {disableSubtitle ? null : (
        <Box marginTop={2} paddingX={2}>
          <TextareaAutosize
            className="TextArea__textArea TextArea__enabled TextArea__medium TextArea__wrap"
            placeholder="Enter subtitle..."
            rows={1}
            value={values.subTitle}
            maxLength={300}
            onChange={subTitleOnChange}
            onKeyDown={preventEnter}
            disabled={!rootLoader?.isUserSubdomain}
          />
        </Box>
      )}
      {disableOptionAndTime ? null : (
        <Box paddingX={2} marginTop={6}>
          <PostDetails />
        </Box>
      )}

      {disablePostImage ? null : (
        <Box paddingX={2} marginTop={4}>
          <PostImage disableEdit={disableToolbar ? true : false} />
        </Box>
      )}
      <div className="editor-container">
        <Box paddingX={2} marginTop={disableEditorTopMargin ? 0 : 12}>
          <RichTextPlugin
            contentEditable={
              <div
                className="editor-scroller"
                style={{
                  minHeight: disableToolbar ? "0px" : "500px",
                  cursor: "auto",
                }}
              >
                <Box as="div" height="100%" position="relative" ref={onRef}>
                  <ContentEditable
                    style={{
                      paddingBottom: "100px",
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
                <Text color="subtle">{null}</Text>
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </Box>
        <SubscribeWithCaptionPlugin />
        <EmojisPlugin />
        <AutoFocusPlugin />
        <LexicalAutoLinkPlugin />
        <CodeHighlightPlugin />
        <LinkPlugin />
        <ListPlugin />
        <ClickableLinkPlugin />
        <CheckListPlugin />
        <HorizontalRulePlugin />
        <TabIndentationPlugin />
        <TabFocusPlugin />
        <ProductPlugin />
        <ShareButtonPlugin />
        <AbandonedCartButtonPlugin />
        <AbandonedCartProductPlugin />
        {floatingAnchorElem && editable && (
          <>
            <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
          </>
        )}
        <ClientOnly>{() => <ImagesPlugin />}</ClientOnly>
      </div>
    </>
  );
}
