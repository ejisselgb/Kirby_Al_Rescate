//Game Base
var scene,camaras = [], modelos = {}, camaraActiva = null,renderer, jugadores = [];
var entorno = [];
var appW = window.innerWidth; 
var appH = window.innerHeight;
var vxEnemigos = 3;
var murito = 300;


var cx = -500;
var cy = -80;
var cz = 1000;

var laB= 1;
var laB2= 1;
var laB3= 1;
var laB4= 1;

var E1 = 1;
var E2 = 1;
var E3 = 1;
var E4 = 1;
var E5 = 1;
var E6 = 1;

//Colisiones
var bounds = {};
var collidableMeshList = [];

//Game Rules
var level = 1;

var perdiendo = false;

function explode(){
    sonidoOP.play();
	perderVida.parar();
	
}
var url = "./../Finalnivel4/index.php";

function pasarNivel(){

	window.location.href = url;
}


/////////////// Temporizador
var count = 0;

var counter=setInterval(temporizador, 1000); 

function temporizador()
{
  count=count+1;
  document.getElementById("tiempo").innerHTML="Tiempo:" + count;
}


var ultiTiempo;
var salvando = false;
var gravedad = 0.3; 

var TECLA = {
	ARRIBA: false,
	ABAJO: false,
	IZQUIERDA: false,
	DERECHA: false,
	ESPACIO: false,
	X:false,Y:false,Z:false,R:false,
	A:false,W:false,S:false,D:false,SHIFT:false
};

var cargador = {
	loadState: false,
	objsToLoad: 0,
	objsLoaded: 0,
	sceneIsReady: false,
	progress: 0,
	objReady: function(){
		this.objsToLoad--;
		this.objsLoaded++;
		var total = this.objsToLoad + this.objsLoaded;
		var porcentaje = ( this.objsLoaded / total ) * 100;
		this.progress = porcentaje;

		$("#loadingProgress").html(this.progress+" %");

		if(this.progress == 100){
			this.loadState = true;

			$("#loadingProgress").html("Clic para jugar").click(function(){
				$("#loadingScreen").slideUp("slow",function(){
					stats.domElement.style.display = "block";
				});
				$(this).fadeOut();
			});

		}
	},
	addObj: function(){
		this.objsToLoad++;
	}
};

