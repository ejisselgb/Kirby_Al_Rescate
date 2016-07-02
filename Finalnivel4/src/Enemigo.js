//Clase jugador
var JugadorE = function(nombre,obj){

	this.id = null;
	this.name = nombre;
	this.jumping = false;
	this.inAir = true;
	this.falling = false;
	this.vy = 0;
	this.vx = 3;
	this.vf = 10;

	this.obj = obj;

	/*this.getName = function(){
		return this.name;
	}
	this.setName = function(name){
		his.name = name;
	}

	this.vidas = {
		scope: this,
		value: 0,
		set: function(vidas){
			this.value = vidas;
			this.render();
		},
		get: function(){
			return this.value;
		},
		die: function(){
			if( (this.value - 1) <= 0 ){
				alert("Game Over, no sabes que es un chokis");
				webGLStart();
			}else{	
				this.value --;
			}
			this.render();
		},
		lifeUp: function(){
			this.value++;
			this.render();
		},
		render:function(){
			$("#vidasPlayer"+this.scope.id).html("V: "+this.value);
		}
	};

	this.puntos = {
		scope: this,
		value: 0,
		set : function(p){
			this.value = p;
			this.render();
		},
		get : function(){
			return this.value;
		},
		tomaTuTeterito : function(teterito){
			if( (this.value + teterito) <= 0 ){
				this.value = 0;
			}else{
				if(this.value + teterito >= 100){
					this.scope.vidas.lifeUp();
					this.value = 0;
				}else{
					this.value += teterito;
				}
				
			}
			this.render();
		},
		render: function(){
			$("#puntosPlayer"+this.scope.id).html("P: "+this.value);
		}
	};*/

	this.addMe = function(array){
		array.push(this);
		var id = array.length;
		this.id = id;

		/*var lifes = "vidasPlayer"+id;
		var points = "puntosPlayer"+id;

		var span = document.createElement("span");
		span.style.margin = "0 20px 0 0";
		span.innerHTML = this.getName()+" ";

		var lSpan = document.createElement("span");
		lSpan.style.margin = "0 5px 0 0";
		lSpan.id = lifes;
		lSpan.innerHTML = "V: "+this.vidas.get();

		var pSpan = document.createElement("span");
		pSpan.style.margin = "0 5px 0 0";
		pSpan.id = points;
		pSpan.innerHTML = "P: "+this.puntos.get();

		span.appendChild(lSpan);
		span.appendChild(pSpan);

		$("#MyGUI").append(span);

		this.vidas.set(1);
		this.puntos.set(0);*/
		scene.add(this.obj);
	}
	//cada nuevo jugador serà agregado al arreglo de jugadores
	this.addMe(enemigos);


	this.saludar = function(){
		alert("Mi nombre es: "+this.name);
	}

	this.jump = function(){
	    if(this.jumping == false && this.inAir == false){
	        this.obj.position.y += this.vf;
	        this.vy = -8;
	        this.jumping = true;
	    }
	}

	this.position = function(x,y,z){
		this.obj.position.set(x,y,z);
	}

	this.move = function(eje,cantidad){
		this.obj.position[eje] += cantidad;
	}

}