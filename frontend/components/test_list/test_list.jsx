import React from 'react';

import TestListItem from './test_list_item';

class TestList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tests: [],
      buttonState: "Start Tests"
    };

    this.generateDummyTest = this.generateDummyTest.bind(this);
    this._handleButtonPress = this._handleButtonPress.bind(this);
  }

  generateDummyTest() {
    var delay = 7000 + Math.random() * 7000;
    var testPassed = Math.random() > 0.5;

    return function(callback) {
      setTimeout(function() {
        callback(testPassed);
      }, delay);
    };
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

  }

  render() {

    const testListArray = this.state.tests.map((test, index) => {
      return (
        <TestListItem key={index} test={test}>{test.description}</TestListItem>
      );
    });

    return(
      <div>
        <section>
          <button>{this.state.buttonState}</button>
        </section>
        <ul>
          {testListArray}
        </ul>
      </div>
    );
  }
}

export default TestList;
