
import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { X, Upload, Image } from "lucide-react";
import { SectionImage } from "@/types/paper";

interface ImageUploadProps {
  sectionName: string;
  images: SectionImage[];
  onImagesChange: (images: SectionImage[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ sectionName, images, onImagesChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    
    const newImages: SectionImage[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        // Create object URL for preview
        const url = URL.createObjectURL(file);
        newImages.push({
          url,
          caption: `Figure ${images.length + newImages.length + 1}: ${file.name.split('.')[0]}`,
          alt: file.name.split('.')[0]
        });
      }
    }
    
    onImagesChange([...images, ...newImages]);
    setIsUploading(false);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const updateCaption = (index: number, caption: string) => {
    const newImages = [...images];
    newImages[index].caption = caption;
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      {/* Upload Button */}
      <div className="flex items-center space-x-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="border-gray-600 text-gray-300 hover:bg-gray-800"
        >
          <Upload className="h-4 w-4 mr-2" />
          {isUploading ? 'Uploading...' : 'Add Images'}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Image List */}
      {images.length > 0 && (
        <div className="space-y-3">
          {images.map((image, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-20 h-20 object-cover rounded border border-gray-600"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-gray-300">Caption</Label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeImage(index)}
                        className="text-gray-400 hover:text-red-400"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input
                      value={image.caption}
                      onChange={(e) => updateCaption(index, e.target.value)}
                      placeholder="Enter image caption..."
                      className="bg-gray-900 border-gray-600 text-gray-100"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
