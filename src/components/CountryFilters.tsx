"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import Image from "next/image";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";

const regions = [
  { id: "americas", label: "Americas" },
  { id: "antartic", label: "Antartic" },
  { id: "africa", label: "Africa" },
  { id: "asia", label: "Asia" },
  { id: "europe", label: "Europe" },
  { id: "oceania", label: "Oceania" },
] as const;

const statuses = [
  { id: "unMember", label: "Member of the United Nations" },
  { id: "independent", label: "Independent" },
] as const;

const sortTypes = [
  { id: "population", label: "Population" },
  { id: "name", label: "Name" },
  { id: "area", label: "Area (km²)" },
];

type CountryFilterState = {
  search: string;
  sortBy: string;
  regions: string[];
  status: string[];
};
type CountryFiltersProps = {
  results: number;
};
export function CountryFilters({ results = 0 }: CountryFiltersProps) {
  const [filters, setFilters] = useState<CountryFilterState>({
    search: "",
    sortBy: sortTypes[0].id, // Default sorting option
    regions: [],
    status: [],
  });

  const debouncedFormData = useDebounce(filters);
  const router = useRouter();

  // Handle select change
  const handleSelectChange = (value: string) => {
    setFilters({ ...filters, sortBy: value });
  };

  // Handle checkbox toggle
  const handleCheckboxChange = (key: "regions" | "status", id: string) => {
    setFilters((prev) => {
      const updatedValues = prev[key].includes(id)
        ? prev[key].filter((item) => item !== id) // Remove if already selected
        : [...prev[key], id]; // Add if not selected

      return { ...prev, [key]: updatedValues };
    });
  };

  // Function to update search params in the URL
  const updateSearchParams = ({
    search,
    sortBy,
    regions,
    status,
  }: CountryFilterState) => {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (sortBy) params.set("sort", sortBy);
    if (regions.length > 0) params.set("regions", regions.join(","));
    if (status.length > 0) params.set("status", status.join(","));

    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    updateSearchParams(debouncedFormData);
  }, [debouncedFormData]);

  return (
    <form className="px-3 py-6 grid gap-7">
      <h2 className="font-semibold">Found {results} countries</h2>

      <div>
        <label className="block sr-only" htmlFor="search">
          Search by Name, Region...
        </label>
        <div className="relative">
          <Image
            className="absolute top-0 bottom-0 my-auto left-2 size-auto brightness-200"
            aria-hidden
            src="/resources/Search.svg"
            height={0}
            width={0}
            alt="Search icon"
          />
          <Input
            className="px-10 bg-grayishDark rounded-lg placeholder:text-sm placeholder:font-medium placeholder:text-lightGray focus-visible:ring-0"
            id="search"
            type="text"
            name="search"
            placeholder="Search by Name, Region..."
            value={filters.search}
            onChange={(e) =>
              setFilters({ ...filters, [e.target.name]: e.target.value })
            }
          />
        </div>
      </div>

      {/* Sort By Select */}
      <div className="space-y-2">
        <label htmlFor="regions" className="block text-xs font-medium">
          Sort by
        </label>
        <Select
          onValueChange={handleSelectChange}
          defaultValue={filters.sortBy}
        >
          <SelectTrigger
            className="bg-transparent border-2 rounded-xl focus:ring-0 focus-visible:ring-0"
            id="regions"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortTypes.map(({ id, label }) => (
              <SelectItem value={id} key={id}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Regions Checkbox Group */}
      <div className="space-y-2">
        <label className="block text-xs font-medium">Regions</label>
        <div className="flex gap-3 flex-wrap">
          {regions.map((region) => (
            <label
              key={region.id}
              className={`text-sm px-4 py-1 rounded-full focus-within:ring-lightGray focus-within:ring-2 ${
                filters.regions.includes(region.id) ? "bg-dark" : ""
              }`}
              htmlFor={region.id}
            >
              <Checkbox
                checked={filters.regions.includes(region.id)}
                onCheckedChange={() =>
                  handleCheckboxChange("regions", region.id)
                }
                className="sr-only"
                id={region.id}
              />
              {region.label}
            </label>
          ))}
        </div>
      </div>

      {/* Status Checkbox Group */}
      <div className="space-y-2">
        <label className="block text-xs font-medium">Status</label>
        <div className="space-y-3">
          {statuses.map((status) => (
            <label
              key={status.id}
              className="flex items-center gap-2 font-medium text-sm"
            >
              <Checkbox
                checked={filters.status.includes(status.id)}
                onCheckedChange={() =>
                  handleCheckboxChange("status", status.id)
                }
              />
              {status.label}
            </label>
          ))}
        </div>
      </div>
    </form>
  );
}
