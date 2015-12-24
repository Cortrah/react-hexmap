var React = require('react');
var ReactDOM = require('react-dom');

var Hex = React.createClass({

    propTypes:{
        r: React.PropTypes.number.isRequired,
        x: React.PropTypes.number.isRequired,
        y: React.PropTypes.number.isRequired
    },

    getDefaultProps: function () {
        return {
            type: 'hex'
        };
    },

    getInitialState() {
        return {
            strokeW:1,
            fillCol: "#f3f3f3",
            strokeCol: "#333333"
        };
    },

    handleMouseDown() {
        var randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
        this.setState({fillCol: randomColor});
    },

    render: function () {
        var r = parseInt(this.props.r);

        var cx = r;
        var cy = Math.sqrt(3)/2 *r;

        var x1 = r/2;
        var y1 = 0;

        var x2 = r + x1;
        var y2 = 0;

        var x3 = 2*r;
        var y3 = cy;

        var x4 = x2;
        var y4 = cy*2;

        var x5 = x1;
        var y5 = cy*2;

        var x6 = 0;
        var y6 = cy;

        var hexPath="M " + x1 +", " + y1 + " " +
            "L " + x2 +", " + y2 + " " +
            "L " + x3 +", " + y3 + " " +
            "L " + x4 +", " + y4 + " " +
            "L " + x5 +", " + y5 + " " +
            "L " + x6 +", " + y6 + " z";

        return (
            <svg className={'hex'}
                 x = {this.props.x}
                 y = {this.props.y}

                 onClick={this.handleMouseDown}>
                <svg >
                    <path
                        stroke={this.state.strokeCol}
                        fill={this.state.fillCol}
                        strokeWidth={this.state.strokeW}
                        d={hexPath}/>
                    <ellipse fill={this.state.strokeCol}
                             cx={32}
                             cy={Math.sqrt(3)/2 * this.props.r}
                             rx="1.5" ry="1.5"/>
                </svg>
            </svg>
        )
    }
});

export default Hex;
