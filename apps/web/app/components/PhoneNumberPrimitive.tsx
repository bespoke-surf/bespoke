import { useFormikContext } from "formik";
import { Box, Flex, Text, TextField } from "gestalt";
import type { CountryCode } from "libphonenumber-js";
import { getCountries, getCountryCallingCode } from "libphonenumber-js";
import { useState } from "react";
import countryNames from "../utils/countryNames.json";

const flagUrl = "https://flag.pk/flags/4x3/{xx}.svg";

const countries = getCountries().map((country) => (
  <option key={country} value={country}>
    {countryNames[country]} +{getCountryCallingCode(country)}
  </option>
));

const PhoneNumberPrimitive = () => {
  const formik = useFormikContext<{
    countryCode: CountryCode;
    number: number;
  }>();

  const [selectValue, setSelectValue] = useState<CountryCode>(
    formik.values?.countryCode
  );
  return (
    <Flex
      alignItems="center"
      direction="row"
      justifyContent="start"
      width="100%"
    >
      <Box display="flex" position="relative" alignItems="center">
        <select
          value={selectValue}
          onChange={({ target }) => {
            setSelectValue(target.value as CountryCode);
            formik.setFieldValue("countryCode", target.value);
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            zIndex: "1",
            border: 0,
            opacity: 0,
            cursor: "pointer",
          }}
        >
          {countries}
        </select>
        <Box padding={3}>
          <Flex gap={1} alignItems="center">
            <img
              style={{ width: 35 }}
              alt="flag"
              role="presentation"
              src={flagUrl
                .replace("{XX}", selectValue)
                .replace("{xx}", selectValue.toLowerCase())}
            />

            <Text>+{getCountryCallingCode(selectValue)}</Text>
          </Flex>
        </Box>
      </Box>
      <Box width="100%">
        <TextField
          id="number"
          name="number"
          onChange={({ event }) => formik.handleChange(event)}
          onBlur={({ event }) => formik.handleBlur(event)}
          placeholder="Phone number"
          label="Phone number"
          autoComplete="on"
          type="tel"
          value={
            formik.values.number === 0
              ? undefined
              : String(formik.values.number)
          }
          helperText="10 digit phone number"
          errorMessage={
            formik.errors.number && formik.touched.number
              ? formik.errors.number
              : undefined
          }
          size="lg"
        />
      </Box>
    </Flex>
  );
};
export default PhoneNumberPrimitive;
