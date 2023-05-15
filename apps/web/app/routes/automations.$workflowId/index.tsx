import type { ActionArgs, MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { Box, Layer } from "gestalt";
import { sdk } from "../../graphql/graphqlWrapper.server";
import type { RootData } from "../../root";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import { NodeOptionProvider } from "../automations.$workflowId.index/nodes/NodeOptionProvider";
import { NodeSheetProvider } from "../automations.$workflowId.index/sheets/NodeSheetProvider";
import WorkflowBar from "./component/WorkflowBar";
import { loader } from "./loader.server";
import type { AutomationWorkflowData } from "./types";
import { AutomationWorkflowActionEnum } from "./types";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};
export { loader };

export async function action({ params, request }: ActionArgs) {
  const formData = await request.formData();

  const workflowId = params.workflowId as string;

  const action = formData.get("_action") as string;

  if (action === AutomationWorkflowActionEnum.updateWorkflowName) {
    const name = formData.get("name") as string;
    await sdk.UpdateWorkflowName(
      {
        name,
        workflowId,
      },
      {
        request,
      }
    );
  }
  if (action === AutomationWorkflowActionEnum.turnOnWorkflow) {
    await sdk.TurnOnWorkflow(
      {
        workflowId,
      },
      { request }
    );
  }

  if (action === AutomationWorkflowActionEnum.turnOffWorkflow) {
    await sdk.TurnOffWorkflow(
      {
        workflowId,
      },
      { request }
    );
  }
  return null;
}

export const meta: MetaFunction = ({ parentsData, data }) => {
  const rootData = parentsData.root as RootData;
  const loaderDAta = data as AutomationWorkflowData;

  return {
    title: `${loaderDAta.workflow?.name} - Automation | ${rootData.store?.name}`,
    description: `${loaderDAta.workflow?.name} automation`,
  };
};

export default function AutomationEditor() {
  return (
    <Layer>
      <Box
        dangerouslySetInlineStyle={{ __style: { backgroundColor: "#f1f2f3" } }}
        position="fixed"
        top
        left
        right
        bottom
        display="flex"
        direction="column"
      >
        <NodeSheetProvider>
          <NodeOptionProvider>
            <WorkflowBar />
            <Outlet />
          </NodeOptionProvider>
        </NodeSheetProvider>
      </Box>
    </Layer>
  );
}
