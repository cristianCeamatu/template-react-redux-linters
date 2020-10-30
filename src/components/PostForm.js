import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPost } from '../actions/postActions';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { title, body } = this.state;
    const { createPost } = this.props;
    const post = {
      title,
      body,
    };

    createPost(post);
    this.setState({
      title: '',
      body: '',
    });
  }

  render() {
    const { title, body } = this.state;
    return (
      <div>
        <h1>Add Post</h1>
        <form onSubmit={this.onSubmit}>
          <div>
            <label htmlFor="title">
              Title:
              <br />
              <input type="text" name="title" onChange={this.onChange} value={title} />
            </label>
          </div>
          <br />
          <div>
            <label htmlFor="body">
              Body:
              <br />
              <textarea name="body" onChange={this.onChange} value={body} />
            </label>
          </div>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

PostForm.propTypes = {
  createPost: PropTypes.func.isRequired,
};

export default connect(null, { createPost })(PostForm);
