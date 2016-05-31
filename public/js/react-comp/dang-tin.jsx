/**
 * Aita 2016
 */

var isLocalEnv = $('[data-env]').data('env') === 'local';

var AddNewPostForm = React.createClass({
	// Validations
	validations: {
		// Is positive integer (exclude 0) or not
		isPositiveNumb: function(value) {
			var str = value.toString();
			return ((str.match(/^\+?\d+$/)) && value > 0);
		},
		// Is positive integer (include 0) or not
		isPositiveNumbZero: function(value) {
			var str = value.toString();
			return (str.match(/^\+?\d+$/));
		},

		// Images
		images: function(value) {
			if (value > 0) {
				$('#dropzone-error-msg').css('visibility', 'hidden');
				return true;
			}
			else {
				$('#dropzone-error-msg').css('visibility', 'visible');
				return false;
			}
		},
		// Type
		type: function(value) {
			if (value !== '') {
				$('#state-type-error-msg').css('visibility', 'hidden');
				return true;
			}
			else {
				$('#state-type-error-msg').css('visibility', 'visible');
				return false;
			}
		},
		// Real Estate
		realEstate: function(value) {
			if (value !== '') {
				$('#state-realEstate-error-msg').css('visibility', 'hidden');
				return true;
			}
			else {
				$('#state-realEstate-error-msg').css('visibility', 'visible');
				return false;
			}
		},
		// District
		district: function(value) {
			if (value !== '') {
				$('#state-district-error-msg').css('visibility', 'hidden');
				return true;
			}
			else {
				$('#state-district-error-msg').css('visibility', 'visible');
				return false;
			}
		},
		// Address
		address: function(value) {
			if (value !== '') {
				$('#address-error-msg').css('visibility', 'hidden');
				return true;
			}
			else {
				$('#address-error-msg').css('visibility', 'visible');
				return false;
			}
		},
		// Price
		price: function(value) {
			if (this.isPositiveNumb(value)) {
				$('#price-error-msg').css('visibility', 'hidden');
				return true;
			}
			else {
				$('#price-error-msg').css('visibility', 'visible');
				return false;
			}
		},
		// Area
		area: function(value) {
			if (this.isPositiveNumb(value)) {
				$('#area-error-msg').css('visibility', 'hidden');
				return true;
			}
			else {
				$('#area-error-msg').css('visibility', 'visible');
				return false;
			}
		},
		// Bedroom
		bedroom: function(value) {
			if (this.isPositiveNumbZero(value)) {
				$('#bedroom-error-msg').css('visibility', 'hidden');
				return true;
			}
			else {
				$('#bedroom-error-msg').css('visibility', 'visible');
				return false;
			}
		},	
		// Bathroom
		bathroom: function(value) {
			if (this.isPositiveNumbZero(value)) {
				$('#bathroom-error-msg').css('visibility', 'hidden');
				return true;
			}
			else {
				$('#bathroom-error-msg').css('visibility', 'visible');
				return false;
			}
		},	
		// Name
		name: function(value) {
			if (value !== '') {
				$('#name-error-msg').css('visibility', 'hidden');
				return true;
			}
			else {
				$('#name-error-msg').css('visibility', 'visible');
				return false;
			}
		},	
		// Mobile
		mobile: function(value) {
			if (value !== '') {
				$('#mobile-error-msg').css('visibility', 'hidden');
				return true;
			}
			else {
				$('#mobile-error-msg').css('visibility', 'visible');
				return false;
			}
		},	
	},

	// Generate title
	generateTitle: function() {
		var type = '';
		var realEstate = '';
		var front = '';
		var area = '';
		var bedroom = '';
		var bathroom = '';

		if (this.dynamicTitle.type) {
			if (this.dynamicTitle.type === 'ban') type = 'Bán';
			else if (this.dynamicTitle.type === 'thue') type = 'Cho thuê';
		}

		if (this.dynamicTitle.realEstate) {
			if (this.dynamicTitle.realEstate === 'nha') realEstate = 'nhà';
			else if (this.dynamicTitle.realEstate === 'can-ho') realEstate = 'căn hộ';
			else if (this.dynamicTitle.realEstate === 'phong-cho-thue') realEstate = 'phòng';
		}

		// if (this.dynamicTitle.isFront) front = 'mặt tiền';
		// else front = '';

		if (this.dynamicTitle.area) {
			area = this.dynamicTitle.area + 'm2';
		}

		if (this.dynamicTitle.bedroom) {
			bedroom = this.dynamicTitle.bedroom + ' phòng ngủ';
		}

		if (this.dynamicTitle.bathroom) {
			bathroom = this.dynamicTitle.bathroom + ' phòng tắm';
		}

		return type
					+((realEstate !== '')?(' ' + realEstate):'')
					+((front !== '')?(' ' + front):'')
					+((area !== '')?(' ' + area):'')
					+((bedroom !== '')?(', ' + bedroom):'')
					+((bathroom !== '')?(', ' + bathroom):'');
	},

	dynamicTitle: {
		type: '',
		realEstate: '',
		isFront: 'mặt tiền',
		area: '',
		bedroom: '',
		bathroom: ''
	},

	uploadFiles: [],
	
	getDistricts: function() {
		var that = this;

		ApiService.DistrictModel.findAll().then(function(res) {
			var districts = [];
			var selectState = $.extend({}, that.state.select);

			$.each(res.data, function(ind, elm) {
				districts.push({
					label: elm.name,
					value: elm._id
				});
			});

			selectState.district = districts;
			that.setState({ select: selectState });
		}, function(err) {
			console.log('getDistricts err', err);
		});
	},

	getWards: function(districtId) {
		var that = this;

		ApiService.WardModel.find({}, {
			query: { district: districtId }
		}).then(function(res) {
			var wards = [];
			var selectState = $.extend({}, that.state.select);

			$.each(res.data, function(ind, elm) {
				wards.push({
					label: elm.name,
					value: elm._id
				});
			});

			selectState.ward = wards;
			that.setState({ select: selectState });
		}, function(err) {
			console.log('getWards err', err);
		});
	},

	getUserInfo: function() {
		var that = this;

		ApiService.UserModel.get().then(function(res) {
			that.setState({ author: res.data._id });
			that.setState({ name: [res.data.name.first, res.data.name.last].join(' ') });
			if (res.data.phone)
				that.setState({ mobile: res.data.phone });
			else
				that.setState({ mobile: '' });				
		}, function(err) {
			console.log('getUserInfo err', err);
		});
	},

	getInitialState: function() {
		var data = {
			title: '',
			type: '',
			realEstate: '',
			district: '',
			// ward: '',
			street: '',
			address: '',
			isFront: false,
			hidePosition: '',
			latitude: '',
			longitude: '',
			price: '',
			area: '',
			bedroom: '',
			bathroom: '',
			floors: '',
			description: '',
			isProject: false,
			projectName: '',
			projectLink: '',
			direct: '',
			name: '',
			mobile: '',
			pushAds: false,
			author: '',
			publishedDate: '',
			images: null,
			select: {
				type: [],
				realEstate: [],
				district: [],
				ward: [],
				direct: [],
				floors: []
			},
			medium: false
		};

		var staticData = {
			'title': '',
			'type': '',
			'realEstate': '',
			'district': '',
			'ward': '',
			'street': '',
			'address': '',
			'isFront': false,
			'hidePosition': false,
			'latitude': 0,
			'longitude': 0,
			'price': 0,
			'area': 0,
			'bedroom': 0,
			'bathroom': 0,
			'floors': 0,
			'description': '',
			'isProject': true,
			'projectName': 'AITA',
			'projectLink': 'http://aita.vn/',
			'direct': '',
			'name': '',
			'mobile': '',
			'pushAds': true,
			'author': 0,
			'publishedDate': '2015-04-03',
			'images': '',
			'select': {
				'type': [
					{ 'label': 'Cho Thuê', 'value': 'thue' },
					{ 'label': 'Bán', 'value': 'ban' }
				],
				'realEstate': [
					{ 'label': 'Nhà', 'value': 'nha' },
					{ 'label': 'Căn Hộ', 'value': 'can-ho' },
					{ 'label': 'Phòng Cho Thuê', 'value': 'phong' }
				],
				'district': [],
				'ward': [],
				'direct': [
					{ 'label': 'Đông', 'value': 'Đông' },
					{ 'label': 'Tây', 'value': 'Tây' },
					{ 'label': 'Nam', 'value': 'Nam' },
					{ 'label': 'Bắc', 'value': 'Bắc' },
					{ 'label': 'Đông Bắc', 'value': 'Đông Bắc' },
					{ 'label': 'Đông Nam', 'value': 'Đông Nam' },
					{ 'label': 'Tây Bắc', 'value': 'Tây Bắc' },
					{ 'label': 'Tây Nam', 'value': 'Tây Nam' }
				],
				'floors': [
					{ 'label': '1', 'value': 1 },
					{ 'label': '2', 'value': 2 },
					{ 'label': '3', 'value': 3 },
					{ 'label': '4', 'value': 4 },
					{ 'label': '5', 'value': 5 }
				]
			},
			medium: false
		};
		if (isLocalEnv) {
			data = staticData;
		} else {
			data.select.type = staticData.select.type;
			data.select.realEstate = staticData.select.realEstate;
			data.select.direct = staticData.select.direct;
			data.select.floors = staticData.select.floors;
		}
		
		return data;
	},

	getCurrentDate: function() {
		var currentDate = new Date();
		this.setState({
			publishedDate: [
				currentDate.getFullYear(),
				currentDate.getMonth() + 1,
				currentDate.getDate()
			].join('-')
		});
	},

	componentWillMount: function() {
		this.getDistricts();
		this.getUserInfo();
		this.getCurrentDate();
	},

	componentDidMount: function() {
		var map, mapOptions, center, currentMarker;

		center = new google.maps.LatLng(10.81416666666667, 106.66694444444444);
		mapOptions = {
			center: center,
			zoom: 16,
			scrollwheel: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		var getLocation = function() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(showPosition);
			} else {
				console.log('Geolocation is not supported by this browser.');
			}
		};

		var showPosition = function(pos) {
			var coords = pos.coords;
			var latLng = new google.maps.LatLng(coords.latitude, coords.longitude);

			updateToInput(latLng);
			setCurrentMarker(latLng);
			map.setCenter(latLng);
		};

		var setCurrentMarker = function(latLng) {
			if (currentMarker) {
				currentMarker.setMap(null);
			}
			currentMarker = new google.maps.Marker({
				position: latLng,
				map: map,
				icon: 'http://maps.google.com/mapfiles/ms/icons/red.png'
			});
		};

		var updateToInput = function(latLng) {
			var $inputLat = $('[name="latitude"]');
			var $inputLng = $('[name="longitude"]');

			$inputLat.val(latLng.lat());
			$inputLng.val(latLng.lng());
			this.setState({
				latitude: latLng.lat(),
				longitude: latLng.lng()
			});
		}.bind(this);

		var initDangTin = function() {
			console.log('Dang Tin >>');
			getLocation();

			map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
			map.addListener('click', function(e) {
				setCurrentMarker(e.latLng);
				updateToInput(e.latLng);
			});
		};

		$('select[name="district"]').off('change').on('change', function(e) {
			var wardFilters = JSON.parse($('[name="ward-filters"]').val());
			var wardElm = $('[name="ward"]');
			var wardOpts = [];

			wardElm.empty();
			$.each(wardFilters[$(this).val()], function(ind, val) {
				wardOpts.push(['<option value="', val._id, '">', val.name, '</option>'].join(''));
			});
			wardElm.append(wardOpts);
		});

		initDangTin();

		// listen event from dropzone
		var $dropzone = $('#my-awesome-dropzone');
		// after added a file
		$dropzone.on('dropzone-success', function(a, b) {
			this.uploadFiles.push(b);
			console.log('dropzone-success', b, this.uploadFiles);
			this.setState({images: this.uploadFiles});
		}.bind(this));
		// after removed file, still not handle :v
		$dropzone.on('dropzone-removed', function(a, b) {
		}.bind(this));
	},

	handleChangeType: function(eSelect) {
		this.setState({type: eSelect.value});
		this.dynamicTitle.type = eSelect.value;
		this.setState({title: this.generateTitle()});
	},

	handleChangeRealEstate: function(eSelect) {
		this.setState({realEstate: eSelect.value});
		this.dynamicTitle.realEstate = eSelect.value;
		this.setState({title: this.generateTitle()});
	},

	handleChangeDistrict: function(eSelect) {
		this.getWards(eSelect.value);
		this.setState({ district: eSelect.value });
	},

	handleChangeWard: function(eSelect) {
		this.setState({ ward: eSelect.value });
	},

	handleChangeDirect: function(eSelect) {
		this.setState({direct: eSelect.value});
	},

	handleChangeFloors: function(eSelect) {
		this.setState({floors: eSelect.value});
	},

	handleChangeFront: function(e) {
		this.setState({isFront: !this.state.isFront});
		this.dynamicTitle.isFront = !this.state.isFront;
		this.setState({title: this.generateTitle()});
	},

	handleChangeAddress: function(e) {
		this.setState({address: e.target.value});
		this.validations.address(e.target.value);		
	},

	handleChangeLatitude: function(e) {
		this.setState({latitude: e.target.value});
	},

	handleChangeLongitude: function(e) {
		this.setState({longitude: e.target.value});
	},

	handleChangePrice: function(e) {
		var price = e.target.value.toString().replace(/,/g,'').replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,');
		this.setState({price: price});
		this.validations.price(e.target.value.toString().replace(/,/g,''));
	},

	handleChangeArea: function(e) {
		this.setState({area: e.target.value});
		this.validations.area(e.target.value);
		this.dynamicTitle.area = e.target.value;
		this.setState({title: this.generateTitle()});
	},

	handleChangeBedroom: function(e) {
		this.setState({bedroom: e.target.value});
		this.validations.bedroom(e.target.value);
		this.dynamicTitle.bedroom = e.target.value;
		this.setState({title: this.generateTitle()});
	},

	handleChangeBathroom: function(e) {
		this.setState({bathroom: e.target.value});
		this.validations.bathroom(e.target.value);
		this.dynamicTitle.bathroom = e.target.value;
		this.setState({title: this.generateTitle()});
	},

	handleChangeDescription: function(e) {
		var text = e.target.value;
		var strippedText = text.replace(/\s/g, "");
		if (strippedText.length <= 150) this.setState({description: e.target.value});
	},

	handleChangeIsProject: function(e) {
		this.setState({isProject: !this.state.isProject});
	},

	handleChangeProjectName: function(e) {
		this.setState({projectName: e.target.value});
	},

	handleChangeAuthor: function(e) {
		this.setState({author: e.target.value});
	},

	handleChangeName: function(e) {
		this.setState({name: e.target.value});
		this.validations.name(e.target.value);
	},

	handleChangeMobile: function(e) {
		this.setState({mobile: e.target.value});
		this.validations.mobile(e.target.value);
	},

	handleChangeMedium: function(e) {
		this.setState({medium: !this.state.medium});
	},

	handleChangePublishedDate: function(e) {
		this.setState({publishedDate: e.target.value});
	},

	handleSubmit: function(e) {
		e.preventDefault();
		// var states = this.state;
		// var isinValid = false;
		// $.each(states, function(key, val) {
		// 	var elm = $('.state-' + key);
		// 	if (elm.hasClass('Select') && !!!val) {
		// 		elm.find('input').focus();
		// 		isinValid = true;
		// 		return;
		// 	}
		// });
		// if (isinValid) {
		// 	return false;
		// }

		// Validations
		var isValid = true;
		var dropzone = Dropzone.forElement('#my-awesome-dropzone');

		if (!this.validations.images(dropzone.files.length)) isValid = false;
		if (!this.validations.type(this.state.type)) isValid = false;
		if (!this.validations.realEstate(this.state.realEstate)) isValid = false;
		if (!this.validations.district(this.state.district)) isValid = false;
		if (!this.validations.address(this.state.address)) isValid = false;
		if (!this.validations.price(this.state.price)) isValid = false;
		if (!this.validations.area(this.state.area)) isValid = false;
		if (!this.validations.bedroom(this.state.bedroom)) isValid = false;
		if (!this.validations.bathroom(this.state.bathroom)) isValid = false;
		if (!this.validations.name(this.state.name)) isValid = false;
		if (!this.validations.mobile(this.state.mobile)) isValid = false;

		if (!isValid) {
			window.scrollTo(0, 0);
			alert('Thông tin không hợp lệ');
			return false;
		}

		var model = _.clone(this.state);
		delete model.select;
		if (!(model.images instanceof Array)) {
			delete model.images;
		}

		if (!this.isFetching) {
			this.isFetching = true;
			
			ApiService.PostModel.add(model).then(function(data) {
				this.isFetching = false;
				window.location = '/';
			}.bind(this), function(err) {
				console.log('Add new post error', err);
			});
		}
	},

	render: function() {
		return (
			<form className='form-home' action='/add-new-post' method='post' acceptCharset='utf-8' encType='multipart/form-data' onSubmit={this.handleSubmit}>
				{/*<div className='row'>
					<div className='columns three'>
						<label>Tiêu đề</label>
					</div>
					<div className='columns nine'>
						<input disabled id="title" onChange={this.handleChangeTitle} className='u-full-width' type='text' name='title'
							value={this.state.title} />
					</div>
				</div>*/}
				{/*<div className='row'>
					<div className='columns three'>&nbsp;</div>
					<div className='columns nine'>
						<label className='checkbox-lable' htmlFor='checkbox-mat-tien'>
							<input onChange={this.handleChangeFront} type='checkbox' name='front' id='checkbox-mat-tien' checked={this.state.isFront} /> Nhà mặt tiền
						</label>
					</div>
				</div>*/}
				<div className='row'>
					<div className='columns three'>
						<label>Hình thức</label>
					</div>
					<div className='columns four'>
						<Select id='state-type' name='state-type' className='state-type' value={this.state.type} options={this.state.select.type} onChange={this.handleChangeType} />
					</div>
					<div className='columns three'>
						<span id='state-type-error-msg' name='state-type-error-msg' className='error-tips'>* bắt buộc</span>
					</div>
				</div>
				<div className='row'>
					<div className='columns three'>
						<label>Nhà / Căn Hộ / Phòng</label>
					</div>
					<div className='columns four'>
						<Select id='state-realEstate' name='state-realEstate' className='state-realEstate' value={this.state.realEstate} options={this.state.select.realEstate} onChange={this.handleChangeRealEstate} />
					</div>
					<div className='columns three'>
						<span id='state-realEstate-error-msg' name='state-realEstate-error-msg' className='error-tips'>* bắt buộc</span>
					</div>
				</div>
				<div className='row'>
					<div className='columns three'>
						<label>Quận/Huyện (Tp. HCM)</label>
					</div>
					<div className='columns four'>
						<Select id='state-district' name='state-district' className='state-district' value={this.state.district} options={this.state.select.district} onChange={this.handleChangeDistrict} />
					</div>
					<div className='columns three'>
						<span id='state-district-error-msg' name='state-district-error-msg' className='error-tips'>* bắt buộc</span>
					</div>
				</div>
				{/*<div className='row'>
					<div className='columns three'>
						<label>Phường/Xã</label>
					</div>
					<div className='columns four'>
						<Select className='state-ward' value={this.state.ward} options={this.state.select.ward} onChange={this.handleChangeWard} />
					</div>
				</div>*/}
				<div className='row'>
					<div className='columns three'>
						<label>Địa chỉ</label>
					</div>
					<div className='columns nine'>
						<input id='address' onChange={this.handleChangeAddress} className='u-full-width' style={{marginBottom: 0}} type='text' name='address' 
							placeholder='43, Đường 17, Kp6, Hiệp Bình Chánh, Thủ Đức, HCM' value={this.state.address} />
						<span id='address-error-msg' name='address-error-msg' className='error-tips'>* bắt buộc</span>
					</div>
				</div>
				{/*<div className='row'>
					<div className='columns three'>
						<label>Địa chỉ đầy đủ</label>
					</div>
					<div className='columns nine'>
						<input disabled className='u-full-width' type='text' name='address' 
							placeholder='43, Đường 17, Kp6, Hiệp Bình Chánh, Thủ Đức, HCM' value={this.state.address} />
					</div>
				</div>*/}
				<div className='row'>
					<div className='columns three'>
						<label className='group-title'>Vị trí trên bản đồ</label>
					</div>
					<div className='columns nine'>
						<div className='input-map'>
							<div id='google-map' className='google-map-block google-map-detail'></div>
						</div>
						<div className='clear-top'></div>
						<p><small>(*) Nhấp để chọn vị trí trên bản đồ</small></p>
						<input type='hidden' name='latitude' value={this.state.latitude} onChange={this.handleChangeLatitude} />
						<input type='hidden' name='longitude' value={this.state.longitude} onChange={this.handleChangeLongitude} />
					</div>
				</div>
				<div className='row'>
					<div className='columns three'>
						<label>Diện tích (m²)</label>
					</div>
					<div className='columns nine'>
						<input id='area' onChange={this.handleChangeArea} className='form-control' style={{'marginBottom': 0}} type='text' name='area' value={this.state.area} />
						<span id='area-error-msg' name='area-error-msg' className='error-tips' style={{display: 'block'}}>* bắt buộc, là số nguyên và lớn hơn 0</span>
					</div>
				</div>
				<div className='row'>
					<div className='columns three'>
						<label>Số phòng ngủ</label>
					</div>
					<div className='columns nine'>
						<input id='bedroom' onChange={this.handleChangeBedroom} className='form-control' style={{'marginBottom': 0}} type='text' name='bedroom' value={this.state.bedroom} />
						<span id='bedroom-error-msg' name='bedroom-error-msg' className='error-tips' style={{display: 'block'}}>* bắt buộc và là số nguyên</span>
					</div>
				</div>
				<div className='row'>
					<div className='columns three'>
						<label>Số phòng tắm</label>
					</div>
					<div className='columns nine'>
						<input id='bathroom' onChange={this.handleChangeBathroom} className='form-control' style={{'marginBottom': 0}} type='text' name='bathroom' value={this.state.bathroom} />
						<span id='bathroom-error-msg' name='bathroom-error-msg' className='error-tips' style={{display: 'block'}}>* bắt buộc và là số nguyên</span>
					</div>
				</div>
				<div className='row'>
					<div className='columns three'>
						<label>Giá (VNĐ)</label>
					</div>
					<div className='columns nine'>
						<input id='price' onChange={this.handleChangePrice} className='form-control' style={{'marginBottom': 0}} type='text' name='price' value={this.state.price} />
						<span id='price-error-msg' name='price-error-msg' className='error-tips' style={{display: 'block'}}>* bắt buộc, là số nguyên và lớn hơn 0</span>
					</div>
				</div>
				<div className='row'>
					<div className='columns three'>
						<label className='group-title'>Thông tin mô tả (150 kí tự)</label>
					</div>
					<div className='columns nine control'>
						<textarea id='description' onChange={this.handleChangeDescription} row='4' className='form-control control--textarea' name='description' placeholder='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil dolore, harum quaerat facere rerum, fugiat ipsam magni ut atque voluptas?' value={this.state.description}></textarea>
					</div>
				</div>

				{/*<div className='row'>
					<div className='columns three'>&nbsp;</div>
					<div className='columns nine'>
						<label htmlhtmlFor='push-ads'>
							<input type='checkbox' name='pushAds' id='push-ads' className='form-control' /> Chạy quảng cáo
						</label>
					</div>
				</div>*/}

				<p className='form-title'>Thông tin thêm</p>
				<div className='row'>
					<div className='columns three'>&nbsp;</div>
					<div className='columns nine'>
						<label>
							<input id='isProject' onChange={this.handleChangeIsProject} className='form-control' type='checkbox' name='isProject' checked={this.state.isProject} /> Chọn nếu nhà thuộc dự án
						</label>
					</div>
				</div>
				<div className='row'>
					<div className='columns three'>
						<label htmlFor=''>Tên dự án</label>
					</div>
					<div className='columns nine'>
						<input onChange={this.handleChangeProjectName} type='text' id='project-name' name='projectName' value={this.state.projectName} />
					</div>
				</div>
				<div className='row'>
					<div className='columns three'>
						<label>Hướng</label>
					</div>
					<div className='columns four'>
						<Select className='state-direct' value={this.state.direct} options={this.state.select.direct} onChange={this.handleChangeDirect} />
					</div>
				</div>
				<div className='row'>
					<div className='columns three'>
						<label>Số tầng</label>
					</div>
					<div className='columns four'>
						<Select className='state-floors' value={this.state.floors} options={this.state.select.floors} onChange={this.handleChangeFloors} />
					</div>
				</div>

				<p className='form-title'>Thông tin liên lạc</p>
				<div className='row'>
					<div className='columns three'>
						<label htmlFor=''>Tên (*)</label>
					</div>
					<div className='columns six'>
						<input onChange={this.handleChangeAuthor} type='hidden' name='author' value={this.state.author} />
						<input id='name' onChange={this.handleChangeName} className='form-control' type='text' name='name' value={this.state.name} />
						<span id='name-error-msg' name='name-error-msg' className='error-tips' style={{marginLeft: '15px'}}>* bắt buộc</span>
					</div>
				</div>
				<div className='row'>
					<div className='columns three'>
						<label htmlFor=''>Số điện thoại (*)</label>
					</div>
					<div className='columns nine'>
						<input id='mobile' onChange={this.handleChangeMobile} className='form-control' type='text' name='mobile' value={this.state.mobile} />
						<span id='mobile-error-msg' name='mobile-error-msg' className='error-tips' style={{marginLeft: '15px'}}>* bắt buộc</span>
					</div>
				</div>
				<div className='row'>
					<div className='columns three'>&nbsp;</div>
					<div className='columns nine'>
						<label className='checkbox-lable'>
							<input onChange={this.handleChangeMedium} type='checkbox' name='medium' checked={this.state.medium} /> Tiếp môi giới
						</label>
					</div>
				</div>

				<p className='form-title'>Hoàn tất</p>
				<div className='row'>
					<div className='columns three'>&nbsp;</div>
					<div className='columns nine'>
						<p>
							<small>(*)Tin đăng của bạn sẽ được kiểm duyệt trong vòng 1 giờ trước khi được đăng.</small>
						</p>
						<input onChange={this.handleChangePublishedDate} type='hidden' name='publishedDate' value={this.state.publishedDate} />
						<a href='/' className='button'>Hủy</a> <button className='button-primary' type='submit'>Đăng tin</button>
					</div>
				</div>
			</form>
		);
	}
});

window.AddNewPostForm = AddNewPostForm;

if ($('.js-container').hasClass('jspage-dang-tin')) {
	ReactDOM.render(<AddNewPostForm />, document.getElementById('add-new-post'));
}
