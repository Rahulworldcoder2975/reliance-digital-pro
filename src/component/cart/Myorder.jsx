import React, { useEffect, useState } from 'react';
import noproduct from '../noproduct.png';
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Container,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import axios from 'axios';
import Navbar from '../navbar/navbar';

const Myorder = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem('token');

  // Fetch orders
  const fetchOrders = () => {
    axios
      .get('https://academics.newtonschool.co/api/v1/ecommerce/order/', {
        headers: {
          projectID: 'zieod0ew1cmn',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const orders = res.data.data || [];
        const items = orders.flatMap((order) => order.order.items || []);
        setCartItems(items);
        console.log(items);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />
      <Container
        style={{
          padding: isMobile ? '8px' : '16px',
          marginTop: '16px',
          border: `1px solid ${theme.palette.grey[300]}`,
          borderRadius: '8px',
        }}
      >
        <Typography
          variant={isMobile ? 'h5' : 'h4'}
          align="center"
          gutterBottom
          style={{ color: theme.palette.primary.main }}
        >
          Your Orders
        </Typography>

        <List>
          {Array.isArray(cartItems) && cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <ListItem
                key={index}
                style={{
                  marginBottom: '16px',
                  background: theme.palette.background.paper,
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  alignItems: isMobile ? 'center' : 'flex-start',
                }}
              >
                <img
                  src={item.product.displayImage}
                  alt={item.product.name}
                  style={{
                    width: isMobile ? '80px' : '100px',
                    height: isMobile ? '80px' : '100px',
                    marginBottom: isMobile ? '8px' : '0px',
                    marginRight: isMobile ? '0px' : '16px',
                    borderRadius: '4px',
                  }}
                />
                <ListItemText
                  primary={item.product.name}
                  secondary={`₹${item.product.price}`}
                  primaryTypographyProps={{ variant: isMobile ? 'body1' : 'h6' }}
                  secondaryTypographyProps={{
                    variant: isMobile ? 'body2' : 'subtitle1',
                  }}
                  style={{ textAlign: isMobile ? 'center' : 'left' }}
                />
              </ListItem>
            ))
          ) : (
            <div style={{ textAlign: 'center' }}>
              <img
                width={isMobile ? 200 : 300}
                src={noproduct}
                alt="No Products Found"
              />
              <Typography
                variant={isMobile ? 'body1' : 'h6'}
                color="textSecondary"
              >
                No products found in your orders.
              </Typography>
            </div>
          )}
        </List>
      </Container>
    </>
  );
};

export default Myorder;
//responsive done