import { Button } from "../ui/button";

type Request = {
  request: any;
  autorization: boolean;
};

export default function ApproveRequestButton({
  request,
  autorization,
}: Request) {
  console.log(autorization);
  console.log(request);

  const handleApproveRequest = async () => {
    try {
      const response = await fetch(`/api/requests/${request.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "approved" }),
      });
      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button variant={"primary"} disabled={!autorization}>
      Aprobar
    </Button>
  );
}
