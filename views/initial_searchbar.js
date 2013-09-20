ES.Views.InitialSearchbar = Backbone.View.extend({
  id: 'search-container',
  className: 'group',

  events: {
    "submit form": "search"
  },

  render: function () {
    var searchBar = new EJS({url: 'templates/initial_searchbar'}).render();
    this.$el.html(searchBar);
    return this;
  },

  search: function (event) {
    event.preventDefault();
    var searchTerm = $(event.target).children(":first").val();
    Backbone.history.navigate("#/" + encodeURIComponent(searchTerm));
  }
});