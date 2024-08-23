import { Doc } from "@/convex/_generated/dataModel";
import { create } from "zustand";

type EditRequestCommentModalStore = {
  comment?: Doc<"requestsComments">;
  isOpen: boolean;
  onOpen: (comment: Doc<"requestsComments">) => void;
  onClose: () => void;
};

export const useEditRequestCommentModal = create<EditRequestCommentModalStore>(
  (set) => ({
    comment: undefined,
    isOpen: false,
    onOpen: (comment: Doc<"requestsComments">) =>
      set({ isOpen: true, comment }),
    onClose: () => set({ isOpen: false, comment: undefined }),
  })
);
