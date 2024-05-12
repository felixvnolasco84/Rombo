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
        <Image
          alt="Project Image"
          className="rounded-lg bg-gray-400 object-cover transition-opacity hover:opacity-80"
          height="300"
          src={brand.img ? brand.img : "/logo.png"}
          style={{
            aspectRatio: "300/300",
            objectFit: "cover",
          }}
          width="300"
        />
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
