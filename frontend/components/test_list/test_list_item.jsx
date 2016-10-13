import React from 'react';

class TestListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "Not Started Yet"
    };
  }

  render() {
    const test = this.props.test;

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
