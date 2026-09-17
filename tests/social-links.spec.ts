import { expect, test } from "@playwright/test";

const linkedin = "https://www.linkedin.com/in/riitom-modak/";

test("hero and contact LinkedIn controls open the same profile", async ({ page, context }) => {
  // Inspect the actual requested destination without contacting LinkedIn/login.
  await context.route("https://www.linkedin.com/**", route => route.fulfill({ contentType: "text/html", body: "<title>LinkedIn navigation test</title>" }));
  await page.goto("/");
  await expect(page.locator(".hero-name-stage")).toHaveCSS("opacity", "1");
  for (const link of [page.getByRole("link", { name: "LinkedIn profile", exact: true }), page.locator("#contact").getByRole("link", { name: "LinkedIn", exact: true })]) {
    const popup = page.waitForEvent("popup");
    await link.click();
    const destination = await popup;
    await expect(destination).toHaveURL(linkedin);
    await destination.close();
  }
});

test("hero LinkedIn stays clickable at its edges in a short viewport", async ({ page, context }, testInfo) => {
  await page.setViewportSize(testInfo.project.name === "mobile" ? { width: 390, height: 568 } : { width: 1366, height: 600 });
  await context.route("https://www.linkedin.com/**", route => route.fulfill({ contentType: "text/html", body: "<title>LinkedIn navigation test</title>" }));
  await page.goto("/");
  await expect(page.locator(".hero-name-stage")).toHaveCSS("opacity", "1");
  const link = page.getByRole("link", { name: "LinkedIn profile", exact: true });
  await link.scrollIntoViewIfNeeded();
  await link.hover();
  await expect(link).toHaveCSS("transform", "none");
  const box = (await link.boundingBox())!;
  expect(box.width).toBeGreaterThanOrEqual(44);
  expect(box.height).toBeGreaterThanOrEqual(44);
  // Sample the four straight edges, not the empty corners outside the rounded button.
  const points = [
    { x: box.x + 3, y: box.y + box.height / 2 },
    { x: box.x + box.width - 3, y: box.y + box.height / 2 },
    { x: box.x + box.width / 2, y: box.y + 3 },
    { x: box.x + box.width / 2, y: box.y + box.height - 3 },
  ];
  for (const point of points) {
    expect(await page.evaluate(({ x, y }) => document.elementFromPoint(x, y)?.closest("a")?.getAttribute("href"), point)).toBe(linkedin);
  }
  const point = points[1];
  const popup = page.waitForEvent("popup");
  await page.mouse.click(point.x, point.y);
  const destination = await popup;
  await expect(destination).toHaveURL(linkedin);
  await destination.close();
});
