ES.Views.RefineSearchbar = Backbone.View.extend({
  id: 'search-bar',

  events: {
    "submit form": "addKeywords"
  },

  render: function () {
    var that = this;
    var searchBar = new EJS({
      url: 'templates/refine_searchbar'
    }).render();
    
    this.$el.html(searchBar);
    return this;
  },

  addKeywords: function (event) {
    console.log("adding keywords!");
    var that = this;
    event.preventDefault();

    var oldParams = this.collection.searchParams.attributes;
    var formParams = _.objectifyForm($(event.target));
    // not in initialize because BB will make a item in the
    // collection when arguments are passed into `new` collection call
    // still... should this logic be in refine_searchbar? which is
    // responsible for altering keywords after one is set?
    var newKeywords = " " + formParams["keywords"];
    oldParams["keywords"] += newKeywords;

    Backbone.history.navigate("#/" + _.uriifyObject(oldParams));
  }
});