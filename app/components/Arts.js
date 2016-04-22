import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCategories, fetchContent } from "../actions/index";
import { Link } from "react-router";
import IndexedDB from "../utils/IndexedDB";

class Arts extends Component{
  constructor(props) {
    super(props);
  }

  getCategoryId(categories, section) {
    categories.map((cat) => {
      if(section === cat.name) {
        this.props.fetchContent(cat.id)
          .then((response) => {
            //Take the content and store it
            //In proper object store
            IndexedDB.storeContent(section, response.payload.data, () => {
              console.log("DATA STORED");
            });
          });
      }
    });
  }

  fetchContent() {
    this.props.fetchCategories()
      .then((response) => {
        var categories = response.payload.data;
        this.getCategoryId(categories, this.props.route.section)
      })
  }

  componentDidMount() {

    let section = this.props.route.section;

    // Init indexedDB object
    // Has to be done here so we know window object is available
    IndexedDB.init();

    //Check if contentDB exists pass callback
    IndexedDB.dbExists((databaseExists) => {
      console.log("DBEXISTS:" + databaseExists);
      //If false the contentDB database will be created
      //Create the object store for landing content
      //Move onto to fetchContent
      if(!databaseExists) {

        IndexedDB.createObjectStore(() => {
          this.fetchContent();
        });

      } else {
        console.log("straight to fetch");
        this.fetchContent();
      }
    });


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
