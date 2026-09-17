import { expect, test } from "@playwright/test";

test("scroll chapters, navigation and artwork remain usable", async ({ page }, testInfo) => {
  const runtimeErrors: string[] = [];
  page.on("pageerror", error => runtimeErrors.push(error.message));
  page.on("console", message => { if (message.type() === "error" && /shader|webgl|uncaught/i.test(message.text())) runtimeErrors.push(message.text()); });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "RIITOM MODAK", exact: true })).toBeVisible();
  await expect(page.locator(".prism-container canvas")).toBeVisible();
  await expect(page.locator(".hero-prism-background")).toHaveCSS("position", "absolute");
  await expect(page.locator(".hero-sticky-stage")).toHaveCSS("position", "relative");
  const pixels = await page.locator(".prism-container canvas").evaluate((el: HTMLCanvasElement) => el.width * el.height);
  expect(pixels).toBeLessThanOrEqual(1500000);
  await expect(page.getByRole("link", { name: "GitHub profile", exact: true })).toHaveAttribute("href", "https://github.com/Riitom");
  await expect(page.getByRole("link", { name: "LinkedIn profile", exact: true })).toHaveAttribute("href", "https://www.linkedin.com/in/riitom-modak/");
  // Wait for the hero entrance; pressure lettering must fit even after its font loads.
  await expect(page.locator(".hero-name-stage")).toHaveCSS("opacity", "1");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator(".site-shell")).toHaveCSS("background-color", "rgb(0, 0, 0)");
  await expect(page.locator(".cinematic-hero")).toHaveCSS("background-color", "rgb(0, 0, 0)");
  await page.screenshot({ path: testInfo.outputPath("hero.png") });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  const headingFits = await page.locator(".text-pressure-title").evaluate(el => el.scrollWidth <= el.clientWidth + 2);
  expect(headingFits).toBe(true);

  await page.getByRole("link", { name: "SCROLL TO DISCOVER" }).click();
  await expect(page).toHaveURL(/#about$/);
  await expect(page.locator("html")).not.toHaveClass(/lenis-smooth/);
  await expect(page.getByRole("heading", { name: "A little more human." })).toBeInViewport();
  await page.screenshot({ path: testInfo.outputPath("story.png") });

  const expand = page.locator(".scroll-expand");
  const track = await expand.evaluate(el => ({ top: el.getBoundingClientRect().top + window.scrollY, height: el.clientHeight }));
  const viewportHeight = await page.evaluate(() => window.innerHeight);
  await page.evaluate(y => window.scrollTo({ top: y, behavior: "instant" }), track.top);
  const frame = page.locator(".scroll-expand__frame");
  if (testInfo.project.name !== "reduced-motion") {
    await expect.poll(async () => (await frame.evaluate(el => getComputedStyle(el).clipPath))).toContain("22%");
    await expect(page.locator(".universe-core")).toHaveCSS("filter", "blur(4px)");
    await page.screenshot({ path: testInfo.outputPath("expand-start.png") });
    await page.evaluate(y => window.scrollTo({ top: y, behavior: "instant" }), track.top + track.height - viewportHeight - 1);
    await expect.poll(async () => parseFloat((await frame.evaluate(el => getComputedStyle(el).clipPath)).replace("inset(", ""))).toBeLessThan(0.1);
    const pinned = await page.locator(".scroll-expand__stage").boundingBox();
    expect(Math.abs(pinned!.y)).toBeLessThan(3);
    await expect(page.locator(".scroll-expand__title")).toHaveCSS("opacity", "0");
  } else {
    expect(track.height).toBeLessThanOrEqual(viewportHeight + 1);
  }
  await expect(page.locator(".universe-core")).toHaveCSS("filter", "blur(24px)");
  await expect(page.locator(".universe-core")).toHaveCSS("opacity", "0.1");
  await expect(page.locator(".scroll-expand__overlay")).toHaveCSS("opacity", "1");
  await page.screenshot({ path: testInfo.outputPath("expand-end.png") });

  for (const id of ["scrap", "border", "thermal", "quantum"]) {
    await page.locator(`.project-index a[href='#${id}']`).evaluate((el: HTMLAnchorElement) => el.click());
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator("html")).not.toHaveClass(/lenis-smooth/);
    await expect(page.locator(`#${id} h3`)).toBeInViewport();
    await page.locator(`#${id} .project-visual`).scrollIntoViewIfNeeded();
    await expect(page.locator(`#${id} .project-story-step`)).toHaveCount(3);
    await expect(page.locator(`#${id} .architecture-node`)).toHaveCount(3);
    await expect(page.locator(`#${id} .architecture-node.is-current`)).toHaveCount(1);
    await expect(page.locator(`#${id} .architecture-progress-track`)).toHaveCount(3);
    if (testInfo.project.name === "reduced-motion") {
      await expect(page.locator(`#${id} .demo-animated`).first()).toHaveCSS("animation-name", "none");
    } else {
      await expect(page.locator(`#${id} .demo-animated`).first()).toHaveCSS("animation-play-state", "running");
    }
    // Let scroll-driven transforms and Chrome's compositor settle before capture.
    await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
    await page.screenshot({ path: testInfo.outputPath(`${id}.png`) });
    await page.locator(`#${id} .architecture-stage-button`).nth(2).click();
    await expect(page.locator(`#${id} .architecture-stage-button`).nth(2)).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(`#${id} .architecture-context p`).nth(2)).toHaveAttribute("aria-hidden", "false");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  }
  await expect(page.locator("#border .project-repo-link")).toHaveAttribute("href", "https://github.com/Riitom/Border-Sense");
  await expect(page.locator("#thermal")).toContainText("ESP32");
  await expect(page.locator("#thermal")).not.toContainText("Raspberry Pi");
  await expect(page.locator("#projects")).not.toContainText("Project Beta");
  await expect(page.locator(".project-chapter")).toHaveCount(4);
  await expect(page.locator("#quantum")).toContainText("14-qubit");
  await expect(page.locator("#quantum")).toContainText("benchmark is still pending");
  await expect(page.locator("#quantum .visual-topline")).toContainText("04 / 04");
  await page.locator("#quantum .project-repo-link").click();
  await expect(page.locator("html")).not.toHaveClass(/lenis-smooth/);
  await expect(page.locator("#contact h2")).toBeInViewport();
  await expect(page.locator("#contact .glass-panel")).toHaveCount(0);
  await expect(page.getByRole("link", { name: /Start a conversation/ })).toHaveAttribute("href", /to=riitom09@gmail.com/);
  await page.screenshot({ path: testInfo.outputPath("dark-contact.png") });
  const canvasHeight = await page.locator(".click-spark-canvas").evaluate(el => el.clientHeight);
  expect(canvasHeight).toBe(viewportHeight);
  await page.getByRole("button", { name: "Toggle theme" }).click();
  await expect(page.locator("html")).not.toHaveClass(/dark/);
  await expect.poll(() => page.locator(".site-shell").evaluate(el => getComputedStyle(el).backgroundColor)).not.toBe("rgb(0, 0, 0)");
  // Await the existing theme transition before recording the light-theme result.
  await page.locator(".site-shell").evaluate(async el => { await Promise.all(el.getAnimations().map(animation => animation.finished)); });
  await page.screenshot({ path: testInfo.outputPath("light-contact.png") });
  expect(runtimeErrors).toEqual([]);
});

