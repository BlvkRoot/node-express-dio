const fs = require('fs');
const { join } = require('path');

const filePath = join(__dirname, 'posts.json');

const getPosts = () => { 
    const posts = fs.existsSync(filePath)
        ? fs.readFileSync(filePath)
        : [];

    try {
        return JSON.parse(posts);
    } catch (error) {
        return [];
    }
}

const savePosts = (post) => fs.writeFileSync(filePath, JSON.stringify(post, null, '\t'));
const posts = getPosts();

const postsRoute = (app) => {
    app.route('/posts/:id?')
        .get((req, res) => {
            res.status(201).send({ posts })
        })
        .post((req, res) => {
            posts.push(req.body)
            savePosts(posts);
            res.status(200).send('Posts Added Successfully...')
        })
        .put((req, res) => {
            savePosts(posts.map(post => {
                if(post.id === req.params.id){
                    return {
                        ...post,
                        ...req.body
                    }
                }

                return post;
            }))

            res.status(200).send('Updated Successfully...')
        })
        .delete((req, res) => {
            savePosts(posts.filter(post => post.id !== req.params.id))

            res.status(200).send('Deleted Successfully...')
        })
}

module.exports = postsRoute
