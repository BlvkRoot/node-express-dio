const fs = require("fs");
const { join } = require("path");

const filePath = fileName => join(__dirname, fileName);
const dbFiles = {
    users: 'users.json',
    posts: 'posts.json'
}

const getUsers = () => {
    const data = fs.existsSync(filePath(dbFiles.users))
        ? fs.readFileSync(filePath(dbFiles.users))
        : []

    try {
        return JSON.parse(data)
    } catch (error) {
        return []
    }
}

const saveUser = (users) => fs.writeFileSync(filePath(dbFiles.users), JSON.stringify(users, null, "\t"))

const userRoute = (app) => {
    app.route("/users/:id?")
        .get((req, res) => {
            const users = getUsers()
            res.send({ users })
        })
        .post((req, res) => {
            const users = getUsers()

            users.push(req.body)
            saveUser(users)

            res.send(201).send("OK")
        })
        .put((req, res) => {
            const users = getUsers();
            
            saveUser(users.map(user => {
                if(user.id === req.params.id){
                    return {
                        ...user,
                        ...req.body
                    }
                }
                return user
            }))

            res.status(200).send("UPDATED SUCCESSFULLY")
    })
    .delete((req, res) => {
        const users = getUsers()

        saveUser(users.filter(user => user.id !== req.params.id))

        return res.status(200).send('DELETED SUCCESSFULLY.')
    })
}

module.exports = userRoute