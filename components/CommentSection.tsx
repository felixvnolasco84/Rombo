import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DropdownMenuComponentComment from "@/components/DropdownMenu/DropdownMenuComponentComment";
import TipTapOnlyContent from "@/components/TipTapOnlyContent";
import RenderDocuments from "@/components/Forms/components/renderDocuments";

type Props = {
  userEmail: string;
  comments: any[];
};

export default function CommentSection({ comments, userEmail }: Props) {
  return comments.map((comment: any, index: any) => (
    <div
      key={index}
      className="flex items-start space-x-4 rounded-md border p-4"
    >
      <Avatar className="h-10 w-10">
        <AvatarImage alt="User avatar" src="/placeholder-avatar.jpg" />
        <AvatarFallback>{comment.userEmail.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="w-full">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-semibold">{comment.userEmail}</p>
          {userEmail === comment.userEmail && (
            <DropdownMenuComponentComment comment={comment} />
          )}
        </div>

        <TipTapOnlyContent content={comment.desc} />
        {/* <p className="text-sm text-gray-600">{comment.desc}</p> */}
        <RenderDocuments documents={comment.documents} />
      </div>
    </div>
  ));
}
