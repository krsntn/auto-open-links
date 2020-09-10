async function getClientURL(page, url) {
  await page.waitFor('table');
  let links = await page.$$eval('td a.external-link', (links) => {
    const clientLinks = [];
    for (const link of links) {
      clientLinks.push(link.href);
    }
    return [...new Set(clientLinks)];
  });

  return await page.$$eval(
    'td s a.external-link',
    (strikedLinks, links) => {
      console.log(strikedLinks);
      for (const link of strikedLinks) {
        links = links.filter((x) => x !== link.href);
      }
      return links;
    },
    links
  );
}

module.exports.getClientURL = getClientURL;
