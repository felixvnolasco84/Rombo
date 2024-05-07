"use client";

import { app } from "@/utils/FirebaseConnection";
import {
  getStorage,
  ref,
  deleteObject,
} from "firebase/storage";

import { toast } from "@/components/ui/use-toast";

export const removeFile = async (fileName: string) => {
  const storage = getStorage(app);
  const fileRef = ref(storage, fileName);

  return new Promise<void>((resolve, reject) => {
    deleteObject(fileRef)
      .then(() => {
        toast({
          title: "¡Listo!",
          description: "Tu archivo se ha eliminado correctamente",
          variant: "default",
          duration: 3000,
        });
        resolve();
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "¡Oh!",
          description: "Al parecer hubo un error, intentelo más tarde",
        });
        reject(error);
      });
  });
};