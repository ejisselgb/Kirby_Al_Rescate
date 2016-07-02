var Sound = function(sources, radius, position, volume, aditionalParams){

	var ap = aditionalParams instanceof Object;
	var audio = document.createElement("audio");

	for (var i = 0; i < sources.length; i++) {
		var source = document.createElement("source");
		source.src = sources[i];
		audio.appendChild( source );
	};

	document.body.appendChild(audio);
	this.position = position; // THREE.Vector3

	if(ap){
		if("debug" in aditionalParams){
			if(aditionalParams.debug){
				var mesh = new THREE.Mesh(
						new THREE.SphereGeometry(2,10,10),
						new THREE.MeshBasicMaterial({
							color: 0xFFFFFF,
							wireframe: true
						})
					);
				var actionArea = new THREE.Mesh(
						new THREE.SphereGeometry(radius,10,10),
						new THREE.MeshBasicMaterial({
							color: 0xFFFFFF,
							wireframe: true,
							transparent: true,
							opacity: 0.1
						})
					);
				this.mesh = mesh;
				this.mesh.add(actionArea);
				this.mesh.position.set(this.position.x,this.position.y,this.position.z);
			}
			if("scene" in aditionalParams){
				aditionalParams.scene.add(this.mesh);
			}
		}
	}

	this.play = function(){
		audio.play();
	}

	this.parar = function(){
		audio.pause();
	}

	this.update = function(element){
		var distance = this.position.distanceTo( element.position );
		if( distance <= radius ){
			audio.volume = volume * ( 1 - distance / radius );
		}else{
			audio.volume = 0 ;
		}
	}

}