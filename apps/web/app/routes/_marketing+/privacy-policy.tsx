import { Box, Flex, Heading, Link, Text } from "gestalt";
import React from "react";
import BigContainer from "../../components/BigContainer";
import Footer2 from "../../components/Footer/Footer2";
import UnauthMobileNav2 from "../../components/MobileNav/UnauthMobileNav2";
import UnauthNav2 from "../../components/Navigation/UnauthNav2";

import { redirect } from "@remix-run/node";
import { getEnvVars } from "../../../env.server";
export async function loader() {
  if (getEnvVars().OPEN_SOURCE) {
    return redirect("/");
  }
  return {};
}

const Pp: React.FC<unknown> = () => {
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
          <Heading>Privacy Policy</Heading>
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
                Thank you for choosing to be part of our community at Cartegan
                Software Private Limited, doing business
                as Bespoke("**Bespoke**", "**we**", "**us**", "**our**"). We are
                committed to protecting your personal information and your right
                to privacy. If you have any questions or concerns about this
                privacy notice, or our practices with regards to your personal
                information, please contact us at info@cartegan.com. When
                you visit our
                website [https://bespoke.surf](https://bespoke.surf/) (the
                "**Website**"), use our mobile application, as the case may be
                (the "**App**") and more generally, use any of our services (the
                "**Services**", which include the Website and App), we
                appreciate that you are trusting us with your personal
                information. We take your privacy very seriously. In this
                privacy notice, we seek to explain to you in the clearest way
                possible what information we collect, how we use it and what
                rights you have in relation to it. We hope you take some time to
                read through it carefully, as it is important. If there are any
                terms in this privacy notice that you do not agree with, please
                discontinue use of our Services immediately. This privacy notice
                applies to all information collected through our Services
                (which, as described above, includes our Website and App), as
                well as, any related services, sales, marketing or events.
              </Text>
              <Box margin={4}></Box>
              <Text>
                Please read this privacy notice carefully as it will help you
                understand what we do with the information that we collect.
              </Text>
            </Box>
            <Box marginTop={3}>
              <Text>
                ANY CAPITALIZED WORDS USED HENCEFORTH SHALL HAVE THE MEANING
                ACCORDED TO THEM UNDER THIS AGREEMENT. FURTHER, ALL HEADING USED
                HEREIN ARE ONLY FOR THE PURPOSE OF ARRANGING THE VARIOUS
                PROVISIONS OF THE AGREEMENT IN ANY MANNER. NEITHER THE USER NOR
                THE CREATORS OF THIS PRIVACY POLICY MAY USE THE HEADING TO
                INTERPRET THE PROVISIONS CONTAINED WITHIN IT IN ANY MANNER.
              </Text>
            </Box>
            <Box marginTop={8}></Box>
            <Heading size="400">WHAT INFORMATION DO WE COLLECT?</Heading>
            <Box marginTop={8} />
            <Text weight="bold">Personal information you disclose to us</Text>
            <Box marginTop={4} marginBottom={8}>
              <Text size="300">
                We collect personal information that you voluntarily provide to
                us when you register on the Services, express an interest in
                obtaining information about us or our products and Services,
                when you participate in activities on the Services (such as by
                posting messages in our online forums or entering competitions,
                contests or giveaways) or otherwise when you contact us.
              </Text>

              <Box marginTop={4}></Box>
              <Text size="300">
                The personal information that we collect depends on the context
                of your interactions with us and the Services, the choices you
                make and the products and features you use. The personal
                information we collect may include the following:
              </Text>

              <Box marginTop={4}></Box>
              <Text size="300">
                Personal Information Provided by You. We collect names; phone
                numbers; email addresses; usernames; passwords; billing
                addresses; debit/credit card numbers; contact or authentication
                data; and other similar information.
              </Text>

              <Box marginTop={4}></Box>
              <Text size="300">
                Payment Data. We may collect data necessary to process your
                payment if you make purchases, such as your payment instrument
                number (such as a credit card number), and the security code
                associated with your payment instrument. All payment data is
                stored by Razorpay. You may find their privacy notice link(s)
                here: https://razorpay.com/privacy/.
              </Text>
              <Box marginTop={4}></Box>
              <Text size="300">
                Social Media Login Data. We may provide you with the option to
                register with us using your existing social media account
                details, like your Facebook, Twitter or other social media
                account. If you choose to register in this way, we will collect
                the information described in the section called "HOW DO WE
                HANDLE YOUR SOCIAL LOGINS" below.
              </Text>
              <Box marginTop={4}></Box>
              <Text size="300">
                All personal information that you provide to us must be true,
                complete and accurate, and you must notify us of any changes to
                such personal information.
              </Text>
            </Box>
            <Text weight="bold">Information automatically collected</Text>
            <Box marginTop={4}></Box>
            <Text size="300">
              We automatically collect certain information when you visit, use
              or navigate the Services. This information does not reveal your
              specific identity (like your name or contact information) but may
              include device and usage information, such as your IP address,
              browser and device characteristics, operating system, language
              preferences, referring URLs, device name, country, location,
              information about how and when you use our Services and other
              technical information. This information is primarily needed to
              maintain the security and operation of our Services, and for our
              internal analytics and reporting purposes.
            </Text>
            <Box marginTop={4}></Box>
            <Text size="300">
              Like many businesses, we also collect information through cookies
              and similar technologies.
            </Text>
            <Box marginTop={2} />
            <Text size="300">The information we collect includes:</Text>
            <Box marginTop={3} />
            <Text size="300">
              <li>
                Log and Usage Data. Log and usage data is service-related,
                diagnostic, usage and performance information our servers
                automatically collect when you access or use our Services and
                which we record in log files. Depending on how you interact with
                us, this log data may include your IP address, device
                information, browser type and settings and information about
                your activity in the Services (such as the date/time stamps
                associated with your usage, pages and files viewed, searches and
                other actions you take such as which features you use), device
                event information (such as system activity, error reports
                (sometimes called 'crash dumps') and hardware settings).
              </li>
            </Text>
            <Box marginTop={3} />
            <Text size="300">
              <li>
                Device Data. We collect device data such as information about
                your computer, phone, tablet or other device you use to access
                the Services. Depending on the device used, this device data may
                include information such as your IP address (or proxy server),
                device and application identification numbers, location, browser
                type, hardware model Internet service provider and/or mobile
                carrier, operating system and system configuration information.
              </li>
            </Text>
            <Box marginTop={3} />
            <Text size="300">
              <li>
                Location Data. We collect location data such as information
                about your device's location, which can be either precise or
                imprecise. How much information we collect depends on the type
                and settings of the device you use to access the Services. For
                example, we may use GPS and other technologies to collect
                geolocation data that tells us your current location (based on
                your IP address). You can opt out of allowing us to collect this
                information either by refusing access to the information or by
                disabling your Location setting on your device. Note however, if
                you choose to opt out, you may not be able to use certain
                aspects of the Services.
              </li>
            </Text>
            <Box marginTop={8} />
            <Text weight="bold">Information automatically collected</Text>
            <Box marginTop={2} />
            <Text size="300">The information we collect includes:</Text>
            <Box marginTop={3} />
            <Text size="300">
              <li>
                Geo-Location Information. We may request access or permission to
                and track location-based information from your mobile device,
                either continuously or while you are using our App, to provide
                certain location-based services. If you wish to change our
                access or permissions, you may do so in your device's settings.
              </li>
            </Text>
            <Box marginTop={3} />
            <Text size="300">
              <li>
                Mobile Device Access. We may request access or permission to
                certain features from your mobile device, including your mobile
                device's, and other features. If you wish to change our access
                or permissions, you may do so in your device's settings. Camera,
                microphone, contacts, sms Messages, storage
              </li>
            </Text>
            <Box marginTop={3} />
            <Text size="300">
              <li>
                Push Notifications. We may request to send you push
                notifications regarding your account or certain features of the
                App. If you wish to opt-out from receiving these types of
                communications, you may turn them off in your device's settings.
              </li>
              <Box marginTop={3} />
            </Text>
            <Text size="300">
              This information is primarily needed to maintain the security and
              operation of our App, for troubleshooting and for our internal
              analytics and reporting purposes.
            </Text>
            <Box marginTop={8} />
            <Heading size="400">HOW DO WE USE YOUR INFORMATION?</Heading>
            <Box marginTop={8} marginBottom={8}>
              <Text size="300">
                We use personal information collected via our Services for a
                variety of business purposes described below. We process your
                personal information for these purposes in reliance on our
                legitimate business interests, in order to enter into or perform
                a contract with you, with your consent, and/or for compliance
                with our legal obligations. We indicate the specific processing
                grounds we rely on next to each purpose listed below.
              </Text>
              <Box marginTop={8} />
              <Text weight="bold">
                We use the information we collect or receive:
              </Text>
              <Box marginTop={3} />
              <Text size="300">
                <li>
                  To facilitate account creation and logon process. If you
                  choose to link your account with us to a third-party account
                  (such as your Google or Facebook account), we use the
                  information you allowed us to collect from those third parties
                  to facilitate account creation and logon process for the
                  performance of the contract. See the section below headed "HOW
                  DO WE HANDLE YOUR SOCIAL LOGINS" for further information.
                </li>
              </Text>
              <Box marginTop={3} />
              <Text size="300">
                <li>
                  To post testimonials. We post testimonials on
                  our Services that may contain personal information. Prior to
                  posting a testimonial, we will obtain your consent to use your
                  name and the content of the testimonial. If you wish to
                  update, or delete your testimonial, please contact us at  and
                  be sure to include your name, testimonial location, and
                  contact information.
                </li>
              </Text>
              <Box marginTop={3} />
              <Text size="300">
                <li>
                  Request feedback. We may use your information to request
                  feedback and to contact you about your use of our Services.
                </li>
              </Text>
              <Box marginTop={3} />
              <Text size="300">
                <li>
                  To enable user-to-user communications. We may use your
                  information in order to enable user-to-user communications
                  with each user's consent.
                </li>
              </Text>
              <Box marginTop={3} />
              <Text size="300">
                <li>
                  To manage user accounts. We may use your information for the
                  purposes of managing our account and keeping it in working
                  order.
                </li>
              </Text>
            </Box>
            <Heading size="400">
              WILL YOUR INFORMATION BE SHARED WITH ANYONE?
            </Heading>
            <Box marginTop={8} marginBottom={8}>
              <Text size="300">
                We may process or share your data that we hold based on the
                following legal basis:
              </Text>
              <Box marginTop={3} />
              <Text size="300">
                <li>
                  We may process or share your data that we hold based on the
                  following legal basis:
                </li>
              </Text>
              <Box marginTop={3} />
              <Text size="300">
                <li>
                  Legitimate Interests: We may process your data when it is
                  reasonably necessary to achieve our legitimate business
                  interests.
                </li>
              </Text>
              <Box marginTop={3} />
              <Text size="300">
                <li>
                  Performance of a Contract: Where we have entered into a
                  contract with you, we may process your personal information to
                  fulfill the terms of our contract.
                </li>
              </Text>
              <Box marginTop={3} />
              <Text size="300">
                <li>
                  Legal Obligations: We may disclose your information where we
                  are legally required to do so in order to comply with
                  applicable law, governmental requests, a judicial proceeding,
                  court order, or legal process, such as in response to a court
                  order or a subpoena (including in response to public
                  authorities to meet national security or law enforcement
                  requirements).
                </li>
              </Text>
              <Box marginTop={3} />
              <Text size="300">
                <li>
                  Vital Interests: We may disclose your information where we
                  believe it is necessary to investigate, prevent, or take
                  action regarding potential violations of our policies,
                  suspected fraud, situations involving potential threats to the
                  safety of any person and illegal activities, or as evidence in
                  litigation in which we are involved.
                </li>
              </Text>
              <Box marginTop={3} />
              <Text size="300">
                We may process or share your data that we hold based on the
                following legal basis:
              </Text>
              <Box marginTop={3} />
              <Text size="300">
                <li>
                  Business Transfers. We may share or transfer your information
                  in connection with, or during negotiations of, any merger,
                  sale of company assets, financing, or acquisition of all or a
                  portion of our business to another company.
                </li>
              </Text>
              <Box marginTop={3} />
            </Box>
            <Heading size="400">
              DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
            </Heading>
            <Box marginTop={8} marginBottom={8}>
              <Text size="300">
                We may use cookies and similar tracking technologies (like web
                beacons and pixels) to access or store information. Specific
                information about how we use such technologies and how you can
                refuse certain cookies is set out in our Cookie Notice.
              </Text>
            </Box>
            <Heading size="400">DO WE USE GOOGLE MAPS PLATFORM APIS?</Heading>
            <Box marginTop={8} marginBottom={8}>
              <Text size="300">
                This Website or App uses Google Maps Platform APIs which are
                subject to Google’s Terms of Service. You may find the Google
                Maps Platform Terms of Service.
              </Text>
            </Box>
            <Heading size="400">HOW DO WE HANDLE YOUR SOCIAL LOGINS?</Heading>
            <Box marginTop={8} marginBottom={8}>
              <Text size="300">
                Our Services offers you the ability to register and login using
                your third-party social media account details (like your
                Facebook or Twitter logins). Where you choose to do this, we
                will receive certain profile information about you from your
                social media provider. The profile information we receive may
                vary depending on the social media provider concerned, but will
                often include your name, email address, friends list, profile
                picture as well as other information you choose to make public
                on such social media platform. We will use the information we
                receive only for the purposes that are described in this privacy
                notice or that are otherwise made clear to you on the
                relevant Services. Please note that we do not control, and are
                not responsible for, other uses of your personal information by
                your third-party social media provider. We recommend that you
                review their privacy notice to understand how they collect, use
                and share your personal information, and how you can set your
                privacy preferences on their sites and apps.
              </Text>
              <Box marginTop={4} />
            </Box>
            <Heading size="400">HOW LONG DO WE KEEP YOUR INFORMATION?</Heading>
            <Box marginTop={8} marginBottom={8}>
              <Text size="300">
                We will only keep your personal information for as long as it is
                necessary for the purposes set out in this privacy notice,
                unless a longer retention period is required or permitted by law
                (such as tax, accounting or other legal requirements). No
                purpose in this notice will require us keeping your personal
                information for longer than the period of time in which users
                have an account with us.
              </Text>

              <Box marginTop={4}></Box>
              <Text size="300">
                When we have no ongoing legitimate business need to process your
                personal information, we will either delete or anonymize such
                information, or, if this is not possible (for example, because
                your personal information has been stored in backup archives),
                then we will securely store your personal information and
                isolate it from any further processing until deletion is
                possible.
              </Text>
            </Box>
            <Heading size="400">HOW DO WE KEEP YOUR INFORMATION SAFE?</Heading>
            <Box marginTop={8} marginBottom={8}>
              <Text size="300">
                We have implemented appropriate technical and organizational
                security measures designed to protect the security of any
                personal information we process. However, despite our safeguards
                and efforts to secure your information, no electronic
                transmission over the Internet or information storage technology
                can be guaranteed to be 100% secure, so we cannot promise or
                guarantee that hackers, cybercriminals, or other unauthorized
                third parties will not be able to defeat our security, and
                improperly collect, access, steal, or modify your information.
                Although we will do our best to protect your personal
                information, transmission of personal information to and from
                our Services is at your own risk. You should only access
                the Services within a secure environment.
              </Text>
              <Box marginTop={4} />
            </Box>
            <Heading size="400">
              ACCESSING, REVIEWING AND CHANGING YOUR PROFILE
            </Heading>
            <Box marginTop={8} marginBottom={8}>
              <Text size="300">
                Following registration, you can review and change the
                information you submitted at the stage of registration, except
                Email ID and mobile number. An option for facilitating such
                change shall be present on the Platform and such change shall be
                facilitated by the User. If you change any information, we may
                or may not keep track of your old information. We will not
                retain in our files information you have requested to remove for
                certain circumstances, such as to resolve disputes, troubleshoot
                problems and enforce our terms and conditions. Such prior
                information shall be completely removed from our databases,
                including stored ‘back up’ systems. If you believe that any
                information, we are holding on you is incorrect or incomplete,
                or to remove your profile so that others cannot view it, the
                User needs to remediate, and promptly correct any such incorrect
                information.
              </Text>
            </Box>
          </Box>

          <Heading size="400">CONTROL OF YOUR PASSWORD</Heading>
          <Box marginTop={8} marginBottom={8}>
            <Text size="300">
              You are entirely responsible for maintaining the confidentiality
              of your password. It is important that you protect it against
              unauthorized access of your account and information by choosing
              your password carefully and keeping your password and computer
              secure by signing out after using our services. You agree not to
              use the account, username, email address or password of another
              Member at any time or to disclose your password to any third
              party. You are responsible for all actions taken with your login
              information and password, including fees. If you lose control of
              your password, you may lose substantial control over your
              personally identifiable information and may be subject to legally
              binding actions taken on your behalf. Therefore, if your password
              has been compromised for any reason, you should immediately change
              your password. You agree to notify us immediately if you suspect
              any consistent unauthorized use of your account or access to your
              password even after changing it.
            </Text>
          </Box>
          <Heading size="400">SECURITY</Heading>
          <Box marginTop={8} marginBottom={8}>
            <Text size="300">
              We treat data as an asset that must be protected against loss and
              unauthorized access. We employ many different security techniques
              to protect such data from unauthorized access by members inside
              and outside the Company. We follow generally accepted industry
              standards to protect the Personal Information submitted to us and
              information that we have accessed. However, as effective as
              encryption technology is, no security system is impenetrable. Our
              Companycannot guarantee the security of our database, nor can we
              guarantee that information you provide won’t be intercepted while
              being transmitted to the Companyover the Internet.
            </Text>
          </Box>
          <Heading size="400">SEVERABILITY</Heading>
          <Box marginTop={8} marginBottom={8}>
            <Text size="300">
              Each paragraph of this Privacy Policy shall be and remain separate
              from and independent of and severable from all and any other
              paragraphs herein except where otherwise expressly indicated or
              indicated by the context of the agreement. The decision or
              declaration that one or more of the paragraphs are null and void
              shall have no effect on the remaining paragraphs of this privacy
              policy.
            </Text>
          </Box>
          <Heading size="400">
            CONSENT WITHDRAWAL, DATA DOWNLOAD & DATA REMOVAL REQUESTS
          </Heading>
          <Box marginTop={8} marginBottom={8}>
            <Text size="300">
              To withdraw your consent, or to request the download or delete
              your data with us for any or all our services & services at any
              time, please email to info@cartegan.com
            </Text>
          </Box>
          <Heading size="400"> DO WE MAKE UPDATES TO THIS NOTICE?</Heading>

          <Box marginTop={8} marginBottom={8}>
            <Text size="300">
              We may update this privacy notice from time to time. The updated
              version will be indicated by an updated "Revised" date and the
              updated version will be effective as soon as it is accessible. If
              we make material changes to this privacy notice, we may notify you
              either by prominently posting a notice of such changes or by
              directly sending you a notification. We encourage you to review
              this privacy notice frequently to be informed of how we are
              protecting your information.
            </Text>
          </Box>
        </Box>
      </BigContainer>
      <Footer2 />
    </>
  );
};
export default Pp;
