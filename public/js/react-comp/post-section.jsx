/**
 * Aita 2016
 */

var PostSectionComp = React.createClass({

	getInitialState: function() {
		return {
			postList: [],
			postDataContext: []
		};
	},

	componentDidMount: function() {
		var $window = $(window);
		var $serverHtml = $('#list-post-from-server');

		$window.on('fecth-data', function(e, res) {
			$serverHtml.hide();
			this.setState({
				postList: res.data
			});
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

		var loadmoreRender;
		if (this.state.postDataContext.length > 0) {
			loadmoreRender = (
				<div className="u-full-width u-content-center">
					<button className="btn-success btn-lg" onClick={this.loadMore}>Xem thêm</button>
				</div>
			);
		}

		return (
			<div className="list-result" data-marker="">
				{postListRender}
				{loadmoreRender}
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
