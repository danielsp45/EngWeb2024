var axios = require("axios");
var express = require("express");
var router = express.Router();

/* GET periodos page */
router.get("/", function (req, res, next) {
  axios.get("http://localhost:3000/compositores").then(function (response) {
    const periodos = getPeriodos(response.data);
    console.log(periodos);
    res.render("periodos/show", { periodos: periodos });
  });
});

function getPeriodos(compositores) {
  let periodos = [];
  compositores.forEach((compositor) => {
    if (!periodos.includes(compositor.periodo)) {
      periodos.push(compositor.periodo);
    }
  });
  return periodos;
}

module.exports = router;
