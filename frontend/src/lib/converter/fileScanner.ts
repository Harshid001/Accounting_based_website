import { PDFDocument } from 'pdf-lib';
import { formatBytes } from '@/lib/format';
import type { FileScanResult, FormatMeta, SupportedFormat } from './types';

export const SUPPORTED_FORMAT_METAS: Record<SupportedFormat, FormatMeta> = {
  pdf: {
    id: 'pdf',
    label: 'PDF Document',
    category: 'document',
    extension: 'pdf',
    mimeType: 'application/pdf',
    badge: 'Standard PDF',
    description: 'Portable Document Format - standard for tax returns, notices & reports',
  },
  docx: {
    id: 'docx',
    label: 'Microsoft Word (DOCX)',
    category: 'document',
    extension: 'docx',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    badge: 'Modern Word',
    description: 'Microsoft Office Open XML Document - editable document format',
  },
  doc: {
    id: 'doc',
    label: 'Microsoft Word (DOC)',
    category: 'document',
    extension: 'doc',
    mimeType: 'application/msword',
    badge: 'Legacy Word',
    description: 'Microsoft Word 97-2003 compatible document',
  },
  png: {
    id: 'png',
    label: 'PNG Image',
    category: 'image',
    extension: 'png',
    mimeType: 'image/png',
    badge: 'Lossless & Alpha',
    description: 'Portable Network Graphics - supports crystal-clear transparency & sharp text',
  },
  jpg: {
    id: 'jpg',
    label: 'JPEG / JPG Image',
    category: 'image',
    extension: 'jpg',
    mimeType: 'image/jpeg',
    badge: 'Compressed Image',
    description: 'Standard photographic & document image format for tax/statutory portals',
  },
  jpeg: {
    id: 'jpeg',
    label: 'JPEG Image',
    category: 'image',
    extension: 'jpeg',
    mimeType: 'image/jpeg',
    badge: 'Compressed Image',
    description: 'Standard photographic & document image format',
  },
  webp: {
    id: 'webp',
    label: 'WebP Image',
    category: 'image',
    extension: 'webp',
    mimeType: 'image/webp',
    badge: 'Next-Gen Web',
    description: 'High-efficiency compressed image format with superior compression',
  },
  xlsx: {
    id: 'xlsx',
    label: 'Excel Spreadsheet',
    category: 'spreadsheet',
    extension: 'xlsx',
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    badge: 'Spreadsheet',
    description: 'Microsoft Excel workbook containing ledger, tables, or balance data',
  },
  csv: {
    id: 'csv',
    label: 'CSV Spreadsheet',
    category: 'spreadsheet',
    extension: 'csv',
    mimeType: 'text/csv',
    badge: 'Tabular Data',
    description: 'Comma-separated values data for bank statements, GST reconciliations',
  },
  txt: {
    id: 'txt',
    label: 'Plain Text',
    category: 'text',
    extension: 'txt',
    mimeType: 'text/plain',
    badge: 'Raw Text',
    description: 'Plain unformatted text file',
  },
  html: {
    id: 'html',
    label: 'HTML Document',
    category: 'document',
    extension: 'html',
    mimeType: 'text/html',
    badge: 'Web Document',
    description: 'HyperText Markup Language web document',
  },
  json: {
    id: 'json',
    label: 'JSON Data',
    category: 'text',
    extension: 'json',
    mimeType: 'application/json',
    badge: 'Structured Data',
    description: 'JavaScript Object Notation data format',
  },
  md: {
    id: 'md',
    label: 'Markdown Document',
    category: 'text',
    extension: 'md',
    mimeType: 'text/markdown',
    badge: 'Markdown',
    description: 'Formatted markdown document with headers, lists, and tables',
  },
};

export const EXTENSION_TO_FORMAT: Record<string, SupportedFormat> = {
  pdf: 'pdf',
  png: 'png',
  jpg: 'jpg',
  jpeg: 'jpg',
  webp: 'webp',
  docx: 'docx',
  doc: 'doc',
  xlsx: 'xlsx',
  csv: 'csv',
  txt: 'txt',
  html: 'html',
  htm: 'html',
  json: 'json',
  md: 'md',
};

