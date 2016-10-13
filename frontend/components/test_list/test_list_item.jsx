import React from 'react';

class TestListItem extends React.Component {
  constructor(props) {
    super(props);

    this.callback = this.callback.bind(this);

    this.state = {
      status: "Not Started Yet"
    };
  }

  callback(testPassed) {
    if (testPassed) {
      this.setState({status: "Passed"});
      this.props.incrementPassed();
    } else {
      this.setState({status: "Failed"});
      this.props.incrementFailed();
    }
    this.props.decrementRunning();

    if (this.props.running <= 0) {
      this.props.finishedStatus();
    }
  }

  render() {
    const test = this.props.test;

    let status;
    if (this.props.status === "Running") {
      this.props.test.run(this.callback);
    }

    return (
      <li>
        <span>
          {test.description}
        </span>
        <span>
          {this.state.status}
        </span>
      </li>
    );
  }
}

export default TestListItem;
