ES.Views.Filter = Backbone.View.extend({
  tagName: 'aside',
  id: 'filter',

  render: function () {
    console.log("rendering the filter view!!");
    var that = this;

    var filterHtml = new EJS({
      url: 'templates/filter'
    }).render(that.collection.filters);

    this.$el.html(filterHtml);
    return this;
  }
});