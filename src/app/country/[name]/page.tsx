import { fetchBorderCountries } from "@/data/fetchBorderCountries";
import { fetchCountryDetails } from "@/data/fetchCountryDetails";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
type CountryDetailsProps = {
  params: Promise<{ name: string }>;
};
// ✅ Generate Dynamic Metadata
export async function generateMetadata({
  params,
}: CountryDetailsProps): Promise<Metadata> {
  const { name } = await params;
  const [country] = await fetchCountryDetails(name);

  return {
    title: `${country.name.common} - Country Details`,
    description: `Explore detailed information about ${country.name.common}, including population, area, capital, languages, and neighboring countries.`,
  };
}

export default async function CountryDetails({ params }: CountryDetailsProps) {
  const { name } = await params;
  const [countryDetails] = await fetchCountryDetails(name);
  const borderDetails = await fetchBorderCountries(countryDetails.borders);

  return (
    <section className="bg-dark border-mutedGray border max-w-2xl sm:rounded-xl mx-auto relative">
      <Link
        href="/"
        className="flex gap-2 absolute top-4 left-4 p-2 bg-grayishDark rounded-md items-center"
      >
        <ChevronLeft /> Back
      </Link>
      <article>
        <header className="space-y-5 mb-5 p-2">
          <Image
            className="rounded-sm size-auto mx-auto sm:w-56 sm:rounded-xl sm:-mt-12"
            src={countryDetails.flags.png || countryDetails.flags.svg}
            alt={`${countryDetails.name.common} flag`}
            width={100}
            height={100}
          />
          <div className="text-center">
            <h2 className="text-xl font-bold sm:text-2xl">
              {countryDetails.name.common}
            </h2>
            <p className="text-xs sm:text-base">
              {countryDetails.name.official}
            </p>
          </div>

          <div className="flex justify-evenly text-xs flex-wrap gap-2 sm:text-base">
            <p className="divide-x divide-gray-500 p-2 bg-grayishDark rounded-md  text-center">
              <span className="px-2">Population</span>
              <span className="px-2">
                {countryDetails.population.toLocaleString()}
              </span>
            </p>
            <p className="divide-x divide-gray-500 p-2 bg-grayishDark rounded-md text-center">
              <span className="px-2">Area km²</span>
              <span className="px-2">
                {countryDetails.area.toLocaleString()}
              </span>
            </p>
          </div>
        </header>
        <ul className="text-xs sm:text-base">
          <li className="flex justify-between border-t-2 border-grayishDark py-2 px-2 sm:px-5 sm:py-5">
            <span>Capital</span> {countryDetails.capital.join(", ")}
          </li>
          <li className="flex justify-between border-t-2 border-grayishDark py-2 px-2 sm:px-5 sm:py-5">
            <span>Subregion</span> {countryDetails.subregion}
          </li>
          <li className="flex justify-between border-t-2 border-grayishDark py-2 px-2 sm:px-5 sm:py-5">
            <span>Language</span>
            {Object.values(countryDetails.languages).join(", ")}
          </li>
          <li className="flex justify-between border-t-2 border-grayishDark py-2 px-2 sm:px-5 sm:py-5">
            <span>Currency</span>
            {Object.values(countryDetails.currencies)
              .map((currency) => `${currency.name} (${currency.symbol})`)
              .join(", ")}
          </li>
          <li className="flex justify-between border-t-2 border-grayishDark py-2 px-2 sm:px-5 sm:py-5">
            <span>Continent</span> {countryDetails.continents.join(", ")}
          </li>
          <li className="grid border-t-2 border-grayishDark py-2 px-2 sm:px-5 sm:py-5 gap-2">
            <span>Neighboring Countries</span>
            {borderDetails.length > 0 ? (
              <ul className="flex gap-2 flex-wrap">
                {borderDetails.map((border, i) => (
                  <li key={i}>
                    <Link
                      className="space-y-2"
                      href={`/country/${border.name.common}`}
                    >
                      <Image
                        className="rounded-sm size-auto mx-auto sm:w-20"
                        src={border.flags.png || border.flags.svg}
                        alt={`${border.name.common} flag`}
                        width={60}
                        height={60}
                      />
                      <p>{border.name.common}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No neighboring countries found.</p>
            )}
          </li>
        </ul>
      </article>
    </section>
  );
}
