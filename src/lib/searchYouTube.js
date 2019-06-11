var options = (query, max, key) => {return {query, max, key}};

var searchYouTube = (options, callback) => {
  console.log(options)
  // TODO
  $.ajax({
    url: `https://www.googleapis.com/youtube/v3/search`,
    type: 'GET',
    data: {
      part: "snippet",
      q: options.query, 
      key: options.key,
      maxResults: options.max,
      type: 'video',
      videoEmbeddable: true
    },
    contentType: 'application/json',
    success: callback,
    error: function(data) {
      console.error('error', data);
    }
  })



};

export { searchYouTube, options };
