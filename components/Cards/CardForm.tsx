"use client";

import { toast } from "sonner";
import { Plus, X } from "lucide-react";
import { forwardRef, useRef, ElementRef, KeyboardEventHandler } from "react";
import { useParams } from "next/navigation";
import { useOnClickOutside, useEventListener } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import { FormSubmit } from "@/components/Forms/form-submit";
import { FormTextarea } from "@/components/Forms/form-textarea";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface CardFormProps {
  listId: string;
  brandId: Id<"brand">;
  status: string;
  enableEditing: () => void;
  disableEditing: () => void;
  isEditing: boolean;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  (
    { listId, brandId, enableEditing, disableEditing, isEditing, status },
    ref
  ) => {
    const create = useMutation(api.requests.createWithStatus);

    const params = useParams();
    const formRef = useRef<ElementRef<"form">>(null);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        disableEditing();
      }
    };

    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", onKeyDown);

    const onTextareakeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      e
    ) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    const onSubmit = (formData: FormData, brandId: Id<"brand">) => {
      const title = formData.get("title") as string;
      // const listId = formData.get("listId") as string;
      const boardId = params.boardId as string;

      const promise = create({
        title,
        description: "",
        brandId: brandId,
        status: status,
        category: "Undefined",
        deadline: "2022-12-31",
      });

      toast.promise(promise, {
        loading: "Creando tarjeta...",
        success: "Tarjeta creada",
        error: "Error al crear tarjeta",
      });
    };

    if (isEditing) {
      return (
        <form
          ref={formRef}
          action={(formData) => onSubmit(formData, brandId)}
          className="m-1 space-y-4 px-1 py-2"
        >
          <FormTextarea
            id="title"
            onKeyDown={onTextareakeyDown}
            ref={ref}
            placeholder="Enter a title for this card..."
            // errors={fieldErrors}
          />
          <input hidden id="listId" name="listId" value={listId} />
          <div className="flex items-center gap-x-1">
            <FormSubmit>Add card</FormSubmit>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      );
    }

    return (
      <div className="px-2 py-2">
        <Button
          onClick={enableEditing}
          className="h-auto w-full justify-start px-2 py-1.5 text-sm text-muted-foreground"
          size="sm"
          variant="ghost"
        >
          <Plus className="mr-2 h-4 w-4" />
          Añade una tarjeta
        </Button>
      </div>
    );
  }
);

CardForm.displayName = "CardForm";
