import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight
} from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  'DPHBGJBH0E',           // Replace with your actual App ID
  '484d7f617c37135572bf35f5e0fa3f93' // Replace with your actual Search-Only API key
);

const Hit = ({ hit }: any) => (
  <div className="px-4 py-2 hover:bg-slate-100 cursor-pointer border-b">
    <Highlight attribute="name" hit={hit} />
  </div>
);

const ProductSearch = () => {
  return (
    <div className="max-w-xl mx-auto mt-10">
      <InstantSearch searchClient={searchClient} indexName="your_index_name">
        <SearchBox
          className="w-full"
          translations={{ placeholder: 'Search for products...' }}
        />
        <div className="bg-white shadow rounded mt-2">
          <Hits hitComponent={Hit} />
        </div>
      </InstantSearch>
    </div>
  );
};

export default ProductSearch;
