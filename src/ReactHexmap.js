var React = require('react');
var ReactDOM = require('react-dom');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var Hex = require('./Hex');
var Gsap = require('gsap');

var ReactHexmap = React.createClass({

    mixins:[PureRenderMixin],

    getInitialState: function () {
        return {
            r: 32,
            secondsElapsed:0,
            s: 5
        };
    },

    tick: function(){
        this.setState({
            secondsElapsed: this.state.secondsElapsed + 1,
        });
    },

    componentDidMount: function(){
        this.interval = setInterval(this.tick, 5000);
    },

    componentWillUnmount: function(){
        clearInterval(this.interval);
    },

    changeRadius: function() {
        if(this.state.r == 32){
            this.setState(
                {
                    r: Math.random()*80
                }
            );
        } else {
            this.setState(
                {
                    r: 32
                }
            );
        }
    },

    zoomIn: function() {
        var newZoom = 1;
        switch (this.state.s) {
            case(.3):{
                newZoom = 1;
                break;
            }
            case(1):{
                newZoom = 5;
                break;
            }
            case(5):{
                newZoom = 15;
                break;
            }
            case(15):{
                newZoom = 15;
                break;
            }
        }

        this.setState(
            {
                s: newZoom
            }
        );
        this.gotoScale();
    },

    zoomOut: function() {
        var newZoom = 1;
        switch (this.state.s) {
            case(15):{
                newZoom = 5;
                break;
            }
            case(5):{
                newZoom = 1;
                break;
            }
            case(1):{
                newZoom = .3;
                break;
            }
            case(.3):{
                newZoom = .3;
                break;
            }
        }

        this.setState(
            {
                s: newZoom
            }
        );
        this.gotoScale();
    },

    gotoScale: function() {
        var map = this.refs.svgContainer;
        TweenMax.to(map, 1, {scale: this.state.s, transformOrigin: "left top", ease: Power1.easeInOut});
    },

    render: function () {
        var r = this.state.r;

        var rows = [];
        for (var x = 0; x < 50; x++) {
            for (var y = 0; y < 50; y++) {
                if( x%2 === 0) {
                    // even
                    rows.push(<Hex key={x+'-'+y} x={3*r*y} y={7*r*x/8} r={r}/>);
                } else {
                    // odd
                    rows.push(<Hex key={x+'-'+y} x={(3*r*y)+3*r/2} y={7*r*x/8} r={r}/>);
                }
            }
        }

        return (
            <section>
                <div className="mapZoomControls">
                    <button onClick={this.zoomOut}>-</button>
                    <button onClick={this.zoomIn}>+</button>
                </div>
                <div className="mapControls panel panel-primary panel-fixed">
                    <button> fill paintbrush </button>
                    <button> border paintbrush </button>
                </div>
                <div ref="scrollContainer"
                     className={"scroll-container"} >
                    <svg ref="svgContainer"
                         xmlns="http://www.w3.org/2000/svg"
                         width="800px" height="800px"
                         viewBox="0 0 800 800"
                         className={"svg-container"}>
                        {rows}
                    </svg>
                </div>
            </section>
        );
    }
});

export default ReactHexmap;
