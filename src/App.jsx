import React from "react";
import { Product } from "./components";
import { Hits, InstantSearch, SearchBox } from "react-instantsearch";
import algoliasearch from "algoliasearch/lite";

const ALGOLIA_INDEX = import.meta.env.VITE_ALGOLIA_INDEX;
const ALGOLIA_API_SEARCH_KEY = import.meta.env.VITE_ALGOLIA_API_SEARCH_KEY;
const ALOGLIA_APP_ID = import.meta.env.VITE_ALOGLIA_APP_ID;

const searchClient = algoliasearch(ALOGLIA_APP_ID, ALGOLIA_API_SEARCH_KEY);

export default class App extends React.Component {
  render() {
    return (
      <div className="container">
        <InstantSearch indexName={ALGOLIA_INDEX} searchClient={searchClient}>
          <SearchBox className="search-box" about="Search for products" />
          <div className="products-container">
            <Hits hitComponent={Product} />
          </div>
        </InstantSearch>
      </div>
    );
  }
}
