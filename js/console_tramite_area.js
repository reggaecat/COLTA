var  tbl_tramite;
function listar_tramite(){
    let idusuario = document.getElementById('txtprincipalid').value; 
    tbl_tramite = $("#tabla_tramite").DataTable({
        "ordering":false,   
        "bLengthChange":true,
        "searching": { "regex": false },
        "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
        "pageLength": 10,
        "destroy":true,
        "async": false ,
        "processing": true,
        "ajax":{
            "url":"../controller/tramite_area/controlador_listar_tramite.php",
            type:'POST', 
            data:{
                idusuario:idusuario
            }
        },
        "columns":[
            {"data":"documento_id"},
            {"data":"doc_tipo"},
            {"data":"tipodo_descripcion"},
            {"data":"remitenteprincipal"},
            {"data":"arearemitenteprincipal"},
            {"data":"Ndestinatario"},
            {"data":"areadestinatario"},
            {"defaultContent":"<button class='mas btn btn-danger btn-sm'><i class='fa fa-search'></i></button>"},
            {"defaultContent":"<button class='segimiento btn btn-success btn-sm'><i class='fa fa-edit'></i></button>"},
            //{"defaultContent":"<button class='recibir btn btn-success btn-sm'><i class='fas fa-check'></i></button>"},
            {"data":"doc_estatus",
                render: function(data,type,row){
                    if(data=='PENDIENTE'){
                    return "<button class='recibir btn btn-success btn-sm'><i class='fas fa-check'></i></button>";
                    }else
                        if(data=='RECHAZADO'){
                            return "<button class='recibir btn btn-success btn-sm' disabled><i class='fas fa-check-circle'></i></button>";
                    }else{
                        return "<button class='recibir btn btn-success btn-sm' disabled><i class='fas fa-check-circle'></i></button>";
                    }

                }   
            },
            {"data":"doc_estatus",
                render: function(data,type,row){
                    if(data=='PENDIENTE'){
                    return '<span class="badge bg-warning">PENDIENTE</span>';
                    }else
                        if(data=='RECHAZADO'){
                        return '<span class="badge bg-danger">RECHAZADO</span>';
                    }else{
                        return '<span class="badge bg-success">FINALIZADO</span>';
                    }

                }   
            },
            {"data":"doc_estatus",
                render: function(data,type,row){
                        if(data=='PENDIENTE'){
                        return "<button class='derivar btn btn-primary btn-sm'><i class='fa fa-share-square'></i></button>";
                        }else{
                            return "<button class=' btn btn-primary btn-sm' disabled><i class='fa fa-share-square'></i></button>";
                        }
                }   
            },  
        ],
        "language":idioma_espanol,
        select: true
    });  
}

$('#tabla_tramite').on('click','.derivar',function(){
    var data = tbl_tramite.row($(this).parents('tr')).data();//en tamaño de escritorio
    if(tbl_tramite.row(this).child.isShown()){
        var data = tbl_tramite.row(this).data();// permite llevar los datos cuando es tamaño celular y usar el responsive de dataTables
    }
    $("#modal_derivar").modal("show");

    document.getElementById("lbl_titulo_derivar").innerHTML="<b> DERIVAR O FINALIZAR TRAMITE </b> "+data.documento_id;

    document.getElementById("txt_fecha_de").value=data.doc_fecharegistro;
    document.getElementById("txt_origen_de").value=data.area_destinatario;
    //document.getElementById("txt_descripcion_de").value=data.doc_asunto;

    Cargar_Select_usuario(data.id_destinatario);
    Cargar_ultma_fecha(data.documento_id);

    document.getElementById("txt_idocumento_de").value=data.documento_id;
    document.getElementById("txt_idareaorigen").value=data.id_destinatario;  
});

$('#tabla_tramite').on('click','.segimiento',function(){
    var data = tbl_tramite.row($(this).parents('tr')).data();//en tamaño de escritorio
    if(tbl_tramite.row(this).child.isShown()){
        var data = tbl_tramite.row(this).data();// permite llevar los datos cuando es tamaño celular y usar el responsive de dataTables
    }
    $("#modal_segimiento").modal("show");
    document.getElementById("lbl_titulo").innerHTML="<b>SEGIMIENTO DEL TRAMITE - </b> "+data.documento_id;
    listar_segimiento_tramite(data.documento_id)
});

