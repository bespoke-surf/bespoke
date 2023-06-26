import { Box, Flex, Icon, Table, Text } from "gestalt";
/*
 */

type Applicability = "yes" | "no" | "partial" | "coming soon";
interface IData {
  text: string;
  readiness: "partial" | "ready";
  klaviyo: Applicability;
  bespoke: Applicability;
  substack: Applicability;
  mailchimp: Applicability;
}

const data: IData[] = [
  // {
  //   text: "You can compare your metrics with related industries with benchmarks",
  //   readiness: "ready",
  //   klaviyo: "yes",
  //   bespoke: "yes",
  //   substack: "no",
  //   mailchimp: "no",
  // },

  {
    text: "You can quickly replicate the top strategies shared by other strategists",
    readiness: "ready",
    klaviyo: "no",
    bespoke: "coming soon",
    substack: "no",
    mailchimp: "no",
  },

  {
    text: "You can buy latest forms and email templates to be effective at Campaigns",
    readiness: "ready",
    klaviyo: "partial",
    bespoke: "coming soon",
    substack: "no",
    mailchimp: "no",
  },
];

export default function CloudTable() {
  return (
    <>
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
                  value.bespoke === "yes" ||
                  value.bespoke === "coming soon" ||
                  value.bespoke === "partial"
                    ? "check-circle"
                    : "cancel"
                }
                color={
                  value.bespoke === "yes" ||
                  value.bespoke === "coming soon" ||
                  value.bespoke === "partial"
                    ? "success"
                    : "error"
                }
              />
              {value.bespoke === "coming soon" && (
                <Text size="100">Coming soon</Text>
              )}
            </Flex>
          </Table.Cell>

          <Table.Cell>
            <Icon
              accessibilityLabel="check circle"
              icon={
                value.klaviyo === "yes"
                  ? "check-circle"
                  : value.klaviyo === "partial"
                  ? "workflow-status-unstarted"
                  : "cancel"
              }
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
    </>
  );
}