test.describe("high-density motion", () => {
test.use({ deviceScaleFactor: 2 });
test("hero leaves continuously and project stages animate without shifting text", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Detailed wheel and sticky-stage regression on desktop.");
  await page.goto("/");
  await expect(page.locator(".hero-name-stage")).toHaveCSS("opacity", "1");
  const canvasSize = await page.locator(".prism-container canvas").evaluate((el: HTMLCanvasElement) => [el.width, el.height]);
  expect(canvasSize[0] * canvasSize[1]).toBeLessThanOrEqual(1500000);
  expect(canvasSize[0]).toBeLessThan(1440 * 2);
  const sampling = page.evaluate(() => new Promise<{ positions: { y: number; top: number }[]; delta: number }>(resolve => {
    const positions: { y: number; top: number }[] = [];
    let delta = 0;
    window.addEventListener("wheel", event => { delta = event.deltaY; }, { once: true, passive: true });
    const start = performance.now();
    const sample = () => {
      positions.push({ y: window.scrollY, top: document.querySelector(".hero-sticky-stage")!.getBoundingClientRect().top });
      if (performance.now() - start < 1200) requestAnimationFrame(sample);
      else resolve({ positions, delta });
    };
    requestAnimationFrame(sample);
  }));
  await page.mouse.wheel(0, 120);
  const { positions, delta } = await sampling;
  // Chrome may scale injected wheel deltas at high device pixel ratios.
  expect(delta).toBeGreaterThan(0);
  expect(positions.at(-1)!.y).toBeCloseTo(delta, 0);
  expect(new Set(positions.map(position => position.y)).size).toBeGreaterThan(4);
  expect(positions.every(position => Math.abs(position.top + position.y) < 1)).toBe(true);
  await expect(page.locator(".hero-prism-background")).toHaveCSS("transform", "none");
  expect(await page.locator(".prism-container canvas").evaluate((el: HTMLCanvasElement) => [el.width, el.height])).toEqual(canvasSize);
  await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 0.7, behavior: "instant" }));
  expect((await page.locator(".hero-sticky-stage").boundingBox())!.y).toBeLessThan(-500);
  await page.screenshot({ path: testInfo.outputPath("hero-exit.png") });
  for (const id of ["scrap", "border", "thermal", "quantum"]) {
    const body = await page.locator(`#${id} .project-chapter-body`).evaluate(el => ({ top: el.getBoundingClientRect().top + window.scrollY, height: el.clientHeight }));
    const viewport = await page.evaluate(() => window.innerHeight);
    let diagramHeight = 0;
    for (const [index, progress] of [[0, 0.12], [1, 0.5], [2, 0.85], [1, 0.5]]) {
      await page.evaluate(y => window.scrollTo({ top: y, behavior: "instant" }), body.top - viewport / 2 + body.height * progress);
      const node = page.locator(`#${id} .architecture-node`).nth(index);
      await expect(node).toHaveClass(/is-current/);
      await expect(page.locator(`#${id} .demo-animated`).first()).toHaveCSS("animation-play-state", "running");
      await expect(page.locator(`#${id} .architecture-context p`).nth(index)).toHaveCSS("opacity", "1");
      const height = await page.locator(`#${id} .project-visual`).evaluate(el => el.clientHeight);
      if (diagramHeight) expect(height).toBeCloseTo(diagramHeight, 0);
      diagramHeight = height;
    }
    await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
    await page.screenshot({ path: testInfo.outputPath(`${id}-flow.png`) });
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect(page.locator(".diagram-running")).toHaveCount(0);
  await expect(page.locator("#quantum .demo-animated").first()).toHaveCSS("animation-play-state", "paused");
});
});

