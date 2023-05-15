import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useFetcher, useRouteLoaderData } from "@remix-run/react";
import getSymbolFromCurrency from "currency-symbol-map";
import { FormikProvider, useFormik, useFormikContext } from "formik";
import {
  Box,
  Button,
  Callout,
  Checkbox,
  CompositeZIndex,
  Flex,
  Image,
  Layer,
  Mask,
  Masonry,
  Modal,
  RadioGroup,
  Spinner,
  Text,
} from "gestalt";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as yup from "yup";
import type { ProductFragment } from "../../../../../graphql/__generated__/graphql";
import type { RootData } from "../../../../../root";
import { NewPostLayerZIndex } from "../../../../../routes/index/reader/zIndex";
import type { ProductData } from "../../../../../routes/products/types";
import { getImageSrcAndSrcSet } from "../../../../../utils/getCloudinarySrcAndSrcSet";
import { INSERT_PRODUCT_COMMAND } from "../../ProductPlugin";

const InserProductsSchema = yup.object().shape({
  rowLength: yup.number().required(),
  products: yup.array().when("rowLength", (rowLength, schema) => {
    return schema
      .length(rowLength, `please select at least ${rowLength} product`)
      .required(`please select at least ${rowLength} product`);
  }),
});

const modalZIndex = new CompositeZIndex([NewPostLayerZIndex]);
interface MyFormValues {
  rowLength: string;
  products: ProductFragment[];
}

export default function ProductModal({ close }: { close: () => void }) {
  const rootData = useRouteLoaderData("root") as RootData;
  const [editor] = useLexicalComposerContext();
  const fetcher = useFetcher<ProductData>();

  const [products, setProducts] = useState<ProductFragment[]>([]);
  const divRef = useRef(null);

  const loading = fetcher.state === "loading" || fetcher.state === "submitting";

  useEffect(() => {
    if (fetcher.type === "init") {
      fetcher.load(`/products?skip=${products?.length}`);
    }
  }, [fetcher, products?.length]);

  useEffect(() => {
    if (fetcher?.data?.products) {
      setProducts((prevProd) => {
        if (prevProd && fetcher.data?.products) {
          return [...prevProd, ...fetcher.data?.products];
        }
        return prevProd;
      });
    }
  }, [fetcher.data]);

  const handleLoadMore = useCallback(() => {
    if (fetcher.data?.productCount !== products.length) {
      fetcher.load(`/products?skip=${products?.length}`);
    }
  }, [fetcher, products?.length]);

  const handleOnSubmit = useCallback(
    (values: MyFormValues) => {
      if (!rootData?.store?.currency) return;
      editor.dispatchCommand<any>(INSERT_PRODUCT_COMMAND, {
        currency: rootData?.store?.currency,
        products: values.products,
      });
      close();
    },
    [rootData?.store?.currency, editor, close]
  );

  const formik = useFormik({
    initialValues: { rowLength: "1", products: [] },
    onSubmit: handleOnSubmit,
    validationSchema: InserProductsSchema,
  });

  return (
    <Layer zIndex={modalZIndex}>
      <Modal
        accessibilityModalLabel="Create new board"
        heading="Insert Product(s)"
        onDismiss={close}
        footer={
          <Box>
            {formik.errors.products && formik.touched.products && (
              <Text color="error">{formik.errors.products}</Text>
            )}
            <Flex alignItems="center" justifyContent="end" gap={2}>
              <Button color="gray" text="Close" onClick={close} />
              <Button
                color="red"
                text="Insert"
                onClick={() => formik.handleSubmit()}
              />
            </Flex>
          </Box>
        }
        size="md"
      >
        <FormikProvider value={formik}>
          <Box paddingX={8} ref={divRef}>
            {fetcher.data?.productCount === 0 ? (
              <Callout
                iconAccessibilityLabel="no products"
                title="No products available to insert"
                message="You haven't added any Products."
                primaryAction={{
                  accessibilityLabel: "product",
                  label: "Add Product",
                  href: "/products/add-product",
                  target: "self",
                }}
                type="error"
              />
            ) : (
              <Box marginBottom={8}>
                <Box marginBottom={8} marginTop={8}>
                  <RadioGroup
                    legend="No. of products to insert in a row"
                    direction="row"
                    id="directionExample"
                  >
                    <RadioGroup.RadioButton
                      checked={formik.values.rowLength === "1"}
                      id="rowLength1"
                      label="Just 1 product"
                      name="rowLength"
                      onChange={({ event }) => {
                        formik.handleChange(event);
                      }}
                      value="1"
                    />
                    <RadioGroup.RadioButton
                      checked={formik.values.rowLength === "2"}
                      id="rowLength2"
                      label="2 products"
                      name="rowLength"
                      onChange={({ event }) => formik.handleChange(event)}
                      value="2"
                      disabled={products.length < 2}
                    />
                    <RadioGroup.RadioButton
                      checked={formik.values.rowLength === "3"}
                      id="rowLength3"
                      label="3 products"
                      name="rowLength"
                      onChange={({ event }) => formik.handleChange(event)}
                      value="3"
                      disabled={products.length < 3}
                    />
                  </RadioGroup>
                </Box>
                <Box>
                  <Box marginBottom={4}>
                    <Text weight="bold">
                      Select {formik.values.rowLength} product
                      {formik.values.rowLength === "1" ? null : "s"} to insert
                    </Text>
                  </Box>
                  <Masonry
                    renderItem={({ data }) => <Product data={data} />}
                    items={products ?? []}
                    minCols={2}
                    gutterWidth={8}
                    layout="flexible"
                    scrollContainer={() => divRef.current as any}
                    virtualize
                  />
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  marginBottom={4}
                  marginTop={4}
                >
                  {loading ? (
                    <Spinner accessibilityLabel="loading" show />
                  ) : (
                    <Button
                      text="Load More"
                      size="lg"
                      onClick={handleLoadMore}
                      disabled={products.length === fetcher.data?.productCount}
                    />
                  )}
                </Box>
              </Box>
            )}
          </Box>
        </FormikProvider>
      </Modal>
    </Layer>
  );
}

