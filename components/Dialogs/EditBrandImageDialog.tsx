import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import EditImageBrandForm from "../Forms/EditImageBrandForm";

export default function EditBrandImageDialog({ brand }: { brand: any }) {
  return (
    <Dialog>
      <DialogTrigger>
        {brand.img ? (
          <div className="h-64 w-64">
            <Image
              alt="Project Image"
              className="rounded-lg bg-gray-100 object-cover shadow-sm transition-opacity hover:opacity-80"
              height="300"
              src={brand.img && brand.img}
              style={{
                aspectRatio: "300/300",
                objectFit: "cover",
              }}
              width="300"
            />
          </div>
        ) : (
          <div className="flex h-64 w-64 items-center justify-center rounded-lg bg-gray-100 shadow-sm">
            <span className="text-4xl text-gray-400">
              {brand.title.slice(0, 2)}
            </span>
          </div>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
          <EditImageBrandForm brand={brand} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
