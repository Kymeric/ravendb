define(["require", "exports", "durandal/app", "plugins/router", "models/collection", "models/database", "models/document", "common/raven", "common/pagedList"], function(require, exports, __app__, __router__, __collection__, __database__, __document__, __raven__, __pagedList__) {
    
    var app = __app__;
    
    var router = __router__;

    var collection = __collection__;
    var database = __database__;
    var document = __document__;
    
    var raven = __raven__;
    var pagedList = __pagedList__;

    var userInfo = (function () {
        function userInfo() {
            this.displayName = "user info";
            this.data = ko.observable();
            this.ravenDb = new raven();
        }
        userInfo.prototype.activate = function (args) {
            var _this = this;
            console.log("this is USERINFO!");

            if (args && args.database) {
                ko.postbox.publish("ActivateDatabaseWithName", args.database);
            }

            this.ravenDb.userInfo().done(function (info) {
                _this.data(info);
            });
        };

        userInfo.prototype.canDeactivate = function () {
            return true;
        };
        return userInfo;
    })();

    
    return userInfo;
});
//# sourceMappingURL=userInfo.js.map
