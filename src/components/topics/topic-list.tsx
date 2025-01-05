import { Chip } from '@nextui-org/chip'
import { db } from '@/db'
import { routePaths } from '@/routePaths'
import Link from 'next/link'

export default async function TopicList() {
    const topics = await db.topic.findMany();

    const renderedTopics = topics.map((topic) => {
        return (
            <div key={topic.id}>
                <Link href={routePaths.topicShow(topic.slug)}>
                    <Chip color='warning' variant='shadow'>
                        {topic.slug}
                    </Chip>
                </Link>
            </div>
        )
    })

    return (
        <div className='flex flex-row flex-wrap gap-2'>
            {renderedTopics}
        </div>
    )
}