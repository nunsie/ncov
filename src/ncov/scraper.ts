var axios = require("axios");
var cheerio = require("cheerio");

import countryCodes from './countries.json';

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

export const stats = async (): Promise<Stats> => {
  let response;
  try {
    response = await axios.get("https://www.worldometers.info/coronavirus/");
    if (response.status !== 200) {
      throw new Error('unkown error')
    }
  } catch (err) {
    return null;
  }

  // to store parsed data
  const result = {
    updated: Date.now(),
    cases: 0,
    deaths: 0,
    recoveries: 0,
    active: 0,
    closed: 0,
  };

  // get HTML and parse death rates
  const html = cheerio.load(response.data);
  html(".maincounter-number").filter((i, el) => {
    let count = el.children[0].next.children[0].data || "0";
    count = parseInt(count.replace(/,/g, "") || "0", 10);
    // first one is
    if (i === 0) {
      result.cases = count;
    } else if (i === 1) {
      result.deaths = count;
    } else {
      result.recoveries = count;
    }
  });
  result.updated = Date.now();
  return result
}

export const countries = async (): Promise<Country[]> => {
  let response;
  try {
    response = await axios.get("https://www.worldometers.info/coronavirus/");
    if (response.status !== 200) {
      console.log("Error", response.status);
    }
  } catch (err) {
    return null;
  }

  // to store parsed data
  const result = [];

  // get HTML and parse death rates
  const html = cheerio.load(response.data);
  const countriesTable = html("table#main_table_countries_today");
  const countriesTableCells = countriesTable
    .children("tbody")
    .children("tr")
    .children("td");

  // NOTE: this will change when table format change in website
  const totalColumns = 9;
  const countryColIndex = 0;
  const casesColIndex = 1;
  const todayCasesColIndex = 2;
  const deathsColIndex = 3;
  const todayDeathsColIndex = 4;
  const curedColIndex = 5;
  const activeColIndex = 6;
  const criticalColIndex = 7;

  // minus totalColumns to skip last row, which is total
  for (let i = 0; i < countriesTableCells.length - totalColumns; i += 1) {
    const cell = countriesTableCells[i];

    // get country
    if (i % totalColumns === countryColIndex) {
      let country =
        cell.children[0].data ||
        cell.children[0].children[0].data ||
        // country name with link has another level
        cell.children[0].children[0].children[0].data ||
        cell.children[0].children[0].children[0].children[0].data ||
        "";
      country = country.trim();
      if (country.length === 0) {
        // parse with hyperlink
        country = cell.children[0].next.children[0].data || "";
      }
      result.push({ name: country.trim() || "", code: countryCodes[country] });
    }
    // get cases
    if (i % totalColumns === casesColIndex) {
      let cases = cell.children[0].data || "";
      result[result.length - 1].totalCases = parseInt(
        cases.trim().replace(/,/g, "") || "0",
        10
      );
    }
    // get today cases
    if (i % totalColumns === todayCasesColIndex) {
      let cases = cell.children[0].data || "";
      result[result.length - 1].newCases = parseInt(
        cases.trim().replace(/,/g, "") || "0",
        10
      );
    }
    // get deaths
    if (i % totalColumns === deathsColIndex) {
      let deaths = cell.children[0].data || "";
      result[result.length - 1].totalDeaths = parseInt(
        deaths.trim().replace(/,/g, "") || "0",
        10
      );
    }
    // get today deaths
    if (i % totalColumns === todayDeathsColIndex) {
      let deaths = cell.children[0].data || "";
      result[result.length - 1].newDeaths = parseInt(
        deaths.trim().replace(/,/g, "") || "0",
        10
      );
    }
    // get cured
    if (i % totalColumns === curedColIndex) {
      let cured = cell.children[0].data || 0;
      result[result.length - 1].totalRecovered = parseInt(
        cured.trim().replace(/,/g, "") || 0,
        10
      );
    }
    // get active
    if (i % totalColumns === activeColIndex) {
      let active = cell.children[0].data || 0;
      result[result.length - 1].activeCases = parseInt(
        active.trim().replace(/,/g, "") || 0,
        10
      );
    }
    // get critical
    if (i % totalColumns === criticalColIndex) {
      let critical = cell.children[0].data || "";
      result[result.length - 1].critical = parseInt(
        critical.trim().replace(/,/g, "") || "0",
        10
      );
    }
  }

  return result
}

export default {
  stats,
  countries
}