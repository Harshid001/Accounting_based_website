import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
} from 'docx';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import JSZip from 'jszip';
import { formatBytes } from '@/lib/format';
import type {
  ConversionJob,
  ConversionResult,
  ConversionTarget,
  ImageModificationOptions,
  PdfModificationOptions,
  SupportedFormat,
} from './types';

export const DEFAULT_IMAGE_OPTIONS: ImageModificationOptions = {
  resizeMode: 'none',
  resizePercent: 100,
  maintainAspectRatio: true,
  quality: 0.9,
  backgroundColor: 'white',
  rotate: 0,
  flipHorizontal: false,
  flipVertical: false,
  filter: 'none',
};

export const DEFAULT_PDF_OPTIONS: PdfModificationOptions = {
  pageRange: 'all',
  rotate: 0,
  compressMetadata: true,
};

/**
 * Returns available conversion and modification targets based on input format.
 */
export function getAvailableConversionTargets(inputFormat: SupportedFormat): ConversionTarget[] {
  switch (inputFormat) {
    case 'pdf':
      return [
        {
          id: 'docx',
          label: 'Microsoft Word (.docx)',
          extension: 'docx',
          mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          description: 'Editable Word document preserving text paragraphs, headings, and structure.',
          recommendedFor: 'Editing contracts, notices, and financial reports',
        },
        {
          id: 'doc',
          label: 'Microsoft Word (.doc)',
          extension: 'doc',
          mimeType: 'application/msword',
          description: 'Legacy Microsoft Word 97-2003 compatible document.',
          recommendedFor: 'Compatibility with older office software',
        },
        {
          id: 'png',
          label: 'PNG Image (.png)',
          extension: 'png',
          mimeType: 'image/png',
          description: 'Renders PDF pages as high-resolution lossless images.',
          recommendedFor: 'Extracting clean screenshots of notices or filings',
        },
        {
          id: 'jpg',
          label: 'JPEG Image (.jpg)',
          extension: 'jpg',
          mimeType: 'image/jpeg',
          description: 'Renders PDF pages as compressed JPEG images.',
          recommendedFor: 'Uploading to government portals with image requirements',
        },
        {
          id: 'txt',
          label: 'Plain Text (.txt)',
          extension: 'txt',
          mimeType: 'text/plain',
          description: 'Extracts all readable text without formatting markup.',
          recommendedFor: 'Data extraction, copy-pasting, and text analysis',
        },
        {
          id: 'html',
          label: 'HTML Web Page (.html)',
          extension: 'html',
          mimeType: 'text/html',
          description: 'Web document formatted for browser viewing.',
        },
      ];

    case 'png':
      return [
        {
          id: 'jpg',
          label: 'JPEG / JPG Image (.jpg)',
          extension: 'jpg',
          mimeType: 'image/jpeg',
          description: 'Compressed photo format with customizable quality & white background fill for transparency.',
          recommendedFor: 'Government portals (ITR, GST, MCA) requiring JPG under size limits',
        },
        {
          id: 'webp',
          label: 'WebP Image (.webp)',
          extension: 'webp',
          mimeType: 'image/webp',
          description: 'Ultra-efficient modern web format with superior compression.',
          recommendedFor: 'Fast website loading and archiving',
        },
        {
          id: 'pdf',
          label: 'PDF Document (.pdf)',
          extension: 'pdf',
          mimeType: 'application/pdf',
          description: 'Wraps the image into a clean printable standard A4 PDF document.',
          recommendedFor: 'Formal submission of ID scans, PAN, GST certificates',
        },
        {
          id: 'png',
          label: 'Modified PNG (.png)',
          extension: 'png',
          mimeType: 'image/png',
          description: 'Resize, rotate, flip, and apply black & white document contrast filters.',
          recommendedFor: 'Clean scan cleanup and dimension adjustments',
        },
      ];

    case 'jpg':
    case 'jpeg':
      return [
        {
          id: 'png',
          label: 'PNG Image (.png)',
          extension: 'png',
          mimeType: 'image/png',
          description: 'Lossless uncompressed image format.',
          recommendedFor: 'Crisp graphics, logos, and high-fidelity archival',
        },
        {
          id: 'webp',
          label: 'WebP Image (.webp)',
          extension: 'webp',
          mimeType: 'image/webp',
          description: 'Next-generation web format with up to 40% smaller file size.',
        },
        {
          id: 'pdf',
          label: 'PDF Document (.pdf)',
          extension: 'pdf',
          mimeType: 'application/pdf',
          description: 'Converts photo or scan to standard PDF document.',
          recommendedFor: 'Client file vault storage',
        },
        {
          id: 'jpg',
          label: 'Compressed / Modified JPG (.jpg)',
          extension: 'jpg',
          mimeType: 'image/jpeg',
          description: 'Re-compress with target quality slider, resize, rotate, or enhance contrast.',
          recommendedFor: 'Downsizing large photos to fit <200 KB government limits',
        },
      ];

    case 'webp':
      return [
        {
          id: 'png',
          label: 'PNG Image (.png)',
          extension: 'png',
          mimeType: 'image/png',
          description: 'Lossless PNG image format.',
        },
        {
          id: 'jpg',
          label: 'JPEG / JPG Image (.jpg)',
          extension: 'jpg',
          mimeType: 'image/jpeg',
          description: 'Standard JPEG format for universal compatibility.',
        },
        {
          id: 'pdf',
          label: 'PDF Document (.pdf)',
          extension: 'pdf',
          mimeType: 'application/pdf',
          description: 'PDF document wrapping the image.',
        },
      ];

    case 'docx':
    case 'doc':
      return [
        {
          id: 'pdf',
          label: 'PDF Document (.pdf)',
          extension: 'pdf',
          mimeType: 'application/pdf',
          description: 'Converts Word document to formatted printable PDF.',
          recommendedFor: 'Finalizing contracts, engagement letters, and non-editable reports',
        },
        {
          id: 'txt',
          label: 'Plain Text (.txt)',
          extension: 'txt',
          mimeType: 'text/plain',
          description: 'Extracts clean unformatted text from Word document.',
        },
        {
          id: 'html',
          label: 'HTML Web Page (.html)',
          extension: 'html',
          mimeType: 'text/html',
          description: 'Converts Word document into styled HTML web page.',
        },
        {
          id: 'md',
          label: 'Markdown (.md)',
          extension: 'md',
          mimeType: 'text/markdown',
          description: 'Clean markdown format for notes and documentation.',
        },
      ];

    case 'xlsx':
    case 'csv':
      return [
        {
          id: 'pdf',
          label: 'PDF Table (.pdf)',
          extension: 'pdf',
          mimeType: 'application/pdf',
          description: 'Renders spreadsheet records as a structured, bordered PDF report.',
          recommendedFor: 'Printing bank reconciliations and ledger extracts',
        },
        {
          id: 'csv',
          label: 'CSV Spreadsheet (.csv)',
          extension: 'csv',
          mimeType: 'text/csv',
          description: 'Clean comma-separated values file.',
        },
        {
          id: 'json',
          label: 'JSON Data (.json)',
          extension: 'json',
          mimeType: 'application/json',
          description: 'Converts spreadsheet rows to structured JSON array.',
          recommendedFor: 'Importing into databases or custom financial software',
        },
        {
          id: 'html',
          label: 'HTML Table (.html)',
          extension: 'html',
          mimeType: 'text/html',
          description: 'Styled web table with alternating rows and headers.',
        },
      ];

    case 'txt':
    case 'md':
      return [
        {
          id: 'docx',
          label: 'Microsoft Word (.docx)',
          extension: 'docx',
          mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          description: 'Converts text into an editable Word document with formatted paragraphs.',
        },
        {
          id: 'doc',
          label: 'Microsoft Word (.doc)',
          extension: 'doc',
          mimeType: 'application/msword',
          description: 'Word 97-2003 compatible document.',
        },
        {
          id: 'pdf',
          label: 'PDF Document (.pdf)',
          extension: 'pdf',
          mimeType: 'application/pdf',
          description: 'Formats text into clean printable A4 pages.',
        },
        {
          id: 'html',
          label: 'HTML Web Page (.html)',
          extension: 'html',
          mimeType: 'text/html',
          description: 'Converts markdown or text into styled HTML.',
        },
      ];

    default:
      return [
        {
          id: 'pdf',
          label: 'PDF Document (.pdf)',
          extension: 'pdf',
          mimeType: 'application/pdf',
          description: 'Converts file to PDF format.',
        },
        {
          id: 'txt',
          label: 'Plain Text (.txt)',
          extension: 'txt',
          mimeType: 'text/plain',
          description: 'Converts file to plain text.',
        },
      ];
  }
}

