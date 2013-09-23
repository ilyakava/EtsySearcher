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
    "*searchParams": "search"
  },

  home: function () {
    var searchBar = new ES.Views.InitialSearchbar();
    this.$searchEl.html(searchBar.render().$el);
  },

  search: function (uriSearch) {
    var that = this;
    var searchParams = _.objectifyURI(uriSearch);
    console.log("route has changed, new search object: " + JSON.stringify(searchParams));

    // Displaying the results... first create the collection
    // don't make a new collection for repeat searches
    this.results = this.results || new ES.Collections.Listings();
    // but searchParams of collection should always update from URI
    this.results.setSearch(searchParams);

    // fetch items from API on first load,
    // and then render with a callback
    if (!this.results.length) {
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
    }

    // rendering a new searchbar, because now, form submission will perform
    // a different action: refinning search instead of new API-call-search
    var searchBar = new ES.Views.RefineSearchbar({
      collection: that.results
    });
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