import { useContext } from 'react';
import { request } from 'graphql-request';
import { MdAddShoppingCart } from 'react-icons/md';

import { productId, getItems } from '../../graphql/queries';
import styles from '../../styles/item.module.css';
import { CartContext, ACTIONS } from '../../context/CartContext';

export default function ProductDescription({ product }) {
  const { dispatch } = useContext(CartContext);

  return (
    <div className={styles.item}>
      <div className={styles.image}>
        <img
          className={styles.img}
          src={`http://localhost:1337${product.products.data[0].attributes.productimage.data[0].attributes.url}`}
        ></img>
      </div>
      <div className={styles.texts}>
        <h2>{product.products.data[0].attributes.Title}</h2>
        <h5>{product.products.data[0].attributes.price}</h5>
        <p>{product.products.data[0].attributes.Description}</p>

        <div>
          <button
            className={styles.button}
            onClick={() =>
              dispatch({
                type: ACTIONS.ADDITEM,
                payload: { product: product.products.data[0] },
              })
            }
          >
            Add to Cart <MdAddShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const product = await request('http://localhost:1337/graphql/', productId);
  const paths = product.products.data.map((prod) => {
    return {
      params: { productsid: String(prod.id) },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const product = await request(
    'http://localhost:1337/graphql/',
    getItems(params.productsid)
  );
  return {
    props: {
      product,
    },
  };
}
