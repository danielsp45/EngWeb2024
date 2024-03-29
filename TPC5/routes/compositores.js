var axios = require("axios");
var express = require("express");
var router = express.Router();

/* GET compositores page */
router.get("/", function (req, res, next) {
  axios.get("http://localhost:3000/compositores").then(function (response) {
    res.render("compositores/show", { clist: response.data });
  });
});

/* GET compositores create page */
router.get("/create", function (req, res, next) {
  res.render("compositores/create");
});

/* GET compositores page */
router.get("/:id", function (req, res, next) {
  axios
    .get("http://localhost:3000/compositores/" + req.params.id)
    .then(function (response) {
      res.render("compositores/index", { compositor: response.data });
    })
    .catch(function (error) {
      res.render("error", { error: error });
    });
});

/* GET compositores edit page */
router.get("/edit/:id", function (req, res, next) {
  axios
    .get("http://localhost:3000/compositores/" + req.params.id)
    .then(function (response) {
      res.render("compositores/edit", { compositor: response.data });
    })
    .catch(function (error) {
      res.render("error", { error: error });
    });
});

/* GET compositores delete endpoint */
router.get("/delete/:id", function (req, res, next) {
  axios
    .delete("http://localhost:3000/compositores/" + req.params.id)
    .then(function (response) {
      res.redirect("/compositores/");
    });
});
/* POST compositores edit endpoint */
router.post("/edit/:id", function (req, res, next) {
  axios
    .put("http://localhost:3000/compositores/" + req.params.id, req.body)
    .then(function (response) {
      res.redirect("/compositores/" + req.params.id);
    });
});

/* POST compositores create endpoint */
router.post("/create", function (req, res, next) {
  axios
    .post("http://localhost:3000/compositores/", req.body)
    .then(function (response) {
      res.redirect("/compositores/");
    });
});

module.exports = router;
