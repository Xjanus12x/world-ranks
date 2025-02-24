import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function SearchBar() {
  return (
    <div className="relative w-full">
      <Image
        className="absolute top-0 bottom-0 my-auto left-2 size-auto"
        aria-hidden
        src="/resources/Search.svg"
        height={0}
        width={0}
        alt="Search icon"
      />
      <Input type="text" placeholder="Search" className="px-10" />
    </div>
  );
}
