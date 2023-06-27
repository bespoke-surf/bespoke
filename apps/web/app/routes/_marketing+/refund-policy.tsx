import { redirect } from "@remix-run/node";
import { Box, Flex, Heading, Link, Text } from "gestalt";
import React from "react";
import { getEnvVars } from "../../../env.server";
import BigContainer from "../../components/BigContainer";
import Footer2 from "../../components/Footer/Footer2";
import UnauthMobileNav2 from "../../components/MobileNav/UnauthMobileNav2";
import UnauthNav2 from "../../components/Navigation/UnauthNav2";

export async function loader() {
  if (getEnvVars().OPEN_SOURCE) {
    return redirect("/");
  }
  return {};
}
const Rp: React.FC<unknown> = () => {
  return (
    <>
      <BigContainer>
        <UnauthNav2 />
        <UnauthMobileNav2 />
        <Box paddingY={12} padding={5}>
          <Flex direction="column" gap={{ column: 6, row: 12 }}>
            <Heading>Documents</Heading>

            <Link href="/terms-of-service">
              <Text underline>Terms of service</Text>
            </Link>
            <Link href="/privacy-policy">
              <Text underline>Privacy policy</Text>
            </Link>
            <Link href="/refund-policy">
              <Text underline>Refund policy</Text>
            </Link>
            <Link href="/content-guidelines">
              <Text underline>Content guidelines</Text>
            </Link>
            <Link href="/data-processing-agreement">
              <Text underline>Data processing agreement</Text>
            </Link>
            <Link href="/copyright-dispute-policy">
              <Text underline>Copyright dispute policy</Text>
            </Link>
          </Flex>
        </Box>
        <Box maxWidth="60rem" padding={5} marginTop={12}>
          <Heading>Refund and Cancellation</Heading>
        </Box>
        <Box
          maxWidth="60rem"
          padding={5}
          display="flex"
          flex="grow"
          width="100%"
          direction="column"
        >
          <Box>
            <Text size="400">
              We thank you and appreciate using our services. Please read the
              policy, conditions and process carefully as they will give you
              important information and guidelines about your rights and
              obligations as our customer. The policy concerning the processing
              of the refund, shall be following the clauses as set forth:
            </Text>
          </Box>
          <Box marginTop={12}>
            <Heading size="400">PROCESSING OF REFUND</Heading>
            <Box marginTop={4}>
              <Text size="300">
                Bespoke will charge Customer the Fees for the Services in
                advance for each billing period on or after the first day of
                such billing period. All Fees for Services are due and payable
                in US Dollars and are non-refundable.
              </Text>
              <Box margin={4}></Box>
            </Box>
          </Box>
          <Box marginTop={8} marginBottom={8}>
            <Heading size="400">
              CANCELLATION IN CASE OF TECHNICAL ERROR
            </Heading>
            <Box marginTop={4}>
              <Text size="300">
                The Company at its sole discretion may cancel any service(s):
              </Text>
              <Box margin={4}></Box>
              <Text>
                <li>
                  if it suspects a User has undertaken a fraudulent transaction,
                  or
                </li>
              </Text>
              <Box margin={4}></Box>
              <Text>
                <li>
                  if it suspects a User has undertaken a transaction which is
                  not following the Terms of Use, or
                </li>
              </Text>
              <Box margin={4}></Box>

              <Text>
                <li>in case of unavailability of a service, or</li>
              </Text>
              <Box margin={4}></Box>

              <Text>
                <li>
                  if the Company does not want to do business with the User
                </li>
              </Text>
              <Box margin={4}></Box>
            </Box>
          </Box>
        </Box>
      </BigContainer>
      <Footer2 />
    </>
  );
};
export default Rp;
