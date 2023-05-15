import type { ActionArgs, LinksFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useNavigate, useRouteLoaderData } from "@remix-run/react";
import coreStyle from "@uppy/core/dist/style.css";
import dashboardStyle from "@uppy/dashboard/dist/style.css";

import { Dashboard } from "@uppy/react";

import { FormikProvider, useFormik, useFormikContext } from "formik";
import {
  Box,
  Button,
  CompositeZIndex,
  FixedZIndex,
  Flex,
  Icon,
  Layer,
  Modal,
  NumberField,
  Text,
  TextField,
} from "gestalt";
import { useCallback, useState } from "react";
import { sdk } from "~/graphql/graphqlWrapper.server";
import { ProductSource, ProductType } from "~/graphql/__generated__/graphql";
import type { RootData } from "~/root";
import type { AddProductFormValues } from "./type";
import { CreateProductShcema, ProductsActionEnum } from "./type";
import useUploadProducts from "./useUploadProducts";

import type { LoaderArgs } from "@remix-run/node";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import { isPrivateRoute } from "../../utils/utils.server";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: coreStyle,
    },
    {
      rel: "stylesheet",
      href: dashboardStyle,
    },
  ];
};

export async function loader({ request }: LoaderArgs) {
  const isPrivate = await isPrivateRoute(request);
  if (isPrivate == false) {
    return redirect("/");
  }

  return null;
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const action = formData.get("_action") as string;

  if (action === ProductsActionEnum.uploadProduct) {
    const externalLink = formData.get("externalLink") as string;
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const image = formData.get("image") as string;
    const storeId = formData.get("storeId") as string;

    await sdk.CreateProduct(
      {
        input: {
          productSource: ProductSource.Web,
          storeId,
          externalLink,
          name,
          price: Number(price) * 100,
          type: ProductType.ExternalLink,
          image: JSON.parse(image),
        },
      },
      { request, forbiddenRedirect: "/" }
    );

    return redirect("/products");
  }

  return null;
}

const HEADER_ZINDEX = new FixedZIndex(10);
const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

const AddProduct = () => {
  const [step, setStep] = useState(0);
  const fetcher = useFetcher();
  const loader = useRouteLoaderData("root") as RootData;

  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate("..");
  }, [navigate]);

  const goBackStep = useCallback(() => {
    setStep(0);
  }, [setStep]);

  const heading = step === 0 ? "Product details" : "Upload an image";

  const handleSubmit = useCallback(
    (values: AddProductFormValues) => {
      if (!loader?.store?.id) return;

      if (step == 0) {
        setStep(1);
        return;
      }
      if (step == 1) {
        const formData = new FormData();
        formData.append("_action", ProductsActionEnum.uploadProduct);
        formData.append("externalLink", values.externalLink);
        formData.append("image", JSON.stringify(values.image));
        formData.append("name", values.name);
        formData.append("storeId", loader?.store?.id);
        formData.append("price", String(values.price));
        fetcher.submit(formData, { method: "post" });
      }
    },
    [fetcher, loader?.store?.id, step]
  );

  const formik = useFormik<AddProductFormValues>({
    initialValues: {
      externalLink: "",
      name: "",
      price: 0,
      image: [],
    },
    onSubmit: handleSubmit,
    validationSchema:
      step === 0 ? CreateProductShcema.omit(["image"]) : CreateProductShcema,
  });

  return (
    <Box>
      <Layer zIndex={zIndex}>
        <Modal
          role="dialog"
          accessibilityModalLabel="Delete board 60s Furniture"
          onDismiss={goBack}
          size="sm"
          heading={heading}
          subHeading={step === 1 ? "You can only upload 1 image" : undefined}
          footer={
            <Flex alignItems="center" justifyContent="between" gap={2}>
              <Flex.Item flex="grow">
                {step == 0 ? (
                  <Box />
                ) : (
                  <Button
                    text="Back"
                    color="transparent"
                    onClick={goBackStep}
                  />
                )}
              </Flex.Item>

              {step === 0 ? (
                <Flex gap={2} alignItems="center">
                  <Button text="Close" color="gray" onClick={goBack} />
                  <Button
                    text="Next"
                    color="red"
                    onClick={() => formik.handleSubmit()}
                  />
                </Flex>
              ) : null}
              {step === 1 && <Button text="Finish" color="red" disabled />}
            </Flex>
          }
        >
          <FormikProvider value={formik}>
            {step == 0 && <ProductDetails />}
            {step === 1 && <UploadSection />}
            <Heading step={step} />
          </FormikProvider>
        </Modal>
      </Layer>
    </Box>
  );
};
export default AddProduct;

const Heading = ({ step }: { step: number }) => {
  return (
    <Box marginTop={12} marginBottom={4}>
      <Flex justifyContent="center" alignItems="center">
        <Flex justifyContent="center" alignItems="center" gap={1}>
          {step === 1 ? (
            <Icon
              accessibilityLabel="check"
              icon="check-circle"
              color="success"
            />
          ) : (
            <Box
              color={step === 0 ? "dark" : "successBase"}
              paddingX={2}
              paddingY={1}
              rounding="circle"
            >
              <Text weight="bold" color="light" size="100">
                1
              </Text>
            </Box>
          )}
          <Text weight="bold" size="100">
            Details
          </Text>
        </Flex>
        <Box marginStart={2} marginEnd={2}>
          <Icon
            accessibilityLabel="forward"
            color="subtle"
            icon="directional-arrow-right"
          />
        </Box>
        <Flex justifyContent="center" alignItems="center" gap={1}>
          <Box
            color={step === 1 ? "dark" : "lightWash"}
            paddingX={2}
            paddingY={1}
            rounding="circle"
          >
            <Text
              weight="bold"
              color={step === 1 ? "light" : "subtle"}
              size="100"
            >
              2
            </Text>
          </Box>
          <Text weight="bold" size="100" overflow="breakWord">
            Upload an image and finish
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

const UploadSection = () => {
  const { uppy } = useUploadProducts();
  return (
    <Box display="block" margin={4}>
      <Dashboard uppy={uppy} hideUploadButton />
    </Box>
  );
};

const ProductDetails = () => {
  const { values, handleBlur, handleChange, touched, errors } =
    useFormikContext<AddProductFormValues>();

  return (
    <Box paddingX={8} marginTop={4}>
      <Flex gap={4} direction="column" flex="grow">
        <TextField
          id="externalLink"
          label="Product Link"
          helperText="URL link of your product"
          onChange={({ event }) => handleChange(event)}
          onBlur={({ event }) => handleBlur(event)}
          placeholder="https://yourwebsite.com/your-product"
          value={values.externalLink}
          type="text"
          name="externalLink"
          autoComplete="off"
          size="lg"
          errorMessage={
            touched.externalLink && errors.externalLink
              ? errors.externalLink
              : null
          }
        />

        <TextField
          id="productName"
          label="Name"
          onChange={({ event }) => handleChange(event)}
          onBlur={({ event }) => handleBlur(event)}
          placeholder="name"
          value={values.name}
          type="text"
          name="name"
          autoComplete="off"
          size="lg"
          errorMessage={touched.name && errors.name ? errors.name : null}
        />

        <NumberField
          id="price"
          label="Price"
          onChange={({ event }) => handleChange(event)}
          onBlur={({ event }) => handleBlur(event)}
          placeholder="price"
          name="price"
          autoComplete="off"
          size="lg"
          value={values.price}
          errorMessage={touched.price && errors.price ? errors.price : null}
        />
      </Flex>
    </Box>
  );
};
