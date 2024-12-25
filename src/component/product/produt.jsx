import React, { useEffect, useState } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  Button,
  Rating,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Product = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    axios({
      url: 'https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?limit=102',
      method: 'GET',
      headers: {
        projectID: 'f104bi07c490',
      },
    })
      .then((res) => setProduct(res?.data?.data))
      .catch((err) => console.log('Something went wrong', err));
  }, []);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div style={{ margin: '30px' }}>
      <Typography variant={isMobile ? 'h5' : 'h4'} gutterBottom>
        Lowest price for today{' '}
        <Button variant="contained" color="primary">
          View All
        </Button>
      </Typography>
      <Grid container spacing={3} marginTop={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card
            sx={{
              width: '100%',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                image="https://www.shutterstock.com/image-vector/best-price-sale-grunge-rubber-600nw-2262495703.jpg"
                alt="Best Price"
                style={{ objectFit: 'cover', width: '100%', height: '200px' }}
              />
            </CardActionArea>
          </Card>
        </Grid>
        {product.map((item) => (
          <Grid
            item
            key={item._id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            onClick={() => handleProductClick(item._id)}
          >
            <Card
              sx={{
                width: '100%',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={item.displayImage}
                  alt={item.name}
                  style={{ objectFit: 'cover', width: '100%', height: '200px' }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Offer Price: <b>₹{item.price}</b>
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    M.R.P: ₹
                    {parseInt(Math.random() * 999999) > item.price
                      ? parseInt(Math.random() * 999999)
                      : (item.price * 1.2).toFixed(2)}
                  </Typography>
                  <Rating name="ratings" value={item.ratings} readOnly />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Product;
//responsive done