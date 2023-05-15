import { useFetcher } from "@remix-run/react";
import { Box, Flex, Icon, Text } from "gestalt";
import { useCallback, useContext, useMemo } from "react";
import type { NodeProps } from "reactflow";
import { Handle, Position } from "reactflow";
import type { WorkflowNode } from "../../../graphql/__generated__/graphql";
import type { PostData } from "../../post.$postId/types";
import DeleteNodeModel from "../components/DeleteNodeModal";
import NodeOptions from "./common/NodeOptions";
import NodeSettings from "./common/NodeSettings";
import { FlowFilterDetails } from "./common/triggerDetails/FlowFilterDetails";
import { NodeOptionContext } from "./NodeOptionProvider";

export default function ConditionalSplitNode({
  data,
  isConnectable,
}: NodeProps<WorkflowNode["data"]>) {
  const { state, update } = useContext(NodeOptionContext);
  const fetcher = useFetcher<PostData>();

  const isCurrentNode = state?.nodeId === data.id;
  const isThenOptionOpen = isCurrentNode && state?.openThenOptons;
  const isOtherWiseOptionsOpen = isCurrentNode && state?.openOtherWiseOptions;
  const isSettingsOpen = isCurrentNode && state?.openSettings;
  const isDeleteOpen = isCurrentNode && state?.openDelete;

  const subjectError =
    fetcher.data && fetcher.data?.post?.title === "Subject...";
  const postBodyMissing =
    fetcher.data && typeof fetcher.data?.post?.bodyLexical !== "string";

  const handleThenOptionsClick = useCallback(() => {
    if (isThenOptionOpen) {
      update(null);
    } else {
      update({
        ...state,
        nodeId: data.id,
        openThenOptons: true,
        openOtherWiseOptions: false,
      });
    }
  }, [data.id, isThenOptionOpen, state, update]);

  const handleOtherwiseOptionClick = useCallback(() => {
    if (isOtherWiseOptionsOpen) {
      update(null);
    } else {
      update({
        ...state,
        nodeId: data.id,
        openOtherWiseOptions: true,
        openThenOptons: false,
      });
    }
  }, [data.id, isOtherWiseOptionsOpen, state, update]);

  const handleDeleteClose = useCallback(() => {
    update({
      nodeId: data.id,
      openDelete: false,
      openThenOptons: state?.openThenOptons,
      openSettings: state?.openSettings,
    });
  }, [data.id, state?.openThenOptons, state?.openSettings, update]);

  const filterDetail = useMemo(
    () =>
      data.value.__typename === "WorkflowStateConditionalSplitActivityValue" &&
      data.value?.flowFilter?.map((flowfilter, parentIndex) =>
        flowfilter?.map((filter, index) => (
          <Box key={filter.condition ?? "" + index}>
            {parentIndex !== 0 && (
              <Box marginBottom={2}>
                <Flex alignItems="center">
                  <Box marginEnd={1}>
                    <Text color="subtle" size="100">
                      And
                    </Text>
                  </Box>
                  <Box
                    height="0.1px"
                    dangerouslySetInlineStyle={{
                      __style: {
                        borderTop: "0.1px solid #767676",
                      },
                    }}
                    width="100%"
                  />
                  <hr />
                </Flex>
              </Box>
            )}
            {index !== 0 && (
              <Box marginBottom={1} marginTop={-1}>
                <Text size="100" color="subtle">
                  OR
                </Text>
              </Box>
            )}

            <FlowFilterDetails filter={filter} />
          </Box>
        ))
      ),
    [data.value]
  );

  return (
    <Box position="relative">
      <Box
        dangerouslySetInlineStyle={{
          __style: {
            boxShadow:
              "0 0 0.25rem rgba(0,0,0,.1),0 0.5rem 2.5rem rgba(0,0,0,.2)",
            padding: 15,
            width: "16.25rem",
            borderRadius: 4,
            backgroundColor: "#FFFFFF",
            border:
              postBodyMissing || subjectError ? `1px solid #E60023` : undefined,
          },
        }}
      >
        <Handle
          type="target"
          position={Position.Left}
          style={{
            bottom: "auto",
            top: 23,
            width: 20,
            height: 20,
            background: "#E60023",
            marginLeft: "-0.5rem",
            zIndex: 10,
          }}
          isConnectable={isConnectable}
        />
        <Flex direction="column" gap={2}>
          <Box marginStart={2}>
            <Flex justifyContent="between">
              <Text size="300" color="subtle">
                Conditional Split
              </Text>
              <Icon
                accessibilityLabel="lightning"
                icon="lightning-bolt-circle"
                color="dark"
                size={20}
              />
            </Flex>
          </Box>

          <Box
            dangerouslySetInlineStyle={{
              __style: {
                backgroundColor: "#f6f6f7",
              },
            }}
            padding={2}
            marginBottom={4}
            marginTop={2}
          >
            {data.value.__typename ===
            "WorkflowStateConditionalSplitActivityValue" ? (
              <>{filterDetail}</>
            ) : undefined}
          </Box>

          <Box marginEnd={2}>
            <Flex justifyContent="end" alignItems="center">
              <Text align="end" weight="bold" size="300" color="subtle">
                Otherwise
              </Text>
            </Flex>
          </Box>
          <Box marginEnd={2} marginTop={4}>
            <Flex justifyContent="end" alignItems="center">
              <Text align="end" weight="bold" size="300" color="subtle">
                Then
              </Text>
            </Flex>
          </Box>
        </Flex>

        <Handle
          type="source"
          position={Position.Right}
          onClick={handleOtherwiseOptionClick}
          id="b"
          style={{
            bottom: 54,
            top: "auto",
            width: 23,
            height: 23,
            background: "black",
            marginRight: "-0.5rem",
            backgroundImage: "url('../plusIcon.svg')",
            backgroundPosition: "50%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "80%",
            cursor: "pointer",
            transform: `rotate(${isOtherWiseOptionsOpen ? "45" : "90"}deg)`,
          }}
          isConnectable={isConnectable}
        />
        <Handle
          type="source"
          position={Position.Right}
          onClick={handleThenOptionsClick}
          id="a"
          style={{
            bottom: 12,
            top: "auto",
            width: 23,
            height: 23,
            marginRight: "-0.5rem",
            background: "#E60023",
            backgroundImage: "url('../plusIcon.svg')",
            backgroundPosition: "50%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "80%",
            cursor: "pointer",

            transform: `rotate(${isThenOptionOpen ? "45" : "90"}deg)`,
          }}
          isConnectable={isConnectable}
        />
      </Box>
      {isThenOptionOpen && <NodeOptions data={data} />}
      {isOtherWiseOptionsOpen && <NodeOptions data={data} />}
      {isSettingsOpen && <NodeSettings data={data} />}
      {isDeleteOpen && (
        <DeleteNodeModel close={handleDeleteClose} data={data} />
      )}
    </Box>
  );
}
