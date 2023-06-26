import { Flex, Icon, Text } from "gestalt";

export const commonDetails = [
  "Design Email",
  "Segmentation (coming soon)",
  "Campaign (coming soon)",
  "A/B Testing & Dashboard Analytics",
  "9 Templates & 2 Forms",
  // "Periodic Reports",
  "Newsletter",
];
export const Details = ({
  type,
  data,
}: {
  type: "success" | "fail";
  data: string;
}) => {
  return (
    <Flex gap={2} alignItems="center" key={data}>
      <Icon
        accessibilityLabel="check"
        icon={type === "success" ? "check" : "cancel"}
        color={type === "success" ? "success" : "error"}
        size={13}
      />
      <Text>{data}</Text>
    </Flex>
  );
};
