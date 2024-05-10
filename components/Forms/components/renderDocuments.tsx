"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import getFileIcon, { DocumentUpload } from "@/lib/utils";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

type RenderDocumentsProps = {
  documents: DocumentUpload[];
};

export default function RenderDocuments({ documents }: RenderDocumentsProps) {
  const [removing, setRemoving] = useState<boolean>(false);
  const [uploading, setUploading] = useState(false);
  return (
    <>
      {documents && documents.length > 0 && (
        <div className="flex flex-col gap-2">
          <Separator className="mt-4" />
          <div className="grid w-full grid-cols-3 items-center justify-center gap-4 rounded-lg">
            {documents &&
              documents.map((file: any, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-lg bg-gray-100 p-2 dark:bg-gray-800"
                >
                  <Image
                    alt="File Thumbnail"
                    className={`aspect-[1/1] rounded-md object-cover ${
                      uploading ? "animate-pulse" : ""
                    }`}
                    height="40"
                    src={getFileIcon(file)}
                    width="40"
                    style={{
                      aspectRatio: "40/40",
                      objectFit: "cover",
                    }}
                  />
                  <Link
                    target="_blank"
                    className="text-sm hover:underline"
                    href={
                      (documents.length > index &&
                        documents[index] &&
                        documents[index].url) ||
                      ""
                    }
                  >
                    {file.name.split(".")[0]}
                  </Link>
                  {/* <Button
              type="button"
              className={removing ? "animate-pulse" : ""}
              variant={"ghost"}
              onClick={() => handleRemove(index)}
            >
              <X size={21} />
            </Button> */}
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
