import { Box, SlimBanner } from "gestalt";

export function GenericErrorBoundary({ error }: { error: Error }) {
  return (
    <Box>
      <SlimBanner
        message={`An unknown error occured ${JSON.stringify(error)}`}
        type="error"
        iconAccessibilityLabel="error"
      />
    </Box>
  );
}
