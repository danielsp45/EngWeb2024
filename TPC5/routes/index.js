var axios = require("axios");
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { date: new Date().toISOString().substring(0, 16) });
});

/* GET compositores page */
router.get("/compositores/", function (req, res, next) {
  axios.get("http://localhost:3000/compositores").then(function (response) {
    res.render("compositores/show", { clist: response.data });
  });
});

/* GET compositores page */
router.get("/compositores/:id", function (req, res, next) {
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
router.get("/compositores/edit/:id", function (req, res, next) {
  axios
    .get("http://localhost:3000/compositores/" + req.params.id)
    .then(function (response) {
      res.render("compositores/edit", { compositor: response.data });
    })
    .catch(function (error) {
      res.render("error", { error: error });
    });
});

/* POST compositores edit endpoint */
router.post("/compositores/edit/:id", function (req, res, next) {
  console.log(req.body);
  axios
    .put("http://localhost:3000/compositores/" + req.params.id, req.body)
    .then(function (response) {
      res.redirect("/compositores/" + req.params.id);
    });
});

/* GET compositores delete endpoint */
router.get("/compositores/delete/:id", function (req, res, next) {
  axios
    .delete("http://localhost:3000/compositores/" + req.params.id)
    .then(function (response) {
      res.redirect("/compositores/");
    });
});

module.exports = router;
