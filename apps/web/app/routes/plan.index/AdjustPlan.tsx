import { pricingPlan } from "@bespoke/common/dist/pricingPlan";
import { useFetcher, useRouteLoaderData } from "@remix-run/react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Label,
  Layer,
  Module,
  NumberField,
  SelectList,
  Switch,
  Text,
  Toast,
} from "gestalt";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BillingPlanStatus } from "../../graphql/__generated__/graphql";
import { useTimeoutTrigger } from "../../hooks/useTimeoutTrigger";
import type { GrowthPathData } from "../plan/types";
import { numberWithCommas } from "../pricing/pricingUtil";
import { PlanChooseActionEnum } from "./types";

const getClosestNumber = (goal: number) => {
  const reduced = pricingPlan.reduce(function (prev, curr) {
    return Math.abs(Number(curr.value) / 10 - goal) <
      Math.abs(Number(prev.value) / 10 - goal)
      ? curr
      : prev;
  });
  const indexOf = pricingPlan.findIndex((plan) => plan === reduced);

  if (indexOf === 0 && goal <= 250) return [pricingPlan[0], pricingPlan[1]];
  if (indexOf === pricingPlan.length - 2)
    return [pricingPlan[indexOf], pricingPlan[indexOf]];

  let lastIndex = pricingPlan[indexOf + 2];

  if (lastIndex === pricingPlan[pricingPlan.length - 1]) {
    lastIndex = pricingPlan[indexOf + 1];
  }

  return [pricingPlan[indexOf], lastIndex];
};

