import React, { useState, useEffect } from "react";
import "./SearchBarAd.css";
import $ from "jquery";
import Search_li_item from "./Search_li_item";
import { VscCheckAll } from "react-icons/vsc";

const SearchBarAd = React.memo((props) => {

  const [val, setval] = useState("All");
  const [act, setact] = useState("");

  const {items,setex_products} = props

  $(".default_option").on("click", function () {
    setact("active");
    $(".dropdown ul").addClass(act);
  });
  function Rem_class() {
    setact("");
    $(".dropdown ul").removeClass("active");
  }


// console.log(props.list)
useEffect(()=>{
  hello()
},[items])


function hello(){
    let sv = document.getElementById("searchInput").value.toUpperCase()
    // props.searchVal(sv)
      if(val === "All" || val === ""){
          setex_products(items);
      }
      else if(val === "name"){
          let filtering = items.filter((s)=> s.name.toUpperCase() === sv || s.name.toUpperCase().includes( sv) )
          setex_products(filtering);
      }
      else if(val === "id"){
          let filtering = items.filter((s)=> s._id.toUpperCase() === sv)
          setex_products(filtering);
      }
      else if(val === "category"){
          // console.log(products[0].category)
          let filtering = items.filter((s)=> s.category.toUpperCase() === sv || s.category.toUpperCase().includes( sv))
          setex_products(filtering);
      }
      else if(val === "user"){
          if(props.user.role === "admin_one"){
              let filtering = items.filter((s)=> s.user.toUpperCase() === sv)
              setex_products(filtering);
          }
      }
      else if(val === "price"){
          if(!isNaN(sv)){
              let filtering = items.filter((s)=> s.price <= sv)
              setex_products(filtering);
          }
      }
      else if(val === "role"){
              let filtering = items.filter((s)=> s.role.toUpperCase() === sv)
              setex_products(filtering);
      }
      else if(val === "email"){
              let filtering = items.filter((s)=> s.email.toUpperCase() === sv)
              setex_products(filtering);
      }
      else if(val === "status"){
              let filtering = items.filter((s)=> s.orderStatus.toUpperCase() === sv)
              setex_products(filtering);
      }
      else if(val === "seller"){
              let filtering = items.filter((s)=> s.seller.toUpperCase() === sv)
              setex_products(filtering);
      }
      else if(val === "Order name"){
              let filtering = items.filter((s)=> s.orderItems[0].name.toUpperCase() === sv)
              setex_products(filtering);
      }
      else if(val === "total price"){
        if(!isNaN(sv)){
            let filtering = items.filter((s)=> s.totalPrice <= sv)
            setex_products(filtering);
        }
    }
}
// console.log(props.title)

  return (
    <>
      <div className="wrapper">
        <h1 className="title_Head">Search: <span className="cloloror">{props.title}</span></h1>
        <div className="serach_Elements">

        <div className="search_box">
          <div className="dropdown">
            <div className="default_option">{val}</div>
            <ul className="Thisul">
              {props.list &&
                props.list.map((li) => (
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
            <input type="text" className="input" id="searchInput" autoComplete="on" disabled= {val === "All" ?true:false} placeholder={val === "All"? `You cannot type anything on "All" Mode`:`Type some "${val}"`} />
          </div>
            <VscCheckAll className="SideButton" onClick={()=>hello()}/>
        </div>
        </div>
      </div>
    </>
  );
});

export default SearchBarAd;
