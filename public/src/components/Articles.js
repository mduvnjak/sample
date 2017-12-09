import React, { Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router-dom';
import Article from './Article';

class Articles extends Component {
  componentWillMount() {
    // this.props.fetchMessage();
    this.props.getArticles();
  }
  createArticle() {
    // this.props.createArticle(articleInput)
    console.log(this.props)
  }
  renderArticles(articles) {
    if(articles) {
      return (
        <div>
          {articles.map(function(article, i) {
            return (<Article article={article} key={i}/>);
          })}
        </div>
      );
    }
  }
  render() {
    return (
      <div className="container text-center">
        <h1>Welcome to article page</h1>
        {this.props.message || <Link to="/articles/create"
          className="btn btn-primary"
        >Create article</Link>}
        {this.renderArticles(this.props.articles)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,
    articles: state.articles.articles,
    error: state.articles.error,
    message: state.articles.message
  };
}

export default connect(mapStateToProps, actions)(Articles);
