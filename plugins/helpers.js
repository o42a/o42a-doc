module.exports = function(env, callback) {
  var typogr = require("typogr");
  var URL = require("url");
  var prefix = '/__PAGE__/';
  function relativeUrl(base, url) {
    var baseSteps = base.split('/');
    var urlSteps = url.split('/');
    var commonLen = 0;
    while (commonLen < baseSteps.length
      && commonLen < urlSteps.length
      && baseSteps[commonLen] == urlSteps[commonLen]) ++commonLen;
    var result = "";
    for (var i = commonLen + 1; i < baseSteps.length; ++i) {
      result += "../";
    }
    for (var i = commonLen; i < urlSteps.length; ++i) {
      if (i > commonLen) result += '/';
      result += urlSteps[i];
    }
    return result;
  }
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
  function htmlIndexUrl(url) {
    if (url.charAt(url.length - 1) == '/') return url + 'index.html';
    return url;
  }
  env.helpers.normalizeHtmlUrl = normalizeHtmlUrl;
  env.helpers.contentUrl = contentUrl;
  env.helpers.relativeUrl = function(page, url) {
    if (url.charAt(0) == '/' && url.charAt(1) != '/') {
      return htmlIndexUrl(relativeUrl(page.getUrl('/'), url));
    }
    return htmlIndexUrl(relativeUrl(page.getUrl(), url));
  };
  env.helpers.htmlUrl = function(page, url) {
    return contentUrl(page, normalizeHtmlUrl(url));
  };
  env.helpers.navClass = function(page, url) {
    var u = '/' + url;
    var pageUrl = normalizeHtmlUrl(page.getUrl('/'));
    if (pageUrl.substring(0, u.length) == u) return "active";
  };
  env.helpers.renderPage = function(page) {
    // Replace the default links resolution algorithm
    // to convert absolute links to relative when they starts with
    // predefined `prefix`.
    var resolve = URL.resolve;
    var pageUrl = resolve.call(this, prefix, page.url);
    URL.resolve = function(base, url) {
      var resolved;
      if (url.charAt(0) == '/' && url.charAt(1) != '/') {
        // Always resolve absolute paths relatively to the root.
        resolved = resolve.call(this, prefix, url.substring(1, url.length));
      } else {
        resolved = resolve.call(this, base, url);
        // Not a prefix-based resolution.
        if (base != prefix) return resolved;
      }
      if (resolved.substring(0, prefix.length) != prefix) return resolved;
      return htmlIndexUrl(relativeUrl(pageUrl, resolved));
    };
    var html = typogr(page.getHtml(prefix)).typogrify();
    URL.resolve = resolve;
    return html;
  };
  callback();
};
