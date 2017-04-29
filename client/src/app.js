// IMPORTS
// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// GraphQL
import { gql, graphql } from 'react-apollo';
// Routing
import { Link, NavLink, Route } from 'react-router-dom';
// <Helmet> component for setting the page title
import Helmet from 'react-helmet';
// Helper to merge expected React PropTypes to Apollo-enabled component
import { mergeData } from 'kit/lib/apollo';
// Grommet Components
import App from 'grommet/components/App';
import Split from 'grommet/components/Split';
import Sidebar from 'grommet/components/Sidebar';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';
import Menu from 'grommet/components/Menu';
import Section from 'grommet/components/Section';
import Footer from 'grommet/components/Footer';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';

import './styles.global.css';
import css from './styles.css';
import sass from './styles.scss';

// Get the FuseR logo.  This is a local .svg file, which will be made
// available as a string relative to [root]/dist/assets/img/
import logo from './fuseR.svg';

// We'll display this <Home> component when we're on the / route
const Home = () => (
  <h1>Welcome</h1>
);

// Helper component that will be conditionally shown when the route matches.
// This gives you an idea how React Router v4 works
const Page = ({ match }) => (
  <h1>{match.params.name}</h1>
);

// Specify PropTypes if the `match` object, which is injected to props by
// the <Route> component
Page.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};

const Post = ({ post }) => {
  return (
    <div>
      <Header
        direction="row"
        justify="between"
        pad={{ horizontal: 'medium' }}>
        <Title>
          {post.node.id} : {post.node.headline}
        </Title>
      </Header>
      <Section pad={{ horizontal: 'medium' }}>
        <Tiles fill>
          <Tile align="start">
            {post.node.body}
          </Tile>
        </Tiles>
      </Section>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    node: PropTypes.object,
  }).isRequired,
};

// Now, let's create a GraphQL-enabled component...

// First, create the GraphQL query that we'll use to request data from our
// sample endpoint
const query = gql`
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
`;

// ... then, let's create the component and decorate it with the `graphql`
// HOC that will automatically populate `this.props` with the query data
// once the GraphQL API request has been completed
@graphql(query)
class GraphQLMessage extends Component {
  static propTypes = {
    data: mergeData({
      allPosts: PropTypes.objectOf({
        edges: PropTypes.arrayOf({
          node: PropTypes.objectOf({
            id: PropTypes.number.isRequired,
            headline: PropTypes.string.isRequired,
            body: PropTypes.string.isRequired,
          }),
        }),
      }),
    }),
  };

  render() {
    const { data } = this.props;
    const posts = data.allPosts && data.allPosts.edges;
    const isLoading = data.loading ? 'Loading...' : null;
    return (
      <App centered={false}>
        <Helmet
          title="fuseR"
          meta={[{
            name: 'description',
            content: 'fuseR starter kit',
          }]} />
        <Split flex="right">

          <Sidebar separator="right">
            <Header
              colorIndex="neutral-1"
              pad="medium"
              justify="between">
              <Link to="/"><Title>
                <div className={css.hello}>
                  <img src={logo} alt="FuseR" className={css.logo} />
                </div>
              </Title></Link>
              <Menu primary label="MENU">
                <NavLink
                  className="grommetux-anchor"
                  activeClassName="grommetux-anchor--active"
                  to="/">Home</NavLink>
                <NavLink
                  className="grommetux-anchor"
                  activeClassName="grommetux-anchor--active"
                  to="/page/about">About</NavLink>
                <NavLink
                  className="grommetux-anchor"
                  activeClassName="grommetux-anchor--active"
                  to="/page/contact">Contact</NavLink>
              </Menu>
            </Header>

            <Box flex>
              <div>
                <h2>{isLoading}</h2>
                <ul>
                  {posts && posts.map(({ node }) =>
                    <li key={node.id}><Link to={`/post/${node.id}`}>{node.headline}</Link></li>,
                  )}
                </ul>
              </div>
            </Box>

            <Footer
              colorIndex="neutral-1"
              primary
              align="end"
              pad="medium"
              justify="between">
              <Box
                direction="row"
                align="center"
                pad={{ between: 'medium' }}>
                <Paragraph margin="none">
                  Copyright © 2017 fuseR
                </Paragraph>
              </Box>
            </Footer>
          </Sidebar>

          <Box appCentered>
            <Header
              direction="row"
              justify="between"
              pad={{ horizontal: 'medium' }}>
              <Title>
                <Route exact path="/" component={Home} />
                <Route path="/page/:name" component={Page} />
              </Title>
            </Header>
            {posts && (
              <Route
                path="/post/:id"
                render={({ match }) => (
                  <Post
                    post={posts.find(({ node }) =>
                      node.id === parseInt(match.params.id, 10))} />
              )} />
            )}
          </Box>

        </Split>
      </App>
    );
  }
}

// Export a simple component that allows clicking on list items to change
// the route, along with a <Route> 'listener' that will conditionally display
// the <Page> or <Post> component based on the route name or id
export default () => (
  <GraphQLMessage />
);
