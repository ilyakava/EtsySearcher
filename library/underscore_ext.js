_.mixin({
  humanize : function(string) {
    string = string.replace(/_/g, " ");
    return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
  }
});

_.mixin({
  objectifyForm : function(jQueryForm) {
    var arrOfFormObjs = jQueryForm.serializeArray();
    var arrOfObjs = _(arrOfFormObjs).map(function (hash) {
      // weird bug with object literal notation
      var newHash = new Object();
      if (hash.value) {
        newHash[hash.name] = hash.value;
      }
      return newHash;
    });
    // merge
    var obj = $.extend.apply(null, [{}].concat(arrOfObjs));
    return obj;
  }
});

_.mixin({
  uriifyObject : function(obj) {
    return encodeURIComponent(JSON.stringify(obj));
  }
});

_.mixin({
  uriifyForm : function(jQueryForm) {
    var obj = _.objectifyForm(jQueryForm);
    return _.uriifyObject(obj);
  }
});

_.mixin({
  objectifyURI : function(uriStr) {
    var searchParams = decodeURIComponent(uriStr);
    return JSON.parse(searchParams);
  }
});

_.mixin({
  etsyifyHash : function(hash) {
    // logic for never decoding an empty string as a value of params
    // because that will be detrimental for etsy API
    var newHash = new Object();
    for (var key in hash) {
      if (hash.key && (hash.key != "none")) {
        newHash[key] = hash.key;
      }
    }
    console.log("pruifying hash!: " + JSON.stringify(newHash));
    return newHash;
  }
});