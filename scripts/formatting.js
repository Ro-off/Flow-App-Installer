export function formatWingetSearchResults(stdout) {
  const lines = stdout.split("\n");
  const packages = [];
  const headerString = "Name" + lines[0].split("Name")[1];
  const NamePlacement = [
    headerString.indexOf("Name"),
    headerString.indexOf("Id") - 1,
  ];
  const IdPlacement = [
    headerString.indexOf("Id"),
    headerString.indexOf("Version") - 1,
  ];
  const SourcePlacement = [
    headerString.indexOf("Source"),
    headerString.length - 1,
  ];

  for (let i = 2; i < lines.length - 2; i++) {
    const name = lines[i].slice(NamePlacement[0], NamePlacement[1]).trim();
    const id = lines[i].slice(IdPlacement[0], IdPlacement[1]).trim();
    const source = lines[i]
      .slice(SourcePlacement[0], SourcePlacement[1])
      .trim();
    packages.push({ name, id, source });
  }
  return packages;
}

export function formatChocoSearchResults(stdout) {
  const lines = stdout.split("\n");
  const packages = [];

  for (let i = 0; i < lines.length - 1; i++) {
    const name = lines[i].split("|")[0];
    const version = lines[i].split("|")[1];
    packages.push({ name, version });
  }
  return packages;
}