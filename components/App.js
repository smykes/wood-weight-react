import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {sc: 0, mc: 0, fw: 0, ft: 0, lf: 0, weight: '0 lbs.'}
    this.update = this.update.bind(this)
  }
  update(event) {
    this.setState({
      sc: ReactDOM.findDOMNode(this.refs.sc.refs.inp).value,
      mc: ReactDOM.findDOMNode(this.refs.mc.refs.inp).value,
      fw: ReactDOM.findDOMNode(this.refs.fw).value,
      ft: ReactDOM.findDOMNode(this.refs.ft).value,
      lf: ReactDOM.findDOMNode(this.refs.lf).value}, function() {
        let n = parseInt(this.state.sc, 10),
            e = (parseInt(this.state.mc,10) / 100),
            t = parseInt(this.state.fw, 10),
            i = parseInt(this.state.ft,10),
            o = parseInt(this.state.lf,10),
            result = 62.4 * (n / (1 + 0.009 * n * e)) * (1 + e / 100) / 1728 * t * i * 12 * o;
            result = Math.round(100 * result) / 100 + ' lbs.';
            this.setState({
              weight: result
            });
      });
  }
  render() {
    return (
      <div>
        <header>
          <Screen weight={this.state.weight} />
        </header>
        <main>
          <label>Specific Gravity</label>
          <Slider ref="sc" max="2" step="0.1" update={this.update} />
          <label className="label__box">{this.state.sc} <em>SG</em></label>
          <label>Moisture Content</label>
          <Slider max="100" ref="mc" step="0.5" update={this.update}/>
          <label className="label__box">{this.state.mc} %</label>
          <label>Finished Width</label>
          <Number default={this.state.fw} ref="fw" update={this.update}/><label className="label__unit">in</label>
          <label>Finished Thickness</label>
          <Number default={this.state.ft} ref="ft" update={this.update}/><label className="label__unit">in</label>
          <label>Lineal Feet</label>
          <Number default={this.state.lf} ref="lf" update={this.update}/><label className="label__unit">ft</label>
        </main>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  sc: React.PropTypes.number,
  mc: React.PropTypes.number,
  fw: React.PropTypes.number,
  ft: React.PropTypes.number,
  lw: React.PropTypes.number,
  weight: React.PropTypes.string

}

App.defaultProps = {
  sc: 0,
  mc: 0,
  fw: 0,
  ft: 0,
  lw: 0,
  weight: '0 lbs.'
}
class Screen extends React.Component {
  render() {
    return (
      <div className="screen">{this.props.weight}</div>
    )
  }
}
class Number extends React.Component {
  render() {
    return (
      <input className="number" value={this.props.default} type="number" min="0" onChange={this.props.update} />
    )
  }
}
class Slider extends React.Component {
  render() {
  return (
    <div className="slider">
      <input ref="inp" min="0" step={this.props.step} max={this.props.max} type="range" onChange={this.props.update} />
    </div>
  )
  }
}
class Footer extends React.Component {
  render() {
    return (
      <footer>Built with React</footer>
    )
  }
}


export default App
