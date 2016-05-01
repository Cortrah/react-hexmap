'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var React = require('react');
var ReactDOM = require('react-dom');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var Hex = require('./Hex');
var Gsap = require('gsap');

var ReactHexmap = React.createClass({
	displayName: 'ReactHexmap',

	mixins: [PureRenderMixin],

	getInitialState: function getInitialState() {
		return {
			r: 32,
			basePath: this.getPath(32),
			secondsElapsed: 0,
			scale: 1,
			currentFill: "#f3f3f3",
			zooming: false
		};
	},

	tick: function tick() {
		this.setState({
			secondsElapsed: this.state.secondsElapsed + 1
		});
	},

	componentDidMount: function componentDidMount() {
		//this.interval = setInterval(this.tick, 1000);
	},

	componentWillUnmount: function componentWillUnmount() {
		//clearInterval(this.interval);
	},

	changeRadius: function changeRadius() {
		var newRadius = parseInt(Math.max(5, Math.random() * 100));
		this.setState({
			r: newRadius,
			basePath: this.getPath(newRadius)
		});
	},

	changeTerrainClear: function changeTerrainClear() {
		this.setState({
			currentFill: "#C9AC68"
		});
	},
	changeTerrainHills: function changeTerrainHills() {
		this.setState({
			currentFill: "#737144"
		});
	},
	changeTerrainForest: function changeTerrainForest() {
		this.setState({
			currentFill: "#839922"
		});
	},
	changeTerrainWater: function changeTerrainWater() {
		this.setState({
			currentFill: "#7895A4"
		});
	},

	getTerrainFill: function getTerrainFill() {
		return this.state.currentFill;
	},

	isZooming: function isZooming() {
		return this.state.zooming;
	},

	getPath: function getPath(r) {
		var cx = r;
		var cy = Math.sqrt(3) / 2 * r;

		var x1 = r / 2;
		var y1 = 0;

		var x2 = r + x1;
		var y2 = 0;

		var x3 = 2 * r;
		var y3 = cy;

		var x4 = x2;
		var y4 = cy * 2;

		var x5 = x1;
		var y5 = cy * 2;

		var x6 = 0;
		var y6 = cy;

		var hexPath = "M " + x1 + ", " + y1 + " " + "L " + x2 + ", " + y2 + " " + "L " + x3 + ", " + y3 + " " + "L " + x4 + ", " + y4 + " " + "L " + x5 + ", " + y5 + " " + "L " + x6 + ", " + y6 + " z";

		return hexPath;
	},

	zoomIn: function zoomIn() {
		var newZoom = Math.min(this.state.scale + 1, 5);
		this.gotoScale(newZoom);
	},

	zoomOut: function zoomOut() {
		var newZoom = Math.max(this.state.scale - 1, 1);
		this.gotoScale(newZoom);
	},

	gotoScale: function gotoScale(newZoom) {
		this.setState({
			scale: newZoom,
			zooming: true
		});

		console.log(this.state.scale);
		var map = this.refs.svgContainer;
		TweenMax.to(map, 1, {
			scale: this.state.scale,
			transformOrigin: "left top",
			ease: Power1.easeInOut,
			onComplete: this.doneScaling
		});
	},

	doneScaling: function doneScaling() {
		this.setState({
			zooming: false
		});
	},

	render: function render() {
		var r = this.state.r;
		var basePath = this.state.basePath;

		var rows = [];
		for (var x = 0; x < 40; x++) {
			for (var y = 0; y < 40; y++) {
				if (x % 2 === 0) {
					// even
					rows.push(React.createElement(Hex, {
						key: x + '-' + y,
						x: 3 * r * y,
						y: 7 * r * x / 8,
						r: r,
						basePath: basePath,
						getTerrainFill: this.getTerrainFill,
						isZooming: this.isZooming
					}));
				} else {
					// odd
					rows.push(React.createElement(Hex, {
						key: x + '-' + y,
						x: 3 * r * y + 3 * r / 2,
						y: 7 * r * x / 8,
						r: r,
						basePath: basePath,
						getTerrainFill: this.getTerrainFill,
						isZooming: this.isZooming
					}));
				}
			}
		}

		return React.createElement(
			'section',
			null,
			React.createElement(
				'div',
				{ className: 'mapZoomControls' },
				React.createElement(
					'button',
					{ onClick: this.zoomOut },
					'-'
				),
				React.createElement(
					'button',
					{ onClick: this.zoomIn },
					'+'
				),
				React.createElement(
					'button',
					{ onClick: this.changeRadius },
					'change radius'
				)
			),
			React.createElement(
				'div',
				{ className: 'mapControls panel panel-primary panel-fixed' },
				React.createElement(
					'button',
					{ onClick: this.changeTerrainClear },
					' clear '
				),
				React.createElement(
					'button',
					{ onClick: this.changeTerrainHills },
					' hills '
				),
				React.createElement(
					'button',
					{ onClick: this.changeTerrainForest },
					' forest '
				),
				React.createElement(
					'button',
					{ onClick: this.changeTerrainWater },
					' water '
				)
			),
			React.createElement(
				'div',
				{ ref: 'scrollContainer',
					className: "scroll-container" },
				React.createElement(
					'svg',
					{ ref: 'svgContainer',
						xmlns: 'http://www.w3.org/2000/svg',
						width: '800px', height: '800px',
						viewBox: '0 0 800 800',
						className: "svg-container" },
					rows
				)
			)
		);
	}
});

exports['default'] = ReactHexmap;
module.exports = exports['default'];