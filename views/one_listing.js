ES.Views.OneListing = Backbone.View.extend({
	tagName: 'li',
  className: 'result',

  render: function () {
		var that = this;
    var listing = new EJS({
      url: 'templates/one_listing',
      model: that.model
    }).render();
    this.$el.html(listing);
    return this;
	}
});