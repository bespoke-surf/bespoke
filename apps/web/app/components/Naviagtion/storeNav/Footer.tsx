import { useRouteLoaderData } from "@remix-run/react";
import dayjs from "dayjs";

import { Flex, Link, TapArea, Text } from "gestalt";
import { Suspense, lazy, useState } from "react";
import type { RootData } from "../../../root";

const CookiePrefrences = lazy(() => import("../../footer/CookiePrefrences"));

export default function Footer() {
  const rootLoaderData = useRouteLoaderData("root") as RootData;

  const [cookie, setCookie] = useState(false);

  return (
    <Flex gap={3} direction="column">
      <Flex gap={2} justifyContent="start" wrap>
        {rootLoaderData.OPEN_SOURCE ? null : (
          <>
            <Link
              underline="hover"
              display="inline"
              href="https://bespoke.surf/terms-of-service"
            >
              <Text size="100" color="subtle" inline overflow="noWrap">
                PRIVACY
              </Text>
            </Link>

            <Link
              underline="hover"
              display="inline"
              href="https://bespoke.surf/privacy-policy"
            >
              <Text size="100" color="subtle" inline overflow="noWrap">
                TERMS
              </Text>
            </Link>
            <Link
              underline="hover"
              display="inline"
              href="https://bespoke.surf/refund-policy"
            >
              <Text size="100" color="subtle" inline overflow="noWrap">
                OTHER POLICIES
              </Text>
            </Link>
          </>
        )}
        <TapArea onTap={() => setCookie(true)}>
          <Text size="100" color="subtle" inline overflow="noWrap">
            COOKIE PREFRENCES
          </Text>
        </TapArea>
      </Flex>
      {rootLoaderData.OPEN_SOURCE ? null : (
        <Text size="100" color="subtle">
          © {dayjs().get("year")}{" "}
          {rootLoaderData.store?.name
            ? rootLoaderData.store.name
            : "Cartegan Software, Pvt Ltd."}
        </Text>
      )}
      {cookie && (
        <Suspense>
          <CookiePrefrences dismiss={() => setCookie(false)} />
        </Suspense>
      )}
    </Flex>
  );
}
