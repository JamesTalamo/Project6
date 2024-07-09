const Post = require('../Model/Post')

let createNewPost = async (req, res) => {
    let { name, content } = req.body
    if (!name, !content) return res.status(400).json({ "error": "name and content are required" })

    try {
        let timeApi = async () => {//THIRD PARTY API Para sa oras 
            let time = 'https://worldtimeapi.org/api/timezone/Asia/Manila'


            //API call for the timezone api
            let timeCall = await fetch(time)
            if (!timeCall.ok) throw new Error("There's an error with time api")
            let timeSet = await timeCall.json()


            return timeGlobal = timeSet.datetime.split('.')[0]
        }
        let time = await timeApi()

        const newPost = new Post({
            name: name,
            content: content,
            createdAt: time
        })

        await newPost.save()
        res.status(200).json({ "success": "new post has been added" })
    } catch (error) {
        res.status(500).json({ "error": error.message })
    }
}

let getAllPost = async (req, res) => {
    let all = await Post.find({})

    res.send(all)
};

let getOnePost = async (req, res) => {
    let { name } = req.params;
    try {
        // Use await to wait for the database query to complete
        let posts = await Post.find({ name: name });

        // Check if posts array is empty to handle case where no posts are found
        if (posts.length === 0) {
            return res.status(404).json({ error: "No posts found for this user" });
        }

        // If posts are found, return success response
        res.status(200).json({ success: posts });
    } catch (error) {
        // Handle any errors that occur during the database query or response
        res.status(400).json({ error: error.message });
    }
};

let likePost = async (req, res) => {
    let { postId, name } = req.params; // Extract both parameters

    try {
        // Find the post using both parameters
        let findPost = await Post.findOne({ _id: postId, name: name });
        if (!findPost) return res.status(400).json({ "wala": "walang ganyan" });

        findPost.likes++

        await findPost.save()
        res.status(200).send('Added Likes')

    } catch (error) {
        res.status(400).json({ "error": "Something is wrong with like post" });
    }
};

module.exports = {
    createNewPost,
    getAllPost,
    getOnePost,
    likePost
}