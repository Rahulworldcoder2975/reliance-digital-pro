import React, { useEffect, useState } from "react";
import noproduct from "../noproduct.png";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Container,
  TextField,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { id } = useParams();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  // Fetch cart products
  const showAddtoCartProducts = () => {
    axios
      .get("https://academics.newtonschool.co/api/v1/ecommerce/cart", {
        headers: {
          projectID: "zieod0ew1cmn",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res.data.data;
        const itemsArray = data?.items || [];
        setCartItems(itemsArray);
        console.log(data)
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if(!token){
      navigate("/login")
    }else{
      showAddtoCartProducts();
    }
    
  }, [token,navigate]);

  // Remove all items
  const removeAllitems = () => {
    axios
      .delete("https://academics.newtonschool.co/api/v1/ecommerce/cart", {
        headers: {
          projectID: "zieod0ew1cmn",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        alert("All Items deleted successfully");
        showAddtoCartProducts();
      })
      .catch((err) => console.error(err));
  };

  // Remove single item
  const removeItem = (prodId) => {
    axios
      .delete(
        `https://academics.newtonschool.co/api/v1/ecommerce/cart/${prodId}`,
        {
          headers: {
            projectID: "zieod0ew1cmn",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => showAddtoCartProducts())
      .catch((err) => console.error(err));
  };

  const calculateTotalAmount = () => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.product.price,
      0
    );
    return subtotal.toFixed(2);
  };

  const handleApplyCoupon = () => {
    setAppliedCoupon(couponCode);
  };

  const handleBuyNow = (productId,price,displayImage,name) => {
    // Remove the item from the cart immediately after buying
    removeItem(productId);
    navigate("/payment", { state: { productId,price,displayImage,name } });;
  };

  return (
    <Container sx={{ mt: 4, p: 2, border: 1, borderColor: "grey.300" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Your Cart
      </Typography>
      <Button
        sx={{ mb: 2, bgcolor: "pink", color: "red" }}
        fullWidth={isMobile}
        onClick={removeAllitems}
      >
        Remove All Items
      </Button>
      <List>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <ListItem
              key={item.id}
              sx={{
                mb: 2,
                backgroundColor: "background.paper",
                boxShadow: 1,
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: "center",
                justifyContent: "space-between",  // Add space between elements
              }}
            >
              <img
                src={item.product.displayImage}
                alt={item.product.name}
                style={{
                  width: isMobile ? "80px" : "100px",
                  height: "auto",
                  marginRight: isMobile ? "0" : "16px",
                  borderRadius: "4px",
                }}
              />
              <ListItemText
                primary={item.product.name}
                secondary={`₹${item.product.price}`}
                primaryTypographyProps={{
                  variant: isMobile ? "body1" : "h7",
                }}
                secondaryTypographyProps={{
                  variant: isMobile ? "body2" : "subtitle1",
                }}
                sx={{
                  textAlign: isMobile ? "center" : "left",
                  mt: isMobile ? 1 : 0,
                  mb: isMobile ? 1 : 0, // Add margin bottom for better spacing on mobile
                }}
              />
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                
                onClick={() => removeItem(item.product._id)}
                sx={{ marginRight: isMobile ? "0" : "16px",
                  backgroundColor:"red",color:"black",
                  
                  mt: isMobile ? 2 : 0 }}
              >
                Remove   
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                onClick={() => handleBuyNow(item.product._id,item.product.price,item.product.displayImage,item.product.name,)}
                sx={{ mt: isMobile ? 2 : 0 ,backgroundColor:"green",color:"black"}}
              >
                Buy Me
              </Button>
            </ListItem>
          ))
        ) : (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <img src={noproduct} alt="No Product" width="200" />
            <Typography>No Products Found</Typography>
          </div>
        )}
      </List>
      <Divider />
      {/* <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Coupon Code"
            variant="outlined"
            fullWidth
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleApplyCoupon}
            disabled={!couponCode}
          >
            Apply Coupon
          </Button>
        </Grid>
        {appliedCoupon && (
          <Grid item xs={12}>
            <Typography color="success.main" align="center">
              Coupon Applied: {appliedCoupon}
            </Typography>
          </Grid>
        )}
      </Grid> */}
      <Divider sx={{ my: 2 }} />
      <Typography align={isMobile ? "center" : "right"}>
        Subtotal: ₹{calculateTotalAmount()}
      </Typography>
      {/* <Button
        variant="contained"
        color="primary"
        fullWidth={isMobile}
        sx={{ mt: 2 }}
      >
        <Link to="/payment" style={{ color: "inherit", textDecoration: "none" }}>
          Checkout
        </Link>
      </Button> */}
    </Container>
  );
};

export default Cart;

//resposive done
