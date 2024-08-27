import urlcat, { ParamMap } from "urlcat";

export const saveAs = (blob: Blob, fileName: string) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  window.URL.revokeObjectURL(url);
};

export const apiUrl = (baseTemplate: string, params: ParamMap) => {
  const url = baseTemplate.replace(/{([a-zA-Z0-9_-]+)}/g, ":$1");
  return urlcat(url, params) as string;
};

export const downloadUrl = (path: string, params: ParamMap) => {
  return apiUrl(path, { format: "csv", ...params });
};
