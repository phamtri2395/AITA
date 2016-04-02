/**
 * Aita 2016
 */

if ($('.js-container').hasClass('jspage-dang-tin')) {
	var AddNewPostForm = React.createClass({
		uploadFiles: [],

		getDistricts: function() {
			var self = this;

			ApiService.DistrictModel.all().then(function(res) {
				var districtOptions = [];
				$.each(res.data, function(ind, elm) {
					districtOptions.push({
						label: elm.name,
						value: elm._id
					});
				});
				self.setState({districtOptions: districtOptions});
			}, function(err) {
				console.log('err', err);
			});
		},

		getInitialState: function() {
			console.log('getInitialState');
			return {
				currentDate: this.getCurrentDate(),
				typeVal: 'Bán',
				typeOptions: [
					{label: 'Mua', value: 'mua'},
					{label: 'Bán', value: 'ban'}
				],
				realEstateVal: '',
				realEstateOptions: [
					{label: 'Nhà', value: 'nha'},
					{label: 'Căn hộ', value: 'can-ho'},
					{label: 'Phòng cho thuê', value: 'phong'}
				],
				districtVal: 'Quận 1',
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

		componentWillMount: function() {
			console.log('componentWillMount');
			this.getDistricts();
		},
		componentDidMount: function() {
			console.log('componentDidMount');
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

		handleChange: function() {
		},

		handleChangeType: function(val) {
			this.setState({typeVal: val});
		},

		handleChangeRealEstate: function(val) {
			this.setState({realEstateVal: val});
		},

		handleChangeDistrict: function(val) {
			this.setState({districtVal: val});
		},

		handleChangeWard: function(val) {
			this.setState({wardVal: val});
		},

		handleChangeDirect: function(val) {
			this.setState({directVal: val});
		},

		handleChangeFloor: function(val) {
			this.setState({floorVal: val});
		},

		render: function() {
			return (
				<form className='form-home' action='/add-new-post' method='post' acceptCharset='utf-8' encType='multipart/form-data'>
					
					<div className='row'>
						<div className='columns three'>
							<label>Tiêu đề</label>
						</div>
						<div className='columns nine'>
							<input onChange={this.handleChange} className='u-full-width' type='text' name='title' required='required' 
								placeholder='Bán nhà mặt tiền 100m2, 2 phòng ngủ, 2 phòng tắm' defaultValue='Bán nhà mặt tiền 100m2, 2 phòng ngủ, 2 phòng tắm' />
						</div>
					</div>
					<div className='row'>
						<div className='columns three'>&nbsp;</div>
						<div className='columns nine'>
							<label className='checkbox-lable' htmlFor='checkbox-mat-tien'>
								<input onChange={this.handleChange} type='checkbox' name='front' id='checkbox-mat-tien' /> Nhà mặt tiền
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
							<input onChange={this.handleChange} className='u-full-width' type='text' name='street' required='required' 
								value='43, Đường 17, Kp6, Hiệp Bình Chánh, Thủ Đức, HCM' defaultValue='43, Đường 17, Kp6, Hiệp Bình Chánh, Thủ Đức, HCM' />
						</div>
					</div>
					<div className='row'>
						<div className='columns three'>
							<label>Địa chỉ đầy đủ</label>
						</div>
						<div className='columns nine'>
							<input onChange={this.handleChange} disabled className='u-full-width' type='text' name='address' required='required' 
								placeholder='43, Đường 17, Kp6, Hiệp Bình Chánh, Thủ Đức, HCM' defaultValue='43, Đường 17, Kp6, Hiệp Bình Chánh, Thủ Đức, HCM' />
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
							<input onChange={this.handleChange} type='hidden' name='latitude' />
							<input onChange={this.handleChange} type='hidden' name='longitude' />
						</div>
					</div>
					<div className='row'>
						<div className='columns three'>
							<label>Giá (VNĐ)</label>
						</div>
						<div className='columns nine'>
							<input onChange={this.handleChange} className='form-control' type='text' name='price' required='required' defaultValue='1000' />
						</div>
					</div>
					<div className='row'>
						<div className='columns three'>
							<label>Diện tích (m²)</label>
						</div>
						<div className='columns nine'>
							<input onChange={this.handleChange} className='form-control' type='text' name='area' required='required' defaultValue='40' />
						</div>
					</div>
					<div className='row'>
						<div className='columns three'>
							<label>Số phòng ngủ</label>
						</div>
						<div className='columns nine'>
							<input onChange={this.handleChange} className='form-control' type='text' name='bedroom' required='required' defaultValue='2' />
						</div>
					</div>
					<div className='row'>
						<div className='columns three'>
							<label>Số phòng tắm</label>
						</div>
						<div className='columns nine'>
							<input onChange={this.handleChange} className='form-control' type='text' name='bathroom' required='required' defaultValue='2' />
						</div>
					</div>
					<div className='row'>
						<div className='columns three'>
							<label className='group-title'>Thông tin mô tả</label>
						</div>
						<div className='columns nine control'>
							<textarea row='4' className='form-control control--textarea' name='description' defaultValue='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'></textarea>
						</div>
					</div>
					{/*<div className='row'>
						<div className='columns three'>&nbsp;</div>
						<div className='columns nine'>
							<label htmlhtmlFor='push-ads'>
								<input onChange={this.handleChange} type='checkbox' name='pushAds' id='push-ads' className='form-control' /> Chạy quảng cáo
							</label>
						</div>
					</div>*/}

					<p className='form-title'>Thông tin thêm</p>
					<div className='row'>
						<div className='columns three'>&nbsp;</div>
						<div className='columns nine'>
							<label>
								<input onChange={this.handleChange} className='form-control' type='checkbox' name='isProject' required='required' checked='checked' /> Chọn nếu nhà thuộc dự án
							</label>
						</div>
					</div>
					<div className='row'>
						<div className='columns three'>
							<label htmlFor=''>Tên dự án</label>
						</div>
						<div className='columns nine'>
							<input onChange={this.handleChange} type='text' id='project-name' name='project-name' />
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
							<input onChange={this.handleChange} type='text' id='highway' className='form-control' name='highway' required='required' defaultValue='25' />
						</div>
					</div>

					<p className='form-title'>Thông tin liên lạc</p>
					<div className='row'>
						<div className='columns three'>
							<label htmlFor=''>Tên (*)</label>
						</div>
						<div className='columns nine'>
							<input onChange={this.handleChange} type='hidden' name='author' />
							<input onChange={this.handleChange} className='form-control' type='text' name='authorName' required='required' defaultValue='Tam Pham' />
						</div>
					</div>
					<div className='row'>
						<div className='columns three'>
							<label htmlFor=''>Số điện thoại (*)</label>
						</div>
						<div className='columns nine'>
							<input onChange={this.handleChange} className='form-control' type='text' name='mobile' required='required' value='01643652922' />
						</div>
					</div>
					<div className='row'>
						<div className='columns three'>&nbsp;</div>
						<div className='columns nine'>
							<label className='checkbox-lable'>
								<input onChange={this.handleChange} type='checkbox' name='medium' /> Tiếp môi giới
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
							<input onChange={this.handleChange} type='hidden' name='ward-filters' defaultValue='json data.filters' />
							<input onChange={this.handleChange} type='hidden' name='publishedDate' defaultValue={this.state.currentDate} />
							<button className='' type='submit'>Hủy</button> <button className='button-primary' type='submit'>Đăng tin</button>
						</div>
					</div>
				</form>
			);
		}
	});

	ReactDOM.render(<AddNewPostForm />, document.getElementById('add-new-post'))
}
