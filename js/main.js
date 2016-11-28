$(document).ready(function(){

        $('#ajax-loading').hide();
    $('#selections').on('change',function(){
        $('#ajax-loading').show();
        $('header').addClass('header-size');
        var $newsarea = $ ('.news-area');
        $newsarea.empty();
    // $('#selections').on('change',function(event){
    //     event.preventDefault();
        
        var selected = $('#selections').val();
        var url = 'https://api.nytimes.com/svc/topstories/v2/' + selected + '.json';
        url += '?' + $.param({
            'api-key':'65d4a037ba1946a9971e42d2304ed536'
        });

        $.ajax({
            url: url,
            method: 'GET',
        })
        .done(function (data){
            var news = "";
            var results = data.results.filter(function(value){
                return value.multimedia.length >= 5;
            });
            results.splice(12);
            $('.news-area').append('<ul id="news-list" class="news-list"></ul>');

            $.each(results, function(key, value){
                var pic = value.multimedia[4].url,
                    abst = value.abstract,
                    artUrl = value.url;

                news += '<li>';
                news += '<a href=' + artUrl + '>';
                news += '<div class="articleBackground" style="background-image:url(';
                news += pic + ')">';
                news += '<p class="abstract">';
                news += abst;
                news += '</p></div></a></li>';
                $('#news-list').html(news);    
            });  // closing tag for .each
        }) // closing tag for .done function
        .always(function(){
            $('#ajax-loading').hide();
        })
        .fail(function(err){
            throw err;
        })      
    });  //closing tag for onchange function
    $('.news-area').on('mouseenter', 'li', function(){
        $(this).find('.abstract').slideDown(1000);
    });
    $('.news-area').on('mouseleave', 'li', function(){
        $(this).find('.abstract').slideUp(1000);     
    });
});  // for ducument ready