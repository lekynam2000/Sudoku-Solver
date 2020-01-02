import { checkCol, checkRow, checkZone, check, Solver } from "./solver.js"
import React from "react"
import ReactDom from "react-dom"
import Sudoku from "./Sudoku"

import "./style.scss"

class App extends React.Component {
    constructor(props) {
      super(props)
    
      this.state = {
         done:false,
         array:[]
      }
      this.solve = this.solve.bind(this);
      this.reset = this.reset.bind(this);
      this.changeData = this.changeData.bind(this);
    }
    componentDidMount(){
        var array = [];
        for(let i=0; i<81;i++){
            array.push(".");
        }
        this.setState({array:array});
    }
    changeData(e){
        var curr = e.target;
        console.log(e.keyCode);
        var instant = [...this.state.array]
        if(e.keyCode>48 && e.keyCode<58){
            // curr.innerHTML = e.keyCode-48;
            curr.className = "normal";
            instant[curr.dataset.pos] = e.keyCode-48;
            this.setState({array:instant});
        }
        if(e.keyCode>96 && e.keyCode<106){
            // curr.target.innerHTML = e.keyCode-96;
            curr.className = "normal";
            instant[curr.dataset.pos] = e.keyCode-96;
            this.setState({array:instant});
        }
        if(e.keyCode==48 || e.keyCode==96){
            curr.className = "hidden";
            instant[curr.dataset.pos] = ".";
            this.setState({array:instant});
        }
    }
    solve(){
        var array = this.state.array;
        var result = Solver(array);
        this.setState({
            done:true,
            array:result
        })
    }
    reset(){
        var array = [];
        for(let i=0; i<81;i++){
            array.push(".");
        }
        this.setState({
            done:false,
            array:array
        })
    }
  render() {
     
    return (
      <>
        <Sudoku array={this.state.array} changeData={this.changeData}/>
        <button onClick={this.solve}>Solve</button>
        <button onClick={this.reset}>Reset</button>
      </>
    )
  }
}

ReactDom.render( <App/>,
    document.getElementById("root")
)