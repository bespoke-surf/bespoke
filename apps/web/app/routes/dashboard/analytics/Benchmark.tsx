import type { IPricing } from "@bespoke/common/dist/pricingPlan";
import {
  ADVANCED_PLAN_100K_ID,
  ADVANCED_PLAN_10K_ID,
  ADVANCED_PLAN_200K_ID,
  ADVANCED_PLAN_20K_ID,
  ADVANCED_PLAN_50K_ID,
  BASIC_PLAN_100K_ID,
  BASIC_PLAN_10K_ID,
  BASIC_PLAN_20K_ID,
  BASIC_PLAN_50K_ID,
  BASIC_PLAN_5K_ID,
  bespokePricingPlan,
} from "@bespoke/common/dist/pricingPlan";
import {
  Await,
  useFetcher,
  useLoaderData,
  useRouteLoaderData,
} from "@remix-run/react";
import { FormikProvider, useFormik } from "formik";
import {
  Avatar,
  Box,
  ComboBox,
  Datapoint,
  Divider,
  Flex,
  Heading,
  Icon,
  IconButton,
  Link,
  Text,
  Tooltip,
} from "gestalt";
import {
  Suspense,
  lazy,
  useCallback,
  useMemo,
  useReducer,
  useState,
} from "react";
import type {
  AboutIndustryEnum,
  BenchmarkData,
} from "../../../graphql/__generated__/graphql";
import { BillingPlanStatus } from "../../../graphql/__generated__/graphql";
import type { RootData } from "../../../root";
import type { DashboardData } from "../types";
import { DashboardActionEnum, UpdateIndustrySchema } from "../types";

const Agreement = lazy(() => import("./benchmark/Agreement"));

export default function Benchmark() {
  const rootData = useRouteLoaderData("root") as RootData;
  const loaderData = useLoaderData() as DashboardData;

  const pricingPlan = useMemo(
    () =>
      bespokePricingPlan.find(
        ({ id }) => id === loaderData.billing?.bespokePlanId
      ),
    [loaderData.billing?.bespokePlanId]
  );

  let isLocked = pricingPlan?.type === "default";
  if (loaderData.billing?.billingPlanStatus === BillingPlanStatus.Cancelled) {
    isLocked = true;
  }

  return (
    <Flex gap={4} justifyContent="between">
      <Flex.Item flex="grow">
        <Box rounding={4} borderStyle="sm" marginBottom={4}>
          <Box padding={6}>
            <Flex direction="column" gap={5}>
              <Flex gap={1} alignItems="baseline">
                <Heading size="500">Benchmarks</Heading>
                <Tooltip text="Compare metrics with your industry peers and advance to the next tier.">
                  <Icon
                    accessibilityLabel="info circle"
                    icon="info-circle"
                    color="subtle"
                  />
                </Tooltip>
              </Flex>
              <Header isLocked={isLocked} pricingPlan={pricingPlan} />
              <Divider />
            </Flex>
          </Box>
          <Box
            marginTop={-6}
            paddingX={6}
            paddingY={6}
            overflow={!isLocked ? "scrollY" : "hidden"}
          >
            {isLocked && <Skeleton />}
            {!isLocked && rootData.store?.about?.industry && (
              <Suspense fallback={<Skeleton />}>
                <Await
                  resolve={loaderData.benchmarkDataPromise}
                  errorElement={<Text>somthing bad happened here</Text>}
                >
                  {(benchmarkData) => {
                    return (
                      <>
                        {!benchmarkData ||
                        !benchmarkData.getBenchmarkData ||
                        benchmarkData?.getBenchmarkData?.length === 0 ? (
                          <Text align="center"> Something went wrong </Text>
                        ) : (
                          <>
                            {benchmarkData.getBenchmarkData?.map(
                              (data, index) => {
                                if (data.id === rootData?.store?.id) {
                                  return (
                                    <MyBusiness
                                      index={index + 1}
                                      key={data.id}
                                    />
                                  );
                                }
                                return (
                                  <IndividualCompany
                                    data={data}
                                    index={index}
                                    key={data.id}
                                  />
                                );
                              }
                            )}
                          </>
                        )}
                      </>
                    );
                  }}
                </Await>
              </Suspense>
            )}
            {!isLocked && !rootData.store?.about?.industry && <SelectInustry />}
          </Box>
        </Box>
      </Flex.Item>
    </Flex>
  );
}

