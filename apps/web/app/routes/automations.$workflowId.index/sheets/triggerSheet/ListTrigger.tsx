import { useLoaderData, useNavigate } from "@remix-run/react";
import { useFormikContext } from "formik";
import type { ComboBoxItemType } from "gestalt";
import { Box, ComboBox, Flex, Text } from "gestalt";
import { useContext, useMemo, useState } from "react";
import type { AutomationWorkflowIndexData } from "../../types";
import { NodeSheetContext } from "../NodeSheetProvider";
import type { MyTriggerSheetFormValues } from "../TriggerSheet";

// const base = [
//   {
//     label: "Create a new list",
//     value: "create-list",
//     subtext: "navigates to Lists",
//   },
// ];

export default function ListTrigger({ loading }: { loading: boolean }) {
  const loaderData = useLoaderData<AutomationWorkflowIndexData>();
  const formik = useFormikContext<MyTriggerSheetFormValues>();

  const navigate = useNavigate();

  const { state } = useContext(NodeSheetContext);

  const options = useMemo(
    () =>
      loaderData.lists?.map((list) => ({ label: list.name, value: list.id })) ??
      [],
    // .concat(base) ?? base,
    [loaderData.lists]
  );

  const [selected, setSelected] = useState<ComboBoxItemType | undefined>(() => {
    if (
      state?.data?.value &&
      state.data?.value.__typename === "WorkflowStateListTriggerActivityValue"
    ) {
      return {
        label: state.data?.name ? state.data?.name : "",
        value: state.data?.value.listId,
      };
    }
    return undefined;
  });

  const handleSelect = ({ item }: { item: ComboBoxItemType }) => {
    setSelected(item);
    if (item.value === "create-list") {
      navigate("/subscriber-lists/create-list");
    } else {
      formik.setFieldValue("listId", item.value);
    }
  };

  return (
    <Flex direction="column" gap={4}>
      <Text inline weight="bold">
        LIST TRIGGER
      </Text>
      <Box paddingX={1} paddingY={1}>
        <ComboBox
          size="lg"
          accessibilityClearButtonLabel="Clear the current value"
          label="Select a list to trigger this workflow"
          id="subtext"
          noResultText="No results found"
          options={options}
          inputValue={selected?.label}
          selectedOption={selected}
          placeholder="Select a list"
          onSelect={handleSelect}
          disabled={loading}
          errorMessage={
            formik.touched.listId && formik.errors.listId
              ? formik.errors.listId
              : undefined
          }
        />
      </Box>
    </Flex>
  );
}
