import { Box, Flex, Heading, Link, Text } from "gestalt";
import React from "react";
import BigContainer from "../../components/BigContainer";
import Footer2 from "../../components/Footer/Footer2";
import UnauthMobileNav2 from "../../components/MobileNav/UnauthMobileNav2";
import UnauthNav2 from "../../components/Navigation/UnauthNav2";

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
          <Heading>Data Processing Agreement</Heading>
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
              This Data Processing Agreement is incorporated by reference into
              the Bespoke's Privacy Policy. While the framework used here is
              based in the provisions of the California Consumer Privacy Act of
              2018 (“CCPA”), we provide the rights described here to all our
              users. If you are a California resident, please note that the
              processing of certain personal data about you may be subject to
              the California Consumer Privacy Act (“CCPA”) and other applicable
              California state privacy laws. Any capitalized terms not defined
              in this CCPA Policy have the same meaning given to them in our
              Privacy Policy, Terms of Use, and/or the CCPA.
            </Text>
          </Box>
          <Box marginTop={12} marginBottom={8}>
            <Heading size="400">No Sale of Personal Information</Heading>
            <Box marginTop={4}>
              <Text size="300">We do not sell personal information.</Text>
            </Box>
          </Box>
          <Box marginTop={8} marginBottom={8}>
            <Heading size="400">Individual Rights</Heading>
            <Box marginTop={4}>
              <Text size="300">
                The CCPA provides California consumers with several individual
                rights with respect to Personal Information. Note that these
                rights apply to individual consumers, not to companies. This
                section describes those rights in detail and provides
                information on how to exercise those rights.
              </Text>
            </Box>
          </Box>
          <Box marginTop={8} marginBottom={8}>
            <Heading size="400"> Exercising Your Rights</Heading>
            <Box marginTop={4}>
              <Text size="300">
                To exercise any of the rights described in this section, please
                contact us at support@bespoke.surf with (i) a complete
                description of your request, including the specific right(s) you
                wish to exercise and (ii) sufficient information about you so we
                can confirm that your request is a verifiable customer request,
                including at a minimum your name and email address. Once we have
                received your verifiable consumer request, we will respond
                consistent with applicable law.
              </Text>
            </Box>
          </Box>
          <Box marginTop={8} marginBottom={8}>
            <Heading size="400"> Access and Data Portability Rights</Heading>
            <Box marginTop={4}>
              <Text size="300">
                You have a right to request information about our collection,
                use, and disclosure of your personal information over the prior
                12 months, and ask that we provide you with the following
                information:
              </Text>
              <Text>
                <li>
                  Categories of and specific pieces of personal information we
                  have collected about you.
                </li>
              </Text>
              <Text>
                <li>
                  Categories of sources from which we collect personal
                  information.
                </li>
              </Text>
              <Text>
                <li>
                  Purposes for collecting, using, or selling personal
                  information.
                </li>
              </Text>
              <Text>
                <li>
                  Categories of third parties with which we share personal
                  information.
                </li>
              </Text>
              <Text>
                <li>
                  Categories of personal information disclosed about you for a
                  business purpose.
                </li>
              </Text>
              <Text>
                <li>
                  If applicable, categories of personal information sold about
                  you and the categories of third parties to which the personal
                  information was sold, by category or categories of personal
                  information for each third party to which the personal
                  information was sold.
                </li>
              </Text>
            </Box>
          </Box>
          <Box marginTop={8} marginBottom={8}>
            <Heading size="400">Deletion Rights</Heading>
            <Box marginTop={4}>
              <Text size="300">
                You have the right to request that we delete Personal
                Information about you that we have collected, subject to certain
                exceptions.
              </Text>
            </Box>
          </Box>

          <Box marginTop={8} marginBottom={8}>
            <Heading size="400">The Right to Opt Out</Heading>
            <Box marginTop={4}>
              <Text size="300">
                You have the right to opt out of the sale of your personal
                information. Were we ever to sell personal information, we would
                provide information on our opt out process here.
              </Text>
            </Box>
          </Box>

          <Box marginTop={8} marginBottom={8}>
            <Heading size="400">Non-Discrimination Rights</Heading>
            <Box marginTop={4}>
              <Text size="300">
                You have the right not to receive discriminatory treatment for
                the exercise of your rights under the CCPA.
              </Text>
            </Box>
          </Box>
          <Box marginTop={8} marginBottom={8}>
            <Heading size="400">Personal Data Collected</Heading>
            <Box marginTop={4}>
              <Text size="300">
                The list below describes the category of Personal Information we
                collect by reference to the categories specified by the CCPA:
              </Text>
            </Box>
            <Box marginTop={8}>
              <Box marginTop={4}>
                <Text weight="bold" inline>
                  Category:{" "}
                </Text>
                <Text inline>Identifiers</Text>
              </Box>
              <Box marginTop={4}>
                <Text weight="bold" inline>
                  We collect:{" "}
                </Text>
                <Text inline>
                  Your name, IP address, email address and Twitter handle
                </Text>
              </Box>
              <Box marginTop={4}>
                <Text weight="bold" inline>
                  Source(s):{" "}
                </Text>
                <Text inline>
                  You; automatic collection (IP address only); Bespoke
                  publishers who migrate subscribers to our platform (email
                  address only)
                </Text>
              </Box>
            </Box>
            <Box marginTop={8}>
              <Box marginTop={4}>
                <Text weight="bold" inline>
                  Category:{" "}
                </Text>
                <Text inline>Customer Record Information</Text>
              </Box>
              <Box marginTop={4}>
                <Text weight="bold" inline>
                  We collect:{" "}
                </Text>
                <Text inline>
                  Your name, your email address, your user bio, your
                  subscriptions and unsubscriptions, your settings and
                  preferences with our service, reactions you submit to posts
                  and comments (“likes”), user comments, user photos, user
                  profile information, public Twitter profile information, and
                  publication and authorship information, your search history on
                  the Website. For Publishers, we may also collect information
                  on city or country of residence and mailing address.
                </Text>
              </Box>
              <Box marginTop={4}>
                <Text weight="bold" inline>
                  Source(s):{" "}
                </Text>
                <Text inline>
                  You; Twitter (with your permission). We may collect Publisher
                  city or country of residence information from information
                  Publishers have made publicly available online.
                </Text>
              </Box>
            </Box>
            <Box marginTop={8}>
              <Box marginTop={4}>
                <Text weight="bold" inline>
                  Category:{" "}
                </Text>
                <Text inline>Commercial information</Text>
              </Box>
              <Box marginTop={4}>
                <Text weight="bold" inline>
                  We collect:{" "}
                </Text>
                <Text inline>
                  Records of products/services purchased by you on the Website
                </Text>
              </Box>
              <Box marginTop={4}>
                <Text weight="bold" inline>
                  Source(s):{" "}
                </Text>
                <Text inline>You</Text>
              </Box>
            </Box>
            <Box marginTop={8}>
              <Box marginTop={4}>
                <Text weight="bold" inline>
                  Category:{" "}
                </Text>
                <Text inline>Internet or other network activity</Text>
              </Box>
              <Box marginTop={4}>
                <Text weight="bold" inline>
                  We collect:{" "}
                </Text>
                <Text inline>
                  Browsing history, search history, and interaction data on your
                  use of our Website and from links in Bespoke emails
                </Text>
              </Box>
              <Box marginTop={4}>
                <Text weight="bold" inline>
                  Source(s):{" "}
                </Text>
                <Text inline>You; automatic collection</Text>
              </Box>
            </Box>
            <Box marginTop={8}>
              <Box marginTop={4}>
                <Text weight="bold" inline>
                  Category:{" "}
                </Text>
                <Text inline>Geolocation data</Text>
              </Box>
              <Box marginTop={4}>
                <Text weight="bold" inline>
                  We collect:{" "}
                </Text>
                <Text inline>Your IP address</Text>
              </Box>
              <Box marginTop={4}>
                <Text weight="bold" inline>
                  Source(s):{" "}
                </Text>
                <Text inline>You; Automatic collection</Text>
              </Box>
            </Box>
            <Box marginTop={8}>
              <Box marginTop={4}>
                <Text weight="bold" inline>
                  Category:{" "}
                </Text>
                <Text inline>Sensory Data</Text>
              </Box>
              <Box marginTop={4}>
                <Text weight="bold" inline>
                  We collect:{" "}
                </Text>
                <Text inline>User photos, Twitter profile photo</Text>
              </Box>
              <Box marginTop={4}>
                <Text weight="bold" inline>
                  Source(s):{" "}
                </Text>
                <Text inline>You, Twitter (with your permission)</Text>
              </Box>
            </Box>
          </Box>
          <Box marginTop={8} marginBottom={8}>
            <Heading size="400">Use of Personal Information</Heading>
            <Box marginTop={4}>
              <Text size="300">
                In the last 12 months, we have used or disclosed certain
                Personal Information we collected for the following business
                purposes:
              </Text>
            </Box>
            <Box marginTop={8}>
              <Box marginTop={4}>
                <Text weight="bold" inline>
                  Business Purpose:{" "}
                </Text>
                <Text inline>
                  To provide, support, and develop our website, products, and
                  services
                </Text>
              </Box>
              <Box marginTop={4}>
                <Text weight="bold" inline>
                  Categories of Personal Information:{" "}
                </Text>
                <Text inline>
                  Identifiers, Customer Record Information, Sensory Data,
                  Internet or other network activity
                </Text>
              </Box>
            </Box>
            <Box marginTop={8}>
              <Box marginTop={4}>
                <Text weight="bold" inline>
                  Business Purpose:{" "}
                </Text>
                <Text inline>
                  To create, maintain, customize, and secure your account with
                  us
                </Text>
              </Box>
              <Box marginTop={4}>
                <Text weight="bold" inline>
                  Categories of Personal Information:{" "}
                </Text>
                <Text inline>Identifiers, Customer Record Information</Text>
              </Box>
            </Box>
            <Box marginTop={8}>
              <Box marginTop={4}>
                <Text weight="bold" inline>
                  Business Purpose:{" "}
                </Text>
                <Text inline>
                  To process your requests, purchases, transactions, and
                  payments and prevent transactional fraud
                </Text>
              </Box>
              <Box marginTop={4}>
                <Text weight="bold" inline>
                  Categories of Personal Information:{" "}
                </Text>
                <Text inline>Commercial Information </Text>
              </Box>
            </Box>
            <Box marginTop={8}>
              <Box marginTop={4}>
                <Text weight="bold" inline>
                  Business Purpose:{" "}
                </Text>
                <Text inline>
                  To directly respond to your requests or inquiries, including
                  to investigate and address your concerns and monitor and
                  improve our responses, or to otherwise meet the reason for
                  which you provided the information.
                </Text>
              </Box>
              <Box marginTop={4}>
                <Text weight="bold" inline>
                  Categories of Personal Information:{" "}
                </Text>
                <Text inline>
                  Identifiers, Customer Record Information, Commercial
                  Information, Sensory Data, Internet or other network activity
                </Text>
              </Box>
            </Box>
            <Box marginTop={8} marginBottom={8}>
              <Box marginTop={4}>
                <Text weight="bold" inline>
                  Business Purpose:{" "}
                </Text>
                <Text inline>
                  To help maintain the safety, security, and integrity of our
                  website, products and services, databases and other technology
                  assets, and business
                </Text>
              </Box>
              <Box marginTop={4}>
                <Text weight="bold" inline>
                  Categories of Personal Information:{" "}
                </Text>
                <Text inline>Identifiers</Text>
              </Box>
            </Box>
            <Text>
              We may further disclose each category of Personal Information to
              our affiliates, to our professional advisors, in connection with
              our compliance and protection activities and in connection with
              business transfers as described in our Privacy Policy.
            </Text>
          </Box>
          <Box marginTop={8} marginBottom={8}>
            <Heading size="400">Contact Us</Heading>
            <Box marginTop={4}>
              <Text size="300">
                You many contact us by emaling us at support@bespoke.surf
              </Text>
            </Box>
          </Box>
        </Box>
      </BigContainer>
      <Footer2 />
    </>
  );
};
export default Rp;
