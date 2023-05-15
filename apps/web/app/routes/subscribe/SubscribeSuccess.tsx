import { useNavigate, useRouteLoaderData } from "@remix-run/react";
import {
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  TapArea,
  Text,
} from "gestalt";
import { useCallback } from "react";
import type { RootData } from "../../root";
export default function SubscribeSuccess() {
  const rootData = useRouteLoaderData("root") as RootData;
  const navigate = useNavigate();

  const handleLearnmoreTap = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      direction="column"
      gap={6}
      height="100vh"
    >
      <Flex direction="column" gap={3}>
        <Heading align="center">You're subscribed!</Heading>
        <Heading align="center">Now spread the word</Heading>
      </Flex>
      <Text size="300" align="center">
        If you want to help {rootData?.store?.name} even more,{" "}
        <Text inline weight="bold" size="300">
          share your reason for subscribing
        </Text>
      </Text>
      <Flex gap={1}>
        <Button
          text="Tweet"
          color="blue"
          size="lg"
          accessibilityLabel="tweet"
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
            `https://${rootData?.store?.subdomain}.bespoke.surf`
          )}&text=${encodeURIComponent("I just subscribed to")} ${
            rootData?.store?.name
          }`}
          role="link"
          target="blank"
        />
        <IconButton
          icon="twitter"
          iconColor="darkGray"
          size="lg"
          accessibilityLabel="tweet"
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
            `https://${rootData?.store?.subdomain}.bespoke.surf`
          )}&text=${encodeURIComponent("I just subscribed to")} ${
            rootData?.store?.name
          }`}
          role="link"
          target="blank"
        />
      </Flex>
      <TapArea onTap={handleLearnmoreTap}>
        <Flex alignItems="center" gap={3}>
          <Text weight="bold">Continue</Text>
          <Icon
            size={12}
            accessibilityLabel="forward"
            icon="arrow-forward"
            color="dark"
          />
        </Flex>
      </TapArea>
    </Flex>
  );
}
