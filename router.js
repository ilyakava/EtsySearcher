ES.Routers.Router = Backbone.Router.extend({
  initialize: function ($rootEl) {
    this.$rootEl = $rootEl;
    this.$search = $rootEl.find('#search-container');
  },

  routes: {
    "": "home",
    "*search": "basicSearch",
    "*search/*subSearch": "refineSearch"
  },

  home: function () {
    var that = this;

    var searchBar = new ES.Views.InitialSearchbar();
    this.$rootEl.prepend(searchBar.render().$el);
  }
});