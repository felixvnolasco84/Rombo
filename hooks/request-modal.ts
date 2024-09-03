import { Doc } from "@/convex/_generated/dataModel";
import { create } from "zustand";

type RequestModalStore = {
  request?: Doc<"requests">;
  isOpen: boolean;
  onOpen: (request: Doc<"requests">) => void;
  onClose: () => void;
};

export const useRequestModal = create<RequestModalStore>((set) => ({
  request: undefined,
  isOpen: false,
  onOpen: (request: Doc<"requests">) => set({ isOpen: true, request: request }),
  onClose: () => set({ isOpen: false, request: undefined }),
}));
