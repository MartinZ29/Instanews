$(document).ready(function(){

    

    $('#selections').on('change',function(){
        $('header').addClass('header-size');
    });

    //loading images

    $('#selections').on('change',function(){
        $('.ajax-loading').show();
    });


    //choosing sections

    $('#selections').on('change',function(event){
        event.preventDefault();

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

                //$('.ajax-loading').hide();
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
                
                $('.ajax-loading').hide();
            })

            .fail(function(err){
                throw err;
            })

            $('#sections option[value=sections]').remove();

            
        });
        $('.news-area').on('mouseenter', 'li', function(){
            $(this).find('.abstract').slideDown(1000);
        });
        $('.news-area').on('mouseleave', 'li', function(){
            $(this).find('.abstract').slideUp(1000);
        });

        
  });

    

});