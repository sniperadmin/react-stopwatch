import React, { Component } from "react";
let countdown;

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      timer: `00:00`,
      endTime: `00:00`,
      // seconds: 0,
      // minutes: 0,
      inputMinutes: '',
      chosenValue: 'break'
    };

    this.startSound = React.createRef();
    this.beebSound = React.createRef();
  }

  handleSelect = (event) => {
    this.setState({ chosenValue: event.target.value })
    console.log(this.state.chosenValue)
  }


  // resetting mechanics
  reset = () => {
    const { responsiveVoice } = window
    this.timeStop(); // stopping js counting
    this.setState({ timer: `00:00` });
    responsiveVoice.cancel();
  }

  timeStop = () => {
    clearInterval(countdown);
  }

  displayTimeLeft = (seconds) => {
    const { responsiveVoice } = window
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    this.setState({
      timer: `${minutes < 10 ? 0 : ""}${minutes}:${
        secondsLeft < 10 ? 0 : ""
      }${secondsLeft}`
    });

    // ***************** UPDATED *********************
    // voice alarm for each minute

    if (secondsLeft === 0 && minutes !== 0) {
      responsiveVoice.speak(`${minutes} minutes remaining | till ${this.state.chosenValue} ends`);
    } else if (secondsLeft === 20 && minutes === 0) {
      responsiveVoice.speak(`20 seconds remaining`);
    } else if (minutes === 0 && secondsLeft === 0) {
      responsiveVoice.speak(
        `Your Break Has Finished. Hurry up before you get fired! Thank you for using our services`
      );
    } else if (minutes === 0 && secondsLeft < 11) {
      responsiveVoice.speak(`${secondsLeft}`);
    }
  }
  displayEndTime = (timestamp) => {
    console.log('endtime')
    const end = new Date(timestamp);
    const hour = end.getHours();
    const CorrHours = hour > 12 ? hour - 12 : hour;
    const minutes = end.getMinutes();
    this.setState({
      endTime: `Break ends at ${CorrHours < 10 ? 0 : ""}${CorrHours}:${
        minutes < 10 ? 0 : ""
      }${minutes}`
    });
  }
  startTimer = (x) => {
    this.reset();
    this.startSound.current.play();
    const targetSec = parseInt(x.target.dataset.time);
    console.log(targetSec);
    this.timer(targetSec);
  }

  // timer mechanics
  timer = (seconds) => {
    const { responsiveVoice } = window
    this.reset();

    // constants

    const now = Date.now();
    const then = now + seconds * 1000;
    this.displayTimeLeft(seconds);
    this.displayEndTime(then);

    // setting animation in one second and storing it in a variable (countdown)
    // to be able to clearInterval after it reaches zero

    countdown = setInterval(() => {
      const remainedSeconds = Math.round((then - Date.now()) / 1000);

      // Checking when to stop the function

      if (remainedSeconds < 0) {
        clearInterval(countdown);
        return;
      }

      // installing beeb sound

      if (remainedSeconds < 11) {
        for (let sec in remainedSeconds) {
          responsiveVoice.speak(`${sec}`);
        }
        this.beebSound.current.play();
      }

      // changing colors once reaching 10 seconds (needs fixing!)
      if (remainedSeconds <= 11) {
      // not programmed yet
      }

      // Displaying timer
      this.displayTimeLeft(remainedSeconds);
    }, 1000);
  }
  submitMins = (e) => {
    e.preventDefault();
    this.reset();
    this.setState({ inputMinutes: e.target.value });
    const mins = this.enteredMins;
    this.timer(mins * 60);
    this.setState({ timer: `${mins}` });
  }

  render() {
    return (
      <div className="overlay">
        <div className="timer">
          <div className="thanks">
            <h3>ReactJS Stop watch</h3>
            <h5>Special thanks to: </h5>
            <p>Mona Galal</p>
            <p>Ahmed_Elbohoty</p>
          </div>
          <div className="timer__controls">
            <button
              onClick={this.startTimer}
              data-time="20"
              className="timer__button"
            >
              20 Secs
            </button>

            <button
              onClick={this.startTimer}
              data-time="300"
              className="timer__button"
            >
              Work 5
            </button>

            <button
              onClick={this.startTimer}
              data-time="900"
              className="timer__button"
            >
              Quick 15
            </button>

            <button
              onClick={this.startTimer}
              data-time="1200"
              className="timer__button"
            >
              Snack 20
            </button>

            <button
              onClick={this.startTimer}
              data-time="3600"
              className="timer__button"
            >
              Lunch Break
            </button>

            <form onSubmit={this.submitMins} name="customForm">
              <input
                type="number"
                name="minutes"
                placeholder="Enter Minutes and press Enter to begin"
              />
              <select value={this.state.chosenValue} onChange={this.handleSelect}>
                <option value="break" >break</option>
                <option value="task">task</option>
                <option value="deadline">deadline</option>
              </select>
            </form>
          </div>

          <div className="display">
            <h1 className="display__time-left">{this.state.timer}</h1>

            <button className="stop" onClick={this.reset}>
              Stop timer
            </button>

            <p className="display__end-time">
              Mission launch at {this.state.endTime}
            </p>
          </div>
        </div>

        <audio
          ref={this.beebSound}
          src="https://www.soundjay.com/button/beep-22.wav"
          autostart="false"
        />
        <audio
          ref={this.startSound}
          src="https://www.soundjay.com/button/button-34.wav"
          autostart="false"
        />
      </div>
    );
  }
}

export default Timer;
