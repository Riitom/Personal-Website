import { expect, test } from "@playwright/test";

test("sparks follow page-wide clicks and taps without blocking controls", async ({ page }, testInfo) => {
  await page.goto("/");
  await expect(page.locator(".hero-name-stage")).toHaveCSS("opacity", "1");
  const canvas = page.locator(".click-spark-canvas");
  await expect(canvas).toHaveCSS("pointer-events", "none");
  const reduced = testInfo.project.name === "reduced-motion";
  const mobile = testInfo.project.name === "mobile";

  const hasSparks = (point: { x: number; y: number }) => canvas.evaluate((el: HTMLCanvasElement, { x, y }) => {
    const ratio = el.width / el.clientWidth;
    const left = Math.max(0, Math.floor((x - 40) * ratio));
    const top = Math.max(0, Math.floor((y - 40) * ratio));
    const width = Math.min(el.width - left, Math.ceil(80 * ratio));
    const height = Math.min(el.height - top, Math.ceil(80 * ratio));
    return el.getContext("2d")!.getImageData(left, top, width, height).data.some((value, index) => index % 4 === 3 && value > 0);
  }, point);

  const checkClick = async (point: { x: number; y: number }) => {
    if (mobile) await page.touchscreen.tap(point.x, point.y);
    else await page.mouse.click(point.x, point.y);
    if (reduced) {
      await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
      expect(await hasSparks(point)).toBe(false);
    } else {
      await expect.poll(() => hasSparks(point), { intervals: [16, 32, 64], timeout: 1500 }).toBe(true);
      await expect.poll(() => hasSparks(point), { timeout: 2000 }).toBe(false);
    }
  };

  // Blank space is not an interactive element.
  const blank = { x: 10, y: page.viewportSize()!.height / 2 };
  expect(await page.evaluate(({ x, y }) => document.elementFromPoint(x, y)?.closest("a, button, input"), blank)).toBeNull();
  await checkClick(blank);

  // Capture-phase handling still works when a child stops event bubbling.
  const intro = page.locator(".hero-editorial-intro");
  await intro.evaluate(el => el.addEventListener("pointerdown", event => event.stopPropagation()));
  const introBox = (await intro.boundingBox())!;
  await checkClick({ x: introBox.x + introBox.width / 2, y: introBox.y + introBox.height / 2 });

  const toggleBox = (await page.getByRole("button", { name: "Toggle theme" }).boundingBox())!;
  await checkClick({ x: toggleBox.x + toggleBox.width / 2, y: toggleBox.y + toggleBox.height / 2 });
  await expect(page.locator("html")).not.toHaveClass(/dark/);

  // Coordinates must stay viewport-relative well below the landing section.
  const projectText = page.locator("#quantum .project-hook");
  await projectText.scrollIntoViewIfNeeded();
  const projectBox = (await projectText.boundingBox())!;
  await checkClick({ x: projectBox.x + projectBox.width / 2, y: projectBox.y + projectBox.height / 2 });

  if (!mobile) {
    const point = { x: projectBox.x + projectBox.width / 2, y: projectBox.y + projectBox.height / 2 };
    await page.mouse.click(point.x, point.y, { button: "right" });
    await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
    expect(await hasSparks(point)).toBe(false);
  }
});
