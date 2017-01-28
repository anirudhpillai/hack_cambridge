import React from 'react';

const robots = [
	{
		id: "yum",
		x: 10,
		y: 100,
		rotate: 90,
		destroyed: false,
		created: true
	},
	{
		id: "yaskdjkjl",
		x: 100,
		y: 100,
		rotate: 90,
		destroyed: false,
		created: true
	},
	{
		id: "ajksdhusqid",
		x: 150,
		y: 390,
		rotate: 90,
		destroyed: false,
		created: true
	},
	{
		id: "skdfh",
		x: 510,
		y: 500,
		rotate: 90,
		destroyed: false,
		created: true
	},
]

const missiles = [
	{
		id: "klasjndlk",
		x: 100,
		y: 109,
		rotate: 90,
		destroyed: false,
		created: true
	},
	{
		id: "kalsdnjkasd",
		x: 420,
		y: 100,
		rotate: 50,
		destroyed: false,
		created: true
	},
	{
		id: "alsjdn2",
		x: 150,
		y: 340,
		rotate: 340,
		destroyed: false,
		created: true
	},
	{
		id: "akjsdlk",
		x: 570,
		y: 340,
		rotate: 90,
		destroyed: false,
		created: true
	}
]

class SpaceCraft extends React.Component {
	render () {
		const newStyles = { 
			top: this.props.y + "px", 
			left: this.props.x + "px",
			transform: `rotate(${this.props.rotate}deg)`,
		}
		return <div className="spaceCraft" style={newStyles}></div>;
	}
}

class Missile extends React.Component {
	render () {
		const newStyles = { 
			top: this.props.y + "px", 
			left: this.props.x + "px",
			transform: `rotate(${this.props.rotate}deg)`,
		}
		return <div className="missile" style={newStyles}></div>;
	}
}


class GameCanvas extends React.Component {
	render() {
		return (
			<div className="canvas">
				{
					this.props.robots.map( robot => <SpaceCraft x={robot.x} y={robot.y} rotate={robot.rotate} /> )
				}
				{
					this.props.missiles.map( missile => <Missile x={missile.x} y={missile.y} rotate={missile.rotate} /> )
				}
			</div>
		);
	}
}

class App extends React.Component {
	render() {
		return (
			<GameCanvas robots={robots} missiles={missiles} />
		);
	}
}

export default App;