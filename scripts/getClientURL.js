async function getClientURL(page, url) {
  await page.waitFor('table');
  const links = await page.$$eval(`table a.external-link`, (links) => {
    const clientLinks = [];
    for (const link of links) {
      clientLinks.push(link.href);
    }
    return [...new Set(clientLinks)];
  });

  return await page.$$eval(
    'table s a.external-link',
    (strikedLinks, links) => {
      for (const link of strikedLinks) {
        links = links.filter((x) => x !== link.href);
      }
      return links;
    },
    links
  );
}

module.exports.getClientURL = getClientURL;
