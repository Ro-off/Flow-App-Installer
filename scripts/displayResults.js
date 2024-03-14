const { method, parameters, settings } = JSON.parse(process.argv[2]);

export function displayEmptyQueryResult() {
  console.log(
    JSON.stringify({
      result: [
        {
          Title: "Enter a package name to search",
          Subtitle: "Click on package to install it.",
          JsonRPCAction: {
            method: "query",
            parameters: [""],
          },
          IcoPath: "Images\\info.png",
        },
      ],
    })
  );
}

export function displayNotFindResult() {
  console.log(
    JSON.stringify({
      result: [
        {
          Title: "No results found",
          Subtitle: "Try a different search term.",
          JsonRPCAction: {
            method: "query",
            parameters: [""],
          },
          IcoPath: "Images\\info.png",
        },
      ],
    })
  );
}

export function displayChocoResults(packages) {
  const packageManager = settings.packageManager;
  return JSON.stringify({
    result: packages.map((packageItem) => ({
      Title: packageItem.name,
      Subtitle: `Version: ${packageItem.version}`,
      JsonRPCAction: {
        method: "install_package",
        parameters: [packageItem, packageManager],
      },
      IcoPath: "Images\\program.png",
    })),
  });
}

export function displayWingetResults(packages) {
  const packageManager = settings.packageManager;
  return JSON.stringify({
    result: packages.map((packageItem) => ({
      Title: packageItem.name,
      Subtitle: `Id: ${packageItem.id}, Source: ${packageItem.source}`,
      JsonRPCAction: {
        method: "install_package",
        parameters: [packageItem, packageManager],
      },
      IcoPath: "Images\\program.png",
    })),
  });
}
