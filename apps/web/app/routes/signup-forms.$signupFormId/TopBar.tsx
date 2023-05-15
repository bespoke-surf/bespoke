import { useLoaderData, useNavigate, useNavigation } from "@remix-run/react";
import { useFormikContext } from "formik";
import {
  Box,
  Button,
  ButtonGroup,
  CompositeZIndex,
  Flex,
  Icon,
  IconButton,
  Layer,
  Pulsar,
  Spinner,
  Status,
  TapArea,
  TextField,
  Toast,
  Tooltip,
} from "gestalt";
import { useCallback, useEffect, useReducer, useRef } from "react";
import type { loader, MyFromValue } from ".";
import { SignupFormState } from "../../graphql/__generated__/graphql";
import { useDebounce } from "../../hooks/useDebounce";
import { useTimeoutTrigger } from "../../hooks/useTimeoutTrigger";
import { FormZindex } from "./types";

const TopBarZindex = new CompositeZIndex([FormZindex]);

export const TopBar = () => {
  const {
    handleSubmit,
    values,
    setFieldValue,
    touched,
    errors,
    handleChange,
    handleBlur,
  } = useFormikContext<MyFromValue>();
  const navigate = useNavigate();
  const loaderData = useLoaderData<typeof loader>();

  const [successPulsar, toggleSuccessPulsar] = useReducer((s) => !s, false);
  const anchorRef = useRef(null);

  const navigation = useNavigation();

  const { state: toast, setState: setToast } = useTimeoutTrigger(5000);

  const loading =
    navigation.state === "loading" || navigation.state === "submitting";

  const debounsedFormstate = useDebounce(
    loaderData.signupForm?.formState,
    1000
  );

  const close = useCallback(() => {
    navigate("..");
  }, [navigate]);

  useEffect(() => {
    if (debounsedFormstate !== values.formState) {
      handleSubmit();
    }
  }, [debounsedFormstate, values.formState, handleSubmit]);

  const handleKeyDown = useCallback(
    ({ event }: { event: React.KeyboardEvent<HTMLInputElement> }) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  const handleToggleFormState = useCallback(() => {
    if (values.formState === SignupFormState.Draft) {
      setFieldValue("formState", SignupFormState.Live);
      setToast(true);
    } else {
      setFieldValue("formState", SignupFormState.Draft);
    }
  }, [setFieldValue, setToast, values.formState]);

  const onRefChange = useCallback(
    (node: HTMLDivElement) => {
      if (node?.offsetHeight) {
        setFieldValue("boxHeight", node.offsetHeight);
      }
    },
    [setFieldValue]
  );

  return (
    <>
      {toast && (
        <Layer zIndex={TopBarZindex}>
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
              text="This Signup Form is now live on your store"
              //@ts-ignore
              type="default"
            />
          </Box>
        </Layer>
      )}
      <Box
        borderStyle="raisedBottomShadow"
        padding={2}
        color="light"
        ref={onRefChange}
      >
        <Flex direction="column">
          <Flex
            justifyContent="between"
            alignItems="center"
            gap={{ row: 0, column: 2 }}
            wrap
          >
            <Flex.Item>
              <Flex alignItems="center" gap={2}>
                <IconButton
                  accessibilityLabel="back"
                  icon="arrow-back"
                  type="button"
                  onClick={close}
                />

                <TextField
                  id="name"
                  size="lg"
                  name="name"
                  onChange={({ event }) => handleChange(event)}
                  onBlur={({ event }) => handleBlur(event)}
                  value={values.name}
                  placeholder="Signup form name"
                  errorMessage={
                    touched.name && errors.name ? errors.name : undefined
                  }
                  onKeyDown={handleKeyDown}
                />
              </Flex>
            </Flex.Item>
            <Flex gap={1}>
              {loading ? (
                <Spinner show accessibilityLabel="loading" />
              ) : (
                <Flex gap={1} alignItems="center">
                  {errors.form || errors.success ? (
                    <Flex gap={1} alignItems="center">
                      <Status
                        type="problem"
                        accessibilityLabel="problem"
                        subtext={
                          errors.form
                            ? "Please add content to form"
                            : "Please add content to success"
                        }
                        title={
                          errors.form ? "Form is empty" : "Success is empty"
                        }
                      />
                      <Tooltip
                        text="If you are still seeing this error, add any content to the form or success and delete it."
                        zIndex={{ index: () => 999 }}
                      >
                        <Icon
                          accessibilityLabel="info"
                          icon="info-circle"
                          size={12}
                        />
                      </Tooltip>
                    </Flex>
                  ) : null}
                  <Button
                    text="Save"
                    size="lg"
                    color="gray"
                    disabled={!!errors.form || !!errors.success}
                    onClick={() => handleSubmit()}
                  />
                </Flex>
              )}
              <Tooltip
                text={
                  !loaderData.signupForm?.form?.html ||
                  !loaderData.signupForm?.success?.html
                    ? "Save to turn on Form"
                    : values.formState === SignupFormState.Draft
                    ? "Turn on form"
                    : "Turn off Form"
                }
                zIndex={TopBarZindex}
              >
                <Button
                  text={
                    values.formState === SignupFormState.Draft
                      ? "Turn on Form"
                      : "Trun off Form"
                  }
                  size="lg"
                  disabled={
                    loading ||
                    !!errors.form ||
                    !!errors.success ||
                    !loaderData.signupForm?.form?.html ||
                    !loaderData.signupForm?.success?.html
                  }
                  color={
                    values.formState === SignupFormState.Draft ? "red" : "white"
                  }
                  onClick={handleToggleFormState}
                />
              </Tooltip>
            </Flex>
          </Flex>
          <Flex gap={2} alignItems="center" justifyContent="center">
            <ButtonGroup>
              <Button
                size="lg"
                text="Form"
                color="gray"
                selected={values.formType === "form"}
                onClick={() => setFieldValue("formType", "form")}
              />
              <Box position="relative">
                <Button
                  size="lg"
                  text="Success"
                  color="gray"
                  selected={values.formType === "success"}
                  onClick={() => setFieldValue("formType", "success")}
                />

                {!errors.form && errors.success && (
                  <Box
                    ref={anchorRef}
                    position="absolute"
                    top
                    marginTop={-8}
                    marginStart={-2}
                  >
                    <TapArea
                      onMouseEnter={() => {
                        if (!errors.form && errors.success) {
                          console.log("on mouse enter");
                          toggleSuccessPulsar();
                        }
                      }}
                    >
                      <Pulsar size={110} paused={successPulsar} />
                    </TapArea>
                  </Box>
                )}
              </Box>
            </ButtonGroup>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
