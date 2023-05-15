import {
  Box,
  CompositeZIndex,
  FixedZIndex,
  Flex,
  Heading,
  IconButton,
  Label,
  Layer,
  Modal,
  Switch,
  Text,
} from "gestalt";
import { useCookiePrefrences } from "../../hooks/useCookiePrefrencecs";

const HEADER_ZINDEX = new FixedZIndex(10);
const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

export default function CookiePrefrences({ dismiss }: { dismiss: () => void }) {
  const {
    analyticsCookie,
    marketingCookie,
    toggleAnalyticsCookie,
    toggleMarketingCookie,
  } = useCookiePrefrences();

  return (
    <Layer zIndex={zIndex}>
      <Modal
        accessibilityModalLabel="Choose how to claim site"
        align="start"
        heading={
          <Flex justifyContent="between">
            <Heading size="500" accessibilityLevel={1}>
              Advanced Cookie Settings
            </Heading>
            <Box
              display="none"
              smDisplay="none"
              mdDisplay="block"
              lgDisplay="block"
            >
              <IconButton
                accessibilityLabel="Dismiss modal"
                bgColor="white"
                icon="cancel"
                iconColor="darkGray"
                onClick={dismiss}
                size="sm"
              />
            </Box>
          </Flex>
        }
        closeOnOutsideClick={true}
        onDismiss={dismiss}
        size="sm"
      >
        <Box padding={6}>
          <Flex direction="column" gap={{ column: 2, row: 0 }} width="100%">
            <Flex direction="column" gap={{ column: 4, row: 0 }}>
              <Flex alignItems="center" gap={{ row: 1, column: 0 }}>
                <Flex.Item flex="grow">
                  <Label htmlFor="essential-cookie">
                    <Flex direction="column" gap={{ column: 1, row: 0 }}>
                      <Text>Essential Cookies</Text>
                      <Text size="100">
                        These cookies enable core functionality such as
                        security, verification of identity and network
                        management. These cookies can’t be disabled.
                      </Text>
                    </Flex>
                  </Label>
                </Flex.Item>
                <Switch
                  disabled
                  switched={true}
                  onChange={() => undefined}
                  id="essential-cookie"
                />
              </Flex>
              <Flex alignItems="center" gap={{ row: 1, column: 0 }}>
                <Flex.Item flex="grow">
                  <Label htmlFor="marketing-cookie">
                    <Flex direction="column" gap={{ column: 1, row: 0 }}>
                      <Text>Enable Marketing Cookies</Text>
                      <Text size="100">
                        These cookies are used to track advertising
                        effectiveness to provide a more relevant service and
                        deliver better ads to suit your interests.
                      </Text>
                    </Flex>
                  </Label>
                </Flex.Item>
                <Switch
                  switched={marketingCookie === "true" ? true : false}
                  onChange={toggleMarketingCookie}
                  id="marketing-cookie"
                />
              </Flex>
              <Flex alignItems="center" gap={{ row: 1, column: 0 }}>
                <Flex.Item flex="grow">
                  <Label htmlFor="analytics-cookie">
                    <Flex direction="column" gap={{ column: 1, row: 0 }}>
                      <Text>Enable Analytics Cookies</Text>
                      <Text size="100">
                        These cookies help us to understand how visitors
                        interact with our website, discover errors and provide a
                        better overall analytics.
                      </Text>
                    </Flex>
                  </Label>
                </Flex.Item>
                <Switch
                  switched={analyticsCookie === "true" ? true : false}
                  onChange={toggleAnalyticsCookie}
                  id="anlaytics-cookie"
                />
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Modal>
    </Layer>
  );
}
