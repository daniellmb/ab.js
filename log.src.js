(function (window, as) {

  // ensure we have an object
  window[as] = window[as] || {};

  // one time branching based on what encoding the device supports
  var encode = typeof encodeURIComponent === 'function' ? encodeURIComponent : escape;

  // call the given function on each property in the object
  function forEachCall(obj, func) {
    
    // loop though the items in the object
    for (var prop in obj) {
      
      // restrict to only immediate properties of the object (exclude inherited)
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {

        // call the function passing in the value and property
        func.call(null, obj[prop], prop);
      }
    }
  }

  // convert object to query string params
  function toParams(obj) {
    var params = [];

    // loop though the object properties
    forEachCall(obj, function (value, property) {

      // ignore things like undefined
      if (value || value === 0) {
        
        // encode and append
        params.push(encode(property) + '=' + encode(value));
      }
    });

    // return param list
    return params.join('&');
  }

  // export A/B Log to global scope
  window[as].log = function (/*Object*/ data, /*String*/ url, /*Function*/ callback) {

    // convert JSON object to query string params
    data = url + (url.indexOf('?') !== -1 ? '&':'?') + toParams(data);

    // take the top 2000 characters
    data = data.substring(0, 2000);

    // create image
    var img = document.createElement('img');

    // assign optional callback
    img.onload = img.onerror = callback;

    // log data
    img.src = data;
  };

  // choose where you want to export the function and the namespace
}(window, 'AB'));