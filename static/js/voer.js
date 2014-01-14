var Voer = {};

function ajax_browse(url, types, languages, categories){
    //Get value
    $("#materials").html('<div class="bg-loading"><img src="/static/images/loading.gif" height="31" width="31" alt="loading..." /></div>');
    $.get(url , {types: types, languages: languages, categories: categories}, function( data ) {
        $("#materials" ).html( data );
    });
}


function ajax_browse_page(url){
    $.get(url, function(data){
        $('#materials').html(data)
    });
}


(function($, Voer, document) {
    Voer.Helper = (function(){
      return {
        login: function (){
          var formLogin = $('#login-form');
          var url = formLogin.attr('action');
          var messageObj = formLogin.find('.alert-modal-login');
          messageObj.addClass('hidden');

          $.post(url, formLogin.serialize(), function(data){
            if (data.status == 1) {
              window.location.href = "/user/dashboard";
            } else {
              messageObj.children().html(data.message);
              messageObj.fadeIn("fast", function() {
                $(this).removeClass('hidden');
              });
            }
          });

          return false;
        },
        showPassword: function(checkboxEle, passwordEle) {
          if ($(checkboxEle).is(':checked')) {
            $(passwordEle).attr('type', 'text');
          } else {
            $(passwordEle).attr('type', 'password');
          }
        },
        getCookie: function(name){
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?

                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        },
        ajaxCatcher: function(){
          $('.ajax-ev[data-ajax-trigger="load"]').each(function(){
            var $this = $(this);
            var url = $this.attr('data-ajax-url');
            var target = $this.attr('data-ajax-target') || '#' + $(this).attr('id');
            _run(url, target);
          });
          $(document).on('click','.ajax-ev[data-ajax-trigger!="load"]', function(){
            var $this = $(this);
            var url = $this.attr('data-ajax-url');
            var target = $this.attr('data-ajax-target') || '#' + $(this).attr('id');
            _run(url, target);
          });

          function _run(url, target) {
            var $target = $(target);
            Voer.Helper.showLoadingState(target);
            $.ajax(url,{
              success: function(r){
                Voer.Helper.removeLoadingState(target);
                $target.html(r);
              },
              error: function() {
                Voer.Helper.removeLoadingState(target);
              }
            });
          }
        },
        showLoadingState: function(element) {
          if (element === undefined) {
            element = 'document';
            var coordinate = {top:0, left: 0};
            var loadingWidth = $(window).width() - 2;
            var loadingHeight = $(window).height() - 2;

          } else {
            var coordinate = $(element).offset();
            var loadingWidth = $(element).width() - 2;
            var loadingHeight = $(element).height() - 2;
          }

          if (loadingWidth == -2) {
            loadingWidth = 350;
          }

          if (loadingHeight == -2) {
            loadingHeight = 32;
          }

          var div = $(document.createElement('div'));
          var elementId = element.substring(1);

          div.attr('id', elementId + '-loading');
          div.attr('class', 'ajax-loading');
          if (coordinate) {
            div.css({
              width: loadingWidth,
              height: loadingHeight,
              position: element == 'document' ? 'fixed' : 'absolute',
              zIndex: element == 'document' ? '2' : '999999',
              top: coordinate.top + 1,
              left: element == 'document' ? (coordinate.left + 1) : (coordinate.left + 1 + parseInt($(element).css('padding-left')))
            });
          }

          var loadingMargin = Math.round((loadingHeight / 2) - 16);
          var content = '<div style="text-align:center;margin-top:' + loadingMargin + 'px"><img src="/static/images/ajax-loader.gif" /></div>';

          div.html(content);
          div.appendTo('body');
        },
        removeLoadingState: function(element) {
          if (element === undefined) {
            element = '#document';
          } else {
            element = '#' + element.substring(1);
          }

          $(element + '-loading').remove();
        }
      };
    })();
})(jQuery, window.Voer, window.document);

(jQuery)(function($){
    Voer.Helper.ajaxCatcher();

    $(document).on('click', '.gridview', function(){
        $('.hfitems').toggleClass('gridview');
        $('.gridview').toggleClass('active');
        $('.listview').toggleClass('active');
    });

     $(document).on('click', '.listview', function(){
        $('.hfitems').toggleClass('gridview');
        $('.gridview').toggleClass('active');
        $('.listview').toggleClass('active');
    });
});
