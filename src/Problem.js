import React, { Component } from 'react'
import Sudoku from "./Sudoku"
class Problem extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        array: [],         
      }
      this.changeData = this.changeData.bind(this);
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
    componentDidMount(){
        var array = [];
        for(let i=0; i<81;i++){
            array.push(".");
        }
        this.setState({array:array});
    }
  render() {
    return (
        <Sudoku array={this.state.array} changeData={this.changeData}/>

    )
  }
}

export default Problem

