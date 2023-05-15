import { Box, Icon, Table, Text, Tooltip } from "gestalt";
export default function ComparisonTable() {
  return (
    <Box width="100%">
      <Table accessibilityLabel="Table.RowDrawer example" stickyColumns={1}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Text weight="bold">Benefits</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Bespoke</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Klaviyo</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Fairing</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Octane AI</Text>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Box minWidth={180}>
                <Text>
                  You can ask questions to understand your customers'
                  preferences
                </Text>
              </Box>
            </Table.Cell>
            <Table.Cell>
              <Icon
                accessibilityLabel="check circle"
                icon="check-circle"
                color="success"
              />
            </Table.Cell>

            <Table.Cell>
              <Icon
                accessibilityLabel="check circle"
                icon="cancel"
                color="error"
              />
            </Table.Cell>
            <Table.Cell>
              <Icon
                accessibilityLabel="check circle"
                icon="check-circle"
                color="success"
              />
            </Table.Cell>
            <Table.Cell>
              <Icon
                accessibilityLabel="check circle"
                icon="check-circle"
                color="success"
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text>
                You can strategize emails based on your customers' unique needs
              </Text>
            </Table.Cell>
            <Table.Cell>
              <Icon
                accessibilityLabel="check circle"
                icon="check-circle"
                color="success"
              />
            </Table.Cell>
            <Table.Cell>
              <Icon
                accessibilityLabel="check circle"
                icon="workflow-status-in-progress"
                color="warning"
              />
            </Table.Cell>
            <Table.Cell>
              <Icon
                accessibilityLabel="check circle"
                icon="cancel"
                color="error"
              />
            </Table.Cell>
            <Table.Cell>
              <Icon
                accessibilityLabel="check circle"
                icon="cancel"
                color="error"
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text>
                You can quickly replicate the top strategies shared by other
                strategists
              </Text>
            </Table.Cell>
            <Table.Cell>
              <Icon
                accessibilityLabel="check circle"
                icon="check-circle"
                color="success"
              />
            </Table.Cell>
            <Table.Cell>
              <Icon accessibilityLabel="error" icon="cancel" color="error" />
            </Table.Cell>
            <Table.Cell>
              <Icon accessibilityLabel="error" icon="cancel" color="error" />
            </Table.Cell>
            <Table.Cell>
              <Icon
                accessibilityLabel="check circle"
                icon="cancel"
                color="error"
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text>
                You can execute new campaigns based on personalized content
              </Text>
            </Table.Cell>
            <Table.Cell>
              <Icon
                accessibilityLabel="check circle"
                icon="check-circle"
                color="success"
              />
            </Table.Cell>
            <Table.Cell>
              <Icon
                accessibilityLabel="check circle"
                icon="workflow-status-in-progress"
                color="warning"
              />
            </Table.Cell>
            <Table.Cell>
              <Icon accessibilityLabel="error" icon="cancel" color="error" />
            </Table.Cell>
            <Table.Cell>
              <Icon
                accessibilityLabel="check circle"
                icon="cancel"
                color="error"
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text>
                You can create an unique personalized brand expierence for your
                customers'
              </Text>
            </Table.Cell>
            <Table.Cell>
              <Icon
                accessibilityLabel="check circle"
                icon="check-circle"
                color="success"
              />
            </Table.Cell>
            <Table.Cell>
              <Icon
                accessibilityLabel="check circle"
                icon="workflow-status-in-progress"
                color="warning"
              />
            </Table.Cell>
            <Table.Cell>
              <Icon accessibilityLabel="error" icon="cancel" color="error" />
            </Table.Cell>
            <Table.Cell>
              <Icon
                accessibilityLabel="check circle"
                icon="workflow-status-in-progress"
                color="warning"
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Box>
                <Text inline>
                  Customers' are able to wipe their data to uphold their privacy
                </Text>{" "}
                <Tooltip
                  text="Wouldn't it be fair if you could also delete your data from other brands if you are also their customer?"
                  inline
                >
                  <Icon
                    icon="info-circle"
                    accessibilityLabel="info"
                    color="subtle"
                  />
                </Tooltip>
              </Box>
            </Table.Cell>
            <Table.Cell>
              <Icon
                accessibilityLabel="check circle"
                icon="check-circle"
                color="success"
              />
            </Table.Cell>
            <Table.Cell>
              <Icon accessibilityLabel="error" icon="cancel" color="error" />
            </Table.Cell>
            <Table.Cell>
              <Icon accessibilityLabel="error" icon="cancel" color="error" />
            </Table.Cell>
            <Table.Cell>
              <Icon accessibilityLabel="error" icon="cancel" color="error" />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Box>
  );
}
