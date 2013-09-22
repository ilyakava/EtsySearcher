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
    console.log(formData);
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