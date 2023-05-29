import { Callout } from "gestalt";
import PageLayout from "../../components/PageLayout";

export default function Campaigns() {
  return (
    <PageLayout
      pageHeaderPorps={{
        title: "CAMPAIGNS",
      }}
    >
      <Callout
        iconAccessibilityLabel="info"
        type="info"
        title="Campaigns are coming soon!"
        message="Campaings would be ready by end of next week. Visit our discord server to see progress. We recommend you to give your thoughts and suggestions. PR's are welcome too!"
        primaryAction={{
          label: "Discord",
          href: "https://discord.gg/HNfkXzNDKH",
          accessibilityLabel: "discord",
        }}
        secondaryAction={{
          label: "Github",
          href: "https://github.com/bespoke-surf/bespoke",
          accessibilityLabel: "Github",
        }}
      />
    </PageLayout>
  );
}
