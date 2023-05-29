import type { BaseTextColorType } from "gestalt";
import { Box, Flex, Icon, Text } from "gestalt";
import { useMemo } from "react";
import type {
  ChallengeFragment,
  StoreChallengeFragment,
} from "../../graphql/__generated__/graphql";
import { endOfDay } from "./endOfDay";
import { aDayToWeekEnd, endOfWeek } from "./endOfWeek";

const ClockComponent = ({ time }: { time: string }) => {
  return (
    <Flex.Item flex="grow">
      <Box>
        <Flex alignItems="center" gap={1}>
          <Icon
            color="warning"
            accessibilityLabel="clock"
            icon="clock"
            size={24}
          />
          <Text size="300" weight="bold" color="warning">
            {time}
          </Text>
        </Flex>
      </Box>
    </Flex.Item>
  );
};

export const Challenge = ({
  data,
  storeChallenge,
  type,
}: {
  data: ChallengeFragment;
  storeChallenge?: StoreChallengeFragment;
  type?: "day" | "week";
}) => {
  const { completionCount, completionStages, name } = data;

  const clock = useMemo(() => {
    if (type === "week") {
      return aDayToWeekEnd() ? (
        <ClockComponent time={endOfWeek(false)} />
      ) : null;
    }
    if (type === "day") {
      return <ClockComponent time={endOfDay(false)} />;
    }
    return null;
  }, [type]);

  const allCompleted = storeChallenge?.allCompleted;

  const textColor: BaseTextColorType = allCompleted ? "light" : "dark";
  const hasStages = completionStages > 1;

  return (
    <>
      <Box
        marginTop={4}
        borderStyle="shadow"
        rounding={3}
        padding={6}
        color={allCompleted ? "successBase" : "default"}
      >
        <Flex direction="row" justifyContent="between" alignItems="center">
          <Flex flex="grow" gap={3} direction="column">
            <Flex justifyContent="between" gap={2} alignItems="center">
              {allCompleted || type === undefined ? null : clock}
              <Box>
                {allCompleted ? (
                  <>
                    <Text inline color={textColor} size="200">
                      All
                    </Text>
                    <Text inline color={textColor} size="200">
                      {" "}
                      stages
                    </Text>
                  </>
                ) : (
                  <>
                    <Text
                      size="200"
                      weight="bold"
                      inline
                      color={
                        allCompleted
                          ? textColor
                          : (storeChallenge?.completedCount ?? 0) > 0
                          ? "success"
                          : "subtle"
                      }
                    >
                      {storeChallenge?.completedCount ?? 0}{" "}
                    </Text>
                    <Text size="200" weight="bold" inline color={textColor}>
                      / {completionCount}
                    </Text>
                  </>
                )}
                <Text inline size="200" color={textColor}>
                  {" "}
                  completed
                </Text>
              </Box>
            </Flex>
            <Flex gap={2} alignItems="start" direction="column">
              <Text size="400" weight="bold" color={textColor}>
                {hasStages
                  ? `Stage ${
                      Number(storeChallenge?.completedStages ?? 0) +
                      (allCompleted ? 0 : 1)
                    } of ${completionStages} - `
                  : null}{" "}
                {name}
              </Text>
            </Flex>
          </Flex>
          {allCompleted ? (
            <Icon
              size={40}
              icon="check-circle"
              accessibilityLabel="check"
              color="success"
            />
          ) : null}
        </Flex>
      </Box>
    </>
  );
};