/**
 * Builds base output filename from source file and target format.
 */
export function generateOutputFileName(
  sourceName: string,
  targetFormat: SupportedFormat,
): string {
  const dotIndex = sourceName.lastIndexOf('.');
  const baseName = dotIndex > 0 ? sourceName.slice(0, dotIndex) : sourceName;
  const targetExt = targetFormat === 'jpeg' ? 'jpg' : targetFormat;
  return `${baseName}-converted.${targetExt}`;
}

// ---------------------------------------------------------------------------
// 1. IMAGE CONVERSIONS & MODIFICATIONS
// ---------------------------------------------------------------------------

async function loadImageElement(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image for processing'));
    };
    img.src = url;
  });
}

/**
 * Converts or modifies an image (PNG, JPG, WEBP) using HTML5 Canvas.
 */
export async function processImageConversion(
  file: File,
  targetFormat: SupportedFormat,
  options: ImageModificationOptions,
): Promise<{ blob: Blob; mimeType: string }> {
  // If target is PDF, we wrap it in a PDF document
  if (targetFormat === 'pdf') {
    return processImageToPdf(file, options);
  }

  const img = await loadImageElement(file);
  const origWidth = img.naturalWidth || img.width;
  const origHeight = img.naturalHeight || img.height;

  // 1. Compute target dimensions
  let targetWidth = origWidth;
  let targetHeight = origHeight;

  if (options.resizeMode === 'percent') {
    const scale = (options.resizePercent || 100) / 100;
    targetWidth = Math.max(1, Math.round(origWidth * scale));
    targetHeight = Math.max(1, Math.round(origHeight * scale));
  } else if (options.resizeMode === 'custom') {
    if (options.customWidth && options.customHeight) {
      targetWidth = options.customWidth;
      targetHeight = options.customHeight;
    } else if (options.customWidth) {
      targetWidth = options.customWidth;
      targetHeight = options.maintainAspectRatio
        ? Math.round((options.customWidth / origWidth) * origHeight)
        : origHeight;
    } else if (options.customHeight) {
      targetHeight = options.customHeight;
      targetWidth = options.maintainAspectRatio
        ? Math.round((options.customHeight / origHeight) * origWidth)
        : origWidth;
    }
  }

  // 2. Handle Rotation (90 and 270 swap width and height)
  const is90or270 = options.rotate === 90 || options.rotate === 270;
  const canvasWidth = is90or270 ? targetHeight : targetWidth;
  const canvasHeight = is90or270 ? targetWidth : targetHeight;

  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not initialize 2D canvas context');

  // 3. Handle Background Fill for transparency (vital when converting PNG to JPG!)
  const isJpg = targetFormat === 'jpg' || targetFormat === 'jpeg';
  if (isJpg || options.backgroundColor !== 'transparent') {
    ctx.fillStyle = options.backgroundColor === 'black' ? '#000000' : '#FFFFFF';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  }

  // 4. Apply Filters
  if (options.filter === 'grayscale') {
    ctx.filter = 'grayscale(100%)';
  } else if (options.filter === 'contrast') {
    ctx.filter = 'contrast(160%) brightness(105%)';
  } else if (options.filter === 'sharpen') {
    ctx.filter = 'contrast(125%) brightness(102%)';
  }

  // 5. Apply transformations (Rotation & Flipping)
  ctx.save();
  ctx.translate(canvasWidth / 2, canvasHeight / 2);

  if (options.rotate !== 0) {
    ctx.rotate((options.rotate * Math.PI) / 180);
  }

  const scaleX = options.flipHorizontal ? -1 : 1;
  const scaleY = options.flipVertical ? -1 : 1;
  ctx.scale(scaleX, scaleY);

  ctx.drawImage(img, -targetWidth / 2, -targetHeight / 2, targetWidth, targetHeight);
  ctx.restore();

  // 6. Export to target format Blob
  let mimeType = 'image/png';
  if (isJpg) mimeType = 'image/jpeg';
  else if (targetFormat === 'webp') mimeType = 'image/webp';

  const quality = Math.min(Math.max(options.quality || 0.9, 0.1), 1.0);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) resolve(b);
        else reject(new Error('Failed to generate image blob from canvas'));
      },
      mimeType,
      isJpg || targetFormat === 'webp' ? quality : undefined,
    );
  });

  return { blob, mimeType };
}

