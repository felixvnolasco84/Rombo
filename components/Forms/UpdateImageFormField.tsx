"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { forwardRef, useEffect, useState } from "react";
import { uploadFile } from "@/app/utils/uploadImage";
import Link from "next/link";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import getFileIcon, { DocumentUpload } from "@/lib/utils";

interface UploadDocumentsFormFieldProps {
  onChange: (...event: any[]) => void;
  onBlur: () => void;
  value: string | undefined;
  disabled?: boolean;
  img: string;
  name: string;
  ref: React.Ref<any>;
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

const UpdateImageFormField = forwardRef(
  (props: UploadDocumentsFormFieldProps, ref) => {
    const [img, setImg] = useState<string>(props?.img || "");
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (files: File[]) => {
      setUploading(true);
      const image = await uploadFile(files[0]);

      setImg(image);
      setUploading(false);
      props.onChange({ target: { name: props.name, value: image } });
    };

    const handleFiles = (fileList: FileList) => {
      const filesArray = Array.from(fileList);
      handleUpload(filesArray);
    };

    return (
      <div className="w-full">
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
              }
            }}
          >
            {img && (
              <Image
                alt="File Thumbnail"
                className={`aspect-[1/1] rounded-md object-cover ${
                  uploading ? "animate-pulse" : ""
                }`}
                height="200"
                src={img}
                style={{
                  aspectRatio: "200/200",
                  objectFit: "cover",
                }}
                width="200"
              />
            )}
            {/* <UploadIcon className="h-8 w-8 text-gray-400" />
            <p className="text-gray-500">
              Arrastra y Suelta tu imagen de perfil aquí
            </p> */}
            <Input
              className="hidden"
              id="file-upload"
              type="file"
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
              {img ? "Cambiar Imagen" : "Seleccionar Imagen"}
            </Label>
          </div>
          {/* {img && (
            <div>
              <h3 className="text-lg font-semibold">
                Imagen de Perfil Seleccionada:
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Image
                    alt="File Thumbnail"
                    className={`aspect-[1/1] rounded-md object-cover ${
                      uploading ? "animate-pulse" : ""
                    }`}
                    height="40"
                    src={img}
                    style={{
                      aspectRatio: "40/40",
                      objectFit: "cover",
                    }}
                    width="50"
                  />
                  <Link target="_blank" className="hover:underline" href={img}>
                    Ver Imagen
                  </Link>
                </div>
              </div>
            </div>
          )} */}
        </div>
      </div>
    );
  }
);
UpdateImageFormField.displayName = "UploadDocumentsFormField";
export default UpdateImageFormField;
