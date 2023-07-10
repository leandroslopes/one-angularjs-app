(function () {
  "use strict";

  angular
    .module("public")
    .controller("SignUpController", SignUpController);

  SignUpController.$inject = ["MenuService", "SignUpService"];
  function SignUpController(MenuService, SignUpService) {

    var $ctrl = this;

    $ctrl.submit = function () {

      SignUpService.user.name = $ctrl.user.name;
      SignUpService.user.lastName = $ctrl.user.lastName;
      SignUpService.user.email = $ctrl.user.email;
      SignUpService.user.phone = $ctrl.user.phone;
        
      MenuService
          .getMenuItem($ctrl.user.menuItem)
          .then(function (response) {

              $ctrl.menuItem = response;

              SignUpService.user.menuItem = $ctrl.menuItem;
          });
    };
  }
})();