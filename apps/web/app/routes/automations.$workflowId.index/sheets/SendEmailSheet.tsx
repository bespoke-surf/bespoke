import { useContext } from "react";
import { NodeSheetContext } from "./NodeSheetProvider";
import SendEmailComplexLayer from "./sendEmailSheet/SendEmailComplexLayer";
import SendEmailSimpleLayer from "./sendEmailSheet/SendEmailSimpleLayer";

export default function SendEmailSheet({ close }: { close: () => void }) {
  const { state } = useContext(NodeSheetContext);

  const simple =
    state?.data?.value?.__typename === "WorkflowStateSendEmailActivityValue" &&
    state.data.value.type === "simple";

  if (simple) {
    return <SendEmailSimpleLayer close={close} />;
  } else {
    return <SendEmailComplexLayer close={close} />;
  }
}
