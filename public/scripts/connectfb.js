'use strict';

// DEFINE CONSTANTS
var OUR_APP_ID = '940080089378797';
//var USER_ACCESS_TOKEN = 'CAACEdEose0cBAIZCgpZBYUrcLbvd0h3uKDqZAXSK6bssMv41ZBbWi9mF1UyJa62Pe3VPoSljjeqCA8A2PEzW3cAI09uPZC6sqwRFmGuDQLndWwTaSoV0LHZBZB0XhiOYAP6oEQbm0ios4CznTvAVh3q8xAejh1r1LWbIsYu481ZCRnynOwBfFDnRpgzi1VQzogKozjAs02p6d7xZAtBFL90AD';

var OUR_FB_GROUP_ID = '1622068484726531';

var EVENT_LINK = '/1622068484726531/events';
//var EVENT_LINK_WITH_USER_ACCESS_TOKEN = EVENT_LINK + '?access_token=' + USER_ACCESS_TOKEN;

<<<<<<< HEAD
var OUR_APP_TOKEN = '940080089378797|iDuYj3BUuRwMl-PlkHtPPVm5O-4';
var EVENT_LINK_WITH_APP_ACCESS_TOKEN = EVENT_LINK + '?access_token=' + OUR_APP_TOKEN;
=======
var OUR_APP_TOKEN = '940080089378797|iDuYj3BUuRwMl-PlkHtPPVm5O-4';        
//var EVENT_LINK_WITH_APP_ACCESS_TOKEN = EVENT_LINK + '?access_token=' + OUR_APP_TOKEN;

//var OUR_PAGE_ACCESS_TOKEN = 'CAANWZC3PJrZB0BAAYbGRgkM5O9oV4bYcR0vdvV6XrMNwrHYyro3rphQlYK38gacCeR95BNKPkFWoyKZAUF2jrceZAMGKy6cTEQUMOccnm8o4xITSDeqnOAgveZA9wkvIM1dTZC546SZBmDRzH6ZCpnqtv0Ou3XGSAmXiuRq2ZBByJNvOZAVGwJfbkSppzo8gEdW3H4G7S6ZBwAIerRJqJTJaLUP';
//var EVENT_LINK_WITH_PAGE_ACCESS_TOKEN = EVENT_LINK + '?access_token=' + OUR_PAGE_ACCESS_TOKEN;
var FEED_LINK = OUR_FB_GROUP_ID + '/feed';
>>>>>>> 77cfd7989f0747d041b63c54a8042a48d2cca7fd


// connects to the Facebook Graph API
window.fbAsyncInit = function () {
    FB.init({
      appId      : OUR_APP_ID,
      status     : true,
      xfbml      : true,
      version    : 'v2.5'
    });
<<<<<<< HEAD
    console.log("Our Page Access Token:");
    console.log(OUR_PAGE_ACCESS_TOKEN);
    console.log(" ");



=======
    
    FB.api(
      OUR_FB_GROUP_ID,
      'GET',
      {
          access_token: OUR_APP_TOKEN,  
          fields: 'id, description, cover, email, icon, link, name, privacy, updated_time'
      },
      function (response) {          
          console.log("This is the entire JSON returned from the group request: ");
          console.log(response);       
          console.log('-------------------------------');
      }
    );
    
    
    
    FB.api(
      FEED_LINK,
      'GET',
      {
          access_token: OUR_APP_TOKEN,  
      },
      function (response) {  
          console.log("This is the entire JSON returned from the feed request: ");
          console.log(response);       
          console.log('-------------------------------');
      }
    );
    
    
    
    FB.api(
      FEED_LINK,
      'GET',
      {
          access_token: OUR_APP_TOKEN,  
      },
      function (response) {          
          
          console.log("ID of first element in data array: ");
          console.log(response.data[0].id);
          
          console.log('-------------------------------');
          
          console.log("ID of 5th element in the data array: ");
          console.log(response.data[4].id);
          
          console.log('-------------------------------');
          
          console.log("Third element in the data array: ");
          console.log(response.data[2]);
          
          console.log('-------------------------------');
      }
    );
    
>>>>>>> 77cfd7989f0747d041b63c54a8042a48d2cca7fd
};

function myFacebookLogin() {
  FB.login(function(){}, {scope: 'publish_actions'});
  FB.api('/me/feed', 'post', {message: 'Hello, world!'});
   {scope: 'publish_actions'};
}




(function (d, s, id){
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement(s); js.id = id;
 js.src = "//connect.facebook.net/en_US/sdk.js";
 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
