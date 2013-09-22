ES.Routers.Router = Backbone.Router.extend({
  initialize: function ($rootEl) {
    this.$rootEl = $rootEl;
    this.$searchEl = $rootEl.find('#search-container');
    this.$resultsEl = $rootEl.find('#search-container');
    this.results = null;
  },

  routes: {
    "": "home",
    "*search": "firstSearch",
    "*search/*subSearch": "subSearches"
  },

  home: function () {
    var searchBar = new ES.Views.InitialSearchbar();
    this.$searchEl.html(searchBar.render().$el);
  },

  firstSearch: function (urlSearch) {
    var that = this;

    var searchTerm = decodeURIComponent(urlSearch);
    this.results = new ES.Collections.Listings(searchTerm).populate();

    // rendering a new searchbar because now form submission will
    // do a different action, refinning search instead of API call search
    var searchBar = new ES.Views.RefineSearchbar();
    this.$searchEl.html(searchBar.render().$el);

    // insert listings on the page for the first time
    var resultsView = new ES.Views.ResultsList({
      collection: that.results
    });

  }
});