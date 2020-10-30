/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchPosts } from '../actions/postActions';

class Posts extends React.Component {
  componentDidMount() {
    const { fetchPosts } = this.props;
    fetchPosts();
  }

  UNSAFE_componentWillUpdate(nextProps) {
    const { posts } = this.props;
    if (nextProps.newPost) {
      posts.unshift(nextProps.newPost);
    }
  }

  render() {
    const { posts } = this.props;
    const postItems = posts.map(post => (
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));
    return (
      <div>
        <h1>Posts</h1>
        {postItems}
      </div>
    );
  }
}

Posts.defaultProps = {
  newPost: {},
};

Posts.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      body: PropTypes.string,
      title: PropTypes.string,
      id: PropTypes.number,
      userId: PropTypes.number,
    }),
  ).isRequired,
  newPost: PropTypes.shape({
    body: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.number,
  }),
};

const mapStateToProps = state => ({
  posts: state.posts.items,
  newPost: state.posts.item,
});

export default connect(mapStateToProps, { fetchPosts })(Posts);
