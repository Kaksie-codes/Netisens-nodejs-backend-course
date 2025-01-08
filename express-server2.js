const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000 

const app = express();

// Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));



const logger = (req, res, next) => {
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next(); 
}

//logger middleware
app.use(logger);

// setup static folder
// app.use(express.static(path.join(__dirname, 'views')))

let posts =  [
    {id: 1, title: 'First Post', body: 'This is the first post'},
    {id: 2, title: 'Second Post', body: 'This is the second post'},
    {id: 3, title: 'Third Post', body: 'This is the third post'}
]


// Get Single Post
app.get('/api/posts', logger, (req, res) => {
    console.log(req.query)
    console.log(req.params)
    let limit = parseInt(req.query.limit);

    if(isNaN(limit) || limit < 1 || !limit) limit = 10;
    res.json(posts.slice(0, limit));
})

//Get All Posts
app.get('/api/posts/:id', (req, res) => {    
    const post = posts.filter(post => post.id === parseInt(req.params.id));
    if(post.length < 1) return res.status(404).json({msg: 'Post not found'});
    res.json(post);
})

//create new post
app.post('/api/posts', (req, res) => {
    console.log('body >>>', req.body)
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
        body: req.body.body
    }
    if(!newPost.title) return res.status(400).json({msg:"please provide a title"})
    if(!newPost.body) return res.status(400).json({msg:"please provide a body"})
    posts.push(newPost);
    res.json(posts);
})

// update post
app.put('/api/posts/:id', (req, res) => {
    const post = posts.find(post => post.id === parseInt(req.params.id));
    if(!post) return res.status(404).json({msg: 'Post not found'});
    if(!req.body.title) return res.status(400).json({msg:"please provide a title"})
    if(!req.body.body) return res.status(400).json({msg:"please provide a body"})
    post.title = req.body.title;
    post.body = req.body.body;
    res.json(posts);
})

// delete post

app.delete('/api/posts/:id', (req, res) => {
    const post = posts.find(post => post.id === parseInt(req.params.id));
    if(!post) return res.status(404).json({msg: 'Post not found'});
    const index = posts.indexOf(post);
    posts.splice(index, 1);
    res.json({msg: 'Post removed', posts: posts});
})

app.listen(port, () => {
    console.log('Server is running on port ' + port );
})