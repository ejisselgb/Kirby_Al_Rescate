//Game Base
var scene,camaras = [], modelos = {}, camaraActiva = null,renderer, jugadores = [], enemigos = [];
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
var laB5= 1;
var laB6= 1;
var laB7= 1;

var go1= 1;
var go2= 1;
var go3= 1;

var hongo1 = 1;
var hongo2 = 1;
var hongo3 = 1;

var bala = 1;
var enemigoM = 1;
var enemigoL = 1;
var enemigoP = 1;
var enemigoPS = 1;

var saltaM = 1;

//Colisiones
var bounds = {};
var collidableMeshList = [];

//Game Rules
var level = 1;

var perdiendo = false;

var estado = false;

function explode(){
    sonidoOP.play();
	perderVida.parar();
	
}

var url = "./../Final/index.html";

function explode(){
	sonidoOP.play();
	perderVida.parar();
	
}

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
					map: THREE.ImageUtils.loadTexture("textures/fondo4.png")
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
					map: THREE.ImageUtils.loadTexture("textures/fondo4_1.png")
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
		scene.add(fondo1,fondo2);



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

        box1 = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex4.png")})
		);
		box1.position.set(-1000,-300,-100);
		box1.name = "box";

		box2 = new THREE.Mesh(
			new THREE.BoxGeometry(100,20,30),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex5.png")})
		);
		box2.position.set(-820,-250,-100);
		box2.name = "box";

		box3 = new THREE.Mesh(
			new THREE.BoxGeometry(100,20,30),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex5.png")})
		);
		box3.position.set(-520,-270,-100);
		box3.name = "box";

		box4 = new THREE.Mesh(
			new THREE.BoxGeometry(200,100,100),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex6.png")})
		);
		box4.position.set(-1200,-450,-100);
		box4.name = "lava";

		box5 = new THREE.Mesh(
			new THREE.BoxGeometry(200,100,100),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex6.png")})
		);
		box5.position.set(-1000,-450,-100);
		box5.name = "lava";

		box6 = new THREE.Mesh(
			new THREE.BoxGeometry(200,100,100),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex6.png")})
		);
		box6.position.set(-800,-450,-100);
		box6.name = "lava";

		box7 = new THREE.Mesh(
			new THREE.BoxGeometry(200,100,100),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex6.png")})
		);
		box7.position.set(-600,-450,-100);
		box7.name = "lava";

		box8 = new THREE.Mesh(
			new THREE.BoxGeometry(200,100,100),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex6.png")})
		);
		box8.position.set(-1400,-450,-100);
		box8.name = "lava";

		box9 = new THREE.Mesh(
			new THREE.BoxGeometry(200,100,100),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex6.png")})
		);
		box9.position.set(-400,-450,-100);
		box9.name = "lava";

		box10 = new THREE.Mesh(
			new THREE.BoxGeometry(200,100,100),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex6.png")})
		);
		box10.position.set(-200,-450,-100);
		box10.name = "lava";

		box11 = new THREE.Mesh(
			new THREE.BoxGeometry(200,100,100),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex6.png")})
		);
		box11.position.set(0,-450,-100);
		box11.name = "lava";

		box12 = new THREE.Mesh(
			new THREE.BoxGeometry(200,100,100),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex6.png")})
		);
		box12.position.set(200,-450,-100);
		box12.name = "lava";

		box13 = new THREE.Mesh(
			new THREE.BoxGeometry(200,100,100),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex6.png")})
		);
		box13.position.set(400,-450,-100);
		box13.name = "lava";

		box14 = new THREE.Mesh(
			new THREE.BoxGeometry(200,100,100),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex6.png")})
		);
		box14.position.set(600,-450,-100);
		box14.name = "lava";

		box15 = new THREE.Mesh(
			new THREE.BoxGeometry(200,100,100),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex6.png")})
		);
		box15.position.set(800,-450,-100);
		box15.name = "lava";

		box16 = new THREE.Mesh(
			new THREE.BoxGeometry(200,100,100),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex6.png")})
		);
		box16.position.set(1000,-450,-100);
		box16.name = "lava";

		box17 = new THREE.Mesh(
			new THREE.BoxGeometry(200,100,100),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex6.png")})
		);
		box17.position.set(1200,-450,-100);
		box17.name = "lava";

		box18 = new THREE.Mesh(
			new THREE.BoxGeometry(200,100,100),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex6.png")})
		);
		box18.position.set(1400,-450,-100);
		box18.name = "lava";

		box19 = new THREE.Mesh(
			new THREE.BoxGeometry(200,100,100),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex6.png")})
		);
		box19.position.set(1600,-450,-100);
		box19.name = "lava";

		box20 = new THREE.Mesh(
			new THREE.BoxGeometry(200,100,100),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex6.png")})
		);
		box20.position.set(-1600,-450,-100);
		box20.name = "lava";

		box21 = new THREE.Mesh(
			new THREE.BoxGeometry(200,100,100),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex6.png")})
		);
		box21.position.set(-1800,-450,-100);
		box21.name = "lava";

		box22 = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex4.png")})
		);
		box22.position.set(-250,-240,-100);
		box22.name = "box";

		box23 = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex4.png")})
		);
		box23.position.set(-200,-240,-100);
		box23.name = "box";

		box24 = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex4.png")})
		);
		box24.position.set(-150,-240,-100);
		box24.name = "box";

		box25 = new THREE.Mesh(
			new THREE.BoxGeometry(100,20,30),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex5.png")})
		);
		box25.position.set(0,-250,-100);
		box25.name = "box";

		box26 = new THREE.Mesh(
			new THREE.BoxGeometry(100,20,30),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex7.png")})
		);
		box26.position.set(700,-300,-100);
		box26.name = "box_7";

		box27 = new THREE.Mesh(
			new THREE.BoxGeometry(100,20,30),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex7.png")})
		);
		box27.position.set(800,-300,-100);
		box27.name = "box_7";

		box28 = new THREE.Mesh(
			new THREE.BoxGeometry(100,20,30),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex7.png")})
		);
		box28.position.set(900,-300,-100);
		box28.name = "box_7";

		box29 = new THREE.Mesh(
			new THREE.BoxGeometry(100,20,30),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex7.png")})
		);
		box29.position.set(1000,-300,-100);
		box29.name = "box_7";

		box30 = new THREE.Mesh(
			new THREE.SphereGeometry(10,10,10),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex6.png")})
		);
		box30.position.set(-850,-300,-100);
		box30.name = "lava";

		box31 = new THREE.Mesh(
			new THREE.SphereGeometry(10,10,10),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex6.png")})
		);
		box31.position.set(-500,-300,-100);
		box31.name = "lava";

		box32 = new THREE.Mesh(
			new THREE.SphereGeometry(10,10,10),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex6.png")})
		);
		box32.position.set(100,-300,-100);
		box32.name = "lava";

		box33 = new THREE.Mesh(
			new THREE.SphereGeometry(10,10,10),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex6.png")})
		);
		box33.position.set(300,-300,-100);
		box33.name = "lava";

		box34 = new THREE.Mesh(
			new THREE.SphereGeometry(10,10,10),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex6.png")})
		);
		box34.position.set(500,-300,-100);
		box34.name = "lava";

		box35 = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex4.png")})
		);
		box35.position.set(920,-10000,-100);
		box35.name = "box";

		box36 = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex4.png")})
		);
		box36.position.set(690,-10000,-100);
		box36.name = "box";
 
 

        entorno.push(box1,box2,box3,box4,box5,box6,box7,box8,box9,box10,
        	         box11,box12,box13,box14,box15,box16,box17,box18,box19,
        	         box20,box21,box22,box23,box24,box25,box26,box27,box28,
        	         box29,box30,box31,box32,box33,box34,box35,box36);
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
		sonidoOP = new Sound(["./sounds/nivel4.mp3"], 100, new THREE.Vector3(0,0,0), 1, {
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
		m1.position.set(-200,-100,-100);

		m2 = new THREE.Mesh(
			new THREE.BoxGeometry(40,45,50),
			new THREE.MeshLambertMaterial( {
				color:0x0000ff,
				transparent: true,
				opacity: 0
				})
		);
		m2.name = "coin2";
		m2.position.set(-250,-100,-100);

		m3 = new THREE.Mesh(
			new THREE.BoxGeometry(40,45,50),
			new THREE.MeshLambertMaterial( {
				color:0Xff00ff,
				transparent: true,
				opacity: 0
				})
		);
		m3.name = "coinb2";
		m3.position.set(200,-130,-100);
		
        m4 = new THREE.Mesh(
			new THREE.BoxGeometry(40,45,50),
			new THREE.MeshLambertMaterial( {
				color:0X00ff00,
				transparent: true,
				opacity: 0
				})
		);
		m4.name = "coinb4";
		m4.position.set(150,-130,-100);

		m5 = new THREE.Mesh(
			new THREE.BoxGeometry(40,45,50),
			new THREE.MeshLambertMaterial( {
				color:0x00ff00,
				transparent: true,
				opacity: 0
				})
		);
		m5.name = "coinb3";
		m5.position.set(250,-130,-100);

		m6 = new THREE.Mesh(
			new THREE.BoxGeometry(40,45,50),
			new THREE.MeshLambertMaterial( {
				color:0xff0000,
				transparent: true,
				opacity: 0
				})
		);
		m6.name = "coinM4";
		m6.position.set(-150,-100,-100);

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
		////////////////////////////////////////////////////////////////////
		balita = new THREE.Mesh(
			new THREE.SphereGeometry(10,10,10),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex6.png")})
		);
		balita.position.set(900,-200,-100);
		balita.name = "lava";

		g1 = new THREE.Mesh(
			new THREE.BoxGeometry(40,40,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				transparent: true,
				opacity: 0
				})
		);
		g1.name = "goomba1";
		g1.position.set(750,-270,-100);

		g2 = new THREE.Mesh(
			new THREE.BoxGeometry(40,40,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				transparent: true,
				opacity: 0
				})
		);
		g2.name = "goomba2";
		g2.position.set(900,-10000,-100);


		hon1 = new THREE.Mesh(
			new THREE.BoxGeometry(40,40,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				transparent: true,
				opacity: 0
				})
		);
		hon1.name = "honguito";
		hon1.position.set(850,150,-100);

		est1 = new THREE.Mesh(
			new THREE.BoxGeometry(40,60,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				transparent: true,
				opacity: 0
				})
		);
		est1.name = "estrellita";
		est1.position.set(850,10000,-100);

		basePirana = new THREE.Mesh(
			new THREE.BoxGeometry(60,60,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				transparent: true,
				opacity: 0
				})
		);
		basePirana.name = "base";
		basePirana.position.set(1010,-10000,-100);

		cabezaMala = new THREE.Mesh(
			new THREE.BoxGeometry(60,60,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				transparent: true,
				opacity: 0
				})
		);
		cabezaMala.name = "malaC";
		cabezaMala.position.set(980,-10000,-100);

		cabezaBuena = new THREE.Mesh(
			new THREE.BoxGeometry(60,60,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				transparent: true,
				opacity: 0
				})
		);
		cabezaBuena.name = "buenaC";
		cabezaBuena.position.set(980,-10000,-100);

		florB = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				transparent: true,
				opacity: 0
				})
		);
		florB.name = "florBuena";
		florB.position.set(920,-10000,-100);


		////// Boss Mario
			boss1 = new THREE.Mesh(
			new THREE.BoxGeometry(50,110,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				transparent: true,
				opacity: 0
				})
		);
		boss1.name = "bossM1";
		boss1.position.set(980,-10000,-100);

		boss2 = new THREE.Mesh(
			new THREE.BoxGeometry(50,110,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				transparent: true,
				opacity: 0
				})
		);
		boss2.name = "bossL1";
		boss2.position.set(980,-10000,-100);

		boss3 = new THREE.Mesh(
			new THREE.BoxGeometry(50,100,50),
     		new THREE.MeshLambertMaterial( {
				color:0xffffff,
				transparent: true,
				opacity: 0
				})
		);
		boss3.name = "bossP1";
		boss3.position.set(980,-10000,-100);

       

		entorno.push(g1,g2,est1,boss1,boss2,boss3,basePirana,cabezaMala,
			         cabezaBuena,hon1,florB,m1,m2,m3,m4,m5,m6);

		//m1,m2,m3,m4,m5,m6
        		///////////////////// Boss /////////////////////////////////////////
		
		//entorno.push(boss1);

		cargarEntorno();

		////////////////////////////////////////////////////////////////////

		//JUGADORES

		 var opP1;
		if($("#modelP1").val() != ""){
			opP1 = 0;
		}else{
			opP1 = 1;
		}

		p1 = new THREE.Mesh(
			new THREE.SphereGeometry(radio,0,0),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				transparent: true,
				opacity: 0
				})
		);
		p1.collidableDistance = radio;
		p1.position.set(-1000,-100,-100);
		//p1.position.set(-1000,-100,-100);
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


      
      JSONLoader('mario','modelos/json/mario/mario.js','modelos/json/mario/',{
			scale:{x:0.8,y:0.8,z:0.8},
			position:{x:0,y:-50,z:-2},
			rotation:{x:0,y:0,z:0}
		});

      JSONLoader('luigi','modelos/json/luigi/luigi.js','modelos/json/luigi/',{
			scale:{x:0.8,y:0.8,z:0.8},
			position:{x:0,y:-50,z:-2},
			rotation:{x:0,y:0,z:0}
		});

      JSONLoader('peach','modelos/json/peach/princesa.js','modelos/json/peach/',{
			scale:{x:5,y:5,z:5},
			position:{x:0,y:-50,z:-2},
			rotation:{x:0,y:0,z:0}
		});

      JSONLoader('goomba_1','modelos/json/Goomba/goomba.js','modelos/json/Goomba/',{
			scale:{x:0.4,y:0.4,z:0.4},
			position:{x:0,y:-20,z:-2},
			rotation:{x:0,y:0,z:0}
		});

      JSONLoader('goomba_2','modelos/json/Goomba/goomba.js','modelos/json/Goomba/',{
			scale:{x:0.4,y:0.4,z:0.4},
			position:{x:0,y:-20,z:-2},
			rotation:{x:0,y:0,z:0}
		});



      JSONLoader('honguitoSexy1','modelos/json/Hongo/hongo.js','modelos/json/Hongo/',{
			scale:{x:0.4,y:0.4,z:0.4},
			position:{x:0,y:-20,z:-2},
			rotation:{x:0,y:0,z:0}
		});

      JSONLoader('estrellasexy','modelos/json/estrella/estrellita.js','modelos/json/estrella/',{
			scale:{x:0.4,y:0.4,z:0.4},
			position:{x:0,y:-30,z:-2},
			rotation:{x:0,y:0,z:0}
		});

      JSONLoader('piranaSexy','modelos/json/pirana/pirana.js','modelos/json/pirana/',{
			scale:{x:2,y:2,z:2},
			position:{x:65,y:-20,z:50},
			rotation:{x:0,y:0,z:0}
		});

      JSONLoader('florSexy','modelos/json/flor_buena/flor.js','modelos/json/flor_buena/',{
			scale:{x:1,y:1,z:1},
			position:{x:10,y:-30,z:-2},
			rotation:{x:0,y:-1*Math.PI/2,z:0}
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
		boss1.add(modelos["mario"]);
		boss2.add(modelos["luigi"]);
		boss3.add(modelos["peach"]);
		g1.add(modelos["goomba_1"]);
		g2.add(modelos["goomba_2"]);
		florB.add(modelos["florSexy"]);
		hon1.add(modelos["honguitoSexy1"]);
		est1.add(modelos["estrellasexy"]);
		basePirana.add(modelos["piranaSexy"]);

		/*b1.add(modelos["bandera"]);
		h1.add(modelos["bomba_1"]);
		h2.add(modelos["bomba_2"]);
		h3.add(modelos["bomba_3"]);
		h4.add(modelos["bomba_4"]);
		h5.add(modelos["bomba_5"]);
		h6.add(modelos["bomba_6"]);
		es1.add(modelos["estrella_1"]);
		es2.add(modelos["estrella_2"]);
		es3.add(modelos["estrella_3"]);*/



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
		renderer.render( scene, camera3);
	}

	function actualizarEscena(){
		controlCamara.update();
		stats.update();
		moverBarra1();
		moverBarra2();
		moverBarra3();
		moverLava1();
		moverLava2();
		moverLava3();
		moverLava4();
		moverEnemigo1();
		moverEnemigo2();
		moverEnemigo3();
		moverEnemigo4();
		moverEnemigo5();
		//moverEnemigo5P();
		//moverEnemigo6();
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


		for (var i = 0; i < enemigos.length; i++) {

			enemigos[i].vy += gravedad;
			if( enemigos[i].inAir ){
				if(enemigos[i].vy>enemigos[i].vf){
					enemigos[i].vy = enemigos[i].vf;
				}
			}

			Colisiones.collideUp(enemigos[i]);
 			Colisiones.collideDown(enemigos[i]);
 			Colisiones.collideLeft(enemigos[i]);
 		 	Colisiones.collideRight(enemigos[i]);
 			Colisiones.collideFront(enemigos[i]);
 			Colisiones.collideBottom(enemigos[i]);		

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
/// moviendo el boss Mario
function moverEnemigo1(){
    
      if(boss1.position.x<=680){

    	enemigoM = 1;
    	boss1.rotation.y = Math.PI/2; 

    }
    if(boss1.position.x>=1000){
    	enemigoM = -1;
    	 boss1.rotation.y = -1 * Math.PI/2; 
    	
    }
    boss1.position.x += 1 * enemigoM;
   

  }

function moverEnemigo4(){
    
      if(boss2.position.x<=680){

    	enemigoL = 1;
    	boss2.rotation.y = Math.PI/2; 

    }
    if(boss2.position.x>=910){
    	enemigoL = -1;
    	 boss2.rotation.y = -1 * Math.PI/2; 
    	
    }
    boss2.position.x += 2 * enemigoL;
   

  }


  function moverEnemigo5(){
    
      if(boss3.position.x<=680){

    	enemigoP = 1;
    	boss3.rotation.y = Math.PI/2; 

    }
    if(boss3.position.x>=920){
    	enemigoP = -1;
    	 boss3.rotation.y = -1 * Math.PI/2; 
    	
    }
    boss3.position.x += 2 * enemigoP;
  }

  function moverEnemigo5P(){
    
      if(boss3.position.y<=-243){

    	enemigoPS = 1;
    	//boss3.rotation.y = Math.PI/2; 

    }
    if(boss3.position.y>=-150){
    	enemigoPS = -1;
    	 //boss3.rotation.y = -1 * Math.PI/2; 
    	
    }
    boss3.position.y += 3 * enemigoPS;
  }
/*function lanzaBala(){
    
      if(balita.position.x==boss1.position.x){

    	bala = 1;
    	//boss1.rotation.y = Math.PI/2; 

    }
    if(balita.position.x>=boss1.position.x){
    	bala = -1;
    	 //boss1.rotation.y = -1 * Math.PI/2; 
    	
    }
    balita.position.x += 1 * bala;
   

  }*/



/*setTimeout(saltaMario, 1000);
setTimeout(saltaMario, 3000);
setTimeout(saltaMario, 5000);
setTimeout(saltaMario, 7000);
setTimeout(saltaMario, 8000);*/

//setTimeout(lanzaBala, 9000);


function moverEnemigo2(){
    
      if(g1.position.x<=680){

    	go1 = 1;

    }
    if(g1.position.x>=1000){
    	go1 = -1;
    	
    }
    g1.position.x += 1 * go1;
  }


  function moverEnemigo3(){
    
      if(g2.position.x<=680){

    	go2 = 1;

    }
    if(g2.position.x>=1000){
    	go2 = -1;
    	
    }
    g2.position.x += 1 * go2;
  }


 
//////////////////////////////////////////////////////////////////////////////
  function moverBarra1(){
    
      if(box2.position.x<=-820){

    	laB = 1;

    }
    if(box2.position.x>=-720){
    	laB = -1;
    	
    }
    box2.position.x += 1 * laB;
  }

   function moverBarra2(){
    
      if(box3.position.x<=-550){

    	laB2 = 1;

    }
    if(box3.position.x>=-400){
    	laB2 = -1;
    	
    }
    box3.position.x += 1 * laB2;
  }


  function moverBarra3(){
    
      if(box25.position.x<=0){

    	laB3 = 1;

    }
    if(box25.position.x>=500){
    	laB3 = -1;
    	
    }
    box25.position.x += 0.7 * laB3;
  }

  function moverLava1(){
    
      if(box30.position.y<=-450){

    	laB4 = 1;

    }
    if(box30.position.y>=-180 ){
    	laB4 = -1;
    	
    }
    box30.position.y += 3.5 * laB4;

  }

  function moverLava2(){
    
      if(box31.position.y<=-430 && box33.position.y<=-430){

    	laB5 = 1;

    }
    if(box31.position.y>=-200 && box33.position.y<=-200){
    	laB5 = -1;
    	
    }
    box31.position.y += 2 * laB5;
    box33.position.y += 2 * laB5;
  }

  function moverLava3(){
    
      if(box32.position.y<=-430){

    	laB6 = 1;

    }
    if(box32.position.y>=-180){
    	laB6 = -1;
    	
    }
    box32.position.y += 3.5 * laB6;
   
  }

  function moverLava4(){
    
      if(box34.position.y<=-470){

    	laB7 = 1;

    }
    if(box34.position.y>=-210){
    	laB7 = -1;
    	
    }
    box34.position.y += 3.5 * laB7;
   
  }


