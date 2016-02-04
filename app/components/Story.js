import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStory } from "../actions/index";

class Story extends Component{

    componentWillMount() {
      this.props.fetchStory(this.props.params.id);
    }

    renderStory() {
      if(!this.props.content) { return; }
      return (
        <div>
          <h3>{this.props.content.headline}</h3>
          <p>{this.props.content.summary}</p>
        </div>
      );
    }

    render() {
        return (
            <div>
                {this.renderStory()}
            </div>
        );
    }
}

function mapStateToProps(state) {
  return {
    content: state.content.story
  };
}

export default connect(mapStateToProps, { fetchStory })(Story);