const matchBytes = (bytes: Uint8Array, pattern: number[]): boolean => {
  if (bytes.length < pattern.length) return false;
  return pattern.every((expected, index) => bytes[index] === expected);
};

export function extractFileExtension(fileName: string): string {
  const dotIndex = fileName.lastIndexOf('.');
  if (dotIndex < 0) return '';
  return fileName.slice(dotIndex + 1).toLowerCase();
}

/**
 * Scans a file's header signature (magic bytes) to reliably detect format.
 */
export async function detectMagicSignature(file: File): Promise<{
  detected: SupportedFormat | null;
  magicMatch: boolean;
}> {
  try {
    const buffer = await file.slice(0, 32).arrayBuffer();
    const bytes = new Uint8Array(buffer);

    // PDF magic bytes: %PDF- (0x25, 0x50, 0x44, 0x46, 0x2D)
    if (matchBytes(bytes, [0x25, 0x50, 0x44, 0x46, 0x2d])) {
      return { detected: 'pdf', magicMatch: true };
    }

    // PNG magic bytes: \x89PNG\r\n\x1a\n (0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A)
    if (matchBytes(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) {
      return { detected: 'png', magicMatch: true };
    }

    // JPEG/JPG magic bytes: 0xFF, 0xD8, 0xFF
    if (matchBytes(bytes, [0xff, 0xd8, 0xff])) {
      return { detected: 'jpg', magicMatch: true };
    }

    // WebP magic bytes: 'RIFF' .... 'WEBP'
    if (
      matchBytes(bytes, [0x52, 0x49, 0x46, 0x46]) &&
      bytes.length >= 12 &&
      bytes[8] === 0x57 &&
      bytes[9] === 0x45 &&
      bytes[10] === 0x42 &&
      bytes[11] === 0x50
    ) {
      return { detected: 'webp', magicMatch: true };
    }

    // PK zip container (DOCX / XLSX)
    if (matchBytes(bytes, [0x50, 0x4b, 0x03, 0x04])) {
      const ext = extractFileExtension(file.name);
      if (ext === 'xlsx') return { detected: 'xlsx', magicMatch: true };
      return { detected: 'docx', magicMatch: true };
    }

    // Legacy OLE2 DOC (0xD0, 0xCF, 0x11, 0xE0, 0xA1, 0xB1, 0x1A, 0xE1)
    if (matchBytes(bytes, [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1])) {
      return { detected: 'doc', magicMatch: true };
    }
  } catch {
    // If arrayBuffer fails, fall back to extension
  }

  return { detected: null, magicMatch: false };
}

/**
 * Inspects an image file to determine dimensions, aspect ratio, and alpha transparency.
 */
async function inspectImageFile(file: File): Promise<{
  dimensions: { width: number; height: number };
  aspectRatio: string;
  hasAlpha: boolean;
} | null> {
  return new Promise((resolve) => {
    try {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        const width = img.naturalWidth || img.width;
        const height = img.naturalHeight || img.height;
        URL.revokeObjectURL(url);

        // Aspect ratio computation
        const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
        const divisor = gcd(Math.round(width), Math.round(height));
        const aspectW = Math.round(width / divisor);
        const aspectH = Math.round(height / divisor);
        const ratioStr = aspectW <= 21 && aspectH <= 21 ? `${aspectW}:${aspectH}` : `${(width / height).toFixed(2)}:1`;

        // Check if PNG has potential transparency
        const hasAlpha = file.type === 'image/png' || extractFileExtension(file.name) === 'png';

        resolve({
          dimensions: { width, height },
          aspectRatio: ratioStr,
          hasAlpha,
        });
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(null);
      };
      img.src = url;
    } catch {
      resolve(null);
    }
  });
}

/**
 * Inspects a PDF file using pdf-lib to get page count and integrity info.
 */
