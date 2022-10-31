-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-09-2022 a las 02:03:30
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tramite`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_CARGAR_FECHA` (IN `ID` CHAR(12))   SELECT
	movimiento.mov_fecharegistro as ultimafecha, 
	movimiento.movimiento_id, 
	movimiento.documento_id
FROM
	movimiento
	WHERE movimiento.documento_id=ID
ORDER BY
	movimiento.mov_fecharegistro DESC
LIMIT 1$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_CARGAR_SEGUIMIENTO_TRAMITE_DETALLE_INTERNO` (IN `NUMERO` VARCHAR(12))   SELECT
	movimiento.movimiento_id, 
	movimiento.documento_id, 
	movimiento.mov_fecharegistro, 
	movimiento.mov_descripcion, 
	movimiento.mov_estatus, 
	documento.doc_asunto, 
	DATEDIFF(movimiento.mov_fecharegistro,documento.doc_fecharegistro) AS fechatotal, 
	DATEDIFF(movimiento.mov_fecharegistro,movimiento.mov_fecha_contar) AS fechadias, 
	(5 * (DATEDIFF(mov_fecharegistro, mov_fecha_contar) DIV 7) + MID('0123444401233334012222340111123400001234000123440', 
 7 * WEEKDAY(mov_fecha_contar) + WEEKDAY(mov_fecharegistro) + 1, 1)) AS dias_habiles, 
	(5 * (DATEDIFF(mov_fecharegistro, doc_fecharegistro) DIV 7) + MID('0123444401233334012222340111123400001234000123440', 
 7 * WEEKDAY(doc_fecharegistro) + WEEKDAY(mov_fecharegistro) + 1, 1)) AS total_habiles, 
	documento.doc_tipo, 
	movimiento.area_origen_id, 
	origen.area_id, 
	areaorigen.area_nombre AS areaorigen, 
	CONCAT_WS('  - ',CONCAT_WS(' ',origen.usu_nombre,origen.usu_apepat,origen.usu_apemat),areaorigen.area_nombre) AS origen, 
	origen.usu_nrodocumento, 
	movimiento.areadestino_id, 
	destino.area_id, 
	areadestino.area_nombre AS areadestino, 
	CONCAT_WS('  - ',CONCAT_WS(' ',destino.usu_nombre,destino.usu_apepat,destino.usu_apemat),areadestino.area_nombre) AS destino, 
	destino.usu_nrodocumento, 
	tipo_documento.tipodo_descripcion
FROM
	movimiento
	INNER JOIN
	documento
	ON 
		movimiento.documento_id = documento.documento_id
	INNER JOIN
	usuario AS origen
	ON 
		movimiento.area_origen_id = origen.usu_id
	INNER JOIN
	area AS areaorigen
	ON 
		origen.area_id = areaorigen.area_cod
	INNER JOIN
	usuario AS destino
	ON 
		movimiento.areadestino_id = destino.usu_id
	INNER JOIN
	area AS areadestino
	ON 
		destino.area_id = areadestino.area_cod
	INNER JOIN
	tipo_documento
	ON 
		documento.tipodocumento_id = tipo_documento.tipodocumento_id
		where movimiento.documento_id=NUMERO$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_CARGAR_SEGUIMIENTO_TRAMITE_INTERNO` (IN `NUMERO` VARCHAR(12))   SELECT
	documento.documento_id, 
	
	documento.doc_fecharegistro, 
	documento.usuario_id, 
	CONCAT_WS(' ',usuario.usu_nombre,usuario.usu_apepat,usuario.usu_apemat) AS nom, 
	area.area_nombre, 
	documento.doc_tipo
FROM
	documento
	INNER JOIN
	usuario
	ON 
		documento.usuario_id = usuario.usu_id
	INNER JOIN
	area
	ON 
		usuario.area_id = area.area_cod
	WHERE documento.documento_id=NUMERO$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_CARGAR_SELECT_AREA` ()   SELECT
	area.area_cod, 
	area.area_nombre 
FROM
	area
	WHERE area.area_estado='ACTIVO'$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_CARGAR_SELECT_NUMDOC` ()   SELECT
	documento.documento_id
FROM
	documento$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_CARGAR_SELECT_TIPO` ()   SELECT
	tipo_documento.tipodocumento_id, 
	tipo_documento.tipodo_descripcion
FROM
	tipo_documento
	WHERE tipo_documento.tipodo_estado='ACTIVO'$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_CARGAR_SELECT_USUARIO` ()   SELECT
	usuario.usu_id, 
	CONCAT_WS(' ',usu_nombre,usu_apepat,usu_apemat) AS lisusu, 
	usu_nombre, 
	usuario.area_id, 
	area.area_nombre
FROM
	usuario
	INNER JOIN
	area
	ON 
		usuario.area_id = area.area_cod
WHERE
	usuario.usu_estatus = 'ACTIVO'$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_CARGAR_SELECT_USUDOC` ()   SELECT
	documento.documento_id,
	CONCAT_WS(' ',documento.doc_nombreremitente,documento.doc_apepatremitente,documento.doc_apematremitente)
FROM
	documento$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_AREA` ()   SELECT
	area.area_cod, 
	area.area_nombre, 
	area.area_fecha_registro, 
	area.area_estado
FROM
	area$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_DATOS_USUARIO` (IN `ID` CHAR(11))   SELECT
  usuario.usu_id,
	usuario.usu_usuario, 
	usuario.usu_rol, 
	area.area_nombre,
area.area_cod,	
	CONCAT_WS(' ',LEFT(usu_nombre,LOCATE(' ',usu_nombre)),usu_apepat) AS usu, 
	CONCAT_WS(' ',usu_nombre,usu_apepat,usu_apemat) AS nombre, 
	usuario.usu_nombre, 
	usuario.usu_apepat, 
	usuario.usu_apemat, 
	usuario.usu_nrodocumento, 
	usuario.usu_movil, 
	usuario.usu_email, 
	usuario.usu_direccion, 
	usuario.usu_fotoperfil
FROM
	usuario
	INNER JOIN
	area
	ON 
		usuario.area_id = area.area_cod
		WHERE usuario.usu_id=ID$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_MITRAMITE_AREA` (IN `IDUSUARIO` INT)   BEGIN
