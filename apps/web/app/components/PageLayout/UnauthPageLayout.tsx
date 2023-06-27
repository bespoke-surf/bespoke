/* eslint-disable gestalt/no-spread-props */
import type { PageHeaderProps } from "gestalt";
import { Box, Container, Flex, PageHeader } from "gestalt";
import BigContainer from "../BigContainer";
import { UnauthNav } from "../Navigation/UnauthNav";

export default function UnauthPageLayot({
  children,
  pageHeaderPorps,
}: {
  children: React.ReactNode;
  pageHeaderPorps: PageHeaderProps;
}) {
  return (
    <BigContainer>
      <Flex alignItems="start">
        <UnauthNav />
        <Flex.Item flex="grow">
          <Container>
            <PageHeader {...pageHeaderPorps} />
            <Flex justifyContent="center">
              <Box width="92.5%" paddingY={6}>
                {children}
              </Box>
            </Flex>
          </Container>
        </Flex.Item>
      </Flex>
    </BigContainer>
  );
}
