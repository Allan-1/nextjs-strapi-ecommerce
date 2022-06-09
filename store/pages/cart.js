import { useContext } from 'react';
import { Button, Card, CardBody, CardTitle, Badge } from 'reactstrap';
import { CartContext } from '../context/CartContext';
import styles from '../styles/cart.module.css';

export default function Cart() {
  const { cart } = useContext(CartContext);

  return cart.length == 0 ? (
    <div className={styles.empty}>Oops!!! Your cart is empty</div>
  ) : (
    <div>
      {cart.map((item) => (
        <Card key={item.id}>
          <CardBody>
            <div className={styles.itemflex}>
              <div>
                <h4>{item.title}</h4>
              </div>
              <div>
                <h5>{item.price}</h5>
                <p>Quantity: {item.amount}</p>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
