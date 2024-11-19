import {
  excelExtMap,
  imageExtMap,
  isCsv,
  isDocument,
  isExcel,
  isImage,
  isPdf,
  isPowerPoint,
  isSupportedFile,
  isValidMimeType,
  isVideo,
  isWord,
  powerPointExtMap,
  videoExtMap,
  wordExtMap,
} from "./internal/file";
import { SupportedUnit, formatToUnit } from "./number";

export {
  isCsv,
  isDocument,
  isExcel,
  isImage,
  isPdf,
  isPowerPoint,
  isSupportedFile,
  isVideo,
  isWord,
};

export const byteTo = (size: number, unit: "MiB" | "KiB" | "GiB" = "MiB") => {
  switch (unit) {
    case "MiB":
      return size * 1024 * 1024;
    case "KiB":
      return size * 1024;
    case "GiB":
      return size * 1024 * 1024 * 1024;
    default:
      return size;
  }
};

export const formatFileSize = (
  size: number,
  unit: "MiB" | "KiB" | "B" | "GiB" = "MiB",
) => {
  let intlUnit: SupportedUnit;
  switch (unit) {
    case "MiB":
      intlUnit = "megabyte";
      break;
    case "KiB":
      intlUnit = "kilobyte";
      break;
    case "GiB":
      intlUnit = "gigabyte";
      break;
    default:
      intlUnit = "byte";
      break;
  }
  return formatToUnit(size, intlUnit);
};

/**
 * The function `getMimeExtension` takes a MIME type as input and returns the corresponding file
 * extension based on the type of content.
 * @param {string} mimeType - The `mimeType` parameter is a string that represents the type of media
 * content, such as images, videos, documents, etc. It typically follows the format "type/subtype",
 * where the type indicates the general category of the content (e.g., image, video) and the subtype
 * provides more
 * @returns The function `getMimeExtension` returns a string value, which is the file extension
 * corresponding to the provided MIME type. If the MIME type is not valid or recognized, an empty
 * string is returned.
 */
export const getMimeExtension = (mimeType: string): string => {
  if (!isValidMimeType(mimeType)) {
    return "";
  }
  if (isImage(mimeType)) {
    return imageExtMap[mimeType];
  }
  if (isExcel(mimeType)) {
    return excelExtMap[mimeType];
  }
  if (isPowerPoint(mimeType)) {
    return powerPointExtMap[mimeType];
  }
  if (isWord(mimeType)) {
    return wordExtMap[mimeType];
  }
  if (isVideo(mimeType)) {
    return videoExtMap[mimeType];
  }

  return mimeType.split("/")[1] || "";
};

/**
 * The function `getFileExtension` takes a file name as input and returns the file extension.
 * @param {string} fileName - A string representing the name of a file, including its extension.
 * @returns The function `getFileExtension` returns the file extension of the given `fileName` by
 * splitting the string at the "." character and returning the last element in the resulting array.
 */
export const getFileExtension = (fileName: string) => {
  return fileName.split(".").pop();
};
