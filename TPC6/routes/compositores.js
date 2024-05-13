var axios = require("axios");
var express = require("express");
var router = express.Router();

const compositorController = require("../controllers/compositor");

/* GET compositores page */
router.get("/", function(req, res, next) {
  compositorController.list().then((compositores) => {
    res.render("compositores/show", { clist: compositores });
  });
});

/* GET compositores create page */
router.get("/create", function(req, res, next) {
  res.render("compositores/create");
});

/* GET compositores page */
router.get("/:id", function(req, res, next) {
  compositorController.findById(req.params.id).then((compositor) => {
    res.render("compositores/index", { compositor: compositor });
  });
});

/* GET compositores edit page */
router.get("/edit/:id", function(req, res, next) {
  compositorController.findById(req.params.id).then((compositor) => {
    res.render("compositores/edit", { compositor: compositor });
  });
});

/* GET compositores delete endpoint */
router.get("/delete/:id", function(req, res, next) {
  compositorController.removeById(req.params.id).then(() => {
    res.redirect("/compositores/");
  });
});

/* POST compositores edit endpoint */
router.post("/edit/:id", function(req, res, next) {
  compositorController.update(req.params.id, req.body).then(() => {
    res.redirect("/compositores/" + req.params.id);
  });
});

/* POST compositores create endpoint */
router.post("/create", function(req, res, next) {
  compositorController.insert(req.body).then(() => {
    res.redirect("/compositores/");
  });
});

module.exports = router;
