Etsy = {
  getActiveListings: function (params, callback) {
    var url = "https://openapi.etsy.com/v2/listings/active.js";

    var baseParams = {
      "api_key": EtsyAPI.keystring,
    };

    $.ajax({
      url: url,
      dataType: 'jsonp',
      type: 'GET',
      data: $.extend(baseParams, params || {}),
      success: function (response) {
        console.log("etsy active listings success!");
        callback(response["results"]);
      },
      error: function (err) {
        console.log("etsy active listings failed :(");
      }
    });
  }
};