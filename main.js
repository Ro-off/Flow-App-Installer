import { chocoInstall, wingetInstall } from "./scripts/install.js";
import { displayEmptyQueryResult } from "./scripts/displayResults.js";
import { chocoSearch, wingetSearch } from "./scripts/search.js";
import { exec } from "child_process";

const { method, parameters, settings } = JSON.parse(process.argv[2]);

if (method === "query") {
  const userInput = parameters;
  if (isNaN(Number(settings.stringsToDisplay))) {
    console.error("Error: stringsToDisplay is not a number");
  }

  if (userInput.toString() === "") {
    displayEmptyQueryResult();
  } else {
    settings.packageManager === "Winget"
      ? wingetSearch(userInput)
      : chocoSearch(userInput);
  }
}

if (method === "install_package") {
  const packageItem = parameters[0];
  const packageManager = parameters[1];
  const packageName = packageItem.name;
  const packageId = packageItem.id;

  packageManager === "Winget"
    ? wingetInstall(packageId)
    : chocoInstall(packageName);
}
