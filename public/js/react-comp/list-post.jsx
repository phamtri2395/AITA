/**
 * Aita 2016
 */

var ListPostComp = React.createClass({
	uploadFiles: [],

	getInitialState: function() {
		return {
			listPost: []
		};
	},

	componentDidMount: function() {
		ApiService.PostModel.getOwnPost({}, {}).then(function(res) {
			console.log('res', res);
			this.setState({
				listPost: res.data
			});
		}.bind(this), function(err) {
			console.log('err', err);
		}.bind(this));
	},

	handleReactivation: function(event, postId) {
		event.preventDefault();

		ApiService.PostModel.reactivate({}, {
			_id: postId
		}).then(function(res) {
			console.log(res);
			alert(res.message);

			// Change state value
			ApiService.PostModel.getOwnPost({}, {}).then(function(res) {
				console.log('res', res);
				this.setState({
					listPost: res.data
				});
			}.bind(this), function(err) {
				console.log('err', err);
			}.bind(this));
		}.bind(this), function(err) {
			console.log('err', err);
		}.bind(this));
	},

	render: function() {
		var self = this;
		var linkStyle = {
			textDecoration: 'none'
		};

		return (
			<table className="u-full-width">
				<tbody>
				{this.state.listPost.map(function(item) {
					return (
						<tr key={item._id}>
							<td><a href={"/chi-tiet/" + (item.slug)} style={linkStyle}>{item.title}</a></td>
							<td>
								{
									item.isExpired
									? <div className="expired u-pull-left u-pull-right">Đã hết hạn</div>
									: <div className="actived u-pull-left u-pull-right">Còn hạn</div>
								}
							</td>
							<td><a href="javascript:;" onClick={(event) => self.handleReactivation(event, item._id)} style={linkStyle}>Kích hoạt</a></td>
							<td><a href="javascript:;" style={linkStyle}>Chỉnh sửa</a></td>
						</tr>
					);
				})}
				</tbody>
			</table>
		);
	}
});

window.ListPostComp = ListPostComp;

if ($('.js-container').hasClass('jspage-profile')) {
	ReactDOM.render(<ListPostComp />, document.getElementById('list-post-component'));
}