DECLARE IDAREA INT;
SET @IDAREA:=(SELECT usu_id FROM usuario WHERE usu_id=IDUSUARIO);
SELECT
	documento.documento_id, 
	documento.tipodocumento_id, 
	documento.destinatario AS id_destinatario, 
	documento.doc_tipo, 
	documento.doc_estatus, 
	documento.doc_fecharegistro, 
	tipo_documento.tipodo_descripcion, 
	CONCAT_WS(' ',LEFT(remitenteprincipal.usu_nombre,LOCATE(' ',remitenteprincipal.usu_nombre)),remitenteprincipal.usu_apepat) AS remitenteprincipal, 
	CONCAT_WS(' ',remitenteprincipal.usu_nombre,remitenteprincipal.usu_apepat,remitenteprincipal.usu_apemat) AS Nremitenteprincipal, 
	remitenteprincipal.area_id, 
	remitenteprincipal.usu_nombre AS re_nombre_p, 
	remitenteprincipal.usu_apepat AS re_apepat_p, 
	remitenteprincipal.usu_apemat AS re_apemat_p, 
	remitenteprincipal.usu_nrodocumento AS re_nro_p, 
	remitenteprincipal.usu_movil AS re_movil_p, 
	remitenteprincipal.usu_email AS re_email_p, 
	remitenteprincipal.usu_direccion AS re_direc_p, 
	arearemitenteprincipal.area_nombre AS arearemitenteprincipal, 
	movimiento.documento_id, 
	movimiento.usuario_id,
	
	movimiento.area_origen_id, 
	CONCAT_WS(' ',LEFT(remitente.usu_nombre,LOCATE(' ',remitente.usu_nombre)),remitente.usu_apepat) AS Nremitente, 
	CONCAT_WS(' ',remitente.usu_nombre,remitente.usu_apepat,remitente.usu_apemat) AS remitente, 
	remitente.area_id, 
	remitente.usu_nombre AS re_nombre, 
	remitente.usu_apepat AS re_apepat, 
	remitente.usu_apemat AS re_apemat, 
	remitente.usu_nrodocumento AS re_nro, 
	remitente.usu_movil AS re_movil, 
	remitente.usu_email AS re_email, 
	remitente.usu_direccion AS re_direc, 
	arearemitente.area_nombre AS arearemitente,  
	movimiento.areadestino_id, 
	
	CONCAT_WS(' ',LEFT(destinatario.usu_nombre,LOCATE(' ',destinatario.usu_nombre)),destinatario.usu_apepat) AS Ndestinatario, 
	CONCAT_WS(' ',destinatario.usu_nombre,destinatario.usu_apepat,destinatario.usu_apemat) AS destinatario, 
	destinatario.area_id , 
	destinatario.usu_nombre AS de_nombre, 
	destinatario.usu_apepat AS de_apepat, 
	destinatario.usu_apemat AS de_apemat, 
	destinatario.usu_nrodocumento AS de_nro, 
	destinatario.usu_movil AS de_movil, 
	destinatario.usu_email AS de_email, 
	destinatario.usu_direccion AS de_direc, 
	areadestinatario.area_nombre AS areadestinatario
FROM
	documento
	INNER JOIN
	tipo_documento
	ON 
		documento.tipodocumento_id = tipo_documento.tipodocumento_id
	INNER JOIN
	usuario AS remitenteprincipal
	ON 
		documento.usuario_id = remitenteprincipal.usu_id
	INNER JOIN
	area AS arearemitenteprincipal
	ON 
		remitenteprincipal.area_id = arearemitenteprincipal.area_cod
	INNER JOIN
	movimiento
	ON 
		documento.documento_id = movimiento.documento_id
	INNER JOIN
	usuario AS remitente
	ON 
		movimiento.area_origen_id = remitente.usu_id
	INNER JOIN
	area AS arearemitente
	ON 
		remitente.area_id = arearemitente.area_cod
	INNER JOIN
	usuario AS destinatario
	ON 
		movimiento.areadestino_id = destinatario.usu_id
	INNER JOIN
	area AS areadestinatario
	ON 
		destinatario.area_id = areadestinatario.area_cod
WHERE
	movimiento.usuario_id =@IDAREA;
	END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_TIPO_DOCUMENTO` ()   SELECT
	tipo_documento.tipodocumento_id, 
	tipo_documento.tipodo_descripcion, 
	tipo_documento.tipodo_estado, 
	tipo_documento.tipodo_fregistro
FROM
	tipo_documento$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_TRAMITE` ()   SELECT
	documento.documento_id, 
	documento.tipodocumento_id, 
	documento.doc_nrodocumento, 
	documento.doc_folio, 
	documento.doc_asunto, 
	documento.doc_archivo, 
	documento.doc_fecharegistro, 
	documento.doc_estatus, 
	documento.doc_tipo, 
	documento.doc_archivo_fisico, 
	documento.remitente, 
	documento.destinatario, 
	CONCAT_WS(' ',LEFT(remitente.usu_nombre,LOCATE(' ',remitente.usu_nombre)),remitente.usu_apepat) AS remitente, 
	CONCAT_WS(' ',remitente.usu_nombre,remitente.usu_apepat,remitente.usu_apemat) AS Nremitente, 
	remitente.area_id, 
	remitente.usu_nombre AS re_nombre, 
	remitente.usu_apepat AS re_apepat, 
	remitente.usu_apemat AS re_apemat, 
	remitente.usu_nrodocumento AS re_nro, 
	remitente.usu_movil AS re_movil, 
	remitente.usu_email AS re_email, 
	remitente.usu_direccion AS re_direc, 
	arearemitente.area_nombre AS arearemitente, 
	CONCAT_WS(' ',LEFT(destinatario.usu_nombre,LOCATE(' ',destinatario.usu_nombre)),destinatario.usu_apepat) AS destinatario, 
	CONCAT_WS(' ',destinatario.usu_nombre,destinatario.usu_apepat,destinatario.usu_apemat) AS Ndestinatario, 
	destinatario.area_id, 
	destinatario.usu_nombre AS de_nombre, 
	destinatario.usu_apepat AS de_apepat, 
	destinatario.usu_apemat AS de_apemat, 
	destinatario.usu_nrodocumento AS de_nro, 
	destinatario.usu_movil AS de_movil, 
	destinatario.usu_email AS de_email, 
	destinatario.usu_direccion AS de_direc, 
	areadestinatario.area_nombre AS areadestinatario, 
	tipo_documento.tipodo_descripcion, 
	documento.usuario_id, 
	CONCAT_WS(' ',LEFT(remitenteprincipal.usu_nombre,LOCATE(' ',remitenteprincipal.usu_nombre)),remitenteprincipal.usu_apepat) AS remitenteprincipal, 
	CONCAT_WS(' ',remitenteprincipal.usu_nombre,remitenteprincipal.usu_apepat,remitenteprincipal.usu_apemat) AS Nremitenteprincipal, 
	remitenteprincipal.area_id, 
	remitenteprincipal.usu_nombre as re_nombre_p, 
	remitenteprincipal.usu_apepat as re_apepat_p, 
	remitenteprincipal.usu_apemat as re_apemat_p, 
	remitenteprincipal.usu_nrodocumento as re_nro_p, 
	remitenteprincipal.usu_movil as re_movil_p, 
	remitenteprincipal.usu_email as re_email_p, 
	remitenteprincipal.usu_direccion as re_direc_p, 
	arearemitenteprincipal.area_nombre as arearemitenteprincipal
