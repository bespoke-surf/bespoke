import type { IPricing } from "@bespoke/common/dist/pricingPlan";
import {
  ADVANCED_PLAN_10K_ID,
  BASIC_PLAN_5K_ID,
  bespokePricingPlan,
} from "@bespoke/common/dist/pricingPlan";
import ClaySlider from "@clayui/slider";
import { Box, Button, Flex, Module, Text } from "gestalt";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { AdvancedPlanDetails } from "./AdvancedPlan";
import { BasicPlanDetails } from "./BasicPlan";
import { numberWithCommas } from "./pricingUtil";
export const PlanSelector = ({
  heading,
  type,
}: {
  heading: string;
  type: IPricing["type"];
}) => {
  const [pricing, setPricing] = useState<IPricing | undefined>(undefined);
  const [contactStep, setContactStep] = useState(1000);
  const [contacts, setCotnacts] = useState(0);
  const [emailStep, setEmailStep] = useState(1000);
  const [emails, setEmails] = useState(0);
  const [features, toggleFeatures] = useReducer((s) => !s, false);
  const pricingPlan = useMemo(
    () => bespokePricingPlan.filter(({ type: t }) => t === type),
    [type]
  );

  const handleContactChange = useCallback(
    (number: number) => {
      setCotnacts(number);
      if (pricingPlan?.some(({ contacts: c }) => c === number)) {
        const pricing = pricingPlan?.find(({ contacts: c }) => c === number);
        if ((pricing?.emails ?? 0) > emails) {
          setPricing(pricing);
        }
      } else if (number < 10000) {
        const pricing = pricingPlan?.find(
          ({ id }) =>
            id ===
            (type === "advanced" ? ADVANCED_PLAN_10K_ID : BASIC_PLAN_5K_ID)
        );
        if ((pricing?.emails ?? 0) > emails) {
          setPricing(pricing);
        }
      }
    },
    [emails, pricingPlan, type]
  );

  const handleEmailChange = useCallback(
    (number: number) => {
      setEmails(number);
      if (pricingPlan?.some(({ emails: e }) => e === number)) {
        const pricing = pricingPlan.find(({ emails: e }) => e === number);
        if ((pricing?.contacts ?? 0) > contacts) {
          setPricing(pricing);
        }
      } else if (number < 10000) {
        const pricing = pricingPlan?.find(
          ({ id }) =>
            id ===
            (type === "advanced" ? ADVANCED_PLAN_10K_ID : BASIC_PLAN_5K_ID)
        );
        if ((pricing?.contacts ?? 0) > contacts) {
          setPricing(pricing);
        }
      }
    },
    [contacts, pricingPlan, type]
  );

  useEffect(() => {
    if (contacts >= 10000 && contacts < 50000) {
      setContactStep(5000);
    }
    if (contacts < 10000) {
      setContactStep(1000);
    }

    if (contacts >= 50000) {
      setContactStep(10000);
    }
  }, [contacts, type]);
  useEffect(() => {
    if (type == "advanced") {
      if (emails >= 50000 && emails < 200000) {
        setEmailStep(10000);
      }
      if (emails < 50000) {
        setEmailStep(5000);
      }

      if (emails >= 200000) {
        setEmailStep(50000);
      }
    } else {
      if (emails >= 10000 && emails < 50000) {
        setEmailStep(5000);
      }
      if (emails < 10000) {
        setEmailStep(1000);
      }

      if (emails >= 50000 && emails < 200000) {
        setEmailStep(10000);
      }
      if (emails >= 200000) {
        setEmailStep(50000);
      }
    }
  }, [emails, type]);

  return (
    <Module
      id="Advanced"
      type="info"
      title={
        pricing
          ? pricing?.id.replace(/_/g, " ")
          : type === "basic"
          ? "BASIC"
          : "ADVANCED"
      }
    >
      <Flex direction="column" gap={8}>
        <Box maxWidth={400}>
          {pricing ? (
            <Text size="300">
              Send upto {numberWithCommas(pricing?.contacts ?? 0)} contacts and{" "}
              {numberWithCommas(pricing?.emails ?? 0)} emails/mo before overages
              apply
            </Text>
          ) : (
            heading
          )}
        </Box>
        <Flex direction="column" gap={2}>
          <ClaySlider
            id="contact-step"
            onChange={handleContactChange}
            value={contacts}
            max={type == "basic" ? 100000 : 200000}
            step={contactStep}
          />

          <Text align="center">{numberWithCommas(contacts)} contacts</Text>
        </Flex>
        <Flex direction="column" gap={2}>
          <ClaySlider
            id="email-step"
            onChange={handleEmailChange}
            value={emails}
            max={type === "advanced" ? 1000000 : 300000}
            step={emailStep}
          />

          <Text align="center">{numberWithCommas(emails)} emails/mo</Text>
        </Flex>

        <Flex direction="row" justifyContent="between" alignItems="baseline">
          <Text weight="bold">
            {pricing ? null : "Starts at "}$
            {pricing ? pricing?.price : type === "basic" ? "15" : "60"}
            /mo{pricing ? " estimated*" : "*"}
          </Text>
          <Button
            text="Start for free"
            size="lg"
            color="blue"
            href="/signup"
            role="link"
          />
        </Flex>
      </Flex>
      <Box
        display="block"
        smDisplay="block"
        mdDisplay="none"
        lgDisplay="none"
        marginTop={8}
      >
        <Flex justifyContent="center">
          <Button
            onClick={toggleFeatures}
            selected={features}
            text="Show Features"
            color="white"
          />
        </Flex>
        <Box marginTop={4} />
        {features && type === "advanced" && <AdvancedPlanDetails />}
        {features && type === "basic" && <BasicPlanDetails />}
      </Box>
    </Module>
  );
};
