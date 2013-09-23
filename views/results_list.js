ES.Views.ResultsList = Backbone.View.extend({
	tagName: 'ul',
  id: 'results',
  className: 'group',

  initialize: function () {
    var that = this;
    var renderCallback = that.render.bind(that);
    that.listenTo(that.collection, "reset add change remove", renderCallback);

    _.bindAll(this, 'checkScroll');
    // bind to window
    $(window).scroll(this.checkScroll);
  },

  render: function () {
    var that = this;
    console.log("rendering results list. length: " + that.collection.length);
    // clear this view, then render each listing
    this.$el.html("");

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
  },

  checkScroll: function (event) {
    var that = this;
    var content = $(event.target);
    var topPosition = content.scrollTop();

    // var info = "top of Scrolling window: " + topPosition +
    //   " , height of rendered content: " + content.height() +
    //   " , height of browser: " + window.innerHeight;
    // console.log(info);

    // infinite scroll keeks fetching items for some reason

    // if (topPosition + window.innerHeight >= content.height()) {
    //   that.collection.populate();
    //   content.scrollTop(topPosition - 100);
    // }
  },
});