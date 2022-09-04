import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./MainControllerBox2.css";
import { getSellerDates } from "../../../actions/productAction";
import { VscRefresh } from "react-icons/vsc";
import { getProduct } from "../../../actions/productAction";
import Product from "../../Home/Product";
import Admin_categories from "../Admin_others/Admin_categories";
import SmallBoxes_ad from "../Admin_others/Admin_Mainthings/SmallBoxes_ad";
import Graphs from "../Admin_others/Admin_Mainthings/Graphs";



const MainContentBox2 = React.memo(() => {
  const dispatch = useDispatch();

  let { modes } = useSelector((state) => state.DarkMode);
  const { user } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const { sellProdDates } = useSelector((state) => state.sellprodDates);
 

  const [data_one, setData_one] = useState(null);
  const [data_two, setData_two] = useState(null);
  const [data_three, setData_three] = useState(null);
  const [prod_Cat, setProd_Cat] = useState(null);
  const [All_prods, setAll_prods] = useState(null);
  // console.log("this is sellproducts",sellProdDates)

  useEffect(() => {
    dispatch(getSellerDates());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

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


  useEffect(() => {
    make_All_Product_Categories()
    filter_products()
  }, [products]);

  
  useEffect(() => {
    make_All_Order_Date();
  }, [sellProdDates,filter_products,make_All_Product_Categories]);

  function filter_products(){
    if(products && user && products.length >0){
    let prods = products.filter((s)=>s.user === user._id)
    setAll_prods(prods)
    }
  }
  function make_All_Product_Categories(){
    if(products.length >0){

      let prod_cat_filters = products.map((s)=> s.category)
      let uniquecats = new Set(prod_cat_filters)
      setProd_Cat([...uniquecats])
      // setProd_Cat(prod_cat_filters)
      // console.log("this has been set",prod_Cat)
    }
  }

  function make_All_Order_Date() {
    let date_data1 = [];
    let date_data2 = [];
    let date_data3 = [];

    let this_month_dates = [];
    let last_month_dates = [];
    let laster_than_month_dates = [];

    if (sellProdDates && sellProdDates.length > 0) {
      let lastord = sellProdDates[sellProdDates.length - 1];
      let ls_this = lastord[lastord.length - 2];
      let ls_last = lastord[lastord.length - 2] - 1;
      sellProdDates.forEach((element) => {
        if (element[1] === ls_this) {
          this_month_dates.push(element);
        } else if (Number(element[1]) === ls_last) {
          last_month_dates.push(element);
        }
      });
      let max = 31;
      for (let j = 1; j <= max; j++) {
        let counter = 0;
        let counter2 = 0;
        let counter3 = 0;

        this_month_dates.forEach((ele, i) => {
          if (Number(ele[0]) === j) {
            counter++;
          }
        });
        date_data1.push(counter);
        last_month_dates.forEach((ele, i) => {
          if (Number(ele[0]) === j) {
            counter2++;
          }
        });
        date_data2.push(counter2);
        laster_than_month_dates.forEach((ele, i) => {
          if (Number(ele[0]) === j) {
            counter3++;
          }
        });
        date_data3.push(counter3);
      }
    }
    // console.log(date_data2)
    setData_one(date_data1);
    setData_two(date_data2);
    setData_three(date_data3);
  }

  // function to extract the orders that are not completed yet

  return (
    <>
      <div className="contentBox_v2">
       <SmallBoxes_ad/>

        <div className="conBox1">
          <div className="inConBox1_1 bx">
            <div className="inConBox1_1_1 evheadBox">
              <h4>Products</h4>
              <VscRefresh
                className="refericon"
                onClick={() => dispatch(getSellerDates())}
              />
            </div>
            <div className="inConBox1_1_2">
            <Graphs data1={data_one} data2={data_two} data3={data_three}/>
              
          </div>
          </div>
          <div className="inConBox1_2 bx">
            <div className="inConBox1_2_1 evheadBox">
              <h4>Products Categories</ h4>
              <VscRefresh className="refericon" />
            </div>

            <div className="inConBox1_2_2_V_2">
             {
              prod_Cat && 
              prod_Cat.map((s)=>(<Admin_categories category={s}/>))
             }
            </div>
          </div>
        </div>
          <div className="inConBox1_2_v_2">
            <div className="inConBox1_1_1 evheadBox">
              <h4>My Products</h4>
              <VscRefresh
                className="refericon"
                onClick={() => dispatch(getProduct())}
              />
            </div>
            <div className="inConBox1_1_2_v_2">
              {
                All_prods &&
                All_prods.map((pro)=>(
                  <Product
                  key={Math.random() * 1000}
                  product={pro}
                />
                )).reverse()
              }
            </div>
          </div>
      </div>
    </>
  );
});

export default MainContentBox2;
