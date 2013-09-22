ES.Views.Filter = Backbone.View.extend({
  tagName: 'aside',
  id: 'filter',

  events: {
    'change form': 'updateFilterObj',
    'click button.price-range': 'updateFilterObj'
  },

  updateFilterObj: function (event) {
    event.preventDefault();
    var formData = $(event.target).parents('form').serializeArray();
    console.log("filters changed!");

    // merges the form array of hashes into one hash, and sets it
    // tradeoff: know about the characteristics of the collection,
    // the filters attribute VS Depend on a method in the collection
    // that in turn expects its filters to come in, in a certain format
    this.collection.filters = $.extend.apply(null, formData);
  },

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