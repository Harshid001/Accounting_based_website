import { describe, expect, it } from 'vitest';
import {
  detectMagicSignature,
  extractFileExtension,
  scanFile,
  SUPPORTED_FORMAT_METAS,
} from '@/lib/converter/fileScanner';

describe('fileScanner', () => {
  it('correctly extracts file extensions', () => {
    expect(extractFileExtension('invoice.pdf')).toBe('pdf');
    expect(extractFileExtension('pan_card.PNG')).toBe('png');
    expect(extractFileExtension('bank_statement.xlsx')).toBe('xlsx');
    expect(extractFileExtension('archive.tar.gz')).toBe('gz');
    expect(extractFileExtension('noextension')).toBe('');
  });

  it('provides metadata for all supported formats', () => {
    expect(SUPPORTED_FORMAT_METAS.pdf.label).toBe('PDF Document');
    expect(SUPPORTED_FORMAT_METAS.docx.label).toContain('Word');
    expect(SUPPORTED_FORMAT_METAS.png.mimeType).toBe('image/png');
    expect(SUPPORTED_FORMAT_METAS.jpg.mimeType).toBe('image/jpeg');
    expect(SUPPORTED_FORMAT_METAS.csv.category).toBe('spreadsheet');
  });

  it('detects PDF magic bytes (%PDF-)', async () => {
    const pdfHeader = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x35]);
    const file = new File([pdfHeader], 'test.pdf', { type: 'application/pdf' });
    const result = await detectMagicSignature(file);

    expect(result.magicMatch).toBe(true);
    expect(result.detected).toBe('pdf');
  });

  it('detects PNG magic bytes', async () => {
    const pngHeader = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00]);
    const file = new File([pngHeader], 'photo.png', { type: 'image/png' });
    const result = await detectMagicSignature(file);

    expect(result.magicMatch).toBe(true);
    expect(result.detected).toBe('png');
  });

  it('detects JPEG / JPG magic bytes', async () => {
    const jpgHeader = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10]);
    const file = new File([jpgHeader], 'photo.jpg', { type: 'image/jpeg' });
    const result = await detectMagicSignature(file);

    expect(result.magicMatch).toBe(true);
    expect(result.detected).toBe('jpg');
  });

  it('detects ZIP / DOCX magic bytes', async () => {
    const docxHeader = new Uint8Array([0x50, 0x4b, 0x03, 0x04, 0x14, 0x00]);
    const file = new File([docxHeader], 'agreement.docx');
    const result = await detectMagicSignature(file);

    expect(result.magicMatch).toBe(true);
    expect(result.detected).toBe('docx');
  });

  it('scans a plain text file correctly', async () => {
    const content = 'Header 1\nLine 2 of statement\nLine 3 of statement';
    const file = new File([content], 'notes.txt', { type: 'text/plain' });
    const result = await scanFile(file);

    expect(result.detectedFormat).toBe('txt');
    expect(result.fileName).toBe('notes.txt');
    expect(result.lineCountEstimate).toBe(3);
    expect(result.wordCountEstimate).toBe(10);
  });
});
