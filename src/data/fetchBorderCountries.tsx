import { Country } from "@/models/Country";

export async function fetchBorderCountries(
  borderCodes: string[]
): Promise<Country[]> {
  if (borderCodes.length === 0) return [];
  const response = await fetch(
    `https://restcountries.com/v3.1/alpha?codes=${borderCodes.join(
      ","
    )}?fields=name,flags`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch border countries");
  }

  return await response.json();
}
