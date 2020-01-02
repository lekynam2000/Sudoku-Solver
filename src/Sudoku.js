// import { checkCol, checkRow, checkZone, check, Solver } from "./solver.js"
import React from "react"
import ReactDom from "react-dom"
class Sudoku extends React.Component{
    constructor(props){
        super(props)
    }
    
    render(){
        var table=[],row,data,className;

        for(let i=0; i<9; i++){
            row = [];
            for(let j=0; j<9; j++){
                data = (this.props.array[i*9+j]!=".")?this.props.array[i*9+j]:"";
                row.push(<td key={i*9+j} onKeyDown={this.props.changeData}
                data-pos={i*9+j} tabIndex="0" className="hidden">{data}</td>);
            }
            table.push(<tr>{row}</tr>);
        }
        return(
            <table>{table}</table>
        )
    }
}
export default Sudoku;