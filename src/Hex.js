var React = require('react');
var ReactDOM = require('react-dom');

var Hex = React.createClass({

    propTypes:{
        r: React.PropTypes.number.isRequired,
        x: React.PropTypes.number.isRequired,
        y: React.PropTypes.number.isRequired,
		basePath: React.PropTypes.string.isRequired,
		getTerrainFill: React.PropTypes.func.isRequired,
		isZooming: React.PropTypes.func.isRequired
},

    getDefaultProps: function () {
        return {
            type: 'hex'
        };
    },

	componentWillMount: function () {},
	componentDidMount: function () {},
	componentWillReceiveProps: function () {},
	shouldComponentUpdate: function () {
		return !this.props.isZooming();
	},
	componentWillUpdate: function () {},
	componentDidUpdate: function () {},

    getInitialState() {
        return {
            strokeW:1,
            fillCol: "#f3f3f3",
            strokeCol: "#333333"
        };
    },

    changeColor() {
        var newColor = this.props.getTerrainFill();
        this.setState({fillCol: newColor});
    },
	handleMouseUp() {},
	handleMouseOver() {},
	handleMouseOut() {},

    render: function () {

        return (
            <svg className={'hex'}
                 x = {this.props.x}
                 y = {this.props.y}
				 onMouseDown={this.handleMouseDown}
				 onMouseUp={this.handleMouseUp}
				 onMouseOver={this.handleMouseOver}
				 onMouseOut={this.handleMouseOut}
				 onClick={this.changeColor}>
				
                <svg >
                    <path
                        stroke={this.state.strokeCol}
                        fill={this.state.fillCol}
                        strokeWidth={this.state.strokeW}
                        d={this.props.basePath}/>
                    <ellipse fill={this.state.strokeCol}
                             cx={this.props.r}
                             cy={Math.sqrt(3)/2 * this.props.r}
                             rx="1.5" ry="1.5"/>
                </svg>
            </svg>
        )
    }
});

export default Hex;
