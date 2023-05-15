import { Box } from "gestalt";
import { CdnType } from "../../../graphql/__generated__/graphql";
import { getImageSrcAndSrcSet } from "../../../utils/getCloudinarySrcAndSrcSet";

/* eslint-disable gestalt/prefer-box-inline-style */
const item = [
  "https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1670355430/Frame_25_rofk0f.png",
  "https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1670324618/Frame_8_2_hph9fa.png",
  "https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1670148619/Frame_9_2_ri4uu6.png",
  "https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1670149551/Frame_10_fcesih.png",
  "https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1670152663/Frame_11_3_utc17g.png",
  "https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1670150869/Frame_12_saxf2k.png",
  "https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1670150866/Frame_13_jocczp.png",
];

const bulletPointHeadings = [
  "Personalized emails",
  "Segmentation",
  "Analytics",
  "Automation",
  "Integration",
  "Compliance and deliverability",
];

const summaryPoints = [
  "Our solution includes powerful email marketing features that allow you to create and send personalized, professional emails to your subscribers.",
  "You can easily segment your audience and send targeted, relevant emails, which can improve engagement and conversions (coming soon).",
  "Our solution provides detailed analytics and reports that can help you track and optimize the performance of your email campaigns.",
  "Automation features allow you to send triggered, automated emails based on specific actions or behaviors.",
  "Our solution can easily integrate with other marketing channels, such as social media, and SMS (coming soon).",
  "Our solution is designed to be compliant with email marketing laws and includes features to improve deliverability.",
];

export const Feature = () => {
  return (
    <div className="PricingEmailMarketingBusinessGridItem PricingEmailMarketingBusinessGridItem--start-13 PricingEmailMarketingBusinessGridItem--span-10">
      <div
        className="PricingEmailMarketingBusinessTransitionHookWrapper"
        style={{
          transition:
            "opacity 450ms cubic-bezier(0.21, 0.01, 0.21, 0.96) 0s, transform cubic-bezier(0.21, 0.01, 0.21, 0.96)",
          transform: "none",
          opacity: 1,
        }}
      >
        <h2
          className="PricingEmailMarketingBusinessText PricingEmailMarketingBusinessText--h2 PricingEmailMarketingBusinessAccordionWithImages__heading"
          style={{ color: "inherit" }}
        >
          Feature summary
        </h2>
        <dl className="PricingEmailMarketingBusinessAccordion">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <AccordionData
                key={bulletPointHeadings[index]}
                heading={bulletPointHeadings[index]}
                summary={summaryPoints[index]}
              />
            ))}
        </dl>
      </div>
    </div>
  );
};

const AccordionData = ({
  heading,
  summary,
}: {
  heading: string | undefined;
  summary: string | undefined;
}) => {
  return (
    <>
      <dt style={{ borderColor: "inherit" }}>
        <button
          className="PricingEmailMarketingBusinessAccordion__title PricingEmailMarketingBusinessAccordion__title--expanded"
          color="#005C62"
          aria-expanded="true"
          aria-controls="accordion-item-52-138"
          type="button"
          tabIndex={0}
          style={{ color: "inherit" }}
        >
          <div tabIndex={-1}>
            <span
              className="PricingEmailMarketingBusinessText PricingEmailMarketingBusinessText--t1"
              style={{ color: "currentcolor" }}
            >
              {heading}
            </span>
            <span className="PricingEmailMarketingBusinessAccordion__title-icon">
              <svg
                role="presentation"
                viewBox="0 0 18 18"
                className="PricingEmailMarketingBusinessIcon PricingEmailMarketingBusinessIcon--plus "
              >
                <path
                  d="M10 0v8h8v2h-8v8H8v-8H0V8h8V0h2z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </button>
      </dt>
      <dd
        className="PricingEmailMarketingBusinessAccordion__item PricingEmailMarketingBusinessAccordion__item--expanded"
        id="accordion-item-52-138"
        style={{ borderColor: "inherit", height: "auto" }}
      >
        <div className="PricingEmailMarketingBusinessAccordion__item-description">
          <span
            className="PricingEmailMarketingBusinessText PricingEmailMarketingBusinessText--t4"
            style={{ color: "inherit" }}
          >
            <p>{summary}</p>
          </span>
        </div>
      </dd>
    </>
  );
};
const image = getImageSrcAndSrcSet(item[0], false, CdnType.Cloudinary);
export const TheImage = () => {
  return (
    <div className="PricingEmailMarketingBusinessGridItem PricingEmailMarketingBusinessGridItem--start-3 PricingEmailMarketingBusinessGridItem--span-8 PricingEmailMarketingBusinessGridItem--center-vertical">
      <div
        className="PricingEmailMarketingBusinessTransitionHookWrapper"
        style={{
          transition:
            "opacity 450ms cubic-bezier(0.21, 0.01, 0.21, 0.96) 0.1s, transform cubic-bezier(0.21, 0.01, 0.21, 0.96)",
          transform: "none",
          opacity: 1,
        }}
      >
        <div className="PricingEmailMarketingBusinessAccordionWithImages__image-wrapper">
          <div
            aria-hidden="false"
            className="PricingEmailMarketingBusinessAccordionWithImages__content-item PricingEmailMarketingBusinessAccordionWithImages__content-item--expanded"
          >
            <div
              className="XiG zI7 iyn Hsu"
              style={{ backgroundColor: "transparent", paddingBottom: "200%" }}
            >
              <img
                alt="of a Pin being created with "
                className="hCL kVc L4E MIw"
                src={image?.src}
                srcSet={image?.srcSet}
                sizes={image?.sizes}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EmailMarketing = () => {
  return (
    <>
      <div className="PricingEmailMarketingBusinessAccordionWithImagesOnLeft">
        <div className="PricingEmailMarketingBusinessAccordionWithImages">
          <div className="PricingEmailMarketingBusinessGridParent">
            <div className="PricingEmailMarketingBusinessGridItem PricingEmailMarketingBusinessGridItem--start-3 PricingEmailMarketingBusinessGridItem--span-8 PricingEmailMarketingBusinessGridItem--center-vertical">
              <Box
                display="none"
                smDisplay="none"
                mdDisplay="block"
                lgDisplay="block"
              >
                <div
                  className="PricingEmailMarketingBusinessTransitionHookWrapper"
                  style={{
                    transition:
                      "opacity 450ms cubic-bezier(0.21, 0.01, 0.21, 0.96) 0.1s, transform cubic-bezier(0.21, 0.01, 0.21, 0.96)",
                    transform: "none",
                    opacity: 1,
                  }}
                >
                  <TheImage />
                </div>
              </Box>
            </div>
            <Feature />
          </div>
        </div>
      </div>
    </>
  );
};
