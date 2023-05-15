import { useActionData } from "@remix-run/react";
import { loadCountries, loadCountry } from "@shopify/address";
import { useFormikContext } from "formik";
import { Flex, Heading, SelectList, Text, TextField } from "gestalt";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { BusinessProfileSetting } from "./types";

export default function Address() {
  const { handleChange, handleBlur, values, errors, touched, setFieldValue } =
    useFormikContext<BusinessProfileSetting>();

  const actionData = useActionData<{
    errors?: BusinessProfileSetting | undefined;
  }>();

  const [countryOptions, setCountryOptions] = useState([
    { label: "", value: "" },
  ]);
  const [labels, setLabels] = useState({
    province: "State",
    postalCode: "Zip Code",
  });

  const [stateOptions, setStateOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const countryOptionsLoad = useCallback(async () => {
    const response = await loadCountries("en");
    const d = response.map((c) => ({
      label: c.name,
      value: c.code,
    }));
    setCountryOptions(d);
  }, []);

  const stateOptionLoad = useCallback(
    async (c: string) => {
      const response = await loadCountry("en", c);
      const d = response.zones.map((z) => ({ label: z.name, value: z.code }));
      setLabels({
        province: response.labels.zone,
        postalCode: response.labels.postalCode,
      });
      setStateOptions(d);
      setFieldValue("stateCount", d.length);
    },
    [setFieldValue]
  );

  useEffect(() => {
    countryOptionsLoad();
  }, [countryOptionsLoad]);

  useEffect(() => {
    stateOptionLoad(values.country);
  }, [values.country, stateOptionLoad]);

  const countrySelectOptions = useMemo(
    () =>
      countryOptions.map(({ label, value }) => (
        <SelectList.Option label={label} value={value} key={value} />
      )),
    [countryOptions]
  );

  const stateSelectOptions = useMemo(
    () =>
      stateOptions.map(({ label, value }) => (
        <SelectList.Option label={label} value={value} key={value} />
      )),
    [stateOptions]
  );

  return (
    <Flex
      direction="column"
      gap={{
        row: 0,
        column: 8,
      }}
    >
      <Flex flex="grow" direction="column" gap={{ row: 0, column: 2 }}>
        <Heading size="400" accessibilityLevel={2}>
          Contact Info
        </Heading>
        <Text>
          We use this information as the sender and in the footer of your emails
          to comply with the CAN-SPAM act
        </Text>
      </Flex>
      <Flex flex="grow" direction="column" gap={{ row: 0, column: 4 }}>
        <Text size="300" weight="bold">
          Sender name and email
        </Text>
        <Flex flex="grow" gap={{ row: 2, column: 2 }} wrap>
          <TextField
            size="lg"
            label="Sender name"
            id="senderName"
            name="senderName"
            onChange={({ event }) => handleChange(event)}
            onBlur={({ event }) => handleBlur(event)}
            placeholder="PiedPiper or Richard Hendricks"
            value={values.senderName}
            errorMessage={
              touched.senderName && errors.senderName
                ? errors.senderName
                : actionData?.errors?.senderName ?? null
            }
          />
          <TextField
            size="lg"
            label="Sender email address"
            id="senderEmail"
            name="senderEmail"
            onChange={({ event }) => handleChange(event)}
            onBlur={({ event }) => handleBlur(event)}
            placeholder="info@pp.com or r.h@pp.com"
            helperText="subscribers might reply to this email"
            value={values.senderEmail}
            errorMessage={
              touched.senderEmail && errors.senderEmail
                ? errors.senderEmail
                : actionData?.errors?.senderEmail ?? null
            }
          />
        </Flex>
      </Flex>
      <Flex direction="column" gap={{ row: 0, column: 4 }}>
        <Text size="300" weight="bold">
          Address
        </Text>

        <TextField
          id="address1"
          name="address1"
          label="Address"
          type="text"
          size="lg"
          placeholder="Address"
          value={values.address1}
          onChange={({ event }) => handleChange(event)}
          onBlur={({ event }) => handleBlur(event)}
          errorMessage={
            touched.address1 && errors.address1
              ? errors.address1
              : actionData?.errors?.address1 ?? null
          }
        />
        <TextField
          size="lg"
          id="address2"
          name="address2"
          label="Apartment, suite, etc."
          type="text"
          placeholder="Apartment, suite, etc."
          value={values.address2}
          onChange={({ event }) => handleChange(event)}
          onBlur={({ event }) => handleBlur(event)}
          errorMessage={
            touched.address2 && errors.address2
              ? errors.address2
              : actionData?.errors?.address2 ?? null
          }
        />
        <Flex gap={4} direction="column">
          <TextField
            size="lg"
            id="city"
            name="city"
            label="City"
            type="text"
            placeholder="City"
            value={values.city}
            onChange={({ event }) => handleChange(event)}
            onBlur={({ event }) => handleBlur(event)}
            errorMessage={
              touched.city && errors.city
                ? errors.city
                : actionData?.errors?.city ?? null
            }
          />
          <SelectList
            id="country"
            onChange={({ event }) => handleChange(event)}
            placeholder="Country"
            size="lg"
            label="Country"
            value={values.country}
            errorMessage={
              touched.country && errors.country
                ? (errors.country as string)
                : actionData?.errors?.country ?? undefined
            }
          >
            {countrySelectOptions}
          </SelectList>
        </Flex>

        <Flex gap={2}>
          {stateOptions.length > 0 && (
            <SelectList
              id="province"
              name="state"
              onChange={({ event }) => handleChange(event)}
              value={values.state}
              size="lg"
              label={`${labels.province}`}
              errorMessage={
                touched.state && errors.state
                  ? (errors.state as string)
                  : actionData?.errors?.state ?? undefined
              }
            >
              {stateSelectOptions}
            </SelectList>
          )}
          <TextField
            id="zipCode"
            name="zipCode"
            size="lg"
            type="text"
            label={`${labels.postalCode}`}
            placeholder={`${labels.postalCode}`}
            value={values.zipCode}
            errorMessage={
              touched.zipCode && errors.zipCode
                ? errors.zipCode
                : actionData?.errors?.zipCode ?? null
            }
            onChange={({ event }) => handleChange(event)}
            onBlur={({ event }) => handleBlur(event)}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
