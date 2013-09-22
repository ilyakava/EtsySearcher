ES.Collections.Listings = Backbone.Collection.extend({
  model: ES.Models.Listing,
  initialize: function () {
    this.searchTerms = null;
    // collection needs to know to prune itself
    this.filters = {};

    // collection knows how fast it needs to grow, so that it can
    // keep track of its current 'offset', otherwise, Etsy_api module
    // would need to know about the size of the object requesting more
    // items, should be the requester that determines demand for results
    this.growthSpeed = 30;
  },

  setSearch: function (search) {
    // not in initialize because BB will make a item in the
    // collection when arguments are passed into `new` collection call
    this.searchTerms = search;
    return this;
  },

  setFilters: function () {

  },

  populate: function (callback) {
    var that = this;
    Etsy.getActiveListings(
      {
        "keywords": that.searchTerms,
        "limit": that.growthSpeed,
        "offset": parseInt(that.length / that.growthSpeed, 10)
      },
      function (data) {
        that.add(data);
        callback(that);
      }
    );
    return this;
  }

});