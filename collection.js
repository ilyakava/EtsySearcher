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
        that.add(data);
        callback(that);
      }
    );
    return this;
  },

  prune: function () {
    var that = this;
    // remove according to this.searchParams
    var remaining = this.reject(function (model) {
      return this.searchParams.get("min_price") > model.get("min_price") ||
        this.searchParams.get("max_price") < model.get("max_price") ||
        !(_(model.get("category_path")).select(function (model_cat) {
          return model_cat.toLowerCase() == this.searchParams.get("category");
        }).length);
    });

    this.models = _.sortBy(remaining, function (model) {
      if (this.searchParams.get("sort_on") == "price") {
        return parseInt(model.get("price"));
      } else if (this.searchParams.get("sort_on") == "created") {
        return model.get("original_creation_tsz");
      }
    });
    return this;
  }

});