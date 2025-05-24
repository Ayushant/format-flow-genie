
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Download, Copy, FileText } from "lucide-react";
import { PaperData } from "@/types/paper";
import { useToast } from "@/hooks/use-toast";

interface PaperPreviewProps {
  paperData: PaperData;
}

const PaperPreview: React.FC<PaperPreviewProps> = ({ paperData }) => {
  const { toast } = useToast();

  const getStyleClasses = () => {
    switch (paperData.style) {
      case 'IEEE':
        return 'font-serif text-sm leading-tight';
      case 'APA':
        return 'font-serif text-base leading-relaxed';
      case 'ACM':
        return 'font-mono text-sm leading-tight';
      default:
        return 'font-sans text-base leading-normal';
    }
  };

  const enhanceContent = (content: string, sectionType: string) => {
    if (paperData.mode === 'ai-enhance' && (!content || content.trim().length < 50)) {
      return generateSampleContent(sectionType);
    }
    return content;
  };

  const generateSampleContent = (sectionType: string) => {
    const samples = {
      Introduction: `This paper presents a comprehensive study on ${paperData.title.toLowerCase() || 'the research topic'}. The rapid advancement in this field has created new opportunities and challenges that require systematic investigation. Our research addresses key gaps in the current literature and proposes novel approaches to solve existing problems.

The primary contributions of this work include: (1) a detailed analysis of current methodologies, (2) development of an improved framework, and (3) experimental validation of the proposed approach. The results demonstrate significant improvements over existing methods, with potential applications across multiple domains.`,

      'Related Work': `Recent studies in this area have focused on various approaches to address the challenges in ${paperData.title.toLowerCase() || 'this domain'}. Smith et al. (2023) proposed a framework that improved performance by 15%, while Johnson and Brown (2022) developed a novel algorithm that reduced computational complexity.

However, existing approaches suffer from several limitations: scalability issues, lack of generalization, and insufficient validation on real-world datasets. Our work builds upon these foundations while addressing the identified shortcomings through innovative methodological improvements.`,

      Methodology: `Our proposed methodology consists of three main phases: data preprocessing, model development, and validation. The experimental setup involves a comprehensive dataset collected from multiple sources, ensuring diversity and representativeness.

The preprocessing phase includes data cleaning, normalization, and feature extraction using state-of-the-art techniques. The model development phase incorporates novel algorithms designed specifically for this application domain. Finally, the validation phase employs cross-validation and statistical significance testing to ensure robust results.`,

      Results: `The experimental results demonstrate the effectiveness of our proposed approach. We achieved a 23% improvement in accuracy compared to baseline methods, with a 95% confidence interval of [0.18, 0.28]. The computational efficiency was also enhanced, showing a 35% reduction in processing time.

Statistical analysis using ANOVA revealed significant differences between our method and existing approaches (p < 0.001). The results were consistent across different test scenarios, indicating the robustness and generalizability of our approach.`,

      Conclusion: `This paper has presented a novel approach to ${paperData.title.toLowerCase() || 'the research problem'} with significant improvements over existing methods. The experimental validation confirms the effectiveness of our methodology, demonstrating both theoretical soundness and practical applicability.

Future work will focus on extending the approach to handle larger datasets and exploring applications in related domains. The open-source implementation of our method will be made available to facilitate further research and development in this important area.`
    };
    
    return samples[sectionType as keyof typeof samples] || `Content for ${sectionType} section would be generated here based on the paper title and context.`;
  };

  const formatReferences = () => {
    if (paperData.references.length === 0 && paperData.mode === 'ai-enhance') {
      return [
        '[1] Smith, J., et al. "Advanced Techniques in Modern Research." Journal of Scientific Studies, vol. 45, no. 3, pp. 123-145, 2023.',
        '[2] Johnson, A., and Brown, M. "Innovative Approaches to Data Analysis." Proceedings of the International Conference on Technology, 2022.',
        '[3] Davis, R. "Comprehensive Review of Current Methodologies." Academic Press, 2023.',
        '[4] Wilson, K., et al. "Experimental Validation of Novel Algorithms." IEEE Transactions on Research, vol. 12, no. 8, pp. 78-92, 2023.'
      ];
    }
    return paperData.references;
  };

  const copyToClipboard = () => {
    const content = document.getElementById('paper-content')?.innerText || '';
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied to clipboard",
      description: "Paper content has been copied to your clipboard.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Export Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Paper Preview</span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export {paperData.output}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Paper Content */}
      <Card>
        <CardContent className="p-8">
          <div id="paper-content" className={`${getStyleClasses()} max-w-none`}>
            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-4">
                {paperData.title || 'Research Paper Title'}
              </h1>
              
              {/* Authors */}
              <div className="mb-4">
                {paperData.authors.map((author, index) => (
                  <div key={index} className="mb-2">
                    <span className="font-medium">{author.name}</span>
                    {author.affiliation && (
                      <div className="text-sm italic text-gray-600">
                        {author.affiliation}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Separator className="my-6" />

            {/* Abstract */}
            <section className="mb-6">
              <h2 className="text-lg font-bold mb-3">Abstract</h2>
              <p className="text-justify">
                {enhanceContent(paperData.abstract, 'Abstract')}
              </p>
            </section>

            {/* Keywords */}
            {(paperData.keywords.length > 0 || paperData.mode === 'ai-enhance') && (
              <section className="mb-6">
                <h2 className="text-lg font-bold mb-3">Keywords</h2>
                <div className="flex flex-wrap gap-2">
                  {paperData.keywords.length > 0 
                    ? paperData.keywords.map((keyword) => (
                        <Badge key={keyword} variant="outline">{keyword}</Badge>
                      ))
                    : ['artificial intelligence', 'machine learning', 'data analysis', 'research methodology'].map((keyword) => (
                        <Badge key={keyword} variant="outline">{keyword}</Badge>
                      ))
                  }
                </div>
              </section>
            )}

            <Separator className="my-6" />

            {/* Sections */}
            {['Introduction', 'Related Work', 'Methodology', 'Results', 'Conclusion'].map((sectionName) => (
              <section key={sectionName} className="mb-6">
                <h2 className="text-lg font-bold mb-3">{sectionName}</h2>
                <div className="text-justify whitespace-pre-line">
                  {enhanceContent(paperData.sections[sectionName] || '', sectionName)}
                </div>
              </section>
            ))}

            <Separator className="my-6" />

            {/* References */}
            <section>
              <h2 className="text-lg font-bold mb-3">References</h2>
              <div className="space-y-2">
                {formatReferences().map((ref, index) => (
                  <div key={index} className="text-sm">
                    {ref}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </CardContent>
      </Card>

      {/* Style Information */}
      <Card>
        <CardHeader>
          <CardTitle>Format Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium">Style:</span> {paperData.style}
            </div>
            <div>
              <span className="font-medium">Layout:</span> {paperData.columns} column
            </div>
            <div>
              <span className="font-medium">Size:</span> {paperData.paperSize}
            </div>
            <div>
              <span className="font-medium">Output:</span> {paperData.output}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaperPreview;
