ES.Views.InitialSearchbar = Backbone.View.extend({
  id: 'search-container',
  className: 'group',

  render: function () {
    var searchBar = new EJS({url: 'templates/initial_searchbar'}).render();
    this.$el.html(searchBar);
    return this;
  }
});