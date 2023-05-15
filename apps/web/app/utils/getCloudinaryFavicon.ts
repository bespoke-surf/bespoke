export const getCloudinaryFavicons = (
  url: string | undefined | null
): { src: string } | null => {
  if (!url) return null;
  let image = url;

  const n = image.lastIndexOf("upload");
  const start = image.substring(0, n + 7);
  const end = image.substring(n + 6);

  //   const optimzie = `ar_1.0,c_fill,w_150/r_max`;
  const optimzie = `f_auto,ar_1.0,c_fill,w_150/r_max/c_scale,w_100`;
  const src = `${start}${optimzie}${end}`;

  return {
    src,
  };
};

export const getCloudinaryAvatar = (
  url: string | undefined | null
): { src: string } | null => {
  if (!url) return null;
  let image = url;

  const n = image.lastIndexOf("upload");
  const start = image.substring(0, n + 7);
  const end = image.substring(n + 6);

  //   const optimzie = `ar_1.0,c_fill,w_150/r_max`;
  const optimzie = `f_auto,ar_1.0,c_fill,w_400/r_max/c_scale,w_200`;
  const src = `${start}${optimzie}${end}`;

  return {
    src,
  };
};
