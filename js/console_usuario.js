function Iniciar_Session(){
    recuerdame();
    let usu = document.getElementById("txt_usuario").value;
    let con = document.getElementById("txt_contra").value;
    
    if(usu.length == 0 || con.length == 0){
        return Swal.fire({
            icon: 'warning',
            title: "ADVERTENCIA",
            text: "Llene los campos vacíos",
            heightAuto: false
       });
    }
    $.ajax({
        url: "controller/usuario/controlador_iniciar_session.php",
        type: "POST",
        data: {
            u: usu,
            c: con
        }
    }).done(function(resp){
        let data = JSON.parse(resp);
        if(data.length > 0){
            

            if(data[0][7]=="INACTIVO"){
            
                return Swal.fire({
                    icon: 'warning',
                    title: 'ADVERTENCIA',
                    text: 'EL usuario '+usu+' se encuentra inactivo',
                    heightAuto: false
               });
            }
            $.ajax({
                url: "controller/usuario/controlador_crear_usuario.php",
                type: "POST",
                data: {
                    idusuario: data[0][0],
                    usuario: data[0][1],
                    rol: data[0]['usu_rol'] 
                }
            }).done(function(r){
                let timerInterval
                Swal.fire({
                  title: 'BIENVENIDO A LA APLICACION', 
                  html: 'Sera redireccionado en <b></b> milisegundos.',
                  timer: 700,
                  timerProgressBar: true,
                  heightAuto: false,
                  didOpen: () => {
                      Swal.showLoading()
                      const b = Swal.getHtmlContainer().querySelector('b')
                      timerInterval = setInterval(() => {
                      b.textContent = Swal.getTimerLeft()
                  }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
                }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    location.reload();
                    
                    
                }
                })
            }); 
        }else{
            Swal.fire({
                icon: 'error',
                title: "ADVERTENCIA",
                text: "Usuario o Contraseña Incorrectos",
                heightAuto: false
           });
        }
    });
}

function recuerdame(){
    if(rmcheck.checked && usuarioInput.value!="" && passInput.value!=""){
    
        localStorage.usuario  = usuarioInput.value;
        localStorage.pass     = passInput.value;
        localStorage.checkbox = rmcheck.value;

    }else {
        localStorage.usuario  = "";
        localStorage.pass     = "";
        localStorage.checkbox = "";
    }



}

var  tbl_usuario;
function listar_usuario(){
    tbl_usuario = $("#tabla_usuario").DataTable({
        "ordering":false,   
        "bLengthChange":true,
        "searching": { "regex": false },
        "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
        "pageLength": 10,
        "destroy":true,
        "async": false ,
        "processing": true,
        "ajax":{
            "url":"../controller/usuario/controlador_listar_usuario.php",
            type:'POST'
        },
        "columns":[
            {"defaultContent":""},
            {"data":"usu_fotoperfil",
                render:function(data,type,row){
                    return '<img src="../'+data+'" class="img-circle" width="40" height="40">';
                }
            },
            {"data":"usu_usuario"},
            {"data":"area_nombre"},
            {"data":"usu_rol"},
            {"data":"nempleado"},
            {"defaultContent":"<button class='mas btn btn-danger btn-sm'><i class='fa fa-search'></i></button>"},
            {"data":"usu_estatus",
                render: function(data,type,row){
                        if(data=='ACTIVO'){
                        return '<span class="badge bg-success">ACTIVO</span>';
                        }else{
                        return '<span class="badge bg-danger">INACTIVO</span>';
                        }
                }   
            },
            {"data":"usu_estatus",
                render: function(data,type,row){
                        if(data=='ACTIVO'){
                        return "<button class='editar btn btn-primary btn-sm'><i class='fa fa-edit'></i></button> &nbsp <button class='contra btn btn-warning btn-sm'><i class='fas fa-key'></i></button> &nbsp <button class=' btn btn-success btn-sm' disabled><i class='fa fa-check-circle' ></i></button> &nbsp <button class='desactivar btn btn-danger btn-sm'><i class='fa fa-times-circle'></i></button>";
                        }else{
                        return "<button class='editar btn btn-primary btn-sm'><i class='fa fa-edit'></i></button> &nbsp <button class='contra btn btn-warning btn-sm'><i class='fas fa-key'></i></button> &nbsp <button class='activar btn btn-success btn-sm'><i class='fa fa-check-circle'></i></button> &nbsp <button class=' btn btn-danger btn-sm' disabled><i class='fa fa-times-circle' ></i></button>";
                        }
                }   
            },
            
        ],
  
        "language":idioma_espanol,
        select: true
    });
    tbl_usuario.on('draw.td',function(){
      var PageInfo = $("#tabla_usuario").DataTable().page.info();
      tbl_usuario.column(0, {page: 'current'}).nodes().each(function(cell, i){
        cell.innerHTML = i + 1 + PageInfo.start;
      });
    });
}

