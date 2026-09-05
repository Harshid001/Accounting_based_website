import { describe, expect, it } from 'vitest';
import {
  convertFile,
  DEFAULT_IMAGE_OPTIONS,
  DEFAULT_PDF_OPTIONS,
  generateOutputFileName,
  getAvailableConversionTargets,
} from '@/lib/converter/conversionEngine';
import type { ConversionJob, FileScanResult } from '@/lib/converter/types';

describe('conversionEngine', () => {
  it('returns valid target options for PDF input', () => {
    const targets = getAvailableConversionTargets('pdf');
    const ids = targets.map((t) => t.id);

    expect(ids).toContain('docx');
    expect(ids).toContain('doc');
    expect(ids).toContain('png');
    expect(ids).toContain('jpg');
    expect(ids).toContain('txt');
    expect(ids).toContain('html');
  });

  it('returns valid target options for PNG image input', () => {
    const targets = getAvailableConversionTargets('png');
    const ids = targets.map((t) => t.id);

    expect(ids).toContain('jpg');
    expect(ids).toContain('webp');
    expect(ids).toContain('pdf');
  });

  it('returns valid target options for JPG image input', () => {
    const targets = getAvailableConversionTargets('jpg');
    const ids = targets.map((t) => t.id);

    expect(ids).toContain('png');
    expect(ids).toContain('webp');
    expect(ids).toContain('pdf');
  });

  it('returns valid target options for Word input', () => {
    const targets = getAvailableConversionTargets('docx');
    const ids = targets.map((t) => t.id);

    expect(ids).toContain('pdf');
    expect(ids).toContain('txt');
    expect(ids).toContain('html');
  });

  it('returns valid target options for CSV / Spreadsheet input', () => {
    const targets = getAvailableConversionTargets('csv');
    const ids = targets.map((t) => t.id);

    expect(ids).toContain('pdf');
    expect(ids).toContain('json');
    expect(ids).toContain('html');
  });

  it('generates correct converted file names', () => {
    expect(generateOutputFileName('tax_invoice.pdf', 'docx')).toBe('tax_invoice-converted.docx');
    expect(generateOutputFileName('pan_card.png', 'jpg')).toBe('pan_card-converted.jpg');
    expect(generateOutputFileName('statement.csv', 'json')).toBe('statement-converted.json');
    expect(generateOutputFileName('notice.doc', 'pdf')).toBe('notice-converted.pdf');
  });

  it('converts CSV to JSON structured array', async () => {
    const csvContent = 'ClientName,GSTIN,Turnover\nAcme Corp,27AABCU9603R1ZM,5000000\nGlobex,24AABCG1234F1ZQ,2500000';
    const file = new File([csvContent], 'clients.csv', { type: 'text/csv' });

    const scan: FileScanResult = {
      fileName: 'clients.csv',
      originalExtension: 'csv',
      fileSizeBytes: file.size,
      fileSizeFormatted: '100 B',
      mimeType: 'text/csv',
      detectedFormat: 'csv',
      confidence: 'high',
      magicMatch: false,
    };

    const job: ConversionJob = {
      sourceFile: file,
      scanResult: scan,
      userOverrideFormat: 'csv',
      targetFormat: 'json',
      imageOptions: DEFAULT_IMAGE_OPTIONS,
      pdfOptions: DEFAULT_PDF_OPTIONS,
    };

    const result = await convertFile(job);

    expect(result.targetFormat).toBe('json');
    expect(result.mimeType).toBe('application/json');
    expect(result.outputFileName).toBe('clients-converted.json');

    const jsonText = await result.blob.text();
    const parsed = JSON.parse(jsonText) as Array<Record<string, string>>;

    expect(parsed).toHaveLength(2);
    expect(parsed[0]?.ClientName).toBe('Acme Corp');
    expect(parsed[0]?.GSTIN).toBe('27AABCU9603R1ZM');
    expect(parsed[1]?.ClientName).toBe('Globex');
  });

  it('converts plain text to PDF document', async () => {
    const textContent = 'Audit Report 2026\n\nAll GST accounts reconciled satisfactorily.';
    const file = new File([textContent], 'report.txt', { type: 'text/plain' });

    const scan: FileScanResult = {
      fileName: 'report.txt',
      originalExtension: 'txt',
      fileSizeBytes: file.size,
      fileSizeFormatted: '50 B',
      mimeType: 'text/plain',
      detectedFormat: 'txt',
      confidence: 'high',
      magicMatch: false,
    };

    const job: ConversionJob = {
      sourceFile: file,
      scanResult: scan,
      userOverrideFormat: 'txt',
      targetFormat: 'pdf',
      imageOptions: DEFAULT_IMAGE_OPTIONS,
      pdfOptions: DEFAULT_PDF_OPTIONS,
    };

    const result = await convertFile(job);

    expect(result.targetFormat).toBe('pdf');
    expect(result.mimeType).toBe('application/pdf');
    expect(result.blob.size).toBeGreaterThan(0);
  });

  it('converts plain text to Word DOCX document', async () => {
    const textContent = 'Tax Filing Checklist\n\n1. Form 16\n2. Capital Gains\n3. Bank Statements';
    const file = new File([textContent], 'checklist.txt', { type: 'text/plain' });

    const scan: FileScanResult = {
      fileName: 'checklist.txt',
      originalExtension: 'txt',
      fileSizeBytes: file.size,
      fileSizeFormatted: '80 B',
      mimeType: 'text/plain',
      detectedFormat: 'txt',
      confidence: 'high',
      magicMatch: false,
    };

    const job: ConversionJob = {
      sourceFile: file,
      scanResult: scan,
      userOverrideFormat: 'txt',
      targetFormat: 'docx',
      imageOptions: DEFAULT_IMAGE_OPTIONS,
      pdfOptions: DEFAULT_PDF_OPTIONS,
    };

    const result = await convertFile(job);

    expect(result.targetFormat).toBe('docx');
    expect(result.mimeType).toContain('wordprocessingml');
    expect(result.outputFileName).toBe('checklist-converted.docx');
    expect(result.blob.size).toBeGreaterThan(500); // DOCX zip package size
  });
});
