ZapplApp.config(function($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
    $urlRouterProvider.otherwise('/');
    $urlMatcherFactoryProvider.caseInsensitive(true);
    $urlMatcherFactoryProvider.strictMode(false);
    $stateProvider
  .state('/', {
            url: '/',
            controller:'loginCtrl',
            templateUrl: './views/login.html',
            authenticate : false
        })
    .state('Home', {
            url: '/Home',
            templateUrl: './views/home.html',
            controller:'feedInfoCtrl as fi',
            authenticate : true
        })
  .state('Message', {
            url : '/Message/{user}',
            templateUrl:"./views/message.html",
            //controller:"messageCtrl as mc",
            controller:"homeCtrl as hc",
            authenticate : true
  })
// .state("Message.Chat", {
//           url: '/{user2}',
//           templateUrl: "./views/message1.chat.html",
//           controller: 'messageCtrl as mc',
//           authenticate : true
//       })
// .state("Message.Group", {
//           url: '/group/{groupname}',
//           templateUrl: "./views/message1.group.html",
//           controller: 'messageCtrl as mc',
//           authenticate : true
//       })
.state("CreateGroup", {
          url: '/creategroup',
          templateUrl: "./views/message1.html",
          controller: 'messageCtrl as mc',
          authenticate : true
      })
.state('Comments', {
            url: '/Comments',
            templateUrl: './views/comments.html',
            controller:'commentCtrl as cc',
            authenticate : true
        })
  .state('Following1', {
            url: '/Followings',
            templateUrl: './views/following.html',
            controller:'homeCtrl as hc',
            authenticate : true
        })
  .state('Draft', {
            url: '/Drafts',
            templateUrl: './views/draft.html',
            controller:'homeCtrl as hc',
            authenticate : true
        })
  .state('Follower1', {
            url: '/Followers',
            templateUrl: './views/follower.html',
            controller:'homeCtrl as hc',
            authenticate : true
        })
  .state("Settings", {
            url: '/Settings',
            templateUrl: "./views/setting_public_profile.html",
            controller: "setting_public_profileCtrl as sc",
            authenticate : true
        })
  .state("Profile", {
            url: '/@{user}',
            templateUrl: "./views/profile.html",
            controller: "layoutCtrl as layout",
            authenticate : false
        })
  .state("Profile.Blog", {
            url: '/Blog',
            templateUrl: "./views/profile.blog.html",
            controller: 'homeCtrl as hc',
            authenticate : true
        })
  .state("Profile.Reply", {
            url: '/Reply',
            templateUrl: "./views/profile.reply.html",
            controller: 'homeCtrl as hc',
            authenticate : true
        })
  .state("Profile.Following", {
            url: '/Following',
            templateUrl: "./views/profile.following.html",
            controller: 'homeCtrl as hc',
            authenticate : true
        })
  .state("Profile.Follower", {
            url: '/Follower',
            templateUrl: "./views/profile.follower.html",
            controller: 'homeCtrl as hc',
            authenticate : true
        })
  .state("Wallet", {
            url : '/Wallet',
            templateUrl:"./views/wallet.html",
            controller:"walletCtrl as wc",
            authenticate : true
          })
  // .state("Feed", {
  //           url: '/Feed',
  //           templateUrl: "./views/feed.html",
  //           controller:"feedInfoCtrl as fi",
  //           authenticate : true
  //       })
  .state("UserPost", {
            url: '/:tag/:username/:permlink',
            templateUrl: "./views/userPost.html",
            controller:"homeCtrl as hc",
            authenticate : false
        })
      .state("FeedTagInfo", {
              url: '/:child/:tagChild?',
              params: {
                child: 'New',
                tagChild: ''
              },
              templateUrl: "./views/feedTagInfo.html",
              controller: "feedInfoCtrl as fi",
              authenticate : false
          });
          // $locationProvider.html5Mode(true);

      });


ZapplApp.run(['$state', '$rootScope','$transitions','$window','LoginService',function($state, $rootScope,$transitions,$window,LoginService){
  $transitions.onStart({},trans => {
    if (trans.to().authenticate && $rootScope.tokenValue == undefined){
          return $state.go('/');
      }
    else if(trans.to().authenticate == false && $rootScope.tokenValue == undefined){
      $rootScope.url = trans.to().url;
    }
      else{
        if($window.location.hash =='#!/'){
                var path = $window.location.origin;
                window.location = path+"/#!Home";
                $rootScope.url = '/Home';
                getUserInfoHome_test();
        }
        else {
          $rootScope.url = trans.to().url;
        }
      }
  });
}]);
