import { useRouteLoaderData, useSubmit } from "@remix-run/react";
import {
  Box,
  Button,
  CompositeZIndex,
  FixedZIndex,
  Flex,
  Layer,
  OverlayPanel,
  RadioGroup,
  Table,
  Text,
  TextField,
} from "gestalt";
import { useCallback, useState } from "react";
import type { ApiKeyAccessScopeEnum } from "../../graphql/__generated__/graphql";
import { ApiAccessLevel } from "../../graphql/__generated__/graphql";
import type { RootData } from "../../root";
import ListTable from "./createApiKey/ListTable";
import SubscriberTable from "./createApiKey/Subscriber";
import { ApiKeyActionEnum } from "./types";

export default function CreateApiKey({ close }: { close: () => void }) {
  const HEADER_ZINDEX = new FixedZIndex(10);
  const sheetZIndex = new CompositeZIndex([HEADER_ZINDEX]);
  const submit = useSubmit();
  const rootData = useRouteLoaderData("root") as RootData;

  const [accessLevel, setAccessLevel] = useState<ApiAccessLevel>(
    ApiAccessLevel.Full
  );
  const [scope, setScope] = useState<ApiKeyAccessScopeEnum[]>([]);
  const [name, setName] = useState("");

  const handleCreate = useCallback(() => {
    if (!rootData.store?.id || name === "") return;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("storeId", rootData.store.id);
    formData.append("accessLevel", accessLevel);
    formData.append("_action", ApiKeyActionEnum.creatApiKey);
    formData.append("scopes", JSON.stringify(scope));
    submit(formData, { method: "POST", replace: true });
  }, [accessLevel, submit, name, rootData.store?.id, scope]);

  const footer = (
    <OverlayPanel.DismissingElement>
      {({ onDismissStart }) => (
        <Flex alignItems="center" justifyContent="end" gap={2}>
          <Button
            color="gray"
            text="Cancel"
            size="lg"
            onClick={onDismissStart}
          />
          <Button color="red" text="Create" size="lg" onClick={handleCreate} />
        </Flex>
      )}
    </OverlayPanel.DismissingElement>
  );

  return (
    <Layer zIndex={sheetZIndex}>
      <OverlayPanel
        accessibilityDismissButtonLabel="Create API Key"
        accessibilityLabel="Create API Key"
        heading="Create API Key"
        onDismiss={close}
        footer={footer}
        size="md"
      >
        <Flex
          direction="column"
          gap={{
            row: 0,
            column: 12,
          }}
        >
          <Flex
            direction="column"
            gap={{
              row: 0,
              column: 4,
            }}
          >
            <TextField
              id="name"
              label="API Key Name"
              name="name"
              placeholder="Api Key Name"
              onChange={({ value }) => setName(value)}
              value={name}
              size="lg"
              hasError={name === ""}
              autoComplete="off"
              errorMessage={name === "" && "please enter an API Key name"}
            />
          </Flex>
          <Flex
            direction="column"
            gap={{
              row: 0,
              column: 4,
            }}
          >
            <Box>
              <Text weight="bold">API Key Permissions</Text>
            </Box>
            <RadioGroup
              legendDisplay="hidden"
              legend="Which state is your favorite?"
              id="rowExample"
            >
              <RadioGroup.RadioButton
                checked={accessLevel === ApiAccessLevel.Full}
                id={ApiAccessLevel.Full}
                label="Full Access"
                name="stateExample"
                helperText="Allows the API key to access GET, PATCH, PUT, DELETE, and POST endpoints for all parts of the API scope"
                onChange={() => setAccessLevel(ApiAccessLevel.Full)}
                value={ApiAccessLevel.Full}
              />
              <RadioGroup.RadioButton
                checked={accessLevel === ApiAccessLevel.Read}
                id={ApiAccessLevel.Read}
                label="Read Access"
                helperText="Allows the API key to access only GET endpoints of every API scope"
                name="stateExample"
                onChange={() => setAccessLevel(ApiAccessLevel.Read)}
                value={ApiAccessLevel.Read}
              />
              <RadioGroup.RadioButton
                checked={accessLevel === ApiAccessLevel.Custom}
                id={ApiAccessLevel.Custom}
                label="Restricted Access"
                helperText="Customize levels of access for all parts of the API scope"
                name="stateExample"
                onChange={() => setAccessLevel(ApiAccessLevel.Custom)}
                value={ApiAccessLevel.Custom}
              />
            </RadioGroup>
          </Flex>
          {accessLevel === ApiAccessLevel.Custom && (
            <Table accessibilityLabel="Main example table">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    <Text weight="bold">API Scopes</Text>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <Text weight="bold">No Access</Text>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <Text weight="bold">Read Access</Text>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <Text weight="bold">Full Access</Text>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <ListTable scope={scope} setScope={setScope} />
                <SubscriberTable scope={scope} setScope={setScope} />
              </Table.Body>
            </Table>
          )}
        </Flex>
      </OverlayPanel>
    </Layer>
  );
}
