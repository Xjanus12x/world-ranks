import { CountryDetails } from "@/models/Country";

export async function fetchCountryDetails(
  name: string
): Promise<CountryDetails[]> {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=flags,name,population,area,capital,subregion,languages,currencies,continents,borders`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch details for "${name}". Status: ${response.status}`
    );
  }

  return await response.json();
}
