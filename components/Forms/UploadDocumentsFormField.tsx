"use client";

interface UploadDocumentsFormFieldProps {
  onChange: (...event: any[]) => void;
  onBlur: () => void;
  value: string[] | undefined;
  disabled?: boolean;
  name: string;
  ref: React.Ref<any>;
}

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { removeFile } from "@/app/utils/removeFile";
import { uploadFile } from "@/app/utils/uploadImage";
import Link from "next/link";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import getFileIcon from "@/lib/utils";

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

const UploadDocumentsFormField = forwardRef(
  (props: UploadDocumentsFormFieldProps, ref) => {
    const [files, setFiles] = useState<File[]>([]);
    const [filesURL, setFilesUrl] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);
    const [removing, setRemoving] = useState<boolean>(false);

    //TODO: ADD THE NAME OF THE FILE IN ANOTHER PROPERTY
    useEffect(() => {
      // Cada vez que filesURL cambia, llamamos a props.onChange para actualizar el valor del formulario
      props.onChange({ target: { name: props.name, value: filesURL } });
    }, [filesURL]);

    const handleUpload = async (files: File[]) => {
      setUploading(true);
      const urls = await Promise.all(files.map((file) => uploadFile(file)));
      setFilesUrl([...filesURL, ...urls]);
      // onChange(filesURL);
      setUploading(false);
    };

    const handleFiles = (fileList: FileList) => {
      const filesArray = Array.from(fileList);
      handleUpload(filesArray);
      setFiles([...files, ...filesArray]);
    };

    const handleRemove = async (index: number) => {
      setRemoving(true);
      await Promise.all(
        files.filter((_, i) => i === index).map((file) => removeFile(file.name))
      );
      setFiles(files.filter((_, i) => i !== index));
      setRemoving(false);
    };

    return (
      <div className="w-full max-w-sm">
        <div className="space-y-8">
          <div
            className="flex flex-col items-center justify-center space-y-4 rounded-lg border-2 border-dashed border-gray-300 p-8"
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                handleFiles(e.dataTransfer.files);
                e.dataTransfer.clearData();
                handleUpload(e as any);
              }
            }}
          >
            <UploadIcon className="h-8 w-8 text-gray-400" />
            <p className="text-gray-500">
              Arrastra y Suelta tus documentos aquí
            </p>
            <Input
              className="hidden"
              id="file-upload"
              type="file"
              multiple
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleFiles(e.target.files);
                }
              }}
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
              <h3 className="text-lg font-semibold">
                Documentos Seleccionados:
              </h3>
              <div className="space-y-4">
                {files &&
                  files.map((file, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <Image
                        alt="File Thumbnail"
                        className={`aspect-[1/1] rounded-md object-cover ${
                          uploading ? "animate-pulse" : ""
                        }`}
                        height="50"
                        src={getFileIcon(file)}
                        width="50"
                      />
                      <Link
                        target="_blank"
                        className="hover:underline"
                        href={(filesURL && filesURL[index]) || ""}
                      >
                        {file.name.split(".")[0]}
                      </Link>
                      <Button
                        type="button"
                        className={removing ? "animate-pulse" : ""}
                        variant={"ghost"}
                        onClick={() => handleRemove(index)}
                      >
                        <X size={21} />
                      </Button>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);
UploadDocumentsFormField.displayName = "UploadDocumentsFormField";
export default UploadDocumentsFormField;
