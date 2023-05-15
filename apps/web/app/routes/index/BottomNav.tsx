import { useLoaderData, useRouteLoaderData } from "@remix-run/react";
import { Box, Container, Flex, IconButton } from "gestalt";
import type { RootData } from "~/root";
import type { IndexData } from "./types";

const BottomNav = ({
  step,
  setStep,
}: {
  step: number;
  setStep: (arg: number) => void;
}) => {
  const loaderData = useLoaderData<IndexData>();
  const rootLoader = useRouteLoaderData("root") as RootData;

  const disableUp = rootLoader?.isUserSubdomain ? step === -1 : step === 0;
  const disableDown =
    loaderData.posts?.length === 0 ||
    !loaderData.posts ||
    loaderData.posts.length - 1 === step;

  const naviagateDown = () => {
    if (
      loaderData.posts?.length !== undefined &&
      loaderData?.posts?.length - 1 > step
    ) {
      setStep(step + 1);
    }
  };
  const naviagateUp = () => {
    if (rootLoader?.isUserSubdomain) {
      if (step === 0) {
        setStep(-1);
      }
    }
    if (step !== 0) {
      setStep(step - 1);
    }
  };

  return (
    <Box
      position="fixed"
      bottom={true}
      right={true}
      as="nav"
      zIndex={{ index: () => 10 }}
    >
      <Container>
        <Box
          color="transparent"
          display="flex"
          justifyContent="end"
          alignItems="end"
          direction="column"
          margin={1}
        >
          <Flex alignItems="center" direction="row" justifyContent="between">
            <Flex direction="column" gap={2}>
              {disableUp}
              <IconButton
                accessibilityLabel="icon"
                icon="arrow-up"
                size="lg"
                bgColor="lightGray"
                iconColor="darkGray"
                disabled={disableUp}
                onClick={naviagateUp}
              />
              <IconButton
                accessibilityLabel="icon"
                icon="arrow-down"
                bgColor="lightGray"
                size="lg"
                iconColor="darkGray"
                disabled={disableDown}
                onClick={naviagateDown}
              />
            </Flex>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};
export default BottomNav;
