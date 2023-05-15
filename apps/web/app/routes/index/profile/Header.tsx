import { useRouteLoaderData } from "@remix-run/react";
import { Box, Heading, Text } from "gestalt";
import type { RootData } from "~/root";

const Header = () => {
  const storeData = useRouteLoaderData("root") as RootData;

  return (
    <Box
      paddingX={2}
      display="flex"
      justifyContent="center"
      alignItems="center"
      direction="column"
      marginBottom={6}
      marginTop={12}
    >
      <Box marginBottom={2}>
        <Heading size="600" overflow="breakWord" align="center">
          {storeData?.store?.name}
        </Heading>
      </Box>
      <Text>{storeData?.store?.about?.about}</Text>
    </Box>
  );
};
export default Header;
