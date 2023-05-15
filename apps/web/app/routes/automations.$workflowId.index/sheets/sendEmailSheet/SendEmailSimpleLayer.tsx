import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import type { LinksFunction } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";

import playgourndCss from "@bespoke/common/dist/index.css";
import { FormikProvider, useFormik } from "formik";
import { Box, Container } from "gestalt";
import React, { useCallback, useContext, useEffect, useMemo } from "react";
import * as yup from "yup";
import type { EditorFormikValues } from "../../../../components/Editor";
import Editor, { links as editorLinks } from "../../../../components/Editor";
import eidtorCss from "../../../../components/editor/editor.css";
import editorTextAreaCss from "../../../../components/editor/editorTextArea.css";
import PlaygroundNodes from "../../../../components/editor/nodes/PlaygroundNodes";
import PlaygroundEditorTheme from "../../../../components/editor/themes/PlaygroundEditorTheme";
import { WorkflowActivityType } from "../../../../graphql/__generated__/graphql";
import { NodeOptionContext } from "../../nodes/NodeOptionProvider";
import { AutomationWorkflowIndexActionEnum } from "../../types";
import { NodeSheetContext } from "../NodeSheetProvider";
import { UpdateOnChange } from "./sendEmailSimpleLayer/AutoSave";
import Controls from "./sendEmailSimpleLayer/Control";

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

export const SendEmailSheetSchema = yup.object().shape({
  title: yup.string().required("please add a subject"),
  bodyHTML: yup.string(),
  bodyLexical: yup.string(),
});

export interface SendEmailSimpleLayerValue extends EditorFormikValues {}

function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    editor.focus();
  }, [editor]);
  return null;
}

export default function SendEmailSimpleLayer({ close }: { close: () => void }) {
  const fetcher = useFetcher();

  const loading = fetcher.state === "loading" || fetcher.state === "submitting";

  const { state, update } = useContext(NodeSheetContext);
  const { state: optionState } = useContext(NodeOptionContext);

  useEffect(() => {
    if (fetcher.type === "done") {
      update({
        data: state?.data,
        state: "updating",
      });
    }
  }, [fetcher.type, state?.data, update]);

  const isUpdate = state?.state === "updating";
  const html =
    state?.data?.value?.__typename === "WorkflowStateSendEmailActivityValue"
      ? state.data.value.html
      : "";
  const design =
    state?.data?.value?.__typename === "WorkflowStateSendEmailActivityValue"
      ? state.data.value.design
      : "";

  const handleSubmit = useCallback(
    (values: SendEmailSimpleLayerValue) => {
      if (
        !state?.data?.id ||
        state.data.workflowActivityType !== WorkflowActivityType.SendEmail
      ) {
        return;
      }
      const formData = new FormData();
      if (isUpdate) {
        formData.append(
          "_action",
          AutomationWorkflowIndexActionEnum.updateSendEmailState
        );
      } else {
        formData.append(
          "_action",
          AutomationWorkflowIndexActionEnum.createSendEmailNode
        );
        formData.append(
          "otherWise",
          optionState?.openOtherWiseOptions ? "true" : "false"
        );
      }
      formData.append("workflowStateId", state?.data?.id);
      formData.append("design", values.bodyLexical);
      formData.append("html", values.bodyHTML);
      formData.append("subject", values.title);
      formData.append("type", "simple");
      fetcher.submit(formData, { method: "post" });
    },
    [
      fetcher,
      isUpdate,
      optionState?.openOtherWiseOptions,
      state?.data?.id,
      state?.data?.workflowActivityType,
    ]
  );

  const formik = useFormik<SendEmailSimpleLayerValue>({
    initialValues: {
      title: state?.data?.name ?? "",
      bodyHTML: html ? html : "",
      bodyLexical: design ? design : "",
    },
    onSubmit: handleSubmit,
    validationSchema: SendEmailSheetSchema,
  });

  const initialConfig: React.ComponentProps<
    typeof LexicalComposer
  >["initialConfig"] = useMemo(
    () => ({
      editorState: design === "" ? undefined : design ?? undefined,
      editable: true,
      namespace: "Playground",
      nodes: [...PlaygroundNodes],
      onError: (error: Error) => {
        throw error;
      },
      theme: PlaygroundEditorTheme,
    }),
    [design]
  );

  return (
    <Box
      color="light"
      overflow="scrollY"
      height="100vh"
      dangerouslySetInlineStyle={{
        __style: {
          paddingBottom: "100px",
        },
      }}
    >
      <Container>
        <FormikProvider value={formik}>
          <LexicalComposer initialConfig={initialConfig}>
            <Controls close={close} loading={loading} />
            <div className="editor-shell">
              <Editor
                editable
                titlePlaceholder="Enter subject..."
                disableOptionAndTime
                disablePostImage
                disableSubtitle
                disableShare
              />
            </div>
            <HistoryPlugin />
            <MyCustomAutoFocusPlugin />
            <UpdateOnChange />
          </LexicalComposer>
        </FormikProvider>
      </Container>
    </Box>
  );
}
