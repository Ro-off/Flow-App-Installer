import { exec } from "child_process";
import { displayNotFindResult } from "./displayResults.js";
import {
  formatChocoSearchResults,
  formatWingetSearchResults,
} from "./formatting.js";
import { displayChocoResults, displayWingetResults } from "./displayResults.js";

export function chocoSearch(userInput) {
  exec(
    `choco search ${userInput} --page-size=10 --acceptlicense --limitoutput --no-progress --no-color`,
    (error, stdout, stderr) => {
      if (stdout === "") {
        displayNotFindResult();
        return;
      }
      const packages = formatChocoSearchResults(stdout);
      const searchOutput = displayChocoResults(packages);
      console.log(searchOutput);
    }
  );
}

export function wingetSearch(userInput) {
  exec(`winget search "${userInput}" --count 10`, (error, stdout, stderr) => {
    if (error) {
      displayNotFindResult();
      return;
    }

    const packages = formatWingetSearchResults(stdout);
    const searchOutput = displayWingetResults(packages);
    console.log(searchOutput);
  });
}
