"use server";

import { revalidatePath } from "next/cache";
import { api } from "~/trpc/server";

export async function createPostAction(input: { name: string }) {
  await api.post.create({ name: input.name });
  revalidatePath("/client-side-action");
}

export async function deletePostAction(post: { id: number }) {
  await api.post.delete({ id: post.id });
  revalidatePath("/client-side-action");
}
