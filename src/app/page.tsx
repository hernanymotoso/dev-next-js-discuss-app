import TopicCreateForm from "@/components/topics/topic-create-form";
import TopicList from "@/components/topics/topic-list";
import { Divider } from "@nextui-org/divider";

export default function Home() {
  return (
    <div className="flex justify-between gap-4 p-4">
      <div className="width-full">
        <h1 className="text-xl m-2">Top Posts</h1>  
      </div>  

      <div className="border shadow py-3 px-2">
        <TopicCreateForm />

        <Divider className="mt-2" />
        <h3 className="text-lg">Topics</h3>

        <TopicList />
      </div>       
    </div>
  );
}
 