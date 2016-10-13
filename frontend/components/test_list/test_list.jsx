import React from 'react';

import TestListItem from './test_list_item';

class TestList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tests: [],
      status: "Idle",
      passed: 0,
      failed: 0,
      running: 0
    };

    this.generateDummyTest = this.generateDummyTest.bind(this);
    this._handleButtonPress = this._handleButtonPress.bind(this);
    this._incrementPassed = this._incrementPassed.bind(this);
    this._incrementFailed = this._incrementFailed.bind(this);
    this._decrementRunning = this._decrementRunning.bind(this);
    this._finishedStatus = this._finishedStatus.bind(this);
  }

  generateDummyTest() {
    var delay = 7000 + Math.random() * 7000;
    var testPassed = Math.random() > 0.5;

    return function(callback) {
      window.timeOutFunction = setTimeout(function() {
        callback(testPassed);
      }, delay);
    };
  }

  _incrementPassed() {
    this.setState({passed: this.state.passed + 1});
  }

  _incrementFailed() {
    this.setState({failed: this.state.failed + 1});
  }

  _decrementRunning() {
    this.setState({running: this.state.running - 1});
  }

  _finishedStatus() {
    this.setState({status: "Finished!"});
    clearTimeout(window.timeOutFunction);
  }

  componentDidMount() {
    var tests = [
      { description: "commas are rotated properly",          run: this.generateDummyTest() },
      { description: "exclamation points stand up straight", run: this.generateDummyTest() },
      { description: "run-on sentences don't run forever",   run: this.generateDummyTest() },
      { description: "question marks curl down, not up",     run: this.generateDummyTest() },
      { description: "semicolons are adequately waterproof", run: this.generateDummyTest() },
      { description: "capital letters can do yoga",          run: this.generateDummyTest() }
    ];

    this.setState({tests: tests});
  }

  _handleButtonPress(event) {
    event.preventDefault();

    this.setState({status: "Running", running: 6});
  }

  render() {

    const testListArray = this.state.tests.map((test, index) => {
      return (
        <TestListItem
          key={index}
          test={test}
          status={this.state.status}
          incrementPassed={this._incrementPassed}
          incrementFailed={this._incrementFailed}
          decrementRunning={this._decrementRunning}
          running={this.state.running}
          finishedStatus={this._finishedStatus}
        >
          {test.description}
        </TestListItem>
      );
    });

    let buttonText;
    if (this.state.status === "Idle") {
      buttonText = "Start Tests";
    } else if (this.state.status === "Running") {
      buttonText = "Running";
    } else {
      buttonText = "Finished";
    }

    return(
      <div>
        <section>
          <button onClick={this._handleButtonPress}>{buttonText}</button>
        </section>
        <ul>
          {testListArray}
        </ul>
        <section>
          <div>
            Passed: {this.state.passed}
          </div>
          <div>
            Failed: {this.state.failed}
          </div>
          <div>
            Running: {this.state.running}
          </div>
        </section>
      </div>
    );
  }
}

export default TestList;
