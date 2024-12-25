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

const Wishlist = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem('token');

  // Fetch orders
  const fetchOrders = () => {
    axios
      .get('https://academics.newtonschool.co/api/v1/ecommerce/wishlist', {
        headers: {
          projectID: 'zieod0ew1cmn',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res.data.data || {}; // Ensure data is an object
        const items = data.items || []; // Extract items array
        const products = items.map(item => item.products); // Map through the items to get products
        setCartItems(products); // Set the products array to state
        console.log(products); // Log the products array
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Remove single item
  const removeItem = (prodId) => {
    axios
      .delete(
        `https://academics.newtonschool.co/api/v1/ecommerce/wishlist/${prodId}`,
        {
          headers: {
            projectID: "zieod0ew1cmn",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => fetchOrders())
      .catch((err) => console.error(err));
  };

  // Remove all item
  const removeallItem = () => {
    axios
      .delete(
        `https://academics.newtonschool.co/api/v1/ecommerce/wishlist`,
        {
          headers: {
            projectID: "zieod0ew1cmn",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => fetchOrders())
      .catch((err) => console.error(err));
  };

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
          Your Wishlist
        </Typography>
        <Button
                sx={{ mb: 2, bgcolor: "pink", color: "red" }}
                fullWidth={isMobile}
                onClick={removeallItem}
              >
                Remove All
              </Button>

        <List>
          {Array.isArray(cartItems) && cartItems.length > 0 ? (
            cartItems.map((product, index) => (
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
                  src={product ?.displayImage}
                  alt={product ?.name}
                  style={{
                    width: isMobile ? '80px' : '100px',
                    height: isMobile ? '80px' : '100px',
                    marginBottom: isMobile ? '8px' : '0px',
                    marginRight: isMobile ? '0px' : '16px',
                    borderRadius: '4px',
                  }}
                />
                <ListItemText
                  primary={product ?.name}
                  secondary={`₹${product ?.price}`}
                  primaryTypographyProps={{ variant: isMobile ? 'body1' : 'h6' }}
                  secondaryTypographyProps={{
                    variant: isMobile ? 'body2' : 'subtitle1',
                  }}
                  style={{ textAlign: isMobile ? 'center' : 'left' }}
                />
                <Button
                                variant="outlined"
                                color="secondary"
                                size="small"
                                
                                onClick={() => removeItem(product._id)}
                                sx={{ marginRight: isMobile ? "0" : "16px",
                                  backgroundColor:"red",color:"black",
                                  
                                  mt: isMobile ? 2 : 0 }}
                              >
                                Remove   
                              </Button>
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
                No products found in your Wishlist.
              </Typography>
            </div>
          )}
        </List>
      </Container>
    </>
  );
};

export default Wishlist;
