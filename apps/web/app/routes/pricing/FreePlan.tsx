import { Box, Button, Flex, Module, Text } from "gestalt";
import { Details, commonDetails } from "./Details";
const FreePlanModal = () => {
  return (
    <Module id="free" type="info" title="Free">
      <Flex direction="column" gap={8}>
        <Text size="300">2,000 contacts + 6,000 marketing emails/month</Text>
        <Flex direction="row" justifyContent="between" alignItems="baseline">
          <Text weight="bold">$0/mo</Text>
          <Button text="Start for free" size="lg" color="blue" />
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
      <Details data="1 Sign-up Form" type="success" />
      <Details data="Automation" type="success" />
      <Details data="No Dedicated IPs" type="fail" />
    </Flex>
  );
};
