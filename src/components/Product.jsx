import PropTypes from "prop-types";
import { Highlight } from "react-instantsearch";

export const Product = ({ hit }) => {
  return (
    <div>
      <img alt={hit.name} src={hit.image} />
      <div className="title">
        <Highlight
          attribute={"name"}
          hit={hit}
          highlightedTagName={"mark"}
          nonHighlightedTagName={"span"}
        ></Highlight>
      </div>
      <div className="price">${hit.price}</div>
    </div>
  );
};

Product.propTypes = {
  hit: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};
