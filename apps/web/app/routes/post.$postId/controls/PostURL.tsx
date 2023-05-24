import { useFetcher, useParams } from "@remix-run/react";
import { useFormikContext } from "formik";
import { Box, Button, Flex, IconButton, Text, TextField } from "gestalt";
import { useCallback, useEffect, useState } from "react";
import { ClientOnly } from "remix-utils";
import slug from "slug";
import { PostCheckHandlerActionEnum } from "../../post.$postId.check-handler";
import type { PostFormValues } from "../types";

export default function PostURL({
  setDisablePublish,
}: {
  setDisablePublish: (arg: boolean) => void;
}) {
  const { setFieldValue, values, handleChange, handleBlur, errors, touched } =
    useFormikContext<PostFormValues>();

  const params = useParams<{ postId: string }>();
  const fetcher = useFetcher<boolean>();

  const [editURL, setEditURL] = useState(false);

  const loading = fetcher.state === "loading" || fetcher.state === "submitting";

  const handleUpdateUrl = useCallback(() => {
    setFieldValue("handle", slug(values.handle));
    const formData = new FormData();
    formData.append("_action", PostCheckHandlerActionEnum.checkHandleAvailable);
    formData.append("handle", values.handle);
    fetcher.submit(formData, {
      method: "POST",
      action: `/post/${params.postId}/check-handler?index`,
    });
  }, [fetcher, params.postId, setFieldValue, values.handle]);

  useEffect(() => {
    if (fetcher.type === "done") {
      setEditURL(false);
    }
  }, [fetcher.type]);

  useEffect(() => {
    if (fetcher.type === "init") {
      const formData = new FormData();
      formData.append("handle", values.handle);
      formData.append(
        "_action",
        PostCheckHandlerActionEnum.checkHandleAvailable
      );
      fetcher.submit(formData, {
        method: "post",
        action: `/post/${params.postId}/check-handler?index`,
      });
    }
  }, [params.postId, values.handle, fetcher]);

  useEffect(() => {
    if (fetcher.data === false) {
      setDisablePublish(true);
    } else if (fetcher.data === true) {
      setDisablePublish(false);
    }
  }, [fetcher.data, setDisablePublish]);

  const handlePostURLButton = useCallback(() => {
    setEditURL(true);
  }, []);

  const handleKeyDown = useCallback(
    ({ event }: { event: React.KeyboardEvent<HTMLInputElement> }) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleUpdateUrl();
      }
    },
    [handleUpdateUrl]
  );

  return (
    <Flex direction="column" gap={{ row: 0, column: 4 }}>
      <Flex direction="column" gap={{ row: 0, column: 2 }}>
        <Text weight="bold">Post URL</Text>
        <Text size="200">
          URL is generated based on your post title. You can also manually edit
          it.
        </Text>
      </Flex>
      <Flex justifyContent="between" alignItems="center" wrap>
        {!editURL && (
          <Flex direction="column" gap={2}>
            <Box marginEnd={2}>
              <ClientOnly>
                {() => (
                  <Text inline color="subtle">
                    {window?.location?.origin}
                    /p/
                  </Text>
                )}
              </ClientOnly>
              <Text inline>{values.handle}</Text>
            </Box>
            {fetcher.data === false && (
              <Text color="error" size="200">
                this URL is unavailable
              </Text>
            )}
            {errors.handle && touched.handle && (
              <Text color="error" size="200">
                {errors.handle}
              </Text>
            )}
          </Flex>
        )}
        {editURL ? (
          <Flex gap={1} alignItems="center">
            <TextField
              disabled={!editURL}
              id="handle"
              name="handle"
              onChange={({ event }) => handleChange(event)}
              onBlur={({ event }) => handleBlur(event)}
              value={values.handle}
              size="lg"
              errorMessage={
                fetcher.data === false
                  ? "this URL is unavailable"
                  : errors.handle && touched.handle
                  ? errors.handle
                  : undefined
              }
              onKeyDown={handleKeyDown}
            />
            <Button
              text="Update"
              size="sm"
              color="red"
              onClick={handleUpdateUrl}
              disabled={loading}
            />
          </Flex>
        ) : null}
        <>
          {editURL ? (
            <IconButton
              accessibilityLabel="close"
              icon="cancel"
              size="sm"
              disabled={loading}
              onClick={() => setEditURL(false)}
            />
          ) : (
            <IconButton
              accessibilityLabel="edit"
              size="sm"
              icon="edit"
              onClick={handlePostURLButton}
              iconColor="darkGray"
              disabled={loading}
            />
          )}
        </>
      </Flex>
    </Flex>
  );
}
