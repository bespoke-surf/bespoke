import { Box, Flex, Heading, Link, Text } from "gestalt";
import React from "react";
import BigContainer from "../../components/BigContainer";
import Footer from "../../components/Footer";
import PublicMobileNav from "../../components/PublicMobileNav";
import PublicNav from "../../components/PublicNav";

const Rp: React.FC<unknown> = () => {
  return (
    <>
      <BigContainer>
        <PublicNav />
        <PublicMobileNav />
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
          <Heading>Copyright Dispute Policy</Heading>
        </Box>
        <Box
          maxWidth="60rem"
          padding={5}
          display="flex"
          flex="grow"
          width="100%"
          direction="column"
          marginBottom={12}
        >
          <Box>
            <Text size="400">
              It is Bespoke’s policy to respond to notices alleging that any
              material uploaded by users of the Services infringes another
              person’s copyright. If you believe any material accessible on or
              from the Bespoke's website or the Services infringes your
              copyright, you may request removal of those materials (or access
              thereto) from this website or the Services by contacting the
              Bespoke, Inc. copyright agent (identified below) and providing the
              following information:
            </Text>
          </Box>
          <Box>
            <Box marginTop={4}>
              <Text>
                <li>
                  Identification of the copyrighted work that you believe to be
                  infringed. Please describe the work, and where possible
                  include a copy or the location (URL) of an authorized version
                  of the work.
                </li>
              </Text>
              <Box margin={4}></Box>
              <Text>
                <li>
                  Identification of the material that you believe to be
                  infringing and its location. Please describe the material and
                  provide us with its URL or any other pertinent information
                  that will allow us to locate the material.
                </li>
              </Text>
              <Box margin={4}></Box>

              <Text>
                <li>
                  {" "}
                  Your name, address, telephone number and (if available) email
                  address.
                </li>
              </Text>
              <Box margin={4}></Box>

              <Text>
                <li>
                  A statement that you have a good faith belief that the use of
                  the materials is not authorized by the copyright owner, its
                  agent, or the law.
                </li>
              </Text>

              <Box margin={4}></Box>
              <Text>
                <li>
                  A statement that the information that you have supplied is
                  accurate, and indicating that “under penalty of perjury,” you
                  are the copyright owner or are authorized to act on the
                  copyright owner’s behalf.
                </li>
              </Text>
              <Box margin={4}></Box>
              <Text>
                <li>
                  A signature or the electronic equivalent from the copyright
                  holder or authorized representative.
                </li>
              </Text>
              <Box margin={4}></Box>
            </Box>
          </Box>
          <Box marginTop={4}>
            <Text size="300">
              Submitting a DMCA takedown request is the start of a pre-defined
              process. Your request will be reviewed for accuracy, validity, and
              completeness. If your request has satisfied the requirements
              above, Bespoke will take action on the request – which includes
              removing or disabling access to the allegedly infringing material
              and forwarding a full copy of your request (including your name
              and contact information) to the user(s) engaged in the allegedly
              infringing activity. Bespoke will make a good faith effort to
              contact the affected user(s) with information concerning the
              removal or disabling of access.
            </Text>
            <Box margin={4}></Box>
            <Text size="300">
              If you are the recipient of a takedown request, please take time
              to read through Bespoke’s communication to you, which will include
              information on the request we received. If you believe that the
              allegedly infringing material reported in the takedown request was
              misidentified, is not infringing, or was removed or disabled in
              error, you may send Bespoke a counter-notification or you may seek
              a retraction of the takedown request from the requester.
            </Text>
            <Box margin={4}></Box>
            <Text size="300">
              A counter-notification is a request for Bespoke to reinstate the
              removed or disabled material. You may file a counter-notification
              if you believe that the allegedly infringing material was
              misidentified, is not infringing, or you have a good faith belief
              that the material should not have been removed and/or disabled. If
              you’re not sure whether you should file a counter-notification,
              you should consult with an attorney.
            </Text>
            <Box margin={4}></Box>
            <Text size="300">
              To submit a counter-notification, you will need to provide Bespoke
              with the following information:
            </Text>
            <Box margin={4}></Box>
            <Text>
              <li>A physical or electronic signature.</li>
            </Text>
            <Box margin={4}></Box>
            <Text>
              <li>
                Identification of the material that has been removed or to which
                access has been disabled and the location at which the material
                appeared before it was removed or access to it was disabled.
              </li>
            </Text>
            <Box margin={4}></Box>
            <Text>
              <li>
                A statement under penalty of perjury that you have a good faith
                belief that the material was removed or disabled as a result of
                mistake or misidentification of the material to be removed or
                disabled.
              </li>
            </Text>
            <Box margin={4}></Box>
            <Text>
              <li>
                Your name, address, and telephone number, and a statement that
                you consent to the jurisdiction of Federal District Court for
                the judicial district in which the address is located, or if the
                subscriber’s address is outside of the United States, for any
                judicial district in which Bespoke may be found, and that you
                will accept service of process from the original requester or an
                agent of such person.
              </li>
            </Text>
            <Box marginTop={4}>
              <Text>
                Once we receive a valid counter-notification, we will promptly
                forward a copy (including your name and contact information) to
                the person who submitted the original request. If the original
                requester disagrees that the content was removed or disabled in
                error or misidentification, they may pursue legal action against
                you. If we do not receive notice within 10 business days that
                the original requester is seeking a court order to prevent
                further infringement of the material at issue, we may replace or
                cease disabling access to the material that was removed.
              </Text>
            </Box>
            <Box marginTop={4}>
              <Text>
                Bespoke may, at its discretion, share a copy of your takedown
                request or counter-notification with third parties (including
                for publication). If you are uncomfortable sharing your contact
                information, you may wish to consider appointing an agent to
                submit your request or counter-notification on your behalf. Your
                agent will be required to submit the request or
                counter-notification with valid contact information and identify
                you as the party that they are representing.
              </Text>
            </Box>
            <Box marginTop={4}>
              <Text>
                Please think twice before submitting a takedown request or
                counter-notification, especially if you’re not sure whether you
                are the actual copyright holder or authorized to act on behalf
                of the copyright holder. There are legal and financial
                consequences for fraudulent and/or bad faith submissions.
              </Text>
            </Box>
            <Box marginTop={4}>
              <Text>
                Bespoke has adopted a policy of terminating, in appropriate
                circumstances, accounts of users of the Services who are deemed
                to have repeatedly uploaded content that infringes the
                intellectual property rights of others.
              </Text>
            </Box>
          </Box>
        </Box>
      </BigContainer>
      <Footer />
    </>
  );
};
export default Rp;
