async function loadSites(browser, clientURLs) {
  const totalLinks = clientURLs.length;
  let loadedLinks = 0;
  const failedLinks = [];

  await Promise.all(
    clientURLs.map(async (url) => {
      const newPage = await browser.newPage();
      try {
        await newPage.goto(url, { waitUntil: 'load', timeout: 60000 });
      } catch (err) {
        console.error(
          `${++loadedLinks}/${totalLinks} Error: ${url}`,
          err.message
        );
        failedLinks.push(url);
        return await newPage.close();
      }

      try {
        await newPage.waitFor('img', { waitUntil: 'load', timeout: 60000 });
      } catch (err) {
        console.log(
          `${++loadedLinks}/${totalLinks} Error: ${url}`,
          err.message
        );
        failedLinks.push(url);
        return await newPage.close();
      }

      console.log(`${++loadedLinks}/${totalLinks} Loaded: `, url);
      await newPage.close();
    })
  );

  return { failedLinks };
}

module.exports.loadSites = loadSites;
