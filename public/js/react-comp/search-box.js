/**
 * Capheshift 2016
 * Author: Tw
 */

/*global $, React, Select */

if ($('.js-container').hasClass('js-page-index')) {


	var Container = React.createClass({
		getInitialState: function() {
			var typeOptions = [
				{ label: 'Mua', value: 'mua' },
				{ label: 'Bán', value: 'ban' },
			];
			var wardOptions = [
				{ label: 'Quận Bình Thạnh', value: 1 },
				{ label: 'Quận 1', value: 2 },
				{ label: 'Quận 2', value: 3 },
				{ label: 'Quận Tân Phú', value: 4 },
				{ label: 'Quận Tân Bình', value: 5 },
			];
			var priceOptions = [
				{ label: 'Dưới 1tr', value: '0' },
				{ label: '1tr - 2tr', value: '1' },
				{ label: '2tr - 3tr', value: '2' },
				{ label: '3tr - 4tr', value: '3' },
				{ label: '4tr - 5tr', value: '4' },
				{ label: 'Trên 5tr', value: '5' },
			];

			return { 
				ward: 1,
				type: 'mua',
				price: '0',
				wardOptions: wardOptions,
				typeOptions: typeOptions,
				priceOptions: priceOptions,
			};
		},

		typeUpdateValue: function(value) {
			this.setState({ type: value });
		},

		wardUpdateValue: function(value) {
			this.setState({ ward: value });
		},

		priceUpdateValue: function(value) {
			this.setState({ price: value });
		},

		render: function() {
			return (
				<div className="searchbox--wrapper">
					<div className="row searchbox--control">
						<div className="columns three searchbox--left">
							<label>Hình thức</label>
						</div>
						<div className="columns six searchbox--right">
							<Select
								multi={false}
								clearable={false}
								value={this.state.type}
								options={this.state.typeOptions}
								onChange={this.typeUpdateValue} />
						</div>
					</div>
					<div className="row searchbox--control">
						<div className="columns three searchbox--left">
							<label>Quận</label>
						</div>
						<div className="columns six searchbox--right">
							<Select
								multi={true}
								searchable={true}
								clearable={true}
								value={this.state.ward}
								options={this.state.wardOptions}
								onChange={this.wardUpdateValue} />
						</div>
					</div>
					<div className="row searchbox--control">
						<div className="columns three searchbox--left">
							<label>Giá tiền</label>
						</div>
						<div className="columns six searchbox--right">
							<Select
								multi={false}
								clearable={false}
								value={this.state.price}
								options={this.state.priceOptions}
								onChange={this.priceUpdateValue} />
						</div>
					</div>
					<div className="row">
						<div className="columns three search-box--left">
							<label></label>
						</div>
						<div className="columns six searchbox--right">
							<button className="button-primary">Tìm kiếm</button>
						</div>
					</div>
				</div>
			);
		}
	});

	React.render(
		React.createElement(Container),
		document.getElementById('search-box-holder')
	);

}
