import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardActionArea, List, CardMedia, CardContent, Typography, Grid, Rating, Button, Box, Slider, TextField, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Footer from '../navbar/Footer';

const ProductDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [review, setReview] = useState();
  const [rating, setRating] = useState([]);
  const [isInWishlist, setIsInWishlist] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://academics.newtonschool.co/api/v1/ecommerce/product/${id}`, {
          headers: {
            projectID: "f104bi07c490"
          }
        });
        setData(response?.data?.data);
        let res = await axios.get(`https://academics.newtonschool.co/api/v1/ecommerce/review/${id}`, {
          headers: {
            projectID: "f104bi07c490"
          }
        });
        setReview(res?.data?.data);
      } catch (error) {
        console.error("Something went wrong", error);
      }
    };
    if (!data || !review) {
      fetchData();
    }
    if (review) {
      let v1 = 0, v2 = 0, v3 = 0, v4 = 0, v5 = 0;
      for (let val of review) {
        if (val.ratings === 1) v1++;
        else if (val.ratings === 2) v2++;
        else if (val.ratings === 3) v3++;
        else if (val.ratings === 4) v4++;
        if (val.ratings === 5 || val.ratings === 4) v5++;
      }
      setRating([v5, v4, v3, v2, v1]);
    }
  }, [data, id]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.images.length) % data.images.length);
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  const jwtToken = localStorage.getItem("token");

  const handleAddToCart = async (prod) => {
    try {
      const response = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/cart/${prod._id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'projectID': "zieod0ew1cmn",
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity: 1,
        }),
      });

      if (response.ok) {
        alert('Item added to the cart successfully');
      } else {
        alert('Failed to add item to the cart');
      }
    } catch (error) {
      console.error('Error adding item to the cart:', error);
    }
  };

 
  //handle wishlist



  const handleWishList = async (prod) => {
     setIsInWishlist(!isInWishlist);
    console.log(prod._id)
    try {
      const response = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/wishlist`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'projectID': "zieod0ew1cmn",
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: prod._id,
        }),
      });

      if (response.ok) {
        alert('Item added to the cart successfully');
       
      } else {
        alert('Items not added || Already in Cart');
      }
    } catch (error) {
      console.error('Error adding item to the cart:', error);
    }
  };
  

  const handleBuyNow = (productId,price,displayImage,name) => {
    navigate('/payment');
   console.log(id)
    // navigate(`/payment/${id}`);
    navigate("/payment", { state: { productId,price,displayImage,name } });
  };


  const handleToggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
    handleWishList()
  };

  return (
    <div style={{ padding: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="500"
                width="200"
                image={data?.images[currentIndex]}
                alt={data?.name}
                style={{ objectFit: 'cover', width: '100%' }}
              />
            </CardActionArea>
            {data && data?.images?.length > 1 && (
              <Box display="flex" justifyContent="space-between" padding={2}>
                <Button variant="contained" onClick={handlePrev} disabled={currentIndex === 0}>
                  Previous
                </Button>
                <Slider
                  value={currentIndex}
                  max={data.images.length - 1}
                  onChange={(event, newValue) => setCurrentIndex(newValue)}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(index) => (
                    <img
                      src={data.images[index]}
                      alt={`${data.name} - Thumbnail ${index + 1}`}
                      style={{ width: '50px', height: 'auto', cursor: 'pointer' }}
                      onClick={() => handleThumbnailClick(index)}
                    />
                  )}
                />
                <Button variant="contained" onClick={handleNext} disabled={currentIndex === data.images.length - 1}>
                  Next
                </Button>
              </Box>
            )}
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h3" color="textPrimary" gutterBottom>
                <strong>{data?.name}</strong>
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {/* Description */}
              </Typography>

              <Box mt={2}>
                <Typography variant="h6" color="textPrimary" fontWeight="600">
                  Key Features
                </Typography>
                <ul>
                  {data?.features && data.features.slice(0, 5).map((feature, index) => (
                    <li key={index}>
                      <Typography variant="body2" color="textSecondary">
                        {feature}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Box>
              <Box mt={2}>
                <Typography variant="h6" color="textPrimary" fontWeight="600">
                  Warranty
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  1 year manufacturer warranty
                </Typography>
              </Box>
              <Box mt={2}>
                <Typography variant="h6" color="textPrimary" fontWeight="600">
                  Return Policy
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  For return eligibility, <a href="#">Read T&C</a>.
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  All accessories, products, and packaging need to be returned in original condition.
                </Typography>
              </Box>
              <Typography variant="h5" color="primary" marginTop="8px">
                MRP: ₹{data?.price}
              </Typography>

              <Rating name="product-rating" value={data?.ratings} precision={0.1} readOnly />
              <Box mt={2}>
                <Button variant="contained" color="primary" onClick={() => handleAddToCart(data)}>
                  Add to Cart
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleBuyNow(data)} style={{ marginLeft: '10px' }}>
                  Buy Now
                </Button>
                <Button
                  variant="outlined"
                  onClick={()=>handleWishList(data)}
                  style={{
                    marginLeft: '10px',
                    background: 'transparent',
                    color: isInWishlist ? 'red' : '#bfa8a6',
                  }}
                >
                  <FavoriteIcon />
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Footer/>
      </Grid>
      
    </div>
  );
};

export default ProductDetail;
//responsive done
//page url is http://localhost:3000/product/651171e176b25d3ee0288589