function webGLStart(){
	iniciarEscena();
	$( window ).resize(resizeApp);
	ultiTiempo = Date.now();
	document.onkeydown = teclaPulsada; 
	document.onkeyup = teclaSoltada;
	animarEscena();
}

	function iniciarEscena(){
		
		//inicializar juego
		var canvas = document.getElementById("app");
		renderer = new THREE.WebGLRenderer({canvas:canvas});
		renderer.setSize(appW, appH);
		renderer.setClearColor(0x81DAF5,1);
		renderer.shadowMapEnabled = true;

		camera1 = new THREE.PerspectiveCamera(45, appW/appH, 1, 20000);
		camera1.position.set(200,600,600);
		//camera1.lookAt(new THREE.Vector3(0,0,0));

		camera2 = new THREE.PerspectiveCamera(40, appW/appH, 1, 20000);
		camera2.position.set(0,600,1000);
		camera2.lookAt(new THREE.Vector3(0,0,0));

		camera3 = new THREE.PerspectiveCamera(35, appW/appH, 1, 9000);
		camera3.position.set(cx,cy,cz);
		//camera3.lookAt(new THREE.Vector3(0,0,0));

		camaras.push(camera1,camera2,camera3);

		scene = new THREE.Scene();

		//Controles de la camara
		controlCamara = new THREE.OrbitControls( camaras[0] , renderer.domElement );
		
		//Estadisticas de la app
		stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.top = '0px';
		stats.domElement.style.left = '0px';
		stats.domElement.style.display = "none";
		document.body.appendChild(stats.domElement);

		/*

			LUCES

		*/
		lAmbiente = new THREE.AmbientLight( 0x404040 );

		var color = 0xFFFFFF;
		var intensidad = 2;
		var distancia = 50000;

		lPuntual = new THREE.PointLight( color , intensidad, distancia );
		lPuntual.position.set(0,20000,0);

		lSpotlight = new THREE.SpotLight( 0xffffff, 1, 4000, 30, 0.1);
		lSpotlight.position.set(0,600,400);
		//lSpotlight.castShadow = true;


		scene.add(lAmbiente,lPuntual,lSpotlight);



		//////////// Planos del fondo nivel 1 //////////////////////
		var s_w1 = 1800, s_h1 = 800, s_wd1 = 200, s_hd1 = 50;
	      fondo1 = new THREE.Mesh(
				new THREE.PlaneGeometry(s_w1,s_h1,s_wd1,s_hd1),
				new THREE.MeshLambertMaterial({
					color: 0xffffff,
					wireframe: false,
					side: THREE.DoubleSide,
					map: THREE.ImageUtils.loadTexture("textures/fondo3.png")
				})
			);
		fondo1.material.map.wrapS = fondo1.material.map.wrapT = THREE.RepeatWrapping;
		fondo1.position.set(-1000,-95,-200);
	

		fondo2 = new THREE.Mesh(
				new THREE.PlaneGeometry(s_w1,s_h1,s_wd1,s_hd1),
				new THREE.MeshLambertMaterial({
					color: 0xffffff,
					wireframe: false,
					side: THREE.DoubleSide,
					map: THREE.ImageUtils.loadTexture("textures/fondo3_1.png")
				})
			);
		fondo2.material.map.wrapS = fondo2.material.map.wrapT = THREE.RepeatWrapping;
		fondo2.position.set(800,-95,-200);
	

		fondo3 = new THREE.Mesh(
				new THREE.PlaneGeometry(1400,s_h1,s_wd1,s_hd1),
				new THREE.MeshLambertMaterial({
					color: 0xffffff,
					wireframe: false,
					side: THREE.DoubleSide,
					map: THREE.ImageUtils.loadTexture("textures/fondo3_2.png")
				})
			);
		fondo3.material.map.wrapS = fondo3.material.map.wrapT = THREE.RepeatWrapping;
		fondo3.position.set(2400,-95,-200);
		scene.add(fondo1,fondo2,fondo3);



        ////////////////////////////////////////////////////////////////
		var vacio = new THREE.Mesh(
				new THREE.PlaneGeometry(3000,3000,4,4),
				new THREE.MeshBasicMaterial({
					transparent: true,
					opacity: 0
				})
			);
		vacio.name = "vacio";
		vacio.rotation.x = -Math.PI/2;
		vacio.position.set(0,-800,0);
		collidableMeshList.push(vacio);
		scene.add(vacio);
      ////////////////////////// plataformas ////////////////////////
      ///////////////////////////////////////////////////////////////

      box2 = new THREE.Mesh(
			new THREE.BoxGeometry(200,200,100),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex1.png")})
		);
		box2.position.set(-1000,-400,-100);
		box2.name = "box";



	   box = new THREE.Mesh(
			new THREE.BoxGeometry(200,200,100),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex1.png")})
		);
		box.position.set(-800,-400,-100);
		box.name = "box";

			box3 = new THREE.Mesh(
			new THREE.BoxGeometry(65,150,80),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				transparent: true,
				opacity: 0 
			})
				
		);
		box3.position.set(-745,-275,-100);
		box3.rotation.set(0,0,-45);
		box3.name = "box";


	   box4 = new THREE.Mesh(
			new THREE.BoxGeometry(100,15,30),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex2.png")})
		);
		box4.position.set(-560,-280,-100);
		box4.name = "box";

		box5 = new THREE.Mesh(
			new THREE.BoxGeometry(100,15,30),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex2.png")})
		);
		box5.position.set(-230,-280,-100);
		box5.name = "box";

		box6 = new THREE.Mesh(
			new THREE.BoxGeometry(100,15,30),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex2.png")})
		);
		box6.position.set(-20,-280,-100);
		box6.name = "box";

		box7 = new THREE.Mesh(
			new THREE.BoxGeometry(200,200,100),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex1.png")})
		);
		box7.position.set(280,-400,-100);
		box7.name = "box";

		box8 = new THREE.Mesh(
			new THREE.BoxGeometry(200,200,100),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex1.png")})
		);
		box8.position.set(480,-400,-100);
		box8.name = "box";

		box9 = new THREE.Mesh(
			new THREE.BoxGeometry(100,200,100),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex1.png")})
		);
		box9.position.set(630,-400,-100);
		box9.name = "box_malota";

		box10 = new THREE.Mesh(
			new THREE.BoxGeometry(200,200,100),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex1.png")})
		);
		box10.position.set(780,-400,-100);
		box10.name = "box";

		box11 = new THREE.Mesh(
			new THREE.BoxGeometry(100,15,30),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex2.png")})
		);
		box11.position.set(1000,-280,-100);
		box11.name = "box";

		box12 = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/faceBox.png")})
		);
		box12.position.set(1290,-250,-100);
		box12.name = "box";

		box13 = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/faceBox.png")})
		);
		box13.position.set(1340,-250,-100);
		box13.name = "box";

		box14 = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/faceBox.png")})
		);
		box14.position.set(1390,-250,-100);
		box14.name = "box_malota";

		box15 = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/faceBox.png")})
		);
		box15.position.set(1440,-250,-100);
		box15.name = "box";

		box16 = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/faceBox.png")})
		);
		box16.position.set(1490,-250,-100);
		box16.name = "box";

		box17 = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/faceBox.png")})
		);
		box17.position.set(1540,-250,-100);
		box17.name = "box";

		box18 = new THREE.Mesh(
			new THREE.BoxGeometry(65,150,80),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				transparent: true,
				opacity: 0 
			})
				
		);
		box18.position.set(510,-275,-100);
		box18.rotation.set(0,0,-45);
		box18.name = "box";
        
        box19 = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex1.png")})
		);
		box19.position.set(-70,-120,-100);
		box19.name = "box";

		box20 = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/coinBox.png")})
		);
		box20.position.set(-70,0,-100);
		box20.name = "sacaEstrella1";

		box21 = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex1.png")})
		);
		box21.position.set(30,-100,-100);
		box21.name = "box";

		box22 = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex1.png")})
		);
		box22.position.set(-380,-120,-100);
		box22.name = "box";

		box23 = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/signo.png")})
		);
		box23.position.set(-380,0,-100);
		box23.name = "sacaPoderes";

		box24 = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/signo.png")})
		);
		box24.position.set(490,-10000,-100);
		box24.name = "sacaEstrella2";

		box25 = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/coinBox.png")})
		);
		box25.position.set(750,-10000,-100);
		box25.name = "sacaEstrella3";

		box26 = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex1.png")})
		);
		box26.position.set(640,-150,-100);
		box26.name = "box";




	

        entorno.push(box2,box,box3,box4,box5,box6,box7,box8,box9,box10,box11,box12,
        	         box13,box14,box15,box16,box17,box18,box19,box20,box21,box22,
        	         box23,box24,box25,box26);
		/////////////////////////////////////////////////////////////////////////////////////////////////////////


		ukauka = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				map:THREE.ImageUtils.loadTexture("textures/ukauka.jpg")})
		);
		ukauka.name = "uka uka";
		ukauka.position.set(-60,160,0);

		tnt = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				map:THREE.ImageUtils.loadTexture("textures/tnt.jpg")})
		);
		tnt.name = "TNT";
		tnt.position.set(60,160,0);

		save = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				map:THREE.ImageUtils.loadTexture("textures/faceBox.png")})
		);
		save.name = "save";
		save.position.set(60,160,160);

		portal = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				map:THREE.ImageUtils.loadTexture("textures/faceBox.png")})
		);
		portal.name = "portal";
		portal.position.set(-60,20,160);

		var radio = 25;
		

		//entorno.push(ukauka,tnt,save,portal);

		//////////////////////////////////////////////////////////////////////////
		////////////////////// Musica ///////////////////////////////////////////
		sonidoOP = new Sound(["./sounds/nivel3.mp3"], 100, new THREE.Vector3(0,0,0), 1, {
			debug: true,
			//scene: scene
		});
		sonidoOP.play();

		monedaSong = new Sound(["./sounds/moneda.mp3"], 100, new THREE.Vector3(0,0,0), 1, {
			debug: true,
			//scene: scene
		});

		salto = new Sound(["./sounds/salto.mp3"], 100, new THREE.Vector3(0,0,0), 1, {
			debug: true,
			//scene: scene
		});


		atrapar = new Sound(["./sounds/atrapar.mp3"], 100, new THREE.Vector3(0,0,0), 1, {
			debug: true,
			//scene: scene
		});


		roca = new Sound(["./sounds/roca.mp3"], 100, new THREE.Vector3(0,0,0), 1, {
			debug: true,
			//scene: scene
		});

		ganar = new Sound(["./sounds/ganar.mp3"], 100, new THREE.Vector3(0,0,0), 1, {
			debug: true,
			//scene: scene
		});

		perderVida = new Sound(["./sounds/perderVida.mp3"], 100, new THREE.Vector3(0,0,0), 1, {
			debug: true,
			//scene: scene
		});

		estripar = new Sound(["./sounds/estripar.mp3"], 100, new THREE.Vector3(0,0,0), 1, {
			debug: true,
			//scene: scene
		});

		perderNivel = new Sound(["./sounds/Perder.mp3"], 100, new THREE.Vector3(0,0,0), 1, {
			debug: true,
			//scene: scene
		});



		

		/////////////////////////////////////////////////////////////////
		///////////// Colisionables ///////////////////////////////

		m1 = new THREE.Mesh(
			new THREE.BoxGeometry(40,45,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				transparent: true,
				opacity: 0
				})
		);
		m1.name = "coinb1";
		m1.position.set(250,-10000,-100);

		m2 = new THREE.Mesh(
			new THREE.BoxGeometry(40,45,50),
			new THREE.MeshLambertMaterial( {
				color:0xff0000,
				transparent: true,
				opacity: 0
				})
		);
		m2.name = "coin2";
		m2.position.set(320,-10000,-100);

		m3 = new THREE.Mesh(
			new THREE.BoxGeometry(40,45,50),
			new THREE.MeshLambertMaterial( {
				color:0Xff00ff,
				transparent: true,
				opacity: 0
				})
		);
		m3.name = "coinb2";
		m3.position.set(390,-10000,-100);
		
        m4 = new THREE.Mesh(
			new THREE.BoxGeometry(40,45,50),
			new THREE.MeshLambertMaterial( {
				color:0X000000,
				transparent: true,
				opacity: 0
				})
		);
		m4.name = "coinb4";
		m4.position.set(1000,-10000,-100);

		m5 = new THREE.Mesh(
			new THREE.BoxGeometry(40,45,50),
			new THREE.MeshLambertMaterial( {
				color:0x00ff00,
				transparent: true,
				opacity: 0
				})
		);
		m5.name = "coinb3";
		m5.position.set(1080,-10000,-100);

		m6 = new THREE.Mesh(
			new THREE.BoxGeometry(40,45,50),
			new THREE.MeshLambertMaterial( {
				color:0x0000ff,
				transparent: true,
				opacity: 0
				})
		);
		m6.name = "coin4";
		m6.position.set(1160,-10000,-100);

		b1 = new THREE.Mesh(
			new THREE.BoxGeometry(10,150,10),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				transparent: true,
				opacity: 0
				})
		);
		b1.name = "banderita";
		b1.position.set(1550,-170,-100);

		h1 = new THREE.Mesh(
			new THREE.BoxGeometry(40,50,50),
			new THREE.MeshLambertMaterial( {
				transparent: true,
				opacity: 0
				})
		);
		h1.name = "bomba1";
		h1.position.set(-560,-10000,-100);

		h2 = new THREE.Mesh(
			new THREE.BoxGeometry(40,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				transparent: true,
				opacity: 0
				})
		);
		h2.name = "bomba2";
		h2.position.set(1300,-10000,-100);

		h3 = new THREE.Mesh(
			new THREE.BoxGeometry(40,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				transparent: true,
				opacity: 0
				})
		);
		h3.name = "bomba3";
		h3.position.set(-15,-10000,-100);

		h4 = new THREE.Mesh(
			new THREE.BoxGeometry(40,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				transparent: true,
				opacity: 0
				})
		);
		h4.name = "bomba4";
		h4.position.set(1000,-10000,-100);

		h5 = new THREE.Mesh(
			new THREE.BoxGeometry(40,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				transparent: true,
				opacity: 0
				})
		);
		h5.name = "bomba5";
		h5.position.set(850,-10000,-100);

		h6 = new THREE.Mesh(
			new THREE.BoxGeometry(40,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				transparent: true,
				opacity: 0
				})
		);
		h6.name = "bomba6";
		h6.position.set(400,-10000,-100);

		es1 = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				transparent: true,
				opacity: 0
				})
		);
		es1.name = "estrella1";
		es1.position.set(-70,-10000,-100);

		es2 = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				transparent: true,
				opacity: 0
				})
		);
		es2.name = "estrella2";
		es2.position.set(490,-10000,-100);

		es3 = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				transparent: true,
				opacity: 0
				})
		);
		es3.name = "estrella3";
		es3.position.set(750,-10000,-100);


        entorno.push(h1,h2,h3,h4,h5,h6,b1,m1,m2,m3,m4,m5,m6,es1,es2,es3);

	
		cargarEntorno();

		////////////////////////////////////////////////////////////////////
        var opP1;
		if($("#modelP1").val() != ""){
			opP1 = 0;
		}else{
			opP1 = 1;
		}
		//JUGADORES

		p1 = new THREE.Mesh(
			new THREE.SphereGeometry(radio,0,0),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				transparent: true,
				opacity: 0
				})
		);
		p1.collidableDistance = radio;
		p1.position.set(-1000,-180,-100);
		j1 = new Jugador($("#p1").val(),p1);
		j1.puntos.set($("#p1p").val());
		j1.vidas.set($("#p1v").val());

		if($("#modelP1").val() != ""){
			JSONLoader('modeloP1',$("#modelP1").val(),$("#textureP1").val(),{
				scale:{x:0.8,y:0.8,z:0.8},
				position:{x:0,y:-20,z:0}
			});
		}	

		

		

     ////////////////////////////////////////////////////////////////////////////////
     /////////////////// Modelos /////////////////////////////////////////////////
		/*JSONLoader('Kirby','modelos/json/kirby/kirby2.js','modelos/json/kirby/',{
			scale:{x:20,y:20,z:20},
			position:{x:0,y:0,z:-15},
			rotation:{x:0,y:Math.PI/2,z:0}
		});*/

	

    JSONLoader('moneda','modelos/json/moneda/moneda.js','modelos/json/moneda/',{
			scale:{x:0.5,y:0.5,z:0.5},
			position:{x:0,y:-16,z:-2},
			rotation:{x:0,y:0,z:0}
		});

     JSONLoader('moneda2','modelos/json/moneda/moneda.js','modelos/json/moneda/',{
			scale:{x:0.5,y:0.5,z:0.5},
			position:{x:0,y:-16,z:-2},
			rotation:{x:0,y:0,z:0}
		});

     JSONLoader('moneda3','modelos/json/moneda/moneda.js','modelos/json/moneda/',{
			scale:{x:0.5,y:0.5,z:0.5},
			position:{x:0,y:-16,z:-2},
			rotation:{x:0,y:0,z:0}
		});


     JSONLoader('moneda4','modelos/json/moneda/moneda.js','modelos/json/moneda/',{
			scale:{x:0.5,y:0.5,z:0.5},
			position:{x:0,y:-16,z:-2},
			rotation:{x:0,y:0,z:0}
		});

     JSONLoader('moneda5','modelos/json/moneda/moneda.js','modelos/json/moneda/',{
			scale:{x:0.5,y:0.5,z:0.5},
			position:{x:0,y:-16,z:-2},
			rotation:{x:0,y:0,z:0}
		});

     JSONLoader('moneda6','modelos/json/moneda/moneda.js','modelos/json/moneda/',{
			scale:{x:0.5,y:0.5,z:0.5},
			position:{x:0,y:-16,z:-2},
			rotation:{x:0,y:0,z:0}
		});


      
      JSONLoader('bandera','modelos/json/Bandera/bandera_js.js','modelos/json/Bandera/',{
			scale:{x:2,y:5,z:2},
			position:{x:0,y:-67,z:-2},
			rotation:{x:0,y:Math.PI/2,z:0}
		});


      JSONLoader('tubo_1','modelos/json/tubo/tubo1.js','modelos/json/tubo/',{
			scale:{x:2,y:5,z:2},
			position:{x:-7,y:-70,z:-5},
			rotation:{x:0,y:0,z:0}
		});

      JSONLoader('tubo_2','modelos/json/tubo2/tubo2.js','modelos/json/tubo2/',{
			scale:{x:2,y:5,z:2},
			position:{x:-7,y:-70,z:-5},
			rotation:{x:0,y:0,z:0}
		});

      JSONLoader('bomba_1','modelos/json/Bomba/bomba.js','modelos/json/Bomba/',{
			scale:{x:1.8,y:1.8,z:1.8},
			position:{x:-3,y:-25,z:-8},
			rotation:{x:0,y:Math.PI/2,z:0}
		});

      JSONLoader('bomba_2','modelos/json/Bomba/bomba.js','modelos/json/Bomba/',{
			scale:{x:1.8,y:1.8,z:1.8},
			position:{x:-3,y:-25,z:-8},
			rotation:{x:0,y:Math.PI/2,z:0}
		});
      
      JSONLoader('bomba_3','modelos/json/Bomba/bomba.js','modelos/json/Bomba/',{
			scale:{x:1.8,y:1.8,z:1.8},
			position:{x:-3,y:-25,z:-8},
			rotation:{x:0,y:Math.PI/2,z:0}
		});

      JSONLoader('bomba_4','modelos/json/Bomba/bomba.js','modelos/json/Bomba/',{
			scale:{x:1.8,y:1.8,z:1.8},
			position:{x:-3,y:-25,z:-8},
			rotation:{x:0,y:Math.PI/2,z:0}
		});

      JSONLoader('bomba_5','modelos/json/Bomba/bomba.js','modelos/json/Bomba/',{
			scale:{x:1.8,y:1.8,z:1.8},
			position:{x:-3,y:-25,z:-8},
			rotation:{x:0,y:Math.PI/2,z:0}
		});

      JSONLoader('bomba_6','modelos/json/Bomba/bomba.js','modelos/json/Bomba/',{
			scale:{x:1.8,y:1.8,z:1.8},
			position:{x:-3,y:-25,z:-8},
			rotation:{x:0,y:Math.PI/2,z:0}
		});

      JSONLoader('estrella_1','modelos/json/estrella/estrellita.js','modelos/json/estrella/',{
			scale:{x:0.4,y:0.4,z:0.4},
			position:{x:-2,y:-32,z:0},
			rotation:{x:0,y:Math.PI,z:0}
		});

      JSONLoader('estrella_2','modelos/json/estrella/estrellita.js','modelos/json/estrella/',{
			scale:{x:0.4,y:0.4,z:0.4},
			position:{x:-2,y:-32,z:0},
			rotation:{x:0,y:Math.PI,z:0}
		});

      JSONLoader('estrella_3','modelos/json/estrella/estrellita.js','modelos/json/estrella/',{
			scale:{x:0.4,y:0.4,z:0.4},
			position:{x:-2,y:-32,z:0},
			rotation:{x:0,y:Math.PI,z:0}
		});



	}
    
	
    /////////////////////////////////////////////////////////////////////////////////
	function cargarEntorno(){
		for (var i = 0; i < entorno.length; i++) {
			entorno[i].castShadow = entorno[i].receiveShadow = true;
			collidableMeshList.push(entorno[i]);
			scene.add(entorno[i]);
		};
	}

	function cargarModelos(){
		for (var i = 0; i < Object.keys(modelos).length; i++) {
			scene.add(modelos[Object.keys(modelos)[i]]);
		};
		if($("#modelP1").val() != ""){
			j1.obj.add(modelos["modeloP1"]);
		}

		//j1.obj.add(modelos["Kirby"]);
		m1.add(modelos["moneda"]);
		m2.add(modelos["moneda2"]);
		m3.add(modelos["moneda3"]);
		m4.add(modelos["moneda4"]);
		m5.add(modelos["moneda5"]);
		m6.add(modelos["moneda6"]);
		b1.add(modelos["bandera"]);
		h1.add(modelos["bomba_1"]);
		h2.add(modelos["bomba_2"]);
		h3.add(modelos["bomba_3"]);
		h4.add(modelos["bomba_4"]);
		h5.add(modelos["bomba_5"]);
		h6.add(modelos["bomba_6"]);
		box3.add(modelos["tubo_1"]);
		box18.add(modelos["tubo_2"]);
		es1.add(modelos["estrella_1"]);
		es2.add(modelos["estrella_2"]);
		es3.add(modelos["estrella_3"]);



	}

	function animarEscena(){
		requestAnimationFrame( animarEscena );
		if(!cargador.loadState && cargador.objsToLoad > 0){
			console.log("Obj Loaded : "+cargador.objsLoaded+" / "+(cargador.objsToLoad+cargador.objsLoaded));
		}else{
			if(!cargador.sceneIsReady){
				cargarModelos();
				cargador.sceneIsReady = true;
			}
			renderEscena();
			actualizarEscena();


		}
		
	}

	function renderEscena(){
		renderer.render( scene, camera3 );
	}

	function actualizarEscena(){
		controlCamara.update();
		stats.update();
		moverBarra1();
		moverBarra2();
		moverBarra3();
		moverBarra4();
		moverEnemigo1();
		moverEnemigo2();
		moverEnemigo3();
		moverEnemigo4();
		moverEnemigo5();
		moverEnemigo6();
		//camera3.lookAt(p1.position);
		//fondo1.lookAt(p1.position);
		//camaras[2].lookAt(p1.position);
		//modelos["Mario"].lookAt(j1.obj.position);
		//modelos["Luigi"].lookAt(j1.obj.position);

		//COLISIONES
		for (var i = 0; i < jugadores.length; i++) {

			jugadores[i].vy += gravedad;
			if( jugadores[i].inAir ){
				if(jugadores[i].vy>jugadores[i].vf){
					jugadores[i].vy = jugadores[i].vf;
				}
			}
			

			Colisiones.collideUp(jugadores[i]);
 			Colisiones.collideDown(jugadores[i]);
 			Colisiones.collideLeft(jugadores[i]);
 		 	Colisiones.collideRight(jugadores[i]);
 			Colisiones.collideFront(jugadores[i]);
 			Colisiones.collideBottom(jugadores[i]);		


		};

		//FIN COLISIONES

		if(TECLA.ESPACIO){ 
			j1.jump();
    		
    		salto.play();

		}


		/*if(TECLA.IZQUIERDA){
			j1.obj.rotation.y = -1 *Math.PI/2; 
			j1.move("x",-j1.vx);

		}*/

		if(TECLA.IZQUIERDA){
   			j1.obj.rotation.y = -1 * Math.PI/2; 
  
   				if((camera3.position.x - j1.obj.position.x )>=murito){
    			}else{
     			j1.move("x",-j1.vx);
   					}
  				}


		/*if(TECLA.DERECHA){
			j1.obj.rotation.y = Math.PI/2; 
			j1.move("x",j1.vx);

		}*/

		if(TECLA.DERECHA){
   			j1.obj.rotation.y = Math.PI/2; 
 			j1.move("x",j1.vx)

 			var posCamera = camera3.position.x ;
 			var posPj= j1.obj.position.x;
			var operacion = posCamera - posPj;
			 
			 if((camera3.position.x >= j1.obj.position.x)==0){
			   x = j1.obj.position.x;
			   camera3.position.set(x,cy,cz);
				 }else if((operacion >=murito )){
			  x = j1.obj.position.x;
			   camera3.position.set(x,cy,cz);
			      
			 }

			   }

	}

