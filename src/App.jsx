import React from "react";
import { Product } from "./components";
import {
  Stats,
  Hits,
  InstantSearch,
  SearchBox,
  ClearRefinements,
  RefinementList,
  Configure,
  Pagination,
} from "react-instantsearch";
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
          <Configure hitsPerPage={9} />
          <SearchBox className="search-box" about="Search for products" />

          <div className="results-container">
            <div className="sidebar">
              <ClearRefinements
                className="clear-filters"
                translations={{
                  resetButtonText: "Clear all",
                }}
                clearsQuery={true}
              />
              <div className="category">
                <h3>Brands</h3>
                <RefinementList
                  attribute="brand"
                  // show count of products for each brand
                  transformItems={(items) =>
                    items.map((item) => ({
                      ...item,
                      label: `${item.label} (${item.count})`,
                    }))
                  }
                  limit={5}
                  showMore={true}
                />
              </div>

              <div className="category">
                <h3>Price range</h3>
                <RefinementList
                  attribute="price_range"
                  transformItems={(items) =>
                    items.map((item) => ({
                      ...item,
                      label: `${item.label} (${item.count})`,
                    }))
                  }
                  limit={5}
                  showMore={true}
                />
              </div>

              <div className="category">
                <h3>Type</h3>
                <RefinementList
                  attribute="type"
                  transformItems={(items) =>
                    items.map((item) => ({
                      ...item,
                      label: `${item.label} (${item.count})`,
                    }))
                  }
                  limit={5}
                  showMore={true}
                />
              </div>
            </div>

            <div className="products-container">
              <Stats
                translations={(stats) =>
                  `${stats.nbHits} results found in ${stats.processingTimeMS}ms`
                }
              />
              <Hits hitComponent={Product} />
            </div>
          </div>
          <Pagination className="toolbar" totalPages={10} />
        </InstantSearch>
      </div>
    );
  }
}
