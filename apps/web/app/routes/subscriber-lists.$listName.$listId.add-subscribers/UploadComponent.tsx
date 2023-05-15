import { FormikProvider, useFormikContext } from "formik";
import { Box, Flex, Text, TextArea } from "gestalt";
import papaparse from "papaparse";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import type { AddSubscriberFormValues } from "./types";

export default function UploadComponent() {
  const formik = useFormikContext<AddSubscriberFormValues>();
  return (
    <Box padding={8}>
      <Flex direction="column" gap={8}>
        <Flex direction="column" gap={4}>
          <Text weight="bold" size="400">
            Add subscribers by email address
          </Text>
          <TextArea
            id="csEmails"
            name="csEmails"
            label="Emails (comma seperated)"
            onChange={({ event }) => formik.handleChange(event)}
            onBlur={({ event }) => formik.handleChange(event)}
            placeholder="Type emails here (seperated by commas)"
            value={formik.values.csEmails}
            errorMessage={
              formik.touched.csEmails && formik.errors.csEmails
                ? formik.errors.csEmails
                : undefined
            }
          />
        </Flex>
        <Text weight="bold" align="center" color="subtle">
          OR
        </Text>

        <Flex direction="column" gap={4}>
          <Flex direction="column" gap={2}>
            <Text weight="bold" size="400">
              Add emails by uploading a CSV file
            </Text>
            <Text size="100" inline>
              <Text weight="bold" inline size="100">
                Formatting:{" "}
              </Text>
              The first row of your file should contain headers for each column
              with at least one labeled{" "}
              <Text color="subtle" inline size="100">
                Email.
              </Text>{" "}
              We will also scan for additional colums like{" "}
              <Text color="subtle" inline size="100">
                First Name &{" "}
              </Text>
              <Text color="subtle" inline size="100">
                Last Name
              </Text>
              .
            </Text>
          </Flex>
          <FormikProvider value={formik}>
            <Box display="block">
              <Basic />
            </Box>
          </FormikProvider>
        </Flex>
      </Flex>
    </Box>
  );
}

const Basic = () => {
  const { values, setValues } = useFormikContext<AddSubscriberFormValues>();
  const [file, setFile] = useState<File | undefined>(undefined);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    maxSize: 50000000,
    multiple: false,
    accept: {
      "text/csv": [".csv"],
    },
    onDrop: (files) => {
      //@ts-ignore
      setFile(files[0]);
      const reader = new FileReader();
      //@ts-ignore
      reader.readAsBinaryString(files[0]);
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading failed");
      reader.onload = async () => {
        // Parse CSV file
        papaparse.parse(reader.result as string, {
          worker: true,
          header: true,
          fastMode: true,
          skipEmptyLines: true,

          complete: (result: papaparse.ParseResult<{}>) => {
            setValues({
              ...values,
              uploadErrors: result.errors,
              aborted: result.meta.aborted,
              parsedResults: result.data,
              mappedFields: result.meta.fields?.map((field) => {
                return {
                  key: field,
                  checked:
                    field === "Email" || field === "email"
                      ? true
                      : field === "First Name" || field === "First name"
                      ? true
                      : field === "Last Name" || field === "Last name"
                      ? true
                      : false,

                  value:
                    field === "Email" || field === "email"
                      ? "Email"
                      : field === "First Name" || field === "First name"
                      ? "First Name"
                      : field === "Last Name" || field === "Last name"
                      ? "Last Name"
                      : undefined,
                };
              }),
            });
          },
        });
      };
    },
  });

  return (
    <>
      {!file && (
        <Box as="section" display="flex" direction="column">
          <div
            {...getRootProps({
              style: {
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "30px",
                borderWidth: "2px",
                borderRadius: "2px",
                borderColor: "#eeeeee",
                borderStyle: "dashed",
                backgroundColor: "#fafafa",
                color: "#bdbdbd",
                outline: "none",
                transition: "border .24s ease-in-out",
                cursor: "pointer",
              },
            })}
          >
            <input {...getInputProps()} />
            <Text weight="bold" size="200">
              Drag 'n' drop a csv file here,
            </Text>
            <Text color="subtle" size="200">
              or click to select a file
            </Text>
            <Box marginTop={2}>
              <Text color="subtle" inline align="center" size="100">
                max file size is{" "}
                <Text inline weight="bold" size="100">
                  50mb
                </Text>
              </Text>
            </Box>
          </div>
        </Box>
      )}
      {/* {file && (
        <>
          <Box
            color="lightWash"
            paddingY={1}
            paddingX={2}
            rounding={3}
            justifyContent="between"
            alignItems="center"
            display="flex"
          >
            <Text size="300">{file.name}</Text>
            <IconButton
              accessibilityLabel="close"
              icon="cancel"
              iconColor="darkGray"
              onClick={() => {
                setFile(undefined);
              }}
            />
          </Box>
        </>
      )} */}
    </>
  );
};
