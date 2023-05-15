import { Link } from "@remix-run/react";
import { Box, Dropdown, Flex, Heading, IconButton, Image, Mask } from "gestalt";
import { useRef, useState } from "react";

const PublicMobileNav = ({
  backgroundColor = "white",
  tertiaryButtonColor = "transparent",
}: {
  backgroundColor?: string;
  tertiaryButtonColor?: "transparent" | "transparentWhiteText";
}) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  return (
    <>
      <Box
        paddingY={2}
        paddingX={1}
        display="flex"
        smDisplay="none"
        dangerouslySetInlineStyle={{
          __style: {
            backgroundColor,
          },
        }}
        as="nav"
        justifyContent="between"
        alignItems="center"
      >
        <Link to="/">
          <Flex alignItems="center" gap={2} justifyContent="center">
            <Mask width={50} height={50} rounding="circle">
              <Image
                color="#e60023"
                alt=""
                src="https://res.cloudinary.com/bespoke-cloudinary/image/upload/f_auto,w_512/v1651261766/Group_1_3_vhvfbd.png"
                naturalHeight={512}
                naturalWidth={512}
              />
            </Mask>
            <Heading
              color={tertiaryButtonColor === "transparent" ? "dark" : "light"}
              size="400"
            >
              Bespoke
            </Heading>
          </Flex>
        </Link>
        <IconButton
          accessibilityLabel="menu"
          icon="menu"
          size="lg"
          onClick={() => setOpen((prevVal) => !prevVal)}
          ref={anchorRef}
          selected={open}
          iconColor={
            tertiaryButtonColor === "transparent" ? "darkGray" : "white"
          }
        />
        {open && (
          <Dropdown
            anchor={anchorRef.current}
            id="nav-dropdown"
            onDismiss={() => setOpen(false)}
            zIndex={{ index: () => 100 }}
          >
            <Dropdown.Section label="Bespoke">
              <Dropdown.Link
                href="/pricing"
                option={{
                  value: "pricing",
                  label: "Pricing",
                }}
              />
            </Dropdown.Section>

            <Dropdown.Section label="Resources">
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
            </Dropdown.Section>
          </Dropdown>
        )}
      </Box>
      <Box
        display="flex"
        smDisplay="none"
        dangerouslySetInlineStyle={{
          __style: { border: "0.5px solid black" },
        }}
      />
    </>
  );
};
export default PublicMobileNav;
