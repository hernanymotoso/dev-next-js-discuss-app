import TopicCreateForm from "@/components/topics/topic-create-form";

export default function Home() {
  return (
    <div className="flex justify-between gap-4 p-4">
      <div>
        <h1 className="text-xl m-2">Top Posts</h1>  
      </div>  

      <div>
        <TopicCreateForm />
      </div>       
    </div>
  );
}
