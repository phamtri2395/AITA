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

		onSubmit: function(e) {
			e.preventDefault();

			var body = this.state.body;
			body.name.last = this.state.lastName;
			body.name.first = this.state.firstName;
			body.email = this.state.email;
			body.phone = this.state.phone;

			ApiService.UserModel.put(body, {}).then(function(res) {
				console.log('res', res);
				alert(res.message);
			}, function(err) {
				console.log('err', err);
			});
		},

		render: function() {
			return (
				<form id="updateProfile">
					<div className='row'>
						<div className='columns two'>
							<label>Họ</label>
						</div>
						<div className='columns nine'>
							<input type="text" id="last" placeholder="Họ" value={this.state.lastName} onChange={this.handleChangeLastName} />
						</div>
					</div>

					<div className='row'>
						<div className='columns two'>
							<label>Tên</label>
						</div>
						<div className='columns nine'>
							<input type="text" id="first" placeholder="Tên" value={this.state.firstName} onChange={this.handleChangeFirstName} />
						</div>
					</div>

					<div className='row'>
						<div className='columns two'>
							<label>Email</label>
						</div>
						<div className='columns nine'>
							<input type="email" id="email" placeholder="Email" value={this.state.email} onChange={this.handleChangeEmail} />
						</div>
					</div>

					<div className='row'>
						<div className='columns two'>
							<label>Số điện thoại</label>
						</div>
						<div className='columns nine'>
							<input type="text" id="phone" placeholder="Số điện thoại" value={this.state.phone} onChange={this.handleChangePhone} />
						</div>
					</div>

					<div className='row'>
						<div className='columns two'>&nbsp;</div>
						<div className='columns nine'>
							<input className="button-primary" value="Lưu thay đổi" type="submit" onClick={this.onSubmit} />
						</div>
					</div>
				</form>
			);
		}
	});

	ReactDOM.render(<UserProfileComp />, document.getElementById('profile-component'));
}
