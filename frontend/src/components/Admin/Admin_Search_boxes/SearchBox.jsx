import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Product from "../../Home/Product";
import SearchBarAd from "../Admin_Search_features/SearchBarAd";
import "./bigSearchBox.css";

const SearchBox = () => {
  const { user } = useSelector((state) => state.user);
  let { modes } = useSelector((state) => state.DarkMode);
  const { products } = useSelector((state) => state.products);

  const [arrayList, setarrayList] = useState("");
  const [ex_products, setex_products] = useState("");
  
  useEffect(() => {
    check_user_add_user();
  }, [user]);

  function check_user_add_user() {
    let List = ["All", "name", "id", "category", "price"];
    if (user?.role === "admin_one") {
      List.push("user");
      setarrayList(List);
    } else {
      setarrayList(List);
    }
  }

  useEffect(() => {
    var root = document.querySelector(":root");
    if (modes) {
      root.style.setProperty("--customColorcon", "#212429");
      root.style.setProperty("--customColorcon_two", "black");
      root.style.setProperty("--customColorcon_font", "white");
      root.style.setProperty("--customColorcon_boxshd", "rgba(166,155,155,0)");
    } else {
      root.style.setProperty("--customColorcon", "rgba(196, 215, 224, 0.31)");
      root.style.setProperty("--customColorcon_two", "white");
      root.style.setProperty("--customColorcon_font", "#212429");
      root.style.setProperty(
        "--customColorcon_boxshd",
        "rgba(166,155,155,0.55)"
      );
    }
  }, [modes]);

  // function to get the products according to the value of the drop down

  //   console.log(ex_products)
  return (
    <>
      <div className="bigsearchBox">
        <SearchBarAd
          list={arrayList}
          items={products}
          setex_products={setex_products}
          user={user}
          title ={"Products"}
        />
        <div className="inConBox1_1_1 evheadBox">
              <h4>Products : <span className="coloror">{ex_products.length}</span></h4>
            </div>
        <div className="produtsRenderer">
          {ex_products &&
            ex_products.length > 0 &&
            ex_products
              .map((product) => (
                <Product key={Math.random() * 1000} product={product} />
              ))
              .reverse()}
        </div>
      </div>
    </>
  );
};

export default SearchBox;
