/**
 * Aita 2016
 */


var PostElementComp = React.createClass({

	getInitialState: function() {
		return {};
	},

	componentDidMount: function() {

	},

	truncate: function(str, length) {
		var s = str.substr(0, length);
		if (s.length < str.length) {
			s = s + '...';
		}
		return s;
	},

	getFullName: function(author) {
		return author.name.first + ' ' + author.name.last;
	},

	render: function() {
		var imageListRender, imageSectionRender;
		var item = this.props.data;

		if (!item.author) {
			item.author = {};
		}
		
		if (item.images) {
			imageListRender = item.images.map(function(i) {
				return (
					<span className="gallery--mobile-wrapper">
						<span className="wrapper-cover-img">
							<a className="fancybox-thumb" rel="fancybox-thumb" href={'//' + i.serverPath + '/' + i.path}>
								<img className="media-object" src={'//' + i.serverPath + '/' + i.path} />
							</a>
						</span> 
					</span>
				);
			});
		}

		if (item.images.length > 0) {
			imageSectionRender = (
				<div className="gallery-section">
					<div className="gallery-scroll">
						<div className="gallery">
							{imageListRender}
						</div>
					</div>
				</div>
			);
		}

		return (
			<div className="media-wrapper">
				<div className="media media__mobile js-post-content">
					<div className="media-left hidden-xs">
						<a href="javascript:;">
							<span className="avatar-wrapper">
								<img src="https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xaf1/v/t1.0-1/p200x200/537508_521071031251049_436179873_n.jpg?oh=8e6d96ecbf47fabe2542d9c6a1d79b79&oe=574B09FF&__gda__=1469398387_93f69d6ccb55637743f1a52c30d13f5b" />
							</span>
						</a>
					</div>

					<div className="media-body">
						<h4 className="media-heading">
							<a href="javascript:;">{item.name || this.getFullName(item.author)}</a>

							<input type="checkbox" id={"checkbox-" + item._id} className="tel-group--checkbox" />
							<label for={"checkbox-" + item._id} className="tel-group--label">
								<i className="icon-phone"></i>Nhấn để xem
							</label>
							<a href={"tel:" + item.mobile} className="tel-group--phone-number">
								<i className="icon-phone"></i>{item.mobile}
							</a>
						</h4>

						<ul className="post-info--list">
							<li className="post-info--item">{item.area} m2</li>
							<li className="post-info--item">|</li>
							<li className="post-info--item">{item.bedroom} phòng ngủ</li>
							<li className="post-info--item">|</li>
							<li className="post-info--item">{item.bathroom} phòng tắm</li>
							<li className="post-info--item">|</li>
							<li className="post-info--item">
								<b>{item.price} VND/tháng</b>
							</li>
						</ul>

						<div className="sumary-b">
							{this.truncate(item.description, 200)} <a href={"/chi-tiet/" + item._id }>chi tiết<i className="icon-right-open"></i></a>
						</div>

						{imageSectionRender}
					</div>
				</div>
			</div>
		);
	}
});

window.PostElementComp = PostElementComp;
