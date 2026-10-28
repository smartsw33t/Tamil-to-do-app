import { access, readFile } from "node:fs/promises";

const requiredFiles = [
  "index.html",
  "favicon.svg",
  "src/styles/main.css",
  "src/scripts/app.js",
];

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const missingFiles = [];

  for (const file of requiredFiles) {
    if (!(await fileExists(file))) {
      missingFiles.push(file);
    }
  }

  if (missingFiles.length > 0) {
    throw new Error(`தேவையான கோப்புகள் காணப்படவில்லை: ${missingFiles.join(", ")}`);
  }

  const indexHtml = await readFile("index.html", "utf8");
  const requiredReferences = [
    "./favicon.svg",
    "./src/styles/main.css",
    "./src/scripts/app.js",
  ];
  const missingReferences = requiredReferences.filter(
    (reference) => !indexHtml.includes(reference),
  );

  if (missingReferences.length > 0) {
    throw new Error(
      `index.html கோப்பில் இந்த பிணைப்புகள் விடுபட்டுள்ளன: ${missingReferences.join(", ")}`,
    );
  }

  // தமிழ் வலைப்பக்கக் குறிச்சொல் சரிபார்ப்பு
  if (!indexHtml.includes('lang="ta"')) {
    throw new Error('index.html கோப்பில் lang="ta" அமைவு இடம்பெறவில்லை.');
  }

  console.log("நிலையான கோப்புகள் மற்றும் பிணைப்புகள் வெற்றிகரமாகச் சரிபார்க்கப்பட்டன.");
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
