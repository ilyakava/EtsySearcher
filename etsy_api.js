Etsy = {
  getActiveListings: function (params, callback) {
    var url = "https://openapi.etsy.com/v2/listings/active.js";

    // more associations: http://www.etsy.com/developers/documentation/getting_started/resources#section_associations
    var baseParams = {
      "api_key": EtsyAPI.keystring,
      "includes": "Images:1:0"
    };

    if (params) {
      params = _.etsyifyHash(params);
    }

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