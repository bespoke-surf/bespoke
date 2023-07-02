import { useFormikContext } from "formik";
import { Flex, Heading, Text, TextArea, TextField } from "gestalt";
import type { IOnboardingFormValues } from "./types";

export default function Page1() {
  const { handleChange, handleBlur, values, touched, errors } =
    useFormikContext<IOnboardingFormValues>();
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
          Brand Info
        </Heading>
        <Text>
          Enter your brand details so your audience can recognize you faster.
        </Text>
      </Flex>
      <Flex flex="grow" direction="column" gap={{ row: 0, column: 4 }}>
        <TextField
          id="name"
          label="Brand name"
          onChange={({ event }) => handleChange(event)}
          onBlur={({ event }) => handleBlur(event)}
          placeholder="Nike, Adidas, Microsoft, Tesla etc..."
          value={values.name}
          type="text"
          name="name"
          size="lg"
          autoComplete="off"
          errorMessage={touched.name && errors.name ? errors.name : null}
        />
        <TextArea
          id="about"
          label="About you brand"
          onChange={({ event }) => handleChange(event)}
          onBlur={({ event }) => handleBlur(event)}
          placeholder="Eg: Empowering humanity to become financially independent."
          value={values.about}
          name="about"
          errorMessage={touched.about && errors.about ? errors.about : null}
        />
      </Flex>
    </Flex>
  );
}
