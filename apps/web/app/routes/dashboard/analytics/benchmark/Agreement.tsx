import { useFormikContext } from "formik";
import {
  Box,
  Button,
  Checkbox,
  CompositeZIndex,
  FixedZIndex,
  Flex,
  Layer,
  List,
  Modal,
  SlimBanner,
} from "gestalt";
import { Fragment, useCallback, useState } from "react";

const HEADER_ZINDEX = new FixedZIndex(10);
const modalZIndex = new CompositeZIndex([HEADER_ZINDEX]);

export default function Agreement({ close }: { close: () => void }) {
  const [agreed, setAgreed] = useState(false);
  const { handleSubmit } = useFormikContext();

  const hanldeUpdate = useCallback(() => {
    if (agreed) {
      handleSubmit();
    }
  }, [agreed, handleSubmit]);
  return (
    <Layer zIndex={modalZIndex}>
      <Modal
        accessibilityModalLabel="Create new board"
        align="start"
        heading="Benchmark Terms"
        onDismiss={close}
        footer={
          <Flex alignItems="center" justifyContent="end" gap={1}>
            <Button color="gray" text="Cancel" onClick={close} />
            <Button
              color="red"
              text="Agree Terms & Update Industry"
              onClick={hanldeUpdate}
              disabled={!agreed}
            />
          </Flex>
        }
        size="sm"
      >
        <Fragment>
          <Box marginBottom={4}>
            <List
              labelDisplay="visible"
              label="Terms of Agreement:"
              type="ordered"
            >
              <List.Item text="You agree to share your metric data which includes Open Rate, Click Rate, Delivered Rate and total Contact count with you industry peers." />
              <List.Item text="You agree to share your newsletter performance metrics which includes Page Views, Opens & total Recipient count with your industry peers." />
              <List.Item text="You agree to share your daily, weekly and quarterly Perodic Report challenges that you completed with your industry peers." />
              <List.Item text="You agree to share your sign-Up form metrics which includes Form Submit Rate, Submitted Form count with your industry peers." />
              {/* <List.Item text="You agree to share the total rewards claimed (only the total) and total pages completed (only the total) in Growth Path with your industry peers. " /> */}
            </List>
          </Box>
          <Box marginBottom={6}>
            <SlimBanner
              message="Your business name and details will be private unless explicitly agreed upon."
              type="info"
              iconAccessibilityLabel="info"
            />
          </Box>
          <Checkbox
            checked={agreed}
            id="secret"
            label="I agree these terms."
            name="languages"
            onChange={() => setAgreed((p) => !p)}
          />
        </Fragment>
      </Modal>
    </Layer>
  );
}
