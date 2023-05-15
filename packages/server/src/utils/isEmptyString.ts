export const isEmptyString = (string_: string) => {
  return typeof string_ === 'string' && string_.length === 0 ? true : false;
};