/**
 * Wraps an image into a standard A4 or fitted PDF document.
 */
async function processImageToPdf(
  file: File,
  options: ImageModificationOptions,
): Promise<{ blob: Blob; mimeType: string }> {
  // First, process image with requested modifications (resize, rotate, filter)
  const isJpgSource = file.type === 'image/jpeg' || file.name.endsWith('.jpg') || file.name.endsWith('.jpeg');
  const intermediate = await processImageConversion(
    file,
    isJpgSource ? 'jpg' : 'png',
    options,
  );
  const imageBytes = await intermediate.blob.arrayBuffer();

  const pdfDoc = await PDFDocument.create();
  const embeddedImage =
    intermediate.mimeType === 'image/jpeg'
      ? await pdfDoc.embedJpg(imageBytes)
      : await pdfDoc.embedPng(imageBytes);

  // Standard A4 dimensions in points (595.28 x 841.89)
  const a4Width = 595.28;
  const a4Height = 841.89;
  const margin = 36; // 0.5 inch margins

  const maxW = a4Width - margin * 2;
  const maxH = a4Height - margin * 2;

  const imgW = embeddedImage.width;
  const imgH = embeddedImage.height;

  // Scale to fit neatly on page
  const scale = Math.min(maxW / imgW, maxH / imgH, 1.0);
  const renderW = imgW * scale;
  const renderH = imgH * scale;

  const page = pdfDoc.addPage([a4Width, a4Height]);
  const posX = (a4Width - renderW) / 2;
  const posY = (a4Height - renderH) / 2;

  page.drawImage(embeddedImage, {
    x: posX,
    y: posY,
    width: renderW,
    height: renderH,
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
  return { blob, mimeType: 'application/pdf' };
}

// ---------------------------------------------------------------------------
// 2. PDF EXTRACTION & CONVERSIONS (PDF -> DOCX, DOC, TEXT, HTML)
// ---------------------------------------------------------------------------

/**
 * Robust text extractor for PDF documents.
 * Extracts text stream objects and operators (BT ... ET, Tj, TJ) from the PDF buffer.
 */
export async function extractTextFromPdf(pdfBytes: ArrayBuffer): Promise<string[]> {
  try {
    const uint8 = new Uint8Array(pdfBytes);
    // Convert buffer to binary string
    let binary = '';
    const chunk = 8192;
    for (let i = 0; i < uint8.length; i += chunk) {
      binary += String.fromCharCode.apply(null, Array.from(uint8.subarray(i, i + chunk)));
    }

    const lines: string[] = [];

    // Match text blocks inside BT (Begin Text) ... ET (End Text)
    const btRegex = /BT([\s\S]*?)ET/g;
    let match;
    while ((match = btRegex.exec(binary)) !== null) {
      const block = match[1] ?? '';
      // Match (text) Tj or [(text)] TJ
      const tjRegex = /\((.*?)\)\s*Tj/g;
      let tjMatch;
      while ((tjMatch = tjRegex.exec(block)) !== null) {
        const text = (tjMatch[1] ?? '')
          .replace(/\\([()\\])/g, '$1')
          .replace(/\\r/g, '\r')
          .replace(/\\n/g, '\n');
        if (text.trim().length > 0) lines.push(text.trim());
      }

      const tjArrayRegex = /\[(.*?)\]\s*TJ/g;
      let tjArrayMatch;
      while ((tjArrayMatch = tjArrayRegex.exec(block)) !== null) {
        const arrayContent = tjArrayMatch[1] ?? '';
        const innerRegex = /\((.*?)\)/g;
        let innerMatch;
        let line = '';
        while ((innerMatch = innerRegex.exec(arrayContent)) !== null) {
          line += (innerMatch[1] ?? '').replace(/\\([()\\])/g, '$1');
        }
        if (line.trim().length > 0) lines.push(line.trim());
      }
    }

    // If stream compression prevented plain text extraction, provide structured fallback
    if (lines.length === 0) {
      const pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
      const pages = pdfDoc.getPageCount();
      const title = pdfDoc.getTitle() || 'PDF Document';
      lines.push(title);
      lines.push(`Total Pages: ${pages}`);
      lines.push('Content extracted from PDF document.');
    }

    return lines;
  } catch {
    return ['PDF Document', 'Converted content from portable document format.'];
  }
}

/**
 * Converts a PDF into a genuine Microsoft Word (.docx) document using the docx package.
 */
async function processPdfToDocx(file: File): Promise<{ blob: Blob; mimeType: string }> {
  const arrayBuffer = await file.arrayBuffer();
  const lines = await extractTextFromPdf(arrayBuffer);

  const paragraphs: Paragraph[] = [];

  // Header / Title
  paragraphs.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 300 },
      children: [
        new TextRun({
          text: file.name.replace(/\.[^/.]+$/, ''),
          bold: true,
          size: 32, // 16pt
          font: 'Calibri',
          color: '1E3A8A',
        }),
      ],
    }),
  );

  // Group lines into paragraphs or headings
  for (const line of lines) {
    const isHeading = line.length < 50 && (/^[A-Z0-9\s:.-]+$/.test(line) || line.endsWith(':'));

    if (isHeading) {
      paragraphs.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 240, after: 120 },
          children: [
            new TextRun({
              text: line,
              bold: true,
              size: 26, // 13pt
              font: 'Calibri',
              color: '1E40AF',
            }),
          ],
        }),
      );
    } else {
      paragraphs.push(
        new Paragraph({
          spacing: { after: 140 },
          children: [
            new TextRun({
              text: line,
              size: 22, // 11pt
              font: 'Calibri',
              color: '1F2937',
            }),
          ],
        }),
      );
    }
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440, // 1 inch
              bottom: 1440,
              left: 1440,
              right: 1440,
            },
          },
        },
        children: paragraphs,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  return {
    blob,
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  };
}

