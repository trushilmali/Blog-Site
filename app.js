//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const homeStartingContent = "The heven for Blogger on that you can able to crate your blog on daily basis and able to public also on the site. Daily Jornal is a website which lets you submit an articles which upon approval will up on our website and you can get good amout of reach from here. It is best platform for blogger.So start blogging with Daily Jornal. Create your first blog and publish with Daily Journal using composre button";
const contactContent = "You able to contect us on Twitter, Instagram and Facebook.";
const aboutContent = "We are the leading blogging site on the online plateform."
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://test:test123@cluster1.k48luzh.mongodb.net/blogPostDB");

const blogPostSchema = {
  title: String,
  content: String
}

const Blog = mongoose.model("Blog", blogPostSchema);

app.get("/", function(req, res){

Blog.find({}, function(err, foundBlogPost){
  res.render("home", {
     p1: homeStartingContent,
     addContent: foundBlogPost
  });
});
});
app.get("/post/:postId", function(req, res){

  const requestedPostId = req.params.postId;
  Blog.findOne( { _id: requestedPostId }, function(err, foundPost){
    res.render("post", {titlePost: foundPost.title, contentPost: foundPost.content});
  });
});

app.get("/about",function(req,res){
  res.render("about", {
    p2: aboutContent
  });
});

app.get("/contact", function(req,res){
  res.render("contact", {
    p3: contactContent
  });
});

app.get("/Compose", function(req,res){
  res.render("compose");
});

app.post("/compose", function(req,res){

    const post = new Blog({
      title : req.body.postTitle,
      content : req.body.content
    });
    post.save(function(err){
      if(!err){
        res.redirect("/");
      }
    });
});


app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
