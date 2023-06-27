import dayjs from "dayjs";
import { Box, Flex, IconButton, Link, TapArea, Text } from "gestalt";
import { Suspense, lazy, useState } from "react";
import { TAG_LINE } from "../../constants";
import BigContainer from "../BigContainer";

const CookiePrefrences = lazy(() => import("./CookiePrefrences"));

export default function Footer2() {
  const [cookie, setCookie] = useState(false);
  return (
    <Box
      dangerouslySetInlineStyle={{ __style: { backgroundColor: "#D7EDFF" } }}
      paddingY={12}
      paddingX={4}
    >
      <BigContainer>
        <Flex justifyContent="between" wrap>
          <Flex.Item>
            <Link href="mailto:support@bespoke.surf">
              <Text size="600">Email Us</Text>
            </Link>
          </Flex.Item>
        </Flex>
      </BigContainer>
      <BigContainer>
        <Box
          dangerouslySetInlineStyle={{
            __style: {
              border: "0.5px solid black",
              marginTop: "2rem",
              marginBottom: "2rem",
            },
          }}
        />
      </BigContainer>
      <BigContainer>
        <Flex direction="column" gap={4}>
          <Text>Bespoke.surf - {TAG_LINE}</Text>
          <Flex alignItems="center" gap={4} wrap>
            <Text>© {dayjs().get("year")} Cartegan Software Pvt Ltd</Text>
            <Link href="/privacy-policy">
              <Text underline>Privacy</Text>
            </Link>
            <Link href="terms-of-service">
              <Text underline>Terms</Text>
            </Link>
            <Link href="refund-policy">
              <Text underline>Other policies</Text>
            </Link>
            <TapArea onTap={() => setCookie(true)}>
              <Text underline>Cookie preferences</Text>
            </TapArea>
          </Flex>
          <Flex direction="column" gap={{ column: 2, row: 2 }}>
            <Text size="200">Follow Bespoke</Text>
            <Flex direction="row" gap={{ row: 2, column: 0 }}>
              <IconButton
                accessibilityLabel="twitter"
                icon="twitter"
                bgColor="white"
                iconColor="darkGray"
                size="sm"
                href="https://twitter.com/getBespoke"
                target="blank"
                role="link"
              />

              <IconButton
                accessibilityLabel="twitter"
                //@ts-ignore
                icon="instagram"
                bgColor="white"
                iconColor="darkGray"
                size="sm"
                href="https://instagram.com/get.bespoke"
                target="blank"
                role="link"
              />
            </Flex>
          </Flex>
        </Flex>
      </BigContainer>

      {cookie && (
        <Suspense>
          <CookiePrefrences dismiss={() => setCookie(false)} />
        </Suspense>
      )}
    </Box>
  );
}
