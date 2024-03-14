import { exec } from "child_process";

export function chocoInstall(packageName) {
  const command = `choco install ${packageName} -y`;
  const options = { shell: "powershell.exe" };

  exec(
    `Start-Process powershell -Verb runAs -ArgumentList "${command}"`,
    options,
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
  const command = `winget install --id ${packageId} --accept-package-agreements`;
  const options = { shell: "powershell.exe" };

  exec(
    `Start-Process powershell -Verb runAs -ArgumentList "${command}"`,
    options,
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
