ES.Routers.Router = Backbone.Router.extend({
  initialize: function ($rootEl) {
    this.$rootEl = $rootEl;
    this.$searchEl = $rootEl.find('#search-container');
    this.listings = new ES.Collections.Listings();
  },

  routes: {
    "": "home",
    "*search": "firstSearch",
    "*search/*subSearch": "subSearches"
  },

  home: function () {
    var that = this;

    var searchBar = new ES.Views.InitialSearchbar();
    this.$searchEl.html(searchBar.render().$el);
  },

  firstSearch: function (urlSearch) {
    var searchTerm = decodeURIComponent(urlSearch);

    // rendering a new searchbar because now form submission will
    // do a different action, refinning search instead of API call search
    var searchBar = new ES.Views.RefineSearchbar();
    this.$searchEl.html(searchBar.render().$el);
  }
});