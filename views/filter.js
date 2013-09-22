ES.Views.Filter = Backbone.View.extend({
  tagName: 'aside',
  id: 'filter',

  events: {
    'change form': 'updateFilters',
    'click button.price-range': 'updateFilters'
  },

  updateFilters: function (event) {
    console.log("filters changed!");
    event.preventDefault();
    var formData = $(event.target).parents('form').serializeArray();

    // merges the form array of hashes into one hash, and writes it to URI
    var filters = $.extend.apply(null, formData);
    var filtersString = JSON.stringify(filters);
    Backbone.history.navigate("#/" + encodeURIComponent(filtersString));
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