$('#tabla_usuario').on('click','.editar',function(){
    var data = tbl_usuario.row($(this).parents('tr')).data();//en tamaño de escritorio
    if(tbl_usuario.row(this).child.isShown()){
        var data = tbl_usuario.row(this).data();// permite llevar los datos cuando es tamaño celular y usar el responsive de dataTables
    }
    $("#modal_editar").modal("show");
    
    document.getElementById("txt_idusuario").value=data.usu_id;
    document.getElementById("txt_usu_editar").value=data.usu_usuario;
    document.getElementById("select_rol_editar").value=data.usu_rol;
    $("#select_area_editar").select2().val(data.area_id).trigger("change.select2");
    document.getElementById('txt_cedula_editar').value=data.usu_nrodocumento;
    document.getElementById('txt_nom_editar').value=data.usu_nombre;
    document.getElementById('txt_apepa_editar').value=data.usu_apepat;
    document.getElementById('txt_apema_editar').value=data.usu_apemat;
    document.getElementById('txt_movil_editar').value=data.usu_movil;
    document.getElementById('txt_dire_editar').value=data.usu_direccion;
    document.getElementById('txt_email_editar').value=data.usu_email;
});

$('#tabla_usuario').on('click','.contra',function(){
    var data = tbl_usuario.row($(this).parents('tr')).data();//en tamaño de escritorio
    if(tbl_usuario.row(this).child.isShown()){
        var data = tbl_usuario.row(this).data();// permite llevar los datos cuando es tamaño celular y usar el responsive de dataTables
    }
    $("#modal_contra").modal("show");
    
    document.getElementById("txt_idusuario_contra").value=data.usu_id;
    //document.getElementById("txt_contra_nueva").value=data.usu_contra;
});

$('#tabla_usuario').on('click','.desactivar',function(){
    var data = tbl_usuario.row($(this).parents('tr')).data();//En tamaño escritorio
    if(tbl_usuario.row(this).child.isShown()){
        var data = tbl_usuario.row(this).data();
    }//Permite llevar los datos cuando es tamaño celular y usas el responsive de datatable
    Swal.fire({
        title: 'Desactivar al usuario '+data.usu_usuario+'?',
        text: "Una vez DESACTIVADO el usuario no tendra acceso al sistema!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'DESACTIVAR'
      }).then((result) => {
        if (result.isConfirmed) {
            Modificar_Estatus_Usuario(parseInt(data.usu_id),'INACTIVO',data.usu_usuario);
        }
    })

})

$('#tabla_usuario').on('click','.activar',function(){
    var data = tbl_usuario.row($(this).parents('tr')).data();//En tamaño escritorio
    if(tbl_usuario.row(this).child.isShown()){
        var data = tbl_usuario.row(this).data();
    }//Permite llevar los datos cuando es tamaño celular y usas el responsive de datatable
    Swal.fire({
        title: 'Activar al usuario '+data.usu_usuario+'?',
        text: "Una vez ACTIVADO el usuario tendra acceso al sistema!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ACTIVAR'
      }).then((result) => {
        if (result.isConfirmed) {
            Modificar_Estatus_Usuario(parseInt(data.usu_id),'ACTIVO',data.usu_usuario);
        }
    })

})

