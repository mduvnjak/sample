import React from 'react';
import Article from './Article';

const getArticleList = function(arts) {
  if(arts) {
    return (
      <div className="article-container">
        {arts.map(function(article, i) {
          return (<Article article={article} key={i}/>);
        })}
      </div>
    );
  }
}

const ArticleList = ({ articles }) => (
	<div className="lista">
		{getArticleList(articles)}
	</div>
);

export default ArticleList;
