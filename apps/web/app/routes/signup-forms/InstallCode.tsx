import { useRouteLoaderData } from "@remix-run/react";
import {
  Box,
  Button,
  CompositeZIndex,
  FixedZIndex,
  Flex,
  Heading,
  IconButton,
  Layer,
  Modal,
  Text,
  Toast,
} from "gestalt";
import { useCallback, useEffect } from "react";
import useClipboard from "react-use-clipboard";
import { useTimeoutTrigger } from "../../hooks/useTimeoutTrigger";
import type { RootData } from "../../root";

const HEADER_ZINDEX = new FixedZIndex(10);
const zIndex = new CompositeZIndex([HEADER_ZINDEX]);
const toastIndex = new CompositeZIndex([zIndex]);

export default function InstallCodeSnippet({ close }: { close: () => void }) {
  const rootData = useRouteLoaderData("root") as RootData;

  const tag = `<script async type="text/javascript" src="${location.origin}/js/bespoke.global.js?businessId=${rootData.store?.shortId}"></script>`;

  const [isCopied, setCopied] = useClipboard(tag, {
    successDuration: 1000,
  });

  const { state: toast, setState: setToast } = useTimeoutTrigger(1000);

  useEffect(() => {
    if (isCopied) {
      setToast(true);
    }
  }, [isCopied, setToast]);

  const handleGoBack = useCallback(() => {
    close();
  }, [close]);

  return (
    <>
      {toast && (
        <Layer zIndex={toastIndex}>
          <Box
            dangerouslySetInlineStyle={{
              __style: {
                bottom: 50,
                left: "50%",
                transform: "translateX(-50%)",
              },
            }}
            fit
            paddingX={1}
            position="fixed"
          >
            <Toast
              text="Copied to clipboard"
              //@ts-ignore
              type="default"
            />
          </Box>
        </Layer>
      )}
      <Layer zIndex={zIndex}>
        <Modal
          accessibilityModalLabel="Choose how to claim site"
          align="start"
          heading={
            <Flex justifyContent="between">
              <Heading size="500" accessibilityLevel={1}>
                Install sign-up forms
              </Heading>
              <IconButton
                accessibilityLabel="Dismiss modal"
                bgColor="white"
                icon="cancel"
                iconColor="darkGray"
                onClick={handleGoBack}
                size="sm"
              />
            </Flex>
          }
          onDismiss={handleGoBack}
          footer={
            <Flex justifyContent="end" gap={2}>
              <Button
                accessibilityLabel="copy to clipboard"
                text="Copy to Clipboard"
                onClick={setCopied}
                color="red"
              />
            </Flex>
          }
          size="sm"
        >
          <Flex gap={2} direction="column">
            <Text>
              In order to display sign-up forms and collect emails on your site,
              you need to copy the code below and paste it before the{" "}
              {`</body>`} tag on every page you want to display the forms.
            </Text>
            <Box
              color="elevationAccent"
              display="flex"
              justifyContent="between"
              padding={3}
              alignItems="center"
              rounding={3}
              marginTop={4}
            >
              <Text>{tag}</Text>
            </Box>
          </Flex>
        </Modal>
      </Layer>
    </>
  );
}
