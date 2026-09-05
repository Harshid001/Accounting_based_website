export type SupportedFormat =
  | 'pdf'
  | 'png'
  | 'jpg'
  | 'jpeg'
  | 'webp'
  | 'docx'
  | 'doc'
  | 'xlsx'
  | 'csv'
  | 'txt'
  | 'html'
  | 'json'
  | 'md';

export type InputFormatCategory = 'document' | 'image' | 'spreadsheet' | 'text';

export interface FormatMeta {
  id: SupportedFormat;
  label: string;
  category: InputFormatCategory;
  extension: string;
  mimeType: string;
  badge: string;
  description: string;
}

export interface FileScanResult {
  fileName: string;
  originalExtension: string;
  fileSizeBytes: number;
  fileSizeFormatted: string;
  mimeType: string;
  detectedFormat: SupportedFormat;
  confidence: 'high' | 'medium' | 'low';
  magicMatch: boolean;
  pageCount?: number;
  dimensions?: { width: number; height: number };
  aspectRatio?: string;
  hasAlpha?: boolean;
  wordCountEstimate?: number;
  lineCountEstimate?: number;
  integrityNotes?: string;
  textSnippet?: string;
}

export interface ConversionTarget {
  id: SupportedFormat;
  label: string;
  extension: string;
  mimeType: string;
  description: string;
  recommendedFor?: string;
}

export interface ImageModificationOptions {
  resizeMode: 'none' | 'percent' | 'custom';
  resizePercent: 25 | 50 | 75 | 100 | 125 | 150 | 200;
  customWidth?: number;
  customHeight?: number;
  maintainAspectRatio: boolean;
  quality: number; // 0.1 to 1.0 (default 0.90)
  backgroundColor: 'white' | 'black' | 'transparent';
  rotate: 0 | 90 | 180 | 270;
  flipHorizontal: boolean;
  flipVertical: boolean;
  filter: 'none' | 'grayscale' | 'contrast' | 'sharpen';
}

export interface PdfModificationOptions {
  pageRange: 'all' | 'first' | 'custom';
  customPages?: string; // e.g., "1,3-5"
  rotate: 0 | 90 | 180 | 270;
  compressMetadata: boolean;
}

export interface ConversionJob {
  sourceFile: File;
  scanResult: FileScanResult;
  userOverrideFormat: SupportedFormat;
  targetFormat: SupportedFormat;
  imageOptions: ImageModificationOptions;
  pdfOptions: PdfModificationOptions;
}

export interface ConversionResult {
  blob: Blob;
  outputFileName: string;
  outputSizeBytes: number;
  outputSizeFormatted: string;
  mimeType: string;
  targetFormat: SupportedFormat;
  previewUrl?: string;
  previewText?: string;
}
