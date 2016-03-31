/**
 * Aita 2016
 */

if ($('.js-container').hasClass('jspage-profile')) {
	var UserProfileComp = React.createClass({
		getInitialState: function() {
			return {
				lastName: '',
				firstName: '',
				email: '',
				phone: ''
			};
		},

		componentDidMount: function() {
			ApiService.UserModel.get().then(function(res) {
				this.setState({
					lastName: res.data.name.last,
					firstName: res.data.name.first,
					email: res.data.email,
					phone: res.data.phone,
					body: res.data
				});
			}.bind(this), function(err) {
				console.log('err', err);
			}.bind(this));			
		},

		handleChangeLastName: function(event) {
			this.setState({lastName: event.target.value});
		},

		handleChangeFirstName: function(event) {
			this.setState({firstName: event.target.value});
		},

		handleChangeEmail: function(event) {
			this.setState({email: event.target.value});
		},

		handleChangePhone: function(event) {
			this.setState({phone: event.target.value});
		},

		onSubmit: function(req, res) {
			var body = this.state.body;
			body.name.last = this.state.lastName;
			body.name.first = this.state.firstName;
			body.email = this.state.email;
			body.phone = this.state.phone;

			ApiService.UserModel.put(body, {_id: body._id}).then(function(res) {
				console.log('res', res);
			}, function(err) {
				console.log('err', err);
			});
		},

		render: function() {
			return (
				<form id="updateProfile">
					<div className="row">
						<input type="text" id="last" className="six columns" placeholder="Họ" value={this.state.lastName} onChange={this.handleChangeLastName} />
						<input type="text" id="first" className="six columns" placeholder="Tên" value={this.state.firstName} onChange={this.handleChangeFirstName} />
					</div>

					<div className="row">
						<input type="email" id="email" className="six columns" placeholder="Email" value={this.state.email} onChange={this.handleChangeEmail} />
						<input type="text" id="phone" className="six columns" placeholder="Số điện thoại" value={this.state.phone} onChange={this.handleChangePhone} />
					</div>

					<div className="row">
						<input className="three columns offset-by-two button-primary" value="Lưu thay đổi" type="submit" onClick={this.onSubmit} />
						<a className="three columns offset-by-two button" href="/logout">Đăng xuất</a>
					</div>
				</form>
			);
		}
	});

	ReactDOM.render(<UserProfileComp />, document.getElementById('profile-component'));
}
