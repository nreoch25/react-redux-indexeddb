import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCategories, fetchContent } from "../actions/index";
import { Link } from "react-router";
import IndexedDB from "../utils/IndexedDB";

class Arts extends Component{
  constructor(props) {
    super(props);
    this.indexedContent;
    this.state = {
      content: []
    }
  }

  getCategoryId(categories, section) {
    categories.map((cat) => {
      if(section === cat.name) {
        this.props.fetchContent(cat.id)
          .then((response) => {
            //Take the content and store it
            //In proper object store
            IndexedDB.storeContent(section, response.payload.data, (section) => {
              console.log(`data stored for ${section}`);
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
        this.indexedContent = false;

        IndexedDB.createObjectStore(() => {
          this.fetchContent();
        });

      } else {
        this.indexedContent = true;
        //Check if object store contains content
        //If true store in content state
        IndexedDB.checkObjectStore(section, (response) => {
          this.setState({content: response});
        });
      }
    });


  }

  renderContent() {
    let currentContent = [];
    if(this.indexedContent) { currentContent = this.state.content; }
    if(!this.indexedContent) { currentContent = this.props.content; }
    const curStories = [];
    const pathSection = this.props.route.section.toLowerCase();
    currentContent.map((story) => {
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
        {this.renderContent(this.state.content)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { content: state.content.all}
}

export default connect(mapStateToProps, { fetchCategories, fetchContent })(Arts);
