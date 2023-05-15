import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import {
  Link,
  useActionData,
  useFetcher,
  useRouteLoaderData,
  useSubmit,
  useTransition,
} from "@remix-run/react";
import { FormikProvider, useFormik } from "formik";
import {
  Box,
  Button,
  Dropdown,
  Flex,
  Icon,
  PageHeader,
  SlimBanner,
  Spinner,
  Text,
  TextArea,
  TextField,
} from "gestalt";
import { useCallback, useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import type { RootData } from "../../root";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import {
  isPrivateRoute,
  REPLACE_ALL_SPACES_REGEX,
} from "../../utils/utils.server";
import { action } from "./action";
import AddDisplayPic from "./AddDisplayPic";
import { links as updatePictureLink } from "./addDisplayPic/UpdatePicture";
import Address from "./Address";
import type { BusinessProfileSetting } from "./types";
import {
  BuseinssProfileSettingsSchema,
  SettingsBuisnessProfileActionEnum,
} from "./types";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};
export { action };

export const meta: MetaFunction = ({ parentsData }) => {
  const rootData = parentsData.root as RootData;

  return {
    title: `Business Profile - Settings | ${rootData.store?.name}`,
    description: "Details about your business profile & contact information",
  };
};

export const links: LinksFunction = () => {
  return [...updatePictureLink()];
};

export async function loader({ request }: LoaderArgs) {
  await isPrivateRoute(request);

  return null;
}

