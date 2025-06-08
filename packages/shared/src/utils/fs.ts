import { existsSync } from "fs";
import path from "path";
import { ErrorOr } from "./errors";

export function getPackageDir(startDir: string = __dirname): ErrorOr<string> {
  let currentDir = startDir;
  while (!existsSync(path.join(currentDir, "package.json"))) {
    const parentDir = path.dirname(currentDir);

    if (parentDir === currentDir) {
      return ErrorOr.err("getPackageDir not called within a package");
    }

    currentDir = parentDir;
  }
  return ErrorOr.ok(currentDir);
}
