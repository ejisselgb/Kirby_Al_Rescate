var scene,camera,renderer;
var ultiTiempo;
var labels = [];
var objetos = [];
var appW = window.innerWidth; //* 0.75;
var appH = window.innerHeight;
var controlCamara;
var modelos = {};

function webGLStart(){
	iniciarEscena();
	$( window ).resize(resizeApp);
	ultiTiempo = Date.now();
	animarEscena();
}

function iniciarEscena(){
	
	var canvas = document.getElementById("app");
	/*
	{
		nombre: "Pablo",
		apellido: "Bejarano",
		edad: 23
	}
	*/
	renderer = new THREE.WebGLRenderer({canvas:canvas});
	renderer.setSize(appW,appH);
	renderer.setClearColor(0x81BEF7,1);// 0xRRGGBB,opacidad

	camera = new THREE.PerspectiveCamera(45, appW/appH , 1, 500);
	camera.position.set(50,40,50);
	camera.lookAt(new THREE.Vector3(0,0,0));

	scene = new THREE.Scene();

	//Controles de la camara
	controlCamara = new THREE.OrbitControls( camera, renderer.domElement);

	var geometria = new THREE.BoxGeometry(10,10,10,2,2,2);
	var material = new THREE.MeshBasicMaterial({color:0xff0000,wireframe:true});
	cubito = new THREE.Mesh(geometria,material);
	cubito.position.y = 6;
	//scene.add(cubito);

	/*

			LUCES

		*/
		lAmbiente = new THREE.AmbientLight( 0x404040 );

		var color = 0xFFFFFF;
		var intensidad = 5;
		var distancia = 600;

		lPuntual = new THREE.PointLight( color , intensidad, distancia );
		lPuntual.position.set(0,400,60);

		lSpotlight = new THREE.SpotLight( 0xffffff, 1, 4000, 30, 0.1);
		lSpotlight.position.set(0,600,0);
		lSpotlight.castShadow = true;


		scene.add(lAmbiente,lPuntual,lSpotlight);	

		JSONLoader('modeloP1',"../../modelos/json/Kirby_peach/kirby.js","../../modelos/json/Kirby_peach/",{
				scale:{x:0.7,y:0.7,z:0.7},
				position:{x:0,y:-20,z:-20}
			});


}
function animarEscena(){
	requestAnimationFrame( animarEscena );
	renderEscena();
	actualizarEscena();
}
function renderEscena(){
	renderer.render( scene, camera );
}
function actualizarEscena(){
	controlCamara.update();

    old_x = camera.position.x;
	camera.position.x =  camera.position.x * Math.cos( Math.PI/700) - camera.position.y * Math.sin( Math.PI/700 );         
	camera.position.y = old_x * Math.sin( Math.PI/700 ) + camera.position.y * Math.cos( Math.PI/700 );
	camera.lookAt( cubito.position );

}

function JSONLoader(nombre,json,textureDir,aditionalParams){


		var ap = aditionalParams instanceof Object;

		var loader = new THREE.JSONLoader();
        loader.load(json, function (geometry, mat) {

        	modelos[nombre] = new THREE.Mesh(geometry, mat[0]);
			if(ap){
				if("position" in aditionalParams){
					console.log("position:");
					console.log(aditionalParams.position);
					modelos[nombre].position.copy(aditionalParams.position);
				}
				if("scale" in aditionalParams){
					modelos[nombre].scale.x = aditionalParams.scale.x;
					modelos[nombre].scale.y = aditionalParams.scale.y;
					modelos[nombre].scale.z = aditionalParams.scale.z;
				}
				if("rotation" in aditionalParams){
					modelos[nombre].rotation.x = aditionalParams.rotation.x;
					modelos[nombre].rotation.y = aditionalParams.rotation.y;
					modelos[nombre].rotation.z = aditionalParams.rotation.z;
				}
			}
			modelos[nombre].rotation.y = Math.PI/2;
			scene.add(modelos[nombre]);

        }, textureDir);
}