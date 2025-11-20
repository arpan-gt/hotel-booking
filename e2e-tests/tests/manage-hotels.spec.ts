import { test, expect } from "@playwright/test";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("dummy@gmail.com");
  await page.locator("[name=password]").fill("dummy1");

  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForURL("http://localhost:5173/");
  await expect(page.getByText("Signed In Successfully")).toBeVisible();
});

test("should allow user to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}add-hotel`);

  await page.locator('[name="name"]').fill("Test Hotel");
  await page.locator('[name="city"]').fill("Test City");
  await page.locator('[name="country"]').fill("Test Country");
  await page.locator('[name="description"]').fill("Test description here");
  await page.locator('[name="pricePerNight"]').fill("100");
  await page.selectOption('select[name="starRating"]', "3");
  await page.getByText("Budget").click();
  await page.getByLabel("Free Wifi").check();
  await page.getByLabel("Parking").check();

  await page.locator("[name=adultCount]").fill("2");
  await page.locator("[name=childCount]").fill("3");

  const imagePath = path.join(
    __dirname,
    "files",
    "34209-3065x1909-desktop-hd-the-lord-of-the-rings-background-image.jpg"
  );

  await page.setInputFiles('[name="imageFiles"]', imagePath);

  await page.getByRole("button", { name: "Save" }).click();

  await expect(page.getByText("Hotel Saved!")).toBeVisible({ timeout: 10000 });
});

test("should display hotels", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);

  await expect(
    page.getByRole("heading", { name: "internation hotel" }).first()
  ).toBeVisible();

  await expect(
    page.getByText("Lorem ipsum dolor sit amet").first()
  ).toBeVisible();

  await expect(page.getByText("Budget").first()).toBeVisible();
  await expect(page.getByText("$498 per night").first()).toBeVisible();
  await expect(page.getByText("2 adults, 0 children").first()).toBeVisible();
  await expect(page.getByText("4 Star Rating").first()).toBeVisible();

  await expect(
    page.getByRole("link", { name: "View Details" }).first()
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Add Hotel" }).first()
  ).toBeVisible();
});
