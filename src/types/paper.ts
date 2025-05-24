
export type PaperStyle = 'IEEE' | 'Scopus' | 'Springer' | 'Elsevier' | 'ACM' | 'APA';
export type PaperMode = 'manual' | 'ai-enhance';
export type OutputFormat = 'PDF' | 'Word' | 'LaTeX';
export type PaperSize = 'A4' | 'Letter';
export type ColumnLayout = 'single' | 'double';

export interface Author {
  name: string;
  affiliation: string;
  email?: string;
}

export interface SectionImage {
  url: string;
  caption: string;
  alt: string;
}

export interface PaperData {
  mode: PaperMode;
  style: PaperStyle;
  title: string;
  authors: Author[];
  abstract: string;
  keywords: string[];
  sections: Record<string, string>;
  sectionImages: Record<string, SectionImage[]>;
  references: string[];
  output: OutputFormat;
  paperSize: PaperSize;
  columns: ColumnLayout;
}

export interface StyleConfig {
  name: string;
  description: string;
  fontFamily: string;
  fontSize: string;
  lineHeight: string;
  margins: string;
  referenceStyle: string;
  color: string;
}
