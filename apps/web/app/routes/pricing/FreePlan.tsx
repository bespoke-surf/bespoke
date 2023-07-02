import { Box, Button, Flex, Module, Text } from "gestalt";
import { Details, commonDetails } from "./Details";
const FreePlanModal = () => {
  return (
    <Module id="free" type="info" title="Free">
      <Flex direction="column" gap={8}>
        <Text size="300">2,000 contacts + 6,000 marketing emails/month</Text>
        <Flex direction="row" justifyContent="between" alignItems="baseline">
          <Text weight="bold">$0/mo</Text>
          <Button
            text="Start for free"
            href="/signup"
            role="link"
            size="lg"
            color="blue"
          />
        </Flex>
      </Flex>
    </Module>
  );
};

export const FreePlan = () => {
  return (
    <>
      <Box display="none" smDisplay="none" mdDisplay="block" lgDisplay="block">
        <Flex justifyContent="between" gap={{ row: 4, column: 0 }}>
          <FreePlanModal />
          <Box
            display="none"
            smDisplay="none"
            mdDisplay="block"
            lgDisplay="block"
          >
            <FreePlanDetails />
          </Box>
        </Flex>
      </Box>
      <Box display="block" smDisplay="block" mdDisplay="none" lgDisplay="none">
        <FreePlanModal />
      </Box>
    </>
  );
};

export const FreePlanDetails = () => {
  return (
    <Flex gap={2} direction="column">
      {commonDetails.map((data) => (
        <Details data={data} type="success" key={data} />
      ))}
      <Details data="Subscription Rewards Every Month" type="fail" />
      <Details data="1 Sign-up Form" type="success" />
      <Details data="Automation" type="success" />
      <Details data="No Dedicated IPs" type="fail" />
    </Flex>
  );
};

export const FreePlanHosted = () => {
  return (
    <>
      <Box display="none" smDisplay="none" mdDisplay="block" lgDisplay="block">
        <Flex justifyContent="between" gap={{ row: 4, column: 0 }}>
          <Flex.Item flex="grow">
            <Module id="free" type="info" title="Self-Hosted">
              <Flex direction="column" gap={8}>
                <Text size="300">Free, forever</Text>
                <Flex
                  direction="row"
                  justifyContent="between"
                  alignItems="baseline"
                >
                  <Box />
                  <Button
                    text="Self Host Guide"
                    href=""
                    role="link"
                    size="lg"
                    color="blue"
                  />
                </Flex>
              </Flex>
            </Module>
          </Flex.Item>
          <Box
            marginStart={12}
            display="none"
            smDisplay="none"
            mdDisplay="block"
            lgDisplay="block"
          >
            <FreePlanDetailsHosted />
          </Box>
        </Flex>
      </Box>
      <Box display="block" smDisplay="block" mdDisplay="none" lgDisplay="none">
        <FreePlanModal />
      </Box>
    </>
  );
};

export const FreePlanDetailsHosted = () => {
  return (
    <Flex gap={2} direction="column">
      <Details data="Open Source under MIT Licence" type="success" />
      <Details data="Everthing under Cloud Free Plan" type="success" />
      <Details data="REST API" type="success" />
      <Details data="Unlimited Sign-up Forms" type="success" />
      <Details data="Dedicated IPs (coming soon)" type="success" />
      <Details data="Discord Support" type="success" />
      <Details data="Buy Templates & Forms" type="fail" />
      <Details data="Shared Strategies" type="fail" />
      <Details data="Subscirption Reward Every Month" type="fail" />
    </Flex>
  );
};
