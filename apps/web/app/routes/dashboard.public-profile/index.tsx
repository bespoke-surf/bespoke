import type { HeadersFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import {
  Box,
  Button,
  CompositeZIndex,
  FixedZIndex,
  Flex,
  Heading,
  IconButton,
  Layer,
  List,
  Modal,
  Text,
  Toast,
} from "gestalt";
import { useCallback, useEffect } from "react";
import useClipboard from "react-use-clipboard";

import { useTimeoutTrigger } from "../../hooks/useTimeoutTrigger";

export const headers: HeadersFunction = () => {
  return {
    "cache-control": "private, max-age=60",
  };
};

const HEADER_ZINDEX = new FixedZIndex(10);
const zIndex = new CompositeZIndex([HEADER_ZINDEX]);
const toastIndex = new CompositeZIndex([zIndex]);

export default function ViewPublic() {
  const [isCopied, setCopied] = useClipboard(`https://${location.hostname}`, {
    successDuration: 1000,
  });
  const navigate = useNavigate();

  const { state: toast, setState: setToast } = useTimeoutTrigger(1000);

  useEffect(() => {
    if (isCopied) {
      setToast(true);
    }
  }, [isCopied, setToast]);

  const handleGoBack = useCallback(() => {
    navigate("..");
  }, [navigate]);

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
                Public Website
              </Heading>
            </Flex>
          }
          onDismiss={handleGoBack}
          footer={
            <Flex justifyContent="end" gap={2}>
              <Button color="gray" text="Close" onClick={handleGoBack} />
            </Flex>
          }
          size="sm"
        >
          <Flex gap={4} direction="column">
            <Text size="300" weight="bold">
              Follow any of the options below
            </Text>
            <List
              labelDisplay="hidden"
              label="Use the synchronous analytics endpoints if:"
              type="unordered"
            >
              <List.Item text="Option 1: Copy the link below, open your browser in incognito mode, and paste the copied link in the address bar." />
              <List.Item text="Option 2: Copy the link below, and logout from your account, and paste the copied link in the address bar." />
            </List>
            <Box
              color="elevationAccent"
              display="flex"
              justifyContent="between"
              paddingX={3}
              paddingY={1}
              alignItems="center"
              rounding={3}
              marginTop={4}
            >
              <Text>{location.origin}</Text>
              <IconButton
                icon="copy-to-clipboard"
                accessibilityLabel="copy to clipboard"
                onClick={setCopied}
              />
            </Box>
          </Flex>
        </Modal>
      </Layer>
    </>
  );
}
