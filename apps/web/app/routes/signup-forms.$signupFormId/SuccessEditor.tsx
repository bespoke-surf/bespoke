import { useLoaderData, useRouteLoaderData } from "@remix-run/react";
import { useFormikContext } from "formik";
import { Box, IconButton, Tooltip } from "gestalt";
import { useCallback, useEffect, useRef, useState } from "react";
import type EmailEditor from "react-email-editor";
import type { MyFromValue, loader } from ".";
import { ReactEmailEditor } from "../../components/ReactEmailEditor";
import { UNLAYER_PROJECT_ID } from "../../constants";
import type { RootData } from "../../root";
import { customFonts } from "../../utils/customFonts";
import { addFormData } from "./utilts";

export const SuccessEditor = () => {
  const { setFieldValue, values } = useFormikContext<MyFromValue>();
  const successEditorRef = useRef<EmailEditor>(null);
  const [successEditorReady, setSuccessEditorReady] = useState(false);

  const loaderData = useLoaderData<typeof loader>();
  const rootData = useRouteLoaderData("root") as RootData;

  const handleSuccessEditorReady = () => {
    if (loaderData.signupForm?.success?.design) {
      successEditorRef.current?.loadDesign(
        JSON.parse(JSON.parse(loaderData.signupForm.success.design))
      );
    }
    setSuccessEditorReady(true);
  };

  const exportHtml = useCallback(() => {
    successEditorRef.current?.exportHtml(
      (data) => {
        const successResponse = addFormData(data);

        if (successResponse) {
          setFieldValue("success", successResponse);
        }
      },
      {
        minify: true,
        cleanup: true,
      }
    );
  }, [setFieldValue]);

  const handleFormDuplicateToSuccess = useCallback(() => {
    if (values.form?.design) {
      successEditorRef.current?.loadDesign(
        JSON.parse(JSON.parse(values.form?.design))
      );
      exportHtml();
    }
  }, [values.form?.design, exportHtml]);

  useEffect(() => {
    if (successEditorReady) {
      successEditorRef.current?.addEventListener("design:updated", exportHtml);
    }
  }, [exportHtml, successEditorReady]);

  return (
    <div hidden={values.formType === "form"}>
      <Box position="absolute" right margin={4}>
        <Tooltip
          text={`duplicate from Form to Success`}
          accessibilityLabel="duplicate from from to success"
          zIndex={{ index: () => 88888 }}
          idealDirection="down"
        >
          <IconButton
            iconColor="darkGray"
            bgColor="white"
            icon="duplicate"
            size="lg"
            accessibilityLabel="copy"
            disabled={values.formType === "form"}
            onClick={handleFormDuplicateToSuccess}
          />
        </Tooltip>
      </Box>
      <ReactEmailEditor
        userData={{
          email: rootData.user?.email ?? "",
          id: rootData.user?.id ?? "",
          name: rootData.user?.name ?? "",
          signature: rootData.user?.unlayerSignature ?? "",
        }}
        ref={successEditorRef}
        displayMode="popup"
        onReady={handleSuccessEditorReady}
        projectId={UNLAYER_PROJECT_ID}
        editorId="bespoke-editor-success"
        appearance={{ panels: { tools: { dock: "left" } }, theme: "light" }}
        minHeight={`calc(100vh - ${values.boxHeight}px)`}
        options={{
          safeHtml: true,
          fonts: {
            showDefaultFonts: true,
            customFonts: customFonts,
          },
          tools: {
            form: {
              enabled: false,
            },
          },
        }}
      />
    </div>
  );
};
