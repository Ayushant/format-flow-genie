
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
    color: 'bg-blue-900/30 border-blue-500'
  },
  Scopus: {
    name: 'Scopus',
    description: 'Elsevier Scopus Database Style',
    fontFamily: 'Calibri',
    fontSize: '12pt',
    lineHeight: '1.5',
    margins: '1in',
    referenceStyle: 'APA',
    color: 'bg-orange-900/30 border-orange-500'
  },
  Springer: {
    name: 'Springer',
    description: 'Springer Nature Publishing',
    fontFamily: 'Computer Modern',
    fontSize: '11pt',
    lineHeight: '13pt',
    margins: '1in',
    referenceStyle: 'Numbered',
    color: 'bg-green-900/30 border-green-500'
  },
  Elsevier: {
    name: 'Elsevier',
    description: 'Elsevier Journal Format',
    fontFamily: 'Arial',
    fontSize: '12pt',
    lineHeight: '1.5',
    margins: '1in',
    referenceStyle: 'APA',
    color: 'bg-red-900/30 border-red-500'
  },
  ACM: {
    name: 'ACM',
    description: 'Association for Computing Machinery',
    fontFamily: 'Computer Modern',
    fontSize: '9pt',
    lineHeight: '11pt',
    margins: '0.75in',
    referenceStyle: 'Numbered',
    color: 'bg-purple-900/30 border-purple-500'
  },
  APA: {
    name: 'APA',
    description: 'American Psychological Association',
    fontFamily: 'Times New Roman',
    fontSize: '12pt',
    lineHeight: '2.0',
    margins: '1in',
    referenceStyle: 'Author-Date',
    color: 'bg-indigo-900/30 border-indigo-500'
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
            <p className="text-xs text-gray-400 mb-2">{config.description}</p>
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
