import {
  useNavigate,
  useNavigation,
  useRouteLoaderData,
  useSubmit,
} from "@remix-run/react";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";
import { useFormik } from "formik";
import {
  Avatar,
  Button,
  Flex,
  Heading,
  Icon,
  TapArea,
  Text,
  TextField,
} from "gestalt";
import { useCallback, useMemo } from "react";
import type { RootData } from "../../root";
import { getCloudinaryAvatar } from "../../utils/getCloudinaryFavicon";
import { SubscribeActionEnum, SubscribeSchema } from "./types";
dayjs.extend(LocalizedFormat);
dayjs.extend(utc);

export default function SubscribeNow() {
  const rootData = useRouteLoaderData("root") as RootData;
  const navigate = useNavigate();
  const submit = useSubmit();
  const navigation = useNavigation();

  const loading =
    (navigation.state === "loading" &&
      navigation.formData?.get("_action") === SubscribeActionEnum.subscribe) ||
    (navigation.state === "submitting" &&
      navigation.formData?.get("_action") === SubscribeActionEnum.subscribe);

  const handleLearnmoreTap = useCallback(() => {
    navigate("/about");
  }, [navigate]);

  const handleSubmit = useCallback(
    (values: { email: string }) => {
      if (!rootData?.store?.id) return;
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("storeId", rootData.store.id);
      formData.append("_action", SubscribeActionEnum.subscribe);
      submit(formData, { method: "post" });
    },
    [submit, rootData?.store?.id]
  );

  const avatar = useMemo(
    () => getCloudinaryAvatar(rootData?.store?.displayPicture?.src),
    [rootData?.store?.displayPicture?.src]
  );

  const formik = useFormik({
    initialValues: { email: "" },
    onSubmit: handleSubmit,
    validationSchema: SubscribeSchema.omit(["storeId", "_action"]),
  });

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      direction="column"
      gap={6}
      height="100vh"
    >
      <Avatar name={rootData?.store?.name ?? ""} src={avatar?.src} size="xl" />
      <Flex direction="column" gap={3}>
        <Heading align="center" size="600">
          {rootData?.store?.name}
        </Heading>
        <Text size="300">{rootData?.store?.about?.about}</Text>
      </Flex>
      <Text size="300" weight="bold">
        Launched on {dayjs(rootData?.store?.createdAt).format("ll")}
      </Text>
      <Flex gap={1}>
        <TextField
          size="lg"
          id="email"
          name="email"
          onChange={({ event }) => formik.handleChange(event)}
          onBlur={({ event }) => formik.handleBlur(event)}
          placeholder="Type your email..."
          errorMessage={
            formik.errors.email && formik.touched.email
              ? formik.errors.email
              : undefined
          }
          disabled={loading}
          value={formik.values.email}
        />
        <Button
          color="red"
          text={loading ? "Loading..." : "Subscribe"}
          size="lg"
          onClick={() => formik.handleSubmit()}
          disabled={loading}
          type="button"
        />
      </Flex>
      <TapArea onTap={handleLearnmoreTap}>
        <Flex alignItems="center" gap={3}>
          <Text weight="bold">Learn more</Text>
          <Icon
            size={12}
            accessibilityLabel="forward"
            icon="arrow-forward"
            color="dark"
          />
        </Flex>
      </TapArea>
    </Flex>
  );
}
