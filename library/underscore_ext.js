_.mixin({
  humanize : function(string) {
    string = string.replace(/_/g, " ");
    return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
  }
});

_.mixin({
  uriifyForm : function(jQueryForm) {
    var arrOfFormObjs = jQueryForm.serializeArray();
    var arrOfObjs = _(arrOfFormObjs).map(function (hash) {
      // weird bug with object literal notation
      var newHash = new Object();
      newHash[hash.name] = hash.value;
      return newHash;
    });
    var obj = $.extend.apply(null, [{}].concat(arrOfObjs));
    return encodeURIComponent(JSON.stringify(obj));
  }
});

_.mixin({
  objectifyURI : function(uriStr) {
    var searchParams = decodeURIComponent(uriStr);
    return JSON.parse(decodeURIComponent(searchParams));
  }
});