import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../../layout/MetaData";
import { NEW_PRODUCT_RESET } from "../../../constants/productConstant";
import { useNavigate } from "react-router-dom";

const MainElementNewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [Color, setColor] = useState("");
  const [Size, setSize] = useState("");
  const [Sales, setSales] = useState(0);
  const [Limited, setlimited] = useState("");
  const [Weight, setWeight] = useState(0);
  const [Tag1, setTag1] = useState(0);
  const [Tag2, setTag2] = useState(0);
  const [Tag3, setTag3] = useState(0);
  const [Tag4, setTag4] = useState(0);
  const [Tag5, setTag5] = useState(0);
  const [Tags, setTags] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const opt = [
    "yes",
    "none",
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      navigate("/admin/dashboard/products");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, navigate, success]);

  // function String_spaces(str){
  //   // console.log(str)
  //   let sp = str.split(" ").join(",");
  //   return sp;
  //   // console.log(sp)
  // }

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    let gotColor = Color.split(" ").join(",")
    if(Size !== ""){
      var gotSize = Size.split(" ").join(",")
    }
    let tagers = [Tag1,Tag2,Tag3,Tag4,Tag5] ;
    // tagers.push()
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);
    myForm.set("sales", Sales);
    myForm.set("limited", Limited);
    myForm.set("weight", Weight);
    myForm.set("colors", gotColor);
    myForm.set("sizes", gotSize);
    // myForm.set("Tags", tagers);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    tagers.forEach((tag) => {
      myForm.append("Tags", tag);
    });
    console.log("this is pressed")
    console.log(tagers)
    console.log(images)
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

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

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1 id="titleHeading"><span className="headSpan">Create </span> Product</h1>

            <div className="smallInputFields">

            <div>
              <input
                type="text"
                placeholder="Product Name"
                required
                className={"inputfiled textes"}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="Price Numbers only"
                required
                className={"inputfiled textes"}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>


            <div>
              <input
                type="text"
                placeholder="Category"
                required
                className={"inputfiled textes"}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div>
              <input
                type="number"
                placeholder="Stock  Numbers only"
                required
                className={"inputfiled textes"}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div>
              <div className="withSmallPara">

              <input
                type="text"
                placeholder="Colors Available"
                required
                className={"inputfiled textes"}
                onChange={(e) => setColor(e.target.value)}
                />
              <small className="theSmall">Please Add the "Color" name with space spaces between them</small>
                </div>
            </div>
            <div>
              <div className="withSmallPara">

              <input
                type="text"
                placeholder="Sizes Available"
                // required
                className={"inputfiled textes"}
                onChange={(e) => setSize(e.target.value)}
                />
              <small className="theSmall">Please Add the "Size" with space spaces between them</small>
                </div>
            </div>
            
            

            <div>
              <div className="withSmallPara">

              <input
                type="Number"
                placeholder="Sale Numbers only"
                // required
                className={"inputfiled textes"}
                onChange={(e) => setSales(e.target.value)}
                />
              <small className="theSmall">Entered Number will be calculated as percentage on discount in total price</small>
                </div>
            </div>
            <div>
              <div className="withSmallPara">

              <select onChange={(e) => setlimited(e.target.value)} className={"inputfiled textes"}>
                <option value="">If the Product is Limited or Not?</option>
                {opt.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
              <small className="theSmall">Select if your product is limited or according to the seasons</small>
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
                onChange={(e) => setWeight(e.target.value)}
                />
              <small className="theSmall">Enter the weight of your product including the packaging material </small>
                </div>
            </div>
            <div></div>
            <div className="tagsCenter">

              <input
                type="text"
                placeholder="Tag1"
                required
                className={"inputfiled textestag"}
                onChange={(e) => setTag1(e.target.value)}
                />

              <input
                type="text"
                placeholder="Tag2"
                required
                className={"inputfiled textestag"}
                onChange={(e) => setTag2(e.target.value)}
                />

              <input
                type="text"
                placeholder="Tag3"
                required
                className={"inputfiled textestag"}
                onChange={(e) => setTag3(e.target.value)}
                />

              <input
                type="text"
                placeholder="Tag4"
                required
                className={"inputfiled textestag"}
                onChange={(e) => setTag4(e.target.value)}
                />

              <input
                type="text"
                placeholder="Tag5"
                required
                className={"inputfiled textestag"}
                onChange={(e) => setTag5(e.target.value)}
                />
            </div>
            <div>
              <div className="withSmallPara">

              <textarea
                placeholder={`Product Description`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="10"
                required
                className={"inputfiled textesArea"}
              ></textarea>
              <small className="theSmall">Beaware ⚠️ : Description Must be only about the product. In case any of your personal details or irrelevant detail your account will get strike by Owner and your product will get deleted.</small>

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
                />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
                ))}
            </div>
            </div>
                </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default MainElementNewProduct;