const Header = ({
  pricingPlan,
  isLocked,
}: {
  pricingPlan: IPricing | undefined;
  isLocked: boolean;
}) => {
  const rootData = useRouteLoaderData("root") as RootData;
  const loaderData = useLoaderData() as DashboardData;

  return (
    <Box padding={2}>
      <Flex alignItems="start" gap={4}>
        {!isLocked && rootData.store?.about?.industry && (
          <Icon
            icon="trending"
            size={60}
            color="dark"
            accessibilityLabel="lock"
          />
        )}
        {!isLocked && !rootData.store?.about?.industry && (
          <Icon
            size={50}
            accessibilityLabel="check circle"
            icon="check-circle"
            color="success"
          />
        )}
        {isLocked && (
          <Icon
            size={50}
            accessibilityLabel="lock"
            icon="lock"
            color="subtle"
          />
        )}
        <Flex direction="column" gap={2}>
          <Text weight="bold" size="400">
            {!isLocked && rootData.store?.about?.industry && (
              <Suspense
                fallback={
                  <Text size="400" weight="bold">
                    Calculating Rank...
                  </Text>
                }
              >
                <Await
                  resolve={loaderData.benchmarkDataPromise}
                  errorElement={<Text color="error">Error</Text>}
                >
                  {(benchmarkData) => {
                    return benchmarkData.getBenchmarkData?.map(
                      (data, index) => {
                        if (data.id === rootData?.store?.id) {
                          return (
                            <Text key={data.id} weight="bold" size="400">
                              You're Ranked #{index + 1}
                            </Text>
                          );
                        }
                        return undefined;
                      }
                    );
                  }}
                </Await>
              </Suspense>
            )}

            {!isLocked && !rootData.store?.about?.industry && "Unlocked!"}
            {isLocked && "Locked!"}
          </Text>
          <Flex direction="column" gap={1}>
            {!isLocked && rootData.store?.about?.industry && (
              <Flex
                gap={{ row: 2, column: 0 }}
                justifyContent="center"
                alignItems="center"
              >
                <Text>
                  Currently in teir{" "}
                  {pricingPlan?.id === BASIC_PLAN_5K_ID
                    ? "1"
                    : pricingPlan?.id === BASIC_PLAN_10K_ID
                    ? "2"
                    : pricingPlan?.id === BASIC_PLAN_20K_ID
                    ? "3"
                    : pricingPlan?.id === BASIC_PLAN_50K_ID
                    ? "4"
                    : pricingPlan?.id === BASIC_PLAN_100K_ID
                    ? "5"
                    : pricingPlan?.id === ADVANCED_PLAN_10K_ID
                    ? "6"
                    : pricingPlan?.id === ADVANCED_PLAN_20K_ID
                    ? "7"
                    : pricingPlan?.id === ADVANCED_PLAN_50K_ID
                    ? "8"
                    : pricingPlan?.id === ADVANCED_PLAN_100K_ID
                    ? "9"
                    : "10"}{" "}
                  of 10{" "}
                </Text>
                {pricingPlan?.id !== ADVANCED_PLAN_200K_ID && (
                  <Tooltip
                    inline
                    text="Upgrad your plan to climb to the next tier"
                    link={
                      <Text color="inverse" size="100" weight="bold">
                        <Link href="/plan/choose" target="blank">
                          Upgrade plan
                        </Link>
                      </Text>
                    }
                  >
                    <Icon inline accessibilityLabel="info" icon="info-circle" />
                  </Tooltip>
                )}
              </Flex>
            )}
            {!isLocked && !rootData.store?.about?.industry && (
              <Text color="subtle">
                Select your industry below to start benchmarking
              </Text>
            )}
            {isLocked && (
              <Text color="subtle">
                Upgrade to a Basic or Advanced plan to unlock Benchmarks
              </Text>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

const Skeleton = () => {
  return (
    <Box>
      <Box paddingX={2} paddingY={2}>
        <Flex alignItems="center" justifyContent="between">
          <Flex.Item>
            <Flex gap={7} alignItems="center">
              <img
                alt=""
                src="https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1674232627/Frame_1_yxeqok.svg"
              />
              <img
                alt=""
                src="https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1674232625/Frame_2_pw0lir.svg"
              />
            </Flex>
          </Flex.Item>
        </Flex>
        <MyBusiness />
      </Box>
    </Box>
  );
};

const MyBusiness = ({ index }: { index?: number }) => {
  const rootData = useRouteLoaderData("root") as RootData;
  return (
    <Box
      color="elevationAccent"
      rounding={3}
      paddingX={5}
      paddingY={2}
      marginTop={3}
    >
      <Flex justifyContent="between" alignItems="center">
        <Flex.Item>
          <Flex gap={7} alignItems="center">
            <Text>{index ? index : "-"}</Text>
            <Avatar name="Bespoke" outline size="md" verified />
            <Text>{rootData.store?.name}</Text>
          </Flex>
        </Flex.Item>
        <Text color="subtle">-</Text>
      </Flex>
    </Box>
  );
};

const IndividualCompany = ({
  data,
  index,
}: {
  data?: BenchmarkData;
  index: number;
}) => {
  const [open, setOpen] = useReducer((s) => !s, index === 0 ? true : false);

  return (
    <Box marginTop={5}>
      <Flex justifyContent="between" alignItems="center">
        <Flex.Item>
          <Flex gap={7} alignItems="center">
            <Flex alignItems="center" gap={4}>
              <Text
                weight="bold"
                size="200"
                color={index < 11 ? "success" : index > 15 ? "warning" : "dark"}
              >
                {index + 1}
              </Text>
              <Avatar name="B" outline size="md" />
            </Flex>
            <Text>Business</Text>
          </Flex>
        </Flex.Item>
        <Flex gap={2} alignItems="center">
          <IconButton
            icon={open ? "arrow-up" : "arrow-down"}
            accessibilityLabel="arrow down"
            size="xs"
            onClick={setOpen}
          />
        </Flex>
      </Flex>
      {open && (
        <Box padding={3}>
          <Flex gap={4} justifyContent="between">
            <Datapoint
              title="Opened"
              value={`${data?.opened ?? "-"}`}
              size="lg"
            />
            <Datapoint
              title="Contacts"
              size="lg"
              value={`${data?.contact ?? "-"}`}
            />
          </Flex>
          <Flex gap={4} justifyContent="between">
            <Datapoint
              title="Clicked"
              value={`${data?.clicked ?? "-"}`}
              size="lg"
            />
            <Datapoint
              title="Delivered"
              value={`${data?.delivered ?? "-"}`}
              size="lg"
            />
          </Flex>
        </Box>
      )}
    </Box>
  );
};

interface MyFormValues {
  industry: AboutIndustryEnum | undefined;
}

const SelectInustry = () => {
  const rootData = useRouteLoaderData("root") as RootData;
  const [aggrement, setAggrement] = useState(false);
  const fetcher = useFetcher();

  const handleSubmit = useCallback(
    (values: MyFormValues) => {
      if (!values.industry || !rootData.store?.about?.id) return;
      const formData = new FormData();
      formData.append("_action", DashboardActionEnum.updateIndustry);
      formData.append("industry", values.industry);
      formData.append("aboutId", rootData.store?.about?.id);
      fetcher.submit(formData, { method: "post" });
    },
    [fetcher, rootData.store?.about?.id]
  );

  const formik = useFormik<MyFormValues>({
    initialValues: { industry: undefined },
    onSubmit: handleSubmit,
    validationSchema: UpdateIndustrySchema,
  });

  return (
    <FormikProvider value={formik}>
      <Box width="100%" height="100%">
        <Flex width="100%" flex="grow" justifyContent="center">
          <ComboBox
            size="lg"
            accessibilityClearButtonLabel="Remueve la lista de pronombres seleccionados"
            id="localization"
            label="Industry"
            noResultText="No industry available"
            options={industryOptions}
            placeholder="Select an Industry"
            // selectedOption={industryOptions.find(
            //   ({ value }) => value === formik.values.industry
            // )}

            onSelect={({ item }) => {
              formik.setFieldValue("industry", item.value);
              setAggrement(true);
            }}
          />
        </Flex>
        {aggrement && (
          <Suspense fallback={null}>
            <Agreement close={() => setAggrement(false)} />
          </Suspense>
        )}
      </Box>
    </FormikProvider>
  );
};

const industryOptions: Array<{
  value: keyof typeof AboutIndustryEnum;
  label: string;
}> = [
  {
    label: "Ecommerce (Apparel & Accessories)",
    value: "EcommerceApparelAccessories",
  },
  { label: "Ecommerce (Automotive)", value: "EcommerceAutomotive" },
  { label: "Ecommerce (Electronics)", value: "EcommerceElectronics" },
  { label: "Ecommerce (Food & Beverage)", value: "EcommerceFoodBeverage" },
  {
    label: "Ecommerce (Hardware & Home Improvements)",
    value: "EcommerceHardwareHomeImprovements",
  },
  { label: "Ecommerce (Health Beauty)", value: "EcommerceHealthBeauty" },
  {
    label: "Ecommerce (Housewares & Home Furnishings & Garden",
    value: "EcommerceHousewaresHomeFurnishingsGarden",
  },
  { label: "Ecommerce (Jewelry)", value: "EcommerceJewelry" },
  { label: "Ecommerce (Mass Merchants)", value: "EcommerceMassMerchant" },
  { label: "Ecommerce (Office Supplies)", value: "EcommerceOfficeSupplies" },
  { label: "Ecommerce (Other)", value: "EcommerceOther" },
  { label: "Ecommerce (Specialty)", value: "EcommerceSpecialty" },
  { label: "Ecommerce (Sporting Goods)", value: "EcommerceSportingGoods" },
  { label: "Ecommerce (Toys & Hobbies)", value: "EcommerceToysHobbies" },
  {
    label: "Agency, Marketing and Consulting",
    value: "AgencyMarketingConsulting",
  },
  {
    label: "Banking, Financial Services and Insurance",
    value: "BankingFinancialServicesInsurance",
  },
  { label: "Education", value: "Education" },
  { label: "Events & Entertainment", value: "EventsEntertainment" },
  { label: "Non-Profit", value: "NonProfit" },
  { label: "Other", value: "Other" },
  { label: "Politics & Goverment", value: "PolitcsGoverment" },
  { label: "Real Estate & Construction", value: "RealEstateConstruction" },
  { label: "Restaurants", value: "Restaurants" },
  { label: "Software / SaaS", value: "SoftwareSass" },
  { label: "Telecommunication", value: "Telecommunication" },
  { label: "Travel", value: "Travel" },
];
