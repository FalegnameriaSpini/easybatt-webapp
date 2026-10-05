import { promises as fs, constants } from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

const directory = path.join(process.cwd(), ".local", "easybatt");
await fs.mkdir(directory, { recursive: true });
try {
  await fs.copyFile(path.join(process.cwd(), "data", "easybatt-config.json"),
    path.join(directory, "easybatt-config.json"), constants.COPYFILE_EXCL);
} catch (error) {
  if (error.code !== "EEXIST") throw error;
}

const child = spawn(process.execPath, ["node_modules/next/dist/bin/next", "dev", "--hostname", "127.0.0.1", "--port", "3001"], {
  stdio: "inherit",
  env: { ...process.env, NODE_ENV: "development", EASYBATT_SANDBOX: "1" },
});
child.on("error", () => { console.error("Impossibile avviare il server di prova."); process.exitCode = 1; });
child.on("exit", (code) => { process.exitCode = code ?? 1; });
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => child.kill(signal));