$('#tabla_tramite').on('click','.mas',function(){
    var data = tbl_tramite.row($(this).parents('tr')).data();//en tamaño de escritorio
    if(tbl_tramite.row(this).child.isShown()){
        var data = tbl_tramite.row(this).data();// permite llevar los datos cuando es tamaño celular y usar el responsive de dataTables
    }
    $("#modal_mas").modal("show");
    document.getElementById("lbl_titulo_2").innerHTML="DATOS DEL TRAMITE "+data.documento_id;

    document.getElementById("txt_ndocumento").value=data.doc_nrodocumento;
    document.getElementById("txt_tipo_tra").value="TRAMITE "+data.doc_tipo;
    document.getElementById("txt_fecha_re").value=data.doc_fecharegistro;
    document.getElementById("txt_remitente").value=data.Nremitenteprincipal;
    document.getElementById("txt_destinatario").value=data.Ndestinatario;

    document.getElementById("txt_folio").value=data.doc_folio;
    document.getElementById("txt_asunto").value=data.doc_asunto;

    document.getElementById("select_area_p").value=data.arearemitenteprincipal;
    document.getElementById("select_area_d").value=data.areadestinatario;
    document.getElementById("select_tipo").value=data.tipodo_descripcion;

    document.getElementById("txt_dni").value=data.re_nro_p;
    document.getElementById("txt_nom").value=data.re_nombre_p;
    document.getElementById("txt_apepat").value=data.re_apepat_p;
    document.getElementById("txt_apemat").value=data.re_apemat_p;
    document.getElementById("txt_celular").value=data.re_movil_p;
    document.getElementById("txt_email").value=data.re_email_p;
    document.getElementById("txt_dire").value=data.re_direc_p;
});

$('#tabla_tramite').on('click','.recibir',function(){
    var data = tbl_tramite.row($(this).parents('tr')).data();//en tamaño de escritorio
    if(tbl_tramite.row(this).child.isShown()){
        var data = tbl_tramite.row(this).data();// permite llevar los datos cuando es tamaño celular y usar el responsive de dataTables
    }
    $("#modal_recibir").modal("show");
    document.getElementById("lbl_titulo_aceptacion").innerHTML="<b>ACEPTACIÓN DEL TRAMITE: </b>"+data.documento_id;
    
    document.getElementById("id_doc_f").value=data.documento_id;
    Cargar_ultma_fecha(data.documento_id);
    document.getElementById("id_doc_ff").value='SI';
   
    
});

function AbrirRegistro(){
    $("#modal_registro").modal({backdrop: 'static', keyboard: false});
    $("#modal_registro").modal("show");
}

function Cargar_Select_Tipo(){
    
    $.ajax({
        "url":"../controller/tramite/controlador_cargar_select_tipo.php",
        type:'POST',
        

    }).done(function(resp){
        let data = JSON.parse(resp);
        if(data.length>0){
            let cadena="<option value=''> SELECCIONAR TIPO DOCUMENTO</option>";
            for(let i=0;i<data.length;i++){
                cadena+="<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
            }
            document.getElementById("select_tipo").innerHTML=cadena;
            
        }else{
            cadena+="<option value=''>NO HAY TIPOS DISPONIBLES</option>";
            document.getElementById("select_tipo").innerHTML=cadena;
        }   
    });
}

