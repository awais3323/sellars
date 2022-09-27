import React,{useEffect} from 'react'
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteStrike } from "./../../../actions/userAction";
import "./Strikes.css"
import Swal from "sweetalert2";
import { STRIKE_DELETE_RESET } from '../../../constants/userConstant';
import withReactContent from 'sweetalert2-react-content';

const Strikes = (props) => {
    const dispatch = useDispatch();
  let { modes } = useSelector((state) => state.DarkMode);
  let { isStriked, loadstr } = useSelector((state) => state.strike);

  const {id} = useParams()
  function delStrike(){
    
    dispatch(deleteStrike(id, props.strike._id));

  }
  useEffect(() => {
    if (isStriked) {
    //   alert.success("Strike Deleted Successfully");
      Swal.fire(`${props.strike._id} is deleted`, "Job is Done", "success");
      dispatch({ type: STRIKE_DELETE_RESET });
    }
  }, [isStriked]);
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

  const MySwal = withReactContent(Swal);

  return (
    <>
    <div className="strikeboxes">
        <div className="upperStrike">
        <p className='coloror'>Subject : <span className='colorch'>{props.strike.subject}</span></p>
        <p className='coloror'>Strike Id : <span className='colorch'>{props.strike._id}</span></p>
        <FaTrash className='coloroch delIcon' onClick={() =>
                              MySwal.fire({
                                title: `Do you really want to Delete the Strike id: " ${
                                  props.strike.subject
                                }`,
                                text: `ID: ${props.strike._id} 
                •deleting this will remove one strike from the account`,
                                icon: "warning",
                                showCancelButton: false,
                                confirmButtonColor: "#FF8C32",
                                confirmButtonText: "Yes, I am sure 100% ",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  delStrike();
                                }
                              })
                            }/>
        </div>
        <p className='coloror'>Description : <span className='colorch'> {props.strike.Description}</span></p>
    </div>
      
    </>
  )
}

export default React.memo(Strikes)