FROM
	documento
	INNER JOIN
	usuario AS remitente
	ON 
		documento.remitente = remitente.usu_id
	INNER JOIN
	area AS arearemitente
	ON 
		remitente.area_id = arearemitente.area_cod
	INNER JOIN
	usuario AS destinatario
	ON 
		documento.destinatario = destinatario.usu_id
	INNER JOIN
	area AS areadestinatario
	ON 
		destinatario.area_id = areadestinatario.area_cod
	INNER JOIN
	tipo_documento
	ON 
		documento.tipodocumento_id = tipo_documento.tipodocumento_id
	INNER JOIN
	usuario AS remitenteprincipal
	ON 
		documento.usuario_id = remitenteprincipal.usu_id
	INNER JOIN
	area AS arearemitenteprincipal
	ON 
		remitenteprincipal.area_id = arearemitenteprincipal.area_cod$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_TRAMITE_AREA` (IN `IDUSUARIO` INT)   BEGIN
DECLARE IDAREA INT;
SET @IDAREA:=(SELECT usu_id FROM usuario WHERE usu_id=IDUSUARIO);
SELECT
	documento.documento_id, 
	documento.tipodocumento_id, 
	documento.remitente, 
	documento.destinatario as id_destinatario, 
	documento.doc_tipo, 
	documento.doc_estatus, 
	documento.doc_fecharegistro, 
	tipo_documento.tipodo_descripcion, 
	CONCAT_WS(' ',LEFT(remitente.usu_nombre,LOCATE(' ',remitente.usu_nombre)),remitente.usu_apepat) AS Nremitente, 
	CONCAT_WS(' ',remitente.usu_nombre,remitente.usu_apepat,remitente.usu_apemat) AS remitente, 
	remitente.area_id, 
	remitente.usu_nombre AS re_nombre, 
	remitente.usu_apepat AS re_apepat, 
	remitente.usu_apemat AS re_apemat, 
	remitente.usu_nrodocumento AS re_nro, 
	remitente.usu_movil AS re_movil, 
	remitente.usu_email AS re_email, 
	remitente.usu_direccion AS re_direc, 
	arearemitente.area_nombre AS arearemitente, 
	CONCAT_WS(' ',LEFT(destinatario.usu_nombre,LOCATE(' ',destinatario.usu_nombre)),destinatario.usu_apepat) AS Ndestinatario, 
	CONCAT_WS(' ',destinatario.usu_nombre,destinatario.usu_apepat,destinatario.usu_apemat) AS destinatario, 
	CONCAT_WS('   -',CONCAT_WS(' ',destinatario.usu_nombre,destinatario.usu_apepat,destinatario.usu_apemat),areadestinatario.area_nombre) AS area_destinatario,
	
	destinatario.area_id ,
	destinatario.usu_id as id_reare, 
	destinatario.usu_nombre AS de_nombre, 
	destinatario.usu_apepat AS de_apepat, 
	destinatario.usu_apemat AS de_apemat, 
	destinatario.usu_nrodocumento AS de_nro, 
	destinatario.usu_movil AS de_movil, 
	destinatario.usu_email AS de_email, 
	destinatario.usu_direccion AS de_direc, 
	areadestinatario.area_nombre AS areadestinatario, 
	documento.doc_asunto, 
	documento.doc_archivo, 
	documento.doc_folio, 
	documento.doc_nrodocumento, 
	documento.doc_archivo_fisico,
	CONCAT_WS(' ',LEFT(remitenteprincipal.usu_nombre,LOCATE(' ',remitenteprincipal.usu_nombre)),remitenteprincipal.usu_apepat) AS remitenteprincipal, 
	CONCAT_WS(' ',remitenteprincipal.usu_nombre,remitenteprincipal.usu_apepat,remitenteprincipal.usu_apemat) AS Nremitenteprincipal, 
	remitenteprincipal.area_id, 
	remitenteprincipal.usu_nombre as re_nombre_p, 
	remitenteprincipal.usu_apepat as re_apepat_p, 
	remitenteprincipal.usu_apemat as re_apemat_p, 
	remitenteprincipal.usu_nrodocumento as re_nro_p, 
	remitenteprincipal.usu_movil as re_movil_p, 
	remitenteprincipal.usu_email as re_email_p, 
	remitenteprincipal.usu_direccion as re_direc_p, 
	arearemitenteprincipal.area_nombre as arearemitenteprincipal
FROM
	documento
	INNER JOIN
	tipo_documento
	ON 
		documento.tipodocumento_id = tipo_documento.tipodocumento_id
	INNER JOIN
	usuario AS remitente
	ON 
		documento.remitente = remitente.usu_id
	INNER JOIN
	area AS arearemitente
	ON 
		remitente.area_id = arearemitente.area_cod
	INNER JOIN
	usuario AS destinatario
	ON 
		documento.destinatario = destinatario.usu_id
	INNER JOIN
	area AS areadestinatario
	ON 
		destinatario.area_id = areadestinatario.area_cod
		INNER JOIN
	usuario AS remitenteprincipal
	ON 
		documento.usuario_id = remitenteprincipal.usu_id
	INNER JOIN
	area AS arearemitenteprincipal
	ON 
		remitenteprincipal.area_id = arearemitenteprincipal.area_cod
		WHERE documento.destinatario=@IDAREA AND documento.doc_estatus='PENDIENTE';
	END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_TRAMITE_SEGUIMIENTO` (IN `ID` CHAR(11))   SELECT
	movimiento.movimiento_id, 
	movimiento.documento_id, 
	movimiento.area_origen_id,  
	movimiento.mov_fecharegistro, 
	movimiento.mov_descripcion, 
	movimiento.mov_fecha_contar, 
	movimiento.mov_archivo,  
	movimiento.areadestino_id, 
	DATEDIFF(movimiento.mov_fecharegistro,documento.doc_fecharegistro) AS fechatotal, 
	DATEDIFF(movimiento.mov_fecharegistro,movimiento.mov_fecha_contar) AS fechadias, 
	(5 * (DATEDIFF(mov_fecharegistro, mov_fecha_contar) DIV 7) + MID('0123444401233334012222340111123400001234000123440', 
 7 * WEEKDAY(mov_fecha_contar) + WEEKDAY(mov_fecharegistro) + 1, 1)) AS dias_habiles, 
	(5 * (DATEDIFF(mov_fecharegistro, doc_fecharegistro) DIV 7) + MID('0123444401233334012222340111123400001234000123440', 
 7 * WEEKDAY(doc_fecharegistro) + WEEKDAY(mov_fecharegistro) + 1, 1)) AS total_habiles, 
	remitente.area_id, 
	arearemitente.area_nombre as arremitente,
  CONCAT_WS('  -',CONCAT_WS(' ',LEFT(remitente.usu_nombre,LOCATE(' ',remitente.usu_nombre)),remitente.usu_apepat),arearemitente.area_nombre) as area_remitente,
	remitente.usu_nombre, 
	remitente.usu_apepat, 
	remitente.usu_apemat, 
	destinatario.area_id, 
	areadestinatario.area_nombre as ardestinatario, 
	CONCAT_WS('   -',CONCAT_WS(' ',LEFT(destinatario.usu_nombre,LOCATE(' ',destinatario.usu_nombre)),destinatario.usu_apepat),areadestinatario.area_nombre) as area_destinatario,
	destinatario.usu_nombre, 
	destinatario.usu_apepat, 
	destinatario.usu_apemat, 
	documento.doc_fecharegistro,
	movimiento.mov_arch_fisico
