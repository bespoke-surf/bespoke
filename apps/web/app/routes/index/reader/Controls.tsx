import { useRouteLoaderData, useTransition } from "@remix-run/react";
import { useFormikContext } from "formik";
import { Box, Button, Flex, IconButton } from "gestalt";
import type { RootData } from "~/root";
import { IndexActionEnum } from "../types";

export default function Controls({ close }: { close: () => void }) {
  const rootLoaderData = useRouteLoaderData("root") as RootData;
  const transition = useTransition();
  const { handleSubmit } = useFormikContext();

  const loading =
    transition.submission &&
    transition.submission.formData.get("_action") ===
      IndexActionEnum.createPost;

  return (
    <>
      <Box marginBottom={2} marginTop={2} padding={2}>
        <Flex justifyContent="end" gap={2} alignItems="center">
          {rootLoaderData?.isUserSubdomain === false ? null : (
            <Flex.Item alignSelf="center">
              <Button
                text="Create Post"
                color="red"
                onClick={() => handleSubmit()}
                disabled={loading}
              />
            </Flex.Item>
          )}
          <IconButton
            icon="cancel"
            size="md"
            accessibilityLabel="close"
            bgColor="white"
            iconColor="darkGray"
            onClick={close}
          />
        </Flex>
      </Box>
    </>
  );
}
