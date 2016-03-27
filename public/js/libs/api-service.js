/**
 * Aita 2016
 */

/*global $, Promise, _ */

var apiList = [
	{ nspace: 'PostModel', name: 'get', path: '/api/post/all', method: 'GET' },
	{ nspace: 'PostModel', name: 'all', path: '/api/post/all', method: 'GET' },
	{ nspace: 'PostModel', name: 'getOwnPost', path: '/api/post/getownpost', method: 'GET' },
	{ nspace: 'PostModel', name: 'find', path: '/api/post/find?query=${query}', method: 'GET' },
	{ nspace: 'PostModel', name: 'detail', path: '/api/post/${_id}/detail', method: 'GET' },
	{ nspace: 'PostModel', name: 'post', path: '/api/post/post', method: 'POST' },
	{ nspace: 'PostModel', name: 'put', path: '/api/post/put', method: 'PUT' },
	{ nspace: 'PostModel', name: 'delete', path: '/api/post/delete', method: 'DELETE' },
];

var ApiService = (function() {
	var _api = {};

	// create functions with each api link
	$.each(apiList, function(index, item) {
		if (_api[item.nspace] === undefined) {
			_api[item.nspace] = {};
		}

		/**
		 * wrapper to make request easier
		 * @param  data   [that data wanna passed into body of request]
		 * @param  params [that data wanna passed into url]
		 */
		_api[item.nspace][item.name] = function(data, params) {
			return new Promise(function(resolve, reject) {
				if (!data) {
					data = {};
				}
				if (!params) {
					params = {};
				}

				var realPath = '';
				var token = window.localStorage.getItem('token');
				var headers = {
					'Content-Type': 'application/json'
				};

				if (token) {
					headers.Authorization = 'Bearer ' + token;
				}

				if (params.query) {
					params.query = JSON.stringify(params.query);
				}
				realPath = _.template(item.path)(params);

				$.ajax({
					url: 'http://localhost:3000' + realPath,
					type: item.method,
					method: item.method,
					data: JSON.stringify(data),
					headers: headers,
					cache: false,
					crossDomain: true,
					dataType: 'json',
					success: function(data) {
						if (data.success) {
							resolve(data);
						} else {
							reject(data);
						}
					},
					error: function(err) {
						reject(err);
					}
				});
			});
		};
	});

	console.log('api', _api);
	return _api;
})();
