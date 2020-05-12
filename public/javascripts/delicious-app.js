import "../sass/style.scss";

import { $, $$ } from "./modules/bling";

import autocomplete from "./modules/autocomplete";

import typeAhead from "./modules/typeAhead";

import makeMap from "./modules/map";

import ajaxHeart from "./modules/heart";
import ajaxDelte from "./modules/ajaxDelete";

autocomplete($("#address"), $("#lat"), $("#lng"));

typeAhead($(".search"));

makeMap($("#map"));

const heartForms = $$("form.heart");
const removeDoc = $$(".remove-doc");
removeDoc.on("click", ajaxDelte);

const deleteUser = $$(".delete")
deleteUser.on("click",  () => {
    console.log(deleteUser)
    var userId = deleteUser.getAttribute('data-id');
    
      console.log("yoo",userId);
    });
// removeDoc.addEventListener("click", () => {
//     var userId = removeDoc[0].getAttribute("data-id");

//   console.log("yoo", removeDoc[0].getAttribute("data-id"));
// });
heartForms.on("submit", ajaxHeart);
