import type { LinksFunction } from "@remix-run/node";
import { Box } from "gestalt";
import PublicMobileNav from "~/components/PublicMobileNav";
import Footer from "../../components/Footer";
import PublicNav from "../../components/PublicNav";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import emailMarketingCss from "./EmailMarketing/emailMarketing.css";
import headerCss from "./Header/header.css";
import oneCss from "./One/one.css";
import PriceChange from "./PriceChange/PriceChange";
import priceChangeCss from "./PriceChange/priceChange.css";
import { Shopify } from "./Shopify/Shopify";
import shopifyCss from "./Shopify/shopify.css";

import { links as whyChooseUsLinks } from "../index/newLanding/WhyChooseUs";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: headerCss,
    },
    {
      rel: "stylesheet",
      href: priceChangeCss,
    },
    {
      rel: "stylesheet",
      href: shopifyCss,
    },
    {
      rel: "stylesheet",
      href: emailMarketingCss,
    },
    { rel: "stylesheet", href: oneCss },
    ...whyChooseUsLinks(),
  ];
};

export default function Pricing() {
  return (
    <>
      <PublicNav backgroundColor="white" />
      <PublicMobileNav />
      <Box
        dangerouslySetInlineStyle={{
          __style: {
            color: "black",
          },
        }}
      >
        <PriceChange />
        {/* <EmailMarketing /> */}
      </Box>
      <Shopify />
      <Footer />
    </>
  );
}
