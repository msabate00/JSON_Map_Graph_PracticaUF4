$(document).ready(function(){
    var items = [];
    //var columnas = {"Nombre":"true","Estado":"true","Tipo":"true","Acceso_Silla_Ruedas":"true", "Superficie_Cubierta":"true", "Superficie_Aire":"true", "Superficie_Solar":"true", "Titularidad":"true", "Provincia":"true", "Municipio":"true", "Entidad":"true", "Orden":"true", "Referencia_Catastral":"true"};
    var url2020 = "https://datosabiertos.dip-badajoz.es/dataset/ceb25e50-45cc-4b4c-8103-a4a3ba88fce1/resource/2c5fe5b5-34c0-443c-935e-299f7c0f5e5c/download/instalacionesdeportivas2020.geojson";
    var url2019 = "https://datosabiertos.dip-badajoz.es/datos/urbanismo-e-infraestructuras/instalaciones-deportivas/Instalaciones_Deportivas.geojson";
    //console.log(columnas);

    $("#2020").click(
        function(){
           peticio1(url2020)
    });
    $("#2019").click(
        function(){
           peticio1(url2019)
    });


    function peticio1(url){
        resetBotones();
       columnas = {"Nombre":"true","Estado":"true","Tipo":"true","Acceso_Silla_Ruedas":"true", "Superficie_Cubierta":"true", "Superficie_Aire":"true", "Superficie_Solar":"true", "Titularidad":"true", "Provincia":"true", "Municipio":"true", "Entidad":"true", "Orden":"true", "Referencia_Catastral":"true"};
       ordenados = {"Nombre":"false","Estado":"false","Tipo":"false","Acceso_Silla_Ruedas":"false", "Superficie_Cubierta":"false", "Superficie_Aire":"false", "Superficie_Solar":"false", "Titularidad":"false", "Provincia":"false", "Municipio":"false", "Entidad":"false", "Orden":"false", "Referencia_Catastral":"false"};

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

                $("#col-1").click(
                    function(){
                        esconderColumna("1");
                    }
                );
                $("#col-2").click(
                    function(){
                        esconderColumna("2");
                    }
                );
                $("#col-3").click(
                    function(){
                        esconderColumna("3");
                    }
                );
                $("#col-4").click(
                    function(){
                        esconderColumna("4");
                    }
                );
                $("#col-5").click(
                    function(){
                        esconderColumna("5");
                    }
                );
                $("#col-6").click(
                    function(){
                        esconderColumna("6");
                    }
                );
                $("#col-7").click(
                    function(){
                        esconderColumna("7");
                    }
                );
                $("#col-8").click(
                    function(){
                        esconderColumna("8");
                    }
                );
                $("#col-9").click(
                    function(){
                        esconderColumna("9");
                    }
                );
                $("#col-10").click(
                    function(){
                        esconderColumna("10");
                    }
                );
                $("#col-11").click(
                    function(){
                        esconderColumna("11");
                    }
                );
                $("#col-12").click(
                    function(){
                        esconderColumna("12");
                    }
                );
                $("#col-13").click(
                    function(){
                        esconderColumna("13");
                    }
                );
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
                    transformado[i]["Superficie_Cubierta"] = val;
                    delete transformado[i][key];

                }else if(key.includes("ire")){
                    transformado[i]["Superficie_Aire"] = val;
                    delete transformado[i][key];

                }else if(key.includes("olar")){
                    transformado[i]["Superficie_Solar"] = val;
                    delete transformado[i][key];

                }else if(key.includes("atastral")){

                    if(val == null){
                        val = "";
                    }
                    transformado[i]["Referencia_Catastral"] = val;
                    delete transformado[i][key];

                }else if(key.includes("uedas")){
                    transformado[i]["Acceso_Silla_Ruedas"] = val;
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
        //console.log(transformado);
        return transformado;
    }

    function mostrarTabla(a){
        $("table").remove();
         let st = "<table>";
        st += "<tr>";
        $.each(columnas, function(key, val){
            if(val == "true"){
                let aux = key.replaceAll(" ", "_");
                st+="<th>"+ "<input type='button' value=" + aux +" id="+ aux +">"+ "</th>";
                let aux2 = "#" + aux;
            }

               });
        st +="</tr>";
        contador = 0;
        $.each(a, function(key, val){
            st += "<tr>";
            $.each(columnas, function(key2, val2){
                if(val2 == "true"){
                    st+= "<td>" + a[key][key2] + "</td>";
                }

            });
            st += "</tr>";
            contador++;
            if(contador >= 50){
                return false;
            }
        });
        st += "</table>";
        $("body").append(st);

        crearOrden();
    }
    function esconderColumna(i){
        //var columnas = {"Nombre":"true","Estado":"true","Tipo":"true","Acceso Silla Ruedas":"true", "Superficie Cubierta":"true", "Superficie Aire":"true", "Superficie Solar":"true", "Titularidad":"true", "Provincia":"true", "Municipio":"true", "Entidad":"true", "Orden":"true", "Referencia Catastral":"true"};
        let aux = "";
        let css = "";
        switch(i){

           case "1":
              // if columnas["Nombre"]=="true" ? columnas["Nombre"]="false" : columnas["Nombre"] ="true";
               columnas["Nombre"] = (columnas["Nombre"]=="true") ? "false" : "true";
               aux = "#col-" + i;
               css = (columnas["Nombre"]=="true") ? {backgroundColor: "", color: ""} : {backgroundColor: "red", color: "white"};
               $(aux).css(css);
               break;
           case "2":
              // if columnas["Nombre"]=="true" ? columnas["Nombre"]="false" : columnas["Nombre"] ="true";
               columnas["Estado"] = (columnas["Estado"]=="true") ? "false" : "true";
               aux = "#col-" + i;
               css = (columnas["Estado"]=="true") ? {backgroundColor: "", color: ""} : {backgroundColor: "red", color: "white"};
               $(aux).css(css);
               break;
           case "3":
              // if columnas["Nombre"]=="true" ? columnas["Nombre"]="false" : columnas["Nombre"] ="true";
               columnas["Tipo"] = (columnas["Tipo"]=="true") ? "false" : "true";
               aux = "#col-" + i;
               css = (columnas["Tipo"]=="true") ? {backgroundColor: "", color: ""} : {backgroundColor: "red", color: "white"};
               $(aux).css(css);
               break;
           case "4":
              // if columnas["Nombre"]=="true" ? columnas["Nombre"]="false" : columnas["Nombre"] ="true";
               columnas["Acceso_Silla_Ruedas"] = (columnas["Acceso_Silla_Ruedas"]=="true") ? "false" : "true";
               aux = "#col-" + i;
               css = (columnas["Acceso_Silla_Ruedas"]=="true") ? {backgroundColor: "", color: ""} : {backgroundColor: "red", color: "white"};
               $(aux).css(css);
               break;
           case "5":
              // if columnas["Nombre"]=="true" ? columnas["Nombre"]="false" : columnas["Nombre"] ="true";
               columnas["Superficie_Cubierta"] = (columnas["Superficie_Cubierta"]=="true") ? "false" : "true";
               aux = "#col-" + i;
               css = (columnas["Superficie_Cubierta"]=="true") ? {backgroundColor: "", color: ""} : {backgroundColor: "red", color: "white"};
               $(aux).css(css);
               break;
           case "6":
              // if columnas["Nombre"]=="true" ? columnas["Nombre"]="false" : columnas["Nombre"] ="true";
               columnas["Superficie_Aire"] = (columnas["Superficie_Aire"]=="true") ? "false" : "true";
               aux = "#col-" + i;
               css = (columnas["Superficie_Aire"]=="true") ? {backgroundColor: "", color: ""} : {backgroundColor: "red", color: "white"};
               $(aux).css(css);
               break;
           case "7":
              // if columnas["Nombre"]=="true" ? columnas["Nombre"]="false" : columnas["Nombre"] ="true";
               columnas["Superficie_Solar"] = (columnas["Superficie_Solar"]=="true") ? "false" : "true";
               aux = "#col-" + i;
               css = (columnas["Superficie_Solar"]=="true") ? {backgroundColor: "", color: ""} : {backgroundColor: "red", color: "white"};
               $(aux).css(css);
               break;
           case "8":
              // if columnas["Nombre"]=="true" ? columnas["Nombre"]="false" : columnas["Nombre"] ="true";
               columnas["Titularidad"] = (columnas["Titularidad"]=="true") ? "false" : "true";
               aux = "#col-" + i;
               css = (columnas["Titularidad"]=="true") ? {backgroundColor: "", color: ""} : {backgroundColor: "red", color: "white"};
               $(aux).css(css);
               break;
           case "9":
              // if columnas["Nombre"]=="true" ? columnas["Nombre"]="false" : columnas["Nombre"] ="true";
               columnas["Provincia"] = (columnas["Provincia"]=="true") ? "false" : "true";
               aux = "#col-" + i;
               css = (columnas["Provincia"]=="true") ? {backgroundColor: "", color: ""} : {backgroundColor: "red", color: "white"};
               $(aux).css(css);
               break;
           case "10":
              // if columnas["Nombre"]=="true" ? columnas["Nombre"]="false" : columnas["Nombre"] ="true";
               columnas["Municipio"] = (columnas["Municipio"]=="true") ? "false" : "true";
               aux = "#col-" + i;
               css = (columnas["Municipio"]=="true") ? {backgroundColor: "", color: ""} : {backgroundColor: "red", color: "white"};
               $(aux).css(css);
               break;
           case "11":
              // if columnas["Nombre"]=="true" ? columnas["Nombre"]="false" : columnas["Nombre"] ="true";
               columnas["Entidad"] = (columnas["Entidad"]=="true") ? "false" : "true";
               aux = "#col-" + i;
               css = (columnas["Entidad"]=="true") ? {backgroundColor: "", color: ""} : {backgroundColor: "red", color: "white"};
               $(aux).css(css);
               break;
           case "12":
              // if columnas["Nombre"]=="true" ? columnas["Nombre"]="false" : columnas["Nombre"] ="true";
               columnas["Orden"] = (columnas["Orden"]=="true") ? "false" : "true";
               aux = "#col-" + i;
               css = (columnas["Orden"]=="true") ? {backgroundColor: "", color: ""} : {backgroundColor: "red", color: "white"};
               $(aux).css(css);
               break;
           case "13":
              // if columnas["Nombre"]=="true" ? columnas["Nombre"]="false" : columnas["Nombre"] ="true";
               columnas["Referencia_Catastral"] = (columnas["Referencia_Catastral"]=="true") ? "false" : "true";
               aux = "#col-" + i;
               css = (columnas["Referencia_Catastral"]=="true") ? {backgroundColor: "", color: ""} : {backgroundColor: "red", color: "white"};
               $(aux).css(css);
               break;
       }

        mostrarTabla(items);

    }

    function crearOrden(){
        $.each(columnas, function(key, val){
            if(val == "true"){
                let aux = key.replaceAll(" ", "_");
                //st+="<th>"+ "<input type='button' value=" + aux +" id="+ aux +">"+ "</th>";
                let aux2 = "#" + aux;
                $(aux2).click(
                    function(){

                        OrdenarPor(aux);
                    }
                );
            }

               });
    }

    function OrdenarPor(columna){


        switch(columna){
                case "Nombre":

                    items = items.sort(function(a,b){return a.Nombre.localeCompare(b.Nombre);});
                    break;
                case "Estado":
                    items = items.sort(function(a,b){return a.Estado.localeCompare(b.Estado);});
                    break;
                case "Tipo":
                    items = items.sort(function(a,b){return a.Tipo.localeCompare(b.Tipo);});
                    break;
                case "Acceso_Silla_Ruedas":
                    items = items.sort(function(a,b){return a.Acceso_Silla_Ruedas.localeCompare(b.Acceso_Silla_Ruedas);});
                    break;
                case "Superficie_Cubierta":
                    items = items.sort(function(a,b){return a.Superficie_Cubierta - b.Superficie_Cubierta;});
                    break;
                case "Superficie_Aire":
                    items = items.sort(function(a,b){return a.Superficie_Aire - b.Superficie_Aire;});
                    break;
                case "Superficie_Solar":
                    items = items.sort(function(a,b){return a.Superficie_Solar - b.Superficie_Solar;});
                    break;
                case "Titularidad":

               // console.log(aux.sort(function(a,b){return a.name.localeCompare(b.name)}));
                    items = items.sort(function(a,b){return a.Titularidad.localeCompare(b.Titularidad);});
                    break;
                case "Provincia":
                    items = items.sort(function(a,b){return a.Provincia - b.Provincia;});
                    break;
                case "Municipio":
                    items = items.sort(function(a,b){return a.Municipio - b.Municipio;});
                    break;
                case "Entidad":
                    items = items.sort(function(a,b){return a.Entidad - b.Entidad;});
                    break;
                case "Orden":
                    items = items.sort(function(a,b){return a.Orden - b.Orden;});
                    break;
                case "Referencia_Catastral":
                    items = items.sort(function(a,b){return a.Referencia_Catastral.localeCompare(b.Referencia_Catastral);});
                    break;
        }

        switch(ordenados[columna]){
            case "true":
                items = items.reverse();
                ordenados[columna] = "false";
                break;
            case "false":
                ordenados[columna] = "true";
                break;

        }

        mostrarTabla(items);

    }

    function resetBotones(){
        $("#col-1").off();
        $("#col-2").off();
        $("#col-3").off();
        $("#col-4").off();
        $("#col-5").off();
        $("#col-6").off();
        $("#col-7").off();
        $("#col-8").off();
        $("#col-9").off();
        $("#col-10").off();
        $("#col-11").off();
        $("#col-12").off();
        $("#col-13").off();

    }

});
