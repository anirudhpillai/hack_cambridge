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
		x: 100,
		y: 109,
		rotate: 90,
		destroyed: false,
		created: true
	},
	{
		x: 420,
		y: 100,
		rotate: 50,
		destroyed: false,
		created: true
	},
	{
		x: 150,
		y: 340,
		rotate: 340,
		destroyed: false,
		created: true
	},
	{
		x: 570,
		y: 340,
		rotate: 90,
		destroyed: false,
		created: true
	}
]

class SpaceCraft extends React.Component {
	constructor(props) {
		super(props)
	}
	updatePosition(x, y, rotate) {
		Object.assign(this.props, {
			x: x,
			y: y,
			rotate: rotate
		})
		render()
	}
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
	constructor(props) {
		super(props)
	}
	updatePosition(x, y, rotate) {
		Object.assign(this.props, {
			x: x,
			y: y,
			rotate: rotate
		})
		render()
	}
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
	constructor(props){
		super(props)
	}
	updateWorkers(){

	}
	render() {
		return (
			<div className="canvas">
				<SpaceCraft x="100" y="10" rotate="40"/>
				<Missile x="160" y="25" rotate="180"/>
			</div>
		);
	}
}

class App extends React.Component {
   render() {
      return (
         <GameCanvas robots={robots} missiles={missiles}/>
      );
   }
}

export default App;