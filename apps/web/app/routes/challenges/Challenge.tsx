import { useLocation } from "@remix-run/react";
import { Box, Flex, Icon, Text } from "gestalt";
import { useMemo } from "react";
import type {
  ChallengeFragment,
  StoreChallengeFragment,
} from "../../graphql/__generated__/graphql";
import { MetricType } from "../../graphql/__generated__/graphql";
import { endOfDay } from "./endOfDay";
import { aDayToWeekEnd, endOfWeek } from "./endOfWeek";

const questions: {
  type: MetricType;
  heading: string;
  strategies: string[];
  tools: { href: string; text: string }[];
}[] = [
  {
    type: MetricType.ShopifyCheckoutStartedValue,
    heading: "Improving Cart Order Rate",
    strategies: [
      // "What is the promotion and marketing strategy and is it effectively reaching the target audience?",
      // "What is the customer journey from adding products to cart to checkout?",
      // "Are there any barriers or friction points in the checkout process that can be addressed?",
      // "What is the current pricing and shipping policy and is it competitive?",
      // "What is the call-to-action in the cart and throughout the site and is it clear and compelling?",

      // "Who is your target audience and what are their pain points or needs when it comes to making a purchase?",
      // "Have you analyzed the customer journey from when they first land on your website to when they complete a purchase? What are the key steps and points of friction in the process?",
      // "Have you tried any previous email campaigns or automations to increase cart order rates? What were the results and what could be improved?",
      // "Have you considered using abandoned cart email automations or other targeted email campaigns to engage customers and encourage them to complete their purchases?",
      // "Have you evaluated any upselling or cross-selling opportunities to increase the average order value and drive more sales?",

      "What products or product categories do customers frequently purchase together?",
      "How can we create cross-sell opportunities for complementary products?",
      "Can we offer discounts or incentives for customers who purchase larger quantities of a single product?",
      "How can we encourage customers to add more items to their cart before checkout?",
      "Are there any abandoned cart email campaigns in place, and if so, how can they be optimized to encourage customers to complete their purchase?",
    ],
    tools: [
      { href: "/automations", text: "Automation" },
      { href: "/signup-forms", text: "Signup Forms" },
    ],
  },

  {
    type: MetricType.ShopifyCheckoutStarted,
    heading: "Improving Cart Order Rate",
    strategies: [
      // "What is the promotion and marketing strategy and is it effectively reaching the target audience?",
      // "What is the customer journey from adding products to cart to checkout?",
      // "Are there any barriers or friction points in the checkout process that can be addressed?",
      // "What is the current pricing and shipping policy and is it competitive?",
      // "What is the call-to-action in the cart and throughout the site and is it clear and compelling?",

      "Who is your target audience and what are their pain points or needs when it comes to making a purchase?",
      "Have you analyzed the customer journey from when they first land on your website to when they complete a purchase? What are the key steps and points of friction in the process?",
      "Have you tried any previous email campaigns or automations to increase cart order rates? What were the results and what could be improved?",
      "Have you considered using abandoned cart email automations or other targeted email campaigns to engage customers and encourage them to complete their purchases?",
      "Have you evaluated any upselling or cross-selling opportunities to increase the average order value and drive more sales?",
    ],
    tools: [
      { href: "/signup-forms", text: "Signup Forms" },
      { href: "/automations", text: "Automation" },
      { href: "/", text: "Newsletter" },
    ],
  },

  {
    type: MetricType.PostPublished,
    heading: "Publishing Newsletters",
    strategies: [
      // "What is the purpose and target audience for the newsletters?",
      // "What is the content and format plan for the newsletters and is it relevant and appealing to the target audience?",
      // "How will the newsletters be promoted and subscribed to by the target audience?",
      // "What is the plan for measuring the success and impact of the newsletters?",
      // "What is the schedule for sending the newsletters and is it optimal for the target audience?",

      "What is the current process for publishing posts and is there room for optimization?",
      "How often are new posts being created and how can this frequency be increased?",
      "Have you considered automating the process of post creation and publishing?",
      "Have you considered reaching out to other sources for guest posts or collaborations to increase the number of published posts?",
      "What metrics are being used to track the success of the current process and how can they be improved?",
    ],
    tools: [
      { href: "/", text: "Newsletter" },
      { href: "/signup-forms", text: "Signup Forms" },
    ],
  },
  {
    type: MetricType.PostViewed,
    heading: "Evaluating the Current Newsletter Strategy",
    strategies: [
      // "What is the current open rate of the newsletter and what is the industry average?",
      // "Who is the target audience and what is their behavior pattern when it comes to newsletters?",
      // "What type of content is being sent in the newsletter and is it engaging for the target audience?",
      // "How is the newsletter being promoted and delivered to subscribers (e.g. email subject line, email provider)?",
      // "Has A/B testing been performed on elements such as subject lines, sending frequency, and calls-to-action?",
      "What is the current open rate for your newsletter and what is the target audience you are trying to reach?",
      "Have you segmented your email list based on subscriber behavior or demographics?",
      "Are you A/B testing subject lines, sending times, or calls to action within your newsletter?",
      "What is the schedule for sending the newsletters and is it optimal for the target audience?",
      "Have you tried including interactive elements, such as quizzes or polls, in your newsletters to increase engagement?",
      "Have you considered offering exclusive content or discounts to incentivize subscribers to open and engage with your newsletter?",
    ],
    tools: [
      { href: "/signup-forms", text: "Signup Forms" },
      { href: "/", text: "Newsletter" },
    ],
  },
  {
    type: MetricType.EmailLinkClicked,
    heading: "Assessing Email Campaign Performance",
    strategies: [
      // "What is the current click-through rate for emails and what is the industry average?",
      // "What type of content is being included in the emails and is it relevant to the target audience?",
      // "How are the emails being delivered to subscribers (e.g. subject line, sender, time of day)?",
      // "What is the call-to-action in the emails and is it clear and compelling?",
      // "Has A/B testing been performed on elements such as subject lines, sending frequency, and calls-to-action?",

      "What is your current email open rate and click-through rate, and how does it compare to industry benchmarks for your industry and target audience?",
      "What is the current content of your emails, and how might it be optimized to encourage more clicks on links?",
      "Are you segmenting your email list and sending targeted, personalized emails to different subsets of your audience?",
      "Have you tried A/B testing different elements of your emails, such as subject lines, send times, and call-to-action language, to see what resonates most with your audience?",
      "Are you using any automations to send follow-up emails to people who have not clicked links in your previous emails, or to send targeted emails based on subscriber behavior?",
    ],
    tools: [
      { href: "/automations", text: "Automation" },
      { href: "/signup-forms", text: "Signup Forms" },
      { href: "/", text: "Newsletter" },
    ],
  },
  {
    type: MetricType.EmailDelivered,
    heading: "Optimizing Email Delivery Performance",
    strategies: [
      // "What is the current email delivery rate and what is the industry average?",
      // "How are emails being sent and managed (e.g. email service provider, mailing list management)?",
      // "Are emails being marked as spam or bounced frequently? If so, why?",
      // "How is the sender reputation and email authentication (e.g. SPF, DKIM) being managed?",
      "How many emails are being sent currently and what is the average open rate and click-through rate?",
      "Are there any common reasons why some emails are getting marked as spam or going to the recipient's junk folder?",
      "Are there segments of your email list that have a higher engagement rate compared to others?",
      "Have you tested different subject lines, sending frequencies, or sending times to see what works best for your audience?",
      "Are emails being marked as spam or bounced frequently? If so, why?",
      "Has the email list been cleaned and updated recently to remove inactive or invalid addresses?",
      // "Are there any tools or technologies that can help improve the deliverability of your emails, such as using a professional email delivery service?"
    ],
    tools: [
      { href: "/", text: "Newsletter" },
      { href: "/signup-forms", text: "Signup Forms" },
      { href: "/automations", text: "Automation" },
    ],
  },
  {
    type: MetricType.ShopifyPlacedOrderValue,
    heading: "Driving Revenue Growth",
    strategies: [
      // "What is the current revenue and what are the primary sources of revenue?",
      // "What is the target customer profile and what are their pain points and purchasing behaviors?",
      // "How is the company positioning itself in the market and differentiating from competitors?",
      // "What is the pricing strategy and is there room for adjustments?",
      // "What are the current sales and marketing efforts and are they effective in driving revenue?",
      "What is the current average order value?",
      "What motivates customers to place larger orders?",
      "Are there any discounts or promotions you could offer to encourage customers to increase their order value?",
      "Have you tried upselling or cross-selling products to customers during the checkout process?",
      "Could you send follow-up emails to customers with product recommendations based on their previous purchases?",
    ],
    tools: [
      { href: "/automations", text: "Automation" },
      { href: "/signup-forms", text: "Signup Forms" },
    ],
  },
  {
    type: MetricType.ShopifyFulfilledOrderValue,
    heading: "Maximizing Order Value",
    // strategies: [
    //   "What is the current average fulfilled order value and what is the target increase?",
    //   "What is the target customer profile and what are their purchase behaviors and preferences?",
    //   "Are upsell and cross-sell opportunities being effectively presented during the checkout process?",
    //   "What is the pricing strategy and is there room for adjustments to increase order value?",
    //   "What is the current product and service offering and is there potential for expansion or improvement?",
    // ],
    strategies: [
      // "Evaluate current metrics for fulfillment process, such as average order value, order completion rate, and delivery time.",
      // "What are the inefficiencies or bottlenecks in the current fulfillment process?",
      // "Increase the value of each order through offering additional products or services, upselling or cross-selling, or providing promotional discounts.",
      // "Use targeted email campaigns to reach customers who have previously purchased and encourage them to make repeat purchases.",
      // "Leverage data and customer insights to personalize email campaigns and make them more effective at driving increased sales.",
      "What is the average order value for fulfilled orders right now, and what is the target increase you're aiming for?",
      "How are you currently communicating with customers after they've placed an order? Are there opportunities to offer additional products or upsell?",
      "Are there any promotions or discounts you could offer to incentivize customers to spend more on their orders?",
      "Are there any loyalty programs or rewards systems in place to encourage repeat purchases and increase customer lifetime value?",
      "Have you considered sending targeted follow-up emails to customers based on their purchase history and preferences?",
    ],
    tools: [
      { href: "/automations", text: "Automation" },
      { href: "/signup-forms", text: "Signup Forms" },
    ],
  },
  {
    type: MetricType.ShopifyOrderedProductValue,
    heading: "Improving Ordered Product Rate",
    strategies: [
      // "What is the current ordered product rate and what is the target increase?",
      // "What is the target customer profile and what are their purchase behaviors and preferences?",
      // "What is the product offering and is it competitive and appealing to the target audience?",
      // "How is the product presentation on the website and is it effectively showcasing its value?",
      // "What is the pricing strategy and is it competitive and appealing to the target audience?",
      "What is the current average order value for the products?",
      "What is the current conversion rate for the email campaigns related to these products?",
      "Are there any barriers that prevent customers from adding more items to their cart or purchasing higher-value products?",
      "What steps can be taken to educate customers on the benefits and value of the higher-priced products?",
      "Can special offers, such as bundle deals or free gifts with purchase, be added to incentivize customers to increase their average order value?",
    ],
    tools: [
      { href: "/automations", text: "Automation" },
      { href: "/signup-forms", text: "Signup Forms" },
    ],
  },
  {
    type: MetricType.EmailSent,
    heading: "Increasing Email Sent Rate",
    strategies: [
      // "What is the target audience and what are their email engagement behaviors and preferences?",
      // "What is the current email content and format and is it relevant and appealing to the target audience?",
      // "What is the email sending frequency and is it optimal for the target audience?",
      // "What is the current process for sending emails, and are there any bottlenecks or inefficiencies that can be streamlined?",
      // "What is the current email sent rate and what is the target increase?",
      "Who is your target audience for these emails, and what do they find valuable or engaging in an email?",
      "Have you segmented your email list to ensure that the right message is being sent to the right people at the right time?",
      "What is the subject line and sender information and is it effectively grabbing attention and building trust?",
      "Have you experimented with different send times or email frequencies to see what resonates best with your audience?",
      "Are there any additional touchpoints or opportunities to re-engage with your audience outside of email that you can utilize to increase overall engagement?",
    ],
    tools: [
      { href: "/", text: "Newsletter" },
      { href: "/signup-forms", text: "Signup Forms" },
      { href: "/automations", text: "Automation" },
    ],
  },
  {
    type: MetricType.EmailOpened,

    heading: "Improving Email Open Rate",
    strategies: [
      // "What is the target audience and what are their email engagement behaviors and preferences?",
      // "What is the current email content and format and is it relevant and appealing to the target audience?",
      // "What is the subject line and sender information and is it effectively grabbing attention and building trust?",
      // "What is the email sending frequency and timing and is it optimal for the target audience?",
      // "What is the current email open rate and what is the target increase?",
      "Who are your target audience for the email campaigns?",
      "What type of content have you been sending in the emails?",
      "Have you segmented your email list based on subscriber behavior and preferences?",
      "Have you tried A/B testing different subject lines and email formats?",
      "Are you consistently sending emails on a regular schedule or sporadically?",
    ],
    tools: [
      { href: "/", text: "Newsletter" },
      { href: "/signup-forms", text: "Signup Forms" },
      { href: "/automations", text: "Automation" },
    ],
  },
];

