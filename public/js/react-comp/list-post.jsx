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

	render: function() {
		return (
			<table className="u-full-width">
				<tbody>
				{this.state.listPost.map(function(item) {
					return (
						<tr key={item._id}>
							<td><a href={"/chi-tiet/" + (item._id)}>{item.title}</a></td>
							<td>Đã hết hạn</td>
							<td><a href="javascript:;">Kích hoạt</a></td>
							<td><a href="javascript:;">Chỉnh sửa</a></td>
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
