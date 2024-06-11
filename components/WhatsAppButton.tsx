import Link from "next/link";
import second from "@/public/svg/WhatsAppIcon.svg";
import Image from "next/image";

export default function WhatsAppButton() {
  return (
    <div className="sticky bottom-0 right-0 flex justify-end p-4">
      <Link
        target="_blank"
        href="https://api.whatsapp.com/send?phone=5215545009532&text=Hola!%20Me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20Rombo!"
        className="w-fit"
      >
        <Image alt="" src={second} />
      </Link>
    </div>
  );
}
