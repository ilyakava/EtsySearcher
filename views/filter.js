ES.Views.Filter = Backbone.View.extend({
  tagName: 'aside',
  id: 'filter',

  events: {
    'change form': 'updateFilters',
    'click button.price-range': 'updateFilters'
  },

  updateFilters: function (event) {
    console.log("filters changed!");
    var that = this;
    event.preventDefault();

    var formParams = _.objectifyForm($(event.target).parents('form'));
    var mergedParams = $.extend({}, that.collection.searchParams.attributes, formParams);
    
    Backbone.history.navigate("#/redirecting");
    Backbone.history.navigate("#/" + _.uriifyObject(mergedParams));
  },

  render: function () {
    console.log("rendering the filter view!!");
    var that = this;

    var filterHtml = new EJS({
      url: 'templates/filter'
    }).render(that.collection.searchParams.attributes);

    this.$el.html(filterHtml);
    return this;
  }
});