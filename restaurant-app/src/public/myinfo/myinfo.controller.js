(function () {
  "use strict";

  angular
    .module("public")
    .controller("MyInfoController", MyInfoController);

  MyInfoController.$inject = ["SignUpService"];
  function MyInfoController(SignUpService) {

    var $ctrl = this;

    //$ctrl.basePath = "https://www.davidchuschinabistro.com";

    $ctrl.user = {
      name: "",
      lastName: "",
      email: "",
      phone: "",
      menuItem: ""
    };

    $ctrl.user.name = SignUpService.user.name;
    $ctrl.user.lastName = SignUpService.user.lastName;
    $ctrl.user.email = SignUpService.user.email;
    $ctrl.user.phone = SignUpService.user.phone;
    $ctrl.user.menuItem = SignUpService.user.menuItem;
  }
})();