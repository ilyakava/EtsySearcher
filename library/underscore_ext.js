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
      newHash[hash.name] = hash.value;
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
    var obj = objectifyForm(jQueryForm);
    return uriifyObject(obj);
  }
});

_.mixin({
  objectifyURI : function(uriStr) {
    var searchParams = decodeURIComponent(uriStr);
    return JSON.parse(searchParams);
  }
});