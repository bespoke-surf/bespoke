import type { HtmlExport } from "react-email-editor";
import type { SignupFormData } from "../../graphql/__generated__/graphql";

export const addFormData = (data: unknown): SignupFormData | null => {
  const { chunks, design, html } = data as HtmlExport & {
    chunks: {
      body: string;
      css: string;
      js: string;
      fonts: { url: string }[];
    };
  };

  let fonts = "";

  chunks.fonts.forEach(({ url }) => {
    if (url !== "") {
      fonts = fonts.concat(
        `<link href=${url} rel="stylesheet" type="text/css" >`
      );
    }
  });
  return {
    body: chunks.body,
    css: chunks.css,
    fonts: fonts,
    js: chunks.js,
    design: JSON.stringify(JSON.stringify(design)),
    html: html,
  };
};
