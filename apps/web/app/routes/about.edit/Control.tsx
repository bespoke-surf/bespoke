import { useNavigate, useRouteLoaderData } from "@remix-run/react";
import { useFormikContext } from "formik";
import { Box, Button, Flex, IconButton, Spinner } from "gestalt";
import { useCallback } from "react";
import type { RootData } from "~/root";

export default function Controls({ loading }: { loading: boolean }) {
  const { handleSubmit } = useFormikContext();
  const rootLoader = useRouteLoaderData("root") as RootData;
  const navigate = useNavigate();

  const goback = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  if (rootLoader?.isUserSubdomain === false) {
    return null;
  }

  return (
    <>
      <Box marginBottom={2} padding={2}>
        <Flex justifyContent="between" gap={2} alignItems="center">
          {rootLoader?.isUserSubdomain ? (
            <IconButton
              accessibilityLabel="back"
              icon="arrow-back"
              onClick={goback}
              iconColor="darkGray"
            />
          ) : (
            <Box />
          )}
          <Flex alignItems="center" gap={2}>
            {loading ? (
              <Spinner accessibilityLabel="loading" show />
            ) : (
              <Button
                text={"Save About"}
                color="red"
                disabled={loading}
                onClick={() => {
                  handleSubmit();
                }}
              />
            )}
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
