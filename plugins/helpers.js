module.exports = function(env, callback) {
  function contentUrl(page, url) {
    var pageUrl = page.getUrl('/');
    var rootSteps = pageUrl.split('/');
    var rootPath = "";
    for (var i = 2; i < rootSteps.length; ++i) rootPath += '../';
    return rootPath + url;
  }
  function normalizeHtmlUrl(url) {
    if (!url) return 'index.html';
    if (url.charAt(url.length - 1) == '/') return url + 'index.html';
    return url + '.html';
  }
  env.helpers.normalizeHtmlUrl = normalizeHtmlUrl;
  env.helpers.contentUrl = contentUrl;
  env.helpers.htmlUrl = function(page, url) {
    return contentUrl(page, normalizeHtmlUrl(url));
  };
  env.helpers.navClass = function(page, url) {
    var u = '/' + url;
    var pageUrl = normalizeHtmlUrl(page.getUrl('/'));
    if (pageUrl.substring(0, u.length) == u) return "active";
  };
  callback();
};
