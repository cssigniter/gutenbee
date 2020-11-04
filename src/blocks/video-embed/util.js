const GetVimeoIDbyUrl = url => {
  var id = false;
  var request = new XMLHttpRequest();
  request.open('GET', 'https://vimeo.com/api/oembed.json?url=' + url, false);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var response = JSON.parse(request.responseText);
      if (response.video_id) {
        id = response.video_id;
      }
    }
  };
  request.send();
  return id;
};

const ytPattern = [
  /^https?:\/\/((m|www)\.)?youtube\.com\/.+/i,
  /^https?:\/\/youtu\.be\/.+/i,
];

const vimeoPattern = [/^https?:\/\/(www\.)?vimeo\.com\/.+/i];

const matchesPatterns = (url, patterns = []) =>
  patterns.some(pattern => url.match(pattern));

const getVideoInfo = url => {
  if (matchesPatterns(url, ytPattern)) {
    return {
      provider: 'youtube',
      id: url.split('v=').pop(),
    };
  } else if (matchesPatterns(url, vimeoPattern)) {
    return {
      provider: 'vimeo',
      id: GetVimeoIDbyUrl(url),
    };
  } else {
    return {
      provider: 'unsupported',
    };
  }
};

export { GetVimeoIDbyUrl, getVideoInfo };
