// GET and POST req go to /blog-posts
// DELETE and PUT req go to /blog-posts/:id

// Express to modularize - make separate files and app.use

const express = require("express");

const app = express();

const blogPostsRouter = require("./blogPosts");

app.use(express.static('public'));

app.use('/blog-posts', blogPostsRouter);

app.listen(process.env.PORT || 8080, () => {
	console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});