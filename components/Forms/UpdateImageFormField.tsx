"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { forwardRef,  useEffect,  useState } from "react";
import { uploadFile } from "@/app/utils/uploadImage";
import { useMutation } from "react-query";
import { api } from "@/convex/_generated/api";


interface UploadDocumentsFormFieldProps {
  onChange: (...event: any[]) => void;
  onBlur: () => void;
  value: string | undefined;
  disabled?: boolean;
  img?: string;
  name: string;
  ref: React.Ref<any>;
}


const UpdateImageFormField = forwardRef(
  (props: UploadDocumentsFormFieldProps, ref) => {

    const [img, setImg] = useState<string>(props?.img || "");
    const [uploading, setUploading] = useState(false);
    
    useEffect(() => {

    }, [img]);


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
