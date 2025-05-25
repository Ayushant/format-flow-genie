
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PaperStyle, StyleConfig } from "@/types/paper";

interface StyleSelectorProps {
  selectedStyle: PaperStyle;
  onStyleChange: (style: PaperStyle) => void;
}

const styleConfigs: Record<PaperStyle, StyleConfig> = {
  IEEE: {
    name: 'IEEE',
    description: 'Institute of Electrical and Electronics Engineers',
    fontFamily: 'Times New Roman',
    fontSize: '10pt',
    lineHeight: 'Single',
    margins: 'Two-column format',
    referenceStyle: 'IEEE style, numbered references',
    color: 'bg-blue-900/30 border-blue-500',
    layout: 'Two-column',
    spacing: 'Single-spaced',
    headings: 'Level 1: Roman numeral, small caps, centered; Level 2: Capital letter, italicized',
    figures: 'Top or bottom of columns only',
    pageNumbers: 'Not included'
  },
  Scopus: {
    name: 'Scopus',
    description: 'Varies by journal - Check specific guidelines',
    fontFamily: 'Varies by journal',
    fontSize: 'Varies',
    lineHeight: 'Varies',
    margins: 'Check journal guidelines',
    referenceStyle: 'Journal-specific format',
    color: 'bg-orange-900/30 border-orange-500',
    layout: 'Varies by journal',
    spacing: 'Check guidelines',
    headings: 'Follow journal template',
    figures: 'As per journal requirements',
    pageNumbers: 'As specified'
  },
  Springer: {
    name: 'Springer',
    description: 'Springer Nature Publishing',
    fontFamily: 'Times New Roman',
    fontSize: '11pt',
    lineHeight: 'Double-spaced',
    margins: '1-inch on all sides',
    referenceStyle: 'Journal-specific citation style',
    color: 'bg-green-900/30 border-green-500',
    layout: 'Single-column (varies by journal)',
    spacing: 'Double-spaced',
    headings: 'Consistent formatting per template',
    figures: 'As per journal guidelines',
    pageNumbers: 'As specified'
  },
  Elsevier: {
    name: 'Elsevier',
    description: 'Elsevier Journal Format - "Your Paper Your Way"',
    fontFamily: 'Times New Roman',
    fontSize: '12pt',
    lineHeight: 'Double-spaced',
    margins: '1-inch on all sides',
    referenceStyle: 'Flexible - ensure consistency',
    color: 'bg-red-900/30 border-red-500',
    layout: 'Single-column',
    spacing: 'Double-spaced throughout',
    headings: 'Section: Bold 14pt; Subheadings: Bold 12pt',
    figures: 'Flexible placement',
    pageNumbers: 'As specified'
  },
  ACM: {
    name: 'ACM',
    description: 'Association for Computing Machinery',
    fontFamily: 'Times New Roman',
    fontSize: '10pt',
    lineHeight: 'As per template',
    margins: 'Single-column submission, double-column final',
    referenceStyle: 'ACM Reference Format (BibTeX recommended)',
    color: 'bg-purple-900/30 border-purple-500',
    layout: 'Single-column (submission) / Double-column (final)',
    spacing: 'Template-specified',
    headings: 'Follow ACM template hierarchy',
    figures: 'Template guidelines',
    pageNumbers: 'Template-specified'
  },
  APA: {
    name: 'APA',
    description: 'American Psychological Association - 7th Edition',
    fontFamily: 'Times New Roman 12pt / Calibri 11pt / Arial 11pt',
    fontSize: '12pt (Times) / 11pt (Calibri/Arial)',
    lineHeight: 'Double-spaced',
    margins: '1-inch on all sides',
    referenceStyle: 'Alphabetical order on reference page',
    color: 'bg-indigo-900/30 border-indigo-500',
    layout: 'Single-column',
    spacing: 'Double-spaced throughout',
    headings: 'Five levels with specific formatting',
    figures: 'After references or embedded',
    pageNumbers: 'Top right corner'
  }
};

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onStyleChange }) => {
  return (
    <div className="space-y-3">
      {Object.entries(styleConfigs).map(([key, config]) => (
        <Card 
          key={key}
          className={`cursor-pointer transition-all duration-200 hover:shadow-lg bg-gray-800 border-gray-700 hover:border-gray-600 ${
            selectedStyle === key ? config.color + ' ring-2 ring-offset-2 ring-offset-gray-900' : ''
          }`}
          onClick={() => onStyleChange(key as PaperStyle)}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm text-gray-100">{config.name}</h3>
              {selectedStyle === key && (
                <Badge variant="default" className="text-xs bg-blue-600">Selected</Badge>
              )}
            </div>
            <p className="text-xs text-gray-400 mb-3">{config.description}</p>
            
            <div className="space-y-1 text-xs text-gray-500">
              <div><span className="text-gray-400">Font:</span> {config.fontFamily} {config.fontSize}</div>
              <div><span className="text-gray-400">Layout:</span> {config.layout}</div>
              <div><span className="text-gray-400">Spacing:</span> {config.spacing}</div>
              <div><span className="text-gray-400">Margins:</span> {config.margins}</div>
              <div><span className="text-gray-400">References:</span> {config.referenceStyle}</div>
              {config.headings && (
                <div><span className="text-gray-400">Headings:</span> {config.headings}</div>
              )}
              {config.figures && (
                <div><span className="text-gray-400">Figures:</span> {config.figures}</div>
              )}
              {config.pageNumbers && (
                <div><span className="text-gray-400">Pages:</span> {config.pageNumbers}</div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StyleSelector;
