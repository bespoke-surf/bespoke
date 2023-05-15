import type { DropdownOption } from "gestalt";
import { Button, Dropdown } from "gestalt";
import type { ElementFormatType, LexicalEditor } from "lexical";
import {
  FORMAT_ELEMENT_COMMAND,
  INDENT_CONTENT_COMMAND,
  OUTDENT_CONTENT_COMMAND,
} from "lexical";
import { NewPostLayerZIndex } from "../../../../routes/index/reader/zIndex";

import { useEffect, useRef, useState } from "react";

const formatTypeToLabel = {
  left: "Left Align",
  center: "Center Align",
  right: "Right Align",
  justify: "Justify Align",
  end: "End Align",
  start: "Start Align",
};

export default function Align({
  activeEditor,
  formatType,
}: {
  activeEditor: LexicalEditor;
  formatType: ElementFormatType;
}): JSX.Element {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const label =
    Object.entries(formatTypeToLabel).find(
      ([key]) => key === formatType
    )?.[1] ?? "";
  const [selected, setSelected] = useState<DropdownOption | undefined>({
    label: label,
    value: formatType,
  });

  useEffect(() => {
    setSelected({ label: label, value: formatType });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formatType]);

  return (
    <>
      <Button
        accessibilityControls="truncation-dropdown-example"
        accessibilityExpanded={open}
        accessibilityHaspopup
        iconEnd="arrow-down"
        onClick={() => setOpen((prevVal) => !prevVal)}
        ref={anchorRef}
        size="lg"
        color="white"
        selected={open}
        text="Align"
      />
      {open && (
        <Dropdown
          zIndex={NewPostLayerZIndex}
          anchor={anchorRef.current}
          id="truncation-dropdown-example"
          onDismiss={() => setOpen(false)}
        >
          <Dropdown.Item
            onSelect={({ item }) => {
              activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
              setSelected(item);
              setOpen(false);
            }}
            option={{ label: formatTypeToLabel["left"], value: "left" }}
            selected={selected}
          />
          <Dropdown.Item
            option={{ label: formatTypeToLabel["center"], value: "center" }}
            onSelect={({ item }) => {
              activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
              setSelected(item);
              setOpen(false);
            }}
            selected={selected}
          />
          <Dropdown.Item
            onSelect={({ item }) => {
              activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
              setSelected(item);
              setOpen(false);
            }}
            option={{ label: formatTypeToLabel["right"], value: "right" }}
            selected={selected}
          />
          <Dropdown.Item
            onSelect={({ item }) => {
              activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
              setSelected(item);
              setOpen(false);
            }}
            option={{ label: formatTypeToLabel["justify"], value: "justify" }}
            selected={selected}
          />
          <Dropdown.Section label="Intendation">
            <Dropdown.Item
              option={{ label: "Outdent", value: "outdent" }}
              onSelect={({ item }) => {
                activeEditor.dispatchCommand(
                  OUTDENT_CONTENT_COMMAND,
                  undefined
                );

                setSelected(item);
                setOpen(false);
              }}
              selected={selected}
            />
            <Dropdown.Item
              option={{ label: "Indent", value: "indent" }}
              onSelect={({ item }) => {
                activeEditor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
                setSelected(item);
                setOpen(false);
              }}
              selected={selected}
            />
          </Dropdown.Section>
        </Dropdown>
      )}
    </>
  );
}
