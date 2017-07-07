/**
 * Created by hulingjie on 2017/7/7.
 */
(function() {
  "use strict";
  var currentCookieString = document.cookie || '';
  var theme;
  var lastCookieString = '';
  if (currentCookieString !== lastCookieString) {
    var cookieArray = currentCookieString.split('; ');
    var i, cookie, index, name;
    for (i = 0; i < cookieArray.length; i++) {
      cookie = cookieArray[i];
        index = cookie.indexOf('=');
        if (index > 0) {
          name = cookie.substring(0, index);
          if (name === "neo_theme"){
            theme = cookie.substring(index + 1);
            document.body.setAttribute("theme",  theme);
          }
        }
    }
  }

})();
