import {
  useFetcher,
  useLoaderData,
  useNavigate,
  useNavigation,
  useParams,
  useRouteLoaderData,
  useSubmit,
  useTransition,
} from "@remix-run/react";
import { useFormikContext } from "formik";
import type { ComboBoxItemType, DropdownOption } from "gestalt";
import {
  Box,
  Button,
  ComboBox,
  CompositeZIndex,
  Dropdown,
  Flex,
  Heading,
  IconButton,
  Layer,
  Link,
  Modal,
  RadioGroup,
  SlimBanner,
  Spinner,
  Text,
} from "gestalt";
import { useCallback, useReducer, useRef, useState } from "react";
import { ContactLimitStatus, PostState } from "~/graphql/__generated__/graphql";
import type { RootData } from "~/root";
import { EDITOR_TOOLBAR_ZINDEX } from "../../components/Editor";
import { useSubscriberList } from "../../components/editor/hooks/useSubscriberList";
import { NewPostLayerZIndex } from "../index/reader/zIndex";
import { PostCheckHandlerActionEnum } from "../post.$postId.check-handler";
import PostURL from "./controls/PostURL";
import type { PostData, PostFormValues, submitStateType } from "./types";
import { PostActionEnum } from "./types";

export default function Controls() {
  const navigation = useNavigation();
  const { setFieldValue, handleSubmit, validateForm } =
    useFormikContext<PostFormValues>();
  const submit = useSubmit();
  const rootLoader = useRouteLoaderData("root") as RootData;
  const loaderData = useLoaderData<PostData>();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<DropdownOption>();
  const [publishModal, togglePublishModal] = useReducer((s) => !s, false);

  const anchorRef = useRef(null);

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const loading =
    navigation.state === "loading" || navigation.state === "submitting";

  const handleOnSelect = useCallback(
    async (item: DropdownOption, state: submitStateType) => {
      setSelected(item);
      if (item.value === "publish-settings") {
        setFieldValue("submitState", "");
        togglePublishModal();
      } else {
        setFieldValue("submitState", state, true);
        await validateForm();
        handleSubmit();
      }
      setOpen(false);
    },
    [handleSubmit, setFieldValue, validateForm]
  );

  const handleSave = useCallback(async () => {
    setFieldValue("submitState", "save");
    await validateForm();
    handleSubmit();
  }, [handleSubmit, setFieldValue, validateForm]);

  const handleDeletePost = useCallback(
    ({ item }: { item: DropdownOption }) => {
      setSelected(item);
      setOpen(false);
      const formData = new FormData();
      formData.append("_action", PostActionEnum.deletePost);
      formData.append(
        "isDraft",
        loaderData.post?.postState === PostState.Draft ? "true" : "false"
      );
      submit(formData, { method: "post" });
    },
    [loaderData.post?.postState, submit]
  );

  if (rootLoader?.isUserSubdomain === false) {
    return null;
  }

  return (
    <>
      <Box marginBottom={2} padding={2}>
        <Flex justifyContent="between" gap={2} alignItems="center">
          {rootLoader?.isUserSubdomain ? (
            <IconButton
              accessibilityLabel="back"
              icon="arrow-back"
              onClick={goBack}
              iconColor="darkGray"
            />
          ) : (
            <Box />
          )}

          <Flex alignItems="center" gap={2}>
            <Button
              text={
                loaderData.post?.postState === PostState.Draft ||
                loaderData.post?.postState === PostState.Unpublish
                  ? "Publish ..."
                  : "Danger zone..."
              }
              color="gray"
              ref={anchorRef}
              iconEnd="arrow-down"
              disabled={loading}
              onClick={() => setOpen((prev) => !prev)}
            />
            <Button
              text={
                loaderData.post?.postState === PostState.Draft
                  ? "Save"
                  : "Update"
              }
              color="red"
              disabled={loading}
              onClick={handleSave}
            />
          </Flex>
        </Flex>
      </Box>

      {open && (
        <Dropdown
          zIndex={NewPostLayerZIndex}
          anchor={anchorRef.current}
          id="post-publish-dropdown"
          idealDirection="down"
          onDismiss={() => {
            setOpen(false);
          }}
        >
          {loaderData.post?.postState === PostState.Draft ||
          loaderData.post?.postState === PostState.Unpublish ? (
            <Dropdown.Section label="Publish">
              <Dropdown.Item
                onSelect={({ item }) =>
                  handleOnSelect(item, "publishToBespoke")
                }
                option={{
                  value: "publish-settings",
                  label: "Publish",
                  subtext: "opens publish setting",
                }}
                selected={selected}
              />
            </Dropdown.Section>
          ) : (
            <></>
          )}

          <Dropdown.Section label="Danger zone">
            {loaderData.post?.postState === PostState.Published ? (
              <Dropdown.Item
                onSelect={({ item }) => handleOnSelect(item, "unpublish")}
                option={{
                  value: "unpublish",
                  label: "Unpublish Post",
                }}
                selected={selected}
              />
            ) : (
              <></>
            )}
            <Dropdown.Item
              onSelect={handleDeletePost}
              option={{
                value: "delete",
                label: "Delete Post",
              }}
              selected={selected}
            />
          </Dropdown.Section>
        </Dropdown>
      )}
      {publishModal && <PublishModal close={togglePublishModal} />}
    </>
  );
}
const modalZIndex = new CompositeZIndex([EDITOR_TOOLBAR_ZINDEX]);
const comboxZIndex = new CompositeZIndex([modalZIndex]);

