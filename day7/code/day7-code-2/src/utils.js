var app = app || {}

  (function () {
    app.utils = {
      store: function (namespace, data) {
        if (data) {
          return localStorage.setItem(namespace, JSON.stringify(data))
        }

        var store = localStorage.getItem(namespace)
        return (store && JSON.parse(store)) || []
      }
    }
  })();