export default function StoreSettings() {
  const rootData = useRouteLoaderData("root") as RootData;
  const fetcher = useFetcher();
  const transition = useTransition();
  const submit = useSubmit();
  const actionData = useActionData<{
    available: boolean;
    errors?: BusinessProfileSetting | undefined;
  }>();

  const loading = fetcher.state === "loading" || fetcher.state === "submitting";
  const ischeckingName =
    transition.submission &&
    transition.submission.formData.get("_action") ===
      SettingsBuisnessProfileActionEnum.checkNameAvailable;

  const formik = useFormik<BusinessProfileSetting>({
    initialValues: {
      about: rootData?.store?.about?.about ?? "",
      name: rootData?.store?.name ?? "",
      subdomain: rootData?.store?.subdomain ?? "",
      address1: rootData?.store?.contact?.address1 ?? "",
      address2: rootData?.store?.contact?.address2 ?? "",
      country: rootData?.store?.contact?.country ?? "",
      senderEmail: rootData?.store?.contact?.senderEmail ?? "",
      senderName: rootData?.store?.contact?.senderName ?? "",
      zipCode: rootData?.store?.contact?.zipCode ?? "",
      state: rootData?.store?.contact?.state ?? "",
      city: rootData?.store?.contact?.city ?? "",
      stateCount: rootData?.store?.contact?.state ? 1 : 0,
    },
    validationSchema: BuseinssProfileSettingsSchema,
    onSubmit: useCallback(
      (values: BusinessProfileSetting) => {
        if (!rootData?.store?.id) return;
        const formData = new FormData();
        for (const [key, value] of Object.entries(values)) {
          if (key === "stateCount") continue;
          formData.append(key, value);
        }
        formData.append("storeId", rootData?.store?.id);
        formData.append(
          "_action",
          SettingsBuisnessProfileActionEnum.updateStoreDeails
        );
        fetcher.submit(formData, { method: "post" });
      },
      [fetcher, rootData?.store?.id]
    ),
  });

  const debouncedBusinsessName = useDebounce(formik.values.subdomain, 1000);

  useEffect(() => {
    if (debouncedBusinsessName !== rootData?.subdomain) {
      const formData = new FormData();
      formData.append(
        "_action",
        SettingsBuisnessProfileActionEnum.checkNameAvailable
      );
      formData.append("subdomain", debouncedBusinsessName);
      submit(formData, { method: "post" });
    }
  }, [debouncedBusinsessName, rootData?.subdomain, submit]);

  return (
    <>
      <Box paddingX={2}>
        <Flex justifyContent="start" alignItems="center" gap={2}>
          <Link to="..">
            <Text underline size="100">
              Settings
            </Text>
          </Link>

          <Icon
            accessibilityLabel="arrow-right"
            size={10}
            icon="arrow-forward"
            color="dark"
          />
          <Box color="lightWash" rounding="pill" padding={1} paddingX={2}>
            <Text size="100">Business Profile</Text>
          </Box>
        </Flex>
      </Box>
      <PageHeader
        borderStyle="none"
        title="Business Profile"
        subtext="Details about your business profile & contact information"
        primaryAction={{
          component: (
            <>
              {loading || ischeckingName ? (
                <Spinner show accessibilityLabel="loading" />
              ) : (
                <Button
                  text="Update"
                  size="lg"
                  color="red"
                  disabled={ischeckingName || loading}
                  onClick={() => formik.handleSubmit()}
                />
              )}
            </>
          ),
          dropdownItems: [
            <Dropdown.Item
              option={{ label: "Update", value: "update" }}
              onSelect={() => formik.handleSubmit()}
              key="update"
            />,
          ],
        }}
      />
      <Flex justifyContent="center">
        <Box width="91.5%" paddingY={6}>
          <Flex direction="column" gap={6}>
            <AddDisplayPic />
            <TextField
              id="name"
              name="name"
              onChange={({ event }) => formik.handleChange(event)}
              onBlur={({ event }) => formik.handleBlur(event)}
              size="lg"
              label="Business name"
              value={formik.values.name}
              errorMessage={
                formik.errors.name
                  ? formik.errors.name
                  : actionData?.errors?.name
                  ? actionData.errors.name
                  : undefined
              }
            />
            <TextArea
              id="about"
              name="about"
              onChange={({ event }) => formik.handleChange(event)}
              onBlur={({ event }) => formik.handleBlur(event)}
              label="About business"
              value={formik.values.about}
              errorMessage={
                formik.errors.about
                  ? formik.errors.about
                  : actionData?.errors?.about
                  ? actionData.errors.about
                  : undefined
              }
            />
            <Flex
              gap={{ column: 8, row: 0 }}
              justifyContent="start"
              direction="column"
            >
              <Flex direction="column" gap={{ column: 2, row: 0 }}>
                <Text size="100">Brand URL</Text>
                <Flex justifyContent="between" gap={2} wrap alignItems="center">
                  <Flex alignItems="center" gap={1}>
                    <TextField
                      id="subdomain"
                      size="lg"
                      autoComplete="off"
                      onChange={({ event }) => formik.handleChange(event)}
                      onBlur={({ event }) => formik.handleBlur(event)}
                      placeholder={formik.values.name
                        .replace(REPLACE_ALL_SPACES_REGEX, "")
                        .toLocaleLowerCase()}
                      value={formik.values.subdomain}
                      name="subdomain"
                      errorMessage={
                        formik.errors.subdomain
                          ? formik.errors.subdomain
                          : actionData?.errors?.subdomain
                          ? actionData.errors.subdomain
                          : actionData?.available === false
                          ? "This name is take"
                          : undefined
                      }
                    />
                    <Text overflow="breakWord">.bespoke.surf</Text>
                  </Flex>
                  {formik.values.subdomain &&
                    actionData?.available &&
                    !ischeckingName && (
                      <Icon
                        accessibilityLabel="check"
                        color="success"
                        icon="check-circle"
                      />
                    )}
                  <SlimBanner
                    message="Your brand url will change and all your previous post links will break. Also users won't be able to access with your previous brand url. Only update if your sure."
                    type="warning"
                    iconAccessibilityLabel="warning"
                  />
                </Flex>
              </Flex>
              <FormikProvider value={formik}>
                <Address />
              </FormikProvider>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
