import { Box, Flex, Icon, Table, Text } from "gestalt";
interface IData {
  text: string;
  free: boolean | string;
  basic: boolean | string;
  advanced: boolean | string;
}

const data: IData[] = [
  {
    text: "Maximum Contact Count",
    free: "Upto 2,000 contacts",
    basic: "Upto 100,000 contacts with $200/mo tier",
    advanced: "Upto 200,000 contacts with $900/mo tier",
  },
  {
    text: "Maximum Monthly Emails Sends",
    free: "Monthly email send limit 6000 sends limit.",
    basic: "Monthly email sends: 3X plan contact limit.",
    advanced: "Monthly email sends: 5X plan contact limit.",
  },

  {
    text: "Design Email & Editor",
    free: true,
    basic: true,
    advanced: true,
  },
  {
    text: "Segmentation (coming soon)",
    free: true,
    basic: true,
    advanced: true,
  },
  {
    text: "A/B testing (coming soon)",
    free: true,
    basic: true,
    advanced: true,
  },
  { text: "Automation", advanced: true, basic: false, free: true },
  {
    text: "Sign-up Form",
    free: "1 form",
    basic: "5 form",
    advanced: "15 form",
  },
  {
    text: "Dedicated IP included",
    free: false,
    basic: false,
    advanced: true,
  },
  {
    text: "Campaign (coming soon)",
    free: true,
    basic: true,
    advanced: true,
  },
  {
    text: "Content Perosonalization",
    free: true,
    basic: true,
    advanced: true,
  },
  {
    text: "Contact Profiles",
    free: true,
    basic: true,
    advanced: true,
  },
  {
    text: "Responsive Templates",
    free: true,
    basic: true,
    advanced: true,
  },
  {
    text: "Engagement Statistics",
    free: true,
    basic: true,
    advanced: true,
  },
  {
    text: "Periodic Reports",
    free: true,
    basic: true,
    advanced: true,
  },
  {
    text: "Subscription Rewards",
    free: false,
    basic: true,
    advanced: true,
  },

  {
    text: "Unsubscribe Preference Page",
    free: true,
    basic: true,
    advanced: true,
  },
  {
    text: "Starred Lists",
    free: true,
    basic: true,
    advanced: true,
  },

  {
    text: "Free Templates & Forms",
    free: true,
    basic: true,
    advanced: true,
  },

  {
    text: "Bounce Rate, Spam, Blocked Reporting",
    free: true,
    basic: true,
    advanced: true,
  },
  {
    text: "API's",
    free: true,
    basic: true,
    advanced: true,
  },
  {
    text: "Newsletter Engagement",
    free: true,
    basic: true,
    advanced: true,
  },
  {
    text: "Unlimited Newsletter Publish",
    free: true,
    basic: true,
    advanced: true,
  },
  {
    text: "Unlimited Products",
    free: true,
    basic: true,
    advanced: true,
  },
  {
    text: "Abandoned Cart Emails",
    free: true,
    basic: true,
    advanced: true,
  },

  {
    text: "Technical Support",
    free: "Devs on Discord",
    basic: "Ticket & Devs on Discord",
    advanced: "Priority Ticket & Devs on Discord",
  },
];

export const AdditionalFeatures = ({ heading }: { heading: string }) => {
  return (
    <Box width="100%">
      <Table accessibilityLabel="Table.RowDrawer example">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Text weight="bold">{heading}</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Free</Text>
              <Text weight="bold" size="100" color="subtle">
                starting at $0/mo
              </Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Basic</Text>
              <Text weight="bold" size="100" color="subtle">
                starting at $15/mo
              </Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Advanced</Text>
              <Text weight="bold" size="100" color="subtle">
                starting at$60/mo
              </Text>
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
                  {typeof value.free === "string" ? (
                    <Text>{value.free}</Text>
                  ) : (
                    <Icon
                      accessibilityLabel="check circle"
                      icon={value.free ? "check-circle" : "cancel"}
                      color={value.free ? "success" : "error"}
                    />
                  )}
                </Flex>
              </Table.Cell>

              <Table.Cell>
                {typeof value.basic === "string" ? (
                  <Text>{value.basic}</Text>
                ) : (
                  <Icon
                    accessibilityLabel="check circle"
                    icon={value.basic ? "check-circle" : "cancel"}
                    color={value.basic ? "success" : "error"}
                  />
                )}
              </Table.Cell>
              <Table.Cell>
                {typeof value.basic === "string" ? (
                  <Text>{value.advanced}</Text>
                ) : (
                  <Icon
                    accessibilityLabel="check circle"
                    icon={value.advanced ? "check-circle" : "cancel"}
                    color={value.advanced ? "success" : "error"}
                  />
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Box>
  );
};
