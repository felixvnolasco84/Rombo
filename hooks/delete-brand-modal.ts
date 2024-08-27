import { Doc } from "@/convex/_generated/dataModel";
import { create } from "zustand";

type DeleteBrandModalStore = {
  brand?: Doc<"brand">;
  isOpen: boolean;
  onOpen: (brand: Doc<"brand">) => void;
  onClose: () => void;
};

export const useDeleteBrandModal = create<DeleteBrandModalStore>((set) => ({
  spaceId: undefined,
  isOpen: false,
  onOpen: (brand: Doc<"brand">) => set({ isOpen: true, brand }),
  onClose: () => set({ isOpen: false, brand: undefined }),
}));
