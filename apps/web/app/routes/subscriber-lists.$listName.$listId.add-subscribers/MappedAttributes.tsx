import { useFormikContext } from "formik";
import type { ComboBoxItemType, ComboBoxProps } from "gestalt";
import {
  Box,
  Checkbox,
  ComboBox,
  Flex,
  Heading,
  Label,
  Table,
  Text,
} from "gestalt";
import produce from "immer";
import { useCallback } from "react";
import type { AddSubscriberFormValues } from "./types";

const options: ComboBoxProps["options"] = [
  { label: "Email", value: "Email" },
  { label: "First Name", value: "First Name" },
  { label: "Last Name", value: "Last Name" },
];

export default function MappedAttributes() {
  const {
    values: { mappedFields: mapedFileds },
  } = useFormikContext<AddSubscriberFormValues>();

  return (
    <Box padding={8}>
      <Flex direction="column" gap={8}>
        <Flex direction="column" gap={1}>
          <Heading size="400">Map Attributes</Heading>
          <Text color="subtle">
            You have uploaded file containing {mapedFileds?.length} columns
          </Text>
        </Flex>
        <Text>
          Please review the field mapping so we can add and update profiles
          based on your selection
        </Text>
      </Flex>
      <Box marginTop={4} />
      <Table accessibilityLabel="table">
        <HeaderRow />
        <Table.Body>
          {mapedFileds?.map((val, index) => (
            <DataRow
              dataKey={val.key}
              dataValue={val.value}
              checked={val.checked}
              key={val.key}
              index={index}
            />
          ))}
        </Table.Body>
      </Table>
    </Box>
  );
}

const DataRow = ({
  dataKey,
  dataValue,
  checked,
  index,
}: {
  dataKey: string;
  dataValue: "Email" | "First Name" | "Last Name" | undefined;
  checked: boolean;
  index: number;
}) => {
  const { setValues, values, errors, touched } =
    useFormikContext<AddSubscriberFormValues>();

  const handleOnSelect = useCallback(
    ({ item }: { item: ComboBoxItemType }) => {
      const mapedFileds = produce(values.mappedFields, (draft) => {
        const index = draft?.findIndex((todo) => todo.key === dataKey);

        const alreadyExist = draft?.findIndex(
          (todo) => todo.value === item.value
        );

        if (alreadyExist !== -1 && alreadyExist !== undefined && draft) {
          const chekcedObject = draft[alreadyExist];
          if (chekcedObject) {
            chekcedObject.checked = false;
            chekcedObject.value = undefined;
          }
        }

        if (index !== -1 && index !== undefined && draft) {
          const chekcedObject = draft[index];
          if (chekcedObject) {
            chekcedObject.value = item.value as any;
            chekcedObject.checked = true;
          }
        }
      });

      setValues({
        ...values,
        mappedFields: mapedFileds,
      });
    },
    [dataKey, setValues, values]
  );
  const handleOnCler = useCallback(() => {
    const mapedFileds = produce(values.mappedFields, (draft) => {
      const index = draft?.findIndex((todo) => todo.key === dataKey);

      if (index !== -1 && index !== undefined && draft) {
        const chekcedObject = draft[index];
        if (chekcedObject) {
          chekcedObject.checked = false;
          chekcedObject.value = undefined;
        }
      }
    });
    setValues({
      ...values,
      mappedFields: mapedFileds,
    });
  }, [dataKey, setValues, values]);

  const handleCheck = useCallback(
    ({ checked }: { checked: boolean }) => {
      let mapedFileds;
      if (checked) {
        mapedFileds = produce(values.mappedFields, (draft) => {
          const index = draft?.findIndex((todo) => todo.key === dataKey);
          if (index !== -1 && index !== undefined && draft) {
            const chekcedObject = draft[index];
            if (chekcedObject) {
              chekcedObject.checked = true;
            }
          }
        });
      } else {
        mapedFileds = produce(values.mappedFields, (draft) => {
          const index = draft?.findIndex((todo) => todo.key === dataKey);
          if (index !== -1 && index !== undefined && draft) {
            const chekcedObject = draft[index];
            if (chekcedObject) {
              chekcedObject.checked = false;
              chekcedObject.value = undefined;
            }
          }
        });
      }
      setValues({
        ...values,
        mappedFields: mapedFileds,
      });
    },
    [dataKey, setValues, values]
  );

  return (
    <Table.Row>
      <Table.Cell>
        <Checkbox
          onChange={handleCheck}
          id="checked"
          size="sm"
          checked={checked}
        />
      </Table.Cell>
      <Table.Cell>
        <Label htmlFor="">
          <Text>{dataKey}</Text>
        </Label>
      </Table.Cell>
      <Table.Cell>
        <ComboBox
          size="lg"
          accessibilityClearButtonLabel="Clear the current value"
          id="uncontrolled"
          label="Field"
          labelDisplay="hidden"
          noResultText="No results"
          options={options}
          onSelect={handleOnSelect}
          onClear={handleOnCler}
          errorMessage={
            (touched.mappedFields as AddSubscriberFormValues["mappedFields"])?.[
              index
            ]?.value &&
            (errors.mappedFields as AddSubscriberFormValues["mappedFields"])?.[
              index
            ]?.value
              ? (
                  errors.mappedFields as AddSubscriberFormValues["mappedFields"]
                )?.[index]?.value
              : undefined
          }
          inputValue={dataValue ? dataValue : undefined}
          selectedOption={options.find(({ value }) => value === dataValue)}
          placeholder="select a field"
        />
      </Table.Cell>
    </Table.Row>
  );
};

const HeaderRow = () => {
  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>
          <Box display="visuallyHidden">
            <Label htmlFor="">Not all checkboxes are checked</Label>
          </Box>
          <Checkbox id="" onChange={() => {}} indeterminate size="sm" />
        </Table.HeaderCell>
        {["Column Name", "Bespoke Field"].map((title, idx) => {
          return (
            <Table.HeaderCell key={idx}>
              <Text weight="bold">{title}</Text>
            </Table.HeaderCell>
          );
        })}
      </Table.Row>
    </Table.Header>
  );
};
