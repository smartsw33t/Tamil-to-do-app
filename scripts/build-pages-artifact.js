import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outputDir = path.join(root, ".site");

const requiredPaths = ["index.html", "favicon.svg", "src"];

for (const item of requiredPaths) {
  const itemPath = path.join(root, item);

  if (!fs.existsSync(itemPath)) {
    throw new Error(`தேவையான கோப்பு அல்லது கோப்புறை விடுபட்டுள்ளது: ${item}`);
  }
}

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

const copyIfExists = (from, to) => {
  const source = path.join(root, from);
  const target = path.join(outputDir, to);

  if (!fs.existsSync(source)) {
    return;
  }

  fs.cpSync(source, target, { recursive: true });
};

copyIfExists("index.html", "index.html");
copyIfExists("favicon.svg", "favicon.svg");
copyIfExists("src", "src");
copyIfExists("assets", "assets");
copyIfExists("public", ".");

console.log(".site/ கோப்புறையில் வெளியீட்டிற்கான கோப்புகள் வெற்றிகரமாக உருவாக்கப்பட்டன.");
