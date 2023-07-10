(function () {
  "use strict";

  angular.module("public")
    .component("myInfo", {
        templateUrl: "src/public/myinfo/myinfo.html",
        bindings: {
            user: "<",
        },
        controller: MyInfoController,
  });

  MyInfoController.$inject = ["ApiPathImages"];
  function MyInfoController(ApiPathImages) {
    
    var $ctrl = this;

    $ctrl.basePath = ApiPathImages;
  }
})();