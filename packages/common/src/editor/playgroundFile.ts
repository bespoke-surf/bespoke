import * as fs from "fs";

// why index.css?
// because when tsup outputs the file as index.css;
// thus dist/index.css
export const playgroundFile = fs.readFileSync(__dirname + "/index.css");
