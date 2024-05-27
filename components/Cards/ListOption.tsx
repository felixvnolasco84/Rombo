"use client";

// import { List } from "@/interfaces";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Separator } from "@/components/ui/separator";
// import FormSubmit from "./FormSubmit";
import { toast } from "sonner";
// import { listCopy, listDelete } from "@/services/list";

// const ListOption = ({ list }: { list: List }) => {
const ListOption = ({ list }: { list: any }) => {
  const copyList = async () => {
    try {
      if (!list?.id || !list?.boardId) {
        toast.error("something went wrong");
        return;
      }
      // const res = await listCopy({ id: list?.id, boardId: list?.boardId });
      // if (res?.result) {
      //   toast.success("list copied successfully");
      // }
    } catch (error) {
      toast.error("list not copied");
    }
  };

  //   delete list
  const deleteList = async () => {
    try {
      if (!list?.id || !list?.boardId) {
        toast.error("something went wrong");
        return;
      }
      // const res = await listDelete({ id: list?.id, boardId: list?.boardId });
      // if (res?.result) {
      //   toast.success("list copied successfully");
      // }
    } catch (error) {
      toast.error("list not copied");
    }
  };
  return (
    <Popover>
      <PopoverTrigger>
        <Button className="" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-white px-0">
        <h2 className="pb-3 text-center text-lg font-bold">List Details</h2>
        <Separator />
        <form action={copyList}>
          {/* <FormSubmit
            variant="ghost"
            className="tet-sm h-auto w-full rounded-none px-5 py-2"
          >
            Copy List
          </FormSubmit> */}
        </form>
        <Separator />
        <form action={deleteList}>
          {/* <FormSubmit
            variant="ghost"
            className="tet-sm h-auto w-full rounded-none px-5 py-2"
          >
            Delete List
          </FormSubmit> */}
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default ListOption;
