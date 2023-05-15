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
          <Heading>Content Guidelines</Heading>
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
              The following guidelines outline what is and is not acceptable on
              Bespoke. We have the exclusive right to interpret and enforce
              these guidelines, although we may consult outside experts,
              research, and industry best practices in doing so. If you
              encounter content that may be in breach of these guidelines or
              have any questions about them, you can email us at
              support@bespoke.surf. If we determine that any content is in
              breach of these guidelines, we may remove it, hide it from public
              view, or impose other restrictions. This is an evolving document:
              we reserve the right to update these Content Guidelines at our
              discretion and without notice.
            </Text>
          </Box>
          <Box marginTop={12}>
            <Heading size="400">PROHIBITED CONDUCT</Heading>
            <Box marginTop={4}>
              <Text size="300">You may not use the Services to:</Text>
              <Box margin={4}></Box>
              <Text>
                Promote, condone, encourage or facilitate hate, violence or
                discrimination against people based on race, ethnicity, color,
                national origin, religion, age, gender, gender identity, sexual
                orientation, disability, medical condition, veteran status or
                any other characteristic;
              </Text>
              <Box margin={4}></Box>
              <Text>
                Engage in, promote or facilitate any illegal activity or violate
                any applicable local, state, national or international law or
                regulation (including without limitation data, privacy, and
                export control laws);
              </Text>
              <Box margin={4}></Box>
              <Text>
                Offer products, services or content related to any of the
                following industries: escort and dating services; multi-level
                marketing; affiliate marketing; credit repair and “get out of
                debt” services; cryptocurrencies; selling ‘Likes’ or followers
                for a social media platform; work from home, make money online,
                and lead generating opportunities; pharmaceutical products;
                gambling products or services; or list brokers or list rental
                services;
              </Text>
              <Box margin={4}></Box>
              <Text>
                Violate the rights of others (including privacy rights);
              </Text>
              <Box margin={4}></Box>
              <Text>
                Remove any copyright, trademark or other proprietary rights
                notices contained in or on the Services or reformat or frame any
                portion of any web pages that are part of the Services;
              </Text>
              <Box margin={4}></Box>
              <Text>
                Impersonate others or falsely state or otherwise misrepresent
                your affiliation with any person, group or entity (including by
                “spoofing,” “phishing,” manipulating headers or other
                identifiers) including falsely implying that you are affiliated
                with or endorsed by Bespoke or any other third party, or access
                the Services via another user’s account without their
                permission;
              </Text>
              <Box margin={4}></Box>
              <Text>
                Email purchased, rented, borrowed, third-party or any other
                lists that have not consented to receive communications,
                promotions or advertisements from your business;
              </Text>
              <Box margin={4}></Box>
              <Text>
                Harvest or otherwise collect information about others without
                their consent;
              </Text>
              <Box margin={4}></Box>
              <Text>
                Interfere with other users’ enjoyment of the Services;
              </Text>
              <Box margin={4}></Box>
              <Text>
                Harm minors or interacts with or target people under the age of
                thirteen;
              </Text>
              <Box margin={4}></Box>
              <Text>
                Disable, avoid, or circumvent, damage or otherwise interfere
                with any security or access-related features or restrictions of
                the Services, features that prevent or restrict the use or
                copying of content from the Services, or features that enforce
                limitations on the use of the Services;
              </Text>
              <Box margin={4}></Box>
              <Text>
                Overwhelm or attempt to overwhelm our infrastructure by imposing
                an unreasonably large load on the Services that consume
                extraordinary resources, such as by: (i) using “robots,”
                “spiders,” “offline readers” or other automated systems to send
                more request messages to our servers than a person could
                reasonably send in the same period of time using a normal
                browser; or (ii) going far beyond the use parameters for the
                Services;
              </Text>
              <Box margin={4}></Box>
              <Text>
                Use meta tags or any other “hidden text” including Bespoke’s or
                our suppliers’ product names or trademarks;
              </Text>

              <Box margin={4}></Box>
              <Text>
                Use the Services in violation of applicable industry standards,
                including all applicable guidelines published by the CTIA and
                the Mobile Marketing Association;
              </Text>
              <Box margin={4}></Box>
              <Text>
                Disparage Bespoke or our partners, vendors, or affiliates; or
              </Text>
              <Box margin={4}></Box>
              <Text>
                Authorize, permit, enable, induce or encourage any third party
                to do any of the above.
              </Text>
            </Box>
          </Box>
          <Box marginTop={8} marginBottom={8}>
            <Heading size="400">PROHIBITED CONTENT</Heading>
            <Box marginTop={4}>
              <Text size="300">
                You may not use the Services to solicit, display, store,
                process, send or transmit:
              </Text>
              <Box margin={4}></Box>
              <Text>
                <li>
                  Content that promotes, condones, encourages or facilitates
                  hate, violence or discrimination against people based on race,
                  ethnicity, color, national origin, religion, age, gender,
                  gender identity, sexual orientation, disability, medical
                  condition, veteran status or any other characteristic;
                </li>
              </Text>
              <Box margin={4}></Box>
              <Text>
                <li>
                  Obscene, indecent, defamatory, libelous, deceptive,
                  fraudulent, pornographic, harmful to minors, threatening,
                  excessively profane or otherwise objectionable material;
                </li>
              </Text>
              <Box margin={4}></Box>

              <Text>
                <li>
                  Content that violates, encourages or furthers conduct that
                  would violate any applicable laws;
                </li>
              </Text>
              <Box margin={4}></Box>

              <Text>
                <li>
                  Content that infringes or misappropriates intellectual
                  property rights, or otherwise violates a third party’s rights;
                </li>
              </Text>
              <Box margin={4}></Box>
              <Text>
                <li>
                  Any of the following types of data or information: (a) any
                  information defined under Regulation (EU) 2016/679 (EU GDPR)
                  or the United Kingdom General Data Protection Regulation as a
                  “special category”; (b) medical records or health information,
                  including Protected Health Information as defined in the
                  Health Insurance Portability and Accountability Act; (c) any
                  non-public government identification numbers or financial
                  account information such as (i) Social Security number or
                  local equivalents, passport numbers, driver’s license number
                  or similar identifiers or (ii) financial account information
                  including credit or debit card number; and (d) information
                  related to children under the age of 13 (or in the EEA, under
                  16);
                </li>
              </Text>
              <Box margin={4}></Box>
              <Text>
                <li>
                  Spam or commercial electronic messages in violation of the
                  CAN-SPAM Act, Canada’s Anti-Spam Legislation, the General Data
                  Protection Regulation or any other applicable law or
                  regulation; or 16);
                </li>
              </Text>
              <Box margin={4}></Box>
              <Text>
                <li>
                  SMS, MMS, or other text messages or push notifications that
                  violate the Telephone Consumer Protection Act or any other
                  applicable telemarketing or telephone consumer protection law
                  or regulation.
                </li>
              </Text>
              <Box margin={4}></Box>
            </Box>
          </Box>
        </Box>
      </BigContainer>
      <Footer />
    </>
  );
};
export default Rp;
