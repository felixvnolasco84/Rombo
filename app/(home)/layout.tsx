import FooterComponent from "@/components/Footer/FooterComponent";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="container">{children}</div>
      <FooterComponent />
    </>
  );
}
