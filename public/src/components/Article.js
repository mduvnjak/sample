import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Article  extends Component {
	handleCheckbox(e) {
		this.props.markForDeletion(e.target.checked, e.target.value)
	}
	render() {
		const { article } = this.props;
		return (
			<div className="container text-center article">
				<div className="article-item">
					<input
					type="checkbox"
					value={article._id}
					onChange={this.handleCheckbox.bind(this)}
				/>
			</div>
				<div className="article-item">{article.votes.length}</div>
				<div className="article-item">
					<a href={article.url}>{article.title}</a>
				</div>
		    <div className="article-item">{article.author_name}</div>
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
