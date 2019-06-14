import expressSession from 'express-session'
var mongoStore = require("connect-mongodb-session")(expressSession);

var store = new mongoStore({
    uri: "mongodb://student:student123@cluster0-shard-00-00-hlah1.mongodb.net:27017,cluster0-shard-00-01-hlah1.mongodb.net:27017,cluster0-shard-00-02-hlah1.mongodb.net:27017/Kanban?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority",
    collection: "Sessions"
});

store.on("error", function (err) {
    console.log("[SESSION ERROR]", err);
});


export default class Session {
    constructor() {
        this.express = expressSession({
            secret: "cr45tal&j3ss!e&c0urtn345eva",
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 7 * 52 * 2,
            },
            store,
            resave: true,
            saveUninitialized: true
        })

    }
}