$('#tabla_usuario').on('click','.mas',function(){
    var data = tbl_usuario.row($(this).parents('tr')).data();//en tamaño de escritorio
    if(tbl_usuario.row(this).child.isShown()){
        var data = tbl_usuario.row(this).data();// permite llevar los datos cuando es tamaño celular y usar el responsive de dataTables
    }
    $("#modal_mas").modal("show");
    document.getElementById("lbl_titulo_2").innerHTML="<b>DATOS DEL USUARIO: </b> "+data.nempleado;

    document.getElementById("txt_dni_mas").value=data.usu_nrodocumento;
    document.getElementById("txt_nom_mas").value=data.usu_nombre;
    document.getElementById("txt_apepat_mas").value=data.usu_apepat;
    document.getElementById("txt_apemat_mas").value=data.usu_apemat;
    document.getElementById("txt_celular_mas").value=data.usu_movil;
    document.getElementById("txt_email_mas").value=data.usu_email;
    document.getElementById("txt_dire_mas").value=data.usu_direccion;
    document.getElementById("txt_area_mas").value=data.area_nombre;
    document.getElementById("txt_usuario_mas").value=data.usu_usuario;
    document.getElementById("txt_rol_mas").value=data.usu_rol;  
});

function AbrirRegistro(){
    $("#modal_registro").modal({backdrop: 'static', keyboard: false});
    $("#modal_registro").modal("show");
}

function Registrar_Usuario(){
    let usu = document.getElementById("txt_usu").value;
    let con = document.getElementById("txt_con").value;
    //let ide = document.getElementById("select_empleado").value;
    let ida = document.getElementById("select_area").value;
    let rol = document.getElementById("select_rol").value;
    //// datos trabajador
    let nro = document.getElementById("txt_nro").value;
    let nom = document.getElementById("txt_nom").value;
    let apepa = document.getElementById("txt_apepa").value;
    let apema = document.getElementById("txt_apema").value;
    let movil = document.getElementById("txt_movil").value;
    let email = document.getElementById("txt_email").value;
    let dire = document.getElementById("txt_dire").value;

    if(usu.length == 0 || con.length == 0  || ida.length == 0 || rol.length == 0 || nro.length == 0 || nom.length == 0 || apepa.length == 0 || apema.length == 0 || movil.length == 0 || email.length == 0 || dire.length == 0){
        return Swal.fire({
            icon: 'warning',
            title: "ADVERTENCIA",
            text: "Llene los campos vacíos",
            heightAuto: false
       });
    }
    if(validar_email(email)){

    }else{
        return Swal.fire("ADVERTENCIA","El formato de email es incorrecto","warning");
    }
    $.ajax({
        "url":"../controller/usuario/controlador_registro_usuario.php",
        type:'POST',
        data:{
            usu:usu,
            con:con,
            //ide:ide,
            ida:ida,
            rol:rol,
            nro:nro,
            nom:nom,
            apepa:apepa,
            apema:apema,
            movil:movil,
            email:email,
            dire:dire,
        }
    }).done(function(resp){
        if(resp>0){
            if(resp==1){
                Swal.fire(
                    "CONFIRMACIÓN",
                    "Nueva Usuario Registrado",
                    "success"
                ).then((value)=>{
                    
                    document.getElementById("txt_usu").value="";
                    document.getElementById("txt_con").value="";
                    //document.getElementById("select_empleado").value=""
                    document.getElementById("select_area").value="";
                    document.getElementById("select_rol").value="";

                    document.getElementById("txt_nro").value="";
                    document.getElementById("txt_nom").value="";
                    document.getElementById("txt_apepa").value="";
                    document.getElementById("txt_apema").value="";
                    document.getElementById("txt_movil").value="";
                    document.getElementById("txt_email").value="";
                    document.getElementById("txt_dire").value="";
                    

                    tbl_usuario.ajax.reload();
                    $("#modal_registro").modal("hide");
                });
            }else{
                Swal.fire(
                    "ADVERTENCIA",
                    "El Número de cédula o Usuario ingresada ya existe",
                    "warning"
                );
            }
        }else{
            return Swal.fire(
                "ERROR",
                "Nose Completó el Registro",
                "error"
            ); 
        }
    });

}

