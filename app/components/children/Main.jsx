// Main Page - contains Search, Query and Saved Sub Components

var React = require("react");

// Sub-components
var Query = require("./Query.jsx");
var Search = require("./Search.jsx");
var Saved = require("./Saved.jsx");

// Helper to make API call
var helpers = require("../utils/helpers.js");

// Main Component
var Main = React.createClass({

  // Set Initial State
  getInitialState: function() {
    return {
      apiResults: [],
      mongoResults: [],
      searchTerms: ["","",""]
    };
  },

  // Allow children to update the parent.
  _setSearchFeilds: function(topic, start, end) {
    this.setState({ searchTerms: [topic, start, end] });
  },

  // Udate Mongo data array
  _resetMongoResults: function(newData){
    this.setState({ mongoResults: newData} );
  },

  // Mount saved articles from API after Main renders
  componentDidMount: function() {

    // Get saved articles from Mongo API
    helpers.apiGet().then(function(query){
      this.setState({mongoResults: query.data});
    }.bind(this));

    // Console Logs
  console.log('API Results')
  console.log(this.state.apiResults)
  console.log('')
  console.log('Mongo Results')
  console.log(this.state.mongoResults)
  },

  // If component changes
  componentDidUpdate: function(prevProps, prevState) {

    // Hit the API once
    if(this.state.searchTerms != prevState.searchTerms){
      // Run article query
      helpers.articleQuery(this.state.searchTerms[0], this.state.searchTerms[1], this.state.searchTerms[2]).then(function(data) {
      console.log(data);
        this.setState({ apiResults: data });
      }.bind(this));
    }

  },


  // Render the function
  render: function() {
    return (

      <div className="container" style={ {backgroundColor: "white", borderStyle: "solid", borderWidth: "1px"} }>

        <div className="page-header">
          <h1 className="text-center"><img style={ {width: "70%"} } src="img/nyt-header.jpg" alt="The New York Times"/></h1>
          <h2 className="text-center" style={ {marginTop: "-12px"} }><b><i>Limited Edition</i></b></h2>
          <h4 className="text-center">Search for an article.</h4>
        </div>

        <Query _setSearchFeilds={this._setSearchFeilds} />
        <Search apiResults={this.state.apiResults} _resetMongoResults={this._resetMongoResults} />
        <Saved mongoResults={this.state.mongoResults} _resetMongoResults={this._resetMongoResults} />

      </div>

    );
  }
});

// Export the component back for use in other files
module.exports = Main;
