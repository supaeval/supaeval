"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Label } from "./label";
import { Image, FileText, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const projectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  type: z.enum([
    "MULTIMODAL",
    "IMAGE_EXTRACTION",
    "LLM_TEXT",
    "INSTANCE_SEGMENTATION",
  ]),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectType {
  id: "MULTIMODAL" | "IMAGE_EXTRACTION" | "LLM_TEXT" | "INSTANCE_SEGMENTATION";
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  available: boolean;
}

const projectTypes: ProjectType[] = [
  {
    id: "MULTIMODAL",
    name: "Multimodal extraction",
    description: "Extract data from images, documents, and text",
    icon: Image,
    available: true,
  },
  {
    id: "IMAGE_EXTRACTION",
    name: "Image extraction",
    description: "Extract data from images using AI",
    icon: Image,
    available: true,
  },
  {
    id: "LLM_TEXT",
    name: "LLM Text extraction",
    description: "Extract structured data from text using AI",
    icon: FileText,
    available: false,
  },
  {
    id: "INSTANCE_SEGMENTATION",
    name: "Instance segmentation",
    description: "Identify and segment objects in images",
    icon: Target,
    available: false,
  },
];

interface NewProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ProjectFormData) => void;
  isLoading?: boolean;
  error?: string;
}

export function NewProjectDialog({
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
  error,
}: NewProjectDialogProps) {
  const [selectedType, setSelectedType] = useState<
    "MULTIMODAL" | "IMAGE_EXTRACTION" | "LLM_TEXT" | "INSTANCE_SEGMENTATION"
  >("MULTIMODAL");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "MULTIMODAL",
    },
  });

  const handleFormSubmit = (data: ProjectFormData) => {
    onSubmit({ ...data, type: selectedType });
  };

  const handleTypeSelect = (
    type:
      | "MULTIMODAL"
      | "IMAGE_EXTRACTION"
      | "LLM_TEXT"
      | "INSTANCE_SEGMENTATION",
  ) => {
    setSelectedType(type);
    setValue("type", type);
  };

  const handleClose = () => {
    reset();
    setSelectedType("MULTIMODAL");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Set up a new project to start extracting and analyzing your data.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                placeholder="Enter project name"
                {...register("name")}
                className={cn(errors.name && "border-red-500")}
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your project"
                rows={3}
                {...register("description")}
                className={cn(errors.description && "border-red-500")}
              />
              {errors.description && (
                <p className="text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label>Project Type</Label>
              <div className="grid grid-cols-1 gap-3">
                {projectTypes.map((type) => {
                  const Icon = type.icon;
                  const isSelected = selectedType === type.id;
                  const isDisabled = !type.available;

                  return (
                    <div
                      key={type.id}
                      className={cn(
                        "relative rounded-lg border p-4 cursor-pointer transition-all",
                        isSelected && "border-blue-500 bg-blue-50",
                        isDisabled && "opacity-50 cursor-not-allowed",
                        !isDisabled &&
                          !isSelected &&
                          "border-gray-200 hover:border-gray-300 hover:bg-gray-50",
                      )}
                      onClick={() => !isDisabled && handleTypeSelect(type.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className={cn(
                            "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center",
                            isSelected ? "bg-blue-100" : "bg-gray-100",
                          )}
                        >
                          <Icon
                            className={cn(
                              "h-5 w-5",
                              isSelected ? "text-blue-600" : "text-gray-600",
                            )}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3
                            className={cn(
                              "text-sm font-medium",
                              isSelected ? "text-blue-900" : "text-gray-900",
                            )}
                          >
                            {type.name}
                          </h3>
                          <p
                            className={cn(
                              "text-sm mt-1",
                              isSelected ? "text-blue-700" : "text-gray-600",
                            )}
                          >
                            {type.description}
                          </p>
                          {!type.available && (
                            <p className="text-xs text-gray-500 mt-1">
                              Coming soon
                            </p>
                          )}
                        </div>
                        {isSelected && (
                          <div className="flex-shrink-0">
                            <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-white" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
              disabled={
                !projectTypes.find((t) => t.id === selectedType)?.available
              }
            >
              Create Project
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
