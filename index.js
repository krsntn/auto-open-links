require('dotenv').config();

const puppeteer = require('puppeteer');
const { autoLogin } = require('./scripts/login');
const { getClientURL } = require('./scripts/getClientUrl');
const { loadSites } = require('./scripts/loadSites');

(async () => {
  try {
    const clientListURL = process.env.CLIENT_LIST_URL;

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;

    await autoLogin(page, clientListURL, username, password);
    const clientURLs = await getClientURL(page);
    console.log('------ Client URLs ------');
    clientURLs.map((link) => console.log(link));
    console.log(`Total: ${clientURLs.length} links\n`);

    console.log('------ Start Loading Sites ------');
    const { failedLinks } = await loadSites(browser, clientURLs);
    console.log();
    console.log('------ Failed Links ------');
    failedLinks.map((link) => console.log(link));
    console.log('Finished');
    await browser.close();
  } catch (e) {
    console.error('error', e.message);
  }
})();
