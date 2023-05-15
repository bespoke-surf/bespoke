import playgourndCss from "@bespoke/common/dist/index.css";
import type { LinksFunction } from "@remix-run/node";
import eidtorCss from "../../components/editor/editor.css";
import editorTextAreaCss from "../../components/editor/editorTextArea.css";

import { links as editorLinks } from "../../components/Editor";
export const links: LinksFunction = () => {
  return [
    ...editorLinks(),
    {
      rel: "stylesheet",
      href: eidtorCss,
    },
    {
      rel: "stylesheet",
      href: editorTextAreaCss,
    },
    {
      rel: "stylesheet",
      href: playgourndCss,
    },
  ];
};
