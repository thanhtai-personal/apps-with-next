export const CSV_MIME_TYPES = ["text/csv", "application/csv"] as const;
export const EXCEL_MIME_TYPES = [
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
] as const;
export const WORD_MIME_TYPES = [
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
] as const;
export const PDF_MIME_TYPES = ["application/pdf"] as const;
export const IMAGE_MIME_TYPES = [
  "image/png",
  "image/gif",
  "image/jpeg",
  "image/svg+xml",
  "image/webp",
  "image/avif",
] as const;
export const POWERPOINT_MIME_TYPES = [
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.ms-powerpoint",
] as const;
export const VIDEO_MIME_TYPES = [
  "video/mp4",
  "video/mpeg",
  "video/ogg",
  "video/webm",
  "video/3gpp",
  "video/3gpp2",
  "video/quicktime",
  "video/x-msvideo",
  "video/x-ms-wmv",
] as const;

export type ExcelMimeType = (typeof EXCEL_MIME_TYPES)[number];
export type WordMimeType = (typeof WORD_MIME_TYPES)[number];
export type PdfMimeType = (typeof PDF_MIME_TYPES)[number];
export type ImageMimeType = (typeof IMAGE_MIME_TYPES)[number];
export type PowerPointMimeType = (typeof POWERPOINT_MIME_TYPES)[number];
export type VideoMimeType = (typeof VIDEO_MIME_TYPES)[number];
export type CsvMimeType = (typeof CSV_MIME_TYPES)[number];
export type DocumentMimeType =
  | ExcelMimeType
  | WordMimeType
  | PdfMimeType
  | PowerPointMimeType
  | CsvMimeType;

export const isValidMimeType = (
  mimeType: string,
): mimeType is `${string}/${string}` => {
  return mimeType.split("/").length === 2;
};

export const isExcel = (mimeType: string): mimeType is ExcelMimeType => {
  return EXCEL_MIME_TYPES.includes(mimeType as ExcelMimeType);
};

export const isWord = (mimeType: string): mimeType is WordMimeType => {
  return WORD_MIME_TYPES.includes(mimeType as WordMimeType);
};

export const isPdf = (mimeType: string): mimeType is PdfMimeType => {
  return (
    isValidMimeType(mimeType) &&
    PDF_MIME_TYPES.includes(mimeType as PdfMimeType)
  );
};

export const isImage = (mimeType: string): mimeType is ImageMimeType => {
  return IMAGE_MIME_TYPES.includes(mimeType as ImageMimeType);
};

export const isPowerPoint = (
  mimeType: string,
): mimeType is PowerPointMimeType => {
  return POWERPOINT_MIME_TYPES.includes(mimeType as PowerPointMimeType);
};

export const isCsv = (mimeType: string): mimeType is CsvMimeType => {
  return CSV_MIME_TYPES.includes(mimeType as CsvMimeType);
};

export const isVideo = (mimeType: string): mimeType is VideoMimeType => {
  return VIDEO_MIME_TYPES.includes(mimeType as VideoMimeType);
};

export const isDocument = (mimeType: string): mimeType is DocumentMimeType => {
  return (
    isExcel(mimeType) ||
    isWord(mimeType) ||
    isPdf(mimeType) ||
    isPowerPoint(mimeType) ||
    isCsv(mimeType)
  );
};

export const isSupportedFile = (mimeType: string): boolean => {
  return isImage(mimeType) || isVideo(mimeType) || isDocument(mimeType);
};

export const videoExtMap = {
  "video/mp4": "mp4",
  "video/mpeg": "mpeg",
  "video/ogg": "ogg",
  "video/webm": "webm",
  "video/3gpp": "3gpp",
  "video/3gpp2": "3gpp2",
  "video/quicktime": "quicktime",
  "video/x-msvideo": "avi",
  "video/x-ms-wmv": "wmv",
};
export const imageExtMap = {
  "image/png": "png",
  "image/gif": "gif",
  "image/jpeg": "jpeg",
  "image/svg+xml": "svg",
  "image/webp": "webp",
  "image/avif": "avif",
};
export const excelExtMap = {
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "application/vnd.ms-excel": "xls",
};

export const wordExtMap = {
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "docx",
  "application/msword": "doc",
};

export const pdfExtMap = {
  "application/pdf": "pdf",
};

export const powerPointExtMap = {
  "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    "pptx",
  "application/vnd.ms-powerpoint": "ppt",
};
