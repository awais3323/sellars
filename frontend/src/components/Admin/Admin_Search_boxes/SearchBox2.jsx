import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSellerUsersDates } from "../../../actions/userAction";
import UserCard from "../../User/UserCard";
import SearchBarAd from "../Admin_Search_features/SearchBarAd";
import "./bigSearchBox.css";

const SearchBox2 = () => {

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user);
  let { modes } = useSelector((state) => state.DarkMode);
  let {sellusers } = useSelector((state) => state.sellUserDates);


  const [arrayList, setarrayList] = useState("");
  const [ex_products, setex_products] = useState("");
  
  useEffect(() => {
    check_user_add_user();
  }, [user]);


  useEffect(() => {
    dispatch(getSellerUsersDates())
    }, [dispatch])

  function check_user_add_user() {
    let List = ["All", "name", "id", "role", "email"];
      setarrayList(List);
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
          items={sellusers}
          setex_products={setex_products}
          title = {"Users"}
        //   user={user}
        />
        <div className="produtsRenderer">
          {ex_products &&
            ex_products.length > 0 &&
            ex_products
              .map((product) => (
                <UserCard key={Math.random() * 1000} user={product} />
              ))
              .reverse()}
        </div>
      </div>
    </>
  );
};

export default SearchBox2;
