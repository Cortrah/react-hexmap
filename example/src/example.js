var React = require('react');
var ReactDOM = require('react-dom');
var ReactHexmap = require('react-hexmap');

var App = React.createClass({
	render () {
		return (
			<div id="hexMapExample">
				<ReactHexmap />
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
