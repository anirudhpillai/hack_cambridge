import React from 'react';

function SpaceCraft(props){
	const newStyles = {
		top: props.y + "px",
		left: props.x + "px",
		transform: `rotate(${props.rotate}deg)`,
	}
	if (props.destroyed) {
		return null;
	} else {
		return <div className="spaceCraft" style={newStyles}></div>;
	}
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
	if (props.destroyed) {
		return null;
	} else {
		return <div className="missile" style={newStyles}></div>;
	}
}

Missile.defaultProps = SpaceCraft.defaultProps

class GameCanvas extends React.Component {
	constructor(props){
		super(props)
		this.props.feed.subscribe({
			lastEventId: "0",
			onOpen: () => console.log("Subscription opened"),
			onItem: updates => this.updateCanvas(updates.body),
			onError: err => console.error("Error subscribing to notifications:", err)
		})
	}

	updateCanvas(updates){
		console.log(updates)
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
					robot => <SpaceCraft
										key={robot.id}
										x={robot.x}
										y={robot.y}
										rotate={robot.rotate}
										destroyed={robot.destroyed}/>)
			}
			if (this.state.missiles) {
				updatedMissiles = this.state.missiles.map(
					missile => <Missile
										key={missile.id}
										x={missile.x}
										y={missile.y}
										rotate={missile.rotate}
										destroyed={missile.destroyed}/>)
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
