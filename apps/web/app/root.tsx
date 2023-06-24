import type {
  HeadersFunction,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
  useNavigate,
} from "@remix-run/react";
import { withSentry } from "@sentry/remix";
import {
  Box,
  Button,
  Container,
  DeviceTypeProvider,
  Dropdown,
  Flex,
  IconButtonFloating,
  Link,
  PageHeader,
  TapArea,
  Text,
} from "gestalt";
import gestaltStyle from "gestalt/dist/gestalt.css";
import posthog from "posthog-js";
import { useEffect, useRef, useState } from "react";
import type { DynamicLinksFunction } from "remix-utils";
import { DynamicLinks, StructuredData } from "remix-utils";
import { getEnvVars } from "../env.server";
import MobileNavigation from "./components/MobileNavigation";
import type {
  StoreFragment,
  UserFragment,
} from "./graphql/__generated__/graphql";
import { sdk } from "./graphql/graphqlWrapper.server";
import { useClientNavigationLinks } from "./hooks/useClientNavigationLinks";
import { pathedRoutes } from "./other-routes.server";
import rootCss from "./styles/root.css";
import { getCloudinaryFavicons } from "./utils/getCloudinaryFavicon";
import {
  getSubdomain,
  isMobile,
  isRouteOnUserSubdomain,
  setCookieShopifyAuth,
} from "./utils/utils.server";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: gestaltStyle },
    { rel: "stylesheet", href: rootCss },
  ];
};

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  console.log({ loaderHeaders });
  return {
    "cache-control": loaderHeaders.get("cache-control") ?? "no-store",
  };
};

let dynamicLinks: DynamicLinksFunction<RootData> = ({ data }) => {
  if (!data.store?.displayPicture?.src) return [];

  const href = getCloudinaryFavicons(data.store.displayPicture.src);

  if (!href?.src) return [];
  return [
    {
      rel: "icon",
      href: href?.src,
      as: "image",
    },
  ];
};

export let handle: { dynamicLinks: DynamicLinksFunction<RootData> } = {
  dynamicLinks,
};

export const meta: MetaFunction = ({ data }) => {
  const rootData = data as RootData;
  const isOnSubdomain = rootData.subdomain;

  const DEFAULT_MARKETING_IMAGE = isOnSubdomain
    ? {
        url: rootData.store?.displayPicture?.src,
        height: `${rootData.store?.displayPicture?.height}`,
        width: `${rootData.store?.displayPicture?.width}`,
      }
    : {
        url: "https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1683444614/Frame_14_1_aceeti.png",
        height: "900",
        width: "1600",
      };

  const title = isOnSubdomain
    ? `${rootData.store?.name}`
    : "Open Source Mailchimp Alternative";
  const description = isOnSubdomain
    ? rootData.isUserSubdomain
      ? "Write your newsletter & marketing emails and send to your audience. People can also see your published posts here."
      : `All posts published by ${rootData.store?.name}.`
    : "Open Source Mailchimp Alternative";

  return {
    charset: "utf-8",
    title,
    description,
    viewport: "width=device-width,initial-scale=1",
    "og:url": isOnSubdomain
      ? `https://${isOnSubdomain}.bespoke.surf`
      : "https://bespoke.surf",
    "og:title": title,
    "og:site_name": isOnSubdomain ? rootData.store?.name : "Bespoke",
    "og:type": "website",
    "og:description": description,
    "og:image": DEFAULT_MARKETING_IMAGE.url,
    "og:image:secure_url": DEFAULT_MARKETING_IMAGE.url,
    "og:image:width": DEFAULT_MARKETING_IMAGE.width,
    "og:image:height": DEFAULT_MARKETING_IMAGE.height,
    // "og:image:type": `image/png`,
    "twitter:card": "summary",
    // "twitter:site": "@bespokedotsurf",
    "twitter:title": title,
    "twitter:image": DEFAULT_MARKETING_IMAGE.url,
    "twitter:description": description,
  };
};

export interface RootData {
  user: UserFragment | null | undefined;
  store: StoreFragment | null | undefined;
  subdomain: string | undefined;
  isUserSubdomain: boolean;
  unReadCount: number;
  BACKEND_HOST?: string | null | undefined;
  isMobile: boolean;
  CLOUDINARY_UPLOAD_IMAGE_URL?: string | null | undefined;
  CLOUDINARY_PRESET?: string | null | undefined;
}

