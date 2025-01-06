import PostCreateForm from "@/components/posts/post-create-form";
import PostList from "@/components/posts/post-list";
import { fetchPostsByTopicSlug } from "@/db/queries/posts";

type TopicShowPageProps = {
  params: {
    slug: string
  }
}

export default function TopicShowPage({ params }: TopicShowPageProps) {
  const { slug } = params
    
  return (
    <div className="flex justify-between gap-4 p-4">
      <div className="width-full">
        <h1 className="text-xl m-2">{slug}</h1>  

        <PostList fetchData={() => fetchPostsByTopicSlug(slug)} />
      </div>  

      <div>
        <PostCreateForm slug={slug} />
      </div>       
    </div>
  );
}