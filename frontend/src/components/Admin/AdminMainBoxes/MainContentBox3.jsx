import React , { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  getSellerUsersDates } from '../../../actions/userAction'
import SmallBoxes_ad from '../Admin_others/Admin_Mainthings/SmallBoxes_ad'
import { VscRefresh } from "react-icons/vsc";
import Graphs from '../Admin_others/Admin_Mainthings/Graphs';
import RecentUsers from '../Admin_others/RecentUsers';
import AllUsers from '../Admin_others/AllUsers';



const MainContentBox3 = () => {

const dispatch =  useDispatch();

  let { modes } = useSelector((state) => state.DarkMode);
  let {sellusers ,sellProdDates } = useSelector((state) => state.sellUserDates);
  // let { ALUSDAT } = useSelector((state) => state.allUserDates);
  // console.log(sellusers)

  const [data_one, setData_one] = useState(null);
  const [data_two, setData_two] = useState(null);
  const [data_three, setData_three] = useState(null);
  const [recentUsers, setrecentUsers] = useState(null);

  useEffect(() => {
  dispatch(getSellerUsersDates())
  }, [dispatch])
  

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
    make_All_Order_Date();
    recent_users();
  }, [sellProdDates]);

  // useEffect(() => {
  // }, );

function recent_users(){
  if (sellusers&& sellusers.length > 12){
    setrecentUsers(sellusers.length===5)
  }
  else{
    setrecentUsers(sellusers)

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

  // console.log(sellProdDates)

  return (
    <>
      <div className="contentBox_v3">
        <SmallBoxes_ad/>
        <div className="conBox1">
          <div className="inConBox1_1 bx">
            <div className="inConBox1_1_1 evheadBox">
              <h4>All Users</h4>
              <VscRefresh
                className="refericon"
                onClick={() => dispatch(getSellerUsersDates())}
              />
            </div>
            <div className="inConBox1_1_2">
            <Graphs data1={data_one} data2={data_two} data3={data_three}/>
              
          </div>
          </div>
          <div className="inConBox1_2 bx">
            <div className="inConBox1_2_1 evheadBox">
              <h4>Recent Users</ h4>
              {/* <VscRefresh className="refericon" /> */}
            </div>

            <div className="inConBox1_2_2_V_2">
            {
              recentUsers &&
              recentUsers.map((s)=>(<RecentUsers users = {s} key={s._id}/>))
             }
            </div>
          </div>
        </div>
        <div className="inConBox1_2_v_2">
            <div className="inConBox1_1_1 evheadBox">
              <h4>All Users</h4> 
              <VscRefresh
                className="refericon"
                // onClick={() => dispatch(getProduct())}
              />
            </div>
            <div className="inLongBox1_1_2">
            {
             sellusers &&
             sellusers.map((u)=>(
              <AllUsers users={u} key={u._id}/>
             ))
            }
            </div>
          </div>
      </div>
      
    </>
  )
}

export default MainContentBox3
