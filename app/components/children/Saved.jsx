// Saved Articles Page
var React = require("react");
var helpers = require("../utils/helpers.js");

// Search Component
var Saved = React.createClass({

  // Set generic state
  getInitialState: function() {
    return {
      doIneedThis: false
    };
  },

  _handleDelete: function(event) {

    // Collect clicked article's id
    var articleMongoId = event.target.value;
    // Make component accessible inside the function
    var that = this;

    // Send the API endpoint to save it to Mongo
    helpers.apiDelete(articleMongoId).then(function(){

      // Query Mongo for new Data
      helpers.apiGet().then(function(query){
        that.props._resetMongoResults(query.data);
      });

    });


  },

  // Render Search Results Panel
  render: function() {

    var that = this;

    return (

      <div className="panel panel-default">

        <div className="panel-heading">
          <h3 className="panel-title text-center" style={ {fontSize: "20px"} }><b>Saved Articles</b></h3>
        </div>

        <div className="panel-body">
          <ul className="list-group col-md-8 col-md-offset-2">

            {this.props.mongoResults.map(function(search, i) {

              return (
                <li key={search._id} className="list-group-item" style={ {borderWidth: "0px"} }>
                  <div className="input-group">
                    <div type="text" className="form-control">
                      <b><a href={search.url} target="_new" style={ {color: "black"} }>{search.title}</a></b>
                      <i> {search.date.substring(0, 10)}</i>
                    </div>
                    <span className="input-group-btn">
                      <button className="btn btn-warning" type="button" onClick={that._handleDelete} value={search._id}>Remove</button>
                    </span>
                  </div>
                </li>
              );
            })}

          </ul>
        </div>

      </div>
      
    );
  }
});


// Export component back for use in Main file
module.exports = Saved;