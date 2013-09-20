ES.Routers.Router = Backbone.Router.extend({
  initialize: function ($rootEl) {
    this.$rootEl = $rootEl;
  },

  routes: {
    "": "home",
    "*search": "firstSearch",
    "*search/*subSearch": "refineSearch"
  },

  home: function () {
    var that = this;

    var searchBar = new ES.Views.InitialSearchbar();
    this.$rootEl.find('#search-container').replaceWith(searchBar.render().$el);
  },

  firstSearch: function (urlSearch) {
    var searchTerm = decodeURIComponent(urlSearch);
    console.log(searchTerm);

    var searchBar = new ES.Views.RefineSearchbar();
    this.$rootEl.find('#search-container').replaceWith(searchBar.render().$el);
  }
});