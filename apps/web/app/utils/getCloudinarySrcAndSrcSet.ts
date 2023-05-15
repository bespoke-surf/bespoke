import { CdnType } from "~/graphql/__generated__/graphql";

export interface GetImageSrcAndSrcSet {
  src: string;
  srcSet: string;
  sizes: string;
}

export const getImageSrcAndSrcSet = (
  url: string | undefined | null,
  video = false,
  cdnType?: CdnType
): GetImageSrcAndSrcSet | null => {
  if (!url) return null;
  if (!cdnType || cdnType === CdnType.Cloudinary) {
    let image = url;

    if (video) {
      const uriParts = url.split(".");
      const fileType = uriParts?.[uriParts.length - 1];
      image = url.replace(`${fileType}`, "jpg");
    }

    const n = image.lastIndexOf("upload");
    const start = image.substring(0, n + 7);
    const end = image.substring(n + 6);

    const optimzie = `f_auto,c_limit,q_80`;
    const src = `${start}${optimzie}${end}`;

    const srcSet = `
${start}${optimzie},w_256${end} 256w,
${start}${optimzie},w_512${end} 512w,
${start}${optimzie},w_768${end} 768w,
${start}${optimzie},w_1024${end} 1024w,
${start}${optimzie},w_1280${end} 1280w,
${start}${optimzie},w_1536${end} 1536w,
${start}${optimzie},w_1536${end} 1536w,
${start}${optimzie},w_1792${end} 1792w,
`;

    const sizes = `(max-width: 384px) 256w,
(max-width: 640px) 512w,
(max-width: 896px) 768w,
(max-width: 1152px) 1024w, 100vw`;

    return {
      src,
      srcSet,
      sizes,
    };
  }
  if (cdnType === CdnType.Shopify) {
    let image = url;
    const splitImage = image.split(".");

    const large = splitImage[2] + "_large";
    const medium = splitImage[2] + "_medium";
    const grande = splitImage[2] + "_grande";
    const xxl = splitImage[2] + "_1024x1024";

    splitImage[2] = medium;
    const mediumUrl = splitImage.join(".");

    splitImage[2] = large;
    const largeUrl = splitImage.join(".");

    splitImage[2] = grande;
    const grandeUrl = splitImage.join(".");

    splitImage[2] = xxl;
    const xxlUrl = splitImage.join(".");

    const srcSet = `
${mediumUrl} 256w,
${largeUrl} 512w,
${grandeUrl} 768w,
${xxlUrl} 1024w`;

    const sizes = `(max-width: 384px) 256w,
(max-width: 640px) 512w,
(max-width: 896px) 768w,
(max-width: 1152px) 1024w, 100vw`;

    return {
      src: url ?? "",
      srcSet,
      sizes,
    };
  }
  return null;
};
