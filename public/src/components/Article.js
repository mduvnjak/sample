import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Article  extends Component {
	handleCheckbox(e) {
		this.props.markForDeletion(e.target.checked, e.target.value)
	}

	handleVote(vote) {
		this.props.voteArticle(
			this.props.auth.user.id, this.props.article._id, vote
		);
	}

	render() {
		const { article } = this.props;
		return (
			<div className="container text-center article">
				<div className="article-item">
					<i
						className="fa fa-thumbs-up"
						aria-hidden="true"
						onClick={e => this.handleVote(1)}
						></i>
					<i
						className="fa fa-thumbs-down"
						aria-hidden="true"
						onClick={e => this.handleVote(-1)}
						></i>
				</div>
				<div className="article-item">{article.rating}</div>
				<div className="article-item">
					<a href={article.url}>{article.title}</a>
				</div>
		    <div className="article-item">{article.author_name}</div>
				<div className="article-item delete">
					<input
					type="checkbox"
					value={article._id}
					onChange={this.handleCheckbox.bind(this)}
				/>
			</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
  return {
		...state
	}
}

function mapDispatchToProps(dispatch) {
  return { handleCheckbox: dispatch(actions.markForDeletion) }
}

export default connect(mapStateToProps, actions)(Article);
