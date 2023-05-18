import { Link, useLocation, useRouteLoaderData } from "@remix-run/react";
import {
  Box,
  Button,
  ButtonGroup,
  Dropdown,
  Flex,
  Heading,
  Image,
  Mask,
  Sticky,
} from "gestalt";
import { useRef, useState } from "react";
import type { RootData } from "~/root";
import BigContainer from "./BigContainer";

export default function PublicNav({
  disableMid = false,
  backgroundColor,
}: {
  disableMid?: boolean;
  backgroundColor?: string;
}) {
  const rootData = useRouteLoaderData("root") as RootData;
  const location = useLocation();
  const anchorRef = useRef(null);

  const [open, setOpen] = useState(false);

  return (
    <>
      <Sticky top={0}>
        <Box color="light">
          <BigContainer>
            <Box
              color="light"
              padding={4}
              display="none"
              smDisplay="block"
              as="nav"
              dangerouslySetInlineStyle={{
                __style: {
                  backgroundColor,
                },
              }}
            >
              <Flex
                alignItems="center"
                flex="grow"
                wrap
                gap={4}
                justifyContent="between"
              >
                <Flex.Item flex="grow">
                  <Link to="/">
                    <Flex alignItems="center" gap={1}>
                      <Mask width={50} height={50} rounding="circle">
                        <Image
                          color="#e60023"
                          alt=""
                          src="https://res.cloudinary.com/bespoke-cloudinary/image/upload/f_auto,w_512/v1651261766/Group_1_3_vhvfbd.png"
                          naturalHeight={512}
                          naturalWidth={512}
                        />
                      </Mask>
                      <Heading size="400">Bespoke</Heading>
                    </Flex>
                  </Link>
                </Flex.Item>
                {disableMid ? null : (
                  <ButtonGroup>
                    <Button
                      text="Resources"
                      size="lg"
                      ref={anchorRef}
                      selected={location.pathname === "/resource"}
                      iconEnd="arrow-down"
                      onClick={() => setOpen((s) => !s)}
                      color="white"
                    />

                    <Link to="/pricing" prefetch="intent">
                      <Button
                        color="white"
                        text="Pricing"
                        size="lg"
                        selected={location.pathname === "/pricing"}
                      />
                    </Link>
                  </ButtonGroup>
                )}
                {rootData?.user?.id ? (
                  <Link to="/" prefetch="intent">
                    <Button text="Account" size="lg" color="white" />
                  </Link>
                ) : (
                  <Flex gap={4}>
                    <Link to="/login" prefetch="intent">
                      <Button
                        text="Login"
                        size="lg"
                        color="white"
                        selected={location.pathname === "/login"}
                      />
                    </Link>
                    <Link to="/signup" prefetch="intent">
                      <Button
                        text="Signup"
                        size="lg"
                        color="red"
                        selected={location.pathname === "/signup"}
                      />
                    </Link>
                    <Box />
                  </Flex>
                )}
              </Flex>

              {open && (
                <Dropdown
                  anchor={anchorRef.current}
                  id="resource dropdown"
                  onDismiss={() => setOpen(false)}
                >
                  {/* <Dropdown.Link
            href="https://bespokesurf.freshdesk.com/support/home"
            option={{ value: "help", label: "Help Center" }}
            isExternal
          /> */}

                  <Dropdown.Link
                    href="https://feedback.bespoke.surf/changelog"
                    option={{ value: "help", label: "See What's New" }}
                    isExternal
                  />
                  <Dropdown.Link
                    href="https://feedback.bespoke.surf/feature-requests"
                    option={{ value: "help", label: "Feature request" }}
                    isExternal
                  />

                  <Dropdown.Link
                    href="https://feedback.bespoke.surf/integrations"
                    option={{ value: "help", label: "Integration request" }}
                    isExternal
                  />

                  <Dropdown.Link
                    href="mailto:support@bespoke.surf"
                    option={{ value: "contact", label: "Email Us" }}
                  />
                </Dropdown>
              )}
            </Box>
          </BigContainer>
        </Box>
      </Sticky>
      <Box display="none" smDisplay="block">
        <BigContainer>
          <Box
            dangerouslySetInlineStyle={{
              __style: { border: "0.5px solid black" },
            }}
          />
        </BigContainer>
      </Box>
    </>
  );
}
