ES.Views.RefineSearchbar = Backbone.View.extend({
  id: 'search-bar',

  events: {
    "submit form": "search"
  },

  initialize: function (searchTerm) {
    this.searchTerm = searchTerm;
  },

  render: function () {
    var that = this;
    var searchBar = new EJS({
      url: 'templates/refine_searchbar',
      // searchTerm: that.searchTerm
    }).render();
    
    this.$el.html(searchBar);
    return this;
  },

  search: function (event) {
    event.preventDefault();
    // var searchTerm = $(event.target).children(":first").val();
    // Backbone.history.navigate("#/" + encodeURIComponent(searchTerm));
  }
});