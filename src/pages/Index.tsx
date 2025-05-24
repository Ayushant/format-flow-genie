
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Sparkles, Settings } from "lucide-react";
import PaperInputForm from "@/components/PaperInputForm";
import PaperPreview from "@/components/PaperPreview";
import StyleSelector from "@/components/StyleSelector";
import { PaperData, PaperStyle } from "@/types/paper";

const Index = () => {
  const [paperData, setPaperData] = useState<PaperData>({
    mode: 'manual',
    style: 'IEEE',
    title: '',
    authors: [],
    abstract: '',
    keywords: [],
    sections: {},
    sectionImages: {},
    references: [],
    output: 'PDF',
    paperSize: 'A4',
    columns: 'double'
  });

  const [activeTab, setActiveTab] = useState('input');

  const handleDataChange = (newData: Partial<PaperData>) => {
    setPaperData(prev => ({ ...prev, ...newData }));
  };

  const handleGenerate = () => {
    setActiveTab('preview');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Research Paper Formatter</h1>
                <p className="text-sm text-gray-400">Smart academic paper formatting & enhancement</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Style Selection */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-gray-100">Format Style</CardTitle>
                <CardDescription className="text-gray-400">Select your target journal or conference</CardDescription>
              </CardHeader>
              <CardContent>
                <StyleSelector 
                  selectedStyle={paperData.style}
                  onStyleChange={(style) => handleDataChange({ style })}
                />
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-800 border-gray-700">
                <TabsTrigger value="input" className="flex items-center space-x-2 data-[state=active]:bg-gray-700 text-gray-300">
                  <FileText className="h-4 w-4" />
                  <span>Input & Edit</span>
                </TabsTrigger>
                <TabsTrigger value="preview" className="flex items-center space-x-2 data-[state=active]:bg-gray-700 text-gray-300">
                  <Sparkles className="h-4 w-4" />
                  <span>Preview & Generate</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="input">
                <PaperInputForm 
                  paperData={paperData}
                  onDataChange={handleDataChange}
                  onGenerate={handleGenerate}
                />
              </TabsContent>

              <TabsContent value="preview">
                <PaperPreview paperData={paperData} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
