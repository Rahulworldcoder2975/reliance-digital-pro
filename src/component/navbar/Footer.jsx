import { Block } from '@mui/icons-material';
import React from 'react';

const Footer = () => {
  return (
    <>
      <div style={{ backgroundColor: "#003380", color: "white", width: "100%" }}>
        <div style={{
          backgroundColor: "#003380",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          color: "white",
          justifyContent: "space-around",
          padding: "20px 10px"
        }}>
          <ul style={{ paddingRight: "30px", margin: "10px", flex: "1 1 200px" }}>
            <h3 style={{ fontSize: "18px" }}>PRODUCT CATEGORIES</h3>
            <li>Smartphones</li>
            <li>Laptops</li>
            <li>DSLR Cameras</li>
            <li>Televisions</li>
            <li>Air Conditioners</li>
            <li>Refrigerators</li>
            <li>Kitchen Appliances</li>
            <li>Accessories</li>
            <li>Personal Care & Grooming</li>
          </ul>
          <ul style={{ paddingRight: "30px", margin: "10px", flex: "1 1 200px" }}>
            <h3 style={{ fontSize: "18px" }}>SITE INFO</h3>
            <li>About Reliance Digital</li>
            <li>resQ Services</li>
            <li>Site Map</li>
            <li>Gift Cards</li>
            <li>Corporate Enquiries</li>
            <li>Contact Us</li>
          </ul>
          <ul style={{ paddingRight: "30px", margin: "10px", flex: "1 1 200px" }}>
            <h3 style={{ fontSize: "18px" }}>RESOURCE CENTRE</h3>
            <li>Product Reviews</li>
            <li>Buying Guides</li>
            <li>How Tos</li>
            <li>Featured Stories</li>
            <li>Events & Happenings</li>
            <li>Nearest Store</li>
          </ul>
          <ul style={{ margin: "10px", flex: "1 1 200px" }}>
            <h3 style={{ fontSize: "18px" }}>POLICIES</h3>
            <li>Terms of Use</li>
            <li>FAQs</li>
            <li>Cancellation and Return Policy</li>
            <li>Pricing and Payments Policy</li>
            <li>Shipping and Delivery Policy</li>
            <li>Privacy Policy</li>
            <li>E-waste Recycling Policy</li>
            <li>EMI and Additional Cashback T&C</li>
            <li>RelianceOne Loyalty Program T&C</li>
            <li>Caution Notice</li>
          </ul>
        </div>

        <div style={{
          backgroundColor: "#003380",
          color: "white",
          textAlign: "center",
          padding: "10px"
        }}>
          <section style={{ marginBottom: "20px" }}>
            <h3>FOLLOW US</h3>
            <a style={{ paddingRight: "15px", padding: "10px" }} href="https://www.facebook.com/reliancedigital/">
              <svg aria-hidden="true" width="20" color='white' focusable="false" data-prefix="fab" data-icon="square-facebook" class="svg-inline--fa fa-square-facebook " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path fill="currentColor" d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"></path>
              </svg>
            </a>
            <a style={{ paddingRight: "10px" }} href="https://twitter.com/reliancedigital">
              <svg aria-hidden="true" focusable="false" color='white' width="20" data-prefix="fab" data-icon="twitter" class="svg-inline--fa fa-twitter " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
              </svg>
            </a>
            <a style={{ paddingRight: "10px" }} href="https://www.youtube.com/reliancedigital">
              <svg aria-hidden="true" focusable="false" color='white' width="20" data-prefix="fab" data-icon="youtube" class="svg-inline--fa fa-youtube " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path fill="currentColor" d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path>
              </svg>
            </a>
          </section>
          <section style={{ backgroundColor: "#003380", color: "white", textAlign: "center", padding: "10px" }}>
            <h3>EXPERIENCE RELIANCE DIGITAL APP ON MOBILE</h3>
          </section>
          <div>
            <h3 style={{
              maxWidth: "fit-content",
              marginLeft: "auto",
              marginRight: "auto", fontStyle: "underline"
            }}>Disclaimer</h3>
            <p>Product prices, offers and availability are subject to change from time to time. All prices are inclusive of taxes. Product colours & images are only for illustration and they may not exactly match with the actual product. Product specs are subject to change & may vary from actual product. While every care is taken to avoid inaccuracies in content, these are provided as is, without warranty of any kind.</p>
            <hr />
          </div>
          <h4 style={{
            maxWidth: "fit-content",
            marginLeft: "auto",
            marginRight: "auto"
          }}>© 2024 Reliance Digital. All Rights Reserved.</h4>
        </div>
      </div>
    </>
  );
};

export default Footer;
