import { Doc } from "@/convex/_generated/dataModel";
import { create } from "zustand";

type DeleteRequesModalStore = {
  request?: Doc<"requests">;
  isOpen: boolean;
  onOpen: (request: Doc<"requests">) => void;
  onClose: () => void;
};

export const useDeleteRequestModal = create<DeleteRequesModalStore>((set) => ({
  spaceId: undefined,
  isOpen: false,
  onOpen: (request: Doc<"requests">) => set({ isOpen: true, request }),
  onClose: () => set({ isOpen: false, request: undefined }),
}));
