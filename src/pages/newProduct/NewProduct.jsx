import { Edit, Publish, Send } from "@material-ui/icons";
import React, { useState } from "react";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import "./newProduct.css";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import {
  activeData,
  categories,
  colourOptions,
  newsData,
  ratingData,
  sizesData,
  tag,
} from "../../data";
import {
  Button,
  Checkbox,
  Chip,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const variationJson = {
  color: "",
  image: "",
  size: [
    {
      name: "",
      stock: 0,
    },
  ],
};
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 600,
    width: "100%",
    height: "100%",
    marginTop: "6px",
  },
  formControl2: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
    marginTop: "6px",
  },

  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const requestJson = {
  sku: "",
  name: "",
  active: true,
  price: 0,
  discount: 0,
  isNew: false,
  rating: 5,
  saleCount: 0,
  createAt: "2022-02-21T15:01:40.298Z",
  offerEnd: "2023-04-20T15:01:40.298Z",
  customerId: 0,
  stock: 0,
  category: [],
  tag: [],
  variation: [],
  productImage: [],
  fullDescription: "",
  shortDescription: "",
};

export default function NewProduct() {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [cate, setCate] = useState([]);
  const [tags, setTags] = useState([]);
  const [request, setRequest] = useState(requestJson);

  const handleSkuRequest = (e) => {
    var payload = { ...request, sku: e.target.value };
    setRequest(payload);
  };

  const handleNameRequest = (e) => {
    var payload = { ...request, name: e.target.value };
    setRequest(payload);
  };

  const handlePriceRequest = (e) => {
    var payload = { ...request, price: e.target.value };
    setRequest(payload);
  };

  const handleStockRequest = (e) => {
    var payload = { ...request, stock: e.target.value };
    setRequest(payload);
  };
  const handleDiscountRequest = (e) => {
    var payload = { ...request, discount: e.target.value };
    setRequest(payload);
  };

  const handleSaleCountRequest = (e) => {
    var payload = { ...request, saleCount: e.target.value };
    setRequest(payload);
  };

  const handleCreateAtRequest = (e) => {
    var payload = { ...request, createAt: e.target.value };
    setRequest(payload);
  };

  const handleSDesRequest = (e) => {
    var payload = { ...request, shortDescription: e.target.value };
    setRequest(payload);
  };

  const handleFDesRequest = (e) => {
    var payload = { ...request, fullDescription: e.target.value };
    setRequest(payload);
  };

  const handleOfferEndRequest = (e) => {
    var payload = { ...request, offerEnd: e.target.value };
    setRequest(payload);
  };

  const handleRemoveSize = (indexVar, indexSize) => {
    let newArr = [...request.variation];
    newArr[indexVar] = {
      ...newArr[indexVar],
      size: newArr[indexVar].size.filter((item, i) => i !== indexSize),
    };

    var payload = { ...request, variation: newArr };
    setRequest(payload);
  };
  const handleSize = (index) => {
    let newArr = [...request.variation];
    newArr[index] = {
      ...newArr[index],
      size: [
        ...newArr[index].size,
        {
          name: "",
          stock: 0,
        },
      ],
    };

    var payload = { ...request, variation: newArr };
    setRequest(payload);
  };

  const handleSizeOption = (e, indexVar, indexSize) => {
    let newArr = [...request.variation];
    newArr[indexVar].size[indexSize] = {
      ...newArr[indexVar].size[indexSize],
      name: e.target.value,
    };
    var payload = {...request, variation: newArr}
    setRequest(payload)
  };

  const handleStockSize = (e, indexVar, indexSize) => {
    let newArr = [...request.variation];
    newArr[indexVar].size[indexSize] = {
      ...newArr[indexVar].size[indexSize],
      stock: e.target.value,
    };
    var payload = {...request, variation: newArr}
    setRequest(payload)
  };

  const handleVariation = () => {
    var payload = {
      ...request,
      variation: [...request.variation, variationJson],
    };
    setRequest(payload);
  };
  const thumbnailHandle = (e) => {
    if (e.target.files[0] == null) {
      return;
    }

    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    var binaryData = [];
    binaryData.push(e.target.files[0]);
    var payload = {
      ...request,
      productImage: [
        ...request.productImage,
        {
          name: formData,
          url: URL.createObjectURL(
            new Blob(binaryData, { type: "application/zip" })
          ),
        },
      ],
    };
    setRequest(payload);
  };

  const handleVariationImage = (e, index) => {
    if (e.target.files[0] == null) {
      return;
    }
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    var binaryData = [];
    binaryData.push(e.target.files[0]);
    var newArr = [...request.variation];
    newArr[index] = {
      ...newArr[index],
      image: formData,
      imageUrl: URL.createObjectURL(
        new Blob(binaryData, { type: "application/zip" })
      ),
    };
    var payload = { ...request, variation: newArr };
    setRequest(payload);
  };

  const cateHandle = (e) => {
    var categories = e.target.value;
    var payload = {
      ...request,
      category: categories.map((name) => ({ name })),
    };
    setCate(categories);
    setRequest(payload);
  };
  const tagHandle = (e) => {
    var tags = e.target.value;
    var payload = {
      ...request,
      tag: tags.map((name) => ({ name })),
    };
    setRequest(payload);
    setTags(tags);
  };
  const activeHandle = (e) => {
    var payload = {
      ...request,
      active: e.target.value,
    };
    setRequest(payload);
  };
  const newHandle = (e) => {
    var payload = {
      ...request,
      isNew: e.target.value,
    };
    setRequest(payload);
  };
  const ratingHandle = (e) => {
    var payload = {
      ...request,
      rating: e.target.value,
    };
    setRequest(payload);
  };

  const handleSubmit = () => {
    console.log(request);
  };

  const handleRemoveVariation = (indexVar) => {
    var newArr = [...request.variation];
    newArr.splice(indexVar, 1);
    var payload = {
      ...request,
      variation: newArr,
    };
    setRequest(payload);
  };

  const colorHandle = (e, indexVar) => {
    let newArr = [...request.variation];
    newArr[indexVar] = { ...newArr[indexVar], color: e.target.value };
    var payload = { ...request, variation: newArr };

    setRequest(payload);
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductImage">
          <label>Images</label>
          <label for="file">
            <Publish />
          </label>
          <div className="productUpload">
            {request.productImage.map((item, index) => (
              <div key={index} className="containerImage">
                <img src={item.url} alt="" className="image" />
                <div className="middle">
                  <div className="text">
                    <DeleteIcon
                      onClick={() => {
                        var payload = {
                          ...request,
                          productImage: request.productImage.filter(
                            (thumbnail, i) => i !== index
                          ),
                        };
                        setRequest(payload);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
            <input
              type="file"
              onChange={thumbnailHandle}
              id="file"
              style={{ display: "none" }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label for="sku">SKU</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="sku"
              name="sku"
              placeholder="sku"
              value={request.sku}
              onChange={handleSkuRequest}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label for="name">Name</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={request.name}
              onChange={handleNameRequest}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label for="price">Price</label>
          </div>
          <div className="col-75">
            <input
              type="number"
              id="price"
              name="price"
              value={request.price}
              onChange={handlePriceRequest}
              placeholder="99.99 $"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label for="cate">Category</label>
          </div>

          <div className="col-50">
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-mutiple-checkbox-label">
                Select categories
              </InputLabel>
              <Select
                labelId="demo-mutiple-checkbox-label"
                id="demo-mutiple-checkbox"
                multiple
                value={cate}
                onChange={cateHandle}
                input={<Input />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {categories.map((category) => (
                  <MenuItem key={category.value} value={category.label}>
                    <Checkbox checked={cate.indexOf(category.label) > -1} />
                    <ListItemText primary={category.label} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label for="cate">Tags</label>
          </div>

          <div className="col-50">
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-mutiple-checkbox-label">
                Select tags
              </InputLabel>
              <Select
                labelId="demo-mutiple-checkbox-label"
                id="demo-mutiple-checkbox"
                multiple
                value={tags}
                onChange={tagHandle}
                input={<Input />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {tag.map((item) => (
                  <MenuItem key={item.value} value={item.label}>
                    <Checkbox checked={tags.indexOf(item.label) > -1} />
                    <ListItemText primary={item.label} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label for="active">Active</label>
          </div>
          <div className="col-50">
            <FormControl className={classes.formControl2}>
              <InputLabel id="demo-simple-select-label">
                Select active
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={request.active}
                onChange={activeHandle}
              >
                {activeData.map((item) => (
                  <MenuItem key={item.label} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label for="new">New</label>
          </div>
          <div className="col-50">
            <FormControl className={classes.formControl2}>
              <InputLabel id="demo-simple-select-label">Select new</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={request.isNew}
                onChange={newHandle}
              >
                {newsData.map((item) => (
                  <MenuItem key={item.label} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label for="rating">Rating</label>
          </div>
          <div className="col-50">
            <FormControl className={classes.formControl2}>
              <InputLabel id="demo-simple-select-label">
                Select rating
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={request.rating}
                onChange={ratingHandle}
              >
                {ratingData.map((item) => (
                  <MenuItem key={item.label} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label for="stock">Stock</label>
          </div>
          <div className="col-75">
            <input
              type="number"
              id="stock"
              name="stock"
              placeholder="99"
              value={request.stock}
              onChange={handleStockRequest}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label for="discount">Discount</label>
          </div>
          <div className="col-75">
            <input
              type="number"
              id="discount"
              name="discount"
              placeholder="10"
              value={request.discount}
              onChange={handleDiscountRequest}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label for="saleCount">Sale Count</label>
          </div>
          <div className="col-75">
            <input
              type="number"
              id="saleCount"
              name="saleCount"
              placeholder="10"
              value={request.saleCount}
              onChange={handleSaleCountRequest}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label for="createAt">Create at</label>
          </div>
          <div className="col-75">
            <input
              type="datetime-local"
              value={request.createAt}
              onChange={handleCreateAtRequest}
              id="createAt"
              name="createAt"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label for="offerEnd">Offer End</label>
          </div>
          <div className="col-75">
            <input
              type="datetime-local"
              value={request.offerEnd}
              onChange={handleOfferEndRequest}
              id="offerEnd"
              name="offerEnd"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label for="sdecription">Short decription</label>
          </div>
          <div className="col-75">
            <textarea
              id="sdecription"
              name="sdecription"
              placeholder="Write something.."
              style={{ height: "100px" }}
              value={request.shortDescription}
              onChange={handleSDesRequest}
            ></textarea>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label for="fdecription">Full decription</label>
          </div>
          <div className="col-75">
            <textarea
              id="fdecription"
              name="fdecription"
              placeholder="Write something.."
              value={request.fullDescription}
              onChange={handleFDesRequest}
              style={{ height: "150px" }}
            ></textarea>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-25">
            <label>
              <h1>Variation</h1>
            </label>
          </div>
          <div className="col-50">
            <IconButton aria-label="add" onClick={handleVariation}>
              <AddIcon fontSize="large" />
            </IconButton>
          </div>
        </div>
        {request.variation.map((item, indexVar) => (
          <div key={indexVar}>
            <hr />
            <h3>Variation ({indexVar + 1})</h3>
            <div className="addProductImage">
              <label>Image</label>
              <label for={`file-${indexVar}`}>
                <Publish />
              </label>
              {item.imageUrl ? (
                <div className="addProductItem">
                  <div className="containerImage">
                    <img src={item.imageUrl} alt="" className="image" />
                    <div className="middle">
                      <label for={`file-${indexVar}`}>
                        <Edit className="text2" />
                      </label>
                    </div>
                  </div>
                </div>
              ) : null}
              <input
                type="file"
                onChange={(e) => handleVariationImage(e, indexVar)}
                id={`file-${indexVar}`}
                style={{ display: "none" }}
              />
            </div>
            <div className="row">
              <div className="col-25">
                <label for="rating">Color</label>
              </div>
              <div className="col-50">
                <FormControl className={classes.formControl2}>
                  <InputLabel id="demo-simple-select-label">
                    Select color
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={item.color}
                    onChange={(e) => colorHandle(e, indexVar)}
                  >
                    {colourOptions.map((item) => (
                      <MenuItem
                        key={item.value}
                        value={item.value}
                        style={{ color: item.color, fontWeight: "600" }}
                      >
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label>
                  <b>Size:</b>
                </label>
              </div>
              <div className="col-50">
                <IconButton
                  aria-label="add"
                  onClick={() => handleSize(indexVar)}
                >
                  <AddIcon fontSize="medium" />
                </IconButton>
              </div>
            </div>
            {item.size.map((i, index) => (
              <React.Fragment key={index}>
                <hr />
                <div className="row">
                  <div className="col-25">
                    <label>
                      <h4>Size ({index + 1})</h4>
                    </label>
                  </div>

                  <div className="col-25">
                    <label for="rating">Name</label>
                  </div>
                  <div className="col-25">
                    <FormControl className={classes.formControl2}>
                      <InputLabel id="demo-simple-select-label">
                        Size name
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={i.name}
                        onChange={(e) => handleSizeOption(e, indexVar, index)}
                      >
                        {sizesData.map((item) => (
                          <MenuItem key={item.label} value={item.label}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-25"></div>
                  <div className="col-25">
                    {item.size.length === 1 ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        disabled
                        startIcon={<DeleteSweepIcon />}
                      >
                        Delete
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleRemoveSize(indexVar, index)}
                        startIcon={<DeleteSweepIcon />}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-25"></div>
                  <div className="col-25">
                    <label for="stockSize">Stock</label>
                  </div>
                  <div className="col-25">
                    <input
                      type="number"
                      id="stockSize"
                      name="stockSize"
                      value={i.stock}
                      onChange={(e) => handleStockSize(e, indexVar, index)}
                    />
                  </div>
                </div>
              </React.Fragment>
            ))}
            <hr />
            <br />
            <br />
            <Button
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={() => handleRemoveVariation(indexVar)}
            >
              Delete
            </Button>
            <br />
            <br />
          </div>
        ))}

        <br />
        <hr />
        <br />

        <div className="row">
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            endIcon={<Send />}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
