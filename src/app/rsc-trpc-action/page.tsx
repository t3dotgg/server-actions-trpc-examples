import type { inferAsyncReturnType } from "@trpc/server";
import { revalidatePath } from "next/cache";
import { api } from "~/trpc/server";

export default async function Home() {
  const posts = await api.post.getPosts();

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
        <CreatePost />
      </div>
    </div>
  );
}

type PostType = NonNullable<
  inferAsyncReturnType<typeof api.post.getPosts>
>[number];

function PostView({ post }: { post: PostType }) {
  async function deletePostAction() {
    "use server";

    await api.post.delete({ id: post.id }); // Delete post from DB
    revalidatePath("/rsc-trpc-action"); // Revalidate page to see changed content
  }

  return (
    <div className="flex justify-between p-2 hover:bg-gray-800/80">
      {post.name}

      {/* Note: For actions to work, they have to be IN a form. The action itself can be bound at either via form action={thing} OR button formAction={thing} */}
      <form>
        <button
          formAction={deletePostAction}
          className="border p-2 font-bold text-red-300"
        >
          Delete
        </button>
      </form>
    </div>
  );
}

function CreatePost() {
  async function createPostAction(formData: FormData) {
    "use server";

    const name = formData.get("post-name") as string; // Get name from formData
    await api.post.create({ name: name }); // Insert into DB
    revalidatePath("/rsc-trpc-action"); // Revalidate page to see new content
  }

  return (
    <form action={createPostAction}>
      <input
        type="text"
        name="post-name"
        className="p-4 text-xl text-black"
        required
      />
      <button
        type="submit"
        className="ml-4 rounded-xl border bg-white p-4 text-black"
      >
        Submit
      </button>
    </form>
  );
}
