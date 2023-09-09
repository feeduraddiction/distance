const puppeteer = require("puppeteer");

describe("Destination App", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({headless:false});
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  },  10000);

  it("Should load the homepage and display content", async () => {
    await page.goto("http://localhost:3000");
  });

  it("Should have inputs and go to search results", async () => {
    await page.type('input[name="origin"]', "Paris");
    await page.type('input[type="date"]', "14.09.2023");
    await page.type('input[name="passengers"]', "2");
    await page.type('input[name="destinations.0.cityName"]', "Paris");
    await page.click('button[type="submit"]');
    await page.waitForNavigation();
    const url = page.url();
    expect(url).toEqual(
      "http://localhost:3000/s?date=2023-09-14&destinations=Paris&origin=Paris&passengers=2"
    );
  }, 3000);
});
