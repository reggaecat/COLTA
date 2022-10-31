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
            "url":"../controller/tramite_area/controlador_listar_mitramite.php",
            type:'POST', 
            data:{
                idusuario:idusuario
            }
        },
        "columns":[
            {"data":"documento_id"},
            {"data":"doc_tipo"},
            {"data":"tipodo_descripcion"},
            {"data":"remitente"},
            {"data":"arearemitente"},
            {"data":"Ndestinatario"},
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
    document.getElementById("txt_remitente").value=data.remitente;
    document.getElementById("txt_destinatario").value=data.Ndestinatario;

    document.getElementById("txt_folio").value=data.doc_folio;
    document.getElementById("txt_asunto").value=data.doc_asunto;

    document.getElementById("select_area_p").value=data.rearemitente;
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


function AbrirRegistro(){
    $("#modal_registro").modal({backdrop: 'static', keyboard: false});
    $("#modal_registro").modal("show");
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



