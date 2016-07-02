function loadObjMtl(nombre,modelo,material,aditionalParams){

		cargador.addObj();

		var ap = aditionalParams instanceof Object;

		var onProgress = function ( xhr ) {
			if ( xhr.lengthComputable ) {
				var percentComplete = xhr.loaded / xhr.total * 100;
				//console.log( Math.round(percentComplete, 2) + '% downloaded' );
			}
		};

		var onError = function ( xhr ) {
		};

		if(ap){
			if("dds" in aditionalParams){
				if(aditionalParams.dds){
					THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
				}
			}
			
		}

		var loader = new THREE.OBJMTLLoader();
		loader.load( modelo, material, function ( object ) {

			modelos[nombre] = object;
			if(ap){
				if("position" in aditionalParams){
					console.log("position:");
					console.log(aditionalParams.position);
					modelos[nombre].position.copy(aditionalParams.position);
				}
			}
			
			console.log(object);
			cargador.objReady();

		}, onProgress, onError );

}

function JSONLoader(nombre,json,textureDir,aditionalParams){

		cargador.addObj();

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

            console.log(modelos[nombre]);
			cargador.objReady();

        }, textureDir);
}
