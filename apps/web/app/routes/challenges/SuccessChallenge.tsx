import { Box, Flex, Icon, Text } from "gestalt";
import type {
  ChallengeFragment,
  StoreChallengeFragment,
} from "../../graphql/__generated__/graphql";

export const SuccessChallenge = ({
  data,
  storeChallenge,
}: {
  data: ChallengeFragment;
  storeChallenge?: StoreChallengeFragment;
}) => {
  const { completionCount, completionStages, name } = data;

  return (
    <>
      <Box
        marginTop={4}
        borderStyle="shadow"
        rounding={3}
        padding={6}
        opacity={0.5}
      >
        <Flex direction="row" justifyContent="between" alignItems="center">
          <Flex flex="grow" gap={3} direction="column">
            <Flex justifyContent="between" gap={2} alignItems="center">
              <Box>
                <Text size="200" weight="bold" inline>
                  {completionCount}{" "}
                </Text>
                <Text size="200" weight="bold" inline>
                  / {completionCount}
                </Text>
                <Text inline size="200">
                  {" "}
                  completed
                </Text>
              </Box>
            </Flex>
            <Flex gap={2} alignItems="start" direction="column">
              <Text size="400" weight="bold">
                {completionStages > 1
                  ? `Stage ${
                      Number(storeChallenge?.completedStages ?? 0) -
                      1 +
                      (storeChallenge?.allCompleted ? 0 : 1)
                    } of ${completionStages} - `
                  : null}{" "}
                {name}
              </Text>
            </Flex>
          </Flex>
          <Box opacity={0.5}>
            <Icon
              size={25}
              icon="check-circle"
              accessibilityLabel="check"
              color="success"
            />
          </Box>
        </Flex>
      </Box>
    </>
  );
};