///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////// Mover Enemigos ////////////////////////////////////////////////
function moverEnemigo1(){
    
      if(h1.position.x<=-560){

    	E1 = 1;

    }
    if(h1.position.x>=-410){
    	E1 = -1;
    	
    }
    h1.position.x += 1 * E1;
  }

  function moverEnemigo2(){
    
      if(h2.position.x<=1300){

    	E2 = 1;

    }
    if(h2.position.x>=1500){
    	E2 = -1;
    	
    }
    h2.position.x += 1 * E2;
  }

  function moverEnemigo3(){
    
      if(h3.position.x<=-50){

    	E3 = 1;

    }
    if(h3.position.x>=40){
    	E3 = -1;
    	
    }
    h3.position.x += 1 * E3;
  }

  function moverEnemigo4(){
    
      if(h4.position.x<=1000){

    	E4 = 1;

    }
    if(h4.position.x>=1140){
    	E4 = -1;
    	
    }
    h4.position.x += 1 * E4;
  }

  	function moverEnemigo5(){
    
      if(h5.position.x<=610){

    	E5 = 0.9;

   		 }
    		if(h5.position.x>=850){
    		E5 = -0.9;
    	
    		}
    h5.position.x += 0.9 * E5;
  }

  	function moverEnemigo6(){
    
      if(h6.position.x<=210){

    	E6 = 0.9;

   		 }
    		if(h6.position.x>=400){
    		E6 = -0.9;
    	
    		}
    h6.position.x += 0.9 * E6;
  	}