const Product = ({ data }: { data: ProductFragment }) => {
  const { values, setFieldValue } = useFormikContext<MyFormValues>();
  const rootData = useRouteLoaderData("root") as RootData;
  const srcString = useMemo(
    () =>
      getImageSrcAndSrcSet(
        data.image?.[0]?.src,
        false,
        data.image?.[0]?.cdnType
      ),
    [data.image]
  );

  const valuesMatch = useMemo(
    () => values.products.some(({ id }) => id === data.id),
    [data.id, values.products]
  );

  const handleOnChange = useCallback(() => {
    if (values.products.length >= Number(values.rowLength)) {
      do {
        values.products.shift();
      } while (values.products.length >= Number(values.rowLength));
    }
    setFieldValue("products", [...values.products, data]);
  }, [data, setFieldValue, values.products, values.rowLength]);

  if (!srcString) return null;

  return (
    <Box>
      <Mask wash rounding={5}>
        <Image
          role="img"
          alt="prduct image"
          color="lightGray"
          naturalHeight={data.image?.[0]?.height ?? 1}
          naturalWidth={data.image?.[0]?.width ?? 1}
          loading="eager"
          src={srcString?.src}
          srcSet={srcString?.srcSet}
          sizes={srcString?.sizes}
        >
          <Box height="100%" padding={3}>
            <Flex
              direction="column"
              alignItems="start"
              height="100%"
              justifyContent="start"
            >
              <Checkbox
                id={data.id}
                checked={valuesMatch}
                onChange={handleOnChange}
              />
            </Flex>
          </Box>
        </Image>
      </Mask>
      <Box padding={2}>
        <Flex direction="column" gap={1}>
          <Text weight="bold" size="200">
            {getSymbolFromCurrency(rootData?.store?.currency ?? "")}
            {data.price / 100}
            {(data.price / 100) % 1 === 0 ? ".00" : null}
          </Text>
          <Text lineClamp={2} weight="bold" size="200">
            {data.name}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};
