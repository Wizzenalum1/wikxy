import React, { Component } from "react";
import propTypes from "prop-types";

export default class PostList extends Component {
  render() {
    const { posts } = this.props;
    return (
      <div className="posts-list">
        {posts.map((post, index) => (
          <div className="post-wrapper" key={index}>
            <div className="post-header">
              <div className="post-avatar">
                <img src={post.user.avatar} alt="user-pic" />
                <div>
                  <span className="post-author">{post.user.name}</span>
                  <span className="post-time">a minute ago</span>
                </div>
              </div>
              <div className="post-content">{post.content}</div>
              <div className="post-actions">
                <div className="post-like">
                  <img src="" alt="👍" />
                  <span>{post.likes}</span>
                </div>
                <div className="post-comment">
                  <img src="" alt="💬" />
                  <span>{post.comments.length}</span>
                </div>
              </div>
            </div>
            <div className="post-comment-box">
              <input placeholder="statrt typing" />
            </div>
            <div className="post-comments-list">
              <div className="post-comments-item">
                <div className="post-comment-header">
                  <span className="post-comment-author">Bill</span>
                  <span className="post-comment-time">1 hour ago</span>
                  <span className="post-comment-likes">22</span>
                </div>
                <div className="post-comment-content"> Random comment</div>
              </div>
              <div className="post-comments-item">
                <div className="post-comment-header">
                  <span className="post-comment-author">Bill</span>
                  <span className="post-comment-time">1 hour ago</span>
                  <span className="post-comment-likes">22</span>
                </div>
                <div className="post-comment-content"> Random comment</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

PostList.propTypes = {
  posts: propTypes.array.isRequired,
};
