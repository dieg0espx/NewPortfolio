const fs = require("fs");

const source = fs.readFileSync("public/index.html", "utf8");
const contract = source.match(/<!--\s*THESIS:[\s\S]*?-->/);
if (!contract) {
  console.error("Direction contract missing from public/index.html");
  process.exit(1);
}

const builtPath = "build/index.html";
let built = fs.readFileSync(builtPath, "utf8");
built = built.replace(contract[0], "");
if (!built.includes("<body>")) {
  console.error("Built HTML has no body tag");
  process.exit(1);
}
built = built.replace("<body>", `<body>${contract[0]}`);
fs.writeFileSync(builtPath, built);
