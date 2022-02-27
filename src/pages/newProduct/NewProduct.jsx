import { Publish } from "@material-ui/icons";
import "./newProduct.css";

export default function NewProduct() {
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <div className="productUpload">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNDaMqKyDwBijFd-y-JsluVcSaQ2dYR5DEM4qUkuiTvnq8mNtI6oyI5JZdgWGqMYb7xfQ&usqp=CAU"
              alt=""
              className="productUploadImg"
            />
            <label for="file">
              <Publish />
            </label>
            <input type="file" id="file" style={{ display: "none" }} />
          </div>
        </div>
        <div className="addProductItem">
          <label>Name</label>
          <input type="text" placeholder="Apple Airpods" />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <input type="text" placeholder="123" />
        </div>
        <div className="addProductItem">
          <label>Active</label>
          <select name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className="addProductButton">Create</button>
      </form>
    </div>
  );
}
