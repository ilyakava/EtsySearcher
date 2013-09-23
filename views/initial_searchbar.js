ES.Views.InitialSearchbar = Backbone.View.extend({
  id: 'search-bar',

  events: {
    "submit form": "firstSearch"
  },

  render: function () {
    var searchBar = new EJS({url: 'templates/initial_searchbar'}).render();
    this.$el.html(searchBar);
    return this;
  },

  firstSearch: function (event) {
    event.preventDefault();
    var searchTerm = _.uriifyForm($(event.target));
    Backbone.history.navigate("#/" + searchTerm);
  },

  close: function () {
    $(this.$el).undelegate('form', 'submit');
  }
});