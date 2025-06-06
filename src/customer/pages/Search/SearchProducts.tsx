import React, { useState } from 'react';
import { searchProduct } from '../../../Redux Toolkit/Customer/ProductSlice';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import ProductCard from '../Products/ProductCard/ProductCard';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  connectAutoComplete,
  Highlight
} from 'react-instantsearch-dom';
import { useNavHover } from '../../../context/NavHoverContext';

const searchClient = algoliasearch(
  'DPHBGJBH0E',
  '484d7f617c37135572bf35f5e0fa3f93'
);

const AutoComplete = connectAutoComplete(({ hits, currentRefinement, refine }) => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState(currentRefinement);
  const { isNavHovered } = useNavHover(); // 👈 get hover state from context

  const handleSelect = (name: string) => {
    setSearchQuery(name);
    dispatch(searchProduct(name));
  };

  return (
    <div className="flex justify-center py-5">
      <div className="relative w-full lg:w-1/2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            refine(e.target.value);
            setSearchQuery(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              dispatch(searchProduct(searchQuery));
            }
          }}
          className="border-none outline-none bg-slate-100 px-10 py-3 w-full pr-12"
          placeholder="Search Product..."
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => {
              refine('');
              setSearchQuery('');
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black text-xl"
          >
            &times;
          </button>
        )}
        {hits.length > 0 && !isNavHovered && (
          <ul className="absolute z-10 w-full bg-white border mt-1 max-h-60 overflow-y-auto shadow-md rounded">
            {hits.map((hit: any) => (
              <li
                key={hit.objectID}
                onClick={() => handleSelect(hit.name)}
                className="px-4 py-2 hover:bg-slate-100 cursor-pointer"
              >
                <Highlight attribute="name" hit={hit} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
});

const SearchProducts = () => {
  const { products } = useAppSelector(store => store);

  return (
    <div className="min-h-screen px-20">
      <InstantSearch indexName="Animation-1747662993924" searchClient={searchClient}>
        <AutoComplete />
      </InstantSearch>

      <section>
        {products.searchProduct?.length > 0 ? (
          <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-5 px-5 justify-center">
            {products.searchProduct.map((item: any, index: number) => (
              <div key={index * 9}>
                <ProductCard item={item} />
              </div>
            ))}
          </section>
        ) : (
          <div className="h-[70vh] flex flex-col justify-center items-center">
            <h1 className="font-bold text-6xl"></h1>
          </div>
        )}
      </section>
    </div>
  );
};

export default SearchProducts;
