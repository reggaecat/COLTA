<?php
  session_start();
  if(isset($_SESSION['S_ID'])){
    header('Location: view/index.php');
  }

?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>GAD TRAMITES | LOGIN</title>
  <link rel="icon" href="view/img/vincu.ico">

  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="plantilla/plugins/fontawesome-free/css/all.min.css">
  <!-- icheck bootstrap -->
  <link rel="stylesheet" href="plantilla/plugins/icheck-bootstrap/icheck-bootstrap.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="plantilla/dist/css/adminlte.min.css">
</head>

<body class="hold-transition login-page">
<div class="login-box">
  <div class="login-logo">
    <img src="view/img/vincu.ico" alt="" >
    <br>
    <a href="index.php"><b>TRAMITE</b> GAD COLTA</a>

  </div>
  <!-- /.login-logo -->
  <div class="card">
    <div class="card-body login-card-body">
      <p class="login-box-msg">DATOS DEL USUARIO</p>
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Usuario" id="txt_usuario">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-envelope"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input type="password" class="form-control" placeholder="Contraseña" id="txt_contra"><br> 
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        &nbsp<input type="checkbox" onclick="myFuction()">&nbsp Ver Contraseña 
        <br>
        <div class="row">
          <div class="col-8">
            <div class="icheck-primary">
              <input type="checkbox" id="remember">
              <label for="remember">
                  Recuérdame
              </label>
            </div>
          </div>
          <!-- /.col -->
          <div class="col-4">
            <button type="submit" class="btn btn-primary btn-block" onclick="Iniciar_Session()">INGRESAR</button>
          </div>
          <!-- /.col -->
        </div>
    </div>
    <!-- /.login-card-body -->
  </div>
</div>
<!-- /.login-box -->

<!-- jQuery -->
<script src="plantilla/plugins/jquery/jquery.min.js"></script>
<!-- Bootstrap 4 -->
<script src="plantilla/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<!-- AdminLTE App -->
<script src="plantilla/dist/js/adminlte.min.js"></script>
<script src="js/console_usuario.js?rev=<?php echo time();?>"></script>

<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>


<script>
   const rmcheck = document.getElementById('remember'),
         usuarioInput = document.getElementById('txt_usuario'),
         passInput = document.getElementById('txt_contra');
    if(localStorage.checkbox && localStorage.checkbox !=""){ 
      
      rmcheck.setAttribute('checked', 'checked');
      usuarioInput.value = localStorage.usuario;
      passInput.value = localStorage.pass;
    }else{
      rmcheck.removeAttribute('checked');
      usuarioInput.value = "";
      passInput.value = "";

    }  
</script>
<script>
  function myFuction() {
    var x = document.getElementById("txt_contra");
    if (x.type === "password") {
      x.type = "text";
      
    } else {
      x.type = "password";
      
    }
  }
</script>

</body>
</html>
