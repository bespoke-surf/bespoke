import { useFetcher, useRouteLoaderData } from "@remix-run/react";

import { useFormik } from "formik";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Spinner,
  Sticky,
  TextField,
} from "gestalt";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type EmailEditor from "react-email-editor";
import type { Design } from "react-email-editor";
import { ReactEmailEditor } from "../../../../components/ReactEmailEditor";
import { UNLAYER_PROJECT_ID } from "../../../../constants";
import { WorkflowActivityType } from "../../../../graphql/__generated__/graphql";
import type { RootData } from "../../../../root";
import { customFonts } from "../../../../utils/customFonts";
import { NodeOptionContext } from "../../nodes/NodeOptionProvider";
import {
  AutomationWorkflowIndexActionEnum,
  SendEmailSheetSchema,
} from "../../types";
import { NodeSheetContext } from "../NodeSheetProvider";
import Templates from "./sendEmailComplexLayer/Templates";
import {
  MenuBarZIndex,
  TemplateDesignContext,
} from "./sendEmailComplexLayer/utils";

interface MyFormValue {
  html: string;
  design: string;
  name: string;
}
export default function SendEmailComplexLayer({
  close,
}: {
  close: () => void;
}) {
  const fetcher = useFetcher();
  const rootData = useRouteLoaderData("root") as RootData;

  const [templateDesing, setTemplateDesign] = useState("");

  const { state, update } = useContext(NodeSheetContext);
  const { state: optionState } = useContext(NodeOptionContext);

  const [loaded, setLoaded] = useState(false);
  const [template, setTemplate] = useState(false);

  const isUpdate = state?.state === "updating";
  const loading = fetcher.state === "loading" || fetcher.state === "submitting";

  const firstComponentRef = useRef<HTMLDivElement>(null);
  const [firstComponentHeight, setFirstComponentHeight] = useState<
    number | undefined
  >(0);

  useEffect(() => {
    if (fetcher.type === "done") {
      update({
        data: state?.data,
        state: "updating",
      });
    }
  }, [fetcher.type, state?.data, update]);

  useEffect(() => {
    setFirstComponentHeight(firstComponentRef?.current?.offsetHeight);
  }, []);
  const handleSubmit = useCallback(
    (values: MyFormValue) => {
      if (
        !state?.data?.id ||
        state.data.workflowActivityType !== WorkflowActivityType.SendEmail
      )
        return;
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
      formData.append("design", values.design);
      formData.append("html", values.html);
      formData.append("subject", values.name);
      formData.append("type", "complex");
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

  const formik = useFormik({
    initialValues: {
      design:
        state?.data?.value?.__typename === "WorkflowStateSendEmailActivityValue"
          ? state.data.value.design
          : "",
      html:
        state?.data?.value?.__typename === "WorkflowStateSendEmailActivityValue"
          ? state.data.value.html
          : "",
      name: state?.data?.name ? state.data.name : "",
    },
    onSubmit: handleSubmit,
    validationSchema: SendEmailSheetSchema,
  });

  const emailEditorRef = useRef<EmailEditor>(null);

  const exportHtml = useCallback(() => {
    emailEditorRef.current?.exportHtml(
      (data) => {
        formik.setFieldValue("html", data.html);
      },
      {
        minify: true,
        cleanup: true,
      }
    );
    emailEditorRef.current?.saveDesign((design) => {
      const strigified = JSON.stringify(JSON.stringify(design));
      formik.setFieldValue("design", strigified);
    });
  }, [formik]);

  useEffect(() => {
    if (loaded) {
      emailEditorRef.current?.addEventListener("design:updated", exportHtml);
    }
  }, [formik, exportHtml, loaded]);

  const onReady = useCallback(() => {
    console.log("on ready");
    setLoaded(true);
    if (
      state?.data?.value?.__typename === "WorkflowStateSendEmailActivityValue"
    ) {
      const design: Design = JSON.parse(JSON.parse(state.data.value.design));
      emailEditorRef.current?.loadDesign(design);
    }
  }, [state?.data?.value]);

  const handleKeyDown = useCallback(
    ({ event }: { event: React.KeyboardEvent<HTMLInputElement> }) => {
      if (event.key === "Enter") {
        event.preventDefault();
        formik.handleSubmit();
      }
    },
    [formik]
  );

  useEffect(() => {
    if (templateDesing) {
      setTemplate(false);
      emailEditorRef.current?.loadDesign(JSON.parse(templateDesing));
      exportHtml();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateDesing]);

  return (
    <>
      <TemplateDesignContext.Provider value={{ setTemplateDesign }}>
        {template && <Templates close={() => setTemplate(false)} />}
      </TemplateDesignContext.Provider>
      <Sticky top={0} zIndex={MenuBarZIndex}>
        <Box
          ref={firstComponentRef}
          borderStyle="raisedBottomShadow"
          padding={2}
          color="light"
        >
          <Flex
            justifyContent="between"
            alignItems="center"
            gap={{ row: 0, column: 2 }}
            wrap
          >
            <Flex.Item>
              <Flex alignItems="center" gap={2}>
                <IconButton
                  accessibilityLabel="back"
                  icon="arrow-back"
                  type="button"
                  onClick={close}
                />

                <TextField
                  id="name"
                  size="lg"
                  name="name"
                  onChange={({ event }) => formik.handleChange(event)}
                  onBlur={({ event }) => formik.handleBlur(event)}
                  value={formik.values.name}
                  placeholder="Email subject..."
                  errorMessage={
                    formik.touched.name && formik.errors.name
                      ? formik.errors.name
                      : undefined
                  }
                  onKeyDown={handleKeyDown}
                />
              </Flex>
            </Flex.Item>
            <ButtonGroup>
              <Button
                text="Templates"
                onClick={() => setTemplate(true)}
                color="white"
                size="lg"
                disabled={!loaded}
              />
              {loading ? (
                <Spinner show accessibilityLabel="loading" />
              ) : (
                <Button
                  text="Save"
                  size="lg"
                  color="red"
                  onClick={() => formik.handleSubmit()}
                  disabled={!loaded}
                />
              )}
            </ButtonGroup>
          </Flex>
        </Box>
      </Sticky>

      <ReactEmailEditor
        userData={{
          email: rootData.user?.email ?? "",
          id: rootData.user?.id ?? "",
          name: rootData.user?.name ?? "",
          signature: rootData.user?.unlayerSignature ?? "",
        }}
        ref={emailEditorRef}
        onReady={onReady}
        projectId={UNLAYER_PROJECT_ID}
        editorId="bespoke-editor"
        appearance={{ panels: { tools: { dock: "left" } }, theme: "light" }}
        minHeight={`calc(100% - ${firstComponentHeight}px)`}
        options={
          {
            safeHtml: true,
            fonts: {
              showDefaultFonts: true,
              customFonts: customFonts,
            },
            mergeTags: {
              unsubscribe: {
                name: "Unsubscribe",
                value: "{{unsubscribeLink}}",
                sample: "Unsubscribe",
              },
              address: {
                name: "Address",
                mergeTags: {
                  address_1: {
                    name: "Address 1",
                    value: "{{contact.address1}}",
                    sample: rootData?.store?.contact?.address1,
                  },
                  address_2: {
                    name: "Address 2",
                    value: "{{contact.address2}}",
                    sample:
                      rootData?.store?.contact?.address2 ?? "value is empty",
                  },
                  city: {
                    name: "City",
                    value: "{{contact.city}}",
                    sample: rootData?.store?.contact?.city,
                  },

                  state: {
                    name: "State",
                    value: "{{contact.state}}",
                    sample: rootData?.store?.contact?.state ?? "value is empty",
                  },
                  country: {
                    name: "Country",
                    value: "{{contact.country}}",
                    sample: rootData?.store?.contact?.country,
                  },
                  zip: {
                    name: "Zip",
                    value: "{{contact.zipCode}}",
                    sample: rootData?.store?.contact?.zipCode,
                  },
                },
              },
            },
            user: {
              id: rootData?.user?.id as unknown as number,
            },
          } as any
        }
      />
    </>
  );
}
