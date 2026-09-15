import { expect, test } from "@playwright/test";

test("scroll chapters, navigation and artwork remain usable", async ({ page }, testInfo) => {
  const runtimeErrors: string[] = [];
  page.on("pageerror", error => runtimeErrors.push(error.message));
  page.on("console", message => { if (message.type() === "error" && /shader|webgl|uncaught/i.test(message.text())) runtimeErrors.push(message.text()); });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "RIITOM MODAK", exact: true })).toBeVisible();
  await expect(page.locator(".prism-container canvas")).toBeVisible();
  await expect(page.locator(".hero-prism-background")).toHaveCSS("position", "absolute");
  await expect(page.getByRole("link", { name: "GitHub profile", exact: true })).toHaveAttribute("href", "https://github.com/Riitom");
  await expect(page.getByRole("link", { name: "LinkedIn profile", exact: true })).toHaveAttribute("href", "https://www.linkedin.com/in/riitom-modak-b018a131a/");
  // Wait for the hero entrance; pressure lettering must fit even after its font loads.
  await expect(page.locator(".hero-name-stage")).toHaveCSS("opacity", "1");
  await page.screenshot({ path: testInfo.outputPath("hero.png") });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  const headingFits = await page.locator(".text-pressure-title").evaluate(el => el.scrollWidth <= el.clientWidth + 2);
  expect(headingFits).toBe(true);

  await page.getByRole("link", { name: "SCROLL TO DISCOVER" }).click();
  await expect(page).toHaveURL(/#about$/);
  await expect(page.getByRole("heading", { name: "A little more human." })).toBeInViewport();
  await page.screenshot({ path: testInfo.outputPath("story.png") });

  const expand = page.locator(".scroll-expand");
  const track = await expand.evaluate(el => ({ top: el.getBoundingClientRect().top + window.scrollY, height: el.clientHeight }));
  const viewportHeight = await page.evaluate(() => window.innerHeight);
  await page.evaluate(y => window.scrollTo({ top: y, behavior: "instant" }), track.top);
  const frame = page.locator(".scroll-expand__frame");
  if (testInfo.project.name !== "reduced-motion") {
    await expect.poll(async () => (await frame.evaluate(el => getComputedStyle(el).clipPath))).toContain("22%");
    await page.screenshot({ path: testInfo.outputPath("expand-start.png") });
    await page.evaluate(y => window.scrollTo({ top: y, behavior: "instant" }), track.top + track.height - viewportHeight - 1);
    await expect.poll(async () => parseFloat((await frame.evaluate(el => getComputedStyle(el).clipPath)).replace("inset(", ""))).toBeLessThan(0.1);
    const pinned = await page.locator(".scroll-expand__stage").boundingBox();
    expect(Math.abs(pinned!.y)).toBeLessThan(3);
  } else {
    expect(track.height).toBeLessThanOrEqual(viewportHeight + 1);
  }
  await page.screenshot({ path: testInfo.outputPath("expand-end.png") });

  for (const id of ["scrap", "border", "thermal"]) {
    await page.locator(`.project-index a[href='#${id}']`).evaluate((el: HTMLAnchorElement) => el.click());
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator(`#${id} h3`)).toBeInViewport();
    await page.locator(`#${id} .project-visual`).scrollIntoViewIfNeeded();
    await expect(page.locator(`#${id} .project-story-step`)).toHaveCount(3);
    await page.screenshot({ path: testInfo.outputPath(`${id}.png`) });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  }
  await expect(page.locator("#border .project-repo-link")).toHaveAttribute("href", "https://github.com/Riitom/Border-Sense");
  await expect(page.locator("#thermal")).toContainText("ESP32");
  await expect(page.locator("#thermal")).not.toContainText("Raspberry Pi");
  await expect(page.locator("#projects")).not.toContainText("Project Beta");
  await page.getByRole("link", { name: "Talk about this project" }).click();
  await expect(page.getByRole("heading", { name: "Let's work together." })).toBeInViewport();
  const canvasHeight = await page.locator(".click-spark-canvas").evaluate(el => el.clientHeight);
  expect(canvasHeight).toBe(viewportHeight);
  await page.getByRole("button", { name: "Toggle theme" }).click();
  await expect(page.locator("html")).not.toHaveClass(/dark/);
  await page.screenshot({ path: testInfo.outputPath("light-contact.png") });
  expect(runtimeErrors).toEqual([]);
});
