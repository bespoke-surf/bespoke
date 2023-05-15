import { useActionData, useSubmit, useTransition } from "@remix-run/react";
import { useFormikContext } from "formik";
import { Flex, Heading, Icon, Text, TextField } from "gestalt";
import { useEffect } from "react";
import { REPLACE_ALL_SPACES_REGEX } from "~/utils/utils.server";
import { useDebounce } from "../../hooks/useDebounce";
import type { IOnboardingFormValues } from "./types";
import { ActionEnum } from "./types";

export default function Page3() {
  const { handleChange, handleBlur, values, touched, errors } =
    useFormikContext<IOnboardingFormValues>();
  const transition = useTransition();
  const submit = useSubmit();

  const actionData = useActionData<{
    errors: IOnboardingFormValues;
    available: boolean;
  }>();

  const ischeckingName =
    transition.submission &&
    transition.submission.formData.get("_action") ===
      ActionEnum.checkNameAvailabel;

  const debouncedBusinsessName = useDebounce(values.subdomain, 1000);

  useEffect(() => {
    if (debouncedBusinsessName) {
      const formData = new FormData();
      formData.append("_action", ActionEnum.checkNameAvailabel);
      formData.append("subdomain", debouncedBusinsessName);
      submit(formData, { method: "post" });
    }
  }, [debouncedBusinsessName, submit]);

  return (
    <Flex gap={{ column: 8, row: 0 }} justifyContent="start" direction="column">
      <Flex flex="grow" direction="column" gap={{ row: 0, column: 2 }}>
        <Heading size="400" accessibilityLevel={2}>
          Business URL
        </Heading>
        <Text>Enter a business URL so your audience can engage with you.</Text>
      </Flex>
      <Flex direction="column" gap={{ column: 2, row: 0 }}>
        <Text size="100">Brand URL</Text>
        <Flex justifyContent="between" gap={2} wrap alignItems="center">
          <Flex alignItems="center" gap={1}>
            <TextField
              id="subdomain"
              size="lg"
              autoComplete="off"
              onChange={({ event }) => handleChange(event)}
              onBlur={({ event }) => handleBlur(event)}
              placeholder={values.name
                .replace(REPLACE_ALL_SPACES_REGEX, "")
                .toLocaleLowerCase()}
              value={values.subdomain}
              name="subdomain"
              errorMessage={
                actionData?.available === false
                  ? "This name is take"
                  : touched.subdomain && errors.subdomain
                  ? errors.subdomain
                  : null
              }
            />
            <Text overflow="breakWord">.bespoke.surf</Text>
          </Flex>
          {values.subdomain && actionData?.available && !ischeckingName && (
            <Icon
              accessibilityLabel="check"
              color="success"
              icon="check-circle"
            />
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}
