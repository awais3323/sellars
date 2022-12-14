import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct, updateProduct } from "../../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../../layout/MetaData";
import { UPDATE_PRODUCT_RESET } from "../../../constants/productConstant";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'
import $ from "jquery";
import Loader from "../../layout/Loader/Loader";

const AdminUpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { id } = useParams();

  const { loading, error, success } = useSelector((state) => state.updateProduct);
  const { products } = useSelector((state) => state.products);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const opt = ["yes", "none"];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      Swal.fire(
        'Product Updated',
        'Best Of Luck for Future.',
        'success'
      )
      navigate("/admin/dashboard/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
      dispatch(getProduct());
    }
  }, [dispatch, alert, error, navigate, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    if(user?.strikes?.length <5){

    
    let gotColor = document
      .getElementById("prodColor")
      .value.trim()
      .split(" ")
      .join(",");
    let sizer = document.getElementById("prodSize").value;
    if (sizer !== "") {
      var gotSize = sizer.trim().split(" ").join(",");
      console.log(gotSize);
    }
    // let tagers = [Tag1,Tag2,Tag3,Tag4,Tag5] ;
    let tagers = [];
    for (let i = 1; i <= 5; i++) {
      let vals = document
        .getElementById(`prodtag${i}`)
        .value.trim()
        .toUpperCase();
      tagers.unshift(vals);
    }

    // tagers.push()
    const myForm = new FormData();

    myForm.set("name", document.getElementById("prodName").value.trim());
    myForm.set("price", document.getElementById("prodPrice").value.trim());
    myForm.set(
      "description",
      document.getElementById("prodDescription").value.trim()
    );
    myForm.set(
      "category",
      document.getElementById("prodCat").value.trim().toLowerCase()
    );
    myForm.set("Stock", document.getElementById("prodStock").value.trim());
    myForm.set("sales", document.getElementById("prodSales").value.trim());
    myForm.set("limited", document.getElementById("prodLimited").value.trim());
    myForm.set("weight", document.getElementById("prodWeight").value.trim());
    myForm.set("colors", gotColor);
    myForm.set("sizes", gotSize);
    // myForm.set("Tags", tagers);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    tagers.forEach((tag) => {
      myForm.append("Tags", tag);
    });
    console.log("this is pressed");
    console.log(tagers);
    console.log(images);
    dispatch(updateProduct(myForm,id));
  }
  else{
    Swal.fire(
      'Your Strikes are 5',
      'You cannot perform this action until your strikes are 5. Please contact the admin to continue your account',
      'warning'
    )
  }
  };

  // console.log(document.getElementById("prodLimited").value.trim())
  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
     
    console.log(files)

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  let { modes } = useSelector((state) => state.DarkMode);

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
  //   let render = React.useRef(0)

  // $(document).ready(function () {
  //   $("#prodCat").keyup(function () {
  //     var value = $(this).val();
  //     $("#prodtag5").val(value);
  //   });
  // });
  
  useEffect(() => {
    let filterer = products.filter((s) => s._id === id);
    if (filterer[0]?.Tags !== undefined) {
      var filt = Object.values(filterer[0].Tags[0]).filter(([value]) => value);
    }
    if (filterer !== undefined && filterer.length > 0) {
      document.getElementById("prodName").value = filterer[0].name;
      document.getElementById("prodPrice").value = filterer[0].price;
      document.getElementById("prodCat").value = filterer[0].category;
      document.getElementById("prodStock").value = filterer[0].Stock;
      if (filterer[0].colors !== undefined && filterer[0].colors.length > 0) {
        document.getElementById("prodColor").value = filterer[0].colors
          .split(",")
          .join(" ");
      }
      if (filterer[0].sizes !== undefined && filterer[0].sizes.length > 0) {
        document.getElementById("prodSize").value = filterer[0].sizes
          .split(",")
          .join(" ");
      }
      if (filterer[0].sales !== undefined) {
        document.getElementById("prodSales").value = filterer[0].sales;
      }
      if (filterer[0].limited !== undefined && filterer[0].limited.length > 0) {
        document.getElementById("prodLimited").value = filterer[0].limited;
      }
      if (filterer[0].weight !== undefined) {
        document.getElementById("prodWeight").value = filterer[0].weight;
      }
      if (filterer[0].description !== undefined) {
        document.getElementById("prodDescription").value =
          filterer[0].description;
      }
      if (filterer[0].Tags !== undefined) {
        for (let i = 1; i <= 5; i++) {
          document.getElementById(`prodtag${i}`).value = filt[i - 1];
        }
        let imgAdd = [];
        if (filterer[0].images !== undefined && filterer[0].images.length > 0) {
          for (let i = 0; i < filterer[0].images.length; i++) {
            imgAdd.push(filterer[0].images[i].url);
          }
          setImagesPreview(imgAdd);
          // setImages(imgAdd);
        }
      }
    }
  }, [products?.length > 0]);
  // if(imagesPreview.length  === 0){
  //   let filterer = products.filter((s) => s._id === id);
  //   let imgAdd = [];
  //   if (filterer[0]?.images !== undefined && filterer[0]?.images.length > 0) {
  //     for (let i = 0; i < filterer[0]?.images.length; i++) {
  //       imgAdd.push(filterer[0]?.images[i].url);
  //     }
  //     setImagesPreview(imgAdd);
  //     // setImages(imgAdd);
  //   }
  // }
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Edit Product" />
          <div className="dashboard">
            <div className="newProductContainer">
              <form
                className="createProductForm"
                encType="multipart/form-data"
                onSubmit={createProductSubmitHandler}
              >
                <h1 id="titleHeading">
                  <span className="headSpan">Edit </span> Product
                </h1>

                <div className="smallInputFields">
                  <div>
                    <input
                      type="text"
                      placeholder="Product Name"
                      required
                      className={"inputfiled textes"}
                      id="prodName"
                      // value={name}
                      // onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Price Numbers only"
                      required
                      className={"inputfiled textes"}
                      id="prodPrice"
                      // onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Category"
                      required
                      className={"inputfiled textes"}
                      id="prodCat"
                      // value={category}
                      // onChange={(e) => setCategory(e.target.value)}
                    />
                  </div>

                  <div>
                    <input
                      type="number"
                      placeholder="Stock (Numbers only)"
                      required
                      className={"inputfiled textes"}
                      id="prodStock"
                      // onChange={(e) => setStock(e.target.value)}
                    />
                  </div>
                  <div>
                    <div className="withSmallPara">
                      <input
                        type="text"
                        placeholder="Colors Available"
                        required
                        className={"inputfiled textes"}
                        id="prodColor"
                        // onChange={(e) => setColor(e.target.value)}
                      />
                      <small className="theSmall">
                        Please Add the "Color" name with space spaces between
                        them
                      </small>
                    </div>
                  </div>
                  <div>
                    <div className="withSmallPara">
                      <input
                        type="text"
                        placeholder="Sizes Available"
                        // required
                        className={"inputfiled textes"}
                        id="prodSize"
                        // onChange={(e) => setSize(e.target.value)}
                      />
                      <small className="theSmall">
                        Please Add the "Size" with space spaces between them
                      </small>
                    </div>
                  </div>

                  <div>
                    <div className="withSmallPara">
                      <input
                        type="Number"
                        placeholder="Sale Numbers only"
                        // required
                        className={"inputfiled textes"}
                        id="prodSales"
                        // onChange={(e) => setSales(e.target.value)}
                      />
                      <small className="theSmall">
                        Entered Number will be calculated as percentage on
                        discount in total price
                      </small>
                    </div>
                  </div>
                  <div>
                    <div className="withSmallPara">
                      <select id="prodLimited" className={"inputfiled textes"}>
                        <option value="">
                          If the Product is Limited or Not?
                        </option>
                        {opt.map((cate) => (
                          <option key={cate}>{cate}</option>
                        ))}
                      </select>
                      <small className="theSmall">
                        Select if your product is limited or according to the
                        seasons
                      </small>
                    </div>
                  </div>

                  <div>
                    <div className="withSmallPara">
                      <input
                        type="Number"
                        placeholder="Weight In (Kg's) Numbers only"
                        required
                        step={"any"}
                        className={"inputfiled textes"}
                        id="prodWeight"
                        // onChange={(e) => setWeight(e.target.value)}
                      />
                      <small className="theSmall">
                        Enter the weight of your product including the packaging
                        material{" "}
                      </small>
                    </div>
                  </div>
                  <div></div>
                  <div className="tagsCenter">
                    <input
                      type="text"
                      placeholder="Tag1"
                      required
                      className={"inputfiled textestag"}
                      id="prodtag1"
                      // onChange={(e) => setTag1(e.target.value)}
                    />

                    <input
                      type="text"
                      placeholder="Tag2"
                      required
                      className={"inputfiled textestag"}
                      id="prodtag2"
                      // onChange={(e) => setTag2(e.target.value)}
                    />

                    <input
                      type="text"
                      placeholder="Tag3"
                      required
                      className={"inputfiled textestag"}
                      id="prodtag3"
                      // onChange={(e) => setTag3(e.target.value)}
                    />

                    <input
                      type="text"
                      placeholder="Tag4"
                      required
                      className={"inputfiled textestag"}
                      id="prodtag4"
                      // onChange={(e) => setTag4(e.target.value)}
                    />

                    <input
                      type="text"
                      placeholder="Tag5"
                      required
                      className={"inputfiled textestag"}
                      id="prodtag5"
                      // value={category}
                      // onChange={(e) => setTag5(e.target.value)}
                    />
                  </div>
                  <div>
                    <div className="withSmallPara">
                      <textarea
                        placeholder={`Product Description`}
                        // value={description}
                        // onChange={(e) => setDescription(e.target.value)}
                        id="prodDescription"
                        cols="30"
                        rows="10"
                        required
                        className={"inputfiled textesArea"}
                      ></textarea>
                      <small className="theSmall">
                        Beaware ?????? : Description Must be only about the product.
                        In case any of your personal details or irrelevant
                        detail your account will get strike by Owner and your
                        product will get deleted.
                      </small>
                    </div>
                  </div>
                  <div className="imagesCollectorDiv">
                    <div id="createProductFormFile">
                      <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={createProductImagesChange}
                        multiple
                        // required
                      />
                    </div>

                    <div id="createProductFormImage">
                      {imagesPreview.map((image, index) => (
                        <img key={index} src={image} alt="Product Preview" className="imagcont"/>
                      ))}
                    </div>
                  </div>
                </div>

                <Button
                  id="createProductBtn"
                  type="submit"
                  disabled={loading ? true : false}
                >
                  Update
                </Button>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default React.memo(AdminUpdateProduct);
