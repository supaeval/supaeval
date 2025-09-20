"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  SkipForward,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Mock data for demonstration
const mockResources = [
  {
    id: "1",
    name: "image-001.jpg",
    url: "https://www.ecartegrise.fr/wp-content/uploads/2013/03/nouvelle-carte-grise-specimen.jpg",
  },
  {
    id: "2",
    name: "image-002.jpg",
    url: "https://www.ecartegrise.fr/wp-content/uploads/2013/03/nouvelle-carte-grise-specimen.jpg",
  },
  {
    id: "3",
    name: "image-003.jpg",
    url: "https://www.ecartegrise.fr/wp-content/uploads/2013/03/nouvelle-carte-grise-specimen.jpg",
  },
];

const mockAnnotations = [
  { key: "license_plate", value: "AB-123-CD" },
  { key: "vehicle_type", value: "car" },
  { key: "color", value: "blue" },
];

export default function AnnotationPage({
  params,
}: {
  params: { id: string; resourceId: string };
}) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [annotations, setAnnotations] = useState(mockAnnotations);

  const currentResource = mockResources[currentIndex];
  const totalCount = mockResources.length;

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalCount - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleAddAnnotation = () => {
    setAnnotations([...annotations, { key: "", value: "" }]);
  };

  const handleUpdateAnnotation = (
    index: number,
    field: "key" | "value",
    value: string,
  ) => {
    const updated = [...annotations];
    updated[index][field] = value;
    setAnnotations(updated);
  };

  const handleRemoveAnnotation = (index: number) => {
    setAnnotations(annotations.filter((_, i) => i !== index));
  };

  const handleValidate = () => {
    console.log("Validate annotations:", annotations);
  };

  const handleRemove = () => {
    console.log("Remove resource");
  };

  const handleSkip = () => {
    console.log("Skip resource");
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-50 fixed inset-0">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        {/* Left: Back button and image name */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>
          <div className="h-6 w-px bg-gray-300"></div>
          <h1 className="text-lg font-semibold text-gray-900">
            {currentResource.name}
          </h1>
        </div>

        {/* Middle: Image navigation */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-sm font-medium text-gray-700">
            {currentIndex + 1} / {totalCount}
          </span>
          <button
            onClick={handleNext}
            disabled={currentIndex === totalCount - 1}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Right: Action buttons */}
        <div className="flex items-center space-x-3">
          <Button
            onClick={handleValidate}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Check className="h-4 w-4 mr-2" />
            Validate
          </Button>
          <Button
            onClick={handleRemove}
            variant="outline"
            className="border-red-300 text-red-600 hover:bg-red-50"
          >
            <X className="h-4 w-4 mr-2" />
            Remove
          </Button>
          <Button
            onClick={handleSkip}
            variant="outline"
            className="border-gray-300 text-gray-600 hover:bg-gray-50"
          >
            <SkipForward className="h-4 w-4 mr-2" />
            Skip
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Image (3/4) */}
        <div className="flex-1 bg-white border-r border-gray-200 flex items-center justify-center p-8">
          <div className="max-w-full max-h-full">
            <img
              src={currentResource.url}
              alt={currentResource.name}
              className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
              onError={(e) => {
                e.currentTarget.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='200' y='150' text-anchor='middle' dy='.3em' fill='%236b7280'%3EImage not found%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>
        </div>

        {/* Right Column: Annotation Form (1/4) */}
        <div className="w-1/4 bg-white p-6 overflow-y-auto">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Annotations
              </h2>
              <Button
                onClick={handleAddAnnotation}
                size="sm"
                variant="outline"
                className="border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>

            <div className="space-y-4">
              {annotations.map((annotation, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-gray-700">
                      Annotation {index + 1}
                    </Label>
                    <button
                      onClick={() => handleRemoveAnnotation(index)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <Label
                        htmlFor={`key-${index}`}
                        className="text-xs text-gray-600"
                      >
                        Key
                      </Label>
                      <Input
                        id={`key-${index}`}
                        value={annotation.key}
                        onChange={(e) =>
                          handleUpdateAnnotation(index, "key", e.target.value)
                        }
                        placeholder="Enter key..."
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor={`value-${index}`}
                        className="text-xs text-gray-600"
                      >
                        Value
                      </Label>
                      <Input
                        id={`value-${index}`}
                        value={annotation.value}
                        onChange={(e) =>
                          handleUpdateAnnotation(index, "value", e.target.value)
                        }
                        placeholder="Enter value..."
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {annotations.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm">No annotations yet</p>
                  <p className="text-xs mt-1">
                    Click "Add" to create your first annotation
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
