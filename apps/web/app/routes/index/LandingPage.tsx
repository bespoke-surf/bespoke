import type { LinksFunction } from "@remix-run/node";
import { Box, Image } from "gestalt";
import { Suspense, useReducer } from "react";
import BigContainer from "../../components/BigContainer";
import Footer from "../../components/Footer";
import PublicMobileNav from "../../components/PublicMobileNav";
import PublicNav from "../../components/PublicNav";
import JoinTheWaitlist from "../../components/footer/JoinTheWaitlist";
import { CdnType } from "../../graphql/__generated__/graphql";
import { getImageSrcAndSrcSet } from "../../utils/getCloudinarySrcAndSrcSet";
import { links as analyticsLinks } from "./newLanding/Analytics";
import ComparisonTable from "./newLanding/ComparisonTable";
import Head from "./newLanding/Head";
import { links as headerLInks } from "./newLanding/Header";
import { links as OurServicesLinks } from "./newLanding/OurServices";
import PoundCount, { links as pricingLinks } from "./newLanding/Pricing";
import SectionMore from "./newLanding/SectionMore";
import SectionValue from "./newLanding/SectionValue";
import Subscription from "./newLanding/Subscription";
import { links as whyChooseUsLinks } from "./newLanding/WhyChooseUs";
export const links: LinksFunction = () => {
  return [
    ...analyticsLinks(),
    ...headerLInks(),
    ...OurServicesLinks(),
    ...pricingLinks(),
    ...whyChooseUsLinks(),
  ];
};

const image = [
  "https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1683444614/Frame_14_1_aceeti.png",
];

export default function LandingPage() {
  const src = getImageSrcAndSrcSet(image[0], false, CdnType.Cloudinary);
  const [waitList, setWaitlist] = useReducer((s) => !s, false);
  return (
    <>
      <PublicNav />
      <PublicMobileNav />
      <BigContainer>
        <Box marginTop={12} paddingX={4}>
          <Head />
        </Box>
        <Box
          dangerouslySetInlineStyle={{
            __style: {
              marginBottom: "6rem",
            },
          }}
        />
        <Box paddingX={4}>
          <Image
            src={image[0] ?? ""}
            alt="Unlock 35 rewards and 600 credits"
            color="#0a295a"
            srcSet={src?.srcSet}
            sizes={src?.sizes}
            naturalHeight={900}
            naturalWidth={1600}
          />
        </Box>
        <Box
          dangerouslySetInlineStyle={{
            __style: {
              marginBottom: "6rem",
            },
          }}
        />
        <Box paddingX={4}>
          <SectionValue />
        </Box>
        <Box
          dangerouslySetInlineStyle={{
            __style: {
              marginBottom: "6rem",
            },
          }}
        />
      </BigContainer>
      <Box color="primary">
        <BigContainer>
          <Box
            paddingX={4}
            dangerouslySetInlineStyle={{ __style: { color: "white" } }}
          >
            <PoundCount />
          </Box>
        </BigContainer>
      </Box>
      <BigContainer>
        <Box
          paddingX={4}
          dangerouslySetInlineStyle={{
            __style: { marginTop: "6rem", marginBottom: "6rem" },
          }}
        >
          <Subscription />
        </Box>
        <ComparisonTable />
      </BigContainer>
      <BigContainer>
        <Box paddingX={4}>
          <hr className="Hru" />
        </Box>
      </BigContainer>
      <BigContainer>
        <Box paddingX={4}>
          <SectionMore />
        </Box>
      </BigContainer>
      <Box
        dangerouslySetInlineStyle={{
          __style: {
            marginBottom: "6rem",
            marginTop: "6rem",
          },
        }}
      />

      <Footer />
      {waitList && (
        <Suspense>
          <JoinTheWaitlist dismiss={setWaitlist} />
        </Suspense>
      )}
    </>
  );
}
