import type { IPricing } from "@bespoke/common/dist/pricingPlan";
import { bespokePricingPlan } from "@bespoke/common/dist/pricingPlan";
import ClaySlider from "@clayui/slider";
import {
  Box,
  Button,
  CompositeZIndex,
  FixedZIndex,
  Flex,
  Heading,
  IconButton,
  Layer,
  Link,
  Modal,
  Module,
  Table,
  Text,
} from "gestalt";
import { useCallback, useMemo, useReducer, useState } from "react";
import { AdvancedPlanDetails } from "./AdvancedPlan";
import { BasicPlanDetails } from "./BasicPlan";
import { numberWithCommas } from "./pricingUtil";

function findPricing(
  value: number,
  array: IPricing[],
  type: "contacts" | "emails"
): IPricing | undefined {
  const lenght = array.length;
  const lastOne = array[lenght - 1]?.[type];

  if (lastOne && value >= lastOne) {
    return array[lenght - 1];
  }

  const firstOne = array[0]?.[type];
  if (firstOne && value < firstOne) {
    return array[0];
  }

  let closestIndex = 0;
  for (let i = 0; i < array.length; i++) {
    const ith = array[i]?.[type];
    const closest = array[closestIndex]?.[type];
    if (ith && closest && ith <= value && ith > closest) {
      closestIndex = i;
    }
  }

  return array[closestIndex];
}

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
  const [overagesModal, toggleOveragesModal] = useReducer((s) => !s, false);

  const handleContactChange = useCallback(
    (number: number) => {
      setCotnacts(number);
      const pricing = findPricing(number, pricingPlan, "contacts");
      setPricing(pricing);
      if (contacts < 10000) {
        setContactStep(1000);
      }
      if (contacts >= 10000 && contacts < 50000) {
        setContactStep(5000);
      }

      if (contacts >= 50000) {
        setContactStep(10000);
      }
    },
    [contacts, pricingPlan]
  );

  const handleEmailChange = useCallback(
    (number: number) => {
      setEmails(number);
      const pricing = findPricing(number, pricingPlan, "emails");
      setPricing(pricing);
      if (emails < 50000) {
        setEmailStep(5000);
      }
      if (emails >= 50000 && emails < 200000) {
        setEmailStep(10000);
      }
      if (emails >= 200000) {
        setEmailStep(50000);
      }
      if (type === "basic") {
        if (emails < 10000) {
          setEmailStep(1000);
        }
        if (emails >= 10000) {
          setEmailStep(5000);
        }
      }
    },
    [emails, pricingPlan, type]
  );

  return (
    <>
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
              <Text size="300" inline>
                Send upto {numberWithCommas(pricing?.contacts ?? 0)} contacts
                and {numberWithCommas(pricing?.emails ?? 0)} emails/mo before{" "}
                <Link
                  display="inlineBlock"
                  href=""
                  underline="always"
                  onClick={toggleOveragesModal}
                >
                  overages apply{" "}
                </Link>
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
      {overagesModal && <OveragesModal close={toggleOveragesModal} />}
    </>
  );
};

const HEADER_ZINDEX = new FixedZIndex(10);
const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

const OveragesModal = ({ close }: { close: () => void }) => {
  return (
    <Layer zIndex={zIndex}>
      <Modal
        onDismiss={close}
        accessibilityModalLabel="Choose how to claim site"
        align="start"
        heading={
          <Flex justifyContent="between">
            <Heading size="500" accessibilityLevel={1}>
              Overage Rates
            </Heading>
            <IconButton
              accessibilityLabel="Dismiss modal"
              bgColor="white"
              icon="cancel"
              iconColor="darkGray"
              onClick={close}
              size="sm"
            />
          </Flex>
        }
        size="sm"
      >
        <Table accessibilityLabel="Main example table">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <Text weight="bold">Plan Information</Text>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Text weight="bold">Monthly Plan Limits</Text>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Text weight="bold">Cost per extra Email or Contact</Text>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {[
              {
                plan: "Free",
                limit: "2,000 contacts and 6,000 emails",
                cost: "-",
              },
              {
                plan: "Basic 5K",
                limit: "5,000 contacts and 15,000 emails",
                cost: "$0.0040",
              },
              {
                plan: "Basic 10K",
                limit: "10,000 contacts and 30,000 emails",
                cost: "$0.0030",
              },
              {
                plan: "Basic 20K",
                limit: "20,000 contacts and 60,000 emails",
                cost: "$0.0030",
              },
              {
                plan: "Basic 50K",
                limit: "50,000 contacts and 150,000 emails",
                cost: "$0.0028",
              },
              {
                plan: "Basic 100K",
                limit: "100,000 contacts and 300,000 emails",
                cost: "$0.0023",
              },
              {
                plan: "Advanced 10K",
                limit: "10,000 contacts and 50,000 emails",
                cost: "$0.0075",
              },
              {
                plan: "Advanced 20K",
                limit: "20,000 contacts and 100,000 emails",
                cost: "$0.0060",
              },
              {
                plan: "Advanced 50K",
                limit: "50,000 contacts and 250,000 emails",
                cost: "$0.0060",
              },
              {
                plan: "Advanced 100K",
                limit: "100,000 contacts and 500,000 emails",
                cost: "$0.0050",
              },
              {
                plan: "Advanced 200K",
                limit: "200,000 contacts and 1,000,000 emails",
                cost: "$0.0050",
              },
            ].map(({ cost, limit, plan }) => (
              <Table.Row key={plan}>
                <Table.Cell>
                  <Text>{plan}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text>{limit}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text>{cost}</Text>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Modal>
    </Layer>
  );
};
