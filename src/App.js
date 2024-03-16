
import './App.css';
import React from 'react';



class Calculator extends React.Component{
  constructor(props){
    super(props);

    this.state={
      totalResult:0,
      equation:'',
      hasOperator:false,
      hasDecimal:false,
      currentInput:0
    }
    this.allClear = this.allClear.bind(this);
    this.handlePadInput = this.handlePadInput.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.handleZero = this.handleZero.bind(this);
    this.handleDecimals = this.handleDecimals.bind(this);
    this.getTotal= this.getTotal.bind(this);
  }

  allClear=()=>{
    this.setState({
      totalResult:0,
      equation:'',
      hasOperator:false,
      hasDecimal:false,
      currentInput:0
    })
  }
  handlePadInput=(event)=>{
    let number = event.currentTarget.value;
    let returnedinput='';

    switch(number){
      case '0':
       returnedinput  = this.handleZero();
      break;
      case '.':
      returnedinput = this.handleDecimals();
      break;
      default:
        returnedinput = number
    }
    this.setState((state)=>({
      equation:state.equation + returnedinput,
      hasOperator:false
    }))
    this.setInputDisplay(number);
  }

  setInputDisplay=(input)=>{
    let curInput = input;
    let returnedinput='';
    switch(curInput){
      case '0':
       returnedinput  = this.handleZero();
      break;
      case '.':
      returnedinput = this.handleDecimals();
      break;
      default:
        returnedinput = curInput
    }

      if( this.state.hasOperator === false){
        if(this.state.currentInput === 0){
          this.setState((state)=>({
            currentInput:returnedinput
          }))
        }else{
          this.setState((state)=>({
            currentInput:state.currentInput + returnedinput
          }))
        }
      }else{
        this.setState({
          currentInput:returnedinput
        })
      } 
  }
  handleOperators=(event)=>{
    let operator = event.currentTarget.value;
    this.setState({
      hasDecimal:false,
      hasOperator:true, 
    })

    if(this.state.equation.includes('=')){
      this.setState({
        equation:this.state.totalResult
      })
    }

    if(operator !== '-'){
     let lastEquation = this.state.equation[this.state.equation.length - 1];
     if(lastEquation !== '-'){
      if(this.state.hasOperator === true){
        const modifieEquation= this.state.equation.slice(0,-1) + operator;
        this.setState({  
          equation: modifieEquation
        })
      }else{
        this.setState((state)=>({
          equation:state.equation + operator
        }))
      }  
     }else{
      const modifieEquation= this.state.equation.slice(0,-2) + operator;
      this.setState({  
        equation: modifieEquation
      })
     }
    }else{
      this.setState((state)=>({
        equation:state.equation + operator
      }))
    }
    this.setInputDisplay(operator);
  }
  handleZero =()=>{
    if(this.state.equation[0] !== '0'){
      return '0';
    }else{
      return '';
    }
  }
  handleDecimals =()=>{
    if(this.state.hasOperator == false && this.state.hasDecimal == false){
      this.setState({
        hasDecimal:true
      })
      return '.';
    }else{
      return '';
    }
  }

  getTotal = ()=>{
    let getEquation = this.state.equation;
    let total = eval(getEquation);
    this.setState((state)=>({
      totalResult:total,
      equation:state.equation + '=' + total,
      currentInput:total
    }))
  }
 

  render(){
    return(
      <div className='calc-wrapper'>
        <div id='calculator'>
          <div className='formulaScreen'>{this.state.equation}</div>
          <div className='outputScreen' id='display'>{this.state !== 0 && this.state.currentInput}</div>
          <div className='buttons-wrapper'>
            <button id='clear' value="AC" className='jumbo allclear' onClick={this.allClear}>AC</button>
            <button id='divide' value="/" onClick={this.handleOperators}>/</button>
            <button id='multiply' value="*" onClick={this.handleOperators}>X</button>
            <button id='seven' value="7"  onClick={this.handlePadInput}>7</button>
            <button id='eight' value="8"  onClick={this.handlePadInput}>8</button>
            <button id='nine' value="9"  onClick={this.handlePadInput}>9</button>
            <button id='subtract' value="-" onClick={this.handleOperators}>-</button>
            <button id='four' value="4" onClick={this.handlePadInput}>4</button>
            <button id='five' value="5" onClick={this.handlePadInput}>5</button>
            <button id='six' value="6"  onClick={this.handlePadInput}>6</button>
            <button id="add" value="+" onClick={this.handleOperators}>+</button>
            <button id="one" value="1" onClick={this.handlePadInput} >1</button>
            <button id="two" value="2"  onClick={this.handlePadInput}>2</button>
            <button id='three' value="3"  onClick={this.handlePadInput}>3</button>
            <button id="zero" value="0" className='jumbo' onClick={this.handlePadInput}>0</button>
            <button id="decimal" value='.' onClick={this.handlePadInput}>.</button>
            <button id='equals' value="=" className='horizontal-jumbo' onClick={this.getTotal} >=</button>
          </div>
        </div>
        <p>Coded By: Levi Martinez</p>
      </div>
      
    )
  }
}
export default Calculator;


