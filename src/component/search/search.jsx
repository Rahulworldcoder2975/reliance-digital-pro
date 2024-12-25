import { 
  Box, CardActionArea, CardContent, CardMedia, Grid, Card, Typography, Rating, 
  TextField, FormGroup, FormControlLabel, Button, Checkbox, Pagination 
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Search({ search }) {
  let [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProduct, setTotalProduct] = useState(0);
  const [minPrice, setMinPrice] = useState(30);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [categories, setCategories] = useState([
    "ac", "audio", "health", "kitchenappliances", "laptop", "mobile",
    "refrigerator", "tablet", "travel", "tv", "washingMachine"
  ]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(['tv']);
  let navigate = useNavigate();
  let productsPerPage = 20;

  useEffect(() => {
    const url = "https://academics.newtonschool.co/api/v1/ecommerce/electronics/products";
    const searchQuery = encodeURIComponent(JSON.stringify({ name: search }));
    const fil = encodeURIComponent(JSON.stringify({ subCategory: selectedCategories }));

    fetch(`${url}?search=${searchQuery}&&limit=${1000}&filter=${fil}`, {
      method: 'GET',
      headers: {
        projectID: "f104bi07c490"
      },
    })
      .then(response => response.json())
      .then((res) => {
        setTotalProduct(res?.data);
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        setProduct(res?.data?.slice(startIndex, endIndex));
      })
      .catch((err) => console.log("something went wrong", err));
  }, [search, currentPage, productsPerPage, selectedCategories]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    const startIndex = (value - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setProduct(totalProduct?.slice(startIndex, endIndex));
  };

  const applyFilter = (e) => {
    e.preventDefault();
    const filteredProducts = totalProduct?.filter(product =>
      product.price >= minPrice &&
      product.price <= maxPrice
    );
    console.log(filteredProducts, "filtered products", selectedCategories);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories(prevCategories =>
      prevCategories.includes(category)
        ? prevCategories.filter(c => c !== category)
        : [...prevCategories, category]
    );
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands(prevBrands =>
      prevBrands.includes(brand)
        ? prevBrands.filter(b => b !== brand)
        : [...prevBrands, brand]
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, padding: '20px', gap: 2 }}>
      {/* Sidebar */}
      <Box sx={{ flexBasis: { xs: '100%', md: '30%' }, borderRight: { md: '1px solid #ccc' }, padding: 2 }}>
        <Typography variant="h6" gutterBottom>Filters</Typography>
        
        {/* Price Range */}
        <Box mb={3}>
          <Typography variant="subtitle1">Price Range</Typography>
          <Box display="flex" gap={1}>
            <TextField
              label="Min Price"
              type="number"
              defaultValue={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <TextField
              label="Max Price"
              type="number"
              defaultValue={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </Box>
        </Box>

        {/* Categories */}
        <Box mb={3}>
          <Typography variant="subtitle1">Categories</Typography>
          <FormGroup>
            {categories.map((category, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                }
                label={category}
              />
            ))}
          </FormGroup>
        </Box>

        {/* Brands */}
        <Box mb={3}>
          <Typography variant="subtitle1">Brands</Typography>
          <FormGroup>
            {Array.from(new Set(product.map(p => p.brand))).map((brand, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                  />
                }
                label={brand}
              />
            ))}
          </FormGroup>
        </Box>

        <Button variant="contained" color="primary" onClick={applyFilter}>
          Apply Filters
        </Button>
      </Box>

      {/* Products Grid */}
      <Box sx={{ flexBasis: { xs: '100%', md: '70%' } }}>
        <Grid container spacing={3}>
          {product.map((prod) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={prod._id}>
              <Card onClick={() => navigate(`/product/${prod._id}`)} sx={{ maxWidth: 345, margin: 'auto' }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image={prod.displayImage}
                    alt={prod.name}
                  />
                  <CardContent>
                    <Typography variant="h6">{prod.name}</Typography>
                    <Typography variant="body2">Offer Price: ₹{prod.price}</Typography>
                    <Typography variant="body2">M.R.P: ₹{Math.max(prod.price * 1.2, 99999)}</Typography>
                    <Rating value={prod.ratings} readOnly />
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <Box mt={3} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(totalProduct?.length / productsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Box>
    </Box>
  );
}
//responsive done