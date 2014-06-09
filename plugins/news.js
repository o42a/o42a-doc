module.exports = function(env, callback) {
  env.helpers.news = function(contents, offset, limit) {
    var all = contents.news._.pages.filter(
      function(item) {
        return item.filename.match(/\/\d{8}_[^/]+/);
      });
    all.sort(function(a, b) {
      var aName = a.filename;
      var bName = b.filename;
      if (aName > bName) return -1;
      if (aName < bName) return 1;
      return 0;
    });
    var result = all.slice(offset, offset + limit);
    for (var i = 0; i < result.length; ++i) {
      var article = result[i];
      var name = article.filename;
      var idx = name.lastIndexOf('/');
      article.metadata.published =
        name.substring(idx + 1, idx + 5)
        + '-' + name.substring(idx + 5, idx + 7)
        + '-' + name.substring(idx + 7, idx + 9);
      if (!article.metadata.title) {
        var release = article.metadata.release;
        if (release) {
          article.title = article.metadata.title = "Release " + release;
        }
      }
    }
    return {
      articles: result,
      offset: offset,
      hasMore: (offset + result.length) < all.length
    };
  };
  env.helpers.pageUrl = function(page, prefix, delta) {
    var name = page.filename;
    var slashIdx = name.lastIndexOf('/');
    if (slashIdx >= 0) name = name.substring(slashIdx + 1);
    var hyphenIdx = name.lastIndexOf('-');
    var pageNumber;
    if (hyphenIdx < 0) {
      pageNumber = 1;
    } else {
      pageNumber =
        parseInt(name.substring(hyphenIdx + 1, name.lastIndexOf('.')));
    }
    pageNumber += delta;
    if (pageNumber == 1) return env.helpers.htmlUrl(page, prefix);
    return env.helpers.htmlUrl(page, prefix + '-' + pageNumber);
  };
  callback();
};
