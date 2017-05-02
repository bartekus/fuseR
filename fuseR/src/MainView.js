var Observable = require('FuseJS/Observable');
var Redux = require('build/Libs/Redux');
var ApolloClient = require('build/Libs/ApolloClient');
var createNetworkInterface = require('build/Libs/createNetworkInterface');
var gql = require('fusejs_lib/graphql-tag_graphql-tag.umd');

var networkInterface = createNetworkInterface.createNetworkInterface({
  uri: 'http://localhost:8000/graphql',
});

var client = new ApolloClient.ApolloClient({
  networkInterface,
});

var pages = Observable();

function createPage(node) {
  console.log('node', JSON.stringify(node));
  return {
    id: node.node.id,
    title: node.node.headline,
    summary: node.node.summary,
    firstName: node.node.personByAuthorId.firstName,
    lastName: node.node.personByAuthorId.lastName,
    createdAt: node.node.createdAt,
    updatedAt: node.node.updatedAt,
    body: node.node.body,
    clicked: function() {
      router.push('subPage', {
        id: node.node.id,
        title: node.node.headline,
        firstName: node.node.personByAuthorId.firstName,
        lastName: node.node.personByAuthorId.lastName,
        createdAt: node.node.createdAt,
        updatedAt: node.node.updatedAt,
        body: node.node.body,
      });
    }
  };
}

client.query({
  query: gql`
    query {
      allPosts {
        edges {
          node {
            id
            headline
            summary(length: 80)
            body
            createdAt
            updatedAt
            personByAuthorId {
              firstName
              lastName
            }
          }
        }
      }
    }
  `,
})
.then(data => data.data.allPosts.edges.forEach(node => pages.add(createPage(node))))
.catch(error => console.log(error));

module.exports = {
  pages: pages,
};