async function inspectPdfFile(file: File): Promise<{
  pageCount: number;
  integrityNotes: string;
} | null> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const pageCount = pdfDoc.getPageCount();
    const title = pdfDoc.getTitle();
    const author = pdfDoc.getAuthor();
    const notes: string[] = [`${pageCount} page${pageCount === 1 ? '' : 's'}`];
    if (title) notes.push(`Title: "${title}"`);
    if (author) notes.push(`Author: ${author}`);
    return {
      pageCount,
      integrityNotes: notes.join(' • '),
    };
  } catch {
    return {
      pageCount: 1,
      integrityNotes: 'Standard PDF document',
    };
  }
}

/**
 * Inspects text / csv / json files to estimate word and line count.
 */
async function inspectTextFile(file: File): Promise<{
  lineCountEstimate: number;
  wordCountEstimate: number;
  textSnippet: string;
} | null> {
  try {
    const text = await file.slice(0, 100_000).text();
    const lines = text.split(/\r\n|\r|\n/);
    const words = text.trim().split(/\s+/).filter(Boolean);
    return {
      lineCountEstimate: lines.length,
      wordCountEstimate: words.length,
      textSnippet: text.slice(0, 400).trim(),
    };
  } catch {
    return null;
  }
}

/**
 * Comprehensive file scan: analyzes bytes, metadata, integrity, and properties.
 */
export async function scanFile(file: File): Promise<FileScanResult> {
  const extension = extractFileExtension(file.name);
  const { detected: magicFormat, magicMatch } = await detectMagicSignature(file);

  // Determine detected format
  let detectedFormat: SupportedFormat = 'pdf';
  let confidence: 'high' | 'medium' | 'low' = 'low';

  if (magicFormat) {
    detectedFormat = magicFormat;
    confidence = 'high';
  } else if (extension && EXTENSION_TO_FORMAT[extension]) {
    detectedFormat = EXTENSION_TO_FORMAT[extension];
    confidence = 'medium';
  } else if (file.type.startsWith('image/')) {
    if (file.type.includes('png')) detectedFormat = 'png';
    else if (file.type.includes('webp')) detectedFormat = 'webp';
    else detectedFormat = 'jpg';
    confidence = 'medium';
  } else if (file.type === 'application/pdf') {
    detectedFormat = 'pdf';
    confidence = 'high';
  }

  const result: FileScanResult = {
    fileName: file.name,
    originalExtension: extension,
    fileSizeBytes: file.size,
    fileSizeFormatted: formatBytes(file.size),
    mimeType: file.type || SUPPORTED_FORMAT_METAS[detectedFormat]?.mimeType || 'application/octet-stream',
    detectedFormat,
    confidence,
    magicMatch,
  };

  // Deep inspection based on detected format
  if (['png', 'jpg', 'jpeg', 'webp'].includes(detectedFormat)) {
    const imgInfo = await inspectImageFile(file);
    if (imgInfo) {
      result.dimensions = imgInfo.dimensions;
      result.aspectRatio = imgInfo.aspectRatio;
      result.hasAlpha = imgInfo.hasAlpha;
      result.integrityNotes = `${imgInfo.dimensions.width} × ${imgInfo.dimensions.height} px (${imgInfo.aspectRatio})`;
    }
  } else if (detectedFormat === 'pdf') {
    const pdfInfo = await inspectPdfFile(file);
    if (pdfInfo) {
      result.pageCount = pdfInfo.pageCount;
      result.integrityNotes = pdfInfo.integrityNotes;
    }
  } else if (['txt', 'csv', 'json', 'md', 'html'].includes(detectedFormat)) {
    const txtInfo = await inspectTextFile(file);
    if (txtInfo) {
      result.lineCountEstimate = txtInfo.lineCountEstimate;
      result.wordCountEstimate = txtInfo.wordCountEstimate;
      result.textSnippet = txtInfo.textSnippet;
      result.integrityNotes = `${txtInfo.lineCountEstimate} lines • ~${txtInfo.wordCountEstimate} words`;
    }
  } else if (detectedFormat === 'docx') {
    result.integrityNotes = 'Microsoft Word XML Document';
  } else if (detectedFormat === 'doc') {
    result.integrityNotes = 'Microsoft Word 97-2003 Document';
  }

  return result;
}
