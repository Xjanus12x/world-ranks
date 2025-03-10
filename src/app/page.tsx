import { Metadata } from "next";
import { CountryFilters } from "@/components/CountryFilters";
import { CountryTable } from "@/components/CountryTable";
import { fetchCountries } from "@/data/fetchCountries";

export const metadata: Metadata = {
  title: "Country Explorer | Find Details About Countries",
  description:
    "Explore countries with details such as population, area, capital, and more. Filter and sort based on various attributes.",
};

type SortOptions = "population" | "name" | "area";
type CountryExplorerProps = {
  searchParams: Promise<{
    search: string;
    sort: SortOptions;
    regions: string;
    status: string;
  }>;
};
export default async function CountryExplorer({
  searchParams,
}: CountryExplorerProps) {
  const { search, sort: sortBy, regions, status } = await searchParams;
  const countries = await fetchCountries(search, regions, status);
  const sortedCountries = countries?.sort((a, b) => {
    switch (sortBy) {
      case "population":
        return b.population - a.population; // Descending order
      case "area":
        return b.area - a.area; // Descending order
      case "name":
        return a.name.common.localeCompare(b.name.common); // Alphabetical order
      default:
        return 0;
    }
  });

  return (
    <section className="bg-dark  px-2 pb-2 sm:border-mutedGray sm:border max-w-2xl sm:rounded-xl mx-auto">
      <CountryFilters results={countries!.length} />
      <CountryTable data={sortedCountries ?? []} />
    </section>
  );
}
