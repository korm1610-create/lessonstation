window.__STANDALONE__ = true;
(function () {
  var P = "ls:";
  function ok(v) { return Promise.resolve(v); }
  window.storage = {
    get: function (key) {
      try { var v = localStorage.getItem(P + key); return ok(v === null ? null : { key: key, value: v, shared: false }); }
      catch (e) { return Promise.reject(e); }
    },
    set: function (key, value) {
      try { localStorage.setItem(P + key, value); return ok({ key: key, value: value, shared: false }); }
      catch (e) { return Promise.reject(e); }
    },
    delete: function (key) {
      try { localStorage.removeItem(P + key); return ok({ key: key, deleted: true, shared: false }); }
      catch (e) { return Promise.reject(e); }
    },
    list: function (prefix) {
      var keys = [];
      try { for (var i = 0; i < localStorage.length; i++) { var k = localStorage.key(i); if (k.indexOf(P + (prefix || "")) === 0) keys.push(k.slice(P.length)); } } catch (e) {}
      return ok({ keys: keys, prefix: prefix, shared: false });
    }
  };
})();
