import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCategories, fetchContent } from "../actions/index";
import { Link } from "react-router";
import IndexedDB from "../utils/IndexedDB";

class Arts extends Component{
  constructor(props) {
    super(props);
  }

  /*getCategoryId(categories, section) {
    categories.map((cat) => {
      if(section === cat.name) {
        this.props.fetchContent(cat.id);
      }
    });
  }

  fetchContent() {
    this.props.fetchCategories()
      .then((response) => {
        var categories = response.payload.data;
        this.getCategoryId(categories, this.props.route.section)
      })
  }*/

  componentDidMount() {

    /*this.props.fetchCategories()
      .then((response) => {
        var categories = response.payload.data;
        this.getCategoryId(categories, this.props.route.section)
      })*/

    IndexedDB.initDB(this.props.route.section);
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
        <h3>Arts</h3>
        {this.renderContent()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { content: state.content.all}
}

export default connect(mapStateToProps, { fetchCategories, fetchContent })(Arts);
