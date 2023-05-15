import { useCatch } from "@remix-run/react";
import { Box, SlimBanner } from "gestalt";

export function GenericCatchBoundary() {
  let caught = useCatch();
  let message = caught.statusText;
  if (typeof caught.data === "string") {
    message = caught.data;
  }

  return (
    <Box>
      <SlimBanner
        message={message}
        type="error"
        iconAccessibilityLabel="error"
      />
    </Box>
  );
}
