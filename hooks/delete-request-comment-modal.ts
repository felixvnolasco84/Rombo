import { Doc } from "@/convex/_generated/dataModel";
import { create } from "zustand";

type DeleteRequestCommentModalStore = {
  comment?: Doc<"requestsComments">;
  isOpen: boolean;
  onOpen: (comment: Doc<"requestsComments">) => void;
  onClose: () => void;
};

export const useDeleteRequestCommentModal =
  create<DeleteRequestCommentModalStore>((set) => ({
    comment: undefined,
    isOpen: false,
    onOpen: (comment: Doc<"requestsComments">) =>
      set({ isOpen: true, comment }),
    onClose: () => set({ isOpen: false, comment: undefined }),
  }));