//////////////////////////////////////////////////////////////////////////////
   function moverBarra1(){
    
      if(box4.position.x<=-560){

    	laB = 1;

    }
    if(box4.position.x>=-410){
    	laB = -1;
    	
    }
    box4.position.x += 1 * laB;
  }

  function moverBarra2(){
    
      if(box5.position.y<=-350){

    	laB2 = 1;

    }
    if(box5.position.y>=-170){
    	laB2 = -1;
    	
    }
    box5.position.y += 1 * laB2;
  }


  function moverBarra3(){
    
      if(box6.position.x<=-50){

    	laB3 = 1;

    }
    if(box6.position.x>=40){
    	laB3 = -1;
    	
    }
    box6.position.x += 1 * laB3;
  }

  function moverBarra4(){
    
      if(box11.position.x<=1000){

    	laB4 = 1;

    }
    if(box11.position.x>=1140){
    	laB4 = -1;
    	
    }
    box11.position.x += 1 * laB4;
  }


///////////////////////////////////////////////////////////////////////////
//////////////// borrar nivel 1 ////////////////////////////
  function borrarNivel1(){

  	    scene.remove(fondo1);
		scene.remove(fondo2);
		scene.remove(fondo3);
  }

///////////////////////////////////////////////////////////////////////
     ///////////// Crear nivel 2 ////////////////////////

  function crearNivel2(){

  	var s_w1 = 1800, s_h1 = 800, s_wd1 = 200, s_hd1 = 50;
	      fondoDos = new THREE.Mesh(
				new THREE.PlaneGeometry(s_w1,s_h1,s_wd1,s_hd1),
				new THREE.MeshLambertMaterial({
					color: 0xffffff,
					wireframe: false,
					side: THREE.DoubleSide,
					map: THREE.ImageUtils.loadTexture("textures/fondo2.png")
				})
			);
		fondoDos.material.map.wrapS = fondoDos.material.map.wrapT = THREE.RepeatWrapping;
		fondoDos.position.set(-1000,-95,-200);
	

		fondoDos2 = new THREE.Mesh(
				new THREE.PlaneGeometry(s_w1,s_h1,s_wd1,s_hd1),
				new THREE.MeshLambertMaterial({
					color: 0xffffff,
					wireframe: false,
					side: THREE.DoubleSide,
					map: THREE.ImageUtils.loadTexture("textures/fondo2_1.png")
				})
			);
		fondoDos2.material.map.wrapS = fondoDos2.material.map.wrapT = THREE.RepeatWrapping;
		fondoDos2.position.set(800,-95,-200);
	

		fondoDos3 = new THREE.Mesh(
				new THREE.PlaneGeometry(1400,s_h1,s_wd1,s_hd1),
				new THREE.MeshLambertMaterial({
					color: 0xffffff,
					wireframe: false,
					side: THREE.DoubleSide,
					map: THREE.ImageUtils.loadTexture("textures/fondo2_2.png")
				})
			);
		fondoDos3.material.map.wrapS = fondoDos3.material.map.wrapT = THREE.RepeatWrapping;
		fondoDos3.position.set(2400,-95,-200);
		scene.add(fondoDos,fondoDos2,fondoDos3);


  }


	