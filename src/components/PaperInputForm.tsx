
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Plus, X, Sparkles, FileText } from "lucide-react";
import { PaperData, Author } from "@/types/paper";

interface PaperInputFormProps {
  paperData: PaperData;
  onDataChange: (data: Partial<PaperData>) => void;
  onGenerate: () => void;
}

const PaperInputForm: React.FC<PaperInputFormProps> = ({ paperData, onDataChange, onGenerate }) => {
  const addAuthor = () => {
    onDataChange({
      authors: [...paperData.authors, { name: '', affiliation: '' }]
    });
  };

  const updateAuthor = (index: number, field: keyof Author, value: string) => {
    const newAuthors = [...paperData.authors];
    newAuthors[index] = { ...newAuthors[index], [field]: value };
    onDataChange({ authors: newAuthors });
  };

  const removeAuthor = (index: number) => {
    onDataChange({
      authors: paperData.authors.filter((_, i) => i !== index)
    });
  };

  const addKeyword = (keyword: string) => {
    if (keyword && !paperData.keywords.includes(keyword)) {
      onDataChange({
        keywords: [...paperData.keywords, keyword]
      });
    }
  };

  const removeKeyword = (keyword: string) => {
    onDataChange({
      keywords: paperData.keywords.filter(k => k !== keyword)
    });
  };

  const updateSection = (sectionName: string, content: string) => {
    onDataChange({
      sections: { ...paperData.sections, [sectionName]: content }
    });
  };

  const standardSections = ['Introduction', 'Related Work', 'Methodology', 'Results', 'Conclusion'];

  return (
    <div className="space-y-6">
      {/* Mode Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5" />
            <span>Enhancement Mode</span>
          </CardTitle>
          <CardDescription>
            Choose whether to enhance content with AI or format manually
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch
                checked={paperData.mode === 'ai-enhance'}
                onCheckedChange={(checked) => 
                  onDataChange({ mode: checked ? 'ai-enhance' : 'manual' })
                }
              />
              <Label>AI Enhancement</Label>
            </div>
            <Badge variant={paperData.mode === 'ai-enhance' ? 'default' : 'secondary'}>
              {paperData.mode === 'ai-enhance' ? 'AI will enhance missing sections' : 'Manual formatting only'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Paper Title</Label>
            <Input
              id="title"
              value={paperData.title}
              onChange={(e) => onDataChange({ title: e.target.value })}
              placeholder="Enter your paper title..."
              className="mt-1"
            />
          </div>

          <div>
            <Label>Authors</Label>
            <div className="space-y-3 mt-2">
              {paperData.authors.map((author, index) => (
                <div key={index} className="flex space-x-2">
                  <Input
                    placeholder="Full Name"
                    value={author.name}
                    onChange={(e) => updateAuthor(index, 'name', e.target.value)}
                  />
                  <Input
                    placeholder="Institution/Affiliation"
                    value={author.affiliation}
                    onChange={(e) => updateAuthor(index, 'affiliation', e.target.value)}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeAuthor(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={addAuthor} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Author
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Abstract and Keywords */}
      <Card>
        <CardHeader>
          <CardTitle>Abstract & Keywords</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="abstract">Abstract</Label>
            <Textarea
              id="abstract"
              value={paperData.abstract}
              onChange={(e) => onDataChange({ abstract: e.target.value })}
              placeholder={paperData.mode === 'ai-enhance' 
                ? "Enter your abstract or leave blank for AI generation..." 
                : "Enter your abstract..."
              }
              rows={4}
              className="mt-1"
            />
          </div>

          <div>
            <Label>Keywords</Label>
            <div className="flex flex-wrap gap-2 mt-2 mb-2">
              {paperData.keywords.map((keyword) => (
                <Badge key={keyword} variant="secondary" className="cursor-pointer">
                  {keyword}
                  <X 
                    className="h-3 w-3 ml-1" 
                    onClick={() => removeKeyword(keyword)}
                  />
                </Badge>
              ))}
            </div>
            <Input
              placeholder="Type keyword and press Enter"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addKeyword(e.currentTarget.value);
                  e.currentTarget.value = '';
                }
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Sections */}
      <Card>
        <CardHeader>
          <CardTitle>Paper Sections</CardTitle>
          <CardDescription>
            {paperData.mode === 'ai-enhance' 
              ? "Add content for sections you have, leave others blank for AI generation"
              : "Add content for all required sections"
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {standardSections.map((section) => (
            <div key={section}>
              <Label htmlFor={section}>{section}</Label>
              <Textarea
                id={section}
                value={paperData.sections[section] || ''}
                onChange={(e) => updateSection(section, e.target.value)}
                placeholder={paperData.mode === 'ai-enhance' 
                  ? `Enter ${section} content or leave blank for AI generation...`
                  : `Enter ${section} content...`
                }
                rows={6}
                className="mt-1"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* References */}
      <Card>
        <CardHeader>
          <CardTitle>References</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={paperData.references.join('\n')}
            onChange={(e) => onDataChange({ references: e.target.value.split('\n').filter(ref => ref.trim()) })}
            placeholder="Enter references (one per line)..."
            rows={6}
          />
        </CardContent>
      </Card>

      {/* Generate Button */}
      <div className="flex justify-center">
        <Button 
          onClick={onGenerate}
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 px-8"
        >
          <FileText className="h-5 w-5 mr-2" />
          {paperData.mode === 'ai-enhance' ? 'Generate & Enhance Paper' : 'Format Paper'}
        </Button>
      </div>
    </div>
  );
};

export default PaperInputForm;