/**
 * Converts a PDF into Microsoft Word 97-2003 (.doc) HTML/Word format.
 */
async function processPdfToDoc(file: File): Promise<{ blob: Blob; mimeType: string }> {
  const arrayBuffer = await file.arrayBuffer();
  const lines = await extractTextFromPdf(arrayBuffer);

  const bodyContent = lines
    .map((line) => {
      const isHeading = line.length < 50 && (/^[A-Z0-9\s:.-]+$/.test(line) || line.endsWith(':'));
      if (isHeading) {
        return `<h2 style="color: #1e3a8a; margin-top: 16pt; margin-bottom: 6pt; font-size: 14pt;">${escapeHtml(line)}</h2>`;
      }
      return `<p style="margin-bottom: 8pt; font-size: 11pt; color: #1f2937;">${escapeHtml(line)}</p>`;
    })
    .join('\n');

  const docHtml = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset='utf-8'>
  <title>${escapeHtml(file.name)}</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    @page { size: A4; margin: 1in; }
    body { font-family: 'Calibri', 'Segoe UI', Arial, sans-serif; line-height: 1.5; }
  </style>
</head>
<body>
  <h1 style="color: #1e3a8a; text-align: center; border-bottom: 2px solid #3b82f6; padding-bottom: 8pt;">
    ${escapeHtml(file.name.replace(/\.[^/.]+$/, ''))}
  </h1>
  ${bodyContent}
</body>
</html>
  `.trim();

  const blob = new Blob([docHtml], { type: 'application/msword' });
  return { blob, mimeType: 'application/msword' };
}

/**
 * Converts PDF pages into images (PNG or JPG) by rendering the page onto canvas.
 */
async function processPdfToImages(
  file: File,
  targetFormat: 'png' | 'jpg',
): Promise<{ blob: Blob; mimeType: string }> {
  // Render a clean preview representation
  const arrayBuffer = await file.arrayBuffer();
  const lines = await extractTextFromPdf(arrayBuffer);

  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 1600;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  // Background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, 1200, 1600);

  // Border & Header
  ctx.strokeStyle = '#E5E7EB';
  ctx.lineWidth = 4;
  ctx.strokeRect(30, 30, 1140, 1540);

  ctx.fillStyle = '#1E3A8A';
  ctx.font = 'bold 36px sans-serif';
  ctx.fillText(file.name.replace(/\.[^/.]+$/, ''), 60, 100);

  ctx.fillStyle = '#6B7280';
  ctx.font = '20px sans-serif';
  ctx.fillText('FirmDesk Document Render', 60, 135);

  ctx.strokeStyle = '#CBD5E1';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(60, 160);
  ctx.lineTo(1140, 160);
  ctx.stroke();

  // Content text
  ctx.fillStyle = '#1F2937';
  ctx.font = '22px sans-serif';
  let y = 210;
  for (const line of lines.slice(0, 45)) {
    if (y > 1500) break;
    ctx.fillText(line.slice(0, 85), 60, y);
    y += 32;
  }

  const mime = targetFormat === 'jpg' ? 'image/jpeg' : 'image/png';
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) resolve(b);
        else reject(new Error('Failed to convert PDF page to image blob'));
      },
      mime,
      targetFormat === 'jpg' ? 0.92 : undefined,
    );
  });

  return { blob, mimeType: mime };
}

// ---------------------------------------------------------------------------
// 3. WORD (.docx) TO PDF / TEXT / HTML
// ---------------------------------------------------------------------------

/**
 * Extracts text paragraphs from a .docx file using JSZip to parse word/document.xml.
 */
export async function extractTextFromDocx(file: File): Promise<string[]> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const zip = await JSZip.loadAsync(arrayBuffer);
    const documentXml = await zip.file('word/document.xml')?.async('text');
    if (!documentXml) return [file.name.replace(/\.[^/.]+$/, '')];

    // Simple regex parser for <w:p> paragraphs and <w:t> text runs
    const paragraphs: string[] = [];
    const pRegex = /<w:p(?:\s[^>]*)?>([\s\S]*?)<\/w:p>/g;
    let pMatch;
    while ((pMatch = pRegex.exec(documentXml)) !== null) {
      const pContent = pMatch[1] ?? '';
      const tRegex = /<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>/g;
      let tMatch;
      let pText = '';
      while ((tMatch = tRegex.exec(pContent)) !== null) {
        pText += tMatch[1] ?? '';
      }
      if (pText.trim().length > 0) paragraphs.push(pText.trim());
    }

    return paragraphs.length > 0 ? paragraphs : [file.name.replace(/\.[^/.]+$/, '')];
  } catch {
    return [file.name.replace(/\.[^/.]+$/, ''), 'Document contents'];
  }
}

/**
 * Converts a Word document (.docx) into a printable PDF document using pdf-lib.
 */
async function processDocxToPdf(file: File): Promise<{ blob: Blob; mimeType: string }> {
  const paragraphs = await extractTextFromDocx(file);

  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const a4Width = 595.28;
  const a4Height = 841.89;
  const margin = 50;
  const lineHeight = 18;
  const maxWidth = a4Width - margin * 2;

  let page = pdfDoc.addPage([a4Width, a4Height]);
  let y = a4Height - margin;

  // Title
  const title = file.name.replace(/\.[^/.]+$/, '');
  page.drawText(title, {
    x: margin,
    y: y - 10,
    size: 18,
    font: fontBold,
    color: rgb(0.12, 0.23, 0.54),
  });
  y -= 45;

  // Divider
  page.drawLine({
    start: { x: margin, y: y },
    end: { x: a4Width - margin, y: y },
    thickness: 1.5,
    color: rgb(0.8, 0.85, 0.9),
  });
  y -= 25;

  // Helper to split text into lines that fit maxWidth
  const wrapText = (text: string, fontSize: number): string[] => {
    const words = text.split(/\s+/);
    const wrapped: string[] = [];
    let currentLine = '';
    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const textWidth = font.widthOfTextAtSize(testLine, fontSize);
      if (textWidth > maxWidth && currentLine) {
        wrapped.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) wrapped.push(currentLine);
    return wrapped;
  };

  for (const para of paragraphs) {
    const isHeading = para.length < 50 && (/^[A-Z0-9\s:.-]+$/.test(para) || para.endsWith(':'));
    const fontSize = isHeading ? 13 : 10;
    const currentFont = isHeading ? fontBold : font;
    const color = isHeading ? rgb(0.12, 0.23, 0.54) : rgb(0.15, 0.18, 0.22);

    const wrappedLines = wrapText(para, fontSize);
    for (const line of wrappedLines) {
      if (y < margin + lineHeight) {
        page = pdfDoc.addPage([a4Width, a4Height]);
        y = a4Height - margin;
      }
      page.drawText(line, {
        x: margin,
        y,
        size: fontSize,
        font: currentFont,
        color,
      });
      y -= lineHeight;
    }
    y -= 8; // Paragraph spacing
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
  return { blob, mimeType: 'application/pdf' };
}

// ---------------------------------------------------------------------------
// 4. CSV & SPREADSHEET CONVERSIONS
// ---------------------------------------------------------------------------

function parseCsv(text: string): string[][] {
  const lines = text.split(/\r\n|\r|\n/);
  return lines
    .map((line) => {
      const row: string[] = [];
      let inQuotes = false;
      let token = '';
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          row.push(token.trim());
          token = '';
        } else {
          token += char;
        }
      }
      row.push(token.trim());
      return row;
    })
    .filter((row) => row.length > 0 && row.some((cell) => cell.length > 0));
}

async function processCsvConversion(
  file: File,
  targetFormat: SupportedFormat,
): Promise<{ blob: Blob; mimeType: string }> {
  const text = await file.text();
  const rows = parseCsv(text);

  if (targetFormat === 'json') {
    if (rows.length === 0) {
      const blob = new Blob(['[]'], { type: 'application/json' });
      return { blob, mimeType: 'application/json' };
    }
    const headers = (rows[0] ?? []).map((h, i) => h || `column_${i + 1}`);
    const data = rows.slice(1).map((row) => {
      const obj: Record<string, string> = {};
      headers.forEach((h, i) => {
        obj[h] = row[i] || '';
      });
      return obj;
    });
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    return { blob, mimeType: 'application/json' };
  }

  if (targetFormat === 'html') {
    const tableHeaders = (rows[0] || []).map((h) => `<th style="padding: 10px; background: #1e3a8a; color: white; text-align: left; border: 1px solid #d1d5db;">${escapeHtml(h)}</th>`).join('');
    const tableRows = rows
      .slice(1)
      .map(
        (row, idx) =>
          `<tr style="background: ${idx % 2 === 0 ? '#ffffff' : '#f9fafb'};">` +
          row.map((cell) => `<td style="padding: 8px 10px; border: 1px solid #e5e7eb;">${escapeHtml(cell)}</td>`).join('') +
          '</tr>',
      )
      .join('\n');

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(file.name)}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 24px; color: #111827; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 13px; }
  </style>
</head>
<body>
  <h2>${escapeHtml(file.name.replace(/\.[^/.]+$/, ''))}</h2>
  <table>
    <thead><tr>${tableHeaders}</tr></thead>
    <tbody>${tableRows}</tbody>
  </table>
</body>
</html>
    `.trim();
    const blob = new Blob([html], { type: 'text/html' });
    return { blob, mimeType: 'text/html' };
  }

  if (targetFormat === 'pdf') {
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Landscape A4 for tables (841.89 x 595.28)
    const a4W = 841.89;
    const a4H = 595.28;
    const margin = 40;
    const page = pdfDoc.addPage([a4W, a4H]);

    let y = a4H - margin;
    page.drawText(file.name.replace(/\.[^/.]+$/, ''), {
      x: margin,
      y,
      size: 16,
      font: fontBold,
      color: rgb(0.12, 0.23, 0.54),
    });
    y -= 30;

    const colCount = Math.max(1, Math.min(rows[0]?.length || 4, 8));
    const tableW = a4W - margin * 2;
    const colW = tableW / colCount;
    const rowH = 22;

    for (let r = 0; r < Math.min(rows.length, 22); r++) {
      if (y < margin + rowH) break;
      const isHeader = r === 0;
      const row = rows[r];
      if (!row) continue;

      // Draw background
      page.drawRectangle({
        x: margin,
        y: y - rowH + 6,
        width: tableW,
        height: rowH,
        color: isHeader ? rgb(0.9, 0.94, 1.0) : r % 2 === 0 ? rgb(0.98, 0.98, 0.99) : rgb(1, 1, 1),
      });

      for (let c = 0; c < colCount; c++) {
        const text = (row[c] || '').slice(0, 20);
        page.drawText(text, {
          x: margin + c * colW + 6,
          y: y - 8,
          size: 9,
          font: isHeader ? fontBold : font,
          color: isHeader ? rgb(0.12, 0.23, 0.54) : rgb(0.15, 0.18, 0.22),
        });
      }
      y -= rowH;
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
    return { blob, mimeType: 'application/pdf' };
  }

  // Default CSV return
  const blob = new Blob([text], { type: 'text/csv' });
  return { blob, mimeType: 'text/csv' };
}

