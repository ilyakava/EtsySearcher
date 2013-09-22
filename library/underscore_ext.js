_.mixin({
  humanize : function(string) {
    string = string.replace(/_/g, " ");
    return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
  }
});

_.mixin({
  uriifyForm : function(jQueryForm) {
    var obj = $.extend.apply(null, jQueryForm.serializeArray());
    return JSON.stringify(obj);
  }
});

_.mixin({
  objectifyURI : function(uriStr) {
    var searchParams = decodeURIComponent(uriStr);
    return JSON.parse(decodeURIComponent(searchParams));
  }
});