const { buildSchema } = require('graphql');

// GraphQL schema
const typeDefs = buildSchema(`
    type Query {
        message: String
        person(id: Int!): Person
        people: [Person]
    }
    type Mutation {
        postPersonData(id: Int!, name: String, country: String): Person
    }
    type Person {
        id: Int!
        name: String
        country: String
    }
`);
let mockData = [{id: 1, name: 'Andi', country: 'Indonesia'}, {id: 2, name: 'Budi', country: 'Malaysia'}];

// Root resolver
const message = function(){ return 'Hello World!'};
const person = (args) => mockData.map(function(person) {if (person.id === args.id){return person}})[0];
// const person = (args) => {
//     mockData.map((person, index) => {
//         return person.name + person.age;
//         // if(person.id === args.id){
//         //     return person.id[index]
//         // }
//     })
// }
const people = () => mockData;
const postPersonData = function (args) {
    mockData.push(args);
    return mockData[(mockData.length - 1)]
};
// const test = (args) => console.log(args)

const resolvers = {
    message,
    person,
    people,
    postPersonData
};

module.exports = {
    typeDefs,
    resolvers
}