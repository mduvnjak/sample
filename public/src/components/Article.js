import React from 'react';

const Article = ({ article }) => (
	<div className="container text-center">
		<div className="article-item">{article.votes.length}</div>
		<div className="article-item">
			<a href={article.url}>{article.title}</a>
		</div>
    <div className="article-item">{article.author_name}</div>
	</div>
);

export default Article;
