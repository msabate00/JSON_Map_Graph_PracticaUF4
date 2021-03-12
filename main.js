$(document).ready(function(){
    var items = [];
    var url2020 = "https://datosabiertos.dip-badajoz.es/dataset/ceb25e50-45cc-4b4c-8103-a4a3ba88fce1/resource/2c5fe5b5-34c0-443c-935e-299f7c0f5e5c/download/instalacionesdeportivas2020.geojson";



    $("#2020").click(
        function(){
           peticio1(url2020)
        });


    function peticio1(url){
        items = [];
        $.getJSON( url, function( data ) {
            $.each(data.features, function(key, val){
               items.push(val);
            });
        })
        .done(
            function(){
                let st = "<table>";
               st += "<tr><th>Acceso Silla de Ruedas</th><th>Codigo Municipio</th><th>Codigo Provincia</th><th>Entidad</th><th>Estado</th><th>Gestion</th><th>Nombre</th><th>Orden</th><th>Poblamiento</th><th>Referencia Catastral</th><th>Superficie Aire</th><th>Superficie Cubierta</th><th>Superficie Solar</th><th>Tipo de Instalacion</th><th>Titularidad</th></tr>";
               // console.log(items[0].properties);
                $.each(items, function(key, val){
                    st+= "<tr>";
                    console.log(val);
                    $.each(val.properties, function(key2, val2){
                        st += "<td>" + val2 + "</td>";
                       // console.log(val2);
                    });
                    st += "</tr>";

                });
                st += "</table>";
                $("body").append(st);
        });
    }
});
