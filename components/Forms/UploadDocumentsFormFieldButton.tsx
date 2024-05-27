"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { forwardRef, useEffect, useState } from "react";
import { removeFile } from "@/app/utils/removeFile";
import { uploadFile } from "@/app/utils/uploadImage";
import Link from "next/link";
import { Button } from "../ui/button";
import {  Paperclip, XIcon } from "lucide-react";
import getFileIcon, { DocumentUpload } from "@/lib/utils";

interface UploadDocumentsFormFieldProps {
  onChange: (...event: any[]) => void;
  onBlur: () => void;
  value: DocumentUpload[] | undefined;
  disabled?: boolean;
  name: string;
  ref: React.Ref<any>;
}

const UploadDocumentsFormFieldButton = forwardRef(
  (props: UploadDocumentsFormFieldProps, ref) => {
    const [files, setFiles] = useState<File[]>([]);
    const [filesArray, setFilesArray] = useState<DocumentUpload[]>([]);
    const [uploading, setUploading] = useState(false);
    const [removing, setRemoving] = useState<boolean>(false);

    useEffect(() => {
      props.onChange({ target: { name: props.name, value: filesArray } });
    }, [filesArray]);

    const handleUpload = async (files: File[]) => {
      setUploading(true);
      const fileObjects = await Promise.all(
        files.map(async (file) => {
          const url = await uploadFile(file);
          return { name: file.name, url };
        })
      );
      setFilesArray([...filesArray, ...fileObjects]);
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
      <div className="w-full">
        <div className="space-y-8">
          <div className="flex flex-col items-end justify-center space-y-4 rounded-lg">
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
              className="cursor-pointer rounded-md border border-gray-200 bg-transparent px-4 py-2 text-sm hover:bg-gray-100"
              htmlFor="file-upload"
            >
              <Paperclip size={21} />
            </Label>
          </div>
          {files.length > 0 && (
            <div
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
              className="grid w-full grid-cols-3 items-center justify-center gap-4 rounded-lg border-2 border-dashed border-gray-300 p-8"
            >
              {files &&
                files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-lg bg-gray-100 p-2 dark:bg-gray-800"
                  >
                    <Image
                      alt="File preview"
                      className={`aspect-[1/1] rounded-md object-cover ${
                        uploading ? "animate-pulse" : ""
                      }`}
                      height="40"
                      src={getFileIcon(file)}
                      style={{
                        aspectRatio: "40/40",
                        objectFit: "cover",
                      }}
                      width="40"
                    />
                    <div className="flex-1 truncate">
                      <Link
                        target="_blank"
                        className="hover:underline"
                        href={
                          (filesArray.length > index &&
                            filesArray[index] &&
                            filesArray[index].url) ||
                          ""
                        }
                      >
                        <p className="text-sm font-medium">{file.name}</p>
                      </Link>
                      {/* <p className="text-xs text-gray-500 dark:text-gray-400">
                          12.3 MB
                        </p> */}
                    </div>

                    <Button
                      size={"sm"}
                      type="button"
                      className={`${
                        removing ? "animate-pulse" : ""
                      } hover:bg-gray-300`}
                      variant={"ghost"}
                      onClick={() => handleRemove(index)}
                    >
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  // <div key={index} className="flex items-center space-x-4">
                  //   <Image
                  //     alt="File Thumbnail"
                  //     className={`aspect-[1/1] rounded-md object-cover ${
                  //       uploading ? "animate-pulse" : ""
                  //     }`}
                  //     height="50"
                  //     src={getFileIcon(file)}
                  //     width="50"
                  //   />
                  //   <Link
                  //     target="_blank"
                  //     className="hover:underline"
                  //     href={
                  //       (filesArray.length > index &&
                  //         filesArray[index] &&
                  //         filesArray[index].url) ||
                  //       ""
                  //     }
                  //   >
                  //     {file.name.split(".")[0]}
                  //   </Link>
                  //   <Button
                  //     type="button"
                  //     className={removing ? "animate-pulse" : ""}
                  //     variant={"ghost"}
                  //     onClick={() => handleRemove(index)}
                  //   >
                  //     <X size={21} />
                  //   </Button>
                  // </div>
                ))}
            </div>
          )}
        </div>
      </div>
    );
  }
);
UploadDocumentsFormFieldButton.displayName = "UploadDocumentsFormField";
export default UploadDocumentsFormFieldButton;
