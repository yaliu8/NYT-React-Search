// Queries the NYT API for articles. 

var React = require("react");
var Query = React.createClass({

  // Set Initial State
  getInitialState: function() {
    return {
      topic: "",
      startYear: "",
      endYear: ""
    };
  },

  // Submit handler
  _handleSubmit: function(event) {
    event.preventDefault();

    // Set the parent to have the search terms
    this.props._setSearchFeilds(this.state.topic, this.state.startYear, this.state.endYear);
    
  },

  _handleTopicChange: function(e) {
    this.setState({topic: e.target.value});
  },

  _handleStartYearChange: function(e) {
    this.setState({startYear: e.target.value});
  },

  _handleEndYearChange: function(e) {
    this.setState({endYear: e.target.value});
  },


  // Fender Query Form
  render: function() {
    return (

      <div className="panel panel-default">

        <div className="panel-heading">
          <h3 className="panel-title text-center" style={ {fontSize: "20px"} }><b>Search</b></h3>
        </div>

        <div className="panel-body text-center">
          <form role="form" onSubmit={this._handleSubmit}>

            <div className="form-group col-md-offset-3 col-md-6">
              <label htmlFor="topic" className="text-center">Topic</label>
              <input type="text" className="form-control text-center" id="topic" onChange={this._handleTopicChange} />
            </div>

            <br />

            <div className="form-group col-md-offset-3 col-md-6">
              <label htmlFor="startYear">Start Year</label>
              <input type="text" className="form-control text-center" id="startYear" onChange={this._handleStartYearChange} />
            </div>

            <br />

            <div className="form-group col-md-offset-3 col-md-6">
              <label htmlFor="endYear">End Year</label>
              <input type="text" className="form-control text-center" id="endYear" onChange={this._handleEndYearChange} />
            </div>

            <br />

            <button type="submit" className="btn btn-info col-md-offset-5 col-md-2" id="searchBtn">Search</button>

          </form>
        </div>

      </div>

    );
  }
});


// Export component back for use in Main file
module.exports = Query;