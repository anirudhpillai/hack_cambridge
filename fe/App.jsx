//get latest robots and missile info
//update robots and missiles on GameCanvas with latest locations

import React from 'react';

const robots = [
	{
		id: "yum",
		x: 10,
		y: 100,
		rotate: 45,
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
		rotate: 235,
		destroyed: false,
		created: true
	},
	{
		id: "skdfh",
		x: 510,
		y: 500,
		rotate: 190,
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
		top: props.y + "px",
		left: props.x + "px",
		transform: `rotate(${props.rotate}deg)`,
	}
	return <div className="spaceCraft" style={newStyles}></div>;
}

SpaceCraft.defaultProps = {
	x: 0,
	y: 0,
	rotate: 0
}

function Missile(props){
	const newStyles = {
		top: props.y + "px",
		left: props.x + "px",
		transform: `rotate(${props.rotate}deg)`,
	}
	return <div className="missile" style={newStyles}></div>;
}

Missile.defaultProps = SpaceCraft.defaultProps

class GameCanvas extends React.Component {
	constructor(props){
		super(props)
		this.props.feed.subscribe({
			lastEventId: "0",
			onOpen: () => console.log("Subscription opened"),
			onItem: updates => this.updateCanvas(updates),
			onError: err => console.error("Error subscribing to notifications:", err)
		})
	}

	updateCanvas(updates){
		console.log("New update " + updates)
		this.setState({
			robots: updates.players,
			missiles: updates.bullets
		})
	}

	render() {
		let updatedRobots
		let updatedMissiles
		if (this.state) {
			if (this.state.robots) {
				updatedRobots = this.state.robots.map(
					robot => <SpaceCraft key={robot.id} x={robot.x} y={robot.y} rotate={robot.rotate}/>)
			}
			if (this.state.missiles) {
				updatedMissiles = this.state.missiles.map(
					missile => <Missile key={missile.id} x={missile.x} y={missile.y} rotate={missile.rotate}/>)
			}
		}
		return (
			<div className="canvas">
				{ updatedRobots }
				{ updatedMissiles }
			</div>
		);
	}
}

class App extends React.Component {
	constructor(){
		super()
		const pusher = new PusherPlatform.App({ appId: 'c28a0d37-424e-493b-80d9-2488cc7bac8a'})
		this.updatesFeed = pusher.feed("game") 
	}
	render() {
		return (
			<GameCanvas feed={this.updatesFeed} initialState={{robots: [], missiles: []}}/>
		);
	}
}

export default App;
