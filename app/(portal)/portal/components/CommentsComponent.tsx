import CommentSection from "@/components/CommentSection";
import CommentForm from "@/components/Forms/CommentForm";
import Spinner from "@/components/spinner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

export function CommnetsComponent({
  requestId,
  brandId,
}: {
  requestId: Id<"requests">;
  brandId: Id<"brand">;
}) {
  const comments = useQuery(api.comment.getByRequestId, {
    requestId: requestId,
  });

  if (comments === undefined) {
    return (
      <>
        <Spinner />
      </>
    );
  }
  if (comments === null) {
    return <div>404</div>;
  }

  return (
    <Accordion
      defaultValue={comments.length === 0 ? "" : "comments"}
      type="single"
      collapsible
      className="w-full"
    >
      <AccordionItem value="comments">
        <AccordionTrigger>
          <h2 className="mb-4 text-2xl text-[#121415]">Comentarios</h2>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <div className="space-y-4">
              {comments.length === 0 ? (
                <p className="text-sm text-gray-500">No existen comentarios.</p>
              ) : (
                <CommentSection comments={comments} />
              )}
            </div>

            <div className="space-y-4">
              <CommentForm requestId={requestId} brandId={brandId} />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
