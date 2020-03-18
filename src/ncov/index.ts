import scraper from './scraper';

interface Stats {
  updated: number
  cases: number
  deaths: number
  recoveries: number
  active: number
  closed: number
}

interface Country {
  code: string
  name: string
  totalCases: number
  newCases: number
  totalDeaths: number
  newDeaths: number
  totalRecovered: number
  activeCases: number
  critical: number
}

// @ts-ignore
async function stats(parent, args, context, info): Promise<Stats> {
  try {
    return scraper.stats();
  } catch (error) {
    throw error;
  }
}

// @ts-ignore
async function countries(parent, args, context, info): Promise<Country[]> {
  try {
    return scraper.countries();
  } catch (error) {
    throw error;
  }
}

// @ts-ignore
async function country(parent, args, context, info): Promise<Country> {
  try {
    const countries = await scraper.countries();
    return countries.filter(country => country.code === args.code)[0]
  } catch (error) {
    throw error;
  }
}

export default {
  stats,
  countries,
  country,
}
