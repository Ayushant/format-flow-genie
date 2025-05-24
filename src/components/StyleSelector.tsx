
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
    lineHeight: '12pt',
    margins: '0.75in',
    referenceStyle: 'Numbered',
    color: 'bg-blue-100 border-blue-300'
  },
  Scopus: {
    name: 'Scopus',
    description: 'Elsevier Scopus Database Style',
    fontFamily: 'Calibri',
    fontSize: '12pt',
    lineHeight: '1.5',
    margins: '1in',
    referenceStyle: 'APA',
    color: 'bg-orange-100 border-orange-300'
  },
  Springer: {
    name: 'Springer',
    description: 'Springer Nature Publishing',
    fontFamily: 'Computer Modern',
    fontSize: '11pt',
    lineHeight: '13pt',
    margins: '1in',
    referenceStyle: 'Numbered',
    color: 'bg-green-100 border-green-300'
  },
  Elsevier: {
    name: 'Elsevier',
    description: 'Elsevier Journal Format',
    fontFamily: 'Arial',
    fontSize: '12pt',
    lineHeight: '1.5',
    margins: '1in',
    referenceStyle: 'APA',
    color: 'bg-red-100 border-red-300'
  },
  ACM: {
    name: 'ACM',
    description: 'Association for Computing Machinery',
    fontFamily: 'Computer Modern',
    fontSize: '9pt',
    lineHeight: '11pt',
    margins: '0.75in',
    referenceStyle: 'Numbered',
    color: 'bg-purple-100 border-purple-300'
  },
  APA: {
    name: 'APA',
    description: 'American Psychological Association',
    fontFamily: 'Times New Roman',
    fontSize: '12pt',
    lineHeight: '2.0',
    margins: '1in',
    referenceStyle: 'Author-Date',
    color: 'bg-indigo-100 border-indigo-300'
  }
};

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onStyleChange }) => {
  return (
    <div className="space-y-3">
      {Object.entries(styleConfigs).map(([key, config]) => (
        <Card 
          key={key}
          className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
            selectedStyle === key ? config.color + ' ring-2 ring-offset-2' : 'hover:bg-gray-50'
          }`}
          onClick={() => onStyleChange(key as PaperStyle)}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm">{config.name}</h3>
              {selectedStyle === key && (
                <Badge variant="default" className="text-xs">Selected</Badge>
              )}
            </div>
            <p className="text-xs text-gray-600 mb-2">{config.description}</p>
            <div className="space-y-1 text-xs text-gray-500">
              <div>Font: {config.fontFamily} {config.fontSize}</div>
              <div>References: {config.referenceStyle}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StyleSelector;