function Cargar_Select_usuario(id){
    $.ajax({
        "url":"../controller/tramite/controlador_cargar_select_usuario.php",
        type:'POST',
    }).done(function(resp){
        let data = JSON.parse(resp);
        if(data.length>0){
            let cadena="<option value=''></option>";
            
            for(let i=0;i<data.length;i++){  
                if(data[i][0]!=id){
                    cadena+="<option value='"+data[i]["usu_id"]+"'>"+data[i]["lisusu"]+"</option>";
                    }            
            }
            document.getElementById("select_destino_de").innerHTML=cadena;   
        }else{
            cadena+="<option value=''>NO HAY REMITENTES DISPONIBLES</option>";
            document.getElementById("select_destino_de").innerHTML=cadena;
        }   
    });
}
/////////////SEGIMIENTO TRAMITE 
var  tbl_segimiento;
function listar_segimiento_tramite(id){
    tbl_segimiento = $("#tabla_segimiento").DataTable({
        "ordering":false,   
        "bLengthChange":true,
        "searching": { "regex": false },
        "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
        "pageLength": 10,
        "destroy":true,
        "async": false ,
        "processing": true,
        "ajax":{
            "url":"../controller/tramite/controlador_listar_tabla_segimiento_tramite.php",
            type:'POST',
            data:{

                id:id
            }
        },
        "columns":[
            
            {"data":"area_remitente"},
            {"data":"mov_fecharegistro"},
            {"data":"area_destinatario"},
            {"data":"mov_descripcion"},
            {"data":"dias_habiles"},
            {"data":"mov_archivo",
                render: function(data,type,row){
                        if(data==''){
                        return "<button class=' btn btn-secondary btn-sm'><i class='fa fa-file-pdf' disabled></i></button>";
                        } else{
                            return "<button class='ver btn btn-danger btn-sm'><i class='fa fa-file-pdf'></i></button>";
                        }    
                }   
            },
            {"data":"mov_arch_fisico"},
            
        ],
  
        "language":idioma_espanol,
        select: true
    });
    
}
function Registrar_Derivacion(){
    //DATOS 
    let iddo = document.getElementById('txt_idocumento_de').value;
    let orig = document.getElementById('txt_idareaorigen').value;
    let dest = document.getElementById('select_destino_de').value;
    let desc = document.getElementById('txt_descripcion_de').value;
    let arc = document.getElementById('txt_documento_de').value;
    let idusu = document.getElementById('txtprincipalid').value;

    let tipo = document.getElementById('select_derivar_de').value;
    let ultimo = document.getElementById('txt_fecha_anterior').value;
    let arcfi = document.getElementById('txt_archivo_fisico').value;
    //let extension = arc.split('.').pop();//DOCUMENTO.PPT
    let nombrearchivo = "";
    if(tipo=='DERIVAR'){
        if(dest.length==0 ){
            return Swal.fire("ADVERTENCIA","Seleccione el Destinatario","warning");  
        }
    }
    if(tipo=='RECHAZADO'){
        if(desc.length==0 ){
            return Swal.fire("ADVERTENCIA","INGRESE PORQUE SE RECHAZO EL SEGUIMIENTO DEL DOCUMENTO ","warning");  
        }
    }
    if(arc==""){
        /// no va nada 
    }else{
        let f =  new Date();
        let extension = arc.split('.').pop();//DOCUMENTO.PPT
        nombrearchivo="ARCH"+f.getDate()+""+(f.getMonth()+1)+""+f.getFullYear()+""+f.getHours()+""+f.getMilliseconds()+"."+extension;
    }

    let formData = new FormData();
    let archivoobj = $("#txt_documento_de")[0].files[0];
    //////DATOS DEL REMITENTE
    formData.append("iddo",iddo);
    formData.append("orig",orig);
    formData.append("dest",dest);
    formData.append("desc",desc);    
    formData.append("idusu",idusu);
    formData.append("nombrearchivo",nombrearchivo);
    formData.append("archivoobj",archivoobj);
    formData.append("tipo",tipo);
    formData.append("ultimo",ultimo);
    formData.append("arcfi",arcfi);
    $.ajax({
        url:"../controller/tramite_area/controlador_registro_tramite.php",
        type:'POST',
        data:formData,
        contentType:false,
        processData:false,
        success: function(resp){
            if(resp.length>0){
                Swal.fire(
                    "CONFIRMACIÓN",
                    "Tramite Derivado o Finalizado ",
                    "success"
                ).then((value)=>{ 
                    document.getElementById("select_destino_de").value="";
                    document.getElementById("txt_descripcion_de").value="";
                    document.getElementById("txt_archivo_fisico").value="";
                    $("#modal_derivar").modal('hide');
                    tbl_tramite.ajax.reload();
                });
            }else{
                Swal.fire(
                    "ADVERTENCIA",
                    "No se pudo completar el proceso",
                    "warning"
                );
            }
        }
    });
    return false;
}
$('#tabla_segimiento').on('click','.ver',function(){
    var data = tbl_segimiento.row($(this).parents('tr')).data();//en tamaño de escritorio
    if(tbl_segimiento.row(this).child.isShown()){
        var data = tbl_segimiento.row(this).data();// permite llevar los datos cuando es tamaño celular y usar el responsive de dataTables
    }
    window.open('../'+data.mov_archivo);
 
});
//////cargar ultima fecha 
function Cargar_ultma_fecha(id){
    $.ajax({
        type:'post',
        url:"../controller/tramite/controlador_cargar_ultima_fecha.php",
        dataType:'JSON',
        data:{
            id:id,
        },
        success:function(resp){
            document.getElementById('txt_fecha_anterior').value =resp['data']['0']['ultimafecha'];  
            document.getElementById('txt_fecha').value =resp['data']['0']['ultimafecha'];      
            
        }
    })
}
///// registar fecha de  recibido 
function Registrar_Fecha(){
    let fec = document.getElementById("txt_fecha").value;
    let id = document.getElementById("id_doc_f").value;
    let res = document.getElementById("id_doc_ff").value;
    $.ajax({
        url:"../controller/tramite_area/controlador_fechar.php",
        type:'POST',
        data:{
            f:fec,
            id:id,
            res:res,
        },
        success: function(resp){
          /*  if(resp.length>0){
                return Swal.fire(
                    "CONFIRMACIÓN",
                    "Tramite Recibido",
                    "success"
                ).then((value)=>{
                    document.getElementById("fecha_r").value="";
                    $("#modal_recibir").modal("hide");
                });
            }*/
            if(resp>0){
                if(resp==1){
                    return Swal.fire(
                        "CONFIRMACIÓN",
                        "TRAMITE RECIBIDO SATISFACTORIAMENTE",
                        "success"
                    ).then((value)=>{
                        document.getElementById("fecha_r").value="";
                        $("#modal_recibir").modal("hide");
                    });
    
                }else{
                    Swal.fire(
                        "TRAMITE YA RECIBIDO ",
                        "USTED YA RECIBIÓ EL TRAMITE ANTERIORMENTE",
                        "error"
                    );
    
                }
            }else{
                return Swal.fire(
                    "Mensaje de Error",
                    "Nose Completó la el recibido de tramite",
                    "error"
                ); 
            }
        }
    });
    return false;
}

    
   
    
     