FROM
	movimiento
	INNER JOIN
	usuario AS remitente
	ON 
		movimiento.area_origen_id = remitente.usu_id
	INNER JOIN
	area AS arearemitente
	ON 
		remitente.area_id = arearemitente.area_cod
	INNER JOIN
	usuario AS destinatario
	ON 
		movimiento.areadestino_id = destinatario.usu_id
	INNER JOIN
	area AS areadestinatario
	ON 
		destinatario.area_id = areadestinatario.area_cod
	INNER JOIN
	documento
	ON 
		movimiento.documento_id = documento.documento_id 
		where 	movimiento.documento_id=ID
		ORDER BY
	movimiento.mov_fecharegistro ASC$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_TRAMITE_USUARIO` (IN `ID` CHAR(11))   SELECT
	usuario.usu_id, 
	usuario.usu_usuario, 
	usuario.empleado_id, 
	CONCAT_WS(' ',empleado.emple_nombre,empleado.emple_apepat, 
	empleado.emple_apemat) AS USU,
	empleado.emple_nombre, 
	empleado.emple_apepat, 
	empleado.emple_apemat, 
	empleado.emple_nrodocumento, 
	empleado.emple_movil, 
	empleado.emple_email, 
	empleado.emple_direccion, 
	usuario.area_id, 
	area.area_nombre
FROM
	usuario
	INNER JOIN
	empleado
	ON 
		usuario.empleado_id = empleado.empleado_id
	INNER JOIN
	area
	ON 
		usuario.area_id = area.area_cod
	WHERE usuario.usu_id=ID$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_USUARIO` ()   SELECT
	usuario.usu_usuario,  
	usuario.usu_estatus, 
	usuario.area_id, 
	area.area_nombre, 
	usuario.usu_rol, 
	usuario.empresa_id, 
	usuario.usu_id, 
	CONCAT_WS(' ',usuario.usu_nombre,usuario.usu_apepat,usuario.usu_apemat) AS nempleado, 
	usuario.usu_nrodocumento, 
	usuario.usu_movil, 
	usuario.usu_email, 
	usuario.usu_direccion, 
	usuario.usu_fotoperfil, 
	usuario.usu_nombre, 
	usuario.usu_apepat, 
	usuario.usu_apemat
