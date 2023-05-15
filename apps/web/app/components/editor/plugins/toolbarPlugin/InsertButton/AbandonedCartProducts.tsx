import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useRouteLoaderData } from "@remix-run/react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  CompositeZIndex,
  Flex,
  Layer,
  Modal,
  RadioGroup,
  SlimBanner,
} from "gestalt";
import { useCallback } from "react";
import * as yup from "yup";
import type { RootData } from "../../../../../root";
import { NewPostLayerZIndex } from "../../../../../routes/index/reader/zIndex";
import { INSERT_ABANDONED_CART_PRODUCT_COMMAND } from "../../AbandonedCartProductPlugin";

const InserProductsSchema = yup.object().shape({
  rowLength: yup.number().required(),
});

const modalZIndex = new CompositeZIndex([NewPostLayerZIndex]);

interface MyFormValues {
  rowLength: number;
}

export default function AbandonedCartProducts({
  close,
}: {
  close: () => void;
}) {
  const rootData = useRouteLoaderData("root") as RootData;
  const [editor] = useLexicalComposerContext();

  const handleOnSubmit = useCallback(
    (values: MyFormValues) => {
      if (!rootData?.store?.currency) return;
      editor.dispatchCommand(INSERT_ABANDONED_CART_PRODUCT_COMMAND, {
        currency: rootData?.store?.currency,
        rows: values.rowLength,
      });
      close();
    },
    [rootData?.store?.currency, editor, close]
  );

  const formik = useFormik({
    initialValues: { rowLength: 1 },
    onSubmit: handleOnSubmit,
    validationSchema: InserProductsSchema,
  });

  return (
    <Layer zIndex={modalZIndex}>
      <Modal
        accessibilityModalLabel="Create new board"
        heading="Abandoned Cart Product(s)"
        onDismiss={close}
        footer={
          <Box>
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
        size="sm"
      >
        <Box padding={6}>
          <RadioGroup
            id="claim-option"
            legend="No. of products to insert in a row"
          >
            <RadioGroup.RadioButton
              checked={formik.values.rowLength === 1 ? true : false}
              id="product-1"
              label="Just one"
              name="product-1"
              helperText="One product gets inserted from the abandoned cart"
              value="tag"
              size="md"
              onChange={({ checked }) => {
                if (checked) {
                  formik.setFieldValue("rowLength", 1);
                }
              }}
            />
            <RadioGroup.RadioButton
              checked={formik.values.rowLength === 2 ? true : false}
              id="product-2"
              label="2 products"
              name="product-2"
              value="file"
              //@ts-ignore
              helperText="2 products gets inserted from the abandoned cart"
              size="md"
              onChange={({ checked }) => {
                if (checked) {
                  formik.setFieldValue("rowLength", 2);
                }
              }}
            />

            <RadioGroup.RadioButton
              checked={formik.values.rowLength === 3 ? true : false}
              id="product-3"
              label="3 products"
              name="product-3"
              onChange={({ checked }) => {
                if (checked) {
                  formik.setFieldValue("rowLength", 3);
                }
              }}
              value="file"
              helperText="3 products gets inserted from the abandoned cart"
              size="md"
            />
          </RadioGroup>
          <Box marginTop={6}>
            <SlimBanner
              type="info"
              iconAccessibilityLabel="warning"
              message="Products get repeated for new rows. Store products should be synced with Bespoke."
              primaryAction={{
                accessibilityLabel: "Sycn",
                href: "/integrations",
                label: "Sync Products",
              }}
            />
          </Box>
        </Box>
      </Modal>
    </Layer>
  );
}
