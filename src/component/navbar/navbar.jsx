import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Menu,
  MenuItem,
  Box,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  LocationOn as LocationOnIcon,
  ShoppingCart as ShoppingCartIcon,
  AccountCircle as AccountCircleIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import logo from "../login/Logo1.png";

const Navbar = ({ search, handleChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    navigate("/search");
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component={Link} to="/cart">
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Cart" />
        </ListItem>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button component={Link} to="/Myorder">
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="My Orders" />
        </ListItem>
        <ListItem button onClick={handleLogout}>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#E4252A" }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              letterSpacing: "1px",
              color: "white",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link to="/">
              <img
                src={logo}
                alt="YourLogo"
                style={{
                  height: isMobile ? "40px" : "55px",
                  width: "auto",
                  padding:"5px",
                  border: "none", // Removes any default border if present
                }}
              />
            </Link>
          </Typography>

          {/* Search Bar */}
          {!isMobile && (
            <InputBase
              placeholder="Find your favorite products"
              sx={{
                paddingLeft: "1rem",
                backgroundColor: "white",
                borderRadius: "13px",
                width: "300px",
                marginRight: "20px",
              }}
              value={search}
              onChange={handleChange}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          )}

          {/* Location */}
          {!isMobile && (
            <IconButton
              color="inherit"
              sx={{ marginRight: 1, fontSize: "15px" }}
            >
              
              <select style={{borderRadius:"10px"}}>
             
              <option value="volvo">Select your pin code</option>
              <option value="volvo">313001</option>
              <option value="volvo">313002</option>
              <option value="volvo">313003</option>
              <option value="volvo">313004</option>
              
              </select>
              <LocationOnIcon />
              
            </IconButton>
          )}

          {/* User Menu */}
          {!isMobile ? (
            localStorage.getItem("token") ? (
              <IconButton
                color="inherit"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                {localStorage.getItem("name")}
              </IconButton>
            ) : (
              <IconButton color="inherit">
                <Link to="/login">
                  <AccountCircleIcon />
                </Link>
              </IconButton>
            )
          ) : null}
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>

      {/* User Dropdown Menu */}
      <Menu
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{ style: { backgroundColor: "#003399", color: "white" } }}
      >
        <Link to="/cart" style={{ textDecoration: "none", color: "white" }}>
          <MenuItem onClick={handleClose}>My Cart</MenuItem>
        </Link>

        <Link
          to="/Wishlist"
          style={{ textDecoration: "none", color: "white" }}
        >
        <MenuItem onClick={handleClose}>My Wishlist</MenuItem> 
        </Link>

        <Link
          to="/dashboard"
          style={{ textDecoration: "none", color: "white" }}
        >
        <MenuItem onClick={handleClose}>View Profile</MenuItem>
        </Link>
        <Link to="/Myorder" style={{ textDecoration: "none", color: "white" }}>
          <MenuItem onClick={handleClose}>My Orders</MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default Navbar;

//responsive done
