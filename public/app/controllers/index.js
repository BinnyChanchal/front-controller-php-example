angular.module('playlistApp.site').controller('index', ['$scope', '$location', 'User', 'UserAuth', function ($scope, $location, User, UserAuth) {
    /**
     * Initialize scope
     */
    $scope['authError'] = false;

    /**
     * Request auth token
     */
    UserAuth.getAuthToken(function(response) {
        if (typeof response.token == 'undefined') {
            $scope['authError'] = 'Can not get token from server!';
            return;
        }

        $scope['userToken'] = User.setUserToken(response.token).getUserToken();
    }, function(err) {
        $scope['authError'] = err;
    });

    $scope['currentSite'] = $location.path();
    $scope.$on('$routeChangeSuccess', function() {
        $scope['currentSite'] = $location.path();
    });
}]);