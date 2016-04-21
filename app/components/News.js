import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCategories, fetchContent } from "../actions/index";
import { Link } from "react-router";

class News extends Component{

  getCategoryId(categories, section) {
    categories.map((cat) => {
      if(section === cat.name) {
        this.props.fetchContent(cat.id);
      }
    });
  }

  componentWillMount() {
    this.props.fetchCategories()
      .then((response) => {
        var categories = response.payload.data;
        this.getCategoryId(categories, this.props.route.section)
      })
  }

  renderContent() {
    if(!this.props.content) { return; }
    const curStories = [];
    const pathSection = this.props.route.section.toLowerCase();
    this.props.content.map((story) => {
      curStories.push(
        <Link key={story.id} to={`/${pathSection}/${story.sourceId}`}>{story.title}</Link>
      );
    });
    return curStories;
  }

  render() {
    return (
      <div>
        <h3>News</h3>
        {this.renderContent()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { content: state.content.all}
}

export default connect(mapStateToProps, { fetchCategories, fetchContent })(News);
