import { RadioButton, Table, Text } from "gestalt";
import { ApiKeyAccessScopeEnum } from "../../../graphql/__generated__/graphql";

export default function ListTable({
  setScope,
  scope,
}: {
  scope: ApiKeyAccessScopeEnum[];
  setScope: React.Dispatch<React.SetStateAction<ApiKeyAccessScopeEnum[]>>;
}) {
  return (
    <Table.Row>
      <Table.Cell>
        <Text>List</Text>
      </Table.Cell>
      <Table.Cell>
        <RadioButton
          id="list:none"
          label=""
          checked={scope.some((s) => s.startsWith("LIST_")) === false}
          name="list:none"
          onChange={() => setScope(scope.filter((s) => !s.startsWith("LIST_")))}
          value="list:none"
        />
      </Table.Cell>
      <Table.Cell>
        <RadioButton
          id={ApiKeyAccessScopeEnum.ListRead}
          label=""
          name={ApiKeyAccessScopeEnum.ListRead}
          checked={scope.includes(ApiKeyAccessScopeEnum.ListRead)}
          onChange={() =>
            setScope([
              ...scope.filter((s) => !s.startsWith("LIST_")),
              ApiKeyAccessScopeEnum.ListRead,
            ])
          }
          value={ApiKeyAccessScopeEnum.ListRead}
        />
      </Table.Cell>

      <Table.Cell>
        <RadioButton
          id={ApiKeyAccessScopeEnum.ListManage}
          label=""
          checked={scope.includes(ApiKeyAccessScopeEnum.ListManage)}
          name={ApiKeyAccessScopeEnum.ListManage}
          onChange={() =>
            setScope([
              ...scope.filter((s) => !s.startsWith("LIST_")),
              ApiKeyAccessScopeEnum.ListManage,
            ])
          }
          value={ApiKeyAccessScopeEnum.ListManage}
        />
      </Table.Cell>
    </Table.Row>
  );
}
