window.ES = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function($rootEl) {
    new ES.Routers.Router($rootEl);
    Backbone.history.start();
  }
};
