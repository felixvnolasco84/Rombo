"use client";

import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Label } from "@/components/ui/label";
import Image from "next/image";
import { forwardRef, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { uploadFile } from "@/app/utils/uploadImage";
import Link from "next/link";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import getFileIcon, { DocumentUpload } from "@/lib/utils";
import { removeFile } from "@/app/utils/removeFile";
import { revalidatePath } from "next/cache";

interface UploadDocumentsFormFieldProps {
  onChange: (...event: any[]) => void;
  onBlur: () => void;
  value: DocumentUpload[] | undefined;
  disabled?: boolean;
  files?: any[];
  name: string;
  ref: React.Ref<any>;
  objectId?: { id: string; type: string } | undefined;
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

const UploadDocumentsFormField = forwardRef(
  (props: UploadDocumentsFormFieldProps, ref) => {
    const [files, setFiles] = useState<File[]>(props?.files || []);
    const { toast } = useToast();
    const [filesArray, setFilesArray] = useState<DocumentUpload[]>(
      props?.files || []
    );
    const [uploading, setUploading] = useState(false);
    const [removing, setRemoving] = useState<boolean>(false);

    useEffect(() => {
      // Cada vez que filesURL cambia, llamamos a props.onChange para actualizar el valor del formulario
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
      if (props.files != undefined) {
        setFilesArray([...props.files, ...fileObjects]);
      }
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
      try {
        const fileToRemove = files[index];
        const newFiles = filesArray.filter((_, i) => i !== index);
        if (
          props.objectId !== undefined &&
          props.objectId.type === "comment"
        ) {
          const draftResponse = await fetch(
            `/api/comments/update/${props.objectId.id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ newDocuments: newFiles }),
            }
          );
          

          const response = await draftResponse.json();

          console.log(response)

          if (response.message === "Document removed!") {
            await removeFile(fileToRemove.name);
            setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
            setFilesArray((prevFiles) =>
              prevFiles.filter((_, i) => i !== index)
            );
          } else {
            toast({
              variant: "destructive",
              title: "¡Oh!",
              description: "Al parecer hubo un error, intentelo más tarde🎉",
            });
          }
        } else if (
          props.objectId !== undefined &&
          props.objectId.type == "brand"
        ) {
          const draftResponse = await fetch(
            `/api/brands/update/${props.objectId.id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ newDocuments: newFiles }),
            }
          );

          const response = await draftResponse.json();

          console.log(response);
          if (response.message === "Document removed!") {
            await removeFile(fileToRemove.name);
            setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
            setFilesArray((prevFiles) =>
              prevFiles.filter((_, i) => i !== index)
            );
            // revalidatePath(`/portal/marcas/${props.objectId.id}`);
          } else {
            toast({
              variant: "destructive",
              title: "¡Oh!",
              description: "Al parecer hubo un error, intentelo más tarde🎉",
            });
          }
        } else if (
          props.objectId !== undefined &&
          props.objectId.type == "request"
        ) {
          const draftResponse = await fetch(
            `/api/requests/update/${props.objectId.id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ newDocuments: newFiles }),
            }
          );

          const response = await draftResponse.json();

          if (response.message === "Document removed!") {
            await removeFile(fileToRemove.name);
            setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
            setFilesArray((prevFiles) =>
              prevFiles.filter((_, i) => i !== index)
            );
            // revalidatePath(`/portal/marcas/${props.objectId.id}`);
          } else {
            toast({
              variant: "destructive",
              title: "¡Oh!",
              description: "Al parecer hubo un error, intentelo más tarde🎉",
            });
          }
        } else {
          await removeFile(fileToRemove.name);
          setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
          setFilesArray((prevFiles) => prevFiles.filter((_, i) => i !== index));
        }
      } catch (error) {
        console.error(`Failed to remove file: ${error}`);
      } finally {
        setRemoving(false);
      }
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
                        className={`aspect-[1/1] rounded-md object-cover fill-green-700 ${
                          uploading ? "animate-pulse" : ""
                        }`}
                        height="40"
                        src={getFileIcon(file)}
                        style={{
                          aspectRatio: "40/40",
                          objectFit: "cover",
                        }}
                        width="50"
                      />
                      <Link
                        target="_blank"
                        className="hover:underline"
                        href={
                          (filesArray.length > index &&
                            filesArray[index] &&
                            filesArray[index].url) ||
                          (props.files != undefined &&
                            props.files.length > index &&
                            props.files[index]?.url) ||
                          ""
                        }
                      >
                        {file.name.split(".")[0]}
                      </Link>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button type="button" variant={"ghost"}>
                            <X size={21} />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className="grid gap-4">
                            <div className="space-y-2">
                              <h4 className="font-medium leading-none">
                                ¿Deseas eliminar el adjunto?
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                La operación de eliminar un adjunto es
                                permanente. No es posible deshacer la operación.
                              </p>
                            </div>
                            <Button
                              type="button"
                              className={removing ? "animate-pulse" : ""}
                              disabled={removing}
                              variant={"destructive"}
                              onClick={() => handleRemove(index)}
                            >
                              Eliminar
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
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
