import Link from "next/link";
import PostShow from "@/components/posts/post-show";
import CommentList from "@/components/comments/comment-list";
import CommentCreateForm from "@/components/comments/comment-create-form";
import { routePaths } from "@/routePaths";
import { fetchCommentsByPostId } from "@/db/queries/comments";

interface PostShowPageProps {
  params: {
    slug: string;
    postId: string;
  };
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = params;

  const comments = await fetchCommentsByPostId(postId);

  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={routePaths.topicShow(slug)}>
        {"< "}Back to {slug}
      </Link>

      <PostShow postId={postId} />
      
      <CommentCreateForm postId={postId} startOpen={false} />
      
      <CommentList comments={comments} />
    </div>
  );
}
