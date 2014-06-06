module.exports = function(env, callback) {
  env.helpers.docs = {
    sections: function(contents) {
      var result = contents.docs._.directories.map(
        function(item) {
          return item;
        });
      result.sort(function(a, b) {
        var aOrder = parseInt(a.index.metadata.order);
        var bOrder = parseInt(b.index.metadata.order);
        if (aOrder) {
          if (bOrder) {
            var cmp = aOrder - bOrder;
            if (cmp) return cmp;
          } else {
            return -1;
          }
        } else if (bOrder) {
          return 1;
        }
        var aName = a.index.filename;
        var bName = a.index.filename;
        if (aName > bName) return 1;
        if (aName < bName) return -1;
        return 0;
      });
      return result;
    },
    section: function(section) {
      var result = section._.pages.filter(function(item) {
        return item.url != section.index.url;
      });
      result.sort(function(a, b) {
        var aOrder = parseInt(a.metadata.order);
        var bOrder = parseInt(b.metadata.order);
        if (aOrder) {
          if (bOrder) {
            var cmp = aOrder - bOrder;
            if (cmp) return cmp;
          } else {
            return -1;
          }
        } else if (bOrder) {
          return 1;
        }
        var aName = a.filename;
        var bName = a.filename;
        if (aName > bName) return 1;
        if (aName < bName) return -1;
        return 0;
      });
      return result;
    }
  };
  callback();
};
