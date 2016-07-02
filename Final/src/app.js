//Game Base
var scene,camaras = [], modelos = {}, camaraActiva = null,renderer, jugadores = [];
var entorno = [];
var appW = window.innerWidth; 
var appH = window.innerHeight;
var vxEnemigos = 3;
var murito = 300;
var laFlag = 1;
var laFlag2 = 1;
var laFlag3 = 1;
var laFlag4 = 1;



var cx = -500;
var cy = -80;
var cz = 1000;

var url = "./../Finalnivel2/index.php";



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
					map: THREE.ImageUtils.loadTexture("textures/fondo1.png")
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
					map: THREE.ImageUtils.loadTexture("textures/fondo1_1.png")
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
					map: THREE.ImageUtils.loadTexture("textures/fondo1_2.png")
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
			new THREE.BoxGeometry(100,200,100),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex1.png")})
		);
		box.position.set(-730,-430,-100);
		box.name = "box";

		box3 = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/brick.png")})
		);
		box3.position.set(-730,-200,-100);
		box3.name = "box_flor";

		box4 = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex1.png")})
		);
		box4.position.set(-580,-270,-100);
		box4.name = "box";

		box5 = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex1.png")})
		);
		box5.position.set(-450,-240,-100);
		box5.name = "box";

		box6 = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex1.png")})
		);
		box6.position.set(-340,-180,-100);
		box6.name = "box";

		box7 = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex1.png")})
		);
		box7.position.set(-220,-200,-100);
		box7.name = "box";

		box8 = new THREE.Mesh(
			new THREE.BoxGeometry(100,15,30),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex2.png")})
		);
		box8.position.set(-100,-200,-100);
		box8.name = "box";

		box9 = new THREE.Mesh(
			new THREE.BoxGeometry(100,15,30),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex2.png")})
		);
		box9.position.set(100,-200,-100);
		box9.name = "box";

		box10 = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex1.png")})
		);
		box10.position.set(250,-140,-100);
		box10.name = "box";

		box11 = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex1.png")})
		);
		box11.position.set(380,-180,-100);
		box11.name = "box";

		box12 = new THREE.Mesh(
			new THREE.BoxGeometry(100,15,30),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex2.png")})
		);
		box12.position.set(510,-200,-100);
		box12.name = "box";

		box13 = new THREE.Mesh(
			new THREE.BoxGeometry(100,200,100),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex1.png")})
		);
		box13.position.set(720,-400,-100);
		box13.name = "box";

		box14 = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex1.png")})
		);
		box14.position.set(880,-300,-100);
		box14.name = "box";

		box15 = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex1.png")})
		);
		box15.position.set(930,-300,-100);
		box15.name = "box_caida";

		box16 = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex1.png")})
		);
		box16.position.set(980,-300,-100);
		box16.name = "box";

		box17 = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex1.png")})
		);
		box17.position.set(1030,-300,-100);
		box17.name = "box";


		box19 = new THREE.Mesh(
			new THREE.BoxGeometry(100,15,30),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex2.png")})
		);
		box19.position.set(1190,-300,-100);
		box19.name = "box";

		box20 = new THREE.Mesh(
			new THREE.BoxGeometry(100,200,100),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex1.png")})
		);
		box20.position.set(1380,-400,-100);
		box20.name = "box";
        
        box21 = new THREE.Mesh(
			new THREE.BoxGeometry(120,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex3.png")})
		);
		box21.position.set(1572,-280,-100);
		box21.name = "box";
		
		box22 = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/coinBox.png")})
		);
		box22.position.set(0,-40,-100);
		box22.name = "boxCoin";

		box23 = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/brick.png")})
		);
		box23.position.set(980,-150,-100);
		box23.name = "box_mala";

		box24 = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/brick.png")})
		);
		box24.position.set(1030,-150,-100);
		box24.name = "box_flor2";

		box25 = new THREE.Mesh(
			new THREE.BoxGeometry(50,50,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				side: THREE.DoubleSide,
				map:THREE.ImageUtils.loadTexture("textures/tex1.png")})
		);
		box25.position.set(1200,-190,-100);
		box25.name = "box_flor3";


		box26 = new THREE.Mesh(
              new THREE.BoxGeometry(50,50,50),
              new THREE.MeshLambertMaterial( {
              color:0xffffff,
              side: THREE.DoubleSide,
              map:THREE.ImageUtils.loadTexture("textures/brick.png")})
               );
             box26.position.set(0,-12000,-100);

        entorno.push(box,box2,box3,box4,box5,box6,box7,box8,box9,box10,
        	         box11,box12,box13,box14,box15,box16,box17,box19, 
        	         box20,box21,box22,box23,box24,box25,box26);
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
		sonidoOP = new Sound(["./sounds/nivel1.mp3"], 100, new THREE.Vector3(0,0,0), 1, {
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
		m1.position.set(-580,-100,-100);

		m2 = new THREE.Mesh(
			new THREE.BoxGeometry(40,45,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				transparent: true,
				opacity: 0
				})
		);
		m2.name = "coin2";
		m2.position.set(-450,-70,-100);

		m3 = new THREE.Mesh(
			new THREE.BoxGeometry(40,45,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				transparent: true,
				opacity: 0
				})
		);
		m3.name = "coinb2";
		m3.position.set(-340,-30,-100);
		
        m4 = new THREE.Mesh(
			new THREE.BoxGeometry(40,45,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				transparent: true,
				opacity: 0
				})
		);
		m4.name = "coin3";
		m4.position.set(-220,-50,-100);

		m5 = new THREE.Mesh(
			new THREE.BoxGeometry(40,45,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				transparent: true,
				opacity: 0
				})
		);
		m5.name = "coinb3";
		m5.position.set(700,-265,-100);

		m6 = new THREE.Mesh(
			new THREE.BoxGeometry(40,45,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				transparent: true,
				opacity: 0
				})
		);
		m6.name = "coin4";
		m6.position.set(745,-265,-100);


		f1 = new THREE.Mesh(
			new THREE.BoxGeometry(65,55,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				transparent: true,
				opacity: 0
				})
		);
		f1.name = "flor1";
		f1.position.set(-730,-10000,-100);

		f2 = new THREE.Mesh(
			new THREE.BoxGeometry(65,55,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				transparent: true,
				opacity: 0
				})
		);
		f2.name = "flor2";
		f2.position.set(1030,-10000,-100);


		f3 = new THREE.Mesh(
			new THREE.BoxGeometry(65,55,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				transparent: true,
				opacity: 0
				})
		);
		f3.name = "flor3";
		f3.position.set(1200,-10000,-100);

	

		g1 = new THREE.Mesh(
			new THREE.BoxGeometry(40,40,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				transparent: true,
				opacity: 0
				})
		);
		g1.name = "goomba1";
		g1.position.set(65,-173,-100);

		g2 = new THREE.Mesh(
			new THREE.BoxGeometry(40,40,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				transparent: true,
				opacity: 0
				})
		);
		g2.name = "goomba2";
		g2.position.set(-70,-173,-100);

		g3 = new THREE.Mesh(
			new THREE.BoxGeometry(40,40,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				transparent: true,
				opacity: 0
				})
		);
		g3.name = "goomba3";
		g3.position.set(470,-173,-100);

		g4 = new THREE.Mesh(
			new THREE.BoxGeometry(40,40,50),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				transparent: true,
				opacity: 0
				})
		);
		g4.name = "goomba4";
		g4.position.set(1150,-272,-100);

		b1 = new THREE.Mesh(
			new THREE.BoxGeometry(10,70,10),
			new THREE.MeshLambertMaterial( {
				color:0xffffff,
				transparent: true,
				opacity: 0
				})
		);
		b1.name = "banderita";
		b1.position.set(1610,-238,-100);

        entorno.push(m1,m2,m3,m4,m5,m6,f1,f2,f3,g1,g2,g3,g4,b1,f2);

	
		cargarEntorno();

		////////////////////////////////////////////////////////////////////+

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
				position:{x:0,y:-25,z:0}
			});
		}	

     ////////////////////////////////////////////////////////////////////////////////
     /////////////////// Modelos /////////////////////////////////////////////////
		/*JSONLoader('Kirby','modelos/json/kirby/kirby2.js','modelos/json/kirby/',{
			scale:{x:20,y:20,z:20},
			position:{x:0,y:0,z:-15},
			rotation:{x:0,y:Math.PI/2,z:0}
		});*/

	

	/*JSONLoader('pirana','modelos/json/pirana/pirana_js.js','modelos/json/pirana/',{
			scale:{x:1,y:1,z:1},
			position:{x:-122,y:-122,z:-130},
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


      /*JSONLoader('estrella','modelos/ json/estrella/estrellita.js','modelos/json/estrella/',{
			scale:{x:1,y:1,z:1},
			position:{x:0,y:-80,z:-2},
			rotation:{x:0,y:0,z:0}
		});*/

      JSONLoader('florB','modelos/json/flor_buena/flor.js','modelos/json/flor_buena/',{
			scale:{x:1,y:1,z:1},
			position:{x:1,y:-25,z:-2},
			rotation:{x:0,y:-1*Math.PI/2,z:0}
		});

      JSONLoader('florB2','modelos/json/flor_buena/flor.js','modelos/json/flor_buena/',{
			scale:{x:1,y:1,z:1},
			position:{x:1,y:-25,z:-2},
			rotation:{x:0,y:-1*Math.PI/2,z:0}
		});

      JSONLoader('florB3','modelos/json/flor_buena/flor.js','modelos/json/flor_buena/',{
			scale:{x:1,y:1,z:1},
			position:{x:1,y:-25,z:-2},
			rotation:{x:0,y:-1*Math.PI/2,z:0}
		});


      JSONLoader('goomba_1','modelos/json/Goomba/goomba.js','modelos/json/Goomba/',{
			scale:{x:0.4,y:0.4,z:0.4},
			position:{x:1,y:-20,z:-2},
			rotation:{x:0,y:0,z:0}
		});

      JSONLoader('goomba_2','modelos/json/Goomba/goomba.js','modelos/json/Goomba/',{
			scale:{x:0.4,y:0.4,z:0.4},
			position:{x:1,y:-20,z:-2},
			rotation:{x:0,y:0,z:0}
		});

      JSONLoader('goomba_3','modelos/json/Goomba/goomba.js','modelos/json/Goomba/',{
			scale:{x:0.4,y:0.4,z:0.4},
			position:{x:1,y:-20,z:-2},
			rotation:{x:0,y:0,z:0}
		});


      JSONLoader('goomba_4','modelos/json/Goomba/goomba.js','modelos/json/Goomba/',{
			scale:{x:0.4,y:0.4,z:0.4},
			position:{x:1,y:-20,z:-2},
			rotation:{x:0,y:0,z:0}
		});

      JSONLoader('bandera','modelos/json/Bandera/bandera_js.js','modelos/json/Bandera/',{
			scale:{x:2,y:2,z:2},
			position:{x:0,y:-20,z:-2},
			rotation:{x:0,y:Math.PI/2,z:0}
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
		f1.add(modelos["florB"]);
		f2.add(modelos["florB2"]);
		f3.add(modelos["florB3"]);
		g1.add(modelos["goomba_1"]);
		g2.add(modelos["goomba_2"]);
		g3.add(modelos["goomba_3"]);
		g4.add(modelos["goomba_4"]);
		b1.add(modelos["bandera"]);



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
		moverEnemigo();
		moverEnemigo2();
		moverEnemigo3();
		moverEnemigo4();
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


  function moverEnemigo(){
    
      if(g1.position.x<=60){

    	laFlag = 1;

    }
    if(g1.position.x>=135){
    	laFlag = -1;
    	
    }
    g1.position.x += 0.6 * laFlag;
  }

  function moverEnemigo2(){
    
      if(g2.position.x<=-140){

    	laFlag2 = 1;

    }
    if(g2.position.x>=-60){
    	laFlag2 = -1;
    	
    }
    g2.position.x += 0.6 * laFlag2;
  }


  function moverEnemigo3(){
    
      if(g3.position.x<=470){

    	laFlag3 = 1;

    }
    if(g3.position.x>=550){
    	laFlag3 = -1;
    	
    }
    g3.position.x += 0.7 * laFlag3;
  }

  function moverEnemigo4(){
    
      if(g4.position.x<=1150){

    	laFlag4 = 1;

    }
    if(g4.position.x>=1230){
    	laFlag4 = -1;
    	
    }
    g4.position.x += 0.7 * laFlag4;
  }



	