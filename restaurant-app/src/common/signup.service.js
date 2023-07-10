(function () {
    "use strict";

    angular.module("common")
        .service("SignUpService", SignUpService);

    function SignUpService() {
        
        var service = this;
        
        service.user = {
            name: "",
            lastName: "",
            email: "",
            phone: "",
            menuItem: {}
        };
    }
})();