FROM
	usuario
	INNER JOIN
	area
	ON 
		usuario.area_id = area.area_cod$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MODIFICAR_AREA` (IN `ID` INT, IN `NAREA` VARCHAR(255), IN `ESTATUS` VARCHAR(20))   BEGIN
DECLARE AREAACTUAL VARCHAR(255);
DECLARE CANTIDAD INT;
SET @AREAACTUAL:=(SELECT area_nombre from area where area_cod=ID);
IF @AREAACTUAL = NAREA THEN
		UPDATE area set
		area_estado=ESTATUS,
		area_nombre=NAREA
		where area_cod=ID;
		SELECT 1;
ELSE
SET @CANTIDAD:=(SELECT COUNT(*) from area where area_nombre=NAREA);
	IF @CANTIDAD = 0 THEN
		UPDATE area set
		area_estado=ESTATUS,
		area_nombre=NAREA
		where area_cod=ID;
		SELECT 1;
	ELSE
		SELECT 2;
	
	END IF;
END IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MODIFICAR_DATOS_USUARIO` (IN `ID` INT, IN `MOVIL` CHAR(10), IN `EMAIL` VARCHAR(80), IN `DIR` VARCHAR(255), IN `FOTO` VARCHAR(255))   UPDATE usuario SET 
     usu_movil=MOVIL,
		 usu_email=EMAIL,
		 usu_direccion=DIR,
		 usu_fotoperfil=FOTO
WHERE usu_id=ID$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MODIFICAR_TIPO` (IN `ID` INT, IN `NTIPO` VARCHAR(255), IN `ESTATUS` VARCHAR(20))   BEGIN
DECLARE TIPOACTUAL VARCHAR(255);
DECLARE CANTIDAD INT;
SET @TIPOACTUAL:=(SELECT tipodo_descripcion FROM tipo_documento WHERE tipodocumento_id=ID);
IF @TIPOACTUAL = NTIPO THEN
		UPDATE tipo_documento SET 
		tipodo_descripcion=NTIPO,
		tipodo_estado=ESTATUS
		WHERE tipodocumento_id=ID;
		SELECT 1;
ELSE
		SET @CANTIDAD:=(SELECT COUNT(*) FROM tipo_documento WHERE tipodo_descripcion=NTIPO);
		IF @CANTIDAD = 0 THEN
		  UPDATE tipo_documento SET 
		  tipodo_descripcion=NTIPO,
		  tipodo_estado=ESTATUS
		  WHERE tipodocumento_id=ID;
			SELECT 1;
		ELSE
		  SELECT 2;
		END IF;

END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MODIFICAR_USUARIO` (IN `ID` INT, IN `USUARIO` VARCHAR(255), IN `IDAREA` INT, IN `ROL` VARCHAR(25), IN `NDOCUMENTO` CHAR(10), IN `NOMBRE` VARCHAR(150), IN `APEPAT` VARCHAR(100), IN `APEMAT` VARCHAR(100), IN `MOVIL` CHAR(10), IN `EMAIL` VARCHAR(80), IN `DIRECCION` VARCHAR(255))   BEGIN
DECLARE USUACTUAL VARCHAR(255);
DECLARE CANTIDAD INT;
SET @USUACTUAL:=(SELECT usu_usuario from usuario where usu_id=ID);
IF @USUACTUAL = USUARIO   THEN
	UPDATE usuario SET
		usu_usuario=USUARIO,
		area_id=IDAREA,
		usu_rol=ROL,
		usu_nrodocumento=NDOCUMENTO,
		usu_nombre=NOMBRE,
		usu_apepat=APEPAT,
		usu_apemat=APEMAT,
		usu_movil=MOVIL,
		usu_email=EMAIL,
		usu_direccion=DIRECCION
	where usu_id=ID;
		SELECT 1;
ELSE
	SET @CANTIDAD:=(SELECT COUNT(*) from usuario where usu_usuario=USUARIO);
		IF  @CANTIDAD = 0  THEN
			UPDATE usuario SET
			usu_usuario=USUARIO,
			area_id=IDAREA,
			usu_rol=ROL,
			usu_nrodocumento=NDOCUMENTO,
			usu_nombre=NOMBRE,
			usu_apepat=APEPAT,
			usu_apemat=APEMAT,
			usu_movil=MOVIL,
			usu_email=EMAIL,
			usu_direccion=DIRECCION
			where usu_id=ID;
				SELECT 1;
		ELSE
			SELECT 2;
		END IF;
END IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MODIFICAR_USUARIO_CONTRA` (IN `ID` INT, IN `CONTRA` VARCHAR(255))   UPDATE usuario SET 
	usu_contra=CONTRA
WHERE usu_id=ID$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MODIFICAR_USUARIO_ESTATUS` (IN `ID` INT, IN `ESTATUS` VARCHAR(20))   UPDATE usuario SET 
	usu_estatus=ESTATUS
WHERE usu_id=ID$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MODIFICAR_USUARIO_USU` (IN `ID` INT, IN `USU` VARCHAR(250))   UPDATE usuario SET 
  usu_usuario=USU 
WHERE usu_id=ID$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_REGISTRAR_AREA` (IN `NAREA` VARCHAR(255))   BEGIN
DECLARE CANTIDAD INT;
SET @CANTIDAD:=(SELECT COUNT(*) FROM area WHERE area_nombre=NAREA);

IF @CANTIDAD = 0 THEN
   INSERT INTO area(area_nombre,area_fecha_registro) VALUES(NAREA,NOW());
	 SELECT 1;

ELSE
   SELECT 2;

END IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_REGISTRAR_FECHAR` (IN `FECHA` VARCHAR(255), IN `ID` CHAR(12), IN `RES` VARCHAR(5))   BEGIN
DECLARE IDMOVIMENTO INT;
SET @IDMOVIMENTO:=(select COUNT(*) from movimiento WHERE movimiento.documento_id=ID and movimiento.mov_fecharegistro=FECHA and movimiento.mov_recibir='NO');
IF @IDMOVIMENTO = 1 THEN
	UPDATE movimiento SET
	fecha_recibida=NOW(),
	mov_recibir=RES
	WHERE movimiento.documento_id=ID and movimiento.mov_fecharegistro=FECHA;
	SELECT 1;
ELSE
   SELECT 2;
END IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_REGISTRAR_TIPO` (IN `NTIPO` VARCHAR(255))   BEGIN
 DECLARE CANTIDAD INT;
 SET @CANTIDAD:=(SELECT COUNT(*) FROM tipo_documento WHERE tipodo_descripcion=NTIPO);
 IF @CANTIDAD = 0 THEN
		INSERT INTO tipo_documento(tipodo_descripcion,tipodo_estado,tipodo_fregistro) VALUES(NTIPO,'ACTIVO',NOW());
		SELECT 1;
 ELSE
    SELECT 2;
 END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_REGISTRAR_TRAMITE` (IN `AREAPRINCIPAL` INT, IN `AREADESTINO` INT, IN `TIPO` INT, IN `NRODOCUMENTO` VARCHAR(50), IN `ASUNTO` VARCHAR(255), IN `RUTA` VARCHAR(255), IN `FOLIO` INT, IN `IDUSUARIO` INT, IN `TIPOTRA` VARCHAR(50), IN `ARCHFIS` VARCHAR(255))   BEGIN
DECLARE cantidad INT;
declare cod char(12);
SET @cantidad :=(SELECT count(*) FROM documento );
IF @cantidad >= 1 AND @cantidad <= 8  THEN
SET @cod :=(SELECT CONCAT('D000000',(@cantidad+1)));
ELSEIF @cantidad >=9 AND @cantidad <=98 THEN
SET @cod :=(SELECT CONCAT('D00000',(@cantidad+1)));
ELSEIF @cantidad >=99 AND @cantidad <=998 THEN
SET @cod :=(SELECT CONCAT('D0000',(@cantidad+1)));
ELSEIF @cantidad >=999 AND @cantidad <=9998 THEN
SET @cod :=(SELECT CONCAT('D000',(@cantidad+1)));
ELSEIF @cantidad >=9999 AND @cantidad <=99998 THEN
SET @cod :=(SELECT CONCAT('D00',(@cantidad+1)));
ELSEIF @cantidad >=99999 AND @cantidad <=999998 THEN
SET @cod :=(SELECT CONCAT('D0',(@cantidad+1)));
ELSEIF @cantidad >=999999 THEN
SET @cod :=(SELECT CONCAT('D',(@cantidad+1)));
ELSE
SET @cod :=(SELECT CONCAT('D0000001'));
END IF;
INSERT INTO documento(documento_id,remitente,destinatario,tipodocumento_id,doc_nrodocumento,doc_asunto,doc_archivo,doc_folio,doc_tipo,doc_archivo_fisico,usuario_id) VALUES(@cod,AREAPRINCIPAL,AREADESTINO,TIPO,NRODOCUMENTO,ASUNTO,RUTA,FOLIO,TIPOTRA,ARCHFIS,IDUSUARIO);
SELECT @cod;
INSERT INTO movimiento(documento_id,area_origen_id,areadestino_id,mov_fecharegistro,mov_descripcion,mov_estatus,usuario_id,mov_archivo,mov_fecha_contar, mov_arch_fisico) VALUES(@cod,AREAPRINCIPAL,AREADESTINO,NOW(),ASUNTO,'PENDIENTE',IDUSUARIO,RUTA,NOW(),ARCHFIS);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_REGISTRAR_TRAMITE_DERIVAR` (IN `ID` CHAR(11), IN `ORIGEN` INT, IN `DESTINO` INT, IN `DESCRIPCION` VARCHAR(255), IN `IDUSUARIO` INT, IN `RUTA` VARCHAR(255), IN `TIPO` VARCHAR(255), IN `ULTIMO` VARCHAR(50), IN `ARCFI` VARCHAR(255))   BEGIN
DECLARE IDMOVIMENTO INT;
SET @IDMOVIMENTO:=(select movimiento_id from movimiento where mov_estatus='PENDIENTE' AND documento_id=ID);

IF TIPO = "FINALIZAR" THEN
	UPDATE movimiento SET
	mov_estatus='FINALIZADO'
	where movimiento_id=@IDMOVIMENTO;
	UPDATE documento SET
	remitente=ORIGEN,
	destinatario=ORIGEN,
	doc_estatus='FINALIZADO'
	WHERE documento_id=ID;
	INSERT INTO movimiento(documento_id,area_origen_id,areadestino_id,mov_fecharegistro,mov_descripcion,mov_estatus,usuario_id,mov_archivo,mov_fecha_contar,mov_arch_fisico) VALUES(ID,ORIGEN,ORIGEN,NOW(),DESCRIPCION,'FINALIZADO',IDUSUARIO,RUTA,ULTIMO,ARCFI);

ELSE
	IF TIPO = "RECHAZADO" THEN
		UPDATE movimiento SET
		mov_estatus='RECHAZADO'
		where movimiento_id=@IDMOVIMENTO;
		UPDATE documento SET
		remitente=ORIGEN,
		destinatario=ORIGEN,
		doc_estatus='RECHAZADO'
		WHERE documento_id=ID;
		INSERT INTO movimiento(documento_id,area_origen_id,areadestino_id,mov_fecharegistro,mov_descripcion,mov_estatus,usuario_id,mov_archivo,mov_fecha_contar,mov_arch_fisico) VALUES(ID,ORIGEN,ORIGEN,NOW(),DESCRIPCION,'RECHAZADO',IDUSUARIO,RUTA,ULTIMO,ARCFI);


	ELSE
		UPDATE movimiento SET
		mov_estatus='DERIVADO'
		where movimiento_id=@IDMOVIMENTO;
		UPDATE documento SET
		remitente=ORIGEN,
		destinatario=DESTINO
		WHERE documento_id=ID;
		INSERT INTO movimiento(documento_id,area_origen_id,areadestino_id,mov_fecharegistro,mov_descripcion,mov_estatus,usuario_id,mov_archivo,mov_fecha_contar,mov_arch_fisico) VALUES(ID,ORIGEN,DESTINO,NOW(),DESCRIPCION,'PENDIENTE',IDUSUARIO,RUTA,ULTIMO,ARCFI);
	END IF;
END IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_REGISTRAR_USUARIO` (IN `USU` VARCHAR(250), IN `CONTRA` VARCHAR(255), IN `IDAREA` INT, IN `ROL` VARCHAR(25), IN `NDOCUMENTO` CHAR(10), IN `NOMBRE` VARCHAR(150), IN `APEPAT` VARCHAR(50), IN `APEMAT` VARCHAR(50), IN `MOVIL` CHAR(10), IN `EMAIL` VARCHAR(80), `DIRECCION` VARCHAR(255))   BEGIN
DECLARE CANTIDAD INT;
DECLARE CANTIDAD2 INT;
SET @CANTIDAD:=(SELECT COUNT(*) FROM usuario where usu_usuario=USU);
SET @CANTIDAD2:=(SELECT COUNT(*) FROM usuario WHERE usu_nrodocumento=NDOCUMENTO);
IF @CANTIDAD = 0 AND @CANTIDAD2 = 0 THEN
	
	INSERT INTO usuario(usu_usuario,usu_contra,area_id,usu_rol,usu_feccreacion,usu_estatus,empresa_id,usu_nrodocumento,usu_nombre,usu_apepat,usu_apemat,usu_movil,usu_email,usu_direccion,usu_fotoperfil) VALUES(USU,CONTRA,IDAREA,ROL,CURDATE(),'ACTIVO',1,NDOCUMENTO,NOMBRE,APEPAT,APEMAT,MOVIL,EMAIL,DIRECCION,'controller/usuario/FOTO/admin.png');
	SELECT 1;

ELSE

SELECT 2;
END IF;


END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_TRAER_WIDGET` ()   SELECT 
  
  (SELECT COUNT(*) FROM area) as area,
	(SELECT COUNT(*) FROM tipo_documento) as tipo,
	(SELECT COUNT(*) FROM documento) as tramites,
	(SELECT COUNT(*) FROM usuario) as usuario,
	(SELECT COUNT(*) FROM documento WHERE documento.doc_estatus='FINALIZADO') as finalizado,
	(SELECT COUNT(*) FROM documento WHERE documento.doc_estatus='RECHAZADO') as rechazados
FROM 
	area  LIMIT 1$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_VERIFICAR_USUARIO` (IN `USU` VARCHAR(255))   SELECT
	usuario.usu_id, 
	usuario.usu_usuario, 
	usuario.usu_contra, 
	usuario.usu_feccreacion, 
	usuario.usu_estatus, 
	usuario.area_id, 
	usuario.usu_rol, 
	usuario.empresa_id, 
	area.area_nombre, 
	usuario.usu_nombre, 
	usuario.usu_apepat, 
	usuario.usu_apemat, 
	usuario.usu_nrodocumento, 
	usuario.usu_movil, 
	usuario.usu_email, 
	usuario.usu_direccion, 
	usuario.usu_fotoperfil
FROM
	usuario
	INNER JOIN
	area
	ON 
		usuario.area_id = area.area_cod
	
	WHERE usuario.usu_usuario = BINARY USU$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `area`
--

CREATE TABLE `area` (
  `area_cod` int(11) NOT NULL,
  `area_nombre` varchar(50) COLLATE utf8_spanish_ci NOT NULL COMMENT 'nombre del area',
  `area_fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'fecha del registro del movimiento',
  `area_estado` enum('ACTIVO','INACTIVO') COLLATE utf8_spanish_ci NOT NULL DEFAULT 'ACTIVO' COMMENT 'estado del area'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci COMMENT='Entidad Area' ROW_FORMAT=DYNAMIC;

--
-- Volcado de datos para la tabla `area`
--

