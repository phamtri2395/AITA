/**
 * Aita 2016
 */


var PostElementComp = React.createClass({

	getInitialState: function() {
		return {};
	},

	componentDidMount: function() {

	},

	render: function() {
		var item = this.props.data;
		if (!item.author) {
			item.author = {};
		}
		console.log('item', item);

		return (
			<div className="media-wrapper">
				<div className="media js-post-content">
					<div className="media-left hidden-xs">
						<a href="#">
							<span className="avatar-wrapper">
								<img src="https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xaf1/v/t1.0-1/p200x200/537508_521071031251049_436179873_n.jpg?oh=8e6d96ecbf47fabe2542d9c6a1d79b79&oe=574B09FF&__gda__=1469398387_93f69d6ccb55637743f1a52c30d13f5b" />
							</span>
						</a>
					</div>

					<div className="media-body">
						<h4 className="media-heading">
							<a href="/chi-tiet">Tam Pham</a>

							<input type="checkbox" id="checkbox-{{item.@index}}" className="tel-group--checkbox" />
							<label for="checkbox-{{item.@index}}" className="tel-group--label">
								<i className="icon-phone"></i> Nhấn để xem
							</label>
							<a href="tel:{{item.mobile}}" className="tel-group--phone-number">
								<i className="icon-phone"></i> 01643652922
							</a>
						</h4>

						<ul className="post-info--list">
							<li className="post-info--item">20 m2</li>
							<li className="post-info--item">|</li>
							<li className="post-info--item">20 phòng ngủ</li>
							<li className="post-info--item">|</li>
							<li className="post-info--item">20 phòng tắm</li>
							<li className="post-info--item">|</li>
							<li className="post-info--item">
								<b>1000VND/tháng</b>
							</li>
						</ul>
						<div className="sumary-b">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
							tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
							quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
							consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
							cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
							proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							<a href="/chi-tiet/{{item.id}}">chi tiết<i className="icon-right-open"></i></a>
						</div>

						{/*<div className="gallery">
							<span className="wrapper-cover-img">
								<a className="fancybox-thumb" rel="fancybox-thumb" href='XXXXX'>
									<img className="media-object" src='XXXXX' />
								</a>
							</span>
						</div>*/}
					</div>
				</div>
			</div>
		);
	}
});

window.PostElementComp = PostElementComp;
