import { Box, Sticky } from "gestalt";
import UnauthSideNav from "../SideNav/UnauthSideNav";

export const UnauthNav = () => {
  return (
    <Sticky top={0} zIndex={{ index: () => 0 }}>
      <Box display="none" mdDisplay="block" lgDisplay="block" height="100vh">
        <UnauthSideNav />
      </Box>
    </Sticky>
  );
};