INSERT INTO `area` (`area_cod`, `area_nombre`, `area_fecha_registro`, `area_estado`) VALUES
(1, 'TICs', '2022-09-28 05:31:10', 'ACTIVO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documento`
--

CREATE TABLE `documento` (
  `documento_id` char(12) COLLATE utf8_spanish_ci NOT NULL,
  `tipodocumento_id` int(11) NOT NULL,
  `doc_nrodocumento` varchar(50) COLLATE utf8_spanish_ci NOT NULL DEFAULT '',
  `doc_folio` int(11) NOT NULL,
  `doc_asunto` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `doc_archivo` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `doc_fecharegistro` datetime DEFAULT current_timestamp(),
  `doc_estatus` enum('PENDIENTE','RECHAZADO','FINALIZADO') COLLATE utf8_spanish_ci NOT NULL,
  `doc_tipo` enum('INTERNO','EXTERNO') COLLATE utf8_spanish_ci NOT NULL DEFAULT 'INTERNO',
  `doc_archivo_fisico` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `remitente` int(11) NOT NULL,
  `destinatario` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa`
--

CREATE TABLE `empresa` (
  `empresa_id` int(11) NOT NULL,
  `emp_razon` varchar(250) COLLATE utf8_spanish_ci NOT NULL,
  `emp_email` varchar(250) COLLATE utf8_spanish_ci NOT NULL,
  `emp_cod` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `emp_telefono` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `emp_direccion` varchar(250) COLLATE utf8_spanish_ci NOT NULL,
  `emp_logo` varchar(255) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

--
-- Volcado de datos para la tabla `empresa`
--

INSERT INTO `empresa` (`empresa_id`, `emp_razon`, `emp_email`, `emp_cod`, `emp_telefono`, `emp_direccion`, `emp_logo`) VALUES
(1, 'GAD MUNICIPAL CANTÓN COLTA', 'gadcolta@gmail.com', '', '032564897', 'colta', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimiento`
--

CREATE TABLE `movimiento` (
  `movimiento_id` int(11) NOT NULL,
  `documento_id` char(12) COLLATE utf8_spanish_ci NOT NULL,
  `area_origen_id` int(11) DEFAULT NULL,
  `areadestino_id` int(11) NOT NULL,
  `mov_fecharegistro` datetime DEFAULT current_timestamp(),
  `mov_descripcion` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `mov_estatus` enum('PENDIENTE','CONFORME','INCOFORME','ACEPTADO','DERIVADO','FINALIZADO','RECHAZADO') COLLATE utf8_spanish_ci DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `mov_archivo` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `mov_descripcion_original` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `mov_fecha_contar` datetime DEFAULT NULL,
  `mov_arch_fisico` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `fecha_recibida` datetime DEFAULT NULL,
  `mov_recibir` enum('SI','NO') COLLATE utf8_spanish_ci DEFAULT 'NO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_documento`
--

CREATE TABLE `tipo_documento` (
  `tipodocumento_id` int(11) NOT NULL COMMENT 'Codigo auto-incrementado del tipo documento',
  `tipodo_descripcion` varchar(50) COLLATE utf8_spanish_ci NOT NULL COMMENT 'Descripcion del  tipo documento',
  `tipodo_estado` enum('ACTIVO','INACTIVO') COLLATE utf8_spanish_ci NOT NULL DEFAULT 'ACTIVO' COMMENT 'estado del tipo de documento',
  `tipodo_fregistro` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci COMMENT='Entidad Documento' ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `usu_id` int(11) NOT NULL,
  `usu_usuario` varchar(250) COLLATE utf8_spanish_ci DEFAULT '',
  `usu_contra` varchar(250) COLLATE utf8_spanish_ci DEFAULT NULL,
  `usu_feccreacion` date DEFAULT NULL,
  `usu_estatus` enum('ACTIVO','INACTIVO') COLLATE utf8_spanish_ci NOT NULL DEFAULT 'ACTIVO',
  `area_id` int(11) DEFAULT NULL,
  `usu_rol` enum('Secretario','Administrador','Supervisor') COLLATE utf8_spanish_ci NOT NULL DEFAULT 'Secretario',
  `empresa_id` int(11) DEFAULT 1,
  `usu_nombre` varchar(150) COLLATE utf8_spanish_ci NOT NULL,
  `usu_apepat` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `usu_apemat` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `usu_nrodocumento` char(10) COLLATE utf8_spanish_ci NOT NULL,
  `usu_movil` char(10) COLLATE utf8_spanish_ci NOT NULL,
  `usu_email` varchar(80) COLLATE utf8_spanish_ci NOT NULL,
  `usu_direccion` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `usu_fotoperfil` varchar(255) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`usu_id`, `usu_usuario`, `usu_contra`, `usu_feccreacion`, `usu_estatus`, `area_id`, `usu_rol`, `empresa_id`, `usu_nombre`, `usu_apepat`, `usu_apemat`, `usu_nrodocumento`, `usu_movil`, `usu_email`, `usu_direccion`, `usu_fotoperfil`) VALUES
(1, 'admin', '$2y$12$UKZYTN16UTjWSOIPwgYvYeeZVPxskkVS.d/mZ7sjr5TNd7b/kmEvy', '2022-06-22', 'ACTIVO', 1, 'Administrador', 1, 'Fabian Patricio', 'Ashqui', 'C', '1500621485', '0996804453', 'fashqi@gmail.com', 'Cajabamba', 'controller/usuario/FOTO/ARCH22720220721.png');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `area`
--
ALTER TABLE `area`
  ADD PRIMARY KEY (`area_cod`) USING BTREE,
  ADD UNIQUE KEY `unico` (`area_nombre`) USING BTREE;

--
-- Indices de la tabla `documento`
--
ALTER TABLE `documento`
  ADD PRIMARY KEY (`documento_id`) USING BTREE,
  ADD KEY `tipodocumento_id` (`tipodocumento_id`) USING BTREE,
  ADD KEY `documento_ibfk_2` (`remitente`) USING BTREE,
  ADD KEY `documento_ibfk_3` (`destinatario`) USING BTREE,
  ADD KEY `usuario_id` (`usuario_id`) USING BTREE;

--
-- Indices de la tabla `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`empresa_id`) USING BTREE;

--
-- Indices de la tabla `movimiento`
--
ALTER TABLE `movimiento`
  ADD PRIMARY KEY (`movimiento_id`) USING BTREE,
  ADD KEY `area_origen_id` (`area_origen_id`) USING BTREE,
  ADD KEY `areadestino_id` (`areadestino_id`) USING BTREE,
  ADD KEY `usuario_id` (`usuario_id`) USING BTREE,
  ADD KEY `documento_id` (`documento_id`) USING BTREE;

--
-- Indices de la tabla `tipo_documento`
--
ALTER TABLE `tipo_documento`
  ADD PRIMARY KEY (`tipodocumento_id`) USING BTREE;

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`usu_id`) USING BTREE,
  ADD KEY `area_id` (`area_id`) USING BTREE,
  ADD KEY `empresa_id` (`empresa_id`) USING BTREE;

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `area`
--
ALTER TABLE `area`
  MODIFY `area_cod` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `empresa`
--
ALTER TABLE `empresa`
  MODIFY `empresa_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `movimiento`
--
ALTER TABLE `movimiento`
  MODIFY `movimiento_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `tipo_documento`
--
ALTER TABLE `tipo_documento`
  MODIFY `tipodocumento_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Codigo auto-incrementado del tipo documento', AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `usu_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `documento`
--
ALTER TABLE `documento`
  ADD CONSTRAINT `documento_ibfk_1` FOREIGN KEY (`tipodocumento_id`) REFERENCES `tipo_documento` (`tipodocumento_id`),
  ADD CONSTRAINT `documento_ibfk_2` FOREIGN KEY (`remitente`) REFERENCES `usuario` (`usu_id`),
  ADD CONSTRAINT `documento_ibfk_3` FOREIGN KEY (`destinatario`) REFERENCES `usuario` (`usu_id`),
  ADD CONSTRAINT `documento_ibfk_4` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`usu_id`);

--
-- Filtros para la tabla `movimiento`
--
ALTER TABLE `movimiento`
  ADD CONSTRAINT `movimiento_ibfk_1` FOREIGN KEY (`area_origen_id`) REFERENCES `usuario` (`usu_id`),
  ADD CONSTRAINT `movimiento_ibfk_2` FOREIGN KEY (`areadestino_id`) REFERENCES `usuario` (`usu_id`),
  ADD CONSTRAINT `movimiento_ibfk_3` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`usu_id`),
  ADD CONSTRAINT `movimiento_ibfk_4` FOREIGN KEY (`documento_id`) REFERENCES `documento` (`documento_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`area_id`) REFERENCES `area` (`area_cod`),
  ADD CONSTRAINT `usuario_ibfk_3` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`empresa_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
