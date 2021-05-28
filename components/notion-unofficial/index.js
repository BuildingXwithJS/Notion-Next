import { NotionAPI } from 'notion-client';

export async function getPage(id) {
  const notion = new NotionAPI();

  const recordMap = await notion.getPage(id);

  return recordMap;
}
