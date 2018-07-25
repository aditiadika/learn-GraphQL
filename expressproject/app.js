// first, list all the dependencies here
const express = require('express');
const express_graphql = require('express-graphql');
const http = require('http');
const path = require('path');
const { typeDefs, resolvers } = require('./base_graphql');

// create the instance of our app here
let app = express();

// to configure the app we can use the app.set() method
app.set('appName', 'basic_graphql');
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// main graphql endpoint
app.use('/graphql', express_graphql({
    schema: typeDefs,
    rootValue: resolvers,
    graphiql: true
}));

// Now to create the server
http
.createServer(app)
.listen(
    app.get('port'),
    function() {
        console.log(
            'basic_graphql server listening on port ' +
            app.get('port')
        );
    }
);