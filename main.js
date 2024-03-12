const { exec } = require("child_process");

const { method, parameters } = JSON.parse(process.argv[2]);

function formatWingetSearchResults(stdout) {
  const lines = stdout.split("\n");
  const packages = [];
  const headerString = "Name" + lines[0].split("Name")[1];
  NamePlacement = [
    headerString.indexOf("Name"),
    headerString.indexOf("Id") - 1,
  ];
  IdPlacement = [
    headerString.indexOf("Id"),
    headerString.indexOf("Version") - 1,
  ];
  Source = [headerString.indexOf("Source"), headerString.length - 1];

  for (let i = 2; i < lines.length - 2; i++) {
    const name = lines[i].slice(NamePlacement[0], NamePlacement[1]).trim();
    const id = lines[i].slice(IdPlacement[0], IdPlacement[1]).trim();
    const source = lines[i].slice(Source[0], Source[1]).trim();
    packages.push({ name, id, source });
  }
  return packages;
}

if (method === "query") {
  const userInput = parameters;

  if (userInput.toString() === "") {
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
            IcoPath: "Images\\app.png",
          },
        ],
      })
    );
    return;
  } else {
    exec(`winget search --name ${userInput} -n 10`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing winget search: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`winget search stderr: ${stderr}`);
        return;
      }

      const packages = formatWingetSearchResults(stdout);

      const results = packages.map((package) => ({
        Title: package.name,
        Subtitle: `ID: ${package.id} | Source: ${package.source}`,
        JsonRPCAction: {
          method: "install_package",
          parameters: [package],
        },
        IcoPath: "Images\\app.png",
      }));
      1;

      console.log(JSON.stringify({ result: results }));
    });
  }
}

if (method === "install_package") {
}
