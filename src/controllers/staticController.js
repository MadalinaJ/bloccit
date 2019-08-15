module.exports = {
  index(req, res, next){
      res.render("static/index", {title: "Welcome to Bloccit"});
  },

 about(req, res, next){
    res.render("static/about", {title: "About"});
  }
<<<<<<< HEAD
  // about(req, res, next){
  //     res.render("static/about");
  // }
}
=======
}
>>>>>>> assignment_2997_topic_resource_1
