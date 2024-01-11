"use client";

import { deletePostAction } from "../actions";

export const DeleteButton = (post: { id: number }) => {
  return (
    <button
      className="border p-2 font-bold text-red-300"
      onClick={async () => {
        await deletePostAction(post);
      }}
    >
      Delete
    </button>
  );
};
