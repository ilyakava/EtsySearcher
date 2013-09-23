ES.Views.ResultsList = Backbone.View.extend({
	tagName: 'ul',
  id: 'results',
  className: 'group',

  initialize: function () {
    var that = this;
    var renderCallback = that.render.bind(that);
    that.listenTo(that.collection, "add change remove", renderCallback);
  },

  render: function () {
    var that = this;
    console.log("rendering results list");
    // clear this view, then render each listing
    this.$el.html();

    this.collection.each(function (listing) {
      var listingView = new ES.Views.OneListing({
        model: listing
      });
      that.$el.append(listingView.render().$el);
    });

    this.$el.append(new EJS({
      url: 'templates/listing_spinner',
    }).render());
    
    return this;
  }
});