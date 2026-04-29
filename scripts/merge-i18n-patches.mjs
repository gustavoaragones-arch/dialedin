import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const messagesDir = path.join(root, "messages");
const patchesDir = path.join(messagesDir, "patches");

function merge(locale) {
  const target = path.join(messagesDir, `${locale}.json`);
  const j = JSON.parse(fs.readFileSync(target, "utf8"));

  const dialed = path.join(patchesDir, `dialedInUi-${locale}.json`);
  if (fs.existsSync(dialed)) {
    Object.assign(j.dialedInUi, JSON.parse(fs.readFileSync(dialed, "utf8")));
  }

  const blog = path.join(patchesDir, `blogIndex-${locale}.json`);
  if (fs.existsSync(blog)) {
    j.blogIndex = JSON.parse(fs.readFileSync(blog, "utf8"));
  }

  const sci = path.join(patchesDir, `science-${locale}.json`);
  if (fs.existsSync(sci)) {
    const s = JSON.parse(fs.readFileSync(sci, "utf8"));
    j.sciencePage = s.sciencePage;
    j.scienceArticle = s.scienceArticle;
  }

  const hiw = path.join(patchesDir, `howItWorksPage-${locale}.json`);
  if (fs.existsSync(hiw)) {
    j.howItWorksPage = JSON.parse(fs.readFileSync(hiw, "utf8"));
  }

  const sb = path.join(patchesDir, `scienceBanners-${locale}.json`);
  if (fs.existsSync(sb)) {
    j.scienceBanners = JSON.parse(fs.readFileSync(sb, "utf8"));
  }

  const cl = path.join(patchesDir, `contentLinks-${locale}.json`);
  if (fs.existsSync(cl)) {
    j.contentLinks = JSON.parse(fs.readFileSync(cl, "utf8"));
  }

  const needleScale = path.join(patchesDir, `needleScale-${locale}.json`);
  if (fs.existsSync(needleScale)) {
    j.needleScale = JSON.parse(fs.readFileSync(needleScale, "utf8"));
  }

  fs.writeFileSync(target, JSON.stringify(j, null, 2) + "\n");
}

for (const loc of ["en", "es", "pt"]) {
  merge(loc);
}

console.log("Merged i18n patches into messages/*.json");
