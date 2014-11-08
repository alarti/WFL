/*<!-- ---------------------------------------------------------------------------
|   Project:    WFL v 0.0.1
|   Author:     Alberto Arce Rodríguez
|   File:       funciones.js
|   Date mod:   31/12/2012
---------------------------------------------------------------------------- -->*/
$(document).ready(function($) {

    $('#vid_srch_but').click(function() {
        $('#youtubepage').attr('value', '1');
        buscaryotube(0);
    });
});

function buscaryotube(id) {
    var page = $('#youtubepage').attr('value');
    if (parseInt(page) <= 1 && id === -1) {
        alert("Esta en el inicio de la busqueda.");
        return;
    }
    page = parseInt(page) + 4 * parseInt(id);
    $('#youtube_vids').html('<div class="loading">Cargando...</div>');

    var $query = $('#vid_srch_txt').attr('value');
    //@TODO:eliminar palabras al retroceder. Por ahora se borra si es busqueda nueva
    //if (id===0) $('#vid_srch_txt').attr('value','');

    $.getJSON('http://gdata.youtube.com/feeds/videos?alt=json-in-script&callback=?', {
        'start-index': page.toString(),
        'max-results': '1',
        racy: 'exclude',
        format: '1',
        orderby: 'rating',
        category: 'cooking',
        vq: 'Recetas de cocina ' + $query
    },
    function(data) {
        $('#youtube_vids').html('');
        
        $.each(data.feed.entry, function(i, item) {
            for (var k = 0; k < item.link.length; k++) {
                if (item.link[k].rel === 'alternate') {
                    id_url = (item.link[k].href).split("=")[1];
                    break;
                }
            }
            var html = '<br>';
            //html += '<a> keywords:' + $('#vid_srch_txt').attr('value') + '</a>';
            html += '<p>' + item.title.$t + '</p>';
            html += '<div id="youtube_prev" >';
            html += '<object width="' + $('#MaxW').attr('value') + '" height="' + $('#MaxH').attr('value') + '">';
            html += '<param name="movie" value="http://www.youtube.com/v/' + id_url + '"></param>';
            html += '<param name="wmode" value="transparent"></param>';
            html += '<embed width="' + $('#MaxW').attr('value') + '" height="' + $('#MaxH').attr('value') +
                    '" src="http://www.youtube.com/v/' + id_url
                    + '" type="application/x-shockwave-flash" wmode="transparent" />';
            html += '</object>';

            html += '</div>';

            $('#youtube_vids').append(html);
            //<script> 'Recetario de '+ $('#vid_srch_txt').attr('value')</script>
        });
    });
    $('#youtubepage').attr('value', page);
}
