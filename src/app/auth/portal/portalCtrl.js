export default ($scope, $timeout, $state, $q, $sessionStorage, qService, accountRes) => {
    'ngInject';

    $scope.login = () => {
    	if (isNull($scope.loginAccount)) {
    		$scope.errMessage = "账号不能为空!";
    		$q((resolve, reject) => {
        		$timeout(() => {
        			$scope.errMessage = "";
        			resolve();
        		}, 1500);
            });
    		return;
    	}
    	let info = {
    		'X-Username': $scope.loginAccount,
    		// 'X-Auth-Password': encryptPsw($scope.loginPassword)
            'X-Password': $scope.loginPassword
    	};
    	qService.httpPost(accountRes.account, {}, info, {}).then((data,headers) => {
    		if (data.errorCode == "NO_ERROR") {
                // console.log(headers[X-Auth-Token]);
    			$state.go('in.home');
    		} else {
                $scope.errMessage = "账号/密码不匹配!";
            }
    	}, (err) => {
    		console.log("Error:" + err);
    	});
    };

    let isNull = (value) => {
    	return typeof(value) == undefined || value == null;
    };

    let encryptPsw = (acc, psw, vcode) => {
    	let code = vcode == undefined? 'opzq' : vcode;
    	return md5(md5(md5(psw) + acc) + code.toUpperCase());
    };

    // 设置内容居中
    $(function() {
        let contentH = 446; // 内容高度
        let clientH = $(window).height(); // 视口高度
        let marginT = (clientH - contentH) / 2 - 5;

        $(".index-module").css("margin-top", marginT + "px");
    });
};
