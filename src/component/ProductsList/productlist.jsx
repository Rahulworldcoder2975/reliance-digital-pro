import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductList = () => {
  const { filter } = useParams();

  const [filterTerm, setFilterTerm] = useState(filter || "");
  const [filteredDataList, setFilteredDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const notify = (message) => toast.error(message);

  const fetchFilteredProducts = () => {
    if (!filter) {
      setFilteredDataList([]);
      return;
    }

    window.scrollTo(0, 0);
    setIsLoading(true);

    axios
      .get(
        `https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?search={"subCategory":"${filter}"}`,
        {
          headers: {
            projectID: "f104bi07c490",
          },
        }
      )
      .then((res) => {
        console.log(res.data.data);
        setFilterTerm(filter);
        setFilteredDataList(res.data.data);
      })
      .catch((err) => {
        console.error(err);
        notify(err.response?.data?.message || "An error occurred");
        setFilteredDataList([]);
      })
      .finally(() => {
        setTimeout(() => setIsLoading(false), 1000);
      });
  };

  useEffect(() => {
    fetchFilteredProducts();
  }, [filter]);

  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`);
  };
  return (
    <>
      <div style={{ color: "#000" }}>
        {filteredDataList.length > 0 && (
          <header
            style={{
              padding: "1%",
              borderBottom: "1px solid #3d3d3d6c",
            }}
          >
            <h2>{filterTerm.toUpperCase()}</h2>
            <p style={{ color: "#3d3d3d" }}>
              ({filteredDataList.length} products)
            </p>
          </header>
        )}

        {isLoading ? (
          <div>Loading...</div>
        ) : filteredDataList.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              padding: "0.5%",
              gap: "1%",
              backgroundColor: "#f5f7f7",
              paddingBottom: "2%",
            }}
          >
            {filteredDataList.map((data, i) => (
              <div
              key={data._id}
              onClick={() => handleCardClick(data._id)} // Handle click for navigation
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: "#fff",
                cursor: "pointer",
              }}
                >
                  <img
                    height="300"
                    width="300"
                    textAlign="end"
                    src={data.displayImage}
                    alt="Map Image"
                  />
                  <Tooltip title={data.name} arrow>
                    <Typography variant="body1" style={{ cursor: "pointer", textAlign: "center" }}>
                    {data.name.slice(0, 20)}...
                    </Typography>
                  </Tooltip>
                  <p style={{ textAlign: "center" }}>M.R.P: ₹{data.price}</p>
                  <button
                    style={{
                      borderRadius: "16px",
                      border: "1px solid #090",
                      padding: "5px 10px",
                      color: "#090",
                      display: "block",
                      margin: "0 auto",
                      textAlign: "center",
                    }}
                  >
                    OFFER AVAILABLE{data.offer}
                  </button>
                </div>
              
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h3>No Data To Display...</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductList;
