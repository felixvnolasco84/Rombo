"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";

export default function UploadDocumentsFormField() {
  //Array of files
  const [files, setFiles] = useState<File[]>([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const filesArray = Array.from(fileList);
      setFiles(filesArray);
    }
  };


  function getFileIcon(file: File) {
    const extension = file.name.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "pdf":
        return "/public/svg/pdf-icon.svg";
      case "doc":
      case "docx":
        return "/public/word-icon.svg";
      case "ppt":
      case "pptx":
        return "/public/ppt-icon.svg";
      default:
        return "/placeholder.svg";
    }
  }

  return (
    <div className="w-full max-w-sm">
      <div className="space-y-8">
        <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border-2 border-dashed border-gray-300 p-8">
          <UploadIcon className="h-8 w-8 text-gray-400" />
          <p className="text-gray-500">Arrastra y Suelta tus documentos aquí</p>
          <Input
            className="hidden"
            id="file-upload"
            type="file"
            onChange={handleUpload}
          />
          <Label
            className="cursor-pointer rounded-md bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300"
            htmlFor="file-upload"
          >
            Subir Documentos
          </Label>
        </div>

        {files.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold">Documentos Seleccionados:</h3>

            <div className="space-y-4">
              {files.map((file, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <Image
                    alt="File Thumbnail"
                    className="aspect-[1/1] rounded-md object-cover"
                    height="50"
                    src={getFileIcon(file)}
                    width="50"
                  />
                  {/* Remove the extension in the name file */}
                    <p>{file.name.split(".")[0]}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function UploadIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}
