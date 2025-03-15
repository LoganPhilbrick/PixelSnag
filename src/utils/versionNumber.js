export const getVersionNumber = (string) => {
  const regex = /^\d+\.\d+\.\d+.*$/;

  const versionNumber = string
    .split(/[%-]+/)
    .find((item) => regex.test(item))
    .split(".z")[0];

  return versionNumber;
};
