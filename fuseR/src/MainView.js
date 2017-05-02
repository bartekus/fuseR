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

var queryResult = Observable();
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
        body: node.node.body
      });
    }
  };
  // return {
  //   id: JSON.stringify(node.id),
  //   headline: JSON.stringify(node.headline),
  //   body: JSON.stringify(node.body),
  //   createdAt: JSON.stringify(node.createdAt),
  //   updatedAt: JSON.stringify(node.updatedAt),
  //   author: JSON.stringify(node.personByAuthorId.firstName) + ' ' + JSON.stringify(node.personByAuthorId.lastName),
  //   clicked: function() {
  //     router.push('subPage', {
  //       id: JSON.stringify(node.id),
  //       headline: JSON.stringify(node.headline),
  //       body: JSON.stringify(node.body),
  //       createdAt: JSON.stringify(node.createdAt),
  //       updatedAt: JSON.stringify(node.updatedAt),
  //       author: JSON.stringify(node.personByAuthorId.firstName) + ' ' + JSON.stringify(node.personByAuthorId.lastName),
  //     });
  //   },
  // };
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

// .then(data => console.log(JSON.stringify(data)))
// .then(data => data.allPosts.edges.forEach(node => pages.add(createPage(node))))
// .then(data => console.log(JSON.stringify(data)))

module.exports = {
  pages: pages,
};

// .then(function (data) {
//   // queryResult.add(data);
//
//   console.log('data', data.allPosts.edges[0].id);
//
//   for (var i = 0; i <= data.allPosts.edges.length; i++) {
//     pages.add(createPage(data.allPosts.edges[i]));
//   }
// })
