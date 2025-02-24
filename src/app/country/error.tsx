"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";

type ErrorProps = {
  error: Error;
};
export default function Error({ error }: ErrorProps) {
  return (
    <section className="bg-dark px-4 py-10 max-w-2xl sm:rounded-xl mx-auto grid text-center justify-items-center gap-4">
      <h2>{error.message}</h2>
      <Link
        href="/"
        className="flex gap-2 px-4 py-2 bg-grayishDark rounded-md items-center text-white max-w-fit"
      >
        <ChevronLeft /> Back
      </Link>
    </section>
  );
}
