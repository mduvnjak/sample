import React, { Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router-dom';
import Article from './Article';
import ArticleList from './ArticleList';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
    initialSlide: 0,
    arrows: false,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

class Articles extends Component {
  componentWillMount() {
    this.props.getArticles();
  }

  handleDeleteArticles(e) {
    this.props.deleteArticles();
  }

  renderArticles(articles) {
    if(articles) {
      const numberOfSlides = Math.ceil(articles.length / 10);
      for (var slides=[],i=0;i<numberOfSlides;++i) slides[i]=i;
      return (
        <Slider {...settings}>
          {slides.map(function(i, index) {
            const arts = articles.slice(i * 10, (i + 1) * 10);
            return (<ArticleList articles={arts} key={index}/>);
          })}
        </Slider>
      );
    }
  }
  render() {
    return (
      <div className="container text-center">
        <h1>Welcome to article page</h1>
        <div className="actions-container">
          <div>
            <Link
              to="/articles/create"
              className="btn btn-primary"
            >Create new article</Link>
          </div>
          <div>
            <button
              className="btn btn-secondary"
              onClick={this.handleDeleteArticles.bind(this)}
            >Delete articles</button>
          </div>
        </div>
        <div className="text-left">
          {!!this.props.message && this.props.deleted &&
            <div className="text-center alert alert-info">Deleted {this.props.message} articles</div>
          }
          {!!this.props.message && !this.props.deleted &&
            <div className="text-center alert alert-info">{this.props.message}</div>
          }
          {this.renderArticles(this.props.articles)}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,
    articles: state.articles.articles,
    error: state.articles.error,
    message: state.articles.message,
    deleted: state.articles.deleted
  };
}

export default connect(mapStateToProps, actions)(Articles);
