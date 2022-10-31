var  tbl_tramite;
function listar_tramite(){
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
            "url":"../controller/tramite/controlador_listar_tramite.php",
            type:'POST'
        },
        "columns":[
            
            {"data":"documento_id"},
            {"data":"doc_tipo"},
            {"data":"tipodo_descripcion"},
            {"data":"remitenteprincipal"},
            {"data":"arearemitenteprincipal"},
            {"data":"destinatario"},
            {"data":"areadestinatario"},
            {"defaultContent":"<button class='mas btn btn-danger btn-sm'><i class='fa fa-search'></i></button>"},
            {"defaultContent":"<button class='segimiento btn btn-success btn-sm'><i class='fa fa-edit'></i></button>"},
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
        ],
        "language":idioma_espanol,
        select: true
    }); 
}

$('#tabla_tramite').on('click','.editar',function(){
    var data = tbl_tramite.row($(this).parents('tr')).data();//en tamaño de escritorio
    if(tbl_tramite.row(this).child.isShown()){
        var data = tbl_tramite.row(this).data();// permite llevar los datos cuando es tamaño celular y usar el responsive de dataTables
    }
    $("#modal_editar").modal("show");
    document.getElementById("txt_area_editar").value=data.area_nombre;
    document.getElementById("txt_idarea").value=data.area_cod;
    document.getElementById("select_estatus").value=data.area_estado;
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
    document.getElementById("lbl_titulo_2").innerHTML=" <b>DATOS DEL TRAMITE: </b> "+data.documento_id;

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
//////
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
//// cargar datos del usuario 
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
            document.getElementById("select_area_d").innerHTML=cadena;   
        }else{
            cadena+="<option value=''>NO HAY REMITENTES DISPONIBLES</option>";
            document.getElementById("select_area_d").innerHTML=cadena;
        }   
    });
}
//// Registrar tramite principal 
function Registrar_Tramite(){
    //DATOS DEL REMITENTE
    let idusu = document.getElementById('txtprincipalid').value;

    //DATOS DOCUMENTO 
    let arp = document.getElementById('txt_id_usu').value;
    let ard = document.getElementById('select_area_d').value;
    let tip = document.getElementById('select_tipo').value;
    let ndo = document.getElementById('txt_ndocumento').value;
    let asu = document.getElementById('txt_asunto').value;
    let arc = document.getElementById('txt_archivo').value;
    let fol = document.getElementById('txt_folio').value;

    let tiptra = document.getElementById('select_tipo_tramite').value;
    let arcfi = document.getElementById('txt_archivo_fisico').value;

    let nombrearchivo = "";
    if(arc==""){
        /// no va nada 
    }else{
        let f =  new Date();
        let extension = arc.split('.').pop();//DOCUMENTO.PPT
        nombrearchivo="ARCH"+f.getDate()+""+(f.getMonth()+1)+""+f.getFullYear()+""+f.getHours()+""+f.getMilliseconds()+"."+extension;
    }


    if(arp.length==0 ||ard.length==0|| tip.length==0 || ndo.length==0 || asu.length==0  || fol.length==0 ||tiptra.length==0){
        return Swal.fire("ADVERTENCIA","Llene todos los datos del documento","warning");
    }

    let formData = new FormData();
    let archivoobj = $("#txt_archivo")[0].files[0];

    //////DATOS DEL DOCUMENTO
    formData.append("arp",arp);
    formData.append("ard",ard);
    formData.append("tip",tip);
    formData.append("ndo",ndo);
    formData.append("asu",asu);
    formData.append("nombrearchivo",nombrearchivo);
    formData.append("fol",fol);
    formData.append("archivoobj",archivoobj);
    formData.append("idusu",idusu);
    
    formData.append("tiptra",tiptra);
    formData.append("arcfi",arcfi);
    
    $.ajax({
        url:"../controller/tramite/controlador_registro_tramite.php",
        type:'POST',
        data:formData,
        contentType:false,
        processData:false,
        success: function(resp){
            if(resp.length>0){
                Swal.fire(
                    "CONFIRMACIÓN",
                    "Nueva Tramite Registrado con codigo: "+resp,
                    "success"
                ).then((value)=>{
                    $("#contenido_principal").load("tramite/view_tramite.php");
                });
            }else{
                Swal.fire(
                    "ADVERTENCIA",
                    "El Tramite ya existe",
                    "warning"
                );
            }
        }
    });
    return false;
}
///////////// LISTAR SEGIMIENTO TRAMITE 
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
                    return "<button class='btn btn-secondary btn-sm'><i class='fa fa-file-pdf' disabled></i></button>";
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

function datosusuario(){

    var id =$('#txtprincipalid').val();
    
    $.ajax({
        type:'post',
        url:"../controller/usuario/controlador_cargar_datos_usuario.php",
        dataType:'JSON',
        data:{
            id:id,
        },
        success:function(resp){
            document.getElementById('txt_area').value =resp['data']['0']['area_nombre'];
            document.getElementById('txt_nom_ape').value =resp['data']['0']['nombre'];
            document.getElementById('txt_id_usu').value =resp['data']['0']['usu_id'];
            Cargar_Select_usuario(resp['data']['0']['usu_id']);
        }
    })
}
////ver archivo
$('#tabla_segimiento').on('click','.ver',function(){
    var data = tbl_segimiento.row($(this).parents('tr')).data();
    if(tbl_segimiento.row(this).child.isShown()){
        var data = tbl_segimiento.row(this).data();
    }
    window.open('../'+data.mov_archivo);
});
