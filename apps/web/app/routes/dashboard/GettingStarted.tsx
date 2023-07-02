import { Box, Button, Flex, Icon, IconButton, Status, Text } from "gestalt";
import { useMemo, useReducer } from "react";
import { useCarousel } from "use-carousel-hook";
import type { GettingStartedResponse } from "../../graphql/__generated__/graphql";

export default function GettingStarted({
  gettingStartedData,
}: {
  gettingStartedData: GettingStartedResponse[] | null | undefined;
}) {
  const [open, toggleOpen] = useReducer((s) => !s, false);
  const { ref, previous, next, position } = useCarousel<HTMLDivElement>();

  const completedTaks = useMemo(
    () => gettingStartedData?.filter(({ completed }) => completed === true),
    [gettingStartedData]
  );
  const uncompletedTask = useMemo(
    () => gettingStartedData?.filter(({ completed }) => completed === false),
    [gettingStartedData]
  );

  return (
    <Box color="infoWeak" padding={6} rounding={4}>
      <Flex justifyContent="between" alignItems="center" gap={2}>
        <Flex.Item flex="grow">
          <Flex direction="column" gap={1}>
            <Text size="500">Get started with Bespoke</Text>
            {open && (
              <Text size="200">
                Complete a few tasks to get the most out of your Bespoke account
              </Text>
            )}
          </Flex>
        </Flex.Item>
        {!open && (
          <Box
            display="none"
            smDisplay="none"
            mdDisplay="block"
            lgDisplay="block"
          >
            {uncompletedTask?.length && uncompletedTask.length > 0 ? (
              <Button
                text={
                  taskData.find(
                    ({ type }) => type === uncompletedTask?.[0]?.type
                  )?.buttonText ?? ""
                }
                color="white"
                size="lg"
                href={
                  taskData.find(
                    ({ type }) => type === uncompletedTask?.[0]?.type
                  )?.link ?? ""
                }
                role="link"
              />
            ) : (
              <Status type="ok" title="Completed" />
            )}
          </Box>
        )}
        <IconButton
          size="lg"
          accessibilityLabel="lists"
          icon={open ? "arrow-up" : "arrow-down"}
          onClick={toggleOpen}
        />
      </Flex>
      {open && (
        <>
          <Box marginTop={4} />
          <Flex alignItems="stretch" justifyContent="end" gap={2}>
            <IconButton
              accessibilityLabel="back"
              icon="directional-arrow-left"
              onClick={() => previous()}
              size="sm"
              disabled={position.isAtStart ? true : false}
              bgColor="white"
            />
            <IconButton
              accessibilityLabel="next"
              icon="directional-arrow-right"
              onClick={() => next()}
              size="sm"
              bgColor="white"
              disabled={position.isAtEnd ? true : false}
            />
          </Flex>
          <Box
            marginTop={2}
            display="flex"
            overflow="hidden"
            position="relative"
            width="100%"
            ref={ref}
          >
            {taskData.map((data) => (
              <Task
                completed={
                  gettingStartedData?.find(({ type }) => type === data.type)
                    ?.completed
                }
                {...data}
                key={data.title}
              />
            ))}
          </Box>

          <Box marginTop={8}>
            <Text size="200">
              {completedTaks?.length ?? 0}
              /4 tasks completed
            </Text>
          </Box>
        </>
      )}
    </Box>
  );
}

interface ITask {
  title: string;
  description: string;
  buttonText: string;
  type: GettingStartedResponse["type"];
  link: string;
}

const taskData: ITask[] = [
  {
    title: "Upload a prodcut",
    description:
      "Upload a product so you can insert products in your newsletter to be displayed",
    buttonText: "Upload product",
    type: "product",
    link: "/products",
  },
  {
    title: "Publish a newsletter",
    description: "Write a newsletter post and publish right here in bespoke",
    buttonText: "Publish newsletter",
    type: "post",
    link: "/",
  },
  {
    title: "Display a sign-up form",
    description:
      "Create a sign-up from and add code snippet to your website to sign up subscribers to a list",
    buttonText: "Create sign-up form",
    type: "form",
    link: "/signup-forms",
  },
  {
    title: "Automate welcome series",
    description:
      "Create a welcome series to new subscribers triggered when added to a list",
    buttonText: "Add automation",
    type: "automation",
    link: "/automations",
  },
];
const Task = ({
  buttonText,
  description,
  title,
  completed,
  link,
}: ITask & { completed?: boolean }) => {
  return (
    <Box
      marginEnd={4}
      rounding={5}
      color="light"
      padding={8}
      minWidth={276}
      height={336}
      borderStyle="shadow"
    >
      <Flex
        direction="column"
        justifyContent={completed ? "evenly" : "between"}
        flex="grow"
        height="100%"
        alignItems="center"
      >
        {completed && (
          <Flex direction="column" gap={1} alignItems="center">
            <Icon
              accessibilityLabel=""
              icon="check-circle"
              color="success"
              size={40}
            />
            <Text color="subtle" size="200">
              Success
            </Text>
          </Flex>
        )}
        <Text weight="bold" align="center">
          {title}
        </Text>
        <Text align="center">{description}</Text>
        {!completed && (
          <Box>
            <Button
              href={link}
              role="link"
              text={buttonText}
              fullWidth={false}
              size="md"
            />
          </Box>
        )}
      </Flex>
    </Box>
  );
};
