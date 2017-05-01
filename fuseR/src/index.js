var Observable = require('FuseJS/Observable');
var ApolloClient = require('fusejs_lib/apollo-client_apollo.umd.js');
var gql = require('fusejs_lib/graphql-tag_graphql-tag.umd.js');

var networkInterface = ApolloClient.createNetworkInterface({
  uri: 'http://localhost:8000/graphql',
});

var client = new ApolloClient.ApolloClient({
  networkInterface,
});

var queryResult = Observable();

client.query({
  query: gql`
    query {
      allPosts {
        edges {
          node {
            id
            headline
            body
          }
        }
      }
    }
  `,
})
.then(data => queryResult.add(data))
.catch(error => console.log(error));

var items = Observable();

var addItem = function() {
  items.add({
    color: [Math.random(), Math.random(), Math.random(), 1],
    height: (Math.random() + 1.0) * 80,
  });
};
var test = 'Updated';

module.exports = {
  items,
  addItem,
  test,
  queryResult,
};
