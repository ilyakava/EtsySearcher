ES.Collections.Listings = Backbone.Collection.extend({
  model: ES.Models.Listing,
  initialize: function () {
    this.searchParams = null;

    // collection knows how fast it needs to grow, so that it can
    // keep track of its current 'offset', otherwise, Etsy_api module
    // would need to know about the size of the object requesting more
    // items, should be the requester that determines demand for results
    this.growthSpeed = 30;
  },

  setSearch: function (searchParams) {
    // not in initialize because BB will make a item in the
    // collection when arguments are passed into `new` collection call
    // still... should this logic be in refine_searchbar? which is
    // responsible for altering keywords after one is set?
    if (this.searchParams) {
      var oldKeywords = " " + this.searchParams["keywords"];
      searchParams["keywords"] += oldKeywords;
    }
    this.searchParams = searchParams;
    return this;
  },

  populate: function (callback) {
    var that = this;
    var baseParams = {
      "limit": that.growthSpeed,
      "offset": parseInt(that.length / that.growthSpeed, 10)
    };

    Etsy.getActiveListings(
      $.extend({}, baseParams, that.searchParams),
      function (data) {
        that.add(data);
        callback(that);
      }
    );
    return this;
  }

});