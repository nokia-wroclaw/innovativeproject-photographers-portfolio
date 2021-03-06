import React, { Component } from "react";
import ky from "ky";

class EditorRender extends Component {
  constructor(props) {
    super(props);

    this.state = {
      output: "",
      errorMsg: "",
    };
  }

  async componentDidMount() {
    await ky
      .get("/api/v1/editor")
      .then((response) => response.text())
      .then((data) => {
        this.setState({ output: data });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ errorMsg: "Error retrieving data" });
      });
  }

  createOutput = () => {
    return {
      __html: `${this.state.output}`,
    };
  };

  render() {
    const { errorMsg } = this.state;
    return (
      <div dangerouslySetInnerHTML={this.createOutput()}>
        {errorMsg ? <div>{errorMsg}</div> : null}
      </div>
    );
  }
}

export default EditorRender;
