import { RadioButton, Table, Text } from "gestalt";
import { ApiKeyAccessScopeEnum } from "../../../graphql/__generated__/graphql";

export default function SubscriberTable({
  setScope,
  scope,
}: {
  scope: ApiKeyAccessScopeEnum[];
  setScope: React.Dispatch<React.SetStateAction<ApiKeyAccessScopeEnum[]>>;
}) {
  console.log(scope);
  return (
    <Table.Row>
      <Table.Cell>
        <Text>Subscriber</Text>
      </Table.Cell>
      <Table.Cell>
        <RadioButton
          id="subscriber:none"
          label=""
          checked={scope.some((s) => s.startsWith("SUBSCRIBER_")) === false}
          name="subscriber:none"
          onChange={() =>
            setScope(scope.filter((s) => !s.startsWith("SUBSCRIBER_")))
          }
          value="subscriber:none"
        />
      </Table.Cell>
      <Table.Cell>
        <RadioButton
          id={ApiKeyAccessScopeEnum.SubscriberRead}
          label=""
          name={ApiKeyAccessScopeEnum.SubscriberRead}
          checked={scope.includes(ApiKeyAccessScopeEnum.SubscriberRead)}
          onChange={() =>
            setScope([
              ...scope.filter((s) => !s.startsWith("SUBSCRIBER_")),
              ApiKeyAccessScopeEnum.SubscriberRead,
            ])
          }
          value={ApiKeyAccessScopeEnum.SubscriberRead}
        />
      </Table.Cell>

      <Table.Cell>
        <RadioButton
          id={ApiKeyAccessScopeEnum.SubscriberManage}
          label=""
          checked={scope.includes(ApiKeyAccessScopeEnum.SubscriberManage)}
          name={ApiKeyAccessScopeEnum.SubscriberManage}
          onChange={() =>
            setScope([
              ...scope.filter((s) => !s.startsWith("SUBSCRIBER_")),
              ApiKeyAccessScopeEnum.SubscriberManage,
            ])
          }
          value={ApiKeyAccessScopeEnum.SubscriberManage}
        />
      </Table.Cell>
    </Table.Row>
  );
}