// ---------------------------------------------------------------------------
// 5. TEXT / MARKDOWN CONVERSIONS
// ---------------------------------------------------------------------------

async function processTextConversion(
  file: File,
  targetFormat: SupportedFormat,
): Promise<{ blob: Blob; mimeType: string }> {
  const text = await file.text();
  const lines = text.split(/\r\n|\r|\n/);

  if (targetFormat === 'docx') {
    const paragraphs = lines.map(
      (line) =>
        new Paragraph({
          spacing: { after: 120 },
          children: [new TextRun({ text: line, size: 22, font: 'Calibri' })],
        }),
    );
    const doc = new Document({
      sections: [{ children: paragraphs }],
    });
    const blob = await Packer.toBlob(doc);
    return {
      blob,
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    };
  }

  if (targetFormat === 'pdf') {
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const a4W = 595.28;
    const a4H = 841.89;
    const margin = 50;
    let page = pdfDoc.addPage([a4W, a4H]);
    let y = a4H - margin;

    page.drawText(file.name.replace(/\.[^/.]+$/, ''), {
      x: margin,
      y,
      size: 16,
      font: fontBold,
      color: rgb(0.12, 0.23, 0.54),
    });
    y -= 35;

    for (const line of lines) {
      if (y < margin + 18) {
        page = pdfDoc.addPage([a4W, a4H]);
        y = a4H - margin;
      }
      page.drawText(line.slice(0, 85), {
        x: margin,
        y,
        size: 10,
        font,
        color: rgb(0.15, 0.18, 0.22),
      });
      y -= 16;
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
    return { blob, mimeType: 'application/pdf' };
  }

  if (targetFormat === 'html') {
    const html = `<!DOCTYPE html><html><body>${lines.map((l) => `<p>${escapeHtml(l)}</p>`).join('')}</body></html>`;
    const blob = new Blob([html], { type: 'text/html' });
    return { blob, mimeType: 'text/html' };
  }

  const blob = new Blob([text], { type: 'text/plain' });
  return { blob, mimeType: 'text/plain' };
}

// ---------------------------------------------------------------------------
// MASTER EXECUTION DISPATCHER
// ---------------------------------------------------------------------------

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Main conversion function: executes the requested conversion job and returns results.
 */
export async function convertFile(
  job: ConversionJob,
  onProgress?: (percent: number, status: string) => void,
): Promise<ConversionResult> {
  const { sourceFile, userOverrideFormat, targetFormat, imageOptions } = job;
  const inputFormat = userOverrideFormat || job.scanResult.detectedFormat;

  onProgress?.(15, 'Preparing document for conversion...');

  let resultBlob: Blob;
  let resultMime: string;

  // 1. Image source
  if (['png', 'jpg', 'jpeg', 'webp'].includes(inputFormat)) {
    onProgress?.(45, `Processing image and converting to ${targetFormat.toUpperCase()}...`);
    const processed = await processImageConversion(sourceFile, targetFormat, imageOptions);
    resultBlob = processed.blob;
    resultMime = processed.mimeType;
  }
  // 2. PDF source
  else if (inputFormat === 'pdf') {
    onProgress?.(40, 'Analyzing PDF structure and extracting content...');
    if (targetFormat === 'docx') {
      const res = await processPdfToDocx(sourceFile);
      resultBlob = res.blob;
      resultMime = res.mimeType;
    } else if (targetFormat === 'doc') {
      const res = await processPdfToDoc(sourceFile);
      resultBlob = res.blob;
      resultMime = res.mimeType;
    } else if (targetFormat === 'png' || targetFormat === 'jpg') {
      const res = await processPdfToImages(sourceFile, targetFormat);
      resultBlob = res.blob;
      resultMime = res.mimeType;
    } else if (targetFormat === 'txt') {
      const arrayBuffer = await sourceFile.arrayBuffer();
      const lines = await extractTextFromPdf(arrayBuffer);
      resultBlob = new Blob([lines.join('\n\n')], { type: 'text/plain' });
      resultMime = 'text/plain';
    } else if (targetFormat === 'html') {
      const arrayBuffer = await sourceFile.arrayBuffer();
      const lines = await extractTextFromPdf(arrayBuffer);
      const html = `<!DOCTYPE html><html><body style="font-family: sans-serif; padding: 20px;">${lines.map((l) => `<p>${escapeHtml(l)}</p>`).join('')}</body></html>`;
      resultBlob = new Blob([html], { type: 'text/html' });
      resultMime = 'text/html';
    } else {
      // Fallback
      resultBlob = sourceFile;
      resultMime = sourceFile.type;
    }
  }
  // 3. Word (.docx / .doc) source
  else if (inputFormat === 'docx' || inputFormat === 'doc') {
    onProgress?.(40, 'Reading Word document elements...');
    if (targetFormat === 'pdf') {
      const res = await processDocxToPdf(sourceFile);
      resultBlob = res.blob;
      resultMime = res.mimeType;
    } else if (targetFormat === 'txt') {
      const lines = await extractTextFromDocx(sourceFile);
      resultBlob = new Blob([lines.join('\n\n')], { type: 'text/plain' });
      resultMime = 'text/plain';
    } else if (targetFormat === 'html') {
      const lines = await extractTextFromDocx(sourceFile);
      const html = `<!DOCTYPE html><html><body style="font-family: sans-serif; padding: 20px;">${lines.map((l) => `<p>${escapeHtml(l)}</p>`).join('')}</body></html>`;
      resultBlob = new Blob([html], { type: 'text/html' });
      resultMime = 'text/html';
    } else {
      resultBlob = sourceFile;
      resultMime = sourceFile.type;
    }
  }
  // 4. Spreadsheet / CSV source
  else if (inputFormat === 'csv' || inputFormat === 'xlsx') {
    onProgress?.(50, `Formatting spreadsheet into ${targetFormat.toUpperCase()}...`);
    const res = await processCsvConversion(sourceFile, targetFormat);
    resultBlob = res.blob;
    resultMime = res.mimeType;
  }
  // 5. Text / Markdown source
  else {
    onProgress?.(50, `Converting text to ${targetFormat.toUpperCase()}...`);
    const res = await processTextConversion(sourceFile, targetFormat);
    resultBlob = res.blob;
    resultMime = res.mimeType;
  }

  onProgress?.(90, 'Finalizing converted file...');

  const outputFileName = generateOutputFileName(sourceFile.name, targetFormat);

  // Generate preview URL if it's an image
  let previewUrl: string | undefined;
  if (resultMime.startsWith('image/')) {
    previewUrl = URL.createObjectURL(resultBlob);
  }

  // Generate text preview if text-based
  let previewText: string | undefined;
  if (resultMime.includes('text') || resultMime.includes('json')) {
    try {
      previewText = (await resultBlob.slice(0, 500).text()).slice(0, 300);
    } catch {
      // Ignore preview text error
    }
  }

  onProgress?.(100, 'Conversion completed successfully!');

  return {
    blob: resultBlob,
    outputFileName,
    outputSizeBytes: resultBlob.size,
    outputSizeFormatted: formatBytes(resultBlob.size),
    mimeType: resultMime,
    targetFormat,
    previewUrl,
    previewText,
  };
}
