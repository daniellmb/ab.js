((window, as) ->
  
  # ensure we have an object
  window[as] = window[as] or {}
  
  # one time branching based on what encoding the device supports
  encode = (if typeof encodeURIComponent is 'function' then encodeURIComponent else escape)

  # call the given function on each property in the object
  forEachCall = (obj, func) ->
    
    # loop though the items in the object
    for prop of obj
      
      # restrict to only immediate properties of the object (exclude inherited)
      # call the function passing in the value and property
      func.call null, obj[prop], prop  if Object::hasOwnProperty.call(obj, prop)
  
  # convert object to query string params
  toParams = (obj) ->
    params = []
    
    # loop though the object properties
    forEachCall obj, (value, property) ->
      
      # ignore things like undefined
      
      # encode and append
      params.push encode(property) + '=' + encode(value)  if value or value is 0

    # return param list
    params.join '&'

  
  # export A/B Log to global scope
  window[as].log = (data, url, callback) ->
    
    # convert JSON object to query string params
    data = url + ((if url.indexOf('?') isnt -1 then '&' else '?')) + toParams(data)
    
    # take the top 2000 characters
    data = data.substring(0, 2000)
    
    # create image
    img = document.createElement('img')
    
    # assign optional callback
    img.onload = img.onerror = callback
    
    # log data
    img.src = data

# choose where you want to export the function and the namespace
) window, 'AB'