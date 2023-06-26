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
        title="Coming Soon!"
        message="Campaigns are work in progress. Visit our Discrod server to see current progress. PR's are welcome!"
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
