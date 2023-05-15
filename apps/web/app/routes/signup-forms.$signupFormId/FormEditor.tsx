import { useLoaderData } from "@remix-run/react";
import { useFormikContext } from "formik";
import { useCallback, useEffect, useRef, useState } from "react";
import type EmailEditor from "react-email-editor";
import type { MyFromValue, loader } from ".";
import { ReactEmailEditor } from "../../components/ReactEmailEditor";
import { UNLAYER_PROJECT_ID } from "../../constants";
import { customFonts } from "../../utils/customFonts";
import { addFormData } from "./utilts";

export const FormEditor = () => {
  const { setFieldValue, values } = useFormikContext<MyFromValue>();
  const [editorReady, setEditroReady] = useState(false);
  const formEditorRef = useRef<EmailEditor>(null);

  const loaderData = useLoaderData<typeof loader>();

  const exportHtml = useCallback(() => {
    formEditorRef.current?.exportHtml(
      (data: unknown) => {
        const formResponse = addFormData(data);

        if (formResponse) {
          setFieldValue("form", formResponse);
        }
      },
      {
        minify: true,
        cleanup: true,
      }
    );
  }, [setFieldValue]);

  useEffect(() => {
    if (editorReady) {
      formEditorRef.current?.addEventListener("design:updated", exportHtml);
    }
  }, [editorReady, exportHtml]);

  const handleOnReady = () => {
    if (loaderData.signupForm?.form?.design) {
      formEditorRef.current?.loadDesign(
        JSON.parse(JSON.parse(loaderData.signupForm?.form?.design))
      );
    }
    setEditroReady(true);
  };

  return (
    <div hidden={values.formType === "success"}>
      <ReactEmailEditor
        onReady={handleOnReady}
        displayMode="popup"
        ref={formEditorRef}
        projectId={UNLAYER_PROJECT_ID}
        editorId="bespoke-editor"
        appearance={{ panels: { tools: { dock: "left" } }, theme: "light" }}
        minHeight={`calc(100vh - ${values.boxHeight}px)`}
        options={
          {
            safeHtml: true,
            fonts: {
              showDefaultFonts: true,
              customFonts: customFonts,
            },
            tools: {
              form: {
                usageLimit: 1,
                properties: {
                  fields: {
                    editor: {
                      data: {
                        allowAddNewField: false,
                        defaultFields: [
                          {
                            name: "email",
                            label: "Email",
                            type: "email",
                            placeholder_text: "Enter email here",
                          },
                          {
                            name: "first_name",
                            label: "First Name",
                            type: "text",
                          },
                          {
                            name: "last_name",
                            label: "Last Name",
                            type: "text",
                          },
                        ],
                      },
                    },
                  },
                },
              },
            },
          } as any
        }
      />
    </div>
  );
};
