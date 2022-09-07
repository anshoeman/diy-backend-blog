const express = require("express");
const router = express.Router();
const getAuth = require("../../middleware/auth.token");
const Blog = require("../../models/Blogs");
const User = require("../../models/Admin");
/*Create a Blog*/
router.post("/", getAuth, async (req, res) => {
  const bod = req.body;
  const userId = req.user.id;
  console.log(bod);
  try {
    let blog = new Blog({ ...bod, user: userId });
    await blog.save();
    res.json(blog);
  } catch (error) {
    console.log(error);
  }
});

/*get all blogs*/

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().populate("user", ["name", "avatar"]);
    res.json(blogs);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});

/*get my blogs*/
router.get("/me", getAuth, async (req, res) => {
  try {
    const blog = await Blog.find({ user: req.user.id });
    res.json(blog);
  } catch (error) {
    console.log(error);
  }
});

/*Open blog with id*/
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("user", "name");
    console.log(blog);
    if (!blog) res.status(400).json({ msg: "Blog Not Found" });
    res.json(blog);
  } catch (error) {
    console.log(error);
    if (error.kind == "ObjectId")
      return res.status(400).json({ msg: "Blog Not Found" });
  }
});

module.exports = router;
