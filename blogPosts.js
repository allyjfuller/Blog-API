// Creating new blog post requires title, content, and author

const express = require('express');
const router = express.Router();

const bodyParser = require ('body-parser');
const jsonParser = bodyParser.json();

const { 
	BlogPosts
} = require("./models");

// Adding entries to BlogPosts with title, content, author


function blahText() {
	return (
		"Blah, " + "Blah, " + "Blah!"
	);
}

BlogPosts.create('How to Lose a Guy in 10 Days', blahText(), 'Rachel');
BlogPosts.create('Hes Just Not That Into You', blahText(), 'Abby');


router.get('/get', (req, res) => {
	res.json(BlogPosts.get());
});

router.post('/create', jsonParser, (req, res) => {
	const requiredFields = ['title', 'content', 'author'];
	for (let i = 0; i < requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \'${field}\' in request body`;
			console.error(message);
			return res.status(400).send(message);
		}
	}

	const item = BlogPosts.create(req.body.title, req.body.content, req.body.author);
	res.status(201).json(item);
});

// Delete blog posts by ID
router.delete('/delete/:id', (req, res) => {
	BlogPosts.delete(req.params.id);
	console.log(`Deleted blog post item \'${req.params.id}\'`);
	res.status(204).end();
});

// PUT update request, checks for required fields
router.put('/update/:id', jsonParser, (req, res) => {
	const requiredFields = ['title', 'content', 'author'];
	for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \'${field}\' in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }
    if (req.params.id !== req.body.id) {
        const message = (
            `Request path id (${req.params.id}) and request body id `
            `(${req.body.id}) must match`);
        console.error(message);
        return res.status(400).send(message);
    }
    console.log(`Updating blog post \`${req.params.id}\``);
    const updatedItem = BlogPosts.update({
        id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        publishDate: req.body.publishDate
    });
    res.status(204).end();
});

module.exports = router;
