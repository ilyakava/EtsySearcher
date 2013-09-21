ES.Collections.Listings = Backbone.Collection.extend({
  model: ES.Models.Listing,
  initialize: function (search) {
    // later need to handle multiple keywords and
    // AND relationships in quotes, regex?
    this.searchTerms = search || "";
  },

  populate: function () {
    var that = this;
    Etsy.getActiveListings({"keywords": that.searchTerms}, function (data) {
      that.add(data);
    });
  }

});