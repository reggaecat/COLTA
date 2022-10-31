function Cargar_Select_NumDoc(){
    $.ajax({
        "url":"../controller/seguimiento/controlador_cargar_select_UsuDoc.php",
        type:'POST',
    }).done(function(resp){
        let data = JSON.parse(resp);
        if(data.length>0){
            let cadena="<option value=''>Seleccione un número del documento</option>";
            for(let i=0;i<data.length;i++){
                cadena+="<option value='"+data[i][0]+"'>"+data[i][0]+"</option>";
            }
            document.getElementById("txt_numero").innerHTML=cadena;
            
        }else{
            cadena+="<option value=''></option>";
            document.getElementById("txt_numero").innerHTML=cadena;
        }
    });
}
function Traer_Datos_seguimiento_interno(){
    let numero  = document.getElementById('txt_numero').value;
    if(numero.length==0){
        return Swal.fire('ADVERTENCIA','Llene los campos vacios','warning');
    }
    $.ajax({
        "url":"../controller/seguimiento/controlador_traer_seguimiento.php",
        type:'POST',
        data:{
            numero:numero,
        }
    }).done(function(resp){
        //alert(resp);
        let data = JSON.parse(resp);
        var cadena="";
        if(data.length>0){
            document.getElementById("div_buscador").style.display = "block";
            document.getElementById('lbl_titulo').innerHTML="<b>SEGUIMIENTO DEL TRAMITE "+data[0]['doc_tipo']+"<br><b style='font-size:15px; color: #000000;'> &nbsp &nbsp    N° TRAMITE: "+data[0]['documento_id']+" - "+data[0]['nom']+'&nbsp &nbsp -'+data[0]['area_nombre']+"</b>";
             cadena += '<div class="timeline">'+
            '<div class="time-label">'+
                '<span class="bg-red">'+data[0]['doc_fecharegistro']+'</span>'+
            '</div>';
            //AJAX PARA EL DETALLE DEL SEGUIMIENTO////
            $.ajax({
                "url":"../controller/seguimiento/controlador_traer_seguimiento_detalle.php",
                type:'POST',
                data:{
                   codigo:data[0][0]
                }
            }).done(function(resp){
                let datadetalle = JSON.parse(resp);
                if(datadetalle.length>0){
                    for (let i = 0; i < datadetalle.length; i++) {
                        cadena+=' <div>'+
                        '<i class="fas fa-file bg-blue"></i>'+
                        '<div class="timeline-item">'+
                        '<span class="time" style="color: #025f02;"><i class="fas fa-clock"> </i> &nbsp'+datadetalle[i]['mov_fecharegistro']+'</span>'+
                        '<h3 class="timeline-header"><a style="color: #0A68D3;">El documento se encumetra en el area de:  </a> <b>'+datadetalle[i]['areadestino']+'</b>- <a style="color: #0A68D3;"> Estatus:</a> <b>'+datadetalle[i]['mov_estatus']+' </b></h3>'+
                        '<div class="timeline-body">'+'<b>ASUNTO DEL TRAMITE: </b>'+datadetalle[i]['doc_asunto']+'<br><b>TIPO DE DOCUMENTO: </b>'+datadetalle[i]['tipodo_descripcion']+' <br><b style="coloe: #000000;"> &nbsp  &nbsp DESCRIPCION: </b>'+datadetalle[i]['mov_descripcion']
                        +'<br><b style="coloe: #000000;"> &nbsp &nbsp&nbsp DE: </b>'+datadetalle[i]['origen']+' &nbsp &nbsp <b style="coloe: #000000;"> &nbsp  &nbsp PARA: </b>'+datadetalle[i]['destino']+''+'<br><b style="coloe: #000000; font-size: 9pt;"> &nbsp &nbsp &nbsp &nbsp Días Trancurridos: </b>'+datadetalle[i]['fechadias']+' &nbsp &nbsp <b style="coloe: #000000; font-size: 9pt;"> &nbsp  &nbsp Días Laborables Trancurridos: </b>'+datadetalle[i]['dias_habiles']+'<br><b style="coloe: #000000; font-size: 9pt;"> &nbsp &nbsp &nbsp &nbsp Total de Días Trancurridos: </b>'+datadetalle[i]['fechatotal']+' &nbsp &nbsp <b style="coloe: #000000; font-size: 9pt;"> &nbsp  &nbsp Total de Días laborables Trancurridos: </b>'+datadetalle[i]['total_habiles']+''+
                        
                        '</div>'+
                        '</div>'+
                    '</div>';
                    } 
                    cadena+='</div>';
                    document.getElementById("div_seguimiento").innerHTML=cadena;
                }
            })
            /////////
        }else{
            document.getElementById("div_buscador").style.display = "none";
            
        }
    })
}
///=======REPORTE
function Reporte(){
    let numero  = document.getElementById('txt_numero').value;
    if(numero.length==0){
        return Swal.fire('ADVERTENCIA','Llene los campos vacios','warning');
    }
    $.ajax({
        "url":"../controller/seguimiento/controlador_traer_seguimiento.php",
        type:'POST',
        data:{
            numero:numero,
        }
    }).done(function(resp){
        let data = JSON.parse(resp);
        //alert(data[0][0]);
        window.open("MPDF/REPORTE/reporte2.php?codigo="+data[0][0]+"#zoom=100");
    })
}

