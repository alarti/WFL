/*<!-- ---------------------------------------------------------------------------
|   Project:    WFL v 0.0.1
|   Author:     Alberto Arce Rodríguez
|   File:       funciones.js
|   Date mod:   31/12/2012
---------------------------------------------------------------------------- -->*/
// cargamos el json del menú inicial
function loadJSON() {
    var json = [
        {
            "Name": "Recetas",
            "Children": [
                {
                    "Name": "Desayuno",
                    "Children": [
                        {
                            "Name": "Europeo",
                            "Children": null
                        },
                        {
                            "Name": "Dulce",
                            "Children": null
                        },
                        {
                            "Name": "Salado",
                            "Children": null
                        },
                        {
                            "Name": "Romántico",
                            "Children": null
                        }
                    ]
                },
                {
                    "Name": "Comida",
                    "Children": [
                        {
                            "Name": "Aperitivo",
                            "Children": null
                        },
                        {
                            "Name": "Primer Plato",
                            "Children": null
                        },
                        {
                            "Name": "Segundo Plato",
                            "Children": null
                        },
                        {
                            "Name": "Postre",
                            "Children": null
                        }
                    ]
                },
                {
                    "Name": "Cena",
                    "Children": [
                        {
                            "Name": "Aperitivo",
                            "Children": null
                        },
                        {
                            "Name": "Primer Plato",
                            "Children": null
                        },
                        {
                            "Name": "Segundo Plato",
                            "Children": null
                        },
                        {
                            "Name": "Postre",
                            "Children": null
                        }
                    ]
                }
            ]
        },
        {
            "Name": "Recetas del Mundo",
            "Children": [
                {
                    "Name": "América",
                    "Children": null
                },
                {
                    "Name": "Asia",
                    "Children": null
                },
                {
                    "Name": "Europa",
                    "Children": null
                },
                {
                    "Name": "Oceania",
                    "Children": null
                }
            ]
        }
    ];
    //localStorage.clear();
    //Si no existe en local storage lo creamos y guardamos
    if (!localStorage.menu)
        localStorage.menu = JSON.stringify(json);
    else //sino leemos que exista
        json = JSON.parse(localStorage.menu);

    //Lo cargamos en el editor
    editor.set(json);

}

// save json
function saveJSON() {
    var json = editor.get();
    localStorage.menu = JSON.stringify(json);
    $('#SaveDialog').dialog('close');
    //alert("Menú salvado");

}
// limpia json
function reinitJSON() {
    if (localStorage.menu)
        localStorage.removeItem('menu');
    $('#ReinitDialog').dialog('close');
    loadJSON();

}
ViewModel = function() {
    loadJSON();
    var json = editor.get();
    this.Tree = json;
};
ko.bindingHandlers.listview = {
    update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
        setTimeout(function() {
            $(element).attr('data-role', 'listview');
            $(element).listview();
            var h = '<li data-theme="e" data-icon="gear"><a href="#youtube_vidsp"  data-role="button" id ="vid_srch_but" data-inline="true">Buscar</a></li>';
            $(element).append(h);
            $(element).listview("refresh");

        }, 0);

    }
};

$(document).ready(function() {
//$(document).on("mobileinit", function(){ 
    var vm = new ViewModel();

    var $txt = '';
    var $dataquery = [ '' ];
    ko.applyBindings(vm);

    $.mobile.page.prototype.options.backBtnText = "Atrás";
    $.mobile.page.prototype.options.addBackBtn = true;

    $.mobile.loader.prototype.options.text = "Cocinando...";
    $.mobile.loader.prototype.options.textVisible = true;
    //Pruebas
         /*  $("div[data-role='page']").live("pagebeforeshow", function (event, data) {
            var header = $(this).find(":jqmData(role='header') > .ui-title");
            header.html('<a href="previous-page.html" data-rel="back">Back to Previous Page</a>'+
                    $('#vid_srch_txt').attr('value'));
        });*/
 
    //Si es atras borramos palabra
    //<a href="javascript:void(0);" class="ui-btn-left ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-left ui-btn-up-b" data-rel="back" data-icon="arrow-l" data-theme="b" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Atrás</span><span class="ui-icon ui-icon-arrow-l ui-icon-shadow">&nbsp;</span></span></a>
     $(".ui-btn a").click(function() {
        //alert('hacias atrás');
        //dataquery=$('#vid_srch_txt').attr('value');
        $dataquery.pop();
        $('#vid_srch_txt').attr('value', $dataquery);
    });
    //Si es un subelemento del nestedlist concatenamos en busqueda
    $(".queryapp li").click(function() {
        //$txt += $(this).text();
        $dataquery.push($(this).text());
        
        $('#vid_srch_txt').attr('value', $dataquery);

        $('#youtubepage').attr('value', '1');
        buscaryotube(0);
        //alert($txt);
    });

});
$("div[data-role='page']").live("pagechange", function(event, data) {
    var header = $(this).find(":jqmData(role='header') > .ui-title");

    var h = '<div data-role="header" >' +
            '<h1>What\'s For Lunch?   (WFL)</h1>' +
            '<h1><img id="wfl_logo" src="css/images/wfl_logo.png" alt="eat, food, grey, restaurant icon"></h1>' +
            '<a href="previous-page.html" data-rel="back" data-role="button" data-icon="arrow-l">Atrás</a>' +
            '</div>';
    header.html(h);

    var footer = $(this).find(":jqmData(role='footer')");

    var h = '<ul>' +
            '<li><a href="#home" class="ui-btn-active">Home</a></li>' +
            '<li><a href="#find">Búsqueda</a></li>' +
            '<li><a href="#products">Opciones</a></li>' +
            '<li><a href="#about">About</a></li>' +
            '</ul>';
    footer.html(h);
});

//http://www.smalltowncoder.com/post/Using-jQuery-Mobile-Nested-List.aspx#.URBMbKWZTX4