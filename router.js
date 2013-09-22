ES.Routers.Router = Backbone.Router.extend({
  initialize: function ($rootEl) {
    this.$rootEl = $rootEl;
    this.$searchEl = $rootEl.find('#search-container');
    this.$resultsEl = $rootEl.find('#results-container');
    this.$filterEl = $rootEl.find('#filter-container');
    this.results = null;
  },

  routes: {
    "": "home",
    "*search": "firstSearch",
    "*search/*filters": "subSearches"
  },

  home: function () {
    var searchBar = new ES.Views.InitialSearchbar();
    this.$searchEl.html(searchBar.render().$el);
  },

  firstSearch: function (uriSearch) {
    var that = this;
    var searchTerm = decodeURIComponent(uriSearch);

    // Displaying the results... first create the collection
    this.results = new ES.Collections.Listings().setSearch(searchTerm);
    // and fetch items from API, and then render with a callback
    this.results.populate(
      function (collection) {
        // insert listings on the page for the first time
        console.log(collection);
        var resultsView = new ES.Views.ResultsList({
          collection: collection
        });
        that.$resultsEl.html(resultsView.render().$el);
      }
    );

    // rendering a new searchbar because now form submission will
    // do a different action, refinning search instead of API-call-search
    var searchBar = new ES.Views.RefineSearchbar();
    this.$searchEl.html(searchBar.render().$el);

    // render filter bar
    var filterView = new ES.Views.Filter({
      collection: that.results
    });
    this.$filterEl.html(filterView.render().$el);
  },

  subSearches: function (uriSearch, uriFilters) {
    var searchTerm = decodeURIComponent(uriSearch);
    var filtersObj = JSON.parse(decodeURIComponent(filters));

    if (this.results) {
      this.results.filters = filtersObj;
    }
  }
});