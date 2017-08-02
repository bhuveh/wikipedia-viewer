var main = function () {
  $('.results-box').hide();
  
  //Click on search to show search options.
  $('.center-box').on('click', '.expand', showSearch)
  
  //Click on search to search.  
  $('.center-box').on('click', '.search', search);
  
  //Click on clear.
  $('.center-box').on('click', '.fa-times', clearText)
    
  $('.center-box').on('click', '.clear-all', clearResults);
  
  //Click on random.
  $('.fa-random').on('click', function() {
    $('.fa-random').fadeOut(100);
    $('.search-box').fadeOut(100);
    $('.fa-times').fadeOut(100);
    $('.fa-search').animate({
      left: "50%"
    }, 200);
    $('.fa-search').removeClass('search');
    $('.fa-search').addClass('expand');
  });
  
  //Enter key behavior.
  /*
  $('#str').on('keypress', function (e) {
    var key = e.which;
    if(key == 13)
    {
      $('.search').trigger('click');
    }
  });
  */
};

//Show search box and options.
var showSearch = function() {
  $('.results-box').hide();
  $('.results-box').html('');
  $('#str').val('');
  $('.fa-times').fadeIn(100);
  $('.fa-times').animate({
    left: "68%"
  }, 200);
  $('.fa-search').animate({
    left: "76.5%"
  }, 200);
  $('.fa-search').addClass('search');
  $('.fa-search').removeClass('expand');
  $('.fa-random').fadeIn(100);
  $('.fa-random').animate({
    left: "85.5%"
  }, 200);
  $('.search-box').fadeIn(100);
};

//Search.
var search = function() {
  $('.fa-search').fadeOut(100);
  $('.fa-random').fadeOut(100);
  $('.fa-times').animate({
    left: "85%"
  }, 100);
  $('.fa-times').addClass('clear-all');
  var str = $('#str').val();
  getTitles(str);
  $('.results-box').show();
};

//Clear text.
var clearText = function() {
    if ($('#str').val() == '') {
      $('.search-box').fadeOut(100);
      $('.fa-search').removeClass('search');
      $('.fa-search').addClass('expand');
      $('.fa-search').animate({
        left: "50%"
      }, 200);
      $('.fa-times').removeClass('clear-all');
      $('.fa-times').fadeOut(100);
      $('.fa-random').fadeOut(100);
    };
    $('#str').val('');
    $('.results-box').html('');
};

//Clear results.
var clearResults = function() {
    $('.search-box').fadeOut(100);
    $('.fa-search').show();
    $('.fa-search').removeClass('search');
    $('.fa-search').addClass('expand');
    $('.fa-search').animate({
      left: "50%"
    }, 200);
    $('.fa-times').removeClass('clear-all');
    $('.fa-times').fadeOut(100);
    $('.results-box').fadeOut(100);
    $('.results-box').html('');
 };

var getTitles = function(text) {
  var url = 'http://en.wikipedia.org/w/api.php';
  var props = {
    dataType: "jsonp",
    data: {
      format: 'json',
      action: 'opensearch',
      search: text
    }
  };
  var ajaxCall = $.ajax(url, props);
  ajaxCall.done(processTitles);
  ajaxCall.fail(function(error) {
    $('.results-box').html(JSON.stringify(error));
  });
};

var processTitles = function(data) {
  var resultsNum = data[1].length;
  var resultsArr = [];
  for (var i = 0; i < resultsNum; i++) {
    var htmlS = '<div class="result"><a href="';
    htmlS = htmlS + data[3][i] + '" target="_blank"><h2>';
    htmlS = htmlS + data[1][i] + '</h2><p>';
    htmlS = htmlS + data[2][i] + '</p>';
    htmlS = htmlS + '</a></div>';
    resultsArr.push(htmlS);
  };
  $('.results-box').html(resultsArr);
};

$(document).ready(main);