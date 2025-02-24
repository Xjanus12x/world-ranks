type BaseType = {
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  area: number;
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  population: number;
  region: string;
  subregion: string;
};

export type Country = BaseType & {
  independent: boolean;
  unMember: boolean;
};

export type CountryDetails = BaseType & {
  languages: {
    [key: string]: string;
  };
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  capital: string[];
  borders: string[];
  continents: string[];
};