test("small wheel input eases monotonically and respects reduced motion", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Wheel sampling is a desktop interaction.");
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/lenis/);
  await page.locator(".story-chapter").first().evaluate(el => window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + 100, behavior: "instant" }));
  const start = await page.evaluate(() => window.scrollY);
  const sampling = page.evaluate(() => new Promise<number[]>(resolve => {
    const positions: number[] = [];
    const started = performance.now();
    const sample = () => {
      positions.push(window.scrollY);
      if (performance.now() - started < 1400) requestAnimationFrame(sample);
      else resolve(positions);
    };
    requestAnimationFrame(sample);
  }));
  await page.mouse.wheel(0, 80);
  const positions = await sampling;
  const movement = positions.at(-1)! - start;
  expect(movement).toBeGreaterThanOrEqual(78);
  expect(movement).toBeLessThanOrEqual(82);
  expect(new Set(positions.map(Math.round)).size).toBeGreaterThan(4);
  expect(positions.every((position, index) => index === 0 || position >= positions[index - 1] - 1)).toBe(true);
  await testInfo.attach("small-wheel-motion", { body: JSON.stringify({ movement, positions }), contentType: "application/json" });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).not.toHaveClass(/lenis/);
  await page.keyboard.press("End");
  await expect(page.locator(".chapter-footer")).toBeInViewport();
  await page.getByRole("link", { name: "Back to the beginning" }).click();
  await expect(page.locator(".hero-name-stage")).toBeInViewport();
});