const PublishModal = ({ close }: { close: () => void }) => {
  const params = useParams<{ postId: string }>();
  const rootData = useRouteLoaderData("root") as RootData;
  const { setFieldValue, handleSubmit, errors, touched, values, handleChange } =
    useFormikContext<PostFormValues>();
  const navigate = useNavigate();
  const fetcher = useFetcher<boolean>();

  const [disablePublish, setDisabledPublish] = useState(false);

  const loaderData = useLoaderData<PostData>();
  const transition = useTransition();

  const loading =
    transition.state === "loading" || transition.state === "submitting";

  const errorMessages =
    touched.imageSrc && errors.imageSrc
      ? errors.imageSrc
      : touched.title && errors.title
      ? errors.title
      : touched.listId && errors.listId
      ? errors.listId
      : undefined;

  const emptyPost =
    touched.bodyHTML && errors.bodyHTML
      ? errors.bodyHTML
      : touched.bodyLexical && errors.bodyLexical
      ? errors.bodyLexical
      : false;

  const { options } = useSubscriberList();
  const [selected, setSelected] = useState<ComboBoxItemType>();

  const handlePublish = useCallback(() => {
    if (fetcher.data === false && values.submitState === "emailBlast") {
      return;
    } else {
      handleSubmit();
    }
  }, [fetcher.data, handleSubmit, values.submitState]);

  const handleSelect = useCallback(
    ({ item }: { item: ComboBoxItemType }) => {
      setSelected(item);
      if (item.value === "create-list") {
        navigate("/subscriber-lists/create-list");
      }
      if (item.value !== "create-list") {
        setFieldValue("listId", item.value);
        if (values.submitState === "emailBlast") {
          const formData = new FormData();
          formData.append(
            "_action",
            PostCheckHandlerActionEnum.checkAbleToSendEmailToList
          );
          formData.append("listId", item.value);
          fetcher.submit(formData, {
            action: `/post/${params.postId}/check-handler?index`,
            method: "post",
          });
        }
      }
    },
    [fetcher, navigate, params.postId, setFieldValue, values.submitState]
  );

  return (
    <Layer zIndex={modalZIndex}>
      <Modal
        accessibilityModalLabel="Resume account creation"
        heading={
          <Flex direction="column" gap={2}>
            <Flex justifyContent="between">
              <Heading size="500" accessibilityLevel={1}>
                Publish Post
              </Heading>

              <IconButton
                accessibilityLabel="Dismiss modal"
                bgColor="white"
                icon="cancel"
                iconColor="darkGray"
                onClick={close}
                size="sm"
              />
            </Flex>

            <SlimBanner
              message="For feature suggestions and requests like scheduled post, hidden post, suggest here"
              type="infoBare"
              iconAccessibilityLabel="info"
              helperLink={{
                href: "https://bespoke.canny.io/feature-requests",
                accessibilityLabel: "feature request page",
                text: "Feature Requests",
                target: "blank",
                onClick: () => undefined,
              }}
            />
          </Flex>
        }
        align="start"
        onDismiss={close}
        footer={
          <Box>
            {loading ? (
              <Flex alignItems="center" justifyContent="end">
                <Spinner accessibilityLabel="loading" show />
              </Flex>
            ) : (
              <Flex
                alignItems="center"
                justifyContent="end"
                gap={{
                  row: 2,
                  column: 0,
                }}
              >
                <Button text="Cancel" onClick={close} size="lg" />
                <Button
                  color="red"
                  text="Publish"
                  size="lg"
                  onClick={handlePublish}
                  disabled={
                    loading ||
                    disablePublish ||
                    rootData?.store?.contactLimitStatus ===
                      ContactLimitStatus.Disallowed ||
                    (values.submitState === "emailBlast" &&
                      fetcher.data === false) ||
                    errorMessages
                      ? true
                      : emptyPost
                      ? true
                      : false
                  }
                />
              </Flex>
            )}
          </Box>
        }
        size="sm"
      >
        <Box paddingX={1} paddingY={1}>
          <Flex gap={{ column: 12, row: 0 }} direction="column">
            <Flex direction="column" gap={{ row: 0, column: 4 }}>
              <Flex direction="column" gap={{ row: 0, column: 2 }}>
                <Text weight="bold">Publishing method</Text>
                <Text size="200" inline>
                  You can publish to a list of subscribers or publish only here
                  as a post.{" "}
                  <Link display="inlineBlock" href="/tools/public-profile">
                    <Text inline underline size="100">
                      See how to view public website
                    </Text>
                  </Link>
                </Text>
              </Flex>
              <RadioGroup
                legend="Choose a method"
                id="directionExample-1"
                errorMessage={
                  values.submitState === "publishToBespoke"
                    ? errorMessages
                    : touched.submitState && errors.submitState
                    ? errors.submitState
                    : undefined
                }
              >
                {loaderData.post?.postState === PostState.Draft && (
                  <RadioGroup.RadioButton
                    checked={values.submitState === "emailBlast"}
                    id="emailBlast"
                    label="Publish to a list"
                    name="submitState"
                    onChange={({ event }) => handleChange(event)}
                    value="emailBlast"
                    disabled={
                      rootData?.store?.contactLimitStatus ===
                      ContactLimitStatus.Disallowed
                    }
                  />
                )}
                <RadioGroup.RadioButton
                  checked={values.submitState === "publishToBespoke"}
                  id="publishToBespoke"
                  label={`Publish only here`}
                  name="submitState"
                  onChange={({ event }) => handleChange(event)}
                  value="publishToBespoke"
                  disabled={
                    rootData?.store?.contactLimitStatus ===
                    ContactLimitStatus.Disallowed
                  }
                />
              </RadioGroup>
              {rootData?.store?.contactLimitStatus ===
                ContactLimitStatus.Disallowed && (
                <SlimBanner
                  message="Unable to publish. Somethings wrong! Head over to Plan."
                  type="error"
                  iconAccessibilityLabel="error"
                  primaryAction={{
                    href: "/plan",
                    label: "Plan",
                    accessibilityLabel: "Plan",
                  }}
                />
              )}

              {values.submitState === "emailBlast" && (
                <ComboBox
                  size="lg"
                  options={options}
                  selectedOption={selected}
                  accessibilityClearButtonLabel="Clear the current value"
                  id="select-list"
                  label="Select a list"
                  noResultText="No results for your selection"
                  placeholder="Select a list to publish"
                  zIndex={comboxZIndex}
                  onSelect={handleSelect}
                  errorMessage={
                    values.submitState === "emailBlast" &&
                    fetcher.data === false
                      ? "Not enough email sends availalbe to send to this list"
                      : values.submitState === "emailBlast"
                      ? errorMessages
                      : undefined
                  }
                />
              )}
              {!errorMessages && emptyPost && (
                <Box marginTop={2}>
                  <SlimBanner
                    message={emptyPost}
                    iconAccessibilityLabel="error"
                    type="error"
                  />
                </Box>
              )}
            </Flex>
            <PostURL setDisablePublish={setDisabledPublish} />
          </Flex>
        </Box>
      </Modal>
    </Layer>
  );
};
