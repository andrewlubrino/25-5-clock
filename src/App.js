import "./styles.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleDoubleUp } from "@fortawesome/free-solid-svg-icons";

var timerVar = null;

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 1500000,
      breakSwitch: true,
      setTime: 1500000,
      setBreak: 300000
    };
  }

  componentDidUpdate() {
    if (this.state.time === 0) {
      if (this.state.breakSwitch) {
        this.setState({
          time: this.state.setBreak,
          breakSwitch: !this.state.breakSwitch
        });
      } else {
        this.setState({
          time: this.state.setTime,
          breakSwitch: !this.state.breakSwitch
        });
      }
    }
  }

  timerFunc = () => {
    let increment = 1000;
    this.setState({
      time: this.state.time - increment
    });
  };

  handleStart = () => {
    timerVar = setInterval(this.timerFunc, 1000);
  };

  handlePause = () => {
    clearInterval(timerVar);
  };

  reset = () => {
    this.setState({
      time: this.state.setTime
    });
  };

  increaseOrDecrease = (tof, name) => {
    this.handlePause();
    if (tof) {
      if (name === "work") {
        let tempVar = Math.floor((this.state.setTime + 60000) / 60000);
        if (tempVar > 0 && tempVar <= 60) {
          this.setState({
            setTime: this.state.setTime + 60000
          });
        }
      } else {
        let tempVar = Math.floor((this.state.setBreak + 60000) / 60000);
        if (tempVar > 0 && tempVar <= 60) {
          this.setState({
            setBreak: this.state.setBreak + 60000
          });
        }
      }
    } else {
      if (name === "work") {
        let tempVar = Math.floor((this.state.setTime - 60000) / 60000);
        if (tempVar > 0 && tempVar <= 60) {
          this.setState({
            setTime: this.state.setTime - 60000
          });
        }
      } else {
        let tempVar = Math.floor((this.state.setBreak - 60000) / 60000);
        if (tempVar > 0 && tempVar <= 60) {
          this.setState({
            setBreak: this.state.setBreak - 60000
          });
        }
      }
    }
  };

  render() {
    var Minutes = Math.floor(this.state.time / (60 * 1000));
    var Seconds = (this.state.time % (60 * 1000)) / 1000;
    Seconds = Seconds.toString().padStart(2, "0");
    return (
      <div className="body-class">
        <div>
          <div>
            <div className="button-order">
              <Change
                Name="work"
                setValue={this.state.setTime}
                callBack={this.increaseOrDecrease}
              />
              <Change
                Name="break"
                setValue={this.state.setBreak}
                callBack={this.increaseOrDecrease}
              />
            </div>
          </div>
          <div className="timer-style">
            <div>
              <h1>
                {Minutes}:{Seconds}
              </h1>
              <button className="button-style" onClick={this.handleStart}>
                <FontAwesomeIcon icon={faPlay} />
              </button>
              <button className="button-style" onClick={this.handlePause}>
                <FontAwesomeIcon icon={faPause} />
              </button>
              <button className="button-style" onClick={this.reset}>
                <FontAwesomeIcon icon={faRedo} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Change extends React.Component {
  onUpPress = () => {
    this.props.callBack(true, this.props.Name);
  };

  onDownPress = () => {
    this.props.callBack(false, this.props.Name);
  };

  render() {
    var Minutes = Math.floor(this.props.setValue / (60 * 1000));
    return (
      <div className="change-element-style">
        <h1>{Minutes}</h1>
        <div className="change-button-style">
          <button className="button-style" onClick={this.onUpPress}>
            <FontAwesomeIcon icon={faAngleDoubleUp} />
          </button>
          <button className="button-style" onClick={this.onDownPress}>
            <FontAwesomeIcon icon={faAngleDoubleDown} />
          </button>
        </div>
      </div>
    );
  }
}

export default Timer;
