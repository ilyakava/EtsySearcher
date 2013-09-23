ES.Collections.Listings = Backbone.Collection.extend({
  model: ES.Models.Listing,
  initialize: function () {
    var that = this;
    this.searchParams = new Backbone.Model();

    // collection knows how fast it needs to grow, so that it can
    // keep track of its current 'offset', otherwise, Etsy_api module
    // would need to know about the size of the object requesting more
    // items, should be the requester that determines demand for results
    this.growthSpeed = 30;

    var pruneCallback = that.prune.bind(that);
    this.listenTo(that.searchParams, "change add remove", pruneCallback);
  },

  setSearch: function (searchParams) {
    this.searchParams.set(searchParams);
    return this;
  },

  populate: function (callback) {
    var that = this;
    var baseParams = {
      "limit": that.growthSpeed,
      "offset": parseInt(that.length / that.growthSpeed, 10)
    };

    Etsy.getActiveListings(
      $.extend({}, baseParams, that.searchParams.attributes),
      function (data) {
        that.add(data, {merge: true});
        if (callback) { callback(that); }
      }
    );
    return this;
  },

  prune: function () {
    console.log("Pruning current collection of listings!");
    var that = this;
    // remove according to this.searchParams, once any of 3 truth tests
    // return true, that item is rejected.
    var remaining = that.reject(function (model) {
      // matching categories
      var matchingCats = _(model.get("category_path")).select(function (model_cat) {
        var paramCat = that.searchParams.get("category");
        if (paramCat && (paramCat != "none")) {
          return model_cat.toLowerCase() == paramCat;
        } else {
          return true;
        }
      });

      return (parseInt(that.searchParams.get("min_price")) > parseInt(model.get("price"))) ||
        (parseInt(that.searchParams.get("max_price")) < parseInt(model.get("price"))) ||
        !matchingCats.length;
    });

    that.reset(
      _.sortBy(remaining, function (model) {
        if (that.searchParams.get("sort_on") == "price") {
          return parseInt(model.get("price"));
        } else if (that.searchParams.get("sort_on") == "created") {
          return model.get("original_creation_tsz");
        }
      })
    );
    console.log("have pruned, " + remaining.length + " listings remain, and " + that.length + "in collection");
    return that;
  }

});