export let loader: LoaderFunction = async ({ request }) => {
  try {
    const shopifyAuth = await setCookieShopifyAuth(request);
    if (shopifyAuth !== null) return shopifyAuth;

    // because this is called for every route, we'll do an early return for anything
    // that has a other route setup. The response will be handled there.
    if (pathedRoutes[new URL(request.url).pathname]) {
      return new Response();
    }
    const isOnSubdomain = isRouteOnUserSubdomain(request);

    const userAgent = request.headers.get("user-agent");
    const mobile = isMobile(userAgent ?? "");

    if (isOnSubdomain) {
      const subdomain = getSubdomain(request);

      const response = await Promise.all([
        sdk.Me({}, { request }),
        sdk.GetStoreWithSubdomain({ subdomain: subdomain ?? "" }, { request }),
        sdk.unReadNotificationCount({}, { request }),
        // sdk.GetStoreCredits({ subdomain: subdomain ?? "" }, { request }),
        // sdk.getStoreXP(
        //   {
        //     subdomain: subdomain ?? "",
        //   },
        //   { request }
        // ),
        // sdk.getStoreGrowthStars(
        //   {
        //     subdomain: subdomain ?? "",
        //   },
        //   { request }
        // ),
      ]);

      const user = response[0];
      const store = response[1].getStoreWithSubdomain;
      const unReadCount = response[2].unReadNotificationCount;
      const isUserSubdomain =
        user.me && store && user?.me?.id === store?.userId ? true : false;

      if (store == null) {
        throw new Response("Not Found", {
          status: 404,
        });
      }

      return json<RootData>(
        {
          user: user.me,
          store,
          subdomain: isOnSubdomain ? subdomain : undefined,
          isUserSubdomain,
          unReadCount,
          isMobile: mobile,
          BACKEND_HOST: getEnvVars().BACKEND_HOST,
          CLOUDINARY_UPLOAD_IMAGE_URL: getEnvVars().CLOUDINARY_UPLOAD_IMAGE_URL,
          CLOUDINARY_PRESET: getEnvVars().CLOUDINARY_PRESET,
        },
        {
          headers: {
            "cache-control": "private, no-store",
          },
        }
      );
    } else {
      return json<RootData>(
        {
          user: null,
          store: null,
          subdomain: undefined,
          isUserSubdomain: false,
          unReadCount: 0,
          isMobile: mobile,
        },
        {
          headers: {
            "cache-control":
              "public, s-maxage=60, stale-while-revalidate=31536000",
          },
        }
      );
    }
  } catch (err) {
    console.log(err, "err");
    if (err instanceof Response) throw err;
    return { errors: err };
  }
};

export async function action() {
  return null;
}

function App() {
  useClientNavigationLinks();
  const location = useLocation();
  const loaderData = useLoaderData<RootData>();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  useEffect(() => {
    if (process.env.NODE_ENV === "production" && loaderData.user) {
      posthog.identify(loaderData.user?.id);
      posthog.people.set({ email: loaderData.user?.email });
    }
  }, [loaderData.user]);

  return (
    <html lang="en">
      <head>
        {/* <Partytown debug={true} forward={["dataLayer.push"]} /> */}
        <Meta />
        <Links />
        <StructuredData />
        <DynamicLinks />
      </head>
      <body>
        <DeviceTypeProvider
          deviceType={loaderData.isMobile ? "mobile" : "desktop"}
        >
          {!loaderData.subdomain &&
          (location.pathname === "/" ||
            location.pathname === "/pricing" ||
            location.pathname === "/inspirations" ||
            location.pathname === "/signup" ||
            location.pathname === "/onboarding" ||
            location.pathname === "/privacy-policy" ||
            location.pathname === "/terms-of-service" ||
            location.pathname === "/refund-policy" ||
            location.pathname === "/content-guidelines" ||
            location.pathname === "/data-processing-agreement" ||
            location.pathname === "/copyright-dispute-policy" ||
            location.pathname === "/login") ? null : (
            <MobileNavigation />
          )}
          <Outlet />
        </DeviceTypeProvider>
        <ScrollRestoration getKey={(location) => location.pathname} />
        <Scripts />
        <LiveReload />
        <Box
          margin={4}
          position="fixed"
          bottom
          right
          ref={anchorRef}
          role="contentinfo"
          display={loaderData.isUserSubdomain ? "block" : "none"}
        >
          <IconButtonFloating
            tooltip={{
              text: "Support links",
              accessibilityLabel: "Support links",
            }}
            accessibilityControls="sections-dropdown-example"
            accessibilityExpanded={open}
            accessibilityPopupRole="menu"
            accessibilityLabel="Create Pin Menu"
            icon="question-mark"
            onClick={() => setOpen((prevVal) => !prevVal)}
            selected={open}
          />
        </Box>
        {open && (
          <Dropdown
            anchor={anchorRef.current}
            id="sections-dropdown-example"
            onDismiss={() => setOpen(false)}
            idealDirection="up"
          >
            <Dropdown.Section label="Support">
              <Dropdown.Link
                option={{ value: "Pin", label: "Submit A Ticket" }}
                href="https://bespokesurf.freshdesk.com/support/tickets/new"
                isExternal
              />
              <Dropdown.Link
                option={{ value: "Pin", label: "Feature Request" }}
                href="https://feedback.bespoke.surf/feature-requests"
                isExternal
              />
              <Dropdown.Link
                option={{ value: "Pin", label: "See What's New" }}
                isExternal
                href="https://feedback.bespoke.surf/changelog"
              />
            </Dropdown.Section>
          </Dropdown>
        )}
      </body>
    </html>
  );
}

export default withSentry(App, {
  wrapWithErrorBoundary: true,
  errorBoundaryOptions: {
    showDialog: true,
  },
});

export function CatchBoundary() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <html>
      <head>
        <title>404 - Not Found</title>
        <Links />
      </head>
      <body>
        <Container>
          <PageHeader
            borderStyle="none"
            title="Not Found"
            subtext="This page you are attempting to access is not found"
            primaryAction={{
              component: (
                <Button
                  text="Install Shopify App"
                  color="red"
                  size="lg"
                  href="/"
                  role="link"
                />
              ),
              dropdownItems: [
                <Dropdown.Link
                  key="shopify app"
                  href="/"
                  option={{ label: "Install Shopify App", value: "" }}
                  isExternal
                />,
              ],
            }}
          />
          <Flex justifyContent="center">
            <Box width="92%" paddingY={6}>
              <Flex direction="column" gap={4}>
                {location.key && (
                  <TapArea onTap={() => navigate(-1)}>
                    <Text underline>Go Back</Text>
                  </TapArea>
                )}

                <Link href="https://bespoke.surf" underline="always">
                  <Text>Go to bespoke.surf</Text>
                </Link>
              </Flex>
            </Box>
          </Flex>
        </Container>
        <Scripts />
      </body>
    </html>
  );
}
