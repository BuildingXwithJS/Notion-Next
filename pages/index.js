import React from 'react';
import { NotionRenderer } from 'react-notion-x';
import { getPage } from '../components/notion-unofficial/index.js';

export default ({ recordMap }) => (
  <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={false} />
);

export async function getServerSideProps(context) {
  const recordMap = await getPage('40e1a7245ee44a2d8da9809851aae7cb');

  return {
    props: { recordMap }, // will be passed to the page component as props
  };
}
