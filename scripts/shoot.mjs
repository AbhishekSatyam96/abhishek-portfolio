// Dev-only screenshot helper. Usage:
//   node scripts/shoot.mjs <url> <out.png> [width] [height] [full|view] [reduced]
import puppeteer from "puppeteer-core";

const [
  ,
  ,
  url = "http://localhost:3000",
  out = "/tmp/shot.png",
  width = "1440",
  height = "900",
  mode = "full",
  reduced = "no",
] = process.argv;

const CHROME =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--force-color-profile=srgb", "--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({
  width: Number(width),
  height: Number(height),
  deviceScaleFactor: 1,
});
if (reduced === "reduced") {
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
}
await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
// let fonts + entrance animations settle
await new Promise((r) => setTimeout(r, 1500));

// Scroll through so every whileInView (once:true) section reveals + stays shown.
if (mode === "full") {
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.6);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 220));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });
  await new Promise((r) => setTimeout(r, 600));
}

await page.screenshot({ path: out, fullPage: mode === "full" });
await browser.close();
console.log("wrote", out);
