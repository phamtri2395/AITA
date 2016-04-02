/**
 * Capheshift 2016
 * Author: Tw
 */

/*global $, React, Select */

var SearchBoxComp = React.createClass({
	getInitialState: function() {
		var path = window.location.pathname;
		var selectedValue = {
			type: 'thue'
		};
		switch (path) {
			case '/nha-rieng':
				selectedValue = JSON.parse(localStorage.getItem('selected-' + path)) || selectedValue;
				break;
			case '/can-ho':				
				selectedValue = JSON.parse(localStorage.getItem('selected-' + path)) || selectedValue;
				break;
			case '/phong':				
				selectedValue = JSON.parse(localStorage.getItem('selected-' + path)) || selectedValue;
				break;
			default:
		}

		var typeOptions = [
			{ label: 'Thuê', value: 'thue' },
			{ label: 'Mua', value: 'ban' },
		];
		var wardOptions = [
			{ label: 'Quận Bình Thạnh', value: 1 },
			{ label: 'Quận 1', value: 2 },
			{ label: 'Quận 2', value: 3 },
			{ label: 'Quận Tân Phú', value: 4 },
			{ label: 'Quận Tân Bình', value: 5 },
			{ label: 'Quận 9', value: 6 },
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
			path: path,
			selectedValue: selectedValue,
			wardOptions: wardOptions,
			typeOptions: typeOptions,
			priceOptions: priceOptions,
		};
	},

	typeUpdateValue: function(value) {
		var selectedValue = this.state.selectedValue;
		selectedValue.type = value;

		localStorage.setItem('selected-' + this.state.path, JSON.stringify(selectedValue));
		this.setState({ 
			selectedValue: selectedValue
		});
	},

	wardUpdateValue: function(value) {
		var selectedValue = this.state.selectedValue;
		selectedValue.ward = value;

		localStorage.setItem('selected-' + this.state.path, JSON.stringify(selectedValue));
		this.setState({ 
			selectedValue: selectedValue
		});
	},

	priceUpdateValue: function(value) {
		var selectedValue = this.state.selectedValue;
		selectedValue.price = value;

		localStorage.setItem('selected-' + this.state.path, JSON.stringify(selectedValue));
		this.setState({ 
			selectedValue: selectedValue
		});
	},

	onSubmit: function() {
		var $window = $(window);
		var query = {
			type: this.state.selectedValue.type.value,
		};

		ApiService.PostModel.find({}, {
			query: query
		}).then(function(res) {
			$window.trigger('fecth-data', res);
		}, function(err) {
			console.log('err', err);
		});
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
							value={this.state.selectedValue.type}
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
							value={this.state.selectedValue.ward}
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
							value={this.state.selectedValue.price}
							options={this.state.priceOptions}
							onChange={this.priceUpdateValue} />
					</div>
				</div>
				<div className="row">
					<div className="columns three search-box--left">
						<label></label>
					</div>
					<div className="columns six searchbox--right">
						<button className="button-primary" onClick={this.onSubmit}>Tìm kiếm</button>
					</div>
				</div>
			</div>
		);
	}
});

window.SearchBoxComp = SearchBoxComp;

if ($('.js-container').hasClass('js-page-index')) {

	React.render(
		React.createElement(SearchBoxComp),
		document.getElementById('search-box-holder')
	);
}
