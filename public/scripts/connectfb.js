'use strict';

// DEFINE CONSTANTS
var OUR_APP_ID = '940080089378797';
var USER_ACCESS_TOKEN = 'CAACEdEose0cBAIZCgpZBYUrcLbvd0h3uKDqZAXSK6bssMv41ZBbWi9mF1UyJa62Pe3VPoSljjeqCA8A2PEzW3cAI09uPZC6sqwRFmGuDQLndWwTaSoV0LHZBZB0XhiOYAP6oEQbm0ios4CznTvAVh3q8xAejh1r1LWbIsYu481ZCRnynOwBfFDnRpgzi1VQzogKozjAs02p6d7xZAtBFL90AD';

var OUR_FB_GROUP_ID = '1622068484726531';

var EVENT_LINK = '/1622068484726531/events';
var EVENT_LINK_WITH_USER_ACCESS_TOKEN = EVENT_LINK + '?access_token=' + USER_ACCESS_TOKEN;

var OUR_APP_TOKEN = '940080089378797|iDuYj3BUuRwMl-PlkHtPPVm5O-4';        
var EVENT_LINK_WITH_APP_ACCESS_TOKEN = EVENT_LINK + '?access_token=' + OUR_APP_TOKEN;

var OUR_PAGE_ACCESS_TOKEN = 'CAANWZC3PJrZB0BANiFtDR7gZBM0zVMKDqEO9BbZCLwbT7La7BDRs88SFE1PEjxWIqZC5lCOOFktrICr7V9MzJROPkZBbiyz29YKMxZA81kNHU57n5HajTENgobrfRzM98ncpDZBBGvcx8voDlf2xy8hZCJSFOhXfHwXldMWl4uOu5nvZCmsE6KtZCGQ4Aq9ZBqSn0eS14oxmQH0joTgsdGWAdXbo';
var EVENT_LINK_WITH_PAGE_ACCESS_TOKEN = EVENT_LINK + '?access_token=' + OUR_PAGE_ACCESS_TOKEN;

// connects to the Facebook Graph API
window.fbAsyncInit = function () {
    FB.init({
      appId      : OUR_APP_ID,
      xfbml      : true,
      version    : 'v2.5'    
    });
    console.log("Our Page Access Token:");
    console.log(OUR_PAGE_ACCESS_TOKEN);
    console.log(" ");
    FB.api(
      EVENT_LINK_WITH_PAGE_ACCESS_TOKEN,
      'GET',
      {},
      function (response) {          
          console.log(response);          
      }
    );
};

(function (d, s, id){
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement(s); js.id = id;
 js.src = "//connect.facebook.net/en_US/sdk.js";
 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));




