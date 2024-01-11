import Link from "next/link";

export default function Home() {
  return (
    <div className="flex max-w-xl flex-col gap-2">
      <p className="text-xl">{"Hi, I'm Theo."}</p>
      <p className="text-xl">
        {
          "I built this to show how to use Server Actions and RSCs both WITH and WITHOUT tRPC."
        }
      </p>
      <p className="text-xl">{"I hope this helps with y'all's confusion"}</p>

      <h1 className="pt-8 text-center text-2xl font-bold">Demos</h1>

      <Link
        href="/vanilla-action"
        className="text-xl text-blue-300 underline hover:text-blue-500"
      >
        Vanilla RSC + Server Actions
      </Link>
      <Link
        href="/trpc-client"
        className="text-xl text-blue-300 underline hover:text-blue-500"
      >
        RSC + tRPC (No server actions)
      </Link>
      <Link
        href="/rsc-trpc-action"
        className="text-xl text-blue-300 underline hover:text-blue-500"
      >
        RSC + tRPC + Server Actions
      </Link>
      <Link
        href="/client-side-actions"
        className="text-xl text-blue-300 underline hover:text-blue-500"
      >
        RSC + tRPC + (Client side) Server Actions
      </Link>
    </div>
  );
}
