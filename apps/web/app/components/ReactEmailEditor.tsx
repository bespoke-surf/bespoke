import { Box } from "gestalt";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useScript } from "../hooks/useScript";

type DisplayMode = "email" | "popup";
type ThemeColor = "light" | "dark";
type DockPosition = "right" | "left";

declare global {
  const unlayer: any;
}

interface AppearanceConfig {
  readonly theme?: ThemeColor | undefined;
  readonly panels?:
    | {
        readonly tools?:
          | {
              readonly dock: DockPosition;
            }
          | undefined;
      }
    | undefined;
}

export const ReactEmailEditor = forwardRef<
  {},
  {
    editorId: string;
    minHeight: string;
    options: any;
    projectId: number;
    appearance: AppearanceConfig;
    displayMode?: DisplayMode;
    onReady?: () => void;
  }
>(
  (
    {
      editorId,
      minHeight,
      options,
      projectId,
      appearance,
      displayMode = "email",
      onReady,
    },
    ref
  ) => {
    const status = useScript("https://editor.unlayer.com/embed.js");
    const editorRef = useRef<any>(null);

    useEffect(() => {
      if (status === "ready") {
        editorRef.current = unlayer.createEditor({
          ...options,
          projectId,
          appearance,
          minHeight,
          id: editorId,
          displayMode,
        });
        if (onReady) {
          editorRef.current?.addEventListener("editor:ready", onReady);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    useImperativeHandle(
      ref,
      () => {
        return {
          registerCallback(type: any, callback: any) {
            editorRef.current?.registerCallback(type, callback);
          },
          addEventListener(type: any, callback: any) {
            editorRef.current?.addEventListener(type, callback);
          },

          loadDesign(design: any) {
            editorRef.current?.loadDesign(design);
          },

          saveDesign(callback: any) {
            editorRef.current?.saveDesign(callback);
          },

          exportHtml(callback: any) {
            editorRef.current?.exportHtml(callback);
          },
          setMergeTags(mergeTags: any) {
            editorRef.current?.setMergeTags(mergeTags);
          },
        };
      },
      []
    );

    return (
      <Box
        display="flex"
        dangerouslySetInlineStyle={{
          __style: { flex: 1, minHeight: minHeight },
        }}
      >
        <Box
          id={editorId}
          dangerouslySetInlineStyle={{ __style: { flex: 1 } }}
        />
      </Box>
    );
  }
);

ReactEmailEditor.displayName = "ReactEmailEditor";
