import { Box, Flex } from "gestalt";
import React from "react";

export default function BigContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex alignItems="stretch" justifyContent="center">
      <Box maxWidth={1128} width="100%">
        {children}
      </Box>
    </Flex>
  );
}