const ClockComponent = ({ time }: { time: string }) => {
  return (
    <Flex.Item flex="grow">
      <Box>
        <Flex alignItems="center" gap={1}>
          <Icon
            color="warning"
            accessibilityLabel="clock"
            icon="clock"
            size={24}
          />
          <Text size="300" weight="bold" color="warning">
            {time}
          </Text>
        </Flex>
      </Box>
    </Flex.Item>
  );
};

export const Challenge = ({
  data,
  storeChallenge,
  type,
}: {
  data: ChallengeFragment;
  storeChallenge?: StoreChallengeFragment;
  type?: "day" | "week";
}) => {
  const { completionCount, completionStages, name, measuredMetric } = data;

  const location = useLocation();

  const clock = useMemo(() => {
    if (type === "week") {
      return aDayToWeekEnd() ? (
        <ClockComponent time={endOfWeek(false)} />
      ) : (
        <Box />
      );
    }
    if (type === "day") {
      return <ClockComponent time={endOfDay(false)} />;
    }
    return null;
  }, [type]);

  return (
    <>
      <Box
        marginTop={4}
        borderStyle="shadow"
        rounding={3}
        padding={6}
        opacity={storeChallenge?.allCompleted ? 0.5 : 1}
      >
        <Flex direction="row" justifyContent="between" alignItems="center">
          <Flex flex="grow" gap={3} direction="column">
            <Flex justifyContent="start" gap={2} alignItems="center">
              <Box>
                <Text size="200" weight="bold" inline>
                  {storeChallenge?.allCompleted
                    ? completionCount
                    : storeChallenge?.completedCount ?? 0}{" "}
                </Text>
                <Text size="200" weight="bold" inline>
                  / {completionCount}
                </Text>
                <Text inline size="200">
                  {" "}
                  completed
                </Text>
              </Box>
              {storeChallenge?.allCompleted || type === undefined
                ? null
                : clock}
            </Flex>
            <Flex gap={2} alignItems="start" direction="column">
              <Text size="400" weight="bold">
                {completionStages > 1
                  ? `Stage ${
                      Number(storeChallenge?.completedStages ?? 0) +
                      (storeChallenge?.allCompleted ? 0 : 1)
                    } of ${completionStages} - `
                  : null}{" "}
                {name}
              </Text>
              {/* <Text color="subtle" size="200">
                {
                  questions.find(({ type }) => type === measuredMetric)
                    ?.strategies[0]
                }

              </Text> */}
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
