/**
 * Aita 2016
 */

var PostSectionComp = React.createClass({

	getInitialState: function() {
		return {
			postList: []
		};
	},

	componentDidMount: function() {
		ApiService.PostModel.find({}, {
			query: {
				type: 'thue'
			}
		}).then(function(res) {
			this.setState({
				postList: res.data
			});
		}.bind(this), function(err) {
			console.log('err');
		}.bind(this));
	},

	loadMore: function() {
		console.log('load more');
	},

	render: function() {
		var PostElementComp = window.PostElementComp;
		var postListRender = this.state.postList.map(function(item) {
			return (
				<PostElementComp data={item} />
			);
		});

		return (
			<div className="list-result" data-marker="">
				{postListRender}
				<div className="u-full-width u-content-center">
					<button className="btn-success btn-lg" onClick={this.loadMore}>Xem thêm</button>
				</div>
			</div>
		);
	}
});

window.PostSectionComp = PostSectionComp;

if ($('.js-container').hasClass('js-page-index')) {
	React.render(
		React.createElement(PostSectionComp),
		document.getElementById('list-post-holder')
	);
}
