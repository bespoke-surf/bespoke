import type { AutomationActionData } from "./types";
import { AutomationWorkflowIndexActionEnum } from "./types";

import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

import { sdk } from "../../graphql/graphqlWrapper.server";
import type {
  DelayTypeEnum,
  MetricType,
  WorkflowFlowFilterInput,
  WorkflowTriggerFilterInput,
} from "../../graphql/__generated__/graphql";
import { FlowFilterShcema } from "./flowFilterTypes";
import { TriggerFilterSchema } from "./triggerFilterTypes";

export async function action({ params, request }: ActionArgs) {
  const formData = await request.formData();

  const workflowId = params.workflowId as string;

  const action = formData.get("_action") as string;

  if (action === AutomationWorkflowIndexActionEnum.createListTrigger) {
    const listId = formData.get("listId") as string;
    await sdk.CreateListTrigger(
      {
        listId,
        workflowId,
      },
      {
        request,
      }
    );
    return json<AutomationActionData>({
      flushState: true,
    });
  }
  if (action === AutomationWorkflowIndexActionEnum.createMetricTrigger) {
    const metricType = formData.get("metricType") as MetricType;
    await sdk.CreateMetricTrigger(
      {
        metricType,
        workflowId,
      },
      {
        request,
      }
    );
    return json<AutomationActionData>({
      flushState: true,
    });
  }

  if (action === AutomationWorkflowIndexActionEnum.updateListTrigger) {
    const listId = formData.get("listId") as string;
    const workflowStateId = formData.get("workflowStateId") as string;

    await sdk.UpdateListTrigger(
      {
        listId,
        workflowStateId,
      },
      {
        request,
      }
    );
    return json<AutomationActionData>({
      flushState: true,
    });
  }
  if (action === AutomationWorkflowIndexActionEnum.updateMetricTrigger) {
    const metricType = formData.get("metricType") as MetricType;
    const workflowStateId = formData.get("workflowStateId") as string;

    await sdk.UpdateMetricTrigger(
      {
        metricType,
        workflowStateId,
      },
      {
        request,
      }
    );
    return json<AutomationActionData>({
      flushState: true,
    });
  }

  if (action === AutomationWorkflowIndexActionEnum.createNewDalayNode) {
    const workflowStateId = formData.get("workflowStateId") as string;
    const delayType = formData.get("delayType") as string;
    const delayInMilliseconds = formData.get("delayInMilliseconds") as string;
    const otherWise = formData.get("otherWise") as string;

    await sdk.CreateNewDelayNode(
      {
        input: {
          workflowId,
          workflowStateId,
          delayInMilliseconds: Number(delayInMilliseconds),
          delayType,
          otherWise: otherWise === "true" ? true : false,
        },
      },
      {
        request,
      }
    );
  }

  if (action === AutomationWorkflowIndexActionEnum.updateDelayState) {
    const workflowStateId = formData.get("workflowStateId") as string;
    const delayType = formData.get("delayType") as DelayTypeEnum;
    const delayInMilliseconds = formData.get("delayInMilliseconds") as string;

    await sdk.UpdateDelayState(
      {
        input: {
          delayInMilliseconds: Number(delayInMilliseconds),
          workflowStateId,
          delayType,
        },
      },
      { request }
    );
  }

  if (action === AutomationWorkflowIndexActionEnum.deleteWorkflowNode) {
    try {
      const workflowStateId = formData.get("workflowStateId") as string;
      await sdk.DeleteWorkflowNode(
        {
          workflowStateId,
        },
        { request }
      );
    } catch (err) {
      console.log(err);
    }
  }

  if (action === AutomationWorkflowIndexActionEnum.createNewConnection) {
    const sourceId = formData.get("sourceId") as string;
    const targetId = formData.get("targetId") as string;
    const otherWise = formData.get("otherWise") as string;

    await sdk.CreateNodeConnection(
      {
        sourceId,
        targetId,
        workflowId,
        otherWise: otherWise === "true" ? true : false,
      },
      {
        request,
      }
    );
  }

  if (action === AutomationWorkflowIndexActionEnum.createSendEmailNode) {
    const workflowStateId = formData.get("workflowStateId") as string;
    const html = formData.get("html") as string;
    const design = formData.get("design") as string;
    const subject = formData.get("subject") as string;
    const otherWise = formData.get("otherWise") as string;
    const type = formData.get("type") as string;

    await sdk.CreateSendEmailNode(
      {
        input: {
          type,
          workflowId,
          workflowStateId,
          design,
          html,
          subject,
          otherWise: otherWise === "true" ? true : false,
        },
      },
      { request }
    );
  }

  if (action === AutomationWorkflowIndexActionEnum.updateSendEmailState) {
    const workflowStateId = formData.get("workflowStateId") as string;
    const html = formData.get("html") as string;
    const design = formData.get("design") as string;
    const subject = formData.get("subject") as string;
    const type = formData.get("type") as string;

    await sdk.UpdateSendEmailState(
      {
        input: {
          workflowStateId,
          design,
          html,
          subject,
          type,
        },
      },
      { request }
    );
  }

  if (action === AutomationWorkflowIndexActionEnum.updateFlowFilter) {
    const jsonFlowfilter = formData.get("flowFilter") as string;
    const flowFilter = JSON.parse(
      jsonFlowfilter
    ) as WorkflowFlowFilterInput[][];

    await FlowFilterShcema.validate({ flowFilter });

    // const validator = withYup(FlowFilterShcema);
    // const result = await validator.validate(flowFilter);

    // if (result.error) {
    //   return validationError(result.error);
    // }

    await sdk.UpdateFlowFilter(
      {
        input: {
          workflowId,
          flowFilter,
        },
      },
      { request }
    );
  }

  if (action === AutomationWorkflowIndexActionEnum.updateTriggerFilter) {
    const jsonFlowfilter = formData.get("triggerFilter") as string;
    const triggerFilter = JSON.parse(
      jsonFlowfilter
    ) as WorkflowTriggerFilterInput[][];

    await TriggerFilterSchema.validate({ triggerFilter });

    // const validator = withYup(FlowFilterShcema);
    // const result = await validator.validate(triggerFilter);

    // console.log({ result });

    // if (result.error) {
    //   return validationError(result.error);
    // }

    await sdk.UpdateTriggerFilter(
      {
        input: {
          workflowId,
          triggerFilter,
        },
      },
      { request }
    );
  }

  if (action === AutomationWorkflowIndexActionEnum.createConditionalSplitNode) {
    try {
      const workflowStateId = formData.get("workflowStateId") as string;
      const jsoFlowFilter = formData.get("flowFilter") as string;
      const otherWise = formData.get("otherWise") as string;

      const flowFilter = JSON.parse(jsoFlowFilter);

      await FlowFilterShcema.validate({ flowFilter });

      await sdk.createConditionalSplitNode(
        {
          input: {
            workflowStateId,
            workflowId,
            flowFilter,
            otherWise: otherWise === "true" ? true : false,
          },
        },
        { request }
      );
    } catch (err) {
      console.log(err);
    }
  }

  if (action === AutomationWorkflowIndexActionEnum.createTriggerSplitNode) {
    try {
      const workflowStateId = formData.get("workflowStateId") as string;
      const jsoFlowFilter = formData.get("triggerFilter") as string;
      const otherWise = formData.get("otherWise") as string;

      const triggerFilter = JSON.parse(jsoFlowFilter);

      await TriggerFilterSchema.validate({ triggerFilter });

      await sdk.createTriggerSplitNode(
        {
          input: {
            workflowStateId,
            workflowId,
            triggerFilter,
            otherWise: otherWise === "true" ? true : false,
          },
        },
        { request }
      );
    } catch (err) {
      console.log(err);
    }
  }

  if (action === AutomationWorkflowIndexActionEnum.deleteWorkflowTransition) {
    const workflowTransitionId = formData.get("workflowTransitionId") as string;

    await sdk.DeleteWorkflowTransition(
      {
        workflowId,
        workflowTransitionId,
      },
      { request }
    );
  }

  if (action === AutomationWorkflowIndexActionEnum.updateConditionalSplit) {
    const workflowStateId = formData.get("workflowStateId") as string;
    const jsoFlowFilter = formData.get("flowFilter") as string;
    const flowFilter = JSON.parse(jsoFlowFilter);

    await FlowFilterShcema.validate({ flowFilter });

    await sdk.UpdateConditionalSplitState(
      {
        input: {
          flowFilter,
          workflowStateId,
        },
      },
      { request }
    );
  }

  if (action === AutomationWorkflowIndexActionEnum.updateTriggerSplitState) {
    const workflowStateId = formData.get("workflowStateId") as string;
    const jsonFilter = formData.get("triggerFilter") as string;
    const triggerFilter = JSON.parse(jsonFilter);

    await TriggerFilterSchema.validate({ triggerFilter });

    await sdk.UpdateTriggerSplitState(
      {
        input: {
          triggerFilter,
          workflowStateId,
        },
      },
      { request }
    );
  }

  return null;
}
