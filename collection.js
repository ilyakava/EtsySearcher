ES.Collections.Listings = Backbone.Collection.extend({
  model: ES.Models.Listing,
  initialize: function (search) {
    this.searchTerms = null;
    this.filters = {};
  },

  setSearch: function (search) {
    // not in initialize because BB will make a item in the
    // collection when arguments are passed into `new` collection call

    // later need to handle multiple keywords and
    // AND relationships in quotes, regex?
    this.searchTerms = search;
    return this;
  },

  populate: function (callback) {
    var that = this;
    Etsy.getActiveListings(
      {
        "keywords": that.searchTerms,
        "limit": 30,
        "offset": 0
      },
      function (data) {
        that.add(data);
        callback(that);
      }
    );
    return this;
  }

});