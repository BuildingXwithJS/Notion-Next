import {
  databaseId,
  getDatabase,
  getPage,
} from '../components/notion/index.js';

export default function Home({ data }) {
  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export async function getServerSideProps(context) {
  const pages = await getDatabase({ id: databaseId });
  const pageInfo = await getPage({ id: pages[0].id });

  const data = { pages, pageInfo };

  return {
    props: { data }, // will be passed to the page component as props
  };
}