export default function AdjustPlan() {
  return (
    <Flex gap={8} direction="column">
      {/* {parentData?.integration?.shopify?.authenticated ? (
        <Callout
          type="info"
          iconAccessibilityLabel="info"
          message="We have detected that you have integrated with Shopify. Once you choose a plan, billing will be handled through Shopify subscriptions."
          title="Shopify integration detected!"
        />
      ) : null} */}
      <Flex direction="column" gap={3}>
        <GrowthPathBenefits />
      </Flex>
    </Flex>
  );
}
const GrowthPathBenefits = () => {
  const parentData = useRouteLoaderData("routes/plan/index") as GrowthPathData;

  const active =
    parentData.billing?.billingPlanStatus === BillingPlanStatus.Active;

  const free = parentData.billing?.billingPlanStatus === BillingPlanStatus.Free;

  const fetcher = useFetcher();

  const [error, setError] = useState<string | undefined>(undefined);

  const [contacts, setContacts] = useState(
    parentData?.billing?.contactsQuantity ?? 0
  );

  const [perContact, setPerContact] = useState(false);

  const closest = useMemo(() => getClosestNumber(contacts), [contacts]);
  const curretnPlan = useMemo(
    () => getClosestNumber(parentData.billing?.contactsQuantity ?? 0),
    [parentData.billing?.contactsQuantity]
  );

  const downgrade = contacts < (parentData.billing?.contactsQuantity ?? 0);
  const { setState: setToast, state: toast } = useTimeoutTrigger(5000);

  useEffect(() => {
    if (contacts > 150000 && perContact === false) {
      setPerContact(true);
    }
    if (perContact === false) {
      setError(undefined);
    }
  }, [perContact, contacts]);

  const handleChoosePlan = useCallback(() => {
    if (perContact && contacts <= 150000) {
      setError("min contacts starts at 150,001 for priced per contact");
      return;
    }
    const formData = new FormData();
    let quantity;
    if (contacts >= 150001) {
      quantity = contacts;
    } else {
      quantity = (closest[0]?.value ?? 2500) / 10;
    }
    formData.append("contactQuantity", String(quantity));
    if (parentData?.integration?.shopify?.authenticated) {
      formData.append(
        "_action",
        PlanChooseActionEnum.createShopifyAppSubscription
      );
    } else {
      formData.append("_action", PlanChooseActionEnum.createCheckoutSessionUrl);
    }
    fetcher.submit(formData, {
      method: "post",
    });
  }, [
    closest,
    contacts,
    fetcher,
    parentData?.integration?.shopify?.authenticated,
    perContact,
  ]);

  return (
    <>
      {toast && (
        <Layer zIndex={{ index: () => 10 }}>
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
              text="Please decrease the contacts entered to less than 150,001 to disable Priced Per Contact"
              //@ts-ignore
              type="error"
            />
          </Box>
        </Layer>
      )}
      <Box marginBottom={12}>
        <Heading size="400">Current Plan</Heading>
        <Box marginTop={4} />
        <Flex gap={3} direction="column">
          <Text size="300" color="dark">
            {numberWithCommas(parentData.billing?.contactsQuantity ?? 0)}{" "}
            Contacts, Newsletter, Email Marketing
          </Text>
          {free ? (
            <Text size="400" weight="bold">
              Free
            </Text>
          ) : active ? (
            <Text inline size="400" weight="bold" color="dark">
              $
              {(parentData.billing?.contactsQuantity ?? 0) > 150000
                ? Number(
                    Math.ceil(
                      (parentData.billing?.contactsQuantity ?? 0) * 0.026066
                    ) - 0.01
                  ).toFixed(2)
                : Number(
                    Number((curretnPlan[0]?.price ?? 0) - 0.01).toFixed(2)
                  )}
            </Text>
          ) : null}
        </Flex>
        <Box marginTop={5} />
        <Text weight="bold" size="300">
          {free ? "No" : null} monthly payment
        </Text>
      </Box>

      <Module id="Upgrade" title="UPGRADE YOUR PLAN" type="info">
        <Flex direction="column" gap={8}>
          <Flex direction="column" gap={{ column: 2, row: 0 }} alignItems="end">
            <Label htmlFor="base">
              <Text size="100">Enterprise Plan</Text>
            </Label>
            <Switch
              onChange={() => {
                if (contacts >= 150001) {
                  setPerContact(true);
                  setToast(true);
                } else {
                  setPerContact((s) => !s);
                }
              }}
              id="base"
              switched={perContact}
            />
          </Flex>
          {perContact ? (
            <NumberField
              label="Enter total contacts you plan to manage"
              id="contacts"
              onChange={({ value }) => {
                setContacts(value ?? 0);
              }}
              helperText={
                perContact
                  ? "min contacts starts at 150,001"
                  : `added +${
                      (closest[0]?.value ?? 0) / 10 - contacts
                    } contacts more. Priced per range.`
              }
              placeholder="active contacts"
              value={contacts}
              errorMessage={contacts >= 150001 ? undefined : error}
            />
          ) : (
            <SelectList
              id="selectlistexample10"
              label="Select a range of contacts you plan to manage"
              onChange={({ value }) => {
                setContacts(Number(value ?? 0) / 10);
              }}
              size="lg"
              value={String(contacts * 10)}
            >
              {pricingPlan.map(({ label, value }) => (
                <SelectList.Option
                  key={label}
                  label={label}
                  value={String(value)}
                />
              ))}
            </SelectList>
          )}
          <Flex direction="column" gap={6}>
            <Flex direction="column" gap={3}>
              {/* <Text weight="bold" color="dark">
                CUSTOMERS
              </Text> */}

              <Flex direction="column" gap={2}>
                <Text size="300" color="dark">
                  {numberWithCommas(
                    perContact ? contacts : (closest[0]?.value ?? 0) / 10
                  )}{" "}
                  Contacts, Newsletter, Email Marketing
                </Text>
                {/* <Text size="200" color="dark">
                  {numberWithCommas(
                    perContact ? contacts * 10 : closest[0]?.value ?? 0
                  )}{" "}
                  EMAIL SENDS
                </Text> */}
              </Flex>
              <Text inline size="400" weight="bold" color="dark">
                $
                {perContact
                  ? Number(Math.ceil(contacts * 0.026066) - 0.01).toFixed(2)
                  : Number(Number((closest[0]?.price ?? 0) - 0.01).toFixed(2))}
              </Text>
            </Flex>
            <Text weight="bold">Monthly payment</Text>
          </Flex>

          <Button
            size="lg"
            fullWidth
            text={`${
              active ? (downgrade ? "Downgrade" : "Upgrade") : "Unlock"
            } Plan`}
            color={downgrade ? "gray" : "blue"}
            onClick={handleChoosePlan}
          />
        </Flex>
      </Module>
    </>
  );
};
