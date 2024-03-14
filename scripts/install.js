import { exec } from "child_process";

export function chocoInstall(packageName) {
  exec(
    `Start-Process powershell -Verb runAs -ArgumentList "choco install ${packageName} -y"`,
    { shell: "powershell.exe" },
    (error, _stdout, stderr) => {
      if (error) {
        console.error(`Error executing choco install: ${error.message}`);
      }
      if (stderr) {
        console.error(`choco install stderr: ${stderr}`);
      }
    }
  );
}

export function wingetInstall(packageId) {
  exec(
    `Start-Process powershell -Verb runAs -ArgumentList "winget install --id ${packageId} --accept-package-agreements"`,
    { shell: "powershell.exe" },
    (error, _stdout, stderr) => {
      if (error) {
        console.error(`Error executing winget install: ${error.message}`);
      }
      if (stderr) {
        console.error(`winget install stderr: ${stderr}`);
      }
    }
  );
}
