import { Box } from "gestalt";

export default function VerticalDivider() {
  return (
    <Box
      width={1}
      dangerouslySetInlineStyle={{
        __style: { backgroundColor: "#eee", margin: "04px" },
      }}
    />
  );
}
