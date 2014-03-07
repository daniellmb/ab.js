((window, as) ->
  
  # ensure we have an object
  window[as] = window[as] or {}

  # use the best randomizer available
  getRandomInt = ->
    try
      
      # array to hold an unsigned 16-bit integer
      ary = new Uint16Array(1)
      
      # fill the array with a cryptographically random number
      # supported in Chrome 11.0+; FireFox 21.0+; IE 11.0+; Opera 15.0+; Safari 3.1+
      # Note: even where supported could throw QuotaExceededError when entropy is low
      window.crypto.getRandomValues ary
      
      # divide by 2^16
      return ary[0] / 65536
    catch e
      
      # fall back to Math random
      return Math.random()
  
  # export A/B Test to global scope
  window[as].test = (variants, frequency) ->
    rnd = Math.random()
    
    # ignore values less than one ten thousandth
    if rnd > 0.0001
      rnd = Math.random()
      
      # check A/B test frequency
      if rnd < frequency
        
        # get a random integer
        rnd = getRandomInt()
        
        # return a random A/B variant
        return variants[Math.floor(rnd * variants.length)]
    
    # don't run A/B Test
    null

# choose where you want to export the function and the namespace
) window, 'AB'