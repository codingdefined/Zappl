var ZapplApp=angular.module('ZapplApp',['ui.router','ui.bootstrap','angularjs-crypto']);ZapplApp.directive('loading',['$http',function($http){return{restrict:'A',link:function(scope,elm,attrs){scope.isLoading=function(){return $http.pendingRequests.length>0;};scope.$watch(scope.isLoading,function(v){if(v){console.log("s");$("#loader").show();}else{console.log("h");$("#loader").hide();}});}};}]);