function Modificar_Usuario(){
    let id = document.getElementById("txt_idusuario").value; 
    let usu = document.getElementById("txt_usu_editar").value;
    let ida = document.getElementById("select_area_editar").value;
    let rol = document.getElementById("select_rol_editar").value;

    let nro   = document.getElementById('txt_cedula_editar').value;
    let nom   = document.getElementById('txt_nom_editar').value;
    let apepa = document.getElementById('txt_apepa_editar').value;
    let apema = document.getElementById('txt_apema_editar').value;
    let movil = document.getElementById('txt_movil_editar').value;
    let email = document.getElementById('txt_email_editar').value;
    let dire  = document.getElementById('txt_dire_editar').value; 

    if(id.length == 0 || usu.length == 0  || ida.length == 0 || rol.length == 0||nro.length==0 || nom.length==0  || apepa.length==0  || apema.length==0  ||  movil.length==0  || email.length==0 || dire.length==0){
        return Swal.fire({
            icon: 'warning',
            title: "ADVERTENCIA",
            text: "LLene los campos vacios",
            heightAuto: false
       });
    }
    if(validar_email(email)){

    }else{
        return Swal.fire("ADVERTENCIA","El formato de email es incorrecto","warning");
    }
    $.ajax({
        "url":"../controller/usuario/controlador_modificar_usuario.php",
        type:'POST',
        data:{
            id:id,
            usu:usu,
            ida:ida,
            rol:rol,
            nro:nro,
            nom:nom,
            apepa:apepa,
            apema:apema,
            movil:movil,
            email:email,
            dire:dire,
        }

    }).done(function(resp){
        if(resp>0){
            if(resp==1){
                Swal.fire(
                    "CONFIRMACIÓN",
                    "Datos del Usuario Actualizados",
                    "success"
                ).then((value)=>{
                    tbl_usuario.ajax.reload();
                    $("#modal_editar").modal("hide");
                });
            }else{
                Swal.fire(
                    "ADVERTENCIA",
                    "El Usuario ingresada ya existe",
                    "warning"
                );
            }
        }else{
            return Swal.fire(
                "ERROR!",
                "Nose Completó la Actualizacion",
                "error"
            ); 
        }
        
    });

}

function Modificar_Usuario_Contra(){
    let id = document.getElementById("txt_idusuario_contra").value; 
    let con = document.getElementById("txt_contra_nueva").value;
    
    if(id.length == 0 || con.length == 0 ){
        return Swal.fire({
            icon: 'warning',
            title: "ADVERTENCIA",
            text: "LLene los campos vacios",
            heightAuto: false
       });
    }

    $.ajax({
        "url":"../controller/usuario/controlador_modificar_usuario_contra.php",
        type:'POST',
        data:{
            id:id,
            con:con,
            
        }
    }).done(function(resp){
        if(resp>0){
            if(resp==1){
                Swal.fire(
                    "CONFIRMACIÓN",
                    "Contraseña Actualizada",
                    "success"
                ).then((value)=>{
                    document.getElementById("txt_contra_nueva").value="";
                    tbl_usuario.ajax.reload();
                    $("#modal_contra").modal("hide");
                });
            }
        }else{
            return Swal.fire(
                "ERROR",
                "Nose Completó la Actualizacion",
                "error"
            ); 
        } 
    });
}

