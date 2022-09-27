import React, { useState, useEffect,useContext } from "react";
import "./searchProducts.css";
import $ from "jquery";
import Search_li_item from "./../Admin/Admin_Search_features/Search_li_item";
import { VscCheckAll } from "react-icons/vsc";
import Product from "../Home/Product";
import { useSelector } from "react-redux";
import { barContext } from "../../App";
import { useCallback } from "react";



const SearchProducters = () => {
  const { products, loading } = useSelector((state) => state.products);

  const [val, setval] = useState("All");
  const [act, setact] = useState("");
  const [ex_products, setex_products] = useState("");
  const [list, setlist] = useState([
    "All",
    "name",
    "id",
    "category",
    "sales",
    "limited",
    "price",
  ]);

  const topload = useContext(barContext);


  $(document).ready(function () {
    $("#DefOpt").on("click", ()=> {
      console.log("I am clicked");
      setact("active");
      $(".dropdown ul").addClass(act);
    });
  });
  const Rem_class= useCallback(()=> {
    setact("");
    $(".dropdown ul").removeClass("active");
  })

  function exfetch(e){
    // e.preventDefault();
    // topload();
    hello();
  }
  useEffect(() => {
    hello();
  }, [products]);

  function hello() {
    let sv = document.getElementById("searchInput").value.toUpperCase();
    // props.searchVal(sv)
    if (val === "All" || val === "") {
      setex_products(products);
      document.getElementById("searchInput").value= ""
    } else if (val === "name") {
      let filtering = products.filter(
        (s) => s.name.toUpperCase() === sv || s.name.toUpperCase().includes(sv)
      );
      setex_products(filtering);
    } else if (val === "id") {
      let filtering = products.filter((s) => s._id.toUpperCase() === sv);
      setex_products(filtering);
    } else if (val === "category") {
      // console.log(products[0].category)
      let filtering = products.filter(
        (s) =>
          s.category.toUpperCase() === sv ||
          s.category.toUpperCase().includes(sv)
      );
      setex_products(filtering);
    }  else if (val === "price") {
      if (!isNaN(sv)) {
        let filtering = products.filter((s) => s.price <= sv);
        setex_products(filtering);
      }
    } else if (val === "role") {
      let filtering = products.filter((s) => s.role.toUpperCase() === sv);
      setex_products(filtering);
    } else if (val === "email") {
      let filtering = products.filter((s) => s.email.toUpperCase() === sv);
      setex_products(filtering);
    }
    else if(val === "sales"){
      let filtering = products.filter((s) => s.sales === parseInt(sv));
      setex_products(filtering);
    }
    else if(val === "limited"){
      let filtering = products.filter((s) => s.limited === "Yes" || s.limited === "yes");
      setex_products(filtering);
    }
  }
// let renders = React.useRef(0)
  return (
    <>
      <div className="wrapper">
    {/* <h1>{renders.current++}</h1> */}
        <h1 className="title_Head">
          Search: <span className="cloloror">Products</span>
        </h1>
        <div className="serach_Elements">
          <div className="search_box">
            <div className="dropdown">
              <div className="default_option" id="DefOpt">
                {val}
              </div>
              <ul className="Thisul">
                {list &&
                  list.map((li) => (
                    <Search_li_item
                      key={li}
                      li={li}
                      val={setval}
                      // val2 = {props.value}
                      act={Rem_class}
                    />
                  ))}
              </ul>
            </div>
            <div className="search_field">
              <input
                type="text"
                className="input"
                id="searchInput"
                autoComplete="on"
                disabled={val === "All" || val ==="limited" ? true : false}
                placeholder={
                  val === "All" || val === "limited"
                    ? `You cannot type anything on " ${val} " Mode`
                    : `Type some "${val}"`
                }
              />
            </div>
            <VscCheckAll className="SideButton" onClick={(e)=>exfetch(e)}/>
          </div>
        </div>
      </div>
      <div className="showingProducts">
        {
          ex_products && ex_products.map((prod)=>(
            <Product                     key={Math.random() * 1000}
            product={prod}/>
          )).reverse() 
        }
      </div>

    </>
  );
};

export default React.memo(SearchProducters);
