import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Ensure you have this import for toast notifications

const Menu = () => {
  const navigate = useNavigate();
  const notify = () => toast.info("Dropdown feature is under construction!", { autoClose: 2000 });

  const onClickOfNavList = (e) => {
    if (!e.target.innerText) {
      notify();
      return;
    }
    navigate(`products/${e.target.id}`);
  };

  const arrayOfListItems = [
    { term: "TABLETS", category: "tablet" },
    { term: "TELEVISIONS", category: "tv" },
    { term: "AUDIO", category: "audio" },
    { term: "HOME APPLIANCES", category: "appliances" },
    { term: "COMPUTERS", category: "laptop" },
    { term: "MOBILES", category: "mobile" },
    { term: "KITCHEN APPLIANCES", category: "kitchenappliances" },
    { term: "PERSONAL CARE", category: "health" },
    { term: "ACCESSORIES", category: "travel" }
  ];

  return (
    <div style={{ backgroundColor: "#003380" }}>
      <ul style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        listStyle: "none",
        padding: 0,
        margin: 0
      }}>
        {arrayOfListItems.map(({ term, category }, i) => (
          <li
            key={i}
            onClick={onClickOfNavList}
            id={category}
            style={{
              fontSize: "12px",
              fontWeight: "600",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "0.75rem",
              transition: "0.25s",
              cursor: "pointer",
              color:"white"
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#e4252a"}
            onMouseLeave={(e) => e.target.style.backgroundColor = ""}
          >
            {term}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
