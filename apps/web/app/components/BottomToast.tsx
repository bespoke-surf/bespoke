/* eslint-disable gestalt/no-spread-props */
import type { ToastProps } from "gestalt";
import { Box, Layer, Toast } from "gestalt";

export const BottomToast = (
  props: ToastProps & { type: ToastProps["variant"] }
) => {
  return (
    <Layer>
      <Box
        dangerouslySetInlineStyle={{
          __style: {
            bottom: 50,
            left: "50%",
            transform: "translateX(-50%)",
          },
        }}
        fit
        paddingX={1}
        position="fixed"
      >
        <Toast {...props} />
      </Box>
    </Layer>
  );
};
