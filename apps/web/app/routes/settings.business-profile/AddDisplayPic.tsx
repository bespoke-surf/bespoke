import { useRouteLoaderData, useTransition } from "@remix-run/react";
import { Avatar, Button, Flex, Spinner, Text } from "gestalt";
import { Suspense, useMemo, useReducer } from "react";
import type { RootData } from "../../root";
import { getCloudinaryAvatar } from "../../utils/getCloudinaryFavicon";
import UpdatePicture from "./addDisplayPic/UpdatePicture";
import { SettingsBuisnessProfileActionEnum } from "./types";

export default function AddDisplayPic() {
  const rootData = useRouteLoaderData("root") as RootData;
  const [open, toggle] = useReducer((s) => !s, false);
  const transition = useTransition();

  const loading =
    transition.submission &&
    transition.submission.formData.get("_action") ===
      SettingsBuisnessProfileActionEnum.updateDisplayPicture;

  const avatar = useMemo(
    () => getCloudinaryAvatar(rootData?.store?.displayPicture?.src),
    [rootData?.store?.displayPicture?.src]
  );

  return (
    <>
      <Flex direction="column" gap={{ column: 1, row: 0 }}>
        <Text size="100">Picture</Text>
        <Flex gap={4} alignItems="center">
          <Avatar
            name={rootData?.store?.name ?? ""}
            src={avatar?.src ?? undefined}
            accessibilityLabel="photo"
            size="lg"
          />
          {loading ? (
            <Spinner accessibilityLabel="loading" show />
          ) : (
            <Button text="Change" onClick={toggle} />
          )}
        </Flex>
      </Flex>
      <Suspense>
        <UpdatePicture close={toggle} open={open} />
      </Suspense>
    </>
  );
}
