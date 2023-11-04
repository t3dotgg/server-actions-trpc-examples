import { api } from "~/trpc/server";
import type { inferAsyncReturnType } from "@trpc/server";
import { DeleteButton } from "./_components/delete-post";
import { CreatePost } from "./_components/create-post";

export default async function Home() {
  const posts = await api.post.getPosts.query();

  return (
    <div className="container flex max-w-2xl flex-col gap-24 px-4 py-16">
      <div className="flex flex-col text-xl">
        <h1 className="text-2xl font-bold">Posts</h1>
        {posts.map((post) => (
          <PostView post={post} key={post.id} />
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Create a new post</h1>

        {/* Note: CreatePost HAS to be imported, since it's using client side JS */}
        <CreatePost />
      </div>
    </div>
  );
}

type PostType = NonNullable<
  inferAsyncReturnType<typeof api.post.getPosts.query>
>[number];

function PostView({ post }: { post: PostType }) {
  return (
    <div className="flex justify-between p-2 hover:bg-gray-800/80">
      {post.name}
      {/* Note: DeleteButton HAS to be imported, since it's using client side JS */}
      <DeleteButton id={post.id} />
    </div>
  );
}
