'use strict';
var React      = require('react');
var mapMixin   = require('./mixins/mapMixin.js');
var api        = require('./server-api.js');
var styles     = require('./styles.js');

var mapOptions = {
	center: {
		lat: 40.4122994,
		lng: -111.75418
	},
	zoom:            14,
	scrollwheel: false
}

var Map = React.createClass({
	mixins: [mapMixin],

	getInitialState: function () {
		return {
			map: undefined,
		}
	},

	initializeMap: function () {
		var map = new google.maps.Map($('.map-canvas')[0], mapOptions);
		
		this.setState({
			map:map,
		});

		this.state.map = map;
	},

	setRequest: function (request) {
		var latLng = new google.maps.LatLng(request.lat, request.long);
		var marker = new google.maps.Marker({
			animation: google.maps.Animation.DROP,
			draggable: false,
			position: latLng
		});

		marker.setMap(this.state.map);

		if (!isUndefined(request.media_url)) {
			var infoWindow = new google.maps.InfoWindow({
				content: '<img src="'+request.media_url+'"/>'
			});
			infoWindow.open(this.state.map, marker);
		}

		this.state.map.setCenter(latLng);
		this.state.map.setZoom(17);
	},

	componentDidMount: function () {
		$(document).ready(function(){this.initializeMap()}.bind(this));
	},

	render: function () {

		var style = {
			width:     '100%',
			minHeight: 500
		}

		return (
			<div style={style} className='map-canvas'></div>
		)
	}

});

module.exports = Map;