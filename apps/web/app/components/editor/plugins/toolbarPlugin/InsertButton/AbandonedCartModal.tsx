import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useFormik } from "formik";
import {
  Box,
  Button,
  CompositeZIndex,
  Flex,
  Layer,
  Modal,
  TextField,
} from "gestalt";
import { useCallback } from "react";
import * as yup from "yup";
import { NewPostLayerZIndex } from "../../../../../routes/index/reader/zIndex";
import type { AbandonedCartButtonPayload } from "../../../nodes/AbandonedCartButton";
import { INSERT_ABANDONED_CART_BUTTON_COMMAND } from "../../AbandonedCartButtonPlugin";

const InserAbandonedCartButtonSchema = yup.object().shape({
  title: yup.string().required("please enter a title"),
});

const modalZIndex = new CompositeZIndex([NewPostLayerZIndex]);

interface MyFormValues {
  title: string;
}

export default function AbandonedCartModal({ close }: { close: () => void }) {
  const [editor] = useLexicalComposerContext();

  const handleOnSubmit = useCallback(
    (values: MyFormValues) => {
      const payload: AbandonedCartButtonPayload = {
        title: values.title,
      };
      editor.dispatchCommand<any>(
        INSERT_ABANDONED_CART_BUTTON_COMMAND,
        payload
      );
      close();
    },
    [editor, close]
  );

  const formik = useFormik({
    initialValues: { title: "" },
    onSubmit: handleOnSubmit,
    validationSchema: InserAbandonedCartButtonSchema,
  });

  const handleKeyDown = useCallback(
    ({ event }: { event: React.KeyboardEvent<HTMLInputElement> }) => {
      if (event.key === "Enter") {
        event.preventDefault();
        formik.handleSubmit();
      }
    },
    [formik]
  );

  return (
    <Layer zIndex={modalZIndex}>
      <Modal
        accessibilityModalLabel="Create new board"
        heading="Insert Abandoned Cart Button"
        onDismiss={close}
        closeOnOutsideClick
        align="start"
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
        <Box paddingX={6}>
          <TextField
            id="title"
            size="lg"
            name="title"
            onChange={({ event }) => formik.handleChange(event)}
            onBlur={({ event }) => formik.handleBlur(event)}
            placeholder="Like 'Checkout Now' or 'Return to Cart'"
            label="Button title"
            type="text"
            onKeyDown={handleKeyDown}
            errorMessage={
              formik.touched.title && formik.errors.title
                ? formik.errors.title
                : undefined
            }
          />
        </Box>
      </Modal>
    </Layer>
  );
}