function Modificar_Estatus_Usuario(id,estatus,user){
    let esta = estatus;
    if(esta=="INACTIVO"){
        esta="DESACTIVADO";
    }
    $.ajax({
        "url":"../controller/usuario/controlador_modificar_usuario_estatus.php",
        type:'POST',
        data:{
            id:id,
            estatus:estatus
        }
    }).done(function(resp){
        if(resp>0){
                Swal.fire("CONFIRMACIÓN","El Usuario "+user+" ya esta  "+esta,"success").then((value)=>{
                    tbl_usuario.ajax.reload();
                });
        }else{
            return Swal.fire("ERROR","No se completo la actualizacion","error");            
        }
    })
}
function Cargar_Select_Area(){
    
    $.ajax({
        "url":"../controller/usuario/controlador_cargar_select_area.php",
        type:'POST',
        

    }).done(function(resp){
        let data = JSON.parse(resp);
        if(data.length>0){
            let cadena="<option value=''> SELECCIONAR AREA</option>";
            for(let i=0;i<data.length;i++){
                cadena+="<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
            }
            document.getElementById("select_area").innerHTML=cadena;
            document.getElementById("select_area_editar").innerHTML=cadena;
        }else{
            cadena+="<option value=''>NO HAY AREAS DISPONIBLES</option>";
            document.getElementById("select_area").innerHTML=cadena;
            document.getElementById("select_area_editar").innerHTML=cadena;
        }
    });

}
//////////////////datos usuario 
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
            //console.log(resp['data']['0']);
            document.getElementById('usuario_nom').text =resp['data']['0']['usu'];
            document.getElementById('area').text =resp['data']['0']['area_nombre'];
            //document.getElementById('img_img').src =resp['data']['0']['empl_fotoperfil'];
            var imagen = document.getElementById.text =resp['data']['0']['usu_fotoperfil'];
            var rut ='../'
            var rutaimg=(rut+imagen)
            //console.log(rutaimg);
            document.getElementById('img_img').src =rutaimg;
            //document.getElementById('txt_img1').src =rutaimg;
            
        }
    })
}
///============lISTAR USUARIOS CON DOCUMENTOS
function Cargar_Select_UsuDoc(){
    $.ajax({
        "url":"../controller/usuario/controlador_cargar_select_UsuDoc.php",
        type:'POST',
    }).done(function(resp){
        let data = JSON.parse(resp);
        if(data.length>0){
            let cadena="<option value=''>Seleccione Un remitente</option>";
            for(let i=0;i<data.length;i++){
                cadena+="<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
            }
            document.getElementById("select_UsuDoc").innerHTML=cadena;
            
        }else{
            cadena+="<option value=''>NO HAY REMITENTES DISPONIBLES</option>";
            document.getElementById("select_UsuDoc").innerHTML=cadena;
        }
    });

}
///===========seguimiento del trtamite 

function validar_email(email) {
    let regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
}

////// contadores
function Traer_widget(){
      
    $.ajax({
        "url":"../controller/usuario/controlador_traer_widget.php",
        type:'POST',
    }).done(function(resp){
        let data = JSON.parse(resp);
        if(data.length>0){
          
          document.getElementById('lbl_tramite_a').innerHTML=data[0]['tramites'];
          document.getElementById('lbl_tramite_finalizado_a').innerHTML=data[0]['finalizado'];
          document.getElementById('lbl_usuarios').innerHTML=data[0]['usuario'];
          document.getElementById('lbl_area').innerHTML=data[0]['area'];
          document.getElementById('lbl_tipo_a').innerHTML=data[0]['tipo'];
          document.getElementById('lbl_rechazados_a').innerHTML=data[0]['rechazados'];   

          
                    
        }
    });

}
function Traer_widget2(){
    
    $.ajax({
        "url":"../controller/usuario/controlador_traer_widget.php",
        type:'POST',
    }).done(function(resp){
        let data = JSON.parse(resp);
        if(data.length>0){  
            document.getElementById('lbl_tramite_supervisor').innerHTML=data[0]['tramites'];
            document.getElementById('lbl_tramite_finalizado_s').innerHTML=data[0]['finalizado'];
            document.getElementById('lbl_rechazados_s').innerHTML=data[0]['rechazados']; 
          
                    
        }
    });

}






