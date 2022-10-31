var  tbl_area;
function listar_area(){
    tbl_area = $("#tabla_area").DataTable({
        "ordering":false,   
        "bLengthChange":true,
        "searching": { "regex": false },
        "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
        "pageLength": 10,
        "destroy":true,
        "async": false ,
        "processing": true,
        "ajax":{
            "url":"../controller/area/controlador_listar_area.php",
            type:'POST'
        },
        "columns":[
            {"defaultContent":""},
            {"data":"area_nombre"},
            {"data":"area_fecha_registro"},
            {"data":"area_estado",
                render: function(data,type,row){
                        if(data=='ACTIVO'){
                        return '<span class="badge bg-success">ACTIVO</span>';
                        }else{
                        return '<span class="badge bg-danger">INACTIVO</span>';
                        }
                }   
            },
            {"defaultContent":"<button class='editar btn btn-primary btn-sm'><i class='fa fa-edit'></i></button>"},   
        ],
        "language":idioma_espanol,
        select: true
    });
    tbl_area.on('draw.td',function(){
      var PageInfo = $("#tabla_area").DataTable().page.info();
      tbl_area.column(0, {page: 'current'}).nodes().each(function(cell, i){
        cell.innerHTML = i + 1 + PageInfo.start;
      });
    });
}

$('#tabla_area').on('click','.editar',function(){
    var data = tbl_area.row($(this).parents('tr')).data();//en tamaño de escritorio
    if(tbl_area.row(this).child.isShown()){
        var data = tbl_area.row(this).data();// permite llevar los datos cuando es tamaño celular y usar el responsive de dataTables
    }
    $("#modal_editar").modal("show");
    document.getElementById("txt_area_editar").value=data.area_nombre;
    document.getElementById("txt_idarea").value=data.area_cod;
    document.getElementById("select_estatus").value=data.area_estado;
});
// ABRE EL MODAL
function AbrirRegistro(){
    $("#modal_registro").modal({backdrop: 'static', keyboard: false});
    $("#modal_registro").modal("show");
}
//// REGISTRAR AREA 
function Registrar_Area(){
    let area = document.getElementById("txt_area").value;
    if(area.length == 0){
        return Swal.fire({
            icon: 'warning',
            title: "ADVERTENCIA",
            text: "LLene los campos vacios",
            heightAuto: false
       });
    }
    $.ajax({
        "url":"../controller/area/controlador_registro_area.php",
        type:'POST',
        data:{
            a:area
        }
    }).done(function(resp){
        if(resp>0){
            if(resp==1){
                Swal.fire(
                    "CONFIRMACIÓN",
                    "Nueva area Registrada",
                    "success"
                ).then((value)=>{
                    document.getElementById("txt_area").value="";
                    tbl_area.ajax.reload();
                    $("#modal_registro").modal("hide");
                });

            }else{
                Swal.fire(
                    "ADVERTENCIA",
                    "El area ingresada ya existe",
                    "warning"
                );

            }

        }else{
            return Swal.fire(
                "Mensaje de Error",
                "Nose Completó el Registro",
                "error"
            ); 
        }
    });

}

function Modificar_Area(){
    let id = document.getElementById("txt_idarea").value;
    let area = document.getElementById("txt_area_editar").value;
    let esta = document.getElementById("select_estatus").value;
    if(area.length == 0 ){
        return Swal.fire("ADVERTENCIA","Tiene campos vacios","warning");
    }

    $.ajax({
        "url":"../controller/area/controlador_modificar_area.php",
        type:'POST',
        data:{
            id:id,
            are:area,
            esta:esta
        }

    }).done(function(resp){
        if(resp>0){
            if(resp==1){
                Swal.fire(
                    "CONFIRMACIÓN",
                    "Datos Actualizados",
                    "success"
                ).then((value)=>{
                    
                    tbl_area.ajax.reload();
                    $("#modal_editar").modal("hide");
                });

            }else{
                Swal.fire(
                    "ADVERTENCIA",
                    "El Area ingresada ya existe",
                    "warning"
                );

            }
        }else{
            return Swal.fire(
                "Mensaje de Error",
                "Nose Completó la modificacion",
                "error"
            ); 
        }
    });

}

