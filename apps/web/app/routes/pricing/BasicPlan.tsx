import { Box, Flex } from "gestalt";
import { Details, commonDetails } from "./Details";
import { PlanSelector } from "./PlanSelector";

export const BasicPlan = () => {
  return (
    <>
      <Box display="none" smDisplay="none" mdDisplay="block" lgDisplay="block">
        <Flex
          direction="row"
          justifyContent="between"
          gap={{ row: 2, column: 4 }}
        >
          <BasicPlanDetails />
          <PlanSelector
            heading="Design, send, and measure email marketing campaigns with ease."
            type="basic"
          />
        </Flex>
      </Box>
      <Box display="block" smDisplay="block" mdDisplay="none" lgDisplay="none">
        <PlanSelector
          heading="Design, send, and measure email marketing campaigns with ease."
          type="basic"
        />
      </Box>
    </>
  );
};
export const BasicPlanDetails = () => {
  return (
    <Flex gap={2} direction="column" justifyContent="center">
      {commonDetails.map((data) => (
        <Details data={data} type="success" key={data} />
      ))}
      <Details data="5 Sign-up Form" type="success" />
      <Details data="Subscription Rewards Every Month" type="success" />
      <Details data="Ticket & Chat Support" type="success" />
      <Details data="No Automation" type="fail" />
      <Details data="No Dedicated IPs" type="fail" />
    </Flex>
  );
};
