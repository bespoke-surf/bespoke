import { redirect } from "@remix-run/node";
import { Box, Flex, Heading, Link, Text } from "gestalt";
import React from "react";
import BigContainer from "../../components/BigContainer";
import Footer2 from "../../components/Footer/Footer2";
import UnauthMobileNav2 from "../../components/MobileNav/UnauthMobileNav2";
import UnauthNav2 from "../../components/Navigation/UnauthNav2";

export async function loader() {
  if (ENV.OPEN_SOURCE === "true") {
    return redirect("/");
  }
  return {};
}

const Tos: React.FC<unknown> = () => {
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
          <Heading>Terms of Service</Heading>
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
            <Heading size="400">AGREEMENT TO TERMS</Heading>

            <Box marginTop={8} marginBottom={8}>
              <Text size="300">
                These Terms of Use constitute a legally binding agreement made
                between you, whether personally or on behalf of an entity
                (“you”) and Cartegan Software Private Limited ("Company", “we”,
                “us”, or “our”) doing business as Bespoke("Bespoke", "we", "us",
                "our") concerning your access to and use of
                the [https://bespoke.surf](https://bespoke.surf/) website as
                well as any other media form, media channel, mobile website or
                mobile application related, linked, or otherwise connected
                thereto (collectively, the “Site”). You agree that by accessing
                the Site, you have read, understood, and agreed to be bound by
                all of these Terms of Use. IF YOU DO NOT AGREE WITH ALL OF THESE
                TERMS OF USE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE
                SITE AND YOU MUST DISCONTINUE USE IMMEDIATELY. Supplemental
                terms and conditions or documents that may be posted on the Site
                from time to time are hereby expressly incorporated herein by
                reference. We reserve the right, in our sole discretion, to make
                changes or modifications to these Terms of Use at any time and
                for any reason. We will alert you about any changes by updating
                the “Last updated” date of these Terms of Use, and you waive any
                right to receive specific notice of each such change. It is your
                responsibility to periodically review these Terms of Use to stay
                informed of updates. You will be subject to, and will be deemed
                to have been made aware of and to have accepted, the changes in
                any revised Terms of Use by your continued use of the Site after
                the date such revised Terms of Use are posted. The information
                provided on the Site is not intended for distribution to or use
                by any person or entity in any jurisdiction or country where
                such distribution or use would be contrary to law or regulation
                or which would subject us to any registration requirement within
                such jurisdiction or country. Accordingly, those persons who
                choose to access the Site from other locations do so on their
                own initiative and are solely responsible for compliance with
                local laws, if and to the extent local laws are applicable. The
                Site is intended for users who are at least 18 years old.
                Persons under the age of 18 are not permitted to use or register
                for the Site.
              </Text>
            </Box>
            <Heading size="400">GENERAL TERMS</Heading>

            <Box marginTop={8} marginBottom={8}>
              <Text size="300">
                1. The headings of each section in these Terms are only for the
                purpose of organizing the various provisions under these Terms
                in an orderly manner and shall not be used by either Party to
                interpret the provisions contained herein in any manner.
                Further, it is specifically agreed to by the Parties that the
                headings shall have no legal or contractual value.
              </Text>

              <Box marginTop={4}></Box>
              <Text size="300">
                2. The use of this Platform by the you is solely governed by
                these Terms as well as the Privacy Policy, and any modifications
                or amendments made thereto by the Company, from time to time, at
                its sole discretion. If you continue to access and use this
                Platform, you are agreeing to comply with and be bound by the
                following Terms and Conditions of Use and Our Privacy Policy.
                You expressly agrees and acknowledges that these Terms and
                Policy are co-terminus in nature and that expiry/termination of
                either one will lead to the termination of the other.
              </Text>

              <Box marginTop={4}></Box>
              <Text size="300">
                3. You unequivocally agrees that these Terms and the
                aforementioned Policy constitute a legally binding agreement
                between the you and the Company, and that you shall be subject
                to the rules, guidelines, policies, terms, and conditions
                applicable to any service that is provided by the Platform, and
                that the same shall be deemed to be incorporated into these
                Terms, and shall be treated as part and parcel of the same. You
                acknowledges and agrees that no signature or express act is
                required to make these Terms and the Policy binding on you and
                that you act of visiting any part of the Platform constitutes
                you the full and final acceptance of these Terms and the
                aforementioned Policy.
              </Text>

              <Box marginTop={4}></Box>
              <Text size="300">
                4. The Company reserves the sole and exclusive right to amend or
                modify these Terms without any prior permission or intimation to
                you, and the you expressly agrees that any such amendments or
                modifications shall come into effect immediately. If you do not
                adhere to the changes, they must stop using the Services at
                once. Their continuous use of the Services will signify your
                acceptance of the changed terms.
              </Text>
            </Box>
            <Heading size="400">INTELLECTUAL PROPERTY RIGHTS</Heading>

            <Box marginTop={8} marginBottom={8}>
              <Text size="300">
                Unless otherwise indicated, the Site is our proprietary property
                and all source code, databases, functionality, software, website
                designs, audio, video, text, photographs, and graphics on the
                Site (collectively, the “Content”) and the trademarks, service
                marks, and logos contained therein (the “Marks”) are owned or
                controlled by us or licensed to us, and are protected by
                copyright and trademark laws and various other intellectual
                property rights and unfair competition laws of the United
                States, international copyright laws, and international
                conventions. The Content and the Marks are provided on the Site
                “AS IS” for your information and personal use only. Except as
                expressly provided in these Terms of Use, no part of the Site
                and no Content or Marks may be copied, reproduced, aggregated,
                republished, uploaded, posted, publicly displayed, encoded,
                translated, transmitted, distributed, sold, licensed, or
                otherwise exploited for any commercial purpose whatsoever,
                without our express prior written permission. Provided that you
                are eligible to use the Site, you are granted a limited license
                to access and use the Site and to download or print a copy of
                any portion of the Content to which you have properly gained
                access solely for your personal, non-commercial use. We reserve
                all rights not expressly granted to you in and to the Site, the
                Content and the Marks.
              </Text>
            </Box>
            <Heading size="400">USER REPRESENTATIONS</Heading>

            <Box marginTop={8} marginBottom={8}>
              <Text size="300">
                By using the Site, you represent and warrant that: (1) all
                registration information you submit will be true, accurate,
                current, and complete; (2) you will maintain the accuracy of
                such information and promptly update such registration
                information as necessary; (3) you have the legal capacity and
                you agree to comply with these Terms of Use; (4) you are not a
                minor in the jurisdiction in which you reside; (5) you will not
                access the Site through automated or non-human means, whether
                through a bot, script or otherwise; (6) you will not use the
                Site for any illegal or unauthorized purpose; and (7) your use
                of the Site will not violate any applicable law or regulation.
                If you provide any information that is untrue, inaccurate, not
                current, or incomplete, we have the right to suspend or
                terminate your account and refuse any and all current or future
                use of the Site (or any portion thereof).
              </Text>
            </Box>
            <Heading size="400">USER REGISTRATION</Heading>

            <Box marginTop={8} marginBottom={8}>
              <Text size="300">
                You may be required to register with the Site. You agree to keep
                your password confidential and will be responsible for all use
                of your account and password. We reserve the right to remove,
                reclaim, or change a username you select if we determine, in our
                sole discretion, that such username is inappropriate, obscene,
                or otherwise objectionable.
              </Text>
            </Box>

            <Heading size="400">SERVICE OVERVIEW</Heading>
            <Box marginTop={8} marginBottom={8}>
              <Text size="300">
                Customer shall be responsible for setting up and configuring the
                Services, including without limitation any provisioning of
                access to the Services to its Authorized Users. Customer shall
                be responsible for obtaining and maintaining, at Customer’s
                expense, all of the necessary telecommunications, computer
                hardware, software, services and Internet connectivity required
                by Customer or any Authorized User to access the Services from
                the Internet. In the event that Bespoke assists or advises
                Customer with any Services setup, configuration or support, in
                no event shall such assistance or advice be construed as legal
                advice. Customer is solely responsible for protecting and
                safeguarding Customer’s account and passwords and/or keys or
                other access protocols that have been provided to Customer or
                that are generated in connection with Customer’s use of the
                Services. Customer shall use commercially reasonable efforts to
                prevent unauthorized access to or use of its account and the
                Services. Customer is solely and fully responsible for all
                activities, including accrued charges, that occur in connection
                with its account and its use of the Services. In the event
                Customer believes Customer’s account or the Services have been
                compromised, including any unauthorized use or access of the
                Services or any other known or suspected breach of security,
                Customer shall immediately notify Bespoke by email to
                support@bespoke.surf, but in no event more than twenty-four (24)
                hours following discovery of such breach.
              </Text>
            </Box>

            <Heading size="400">ELIGIBILITY</Heading>

            <Box marginTop={8} marginBottom={8}>
              <Text size="300">
                1. The User has to be of sound mind and must be capable of
                making informed decisions after referring to the guides on the
                Website and Mobile Application.
              </Text>

              <Box marginTop={4}></Box>
              <Text size="300">
                2. You hereby represent and warrant that you are at least
                eighteen (18) years of age or above and are fully able and
                competent to understand and agree the terms, conditions,
                obligations, affirmations, representations, and warranties set
                forth in these Terms.
              </Text>
            </Box>

            <Heading size="400">PAYMENT</Heading>
            <Box marginTop={8} marginBottom={8}>
              <Text size="300">
                Bespoke will charge Customer the Fees for the Services in
                advance for each billing period on or after the first day of
                such billing period. All Fees for Services are due and payable
                in US Dollars and are non-refundable. If Customer is paying by
                credit card or eCheck, (a) Customer hereby irrevocably
                authorizes Bespoke to charge the credit card or other payment
                method provided for any such amounts when due, (b) amounts due
                will be automatically charged, (c) if Customer’s credit card is
                declined, Bespoke will attempt to reach out to Customer for a
                new payment method, and (d) if Customer’s credit card expires,
                Customer hereby gives Bespoke permission to submit the credit
                card charge with a later expiration date. If Bespoke fails to
                resolve an issue with Customer resulting from a credit card
                decline or expiration, Bespoke may terminate the account due to
                non-payment. Customer agrees to notify Bespoke of all billing
                disputes within fourteen (14) days of delivery of the billing
                statement or invoice, and disputes not made within that time are
                waived. Late payments, including those resulting from credit
                card declines, will accrue interest at a rate of one and
                one-half percent (1.5%) per month, or the highest rate allowed
                by applicable law, whichever is lower. If Bespoke must initiate
                a collections process to recover Fees due and payable hereunder,
                then Bespoke shall be entitled to recover from Customer all
                costs associated with such collections efforts, including but
                not limited to reasonable attorneys’ fees. In the event Bespoke
                delivers to Customer an invoice for any Fees or interest
                payments owed hereunder, such invoiced amounts shall be due upon
                receipt, unless otherwise set forth in the Service Order.
              </Text>
              <Box marginTop={4} />
            </Box>
            <Heading size="400">USER GENERATED CONTRIBUTIONS</Heading>
            <Box marginTop={8} marginBottom={8}>
              <Box marginTop={4} />
              <Text size="300">
                The Site may invite you to chat, contribute to, or participate
                in blogs, message boards, online forums, and other
                functionality, and may provide you with the opportunity to
                create, submit, post, display, trasmit, perform, publish,
                distribute, or broadcast content and materials to us or on the
                Site, including but not limited to text, writings, video, audio,
                photographs, graphics, comments, suggestions, or personal
                information or other material (collectively, "Contributions").
                Contributions may be viewable by other users of the Site and the
                Marketplace Offerings and through third-party websites. As such,
                any Contributions you transmiit may be treated as
                non-confidential and non-proprietary. When you create or make
                available any Contributions, you thereby represent and warrant
                that:
              </Text>

              <Box marginTop={4} />
              <Text size="300">
                1.  The creation, distribution, transmission, public display, or
                performance, and the accessing, downloading, or copying of your
                Contributions do not and will not infringe the proprietary
                rights, including but not limited to the copyright, patent,
                trademark, trade secret, or moral rights of any third party.2.
                 You are the creator and owner of or have the necessary
                licenses, rights, consents, releases, and permissions to use and
                to authorize us, the Site, and other users of the Site to use
                your Contributions in any manner contemplated by the Site and
                these Terms of Use.3.  You have the written consent, release,
                and/or permission of each and every identifiable individual
                person in your Contributions to use the name or likeness of each
                and every such identifiable individual person to enable
                inclusion and use of your Contributions in any manner
                contemplated by the Site and these Terms of Use.4.  Your
                Contributions are not false, inaccurate, or misleading.5.  Your
                Contributions are not unsolicited or unauthorized advertising,
                promotional materials, pyramid schemes, chain letters, spam,
                mass mailings, or other forms of solicitation.6.  Your
                Contributions are not obscene, lewd, lascivious, filthy,
                violent, harassing, libelous, slanderous, or otherwise
                objectionable (as determined by us).7.  Your Contributions do
                not ridicule, mock, disparage, intimidate, or abuse anyone.8.
                 Your Contributions are not used to harass or threaten (in the
                legal sense of those terms) any other person and to promote
                violence against a specific person or class of people.9.  Your
                Contributions do not violate any applicable law, regulation, or
                rule.10.  Your Contributions do not violate the privacy or
                publicity rights of any third party.11.  Your Contributions do
                not contain any material that solicits personal information from
                anyone under the age of 18 or exploits people under the age of
                18 in a sexual or violent manner.12.  Your Contributions do not
                violate any applicable law concerning child pornography, or
                otherwise intended to protect the health or well-being of
                minors;13.  Your Contributions do not include any offensive
                comments that are connected to race, national origin, gender,
                sexual preference, or physical handicap.14.  Your Contributions
                do not otherwise violate, or link to material that violates, any
                provision of these Terms of Use, or any applicable law or
                regulation. Any use of the Site or the Marketplace Offerings in
                violation of the foregoing violates these Terms of Use and may
                result in, among other things, termination or suspension of your
                rights to use the Site and the Marketplace Offerings.
              </Text>
            </Box>
          </Box>

          <Heading size="400">CONTRIBUTION LICENSE</Heading>
          <Box marginTop={8} marginBottom={8}>
            <Box marginTop={4} />
            <Text size="300">
              By posting your Contributions to any part of the Site or making
              Contributions accessible to the Site by linking your account from
              the Site to any of your social networking accounts, you
              automatically grant, and you represent and warrant that you have
              the right to grant, to us an unrestricted, unlimited, irrevocable,
              perpetual, non-exclusive, transferable, royalty-free, fully-paid,
              worldwide right, and license to host, use, copy, reproduce,
              disclose, sell, resell, publish, broadcast, retitle, archive,
              store, cache, publicly perform, publicly display, reformat,
              translate, transmit, excerpt (in whole or in part), and distribute
              such Contributions (including, without limitation, your image and
              voice) for any purpose, commercial, advertising, or otherwise, and
              to prepare derivative works of, or incorporate into other works,
              such Contributions, and grant and authorize sublicenses of the
              foregoing. The use and distribution may occur in any media formats
              and through any media channels.
            </Text>
            <Box marginTop={4} />
            <Text size="300">
              This license will apply to any form, media, or technology now
              known or hereafter developed, and includes our use of your name,
              company name, and franchise name, as applicable, and any of the
              trademarks, service marks, trade names, logos, and personal and
              commercial images you provide. You waive all moral rights in your
              Contributions, and you warrant that moral rights have not
              otherwise been asserted in your Contributions.
            </Text>
            <Box marginTop={4} />
            <Text size="300">
              We do not assert any ownership over your Contributions. You retain
              full ownership of all of your Contributions and any intellectual
              property rights or other proprietary rights associated with your
              Contributions. We are not liable for any statements or
              representations in your Contributions provided by you in any area
              on the Site. You are solely responsible for your Contributions to
              the Site and you expressly agree to exonerate us from any and all
              responsibility and to refrain from any legal action against us
              regarding your Contributions.
            </Text>
            <Box marginTop={4} />
            <Text size="300">
              We have the right, in our sole and absolute discretion, (1) to
              edit, redact, or otherwise change any Contributions; (2) to
              re-categorize any Contributions to place them in more appropriate
              locations on the Site; and (3) to pre-screen or delete any
              Contributions at any time and for any reason, without notice. We
              have no obligation to monitor your Contributions.
            </Text>
          </Box>
          <Heading size="400">MOBILE APPLICATION LICENSE</Heading>
          <Heading size="400">Use License</Heading>
          <Box marginTop={8} marginBottom={8}>
            <Box marginTop={4} />
            <Text size="300">
              If you access the Marketplace Offerings via a mobile application,
              then we grant you a revocable, non-exclusive, non-transferable,
              limited right to install and use the mobile application on
              wireless electronic devices owned or controlled by you, and to
              access and use the mobile application on such devices strictly in
              accordance with the terms and conditions of this mobile
              application license contained in these Terms of Use. You shall
              not: (1) decompile, reverse engineer, disassemble, attempt to
              derive the source code of, or decrypt the application; (2) make
              any modification, adaptation, improvement, enhancement,
              translation, or derivative work from the application; (3) violate
              any applicable laws, rules, or regulations in connection with your
              access or use of the application; (4) remove, alter, or obscure
              any proprietary notice (including any notice of copyright or
              trademark) posted by us or the licensors of the application; (5)
              use the application for any revenue generating endeavor,
              commercial enterprise, or other purpose for which it is not
              designed or intended; (6) make the application available over a
              network or other environment permitting access or use by multiple
              devices or users at the same time; (7) use the application for
              creating a product, service, or software that is, directly or
              indirectly, competitive with or in any way a substitute for the
              application; (8) use the application to send automated queries to
              any website or to send any unsolicited commercial e-mail; or (9)
              use any proprietary information or any of our interfaces or our
              other intellectual property in the design, development,
              manufacture, licensing, or distribution of any applications,
              accessories, or devices for use with the application.
            </Text>
          </Box>
          <Heading size="400">Apple and Android Devices</Heading>
          <Box marginTop={8} marginBottom={8}>
            <Box marginTop={4} />
            <Text size="300">
              The following terms apply when you use a mobile application
              obtained from either the Apple Store or Google Play (each an “App
              Distributor”) to access the Marketplace Offerings: (1) the license
              granted to you for our mobile application is limited to a
              non-transferable license to use the application on a device that
              utilizes the Apple iOS or Android operating systems, as
              applicable, and in accordance with the usage rules set forth in
              the applicable App Distributor’s terms of service; (2) we are
              responsible for providing any maintenance and support services
              with respect to the mobile application as specified in the terms
              and conditions of this mobile application license contained in
              these Terms of Use or as otherwise required under applicable law,
              and you acknowledge that each App Distributor has no obligation
              whatsoever to furnish any maintenance and support services with
              respect to the mobile application; (3) in the event of any failure
              of the mobile application to conform to any applicable warranty,
              you may notify the applicable App Distributor, and the App
              Distributor, in accordance with its terms and policies, may refund
              the purchase price, if any, paid for the mobile application, and
              to the maximum extent permitted by applicable law, the App
              Distributor will have no other warranty obligation whatsoever with
              respect to the mobile application; (4) you represent and warrant
              that (i) you are not located in a country that is subject to a
              U.S. government embargo, or that has been designated by the U.S.
              government as a “terrorist supporting” country and (ii) you are
              not listed on any U.S. government list of prohibited or restricted
              parties; (5) you must comply with applicable third-party terms of
              agreement when using the mobile application, e.g., if you have a
              VoIP application, then you must not be in violation of their
              wireless data service agreement when using the mobile application;
              and (6) you acknowledge and agree that the App Distributors are
              third-party beneficiaries of the terms and conditions in this
              mobile application license contained in these Terms of Use, and
              that each App Distributor will have the right (and will be deemed
              to have accepted the right) to enforce the terms and conditions in
              this mobile application license contained in these Terms of Use
              against you as a third-party beneficiary thereof.
            </Text>
          </Box>
          <Heading size="400">SOCIAL MEDIA</Heading>
          <Box marginTop={8} marginBottom={8}>
            <Box marginTop={4} />
            <Text size="300">
              As part of the functionality of the Site, you may link your
              account with online accounts you have with third-party service
              providers (each such account, a “Third-Party Account”) by either:
              (1) providing your Third-Party Account login information through
              the Site; or (2) allowing us to access your Third-Party Account,
              as is permitted under the applicable terms and conditions that
              govern your use of each Third-Party Account. You represent and
              warrant that you are entitled to disclose your Third-Party Account
              login information to us and/or grant us access to
              your Third-Party Account, without breach by you of any of the
              terms and conditions that govern your use of the
              applicable Third-Party Account, and without obligating us to pay
              any fees or making us subject to any usage limitations imposed by
              the third-party service provider of the Third-Party Account. By
              granting us access to any Third-Party Accounts, you understand
              that (1) we may access, make available, and store (if applicable)
              any content that you have provided to and stored in
              your Third-Party Account (the “Social Network Content”) so that it
              is available on and through the Site via your account, including
              without limitation any friend lists and (2) we may submit to and
              receive from your Third-Party Account additional information to
              the extent you are notified when you link your account with
              the Third-Party Account. Depending on the Third-Party Accounts you
              choose and subject to the privacy settings that you have set in
              such Third-Party Accounts, personally identifiable information
              that you post to your Third-Party Accounts may be available on and
              through your account on the Site. Please note that if
              a Third-Party Account or associated service becomes unavailable or
              our access to such Third-Party Account is terminated by the
              third-party service provider, then Social Network Content may no
              longer be available on and through the Site. You will have the
              ability to disable the connection between your account on the Site
              and your Third-Party Accounts at any time. PLEASE NOTE THAT YOUR
              RELATIONSHIP WITH THE THIRD-PARTY SERVICE PROVIDERS ASSOCIATED
              WITH YOUR THIRD-PARTY ACCOUNTS IS GOVERNED SOLELY BY YOUR
              AGREEMENT(S) WITH SUCH THIRD-PARTY SERVICE PROVIDERS. We make no
              effort to review any Social Network Content for any purpose,
              including but not limited to, for accuracy, legality, or
              non-infringement, and we are not responsible for any Social
              Network Content. You acknowledge and agree that we may access your
              email address book associated with a Third-Party Account and your
              contacts list stored on your mobile device or tablet computer
              solely for purposes of identifying and informing you of those
              contacts who have also registered to use the Site. You can
              deactivate the connection between the Site and
              your Third-Party Account by contacting us using the contact
              information below or through your account settings (if
              applicable). We will attempt to delete any information stored on
              our servers that was obtained through such Third-Party Account,
              except the username and profile picture that become associated
              with your account.
            </Text>
          </Box>
          <Heading size="400">14. Continued Obligation.</Heading>

          <Box marginTop={8} marginBottom={8}>
            <Box marginTop={4} />
            <Text size="300">
              Even if you close your account or we terminate your Subscription,
              you will still be responsible for indemnifying us for breaches
              that took place while you used the Site and Services. Obligations
              you owed to us and other Site users, which by their nature are
              intended to survive closing or termination, will survive.
            </Text>
          </Box>
          <Heading size="400">SUBMISSIONS</Heading>

          <Box marginTop={8} marginBottom={8}>
            <Text size="300">
              You acknowledge and agree that any questions, comments,
              suggestions, ideas, feedback, or other information regarding the
              Site or the Marketplace Offerings ("Submissions") provided by you
              to us are non-confidential and shall become our sole property. We
              shall own exclusive rights, including all intellectual property
              rights, and shall be entitled to the unrestricted use and
              dissemination of these Submissions for any lawful purpose,
              commercial or otherwise, without acknowledgment or compensation to
              you. You hereby waive all moral rights to any such Submissions,
              and you hereby warrant that any such Submissions are original with
              you or that you have the right to submit such Submissions. You
              agree there shall be no recourse against us for any alleged or
              actual infringement or misappropriation of any proprietary right
              in your Submissions.
            </Text>
          </Box>
          <Heading size="400">THIRD-PARTY WEBSITES AND CONTENT</Heading>

          <Box marginTop={8} marginBottom={8}>
            <Text size="300">
              The Site may contain (or you may be sent via the Site or the
              Marketplace Offerings) links to other websites
              ("Third-Party Websites") as well as articles, photographs, text,
              graphics, pictures, designs, music, sound, video, information,
              applications, software, and other content or items belonging to or
              originating from third parties ("Third-Party Content").
              Such Third-Party Websites and Third-Party Content are not
              investigated, monitored, or checked for accuracy, appropriateness,
              or completeness by us, and we are not responsible for any Third
              Party Websites accessed through the Site or
              any Third-Party Content posted on, available through, or installed
              from the Site, including the content, accuracy, offensiveness,
              opinions, reliability, privacy practices, or other policies of or
              contained in the Third-Party Websites or the Third-Party Content.
              Inclusion of, linking to, or permitting the use or installation of
              any Third-Party Websites or any Third-PartyContent does not imply
              approval or endorsement thereof by us. If you decide to leave the
              Site and access the Third-Party Websites or to use or install
              any Third-Party Content, you do so at your own risk, and you
              should be aware these Terms of Use no longer govern. You should
              review the applicable terms and policies, including privacy and
              data gathering practices, of any website to which you navigate
              from the Site or relating to any applications you use or install
              from the Site. Any purchases you make through Third-Party Websites
              will be through other websites and from other companies, and we
              take no responsibility whatsoever in relation to such purchases
              which are exclusively between you and the applicable third party.
              You agree and acknowledge that we do not endorse the products or
              services offered on Third-Party Websites and you shall hold us
              harmless from any harm caused by your purchase of such products or
              services. Additionally, you shall hold us harmless from any losses
              sustained by you or harm caused to you relating to or resulting in
              any way from any Third-Party Content or any contact
              with Third-Party Websites.
            </Text>
          </Box>
          <Heading size="400">SITE MANAGEMENT</Heading>

          <Box marginTop={8} marginBottom={8}>
            <Text size="300">
              We reserve the right, but not the obligation, to: (1) monitor the
              Site for violations of these Terms of Use; (2) take appropriate
              legal action against anyone who, in our sole discretion, violates
              the law or these Terms of Use, including without limitation,
              reporting such user to law enforcement authorities; (3) in our
              sole discretion and without limitation, refuse, restrict access
              to, limit the availability of, or disable (to the extent
              technologically feasible) any of your Contributions or any portion
              thereof; (4) in our sole discretion and without limitation,
              notice, or liability, to remove from the Site or otherwise disable
              all files and content that are excessive in size or are in any way
              burdensome to our systems; and (5) otherwise manage the Site in a
              manner designed to protect our rights and property and to
              facilitate the proper functioning of the Site and the Marketplace
              Offerings.
            </Text>
          </Box>
          <Heading size="400">PRIVACY POLICY</Heading>
          <Box marginTop={8} marginBottom={8}>
            <Text size="300">
              We care about data privacy and security. Please review our{" "}
              <Link href="/privacy-policy">
                <Text underline>Privacy Policy</Text>
              </Link>
              . By using the Site or the Marketplace Offerings, you agree to be
              bound by our Privacy Policy, which is incorporated into these
              Terms of Use. Please be advised the Site and the Marketplace
              Offerings are hosted in India. If you access the Site or the
              Marketplace Offerings from any other region of the world with laws
              or other requirements governing personal data collection, use, or
              disclosure that differ from applicable laws in India, then through
              your continued use of the Site, you are transferring your data
              to India, and you expressly consent to have your data transferred
              to and processed
            </Text>
          </Box>
          <Heading size="400">TERM AND TERMINATION</Heading>
          <Box marginTop={8} marginBottom={8}>
            <Text size="300">
              These Terms of Use shall remain in full force and effect while you
              use the Site. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS
              OF USE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND
              WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SITE
              AND THE MARKETPLACE OFFERINGS (INCLUDING BLOCKING CERTAIN IP
              ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON,
              INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION,
              WARRANTY, OR COVENANT CONTAINED IN THESE TERMS OF USE OR OF ANY
              APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR
              PARTICIPATION IN THE SITE AND THE MARKETPLACE OFFERINGS OR
              DELETE YOUR ACCOUNT AND ANY CONTENT OR INFORMATION THAT YOU POSTED
              AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.
            </Text>
            <Box marginTop={4} />
            <Text size="300">
              If we terminate or suspend your account for any reason, you are
              prohibited from registering and creating a new account under your
              name, a fake or borrowed name, or the name of any third party,
              even if you may be acting on behalf of the third party. In
              addition to terminating or suspending your account, we reserve the
              right to take appropriate legal action, including without
              limitation pursuing civil, criminal, and injunctive redress.
            </Text>
          </Box>
          <Heading size="400">MODIFICATIONS AND INTERRUPTIONS</Heading>
          <Box marginTop={8} marginBottom={8}>
            <Text size="300">
              We reserve the right to change, modify, or remove the contents of
              the Site at any time or for any reason at our sole discretion
              without notice. However, we have no obligation to update any
              information on our Site. We also reserve the right to modify or
              discontinue all or part of the Marketplace Offerings without
              notice at any time. We will not be liable to you or any third
              party for any modification, price change, suspension, or
              discontinuance of the Site or the Marketplace Offerings.
            </Text>
            <Box marginTop={4} />
            <Text size="300">
              We cannot guarantee the Site and the Marketplace Offerings will be
              available at all times. We may experience hardware, software, or
              other problems or need to perform maintenance related to the Site,
              resulting in interruptions, delays, or errors. We reserve the
              right to change, revise, update, suspend, discontinue, or
              otherwise modify the Site or the Marketplace Offerings at any time
              or for any reason without notice to you. You agree that we have no
              liability whatsoever for any loss, damage, or inconvenience caused
              by your inability to access or use the Site or the Marketplace
              Offerings during any downtime or discontinuance of the Site or the
              Marketplace Offerings. Nothing in these Terms of Use will be
              construed to obligate us to maintain and support the Site or the
              Marketplace Offerings or to supply any corrections, updates, or
              releases in connection therewith.
            </Text>
          </Box>
          <Heading size="400">COMMUNICATION</Heading>
          <Box marginTop={8} marginBottom={8}>
            <Text size="300">
              By using this Services and Platforms, and providing his/her
              identity and contact information to the Company through the
              Platform, the User hereby agrees and consents to receive calls,
              e-mails or SMS from the Company or any of its representatives at
              any time.
            </Text>
            <Box marginTop={4} />
            <Text size="300">
              Users can report to the Company any grievances or suggestions that
              they have through e-mail, if they find any discrepancy with regard
              to the information generated on the Platform, the Company will
              take necessary action after an investigation. The response with
              resolution (if any issues found) shall be dependent on the time
              that is taken for investigation.
            </Text>
          </Box>
          <Heading size="400">
            USER OBLIGATIONS AND FORMAL UNDERTAKINGS AS TO CONDUCT
          </Heading>
          <Box marginTop={8} marginBottom={8}>
            <Text size="300">
              The User agrees and acknowledges that they are a restricted user
              of this Platform and that they:
            </Text>
            <Box marginTop={4} />
            <Text size="300">
              <li>
                Authorize the Platform to use, store or otherwise process
                certain personal information and all published Content, reviews
                and ratings, comments and feedback for personalization of
                Services, marketing, and promotional purposes and for
                optimization of Userrelated options and Services.
              </li>
            </Text>
            <Box marginTop={4} />
            <Text size="300">
              <li>
                Agree not to access (or attempt to access) the Platform and/or
                the materials or Services by any means other than through the
                interface provided by the Platform.
              </li>
            </Text>
            <Box marginTop={4} />
            <Text size="300">
              <li>
                Expressly agree and acknowledge that the Content displayed on
                the Platform is for purpose of reference only, under no
                circumstance shall the User construe the same as expert/
                professional advice. The User may, however, report any offensive
                or objectionable content, which the Company may then remove from
                the Platform, at its sole discretion.
              </li>
            </Text>
            <Box marginTop={4} />
            <Text size="300">
              <li>
                Expressly agrees to make good any losses suffered by the Company
                or platform which result as a consequence of any act committed
                by the User including but not limited to acts of fraud,
                misrepresentation of information provided on the Company as
                expert advice or posting slanderous or libelous content in the
                form of comments or feedback.
              </li>
            </Text>
            <Box marginTop={4} />
            <Text size="300">
              <li>
                Agrees that they are using the services of the Platform and
                accessing the platform at their own risk with their prudent
                judgment and the Company or Platform shall not be responsible
                for any resultant losses suffered.
              </li>
            </Text>
            <Box marginTop={4} />
            <Text size="300">
              <li>
                Agrees that the platform will be used by him solely for
                non-commercial use with the intent of gaining information about
                the featured services in the form of guides. No commercial
                endorsements will be made on the platform. This includes
                providing links to other platforms which may or may or may not
                be competitors of the Company. In the event of detection of
                commercial activity by a user, the Platform will have the right
                to bar him from posting further comments or content on the
                Platform.
              </li>
            </Text>
            <Box marginTop={4} />
            <Text size="300" weight="bold">
              Further:
            </Text>
            <Box marginTop={4} />
            <Text size="300">
              <li>
                The User hereby expressly authorizes the Company /Platform to
                disclose any and all information relating to the User in the
                possession of the Company /Platform to law enforcement or other
                government officials, as the Company may in its sole discretion,
                believe necessary or appropriate in connection with the
                investigation and/or resolution of possible crimes, especially
                those involve personal injury and theft/infringement of
                intellectual property. The User further understands that the
                Company /Platform might with to disclose any information
                (including the identity of persons providing information or
                materials on the Platform) as necessary to satisfy any judicial
                Order, law, regulation or valid governmental request.
              </li>
            </Text>
            <Box marginTop={4} />
            <Text size="300">
              <li>
                The User agrees to use the services provided by the Company, its
                affiliates, consultants and contracted companies, for lawful
                purposes only.
              </li>
            </Text>
            <Box marginTop={4} />
            <Text size="300">
              <li>
                The User agrees not to post any material on the Website and
                Mobile Application that is defamatory, offensive, obscene,
                indecent, abusive, or needlessly distressful, or advertising any
                goods or services. More specifically, the User agrees not to
                host, display, upload, update, publish, modify, transmit, or in
                any manner share any information that:
              </li>
            </Text>
            <Box marginTop={4} />
            <Text size="300">
              <li>
                belongs to another person and to which the User has no right to;
                is grossly harmful, harassing, blasphemous, defamatory, obscene,
                pornographic, pedophile, libelous, invasive of another's
                privacy, hateful, or racially, ethnically objectionable,
                disparaging, or otherwise unlawful in any manner whatever; but
                not limited to "indecent representation of women" within the
                meaning of the Indecent Representation of Women (Prohibition)
                Act, 1986;
              </li>
            </Text>
            <Box marginTop={4} />
            <Text size="300">
              <li>violates any law for the time being in force;</li>
            </Text>
            <Box marginTop={4} />
            <Text size="300">
              <li>deceives or misleads the other users</li>
            </Text>
          </Box>
          <Heading size="400">INTELLECTUAL PROPERTY RIGHTS</Heading>
          <Box marginTop={8} marginBottom={8}>
            <Text size="300">
              Unless expressly agreed to in writing, nothing contained herein
              shall give the User a right to use any of the Platform’s Content
              which includes but is not limited to trade names, trademarks,
              service marks, logos, domain names, information, questions,
              answers, solutions, reports, illustrations, photographs, write-ups
              save and other distinctive brand features according to the
              provisions of these Terms.
            </Text>
          </Box>
          <Heading size="400">FORCE MAJEURE</Heading>
          <Box marginTop={8} marginBottom={8}>
            <Text size="300">
              Neither the Company nor the Platform shall be liable for damages
              for any delay or failure to perform its obligations hereunder if
              such delay or failure is due to cause beyond its control or
              without its fault or negligence, due to Force Majeure events
              including but not limited to acts of war, acts of God, earthquake,
              riot, fire, festive activities sabotage, labour shortage or
              dispute, internet interruption, technical failure, breakage of sea
              cable, hacking, piracy, cheating, illegal or unauthorized.
            </Text>
          </Box>
          <Heading size="400">DISPUTE RESOLUTION AND JURISDICTION</Heading>
          <Box marginTop={8} marginBottom={4}>
            <Text size="300">
              It is expressly agreed to by the Parties hereto that the
              formation, interpretation, and performance of these Terms and any
              disputes arising therefrom will be resolved through a two-step
              Alternate Dispute Resolution (“ADR”) mechanism. It is further
              agreed to by the Parties that the contents of this Section shall
              survive even after the termination or expiry of the Terms and/or
              Policy.
            </Text>
          </Box>

          <Heading size="400">Mediation:</Heading>
          <Box marginTop={4} marginBottom={4}>
            <Text size="300">
              In case of any dispute between the parties, the Parties will
              attempt to resolve the same amicably amongst themselves, to the
              mutual satisfaction of all parties. In the event that the Parties
              are unable to reach such an amicable solution within thirty (30)
              days of one Party communicating the existence of a dispute to any
              other Party, the dispute will be resolved by arbitration, as
              detailed herein below;
            </Text>
          </Box>
          <Heading size="400">Arbitration:</Heading>
          <Box marginTop={4} marginBottom={8}>
            <Text size="300">
              In the event that the Parties are unable to amicably resolve a
              dispute by mediation, said dispute will be referred to arbitration
              by a sole arbitrator to be appointed by the Company, and the award
              passed by such sole arbitrator will be valid and binding on all
              parties. The Parties shall bear their own costs for the
              proceedings, although the sole arbitrator may, in his/her sole
              discretion, direct either Party to bear the entire cost of the
              proceedings. The arbitration shall be conducted in English, and
              the seat of Arbitration shall be the city of Kochi.
            </Text>
          </Box>
          <Heading size="400">CORRECTIONS</Heading>
          <Box marginTop={8} marginBottom={8}>
            <Text size="300">
              There may be information on the Site that contains typographical
              errors, inaccuracies, or omissions that may relate to the
              Marketplace Offerings, including descriptions, pricing,
              availability, and various other information. We reserve the right
              to correct any errors, inaccuracies, or omissions and to change or
              update the information on the Site at any time, without prior
              notice.
            </Text>
          </Box>
          <Heading size="400">DISCLAIMER</Heading>
          <Box marginTop={8} marginBottom={8}>
            <Text size="300">
              THE SITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE
              THAT YOUR USE OF THE SITE SERVICES WILL BE AT YOUR SOLE RISK. TO
              THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES,
              EXPRESS OR IMPLIED, IN CONNECTION WITH THE SITE AND YOUR USE
              THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
              NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT
              THE ACCURACY OR COMPLETENESS OF THE SITE’S CONTENT OR THE CONTENT
              OF ANY WEBSITES LINKED TO THIS SITE AND WE WILL ASSUME NO
              LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR
              INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR
              PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR
              ACCESS TO AND USE OF THE SITE, (3) ANY UNAUTHORIZED ACCESS TO OR
              USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION
              AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION
              OR CESSATION OF transmISSION TO OR FROM THE SITE, (5) ANY BUGS,
              VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE transmITTED TO OR
              THROUGH THE SITE BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR
              OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE
              OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED,
              transmITTED, OR OTHERWISE MADE AVAILABLE VIA THE SITE. WE DO NOT
              WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY
              PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH
              THE SITE, ANY HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE
              APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE
              WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING
              ANY TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF
              PRODUCTS OR SERVICES. AS WITH THE PURCHASE OF A PRODUCT OR SERVICE
              THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST
              JUDGMENT AND EXERCISE CAUTION WHERE APPROPRIATE.
            </Text>
            <Box marginTop={4} />
            <Text size="300">
              THE FIRM WILL NOT BE RESPONSIBLE FOR ANY DAMAGE SUFFERED BY
              VENDORS FROM USE OR PURCHASE OF THE PRODUCTS OR SERVICES ON THIS
              PLATFORM. THIS INCLUDES BUT IS NOT LIMITED TO, LOSS OF
              REVENUE/DATA RESULTING FROM DELAYS, NON-DELIVERIES, MISSED
              DELIVERIES, OR SERVICE INTERRUPTIONS AS MAY OCCUR BECAUSE OF ANY
              ACT/OMISSION OF PARTIES. THIS DISCLAIMER OF LIABILITY ALSO APPLIES
              TO ANY DAMAGES OR INJURY CAUSED BY ANY FAILURE OF PERFORMANCE,
              ERROR, OMISSION, INTERRUPTION, DELETION, DEFECT, DELAY IN
              OPERATION OR transmISSION, COMPUTER VIRUS, COMMUNICATION LINE
              FAILURE, THEFT OR DESTRUCTION OR UNAUTHORIZED ACCESS TO,
              ALTERATION OF, OR USE OF RECORD, WHETHER FOR BREACH OF CONTRACT,
              TORTUOUS BEHAVIOUR, NEGLIGENCE, OR UNDER ANY OTHER CAUSE OF
              ACTION.
            </Text>
            <Box marginTop={4} />
            <Text size="300">
              THE FIRM ALSO MAKES IT CLEAR THAT IT SHALL NOT BE HELD LIABLE FOR
              ANY DAMAGE/HURT/INCONVENIENCE CAUSED TO THE VENDOR THROUGH THE
              COURSE OF THE PROVISION OF SERVICES OR AS A RESULT OF THE VENDORS’
              ACTIONS. THE FIRM MAKES NO REPRESENTATIONS OR WARRANTIES AS TO THE
              CONDUCT OF THE VENDORS. THE FIRM TAKES NO RESPONSIBILITY FOR ANY
              CONTENT THAT VENDORS SEND OR RECEIVE FROM OTHER VENDORS OR
              THIRD-PARTY POSTS THROUGH THE WEBSITE OR PLATFORM. ANY MATERIAL
              DOWNLOADED OR OTHERWISE OBTAINED THROUGH USE OF THE SERVICE IS
              ACCESSED AT THE VENDORS OWN DISCRETION AND RISK.
            </Text>
            <Box marginTop={4} />
            <Text size="300">
              THE SERVICES ON THE PLATFORM ARE INTENDED TO BE SUBJECT TO
              AVAILABILITY, WITHOUT ANY PROMISES OR GUARANTEES ON THE SAME BY
              THE FIRM, AND WHILE CERTAIN INFORMATION AVAILABLE ON THE PLATFORM
              IS THE PROPERTY OF THE FIRM AND THE FIRM ENDEAVOURS TO KEEP THE
              SAID INFORMATION UPDATED AND ACCURATE, THE FIRM SHALL NOT MAKE NO
              REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED,
              ABOUT THE COMPLETENESS, ACCURACY, RELIABILITY, SUITABILITY OR
              AVAILABILITY WITH RESPECT TO THE PLATFORM OR THE INFORMATION,
              CUSTOMERS, SERVICES, OR RELATED GRAPHICS CONTAINED ON THE PLATFORM
              FOR ANY PURPOSE. ANY RELIANCE YOU PLACE ON SUCH INFORMATION IS
              THEREFORE STRICTLY AT YOUR OWN RISK.
            </Text>
            <Box marginTop={4} />
            <Text size="300">
              THE SERVICES ON THE PLATFORM ARE BASED ON THE INFORMATION THAT IS
              GIVEN BY THE USER AND THE CORRECTNESS OF AUTHENTICITY OF THE SAME
              IS ASSURED BY THE USERS, THE USERS CANNOT HOLD THE PLATFORM
              ACCOUNTABLE FOR THE MISTAKES CAUSED BY ANY ERROR IN THE
              INFORMATION.
            </Text>
            <Box marginTop={4} />
            <Text size="300">
              ANY AND OR ALL THE INTELLECTUAL PROPERTY ON THE FIRM PLATFORM MAY
              HAVE BEEN TRADEMARKED OR COPYRIGHTED BY THE FIRM AND OR ANY OTHER
              SUCH PERSON AND ANY USE, MISUSE OR MANIPULATIONS THAT MAY BE IN
              RELATION TO THE INTELLECTUAL PROPERTY SHALL BE THE RESPONSIBILITY
              OF THE VENDOR. HOWEVER, WHEN BROUGHT TO THE NOTICE OF THE FIRM,
              THERE SHALL BE IMMEDIATE LEGAL ACTION TAKEN.
            </Text>
            <Box marginTop={4} />
            <Text size="300">
              THE FIRM BEARS NO RESPONSIBILITY WHATSOEVER FOR ANY CONSEQUENCES
              ARISING FROM THE USE OF THE SAID SERVICES BY VENDORS. THE USE OF
              THE SERVICES IN THE PLATFORM IS THE SOLE RESPONSIBILITY OF THE
              VENDOR(OR LEGALLY AUTHORISED PERSON ON BEHALF OF THE VENDOR), AND
              IN CASE OF ANY NEGLIGENCE ON THE PART OF THE VENDOR IN ACTING ON
              THE SAME SHALL NOT BE CONSTRUED AS IMPOSING ANY LIABILITY, DIRECT
              OR INDIRECT, ON THE FIRM/PLATFORM.
            </Text>
            <Box marginTop={4} />
            <Text size="300">
              THE FIRM SHALL DISCLAIM ALL RESPONSIBILITY AND OWNS NO LIABILITY
              TO VENDORS FOR ANY OUTCOME (INCIDENTAL, DIRECT, INDIRECT OR
              OTHERWISE) FROM THE USE OF THE SERVICES. IN NO EVENT WILL THE FIRM
              BE LIABLE FOR ANY LOSS OR DAMAGE INCLUDING WITHOUT LIMITATION,
              INDIRECT OR CONSEQUENTIAL LOSS OR DAMAGE, OR ANY LOSS OR DAMAGE
              WHATSOEVER ARISING FROM LOSS OF DATA OR PROFITS ARISING OUT OF, OR
              IN CONNECTION WITH, THE USE OF THE PLATFORM.
            </Text>
            <Box marginTop={4} />
            <Text size="300">
              THROUGH THIS PLATFORM, YOU MAY ABLE TO LINK TO OTHER PLATFORMS
              WHICH ARE NOT UNDER THE CONTROL OF THE FIRM. WE HAVE NO CONTROL
              OVER NATURE, CONTENT AND AVAILABILITY OF THOSE SITES. THE
              INCLUSION OF ANY LINKS DOES NOT NECESSARILY IMPLY A RECOMMENDATION
              OR ENDORSE THE VIEWS EXPRESSED WITHIN THEM. EVERY EFFORT IS MADE
              TO KEEP THE PLATFORM UP AND RUNNING SMOOTHLY. HOWEVER, THE FIRM
              TAKES NO RESPONSIBILITY FOR, AND WILL NOT BE LIABLE FOR, THE
              PLATFORM BEING TEMPORARILY UNAVAILABLE DUE TO TECHNICAL ISSUES
              BEYOND OUR CONTROL.
            </Text>
            <Box marginTop={4} />
            <Text size="300">
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, WE WILL HAVE NO
              LIABILITY RELATED TO VENDOR CONTENT ARISING UNDER INTELLECTUAL
              PROPERTY RIGHTS, LIBEL, PRIVACY, PUBLICITY, OBSCENITY OR OTHER
              LAWS. WEBSITE ALSO DISCLAIMS ALL LIABILITY WITH RESPECT TO THE
              MISUSE, LOSS, MODIFICATION OR UNAVAILABILITY OF ANY VENDOR
              CONTENT.
            </Text>
            <Box marginTop={4} />
            <Text size="300">
              THE VENDOR UNDERSTANDS AND AGREES THAT ANY MATERIAL OR DATA
              DOWNLOADED OR OTHERWISE OBTAINED THROUGH THE PLATFORM IS DONE
              ENTIRELY AT HIS/HER OWN DISCRETION AND RISK AND HE/SHE WILL BE
              SOLELY RESPONSIBLE FOR ANY DAMAGE TO HIS/HER COMPUTER SYSTEMS OR
              LOSS OF DATA THAT RESULTS FROM THE DOWNLOAD OF SUCH MATERIAL OR
              DATA. WE ARE NOT RESPONSIBLE FOR ANY TYPOGRAPHICAL ERROR LEADING
              TO AN INVALID COUPON. PLATFORM ACCEPTS NO LIABILITY FOR ANY ERRORS
              OR OMISSIONS, WITH RESPECT TO ANY INFORMATION PROVIDED TO YOU
              WHETHER ON BEHALF OF ITSELF OR THIRD PARTIES.
            </Text>
            <Box marginTop={4} />
            <Text size="300">
              YOU AGREE THAT YOUR USE OF THE WEBSITE AND USE OF THE SERVICES
              GIVEN BY THE FIRM SHALL BE AT YOUR OWN RISK. TO THE FULLEST EXTENT
              PERMITTED BY LAW, AND CARTAGENA SOFTWARE PVT. LTD AND ITS
              OFFICERS, MANAGERS, MEMBERS, DIRECTORS, EMPLOYEES, SUCCESSORS,
              ASSIGNS, SUBSIDIARIES, AFFILIATES, SERVICE PROFESSIONALS,
              SUPPLIERS, AND AGENTS DISCLAIM ALL WARRANTIES, EXPRESS, IMPLIED,
              STATUTORY OR OTHERWISE, AND MAKE NO WARRANTIES, REPRESENTATIONS,
              OR GUARANTEES IN CONNECTION WITH THIS WEBSITE, THE SERVICES
              OFFERED ON OR THROUGH THIS WEBSITE, ANY DATA, MATERIALS, SUBMITTED
              CONTENT, RELATING TO THE QUALITY, SUITABILITY, TRUTH, ACCURACY OR
              COMPLETENESS OF ANY INFORMATION OR MATERIAL CONTAINED OR PRESENTED
              ON THIS WEBSITE, INCLUDING WITHOUT LIMITATION THE MATERIALS, DATA
              AND SUBMITTED CONTENT OF OTHER VENDORS OF THIS SITE OR OTHER THIRD
              PARTIES. UNLESS OTHERWISE EXPLICITLY STATED, TO THE MAXIMUM EXTENT
              PERMITTED BY APPLICABLE LAW, THIS WEBSITE, THE SERVICES OFFERED ON
              OR THROUGH THIS WEBSITE, DATA, MATERIALS, SUBMITTED CONTENT, AND
              ANY INFORMATION OR MATERIAL CONTAINED OR PRESENTED ON THIS WEBSITE
              IS PROVIDED TO YOU ON AN “AS IS”, “AS AVAILABLE” AND “WHERE-IS”
              BASIS WITH, NON-INFRINGEMENT OF THIRD-PARTY RIGHTS. FIRM DOES NOT
              PROVIDE ANY WARRANTIES AGAINST ERRORS, MISTAKES, OR INACCURACIES
              OF DATA, CONTENT, INFORMATION, MATERIALS, SUBSTANCE OF THE WEBSITE
              OR SUBMITTED CONTENT, ANY UNAUTHORIZED ACCESS TO OR USE OF OUR
              SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR
              FINANCIAL INFORMATION STORED THEREIN, ANY BUGS, VIRUSES, TROJAN
              HORSES, OR THE LIKE WHICH MAY BE transmITTED TO OR THROUGH THE
              WEBSITE BY ANY THIRD PARTY, ANY INTERRUPTION OR CESSATION OF
              transmISSION TO OR FROM THE WEBSITE, ANY DEFAMATORY, OFFENSIVE, OR
              ILLEGAL CONDUCT OF ANY THIRD PARTY OR SERVICE VENDOR OR SERVICE
              PROVIDER, OR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT
              OF THE USE OF ANY DATA, CONTENT, INFORMATION, MATERIALS, SUBSTANCE
              OF THE WEBSITE OR SUBMITTED CONTENT POSTED, EMAILED, transmITTED,
              OR OTHERWISE MADE AVAILABLE VIA THE WEBSITE. FIRM WILL NOT BE A
              PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY
              TRANSACTION BETWEEN YOU AND ANY PARTY, INCLUDING THIRD PARTY
              SERVICE PROFESSIONALS OF PRODUCTS OR SERVICES. AS WITH THE USE OF
              ANY PRODUCT OR SERVICE, AND THE PUBLISHING OR POSTING OF ANY
              MATERIAL THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE
              YOUR BEST JUDGMENT AND EXERCISE CAUTION WHERE APPROPRIATE.
            </Text>
          </Box>
          <Heading size="400">LIMITATIONS OF LIABILITY</Heading>
          <Box marginTop={8} marginBottom={8}>
            <Text size="300">
              IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE
              LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT,
              CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE
              DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR
              OTHER DAMAGES ARISING FROM YOUR USE OF THE SITE, EVEN IF WE HAVE
              BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </Text>
          </Box>
          <Heading size="400">INDEMNIFICATION</Heading>
          <Box marginTop={8} marginBottom={8}>
            <Text size="300">
              You agree to defend, indemnify, and hold us harmless, including
              our subsidiaries, affiliates, and all of our respective officers,
              agents, partners, and employees, from and against any loss,
              damage, liability, claim, or demand, including reasonable
              attorneys’ fees and expenses, made by any third party due to or
              arising out of: (1) your Contributions; (2) use of the Site; (3)
              breach of these Terms of Use; (4) any breach of your
              representations and warranties set forth in these Terms of Use;
              (5) your violation of the rights of a third party, including but
              not limited to intellectual property rights; or (6) any overt
              harmful act toward any other user of the Site with whom you
              connected via the Site. Notwithstanding the foregoing, we reserve
              the right, at your expense, to assume the exclusive defense and
              control of any matter for which you are required to indemnify us,
              and you agree to cooperate, at your expense, with our defense of
              such claims. We will use reasonable efforts to notify you of any
              such claim, action, or proceeding which is subject to this
              indemnification upon becoming aware of it.
            </Text>
          </Box>
          <Heading size="400">USER DATA</Heading>
          <Box marginTop={8} marginBottom={8}>
            <Text size="300">
              We will maintain certain data that you transmit to the Site for
              the purpose of managing the performance of the Site, as well as
              data relating to your use of the Site. Although we perform regular
              routine backups of data, you are solely responsible for all data
              that you transmit or that relates to any activity you have
              undertaken using the Site. You agree that we shall have no
              liability to you for any loss or corruption of any such data, and
              you hereby waive any right of action against us arising from any
              such loss or corruption of such data.
            </Text>
          </Box>
          <Heading size="400">MISCELLANEOUS PROVISIONS</Heading>
          <Box marginTop={8} marginBottom={8}>
            <Heading size="400">Entire Agreement:</Heading>
            <Box marginTop={4} marginBottom={4}>
              <Text size="300">
                These Terms, read with the Policy, form the complete and final
                contract between the User and the Company with respect to the
                subject matter hereof and supersedes all other communications,
                representations, and agreements (whether oral, written or
                otherwise) relating thereto.
              </Text>
            </Box>
            <Heading size="400">Waiver:</Heading>
            <Box marginTop={4} marginBottom={8}>
              <Text size="300">
                The failure of either Party at any time to require performance
                of any provision of these Terms shall in no manner affect such
                Party's right at a later time to enforce the same. No waiver by
                either party of any breach of these Terms, whether by conduct or
                otherwise, in any one or more instances, shall be deemed to be
                or construed as a further or continuing waiver of any such
                breach, or a waiver of any other breach of these Terms.
              </Text>
            </Box>
            <Heading size="400">Severability:</Heading>
            <Box marginTop={4} marginBottom={8}>
              <Text size="300">
                If any provision/clause of these Terms is held to be invalid,
                illegal or unenforceable by any court or authority of competent
                jurisdiction, the validity, legality, and enforceability of the
                remaining provisions/clauses of these Terms shall in no way be
                affected or impaired thereby, and each such provision/clause of
                these Terms shall be valid and enforceable to the fullest extent
                permitted by law. In such case, these Terms shall be reformed to
                the minimum extent necessary to correct any invalidity,
                illegality or unenforceability, while preserving to the maximum
                extent the original rights, intentions and commercial
                expectations of the Parties hereto, as expressed herein.
              </Text>
            </Box>
          </Box>
          <Heading size="400">MISCELLANEOUS</Heading>
          <Box marginTop={8} marginBottom={8}>
            <Text size="300">
              These Terms of Use and any policies or operating rules posted by
              us on the Site or in respect to the Site constitute the entire
              agreement and understanding between you and us. Our failure to
              exercise or enforce any right or provision of these Terms of Use
              shall not operate as a waiver of such right or provision. These
              Terms of Use operate to the fullest extent permissible by law. We
              may assign any or all of our rights and obligations to others at
              any time. We shall not be responsible or liable for any loss,
              damage, delay, or failure to act caused by any cause beyond our
              reasonable control. If any provision or part of a provision of
              these Terms of Use is determined to be unlawful, void, or
              unenforceable, that provision or part of the provision is deemed
              severable from these Terms of Use and does not affect the validity
              and enforceability of any remaining provisions. There is no joint
              venture, partnership, employment or agency relationship created
              between you and us as a result of these Terms of Use or use of the
              Site. You agree that these Terms of Use will not be construed
              against us by virtue of having drafted them. You hereby waive any
              and all defenses you may have based on the electronic form of
              these Terms of Use and the lack of signing by the parties hereto
              to execute these Terms of Use.
            </Text>
          </Box>
          <Heading size="400">CONTACT US</Heading>
          <Box marginTop={8} marginBottom={8}>
            <Text size="300">
              In order to resolve a complaint regarding the Site or to receive
              further information regarding use of the Site, please contact us
              at:
            </Text>
            <Box marginTop={3}></Box>
            <Text weight="bold">Cartegan Software Private Limited</Text>
            <Box marginTop={1}></Box>
            <Text weight="bold"> info@cartegan.com</Text>
          </Box>
        </Box>
      </BigContainer>
      <Footer2 />
    </>
  );
};

export default Tos;
