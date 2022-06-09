import { useQuery } from '@apollo/client';
import { productquery } from '../graphql/queries';
import Link from 'next/link';
import { Card, CardTitle, CardBody, CardSubtitle, Spinner } from 'reactstrap';
import styles from '../styles/product.module.css';

export default function Product() {
  const { loading, error, data } = useQuery(productquery);

  if (loading) return <Spinner>Loading...</Spinner>;
  if (error) return <p>error: {error.message}</p>;

  return (
    <div className={styles.grid}>
      {data.products.data.map((product) => (
        <Link key={product.id} href={`product/${product.id}`}>
          <Card className={styles.card}>
            <CardBody>
              <img
                className={styles.image}
                src={`http://localhost:1337${product.attributes.productimage.data[0].attributes.url}`}
              ></img>
              <CardTitle className={styles.title} tag="p">
                {product.attributes.Title}
              </CardTitle>
              <CardSubtitle tag="p">{product.attributes.price}</CardSubtitle>
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  );
}
