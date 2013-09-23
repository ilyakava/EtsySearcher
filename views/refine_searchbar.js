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

    var formParams = _.objectifyForm($(event.target));
    var mergedParams = $.extend({}, formParams, that.collection.searchParams);

    Backbone.history.navigate("#/" + _.uriifyObject(mergedParams));
  }
});