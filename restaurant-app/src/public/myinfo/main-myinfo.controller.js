(function () {
  "use strict";

  angular
    .module("public")
    .controller("MainMyInfoController", MainMyInfoController);

  MainMyInfoController.$inject = ["SignUpService"];
  function MainMyInfoController(SignUpService) {

    var $ctrl = this;

    $ctrl.user = SignUpService.user;    
  }
})();