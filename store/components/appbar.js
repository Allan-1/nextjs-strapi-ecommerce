import React, { useContext } from 'react';
import Link from 'next/link';
import styles from '../styles/appbar.module.css';
import { FaSistrix, FaShoppingCart, FaRegHeart, FaUser } from 'react-icons/fa';
import { Container, Navbar, NavbarBrand } from 'reactstrap';
import Head from 'next/head';
import { CartContext } from '../context/CartContext';

export default function AppBar(props) {
  const { cart } = useContext(CartContext);
  return (
    <div>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar className={styles.navbar} color="light" light expand="md">
        <NavbarBrand href="/">AmuTech</NavbarBrand>
        <div className={styles.search}>
          <input placeholder="Search for a product ..." />
          <button>
            <FaSistrix />
          </button>
        </div>
        <div className={styles.navbarright}>
          <div className={styles.wishlist}>
            <FaRegHeart />
          </div>
          <Link href="/cart">
            <div className={styles.carticon}>
              <div className={styles.length}>{cart.length}</div>
              <FaShoppingCart />
            </div>
          </Link>
          <div className={styles.usericon}>
            <FaUser />
          </div>
        </div>
      </Navbar>
      <Container>{props.children}</Container>
    </div>
  );
}
