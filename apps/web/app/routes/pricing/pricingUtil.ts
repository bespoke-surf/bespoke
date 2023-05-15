export const pricingDetails = [
  "Landing Page",
  "Dedicated subscriber profiles",
  "Integration with ecommerce sites",
  "Sign up Forms & pop-ups",
  "Product listing",
  "Automation workflows",
  "Sparsed reports",
  "List management",
  "Product recommendations",
  "Conditional Triggers",
  "Built-in compliance and deliverability",
  "No branding",
];

export const bestPartDeatils = [
  "Newsletter UX from Substack",
  "List and Profiles from Klaviyo",
  "Workflow UI from Shopify Workflow",
  "Email Automation UX from Ominisend",
  "Sign up Forms and Popups from Klaivyo",
  "Product listing from Pinterest",
  "Landing Page design from Meta Bulletin",
  "Sparsed metrics from Substack",
];

export function numberWithCommas(x: number) {
  const parts = x.toString().split(".");
  const secondPart = parts[0];
  if (secondPart) {
    parts[0] = secondPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return parts.join(".");
}

const options = [];
for (let i = 500; i < 150500; i += 500) {
  if (
    i === 2000 ||
    i === 4000 ||
    i === 4500 ||
    i == 7000 ||
    i == 7500 ||
    i === 8000 ||
    i === 8500 ||
    i === 9000 ||
    i === 9500
  ) {
    continue;
  }

  const value = i * 10;

  if (i === 500) {
    options.push({
      label: `${numberWithCommas(0)} - ${numberWithCommas(250)}`,
      value: `${250 * 10}`,
    });
    options.push({
      label: `${numberWithCommas(i - 250 + 1)} - ${numberWithCommas(i)}`,
      value: `${value}`,
    });
    continue;
  }

  if (i < 13500) {
    if (i === 2500) {
      options.push({
        label: `${numberWithCommas(i - 1000 + 1)} - ${numberWithCommas(i)}`,
        value: `${value}`,
      });
    } else if (i == 5000) {
      options.push({
        label: `${numberWithCommas(i - 1500 + 1)} - ${numberWithCommas(i)}`,
        value: `${value}`,
      });
    } else if (i === 10000) {
      options.push({
        label: `${numberWithCommas(i - 3500 + 1)} - ${numberWithCommas(i)}`,
        value: `${value}`,
      });
    } else {
      options.push({
        label: `${numberWithCommas(i - 500 + 1)} - ${numberWithCommas(i)}`,
        value: `${value}`,
      });
    }
  }

  if (i == 13500) {
    options.push({
      label: `${numberWithCommas(i) + 1} - 15000`,
      value: `${value}`,
    });
  }

  if (i >= 20000 && i % 5000 === 0) {
    if (i === 30000) {
      options.push({
        label: `${numberWithCommas(i - 2000 + 1)} - ${numberWithCommas(i)}`,
        value: `${value}`,
      });
    } else {
      options.push({
        label: `${numberWithCommas(i - 5000 + 1)} - ${numberWithCommas(i)}`,
        value: `${value}`,
      });
    }
  }

  if (i >= 26000 && i <= 28000 && i % 1000 === 0) {
    options.push({
      label: `${numberWithCommas(i - 1000 + 1)} - ${value}`,
      value: `${value}`,
    });
  }
}
