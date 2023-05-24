import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import type { DropdownOption } from "gestalt";
import {
  Box,
  Dropdown,
  Flex,
  IconButton,
  Spinner,
  Status,
  Table,
  Text,
} from "gestalt";
import { useCallback, useMemo, useRef, useState } from "react";
import type { SignupFormFragment } from "~/graphql/__generated__/graphql";
import { SignupFormState } from "~/graphql/__generated__/graphql";
import type { SignupFormsData } from "./types";
import { SignupFormActionEnum } from "./types";

export default function Forms() {
  const loaderData = useLoaderData<SignupFormsData>();

  const tableBody = useMemo(
    () =>
      loaderData.forms?.map((form) => (
        <TableData
          //@ts-ignore
          form={form}
          key={form.id}
        />
      )),
    [loaderData.forms]
  );
  return (
    <Box marginBottom={12}>
      <Table accessibilityLabel="Table Row Expandable">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Text weight="bold">Form Name</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Submitted Form</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Form Submit Rate</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">List</Text>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{tableBody}</Table.Body>
      </Table>

      {!tableBody || tableBody?.length === 0 ? (
        <Box marginTop={2}>
          <Text align="center" color="subtle">
            No forms have been added
          </Text>
        </Box>
      ) : null}
    </Box>
  );
}

const TableData = ({ form }: { form: SignupFormFragment }) => {
  const fetcher = useFetcher();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const loading = fetcher.state === "loading" || fetcher.state === "submitting";

  const isDeleting =
    fetcher.submission?.formData.get("_action") ===
      SignupFormActionEnum.deleteForm &&
    fetcher.submission.formData.get("formId") === form.id;

  const onSelect = useCallback(
    ({ item }: { item: DropdownOption }) => {
      if (item.value === "delete") {
        const formData = new FormData();
        formData.append("_action", SignupFormActionEnum.deleteForm);
        formData.append("formId", form.id);
        fetcher.submit(formData, { method: "post" });
        setOpen(false);
      }
    },
    [fetcher, form.id]
  );

  if (isDeleting) {
    return null;
  }

  return (
    <>
      <Table.Row key={form.id}>
        <Table.Cell>
          <Flex gap={1} direction="column">
            <Link to={`${form.id}`} prefetch="intent">
              <Text underline>{form.name}</Text>{" "}
            </Link>
            {form.formState === SignupFormState.Live && (
              <Status type="ok" title="Live" />
            )}
          </Flex>
        </Table.Cell>
        <Table.Cell>
          <Text>{form?.submitted > 0 ? form.submitted : "-"}</Text>
        </Table.Cell>

        <Table.Cell>
          <Text>
            {form?.formSubmitRate > 0 ? `${form?.formSubmitRate}%` : "-"}
          </Text>
        </Table.Cell>

        <Table.Cell>
          <Text>{form.list?.name}</Text>
        </Table.Cell>

        <Table.Cell>
          <Spinner accessibilityLabel="loading" show={loading} />
          {loading ? null : (
            <IconButton
              ref={anchorRef}
              accessibilityLabel="ellipsis"
              icon="ellipsis"
              onClick={() => setOpen(true)}
            />
          )}
        </Table.Cell>
      </Table.Row>
      {open && (
        <Dropdown
          anchor={anchorRef.current}
          id="truncation-dropdown-example"
          onDismiss={() => setOpen(false)}
        >
          <Dropdown.Item
            onSelect={onSelect}
            option={{
              value: "delete",
              label: "Delete Form",
            }}
          />
        </Dropdown>
      )}
    </>
  );
};
