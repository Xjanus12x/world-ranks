import { Country } from "@/models/Country";

export async function fetchCountries(
  search?: string,
  regions?: string,
  status?: string
): Promise<Country[] | undefined> {
  const regionsArray = regions?.split(",");
  const statusArray = status?.split(",");

  const response = await fetch(
    `https://restcountries.com/v3.1/all?fields=flags,name,population,area,region,independent,unMember`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }

  let countries: Country[] = await response.json();

  // ✅ Filter countries before returning data
  countries = countries.filter((country) => {
    const matchesSearch =
      !search ||
      new RegExp(search, "i").test(country.name.common) ||
      new RegExp(search, "i").test(country.name.official) ||
      new RegExp(search, "i").test(country.region) ||
      new RegExp(search, "i").test(country.subregion);

    const matchesRegion =
      !regionsArray ||
      regionsArray.length === 0 ||
      regionsArray?.includes(country.region.toLowerCase());

    const matchesStatus =
      (statusArray?.includes("independent") && country.independent) ||
      (statusArray?.includes("unMember") && country.unMember) ||
      (!statusArray?.includes("independent") && !country.independent) ||
      (!statusArray?.includes("unMember") && !country.unMember);

    return matchesSearch && matchesStatus && matchesRegion;
  });

  return countries;
}
