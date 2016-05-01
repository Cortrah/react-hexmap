'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var React = require('react');
var ReactDOM = require('react-dom');

var Hex = React.createClass({
    displayName: 'Hex',

    propTypes: {
        r: React.PropTypes.number.isRequired,
        x: React.PropTypes.number.isRequired,
        y: React.PropTypes.number.isRequired,
        basePath: React.PropTypes.string.isRequired,
        getTerrainFill: React.PropTypes.func.isRequired,
        isZooming: React.PropTypes.func.isRequired
    },

    getDefaultProps: function getDefaultProps() {
        return {
            type: 'hex'
        };
    },

    componentWillMount: function componentWillMount() {},
    componentDidMount: function componentDidMount() {},
    componentWillReceiveProps: function componentWillReceiveProps() {},
    shouldComponentUpdate: function shouldComponentUpdate() {
        return !this.props.isZooming();
    },
    componentWillUpdate: function componentWillUpdate() {},
    componentDidUpdate: function componentDidUpdate() {},

    getInitialState: function getInitialState() {
        return {
            strokeW: 1,
            fillCol: "#f3f3f3",
            strokeCol: "#333333"
        };
    },

    changeColor: function changeColor() {
        var newColor = this.props.getTerrainFill();
        this.setState({ fillCol: newColor });
    },
    handleMouseUp: function handleMouseUp() {},
    handleMouseOver: function handleMouseOver() {},
    handleMouseOut: function handleMouseOut() {},

    render: function render() {

        return React.createElement(
            'svg',
            { className: 'hex',
                x: this.props.x,
                y: this.props.y,
                onMouseDown: this.handleMouseDown,
                onMouseUp: this.handleMouseUp,
                onMouseOver: this.handleMouseOver,
                onMouseOut: this.handleMouseOut,
                onClick: this.changeColor },
            React.createElement(
                'svg',
                null,
                React.createElement('path', {
                    stroke: this.state.strokeCol,
                    fill: 'url(#water)',
                    strokeWidth: this.state.strokeW,
                    d: this.props.basePath }),
                React.createElement('ellipse', { fill: this.state.strokeCol,
                    cx: this.props.r,
                    cy: Math.sqrt(3) / 2 * this.props.r,
                    rx: '1.5', ry: '1.5' })
            )
        );
    }
});

exports['default'] = Hex;
module.exports = exports['default'];