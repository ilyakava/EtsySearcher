window.ES = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  CategoryChoices: Etsy.genCatObjFromJSON(),
  initialize: function($rootEl) {
    new ES.Routers.Router($rootEl);
    Backbone.history.start();
  }
};
