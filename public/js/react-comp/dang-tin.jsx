/**
 * Aita 2016
 */

var AddNewPostForm = React.createClass({
	uploadFiles: [],

	getDistricts: function() {
		var that = this;

		ApiService.DistrictModel.all().then(function(res) {
			var districtOptions = [];
			$.each(res.data, function(ind, elm) {
				districtOptions.push({
					label: elm.name,
					value: elm._id
				});
			});
			that.setState({districtOptions: districtOptions});
		}, function(err) {
			console.log('getDistricts err', err);
		});
	},

	getUserInfo: function() {
		var that = this;

		ApiService.UserModel.get().then(function(res) {
			that.setState({user: res.data});
			that.setState({authorId: res.data._id});
			that.setState({name: [res.data.name.first, res.data.name.last].join(' ')});
			that.setState({mobile: res.data.mobile});
		}, function(err) {
			console.log('getUserInfo err', err)
		});
	},

	getInitialState: function() {
		return {
			title: 'Bán nhà mặt tiền 100m2, 2 phòng ngủ, 2 phòng tắm',
			isFront: false,
			street: '43, Đường 17, Kp6, Hiệp Bình Chánh, Thủ Đức, HCM',
			address: '43, Đường 17, Kp6, Hiệp Bình Chánh, Thủ Đức, HCM',
			latitude: '',
			longitude: '',
			price: 1111,
			area: 4444,
			bedroom: 2,
			bathroom: 2,
			description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
			isProject: true,
			projectName: '',
			highway: 25,
			authorId: '',
			user: null,
			publishedDate: this.getCurrentDate(),
			medium: false,
			mobile: '',
			name: '',
			typeVal: 'Cho Thuê',
			typeOptions: [
				{label: 'Cho Thuê', value: 'thue'},
				{label: 'Bán', value: 'ban'},
			],
			realEstateVal: 'Phòng Cho Thuê',
			realEstateOptions: [
				{label: 'Nhà', value: 'nha'},
				{label: 'Căn Hộ', value: 'can-ho'},
				{label: 'Phòng Cho Thuê', value: 'phong'}
			],
			districtVal: '',
			districtOptions: [],
			wardVal: 'Phường 1',
			wardOptions: [
				{label: 'Phường 1', value: 1},
				{label: 'Phường 2', value: 2},
				{label: 'Phường 3', value: 3},
				{label: 'Phường 3', value: 3},
				{label: 'Phường 4', value: 4},
				{label: 'Phường 5', value: 5},
				{label: 'Phường 6', value: 6},
				{label: 'Phường 7', value: 7},
				{label: 'Phường 8', value: 8},
				{label: 'Phường 9', value: 9},
				{label: 'Phường 10', value: 10}
			],
			directVal: 'Đông',
			directOptions: [
				{label: 'Đông', value: 1},
				{label: 'Tây', value: 2},
				{label: 'Nam', value: 3},
				{label: 'Bắc', value: 4},
				{label: 'Đông Bắc', value: 5},
				{label: 'Đông Nam', value: 6},
				{label: 'Tây Bắc', value: 7},
				{label: 'Tây Nam', value: 8}
			],
			floorVal: 1,
			floorOptions: [
				{label: '1', value: '1'},
				{label: '2', value: '2'},
				{label: '3', value: '3'},
				{label: '4', value: '4'},
				{label: '5', value: '5'},
			]
		};
	},

	getCurrentDate: function() {
		var currentDate = new Date();
		return [
			currentDate.getFullYear(),
			currentDate.getMonth() + 1,
			currentDate.getDate()
		].join('-');
	},

	getAuthorId: function() {
		console.log('getAuthorId');
		if (this.state.user) {
			console.log('getAuthorId true');
			this.setState({authorId: this.state.user._id});
		}
	},

	componentWillMount: function() {
		this.getDistricts();
		this.getUserInfo();
	},

	componentDidMount: function() {
		var map, mapOptions, center, currentMarker;
		// var myDropzone = new Dropzone('#js-dropzone-component', { url: '/uploadHandler' });
		// var myDropzone = $('div#js-dropzone-component').dropzone({ url: '/uploadHandler' });

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
		};

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
		}.bind(this));
		// after removed file, still not handle :v
		$dropzone.on('dropzone-removed', function(a, b) {
		}.bind(this));
	},

	handleChangeType: function(eSelect) {
		this.setState({typeVal: eSelect.value});
	},

	handleChangeRealEstate: function(eSelect) {
		this.setState({realEstateVal: eSelect.value});
	},

	handleChangeDistrict: function(eSelect) {
		this.setState({districtVal: eSelect.value});
	},

	handleChangeWard: function(eSelect) {
		this.setState({wardVal: eSelect.value});
	},

	handleChangeDirect: function(eSelect) {
		this.setState({directVal: eSelect.value});
	},

	handleChangeFloor: function(eSelect) {
		this.setState({floorVal: eSelect.value});
	},

	handleChangeTitle: function(e) {
		this.setState({title: e.target.value});
	},

	handleChangeFront: function(e) {
		this.setState({isFront: e.target.value});
	},

	handleChangeStreet: function(e) {
		this.setState({street: e.target.value});
	},

	handleChangeLatitude: function(e) {
		this.setState({latitude: e.target.value});
	},

	handleChangeLongitude: function(e) {
		this.setState({longitude: e.target.value});
	},

	handleChangePrice: function(e) {
		this.setState({price: e.target.value});
	},

	handleChangeArea: function(e) {
		this.setState({area: e.target.value});
	},

	handleChangeBedroom: function(e) {
		this.setState({bedroom: e.target.value});
	},

	handleChangeBathroom: function(e) {
		this.setState({bathroom: e.target.value});
	},

	handleChangeDescription: function(e) {
		this.setState({description: e.target.value});
	},

	handleChangeIsProject: function(e) {
		this.setState({isProject: e.target.value});
	},

	handleChangeProjectName: function(e) {
		this.setState({projectName: e.target.value});
	},

	handleChangeHighway: function(e) {
		this.setState({highway: e.target.value});
	},

	handleChangeAuthorId: function(e) {
		this.setState({authorId: e.target.value});
	},

	handleChangeName: function(e) {
		this.setState({name: e.target.value});
	},

	handleChangeMobile: function(e) {
		this.setState({mobile: e.target.value});
	},

	handleChangeMedium: function(e) {
		this.setState({medium: e.target.value});
	},

	handleChangePublishedDate: function(e) {
		this.setState({publishedDate: e.target.value});
	},

	handleSubmit: function(e) {
		e.preventDefault();

		if (!this.state.title) {
			return;
		}

		if (!this.state.districtVal) {
			return;
		}

		ApiService.PostModel.add({
			title: this.state.title,
			isFront: this.state.isFront,
			type: this.state.typeVal,
			realEstate: this.state.realEstateVal,
			district: this.state.districtVal,
			// ward: this.state.wardVal, // temp hide
			street: this.state.street,
			address: this.state.address,
			latitude: this.state.latitude,
			longitude: this.state.longitude,
			price: this.state.price,
			area: this.state.area,
			bedroom: this.state.bedroom,
			bathroom: this.state.bathroom,
			description: this.state.description,
			isProject: this.state.isProject,
			projectName: this.state.projectName,
			direct: this.state.directVal,
			floors: this.state.floorVal,
			highway: this.state.highway,
			name: this.state.name,
			author: this.state.authorId,
			publishedDate: this.state.publishedDate,
			medium: this.state.medium,
			mobile: this.state.mobile,
			uploadFiles: this.uploadFiles
		}).then(function(res) {
			console.log(res);
			window.location = '/'; 
		}, function(err) {
			console.log(err);
		});
	},

	render: function() {
		return (
			<form className='form-home' action='/add-new-post' method='post' acceptCharset='utf-8' encType='multipart/form-data' onSubmit={this.handleSubmit}>
				
				<div className='row'>
					<div className='columns three'>
						<label>Tiêu đề</label>
					</div>
					<div className='columns nine'>
						<input onChange={this.handleChangeTitle} className='u-full-width' type='text' name='title' required='required' 
							placeholder='Bán nhà mặt tiền 100m2, 2 phòng ngủ, 2 phòng tắm' value={this.state.title} />
					</div>
				</div>
				<div className='row'>
					<div className='columns three'>&nbsp;</div>
					<div className='columns nine'>
						<label className='checkbox-lable' htmlFor='checkbox-mat-tien'>
							<input onChange={this.handleChangeFront} type='checkbox' name='front' id='checkbox-mat-tien' checked={this.state.isFront} /> Nhà mặt tiền
						</label>
					</div>
				</div>
				<div className='row'>
					<div className='columns three'>
						<label>Loại hình</label>
					</div>
					<div className='columns four'>
						<Select value={this.state.typeVal} options={this.state.typeOptions} onChange={this.handleChangeType} />
					</div>
				</div>
				<div className='row'>
					<div className='columns three'>
						<label>Nhà / Căn Hộ / Phòng</label>
					</div>
					<div className='columns four'>
						<Select value={this.state.realEstateVal} options={this.state.realEstateOptions} onChange={this.handleChangeRealEstate} />
					</div>
				</div>
				<div className='row'>
					<div className='columns three'>
						<label>Quận/Huyện (Tp. HCM)</label>
					</div>
					<div className='columns four'>
						<Select value={this.state.districtVal} options={this.state.districtOptions} onChange={this.handleChangeDistrict} />
					</div>
				</div>
				<div className='row'>
					<div className='columns three'>
						<label>Phường/Xã</label>
					</div>
					<div className='columns four'>
						<Select value={this.state.wardVal} options={this.state.wardOptions} onChange={this.handleChangeWard} />
					</div>
				</div>
				<div className='row'>
					<div className='columns three'>
						<label>Đường</label>
					</div>
					<div className='columns nine'>
						<input onChange={this.handleChangeStreet} className='u-full-width' type='text' name='street' required='required' 
							value='43, Đường 17, Kp6, Hiệp Bình Chánh, Thủ Đức, HCM' value={this.state.street} />
					</div>
				</div>
				<div className='row'>
					<div className='columns three'>
						<label>Địa chỉ đầy đủ</label>
					</div>
					<div className='columns nine'>
						<input disabled className='u-full-width' type='text' name='address' required='required' 
							placeholder='43, Đường 17, Kp6, Hiệp Bình Chánh, Thủ Đức, HCM' value={this.state.address} />
					</div>
				</div>
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
						<label>Giá (VNĐ)</label>
					</div>
					<div className='columns nine'>
						<input onChange={this.handleChangePrice} className='form-control' type='text' name='price' required='required' value={this.state.price} />
					</div>
				</div>
				<div className='row'>
					<div className='columns three'>
						<label>Diện tích (m²)</label>
					</div>
					<div className='columns nine'>
						<input onChange={this.handleChangeArea} className='form-control' type='text' name='area' required='required' value={this.state.area} />
					</div>
				</div>
				<div className='row'>
					<div className='columns three'>
						<label>Số phòng ngủ</label>
					</div>
					<div className='columns nine'>
						<input onChange={this.handleChangeBedroom} className='form-control' type='text' name='bedroom' required='required' value={this.state.bedroom} />
					</div>
				</div>
				<div className='row'>
					<div className='columns three'>
						<label>Số phòng tắm</label>
					</div>
					<div className='columns nine'>
						<input onChange={this.handleChangeBathroom} className='form-control' type='text' name='bathroom' required='required' value={this.state.bathroom} />
					</div>
				</div>
				<div className='row'>
					<div className='columns three'>
						<label className='group-title'>Thông tin mô tả</label>
					</div>
					<div className='columns nine control'>
						<textarea onChange={this.handleChangeDescription} row='4' className='form-control control--textarea' name='description' value={this.state.description}></textarea>
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
							<input onChange={this.handleChangeIsProject} className='form-control' type='checkbox' name='isProject' required='required' checked={this.state.isProject} /> Chọn nếu nhà thuộc dự án
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
						<Select value={this.state.directVal} options={this.state.directOptions} onChange={this.handleChangeDirect} />
					</div>
				</div>
				<div className='row'>
					<div className='columns three'>
						<label>Số tầng</label>
					</div>
					<div className='columns four'>
						<Select value={this.state.floorVal} options={this.state.floorOptions} onChange={this.handleChangeFloor} />
					</div>
				</div>
				<div className='row'>
					<div className='columns three'>
						<label htmlFor=''>Lộ giới (m)</label>
					</div>
					<div className='columns nine'>
						<input onChange={this.handleChangeHighway} type='text' id='highway' className='form-control' name='highway' required='required' value={this.state.highway} />
					</div>
				</div>

				<p className='form-title'>Thông tin liên lạc</p>
				<div className='row'>
					<div className='columns three'>
						<label htmlFor=''>Tên (*)</label>
					</div>
					<div className='columns nine'>
						<input onChange={this.handleChangeAuthorId} type='hidden' name='author' value={this.state.authorId} />
						<input onChange={this.handleChangeName} className='form-control' type='text' name='name' required='required' value={this.state.name} />
					</div>
				</div>
				<div className='row'>
					<div className='columns three'>
						<label htmlFor=''>Số điện thoại (*)</label>
					</div>
					<div className='columns nine'>
						<input onChange={this.handleChangeMobile} className='form-control' type='text' name='mobile' required='required' value={this.state.mobile} />
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
						<button className='' type='submit'>Hủy</button> <button className='button-primary' type='submit'>Đăng tin</button>
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
