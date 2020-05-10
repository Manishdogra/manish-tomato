import axios from "axios";
import { $ } from "./bling";

function ajaxDelete(e) {
  e.preventDefault();
  console.log(this);
  let { _id, store } = JSON.parse(this.getAttribute("data-id"));

  axios.post(`/data/`, {
    reviewId: _id,
    store,
  });
}

export default ajaxDelete;
