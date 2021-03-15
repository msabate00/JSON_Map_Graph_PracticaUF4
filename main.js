$(document).ready(function(){
    var items = [];
    var url2020 = "https://datosabiertos.dip-badajoz.es/dataset/ceb25e50-45cc-4b4c-8103-a4a3ba88fce1/resource/2c5fe5b5-34c0-443c-935e-299f7c0f5e5c/download/instalacionesdeportivas2020.geojson";
    var url2019 = "https://datosabiertos.dip-badajoz.es/datos/urbanismo-e-infraestructuras/instalaciones-deportivas/Instalaciones_Deportivas.geojson";


    $("#2020").click(
        function(){
           peticio1(url2020)
    });
    $("#2019").click(
        function(){
           peticio1(url2019)
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
                items = TransformarArray(items);
                mostrarTabla(items);
        });
    }


    function TransformarArray(a){
        let transformado = [];
        for(let i = 0; i<a.length; i++){
            transformado.push(a[i].properties);
        }

        for(let i = 0; i<transformado.length; i++){
            $.each(transformado[i], function(key, val){
                if(key.includes("rovincia")){
                    transformado[i]["Provincia"] = val;
                    delete transformado[i][key];

                }else if(key.includes("unicipio")){
                    transformado[i]["Municipio"] = val;
                    delete transformado[i][key];

                }else if(key.includes("entidad")){
                    transformado[i]["Entidad"] = val;
                    delete transformado[i][key];

                }else if(key.includes("poblamiento")){
                   // transformado[i]["Provincia"] = val;
                    delete transformado[i][key];

                }else if(key.includes("orden")){
                    transformado[i]["Orden"] = val;
                    delete transformado[i][key];

                }else if(key.includes("nombre")){
                    transformado[i]["Nombre"] = val;
                    delete transformado[i][key];

                }else if(key.includes("tipo")){
                    transformado[i]["Tipo"] = val;
                    delete transformado[i][key];

                }else if(key.includes("titular")){
                    transformado[i]["Titularidad"] = val;
                    delete transformado[i][key];

                }else if(key.includes("gestion")){
                    //transformado[i]["Provincia"] = val;
                    delete transformado[i][key];

                }else if(key.includes("ubierta")){
                    transformado[i]["Superficie Cubierta"] = val;
                    delete transformado[i][key];

                }else if(key.includes("ire")){
                    transformado[i]["Superficie Aire"] = val;
                    delete transformado[i][key];

                }else if(key.includes("olar")){
                    transformado[i]["Superficie Solar"] = val;
                    delete transformado[i][key];

                }else if(key.includes("atastral")){

                    if(val == null){
                        val = "";
                    }
                    transformado[i]["Referencia Catastral"] = val;
                    delete transformado[i][key];

                }else if(key.includes("uedas")){
                    transformado[i]["Acceso Silla Ruedas"] = val;
                    delete transformado[i][key];

                }else if(key.includes("estado")){
                    transformado[i]["Estado"] = val;
                    delete transformado[i][key];

                }else if(key.includes("uri")){
                    //transformado[i]["Estado"] = val;
                    delete transformado[i][key];

                }else if(key.includes("ba_identifier")){
                    //transformado[i]["Estado"] = val;
                    delete transformado[i][key];

                }else if(key.includes("ba_observaciones")){
                    //transformado[i]["Estado"] = val;
                    delete transformado[i][key];

                }

            });
        }
        console.log(transformado);
        return transformado;
    }

    function mostrarTabla(a){
        $("table").remove();
        let st = "<table>";
               st += "<tr><th>Nombre</th><th>Estado</th><th>Tipo</th><th>Acceso Silla Ruedas</th><th>Superficie Cubierta</th><th>Superficie Aire</th><th>Superficie Solar</th><th>Titularidad</th><th>Provincia</th><th>Municipio</th><th>Entidad</th><th>Orden</th><th>Referencia Catastral</th></tr>";
        contador = 0;
        $.each(a, function(key, val){
            st+= "<tr>";
            st += "<td>" + a[key]["Nombre"]+"</td>";
            st += "<td>" + a[key]["Estado"]+"</td>";
            st += "<td>" + a[key]["Tipo"]+"</td>";
            st += "<td>" + a[key]["Acceso Silla Ruedas"]+"</td>";
            st += "<td>" + a[key]["Superficie Cubierta"]+"</td>";
            st += "<td>" + a[key]["Superficie Aire"]+"</td>";
            st += "<td>" + a[key]["Superficie Solar"]+"</td>";
            st += "<td>" + a[key]["Titularidad"]+"</td>";
            st += "<td>" + a[key]["Provincia"]+"</td>";
            st += "<td>" + a[key]["Municipio"]+"</td>";
            st += "<td>" + a[key]["Entidad"]+"</td>";
            st += "<td>" + a[key]["Orden"]+"</td>";
            st += "<td>" + a[key]["Referencia Catastral"]+"</td>";
            st += "</tr>";
            contador++;
            if(contador >= 50){
                return false;
            }
        });
        st += "</table>";
        $("body").append(st);
    }

});
