/**
 * Capheshift 2016
 * Author: Tw
 */

/*global $, React, Select */

if ($('.js-container').hasClass('js-page-index')) {


	var Container = React.createClass({
		getInitialState: function() {
			var options = [
				{ label: 'One', value: 1 },
				{ label: 'Two', value: 2 },
				{ label: 'Three', value: 3 },
			];

			return { 
				value: 1,
				options: options
			};
		},

		updateValue: function(value) {
			this.setState({ value: value });
		},

		render: function() {
			return (
				<Select
			    name="form-field-name"
			    value={this.state.value}
			    options={this.state.options}
			    onChange={this.updateValue} />
			);
		}
	});

	React.render(
		React.createElement(Container),
		document.getElementById('search-box-holder')
	);

}
