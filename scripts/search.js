import { exec } from "child_process";
import { displayNotFindResult } from "./displayResults.js";

import { displayChocoResults, displayWingetResults } from "./displayResults.js";
import {
  formatChocoSearchResults,
  formatWingetSearchResults,
} from "./formatting.js";

export function chocoSearch(userInput) {
  const command = `choco search "${userInput}" --order-by-popularity --by-tag-only --page-size=10 --acceptlicense --limitoutput --no-progress --no-color`;

  exec(command, (error, stdout, stderr) => {
    if (stdout === "") {
      displayNotFindResult();
      return;
    }

    const packages = formatChocoSearchResults(stdout);
    const searchOutput = displayChocoResults(packages);
    console.log(searchOutput);
  });
}

export function wingetSearch(userInput) {
  const command = `winget search "${userInput}" --count 10`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      displayNotFindResult();
      return;
    }

    const packages = formatWingetSearchResults(stdout);
    const searchOutput = displayWingetResults(packages);
    console.log(searchOutput);
  });
}
