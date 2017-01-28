//get latest robots and missile info
//update robots and missiles on GameCanvas with latest locations

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

function SpaceCraft(props){
	const newStyles = { 
		top: this.props.y + "px", 
		left: this.props.x + "px",
		transform: `rotate(${this.props.rotate}deg)`,
	}
	return <div className="spaceCraft" style={newStyles}></div>;
}

function Missile(props){
	const newStyles = { 
		top: this.props.y + "px", 
		left: this.props.x + "px",
		transform: `rotate(${this.props.rotate}deg)`,
	}
	return <div className="missile" style={newStyles}></div>;
}


class GameCanvas extends React.Component {
	constructor(props){
		super(props)
		this.setState({
			robots: this.props.robots,
			missiles: this.props.missiles
		})
	}
	updateCanvas(robots, missiles){
		this.setState({
			robots: robots,
			missiles: missiles
		})
	}
	render() {
		const updatedRobots = this.props.robots.map( 
			robot => <SpaceCraft key={robot.id} x={robot.x} y={robot.y} rotate={robot.rotate}/>)
		const updatedMissiles = this.props.missiles.map( 
			missile => <Missile key={missile.id} x={missile.x} y={missile.y} rotate={missile.rotate}/>)
		return (
			<div className="canvas">
				{ updatedRobots }
				{ updatedMissiles }
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