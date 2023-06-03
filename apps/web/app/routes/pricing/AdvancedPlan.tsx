import { Box, Flex } from "gestalt";
import { Details, commonDetails } from "./Details";
import { PlanSelector } from "./PlanSelector";

export const AdvancedPlan = () => {
  return (
    <>
      <Box display="none" smDisplay="none" mdDisplay="block" lgDisplay="block">
        <Flex
          direction="row"
          justifyContent="between"
          gap={{ column: 2, row: 4 }}
        >
          <AdvancedPlanDetails />
          <PlanSelector
            heading="Level up with powerful features to advance your email marketing program."
            type="advanced"
          />
        </Flex>
      </Box>
      <Box display="block" smDisplay="block" mdDisplay="none" lgDisplay="none">
        <PlanSelector
          heading="Level up with powerful features to advance your email marketing program."
          type="advanced"
        />
      </Box>
    </>
  );
};

export const AdvancedPlanDetails = () => {
  return (
    <Flex gap={2} direction="column">
      {commonDetails.map((data) => (
        <Details data={data} type="success" key={data} />
      ))}
      <Details data="15 Sign-up Form" type="success" />
      <Details data="Subscription Rewards Every Month" type="success" />
      <Details data="Ticket & Chat Support" type="success" />
      <Details data="Automation" type="success" />
      <Details data="Dedicated IPs (coming soon)" type="success" />
    </Flex>
  );
};
