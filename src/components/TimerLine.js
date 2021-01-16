import React, { Component } from 'react';
import '../css/timer.css'


class TimerLine extends Component {

    state = {
        timerId: this.props.id,
        timerSec: this.props.time !== undefined ? parseInt(this.props.time) : 15,
        timerSecFirst: this.props.time !== undefined ? parseInt(this.props.time) : 15,
        timerRun: this.props.run !== undefined ? Boolean(parseInt(this.props.run)) : false,
        timerName: "Pause",
        timerRepit: this.props.repit !== undefined ? Boolean(parseInt(this.props.repit)) : false,
        timerInterval: this.props.interval !== undefined ? parseInt(this.props.interval) : 1,
    }

    goTimer = (time) => new Promise(resolve => setTimeout(() => {
        this.state.timerRun ? resolve(time - this.state.timerInterval) : resolve(time);
    }, this.state.timerInterval * 1000));

    componentDidMount() {
        this.goTimer(this.state.timerSec).then((newTimeSec) => this.setState({ timerSec: newTimeSec }));
        if (this.props.onTimeStart !== undefined && this.state.timerRun) {
            this.props.onTimeStart();
        }
    }

    componentDidUpdate() {
        if (this.state.timerSec > 0 && this.state.timerRun) {
            this.goTimer(this.state.timerSec).then((newTimeSec) => this.setState({ timerSec: newTimeSec }));
            if (this.props.onTick !== undefined) {
                this.props.onTick(this.state.timerSec);
            }
        }
        if (this.props.onTimeEnd !== undefined && this.state.timerSec === 0) {
            this.props.onTimeEnd();
        }
        if (this.state.timerSec === 0 && this.state.timerRepit) {
            setTimeout(() => this.setState({ timerSec: this.state.timerSecFirst }), 1000);
        }

        this.updateLine(this.state.timerSec);
    }

    setStatePause = () => {
        if (this.props.onTimeStart !== undefined && !this.state.timerRun) {
            this.props.onTimeStart();
        }
        if (this.props.onTimePause !== undefined && this.state.timerRun) {
            this.props.onTimePause();
        }
        this.setState({ timerRun: !this.state.timerRun, timerName: this.state.timerName === "Start" ? "Pause" : "Start" });
    }

    updateLine = (sec) => {
        const widthP = (sec * 100) / this.state.timerSecFirst;
        document.getElementById(this.state.timerId).style.width = widthP + "%";
    }

    render() {
        return (
            <div className="Timer">
                <p className="timer-text">Timer: {this.state.timerSec}</p>
                <div className="TimerLine" id={this.state.timerId}></div>
                <button className="btn" onClick={this.setStatePause}>{this.state.timerRun ? "Pause" : "Start"}</button>
            </div>
        )
    }
}

export default TimerLine;