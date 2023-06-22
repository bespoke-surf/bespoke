import { Box, Flex, Icon, Table, Text } from "gestalt";
/*
 */

type Applicability = "yes" | "no" | "partial";
interface IData {
  text: string;
  readiness: "partial" | "ready";
  klaviyo: Applicability;
  bespoke: Applicability;
  substack: Applicability;
  mailchimp: Applicability;
}

const data: IData[] = [
  {
    text: "You can collect emails, also from a website with a form and add to a list",
    readiness: "ready",
    klaviyo: "yes",
    bespoke: "yes",
    substack: "no",
    mailchimp: "yes",
  },
  {
    text: "You can send automated emails eg: sending a welcome message after an hour",
    readiness: "ready",
    klaviyo: "yes",
    bespoke: "yes",
    substack: "no",
    mailchimp: "yes",
  },
  {
    text: "You can design emails and forms and load templates",
    readiness: "ready",
    klaviyo: "yes",
    bespoke: "yes",
    substack: "no",
    mailchimp: "yes",
  },
  {
    text: "You can create a newsletter and send it to a list and also publish a newsletter under your subdomain",
    readiness: "ready",
    klaviyo: "no",
    bespoke: "yes",
    substack: "yes",
    mailchimp: "no",
  },
  // {
  //   text: "You can ask questions to understand your customers' preferences",
  //   readiness: "ready",
  //   klaviyo: "no",
  //   bespoke: "partial",
  //   substack: "no",
  //   mailchimp: "yes",
  // },
  {
    text: "You can quickly replicate the top strategies shared by other strategists",
    readiness: "ready",
    klaviyo: "no",
    bespoke: "partial",
    substack: "no",
    mailchimp: "no",
  },
  {
    text: "You can execute new campaigns based on personalized or segmented content",
    readiness: "ready",
    klaviyo: "yes",
    bespoke: "partial",
    substack: "no",
    mailchimp: "yes",
  },
  // {
  //   text: "You can create an unique personalized brand expierence for your customers'",
  //   readiness: "ready",
  //   klaviyo: "partial",
  //   bespoke: "partial",
  //   substack: "no",
  //   mailchimp: "no",
  // },
  // {
  //   text: "Customers' are able to wipe their data to uphold their privacy",
  //   readiness: "ready",
  //   klaviyo: "no",
  //   bespoke: "partial",
  //   substack: "no",
  //   mailchimp: "no",
  // },
];

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
              <Text weight="bold">Substack</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Mailchimp</Text>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((value) => (
            <Table.Row key={value.text}>
              <Table.Cell>
                <Box minWidth={180}>
                  <Text>{value.text}</Text>
                </Box>
              </Table.Cell>
              <Table.Cell>
                <Flex gap={3} alignItems="center">
                  <Icon
                    accessibilityLabel="check circle"
                    icon={
                      value.bespoke === "yes"
                        ? "check-circle"
                        : value.bespoke === "partial"
                        ? "check-circle"
                        : "cancel"
                    }
                    color={
                      value.bespoke === "yes" || value.bespoke === "partial"
                        ? "success"
                        : "error"
                    }
                  />
                  {value.bespoke === "partial" && (
                    <Text size="100">Coming soon</Text>
                  )}
                </Flex>
              </Table.Cell>

              <Table.Cell>
                <Icon
                  accessibilityLabel="check circle"
                  icon={value.klaviyo === "yes" ? "check-circle" : "cancel"}
                  color={value.klaviyo === "yes" ? "success" : "error"}
                />
              </Table.Cell>
              <Table.Cell>
                <Icon
                  accessibilityLabel="check circle"
                  icon={value.substack === "yes" ? "check-circle" : "cancel"}
                  color={value.substack === "yes" ? "success" : "error"}
                />
              </Table.Cell>
              <Table.Cell>
                <Icon
                  accessibilityLabel="check circle"
                  icon={value.mailchimp === "yes" ? "check-circle" : "cancel"}
                  color={value.mailchimp === "yes" ? "success" : "error"}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Box>
  );
}
