const notionToken = process.env.NOTION_TOKEN;

export const databaseId = '0aed6a6a-d490-4ae1-8215-bd20aeed2e77';

const sendRequest = ({ url, body }) =>
  fetch(url, {
    method: body ? 'POST' : 'GET',
    headers: {
      Authorization: `Bearer ${notionToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((r) => r.json());

export const getDatabases = async () => {
  const database = await sendRequest({
    url: 'https://api.notion.com/v1/databases',
  });
  return database;
};

export const getDatabase = async ({ id }) => {
  const body = {};

  const databaseInfo = await sendRequest({
    url: `https://api.notion.com/v1/databases/${id}/query`,
    body,
  });

  const pages = databaseInfo.results.map((row) => {
    const pageId = row.id;
    const pageName = row.properties.Page.title?.[0].plain_text;
    const tags = row.properties.Tags.multi_select.map((item) => ({
      id: item.id,
      name: item.name,
    }));

    return { id: pageId, title: pageName, tags };
  });

  return pages;
};

export const getPage = async ({ id }) => {
  const pageInfo = await sendRequest({
    url: `https://api.notion.com/v1/blocks/${id}/children`,
  });

  return pageInfo;
};
