ES.Views.ResultsList = Backbone.View.extend({
	tagName: 'ul',
  id: 'results',
  className: 'group',

  render: function () {
    var that = this;
    // clear this view, then render each listing
    this.$el.html();

    this.collection.each(function (listing) {
      var listingView = new ES.Views.OneListing({
        model: listing
      });
      that.$el.append(listingView.render().$el);
    });
    return this;
  }
});