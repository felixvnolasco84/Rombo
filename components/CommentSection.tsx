import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DropdownMenuComponentComment from "@/components/DropdownMenu/DropdownMenuComponentComment";
import TipTapOnlyContent from "@/components/TipTapOnlyContent";
import RenderDocuments from "@/components/Forms/components/renderDocuments";
import prisma from "@/utils/ConnectionPool";

type Props = {
  userEmail: string;
  comments: any[];
};

export default async function CommentSection({ comments, userEmail }: Props) {
  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });

  if (!user) {
    return <div>Usuario no encontrado</div>;
  }

  return comments.map((comment: any, index: any) => (
    <div
      key={index}
      className="flex items-start space-x-4 rounded-md border p-4"
    >
      <Avatar className="h-10 w-10">
        <AvatarImage alt={user.name || ""} src={user?.image || ""} />
        <AvatarFallback>{comment.userEmail.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="w-full">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-semibold">{user.name}</p>
          {userEmail === comment.userEmail && (
            <DropdownMenuComponentComment comment={comment} />
          )}
        </div>
        <TipTapOnlyContent content={comment.desc} />
        <div className="mt-4">
          <RenderDocuments documents={comment.documents} />
        </div>
      </div>
    </div>
  ));
}
