import React, { Component } from 'react';
import brain from 'brain.js';
import './App.css';

const defBgColor = "#000000";

class App extends Component {
  constructor(props) {
    super(props);

    this.net = new brain.NeuralNetwork();

    this.net.train([
      { input: { r: 0.0, g: 0.0, b: 0.0 }, output: { color: 1 } },
      { input: { r: 1.0, g: 1.0, b: 1.0 }, output: { color: 0 } },
      { input: { r: 0.03, g: 0.7, b: 0.5 }, output: { color: 0 } },
      { input: { r: 0.16, g: 0.09, b: 0.2 }, output: { color: 1 } },
      { input: { r: 0.5, g: 0.5, b: 1.0 }, output: { color: 1 } },
      { input: { r: 0.07, g: 0.34, b: 0.0 }, output: { color: 1 } },
      { input: { r: 1.0, g: 0.50, b: 0.50 }, output: { color: 0 } }]);
    
    this.state = {
      bgColor: defBgColor,
      fontColor: this.predictColor(defBgColor)
    };

  }

  hexToRgb (hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });
  
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16) } :
    null;
  }

  predictColor = (hexColor) => {
    var color = this.hexToRgb(hexColor);
    Object.keys(color).map(function (key, index) {
      color[key] = +(color[key] / 255).toFixed(2);
    });
    return this.net.run(color).color > 0.5 ? "#fff" : "#000";
  };

  handleColorChange = (e) => {
    const bgColor = e.target.value;

    this.setState({
      bgColor,
      fontColor: this.predictColor(bgColor)
    });
  };

  render () {
    return (
      <div className="App" style={{ backgroundColor: this.state.bgColor, color: this.state.fontColor }}>
        <h1>Text Contrast</h1>
        <div>
          <span>Choose a color:</span>
          &ensp;
          <input type="color" onChange={ this.handleColorChange } value={ this.state.bgColor } style={{ backgroundColor: this.state.fontColor }} />
        </div>
      </div>
    );
  }
}

export default App;
