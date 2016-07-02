var contador = 0;
var contadorFlorBuena1 = 0;
var contadorFlorBuena2 = 0;
var contadorFlorBuena3 = 0;
var totalContadorFlores = 0;
var cSacaPoderes = 0;
var contadorGoombas = 0;
var contadorBossM = 0;
var contadorBossL = 0;
var contadorBossP = 0;



var Colisiones = function(){};

  Colisiones.collideUp = function(player){

      var rayUp = new THREE.Raycaster();
      rayUp.ray.direction.set( 0, 1, 0 );

      var obj = player.obj;
      var origen = obj.position.clone();
      rayUp.ray.origin.copy( origen );

      var intersecciones = rayUp.intersectObjects( collidableMeshList );

      if( intersecciones.length > 0 ){
        var distancia = intersecciones[0].distance;
        // si me pegué
        if( distancia <= obj.collidableDistance){
          if(player.falling == false && distancia > 0 && distancia <= obj.collidableDistance){

            if(intersecciones[ 0 ].object.name == "save" && salvando == false){
              salvando = true;
              $.ajax({
                url:"./php_scripts/actualizarPuntos.php",
                method:"POST",
                data:{vidas: player.vidas.get(), puntos: player.puntos.get(), player: player.getName()}
              }).done(function(r){
                console.log(r);
                salvando = false;
              });

            }

            if(intersecciones[ 0 ].object.name == "coin2"){
            player.position(-1000,-180,-100);
            m2.position.set(0,-10000,0);
            sonidoOP.parar();
            perderVida.play();
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }
          
          }

          if(intersecciones[ 0 ].object.name == "coinM4"){
            player.position(-1000,-180,-100);
            m6.position.set(0,-10000,0);
            sonidoOP.parar();
            perderVida.play();
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }
          
          }


          if(intersecciones[ 0 ].object.name == "coinb4"){
            m4.position.set(65,-10000,-100);
             monedaSong.play();
  
          }

            if(intersecciones[ 0 ].object.name == "sacaEstrella1"){

              contadorFlorBuena1 += 1;
              roca.play();


              if(contadorFlorBuena1 == 1){
                es1.position.set(-70,60,-100);
             
              }

            
          }

          if(intersecciones[ 0 ].object.name == "sacaEstrella2"){

              contadorFlorBuena2 += 1;
              roca.play();

              if(contadorFlorBuena2 == 1){
                es2.position.set(490,-70,-100);
                
              }

            
          }

          if(intersecciones[ 0 ].object.name == "sacaEstrella3"){

              contadorFlorBuena3 += 1;
              roca.play();

              if(contadorFlorBuena3 == 1){
                es3.position.set(750,-60,-100);
              }

            
          }

          if(intersecciones[ 0 ].object.name == "sacaPoderes"){

              cSacaPoderes += 1;
              roca.play();


              if(cSacaPoderes == 1){
                m1.position.set(250,-180,-100);
                m2.position.set(320,-170,-100);
                m3.position.set(390,-180,-100);
                m4.position.set(1000,-150,-100);
                m5.position.set(1080,-150,-100);
                m6.position.set(1160,-150,-100);
                h1.position.set(box4.position.x,-248,-100);
                h2.position.set(1300,-200,-100);
                h3.position.set(box6.position.x,-248,-100);
                h4.position.set(box11.position.x,-248,-100);
                h5.position.set(850,-275,-100);
                h6.position.set(400,-275,-100);
                box24.position.set(490,-130,-100);
                box25.position.set(750,-120,-100);

              }

              
          }

      

         // { x: 992, y: -253.6999999999974, z: -100 }
          
          if(intersecciones[ 0 ].object.name == "coinb1"){
               // player.puntos.tomaTuTeterito(10);
               // puntos.play();

                
            m1.position.set(0,-10000,0);
            monedaSong.play();
                        
          }

          if(intersecciones[ 0 ].object.name == "coinb2"){
               // player.puntos.tomaTuTeterito(10);
               // puntos.play();

                
            m3.position.set(340,-10000,0);
            monedaSong.play();
                       
          }
          if(intersecciones[ 0 ].object.name == "coinb3"){
            //player.position(-1000,-180,-100);
            m5.position.set(-10,-10000,0);
            monedaSong.play();
          }

          if(intersecciones[ 0 ].object.name == "boxCoin"){
               // player.puntos.tomaTuTeterito(10);
               // puntos.play();
              contador += 1;
              console.log(contador);
              monedaSong.play();

            if(contador == 3){

              box22.position.set(50,-15000,-100);

              console.log("Entre al fucking ciclo");

              boxl = new THREE.Mesh(
              new THREE.BoxGeometry(50,50,50),
              new THREE.MeshLambertMaterial( {
              color:0xffffff,
              side: THREE.DoubleSide,
              map:THREE.ImageUtils.loadTexture("textures/brick.png")})
               );
             boxl.position.set(0,-40,-100);
             scene.add(boxl);

            }

                        
          }


            player.vy = 0;
            player.falling = true;
          }
        }
      }


     
    };
    Colisiones.collideDown = function(player,enemigo){

      var rayDown = new THREE.Raycaster();
      rayDown.ray.direction.set( 0, -1, 0 );

      var obj = player.obj;
      var origen = obj.position.clone();
      rayDown.ray.origin.copy( origen );

      var intersecciones = rayDown.intersectObjects( collidableMeshList );

      if( intersecciones.length > 0 ){
        var distancia = intersecciones[0].distance;
        if(distancia > 0 && distancia > obj.collidableDistance){
          obj.position.y -= player.vy;
          player.inAir = true;
        }else{

          
      /*    if(intersecciones[ 0 ].object.name == "quitaVida"){
             player.puntos.tomaTuTeterito(-5);   
             player.position(250,obj.collidableDistance,7100);
             player.vidas.die();
             perder.play();
             sonidoOP.parar();
            alert("¡Ups!, perdiste una vida y algo de puntos");
          }
          
          if(intersecciones[ 0 ].object.name == "adelante"){
                player.puntos.tomaTuTeterito(10);
                puntos.play();

                
            player.position(0,80,6100);
                        
          }

           if(intersecciones[ 0 ].object.name == "adelante2"){
                player.puntos.tomaTuTeterito(10);
                puntos.play();   
                
            player.position(-340,80,5000);
                        
          }

      
            if(intersecciones[ 0 ].object.name == "meta" ){
              sonidoOP.parar();
              player.position(250,obj.collidableDistance,7100);
              ganar.play();
              alert("Haz ganado!!!... Escogiste el futuro de Eugenio");
              window.location="http://localhost/Compu_grafica/Compu_grafica/interfaces/proyecto%20compu%20taller2/";
              $.ajax({
                url:"./php_scripts/actualizarPuntos.php",
                method:"POST",
                data:{vidas: player.vidas.get(), puntos: player.puntos.get(), player: player.getName()}
              }).done(function(r){
                console.log(r);
              });

            }*/
        
            


          if(intersecciones[ 0 ].object.name == "vacio"){
            
            player.position(-1000,-180,-100);
            //player.vidas.die();
            //player.puntos.tomaTuTeterito(-5);
            sonidoOP.parar();
            perderVida.play();
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }

          }

          if(intersecciones[ 0 ].object.name == "coinM4"){
            player.position(-1000,-180,-100);
            m6.position.set(700,-10000,0);
            sonidoOP.parar();
            perderVida.play();
            alert("choque con esa puta moneda");
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }
          }

          if(intersecciones[ 0 ].object.name == "lava"){
            
            player.position(-1000,-180,-100);
            //player.vidas.die();
            //player.puntos.tomaTuTeterito(-5);
            sonidoOP.parar();
            perderVida.play();
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }

          }



          if(intersecciones[ 0 ].object.name == "estrellita"){
            est1.position.set(850,10000,-100);
            cabezaMala.position.set(980,-10000,-100);
            cabezaBuena.position.set(980,-200,-100);
            box35.position.set(920,-90,-100);
            florB.position.set(920,-30,-100);
            atrapar.play();

          }

          if(intersecciones[ 0 ].object.name == "florBuena"){
            est1.position.set(850,10000,-100);
            cabezaMala.position.set(980,-10000,-100);
            cabezaBuena.position.set(980,-200,-100);
            box35.position.set(920,-90,-100);
            florB.position.set(920,-10000,-100);
            atrapar.play();

          }


          if(intersecciones[ 0 ].object.name == "malaC"){
            player.position(-1000,-180,-100);
            sonidoOP.parar();
            perderVida.play();
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }
          }


          
          if(intersecciones[ 0 ].object.name == "goomba1"){
               // player.puntos.tomaTuTeterito(10);
               // puntos.play();
              g2.position.set(680,-270,-100);
              g1.position.set(680,-10000,-100);
              estripar.play();
              contadorGoombas += 1;
              console.log(contadorGoombas); 
              if(contadorGoombas == 5){
                g2.position.set(900,-10000,-100);
                g1.position.set(750,-10000,-100);
                boss1.position.set(850,-243,-100);
                hon1.position.set(680,-260,-100);


                console.log("si señor falta mario muajaja");
              } 
                  
          }

          if(intersecciones[ 0 ].object.name == "goomba2"){
               // player.puntos.tomaTuTeterito(10);
               // puntos.play();
              g1.position.set(950,-270,-100);
              g2.position.set(680,-10000,-100);
              estripar.play();
              contadorGoombas += 1;
              console.log(contadorGoombas);                   
          }

          if(intersecciones[ 0 ].object.name == "bomba2"){
               // player.puntos.tomaTuTeterito(10);
               // puntos.play();

              h2.position.set(1300,-10000,-100);
              estripar.play();
                        
          }

          if(intersecciones[ 0 ].object.name == "honguito"){
               // player.puntos.tomaTuTeterito(10);
               // puntos.play();

              hon1.position.set(850,-10000,-100);
              box35.position.set(600,-250,-100);
              box36.position.set(690,-150,-100);
              atrapar.play();
             
          }

            if(intersecciones[ 0 ].object.name == "bossP1"){
              contadorBossP += 1;
              estripar.play();

                if(contadorBossM == 1){
               boss3.position.set(900,-243,-100);
               console.log("entre a uno");
              }

              if(contadorBossM == 2){
                //g2.position.set(680,-270,-100);
                //g1.position.set(1000,-270,-100);
                boss3.position.set(680,-243,-100);
                console.log("entre a dos");
              }

              if(contadorBossM == 3){
                 boss3.position.set(700,-243,-100);
                console.log("entre a tres");

              }

              if(contadorBossM == 4){
                 boss3.position.set(800,-243,-100);
                console.log("entre a cuatro");

              }

              if(contadorBossM == 5){
                 boss3.position.set(800,-10000,-100);
                 ganar.play();
                  sonidoOP.parar();
               $.ajax({
                url:"./php_scripts/actualizarPuntos.php",
                method:"POST",
                data:{vidas: player.vidas.get(), puntos: player.puntos.get(), player: player.getName()}
              }).done(function(r){
                console.log(r);
              });



               level += 1;
               console.log(level);
              if(level == 2){
                  
                setTimeout(pasarNivel, 7000);
              }

              }

          }


          if(intersecciones[ 0 ].object.name == "bossM1"){
               // player.puntos.tomaTuTeterito(10);
               // puntos.play();

              contadorBossM += 1;
              estripar.play();

              if(contadorBossM == 1){
               boss1.position.set(900,-243,-100);
               console.log("entre a uno");
              }

              if(contadorBossM == 2){
                //g2.position.set(680,-270,-100);
                //g1.position.set(1000,-270,-100);
                boss1.position.set(680,-243,-100);
                    console.log("entre a dos");
              }

              if(contadorBossM == 3){
                 boss1.position.set(980,-10000,-100);
                 boss2.position.set(980,-235,-100);
                 box35.position.set(600,-10000,-100);
                 box36.position.set(690,-10000,-100);
                 basePirana.position.set(1010,-265,-100);
                 cabezaMala.position.set(980,-200,-100);

                 estripar.play();
                 console.log("entre a tres");

              }

             
                        
          }


          if(intersecciones[ 0 ].object.name == "bossL1"){
               // player.puntos.tomaTuTeterito(10);
               // puntos.play();

              contadorBossL += 1;

              if(contadorBossL == 1){
               boss2.position.set(680,-243,-100);
                 
               estripar.play();
               console.log("entre a uno");
              }

              if(contadorBossL == 2){
                //g2.position.set(680,-270,-100);
                //g1.position.set(1000,-270,-100);
                boss2.position.set(800,-243,-100);
                est1.position.set(900,-230,-100);
                estripar.play();
                    console.log("entre a dos");
              }

              if(contadorBossL == 3){
                 boss2.position.set(980,-10000,-100);
                 boss3.position.set(980,-243,-100);
                 estripar.play();
                 console.log("entre a tres");

              }

             
                        
          }

          if(intersecciones[ 0 ].object.name == "bomba3"){
               // player.puntos.tomaTuTeterito(10);
               // puntos.play();

              h3.position.set(-15,-10000,-100);
              estripar.play();
                        
          }

          if(intersecciones[ 0 ].object.name == "bomba4"){
               // player.puntos.tomaTuTeterito(10);
               // puntos.play();

              h4.position.set(1000,-10000,-100);
              estripar.play();
                        
          }

          if(intersecciones[ 0 ].object.name == "bomba5"){
               // player.puntos.tomaTuTeterito(10);
               // puntos.play();

              h5.position.set(850,-10000,-100);
              estripar.play();
                        
          }

          if(intersecciones[ 0 ].object.name == "bomba6"){
               // player.puntos.tomaTuTeterito(10);
               // puntos.play();

              h6.position.set(400,-10000,-100);
              estripar.play();
                        
          }


          if(intersecciones[ 0 ].object.name == "coin2"){
            player.position(-1000,-180,-100);
            m2.position.set(0,-10000,0);
           sonidoOP.parar();
           perderVida.play();
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }
          
          }

          if(intersecciones[ 0 ].object.name == "coinb4"){
            m4.position.set(65,-10000,-100);
             monedaSong.play();
  
          }

          if(intersecciones[ 0 ].object.name == "coinb3"){
            //player.position(-1000,-180,-100);
            m5.position.set(-10,-10000,0);
            monedaSong.play();
          }

          if(intersecciones[ 0 ].object.name == "coinb2"){
               // player.puntos.tomaTuTeterito(10);
               // puntos.play();

                
            m3.position.set(340,-10000,0);
            monedaSong.play();
                       
          }


          if(intersecciones[ 0 ].object.name == "coinM4"){
            player.position(-1000,-180,-100);
            m6.position.set(700,-10000,0);
             sonidoOP.parar();
             perderVida.play();
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }
          }

         

          if(intersecciones[ 0 ].object.name == "coinb1"){
               // player.puntos.tomaTuTeterito(10);
               // puntos.play();
               monedaSong.play();  
            m1.position.set(0,-10000,0);
                        
          }


         /* if(intersecciones[ 0 ].object.name == "portalito"){
            player.position(0,-700,0);
            perder.play();
            sonidoOP.parar();
             }*/

          if(intersecciones[ 0 ].object.name == "uka uka"){
            obj.material.color = new THREE.Color(0x00ff00);
            player.puntos.tomaTuTeterito(1);
          }else{
            if(intersecciones[ 0 ].object.name == "TNT"){
              obj.material.color = new THREE.Color(0xff0000);
              player.puntos.tomaTuTeterito(-1);

              if(explotando == false){
                console.log("Explotando");
                setTimeout(explode, 3000);
                explotando = true;
              }

            }else{
              obj.material.color = new THREE.Color(0xffffff);
            }
          }


          player.falling = false;
          player.inAir = false;
          player.vy = 0;
          player.jumping = false;

        }
      }
    };

    Colisiones.collideBottom = function(player){

      var rayBottom = new THREE.Raycaster();
      rayBottom.ray.direction.set( 0, 0, -1 );

      var obj = player.obj;
      var origen = obj.position.clone();
      rayBottom.ray.origin.copy( origen );

      var intersecciones = rayBottom.intersectObjects( collidableMeshList );

      if( intersecciones.length > 0 ){
        var distancia = intersecciones[0].distance;
        if(distancia > 0 && distancia <= obj.collidableDistance){
          obj.position.z += player.vx;

          if(intersecciones[ 0 ].object.name == "uka uka"){
            //codigo
          }else{
            if(intersecciones[ 0 ].object.name == "TNT"){
              //codigo
            }
            else{
              obj.material.color = new THREE.Color(0xffffff);
            }
          }
        }
      }
    };


    Colisiones.collideFront = function(player){

      var rayFront = new THREE.Raycaster();
      rayFront.ray.direction.set( 0, 0, 1 );

      var obj = player.obj;
      var origen = obj.position.clone();
      rayFront.ray.origin.copy( origen );

      var intersecciones = rayFront.intersectObjects( collidableMeshList );

      if( intersecciones.length > 0 ){
        var distancia = intersecciones[0].distance;
        if(distancia > 0 && distancia <= obj.collidableDistance){
          obj.position.z -= player.vx;

          if(intersecciones[ 0 ].object.name == "uka uka"){
            obj.position.z -= player.vx;
          }else{
            if(intersecciones[ 0 ].object.name == "TNT"){
              //codigo
            }else{
              obj.material.color = new THREE.Color(0xffffff);
            }
          }
        }
      }
    };

    Colisiones.collideLeft = function(player){

      var rayFront = new THREE.Raycaster();
      rayFront.ray.direction.set( 1, 0, 0 );

      var obj = player.obj;
      var origen = obj.position.clone();
      rayFront.ray.origin.copy( origen );

      var intersecciones = rayFront.intersectObjects( collidableMeshList );

      if( intersecciones.length > 0 ){
        var distancia = intersecciones[0].distance;
        if(distancia > 0 && distancia <= obj.collidableDistance){
          obj.position.x -= player.vx;

          if(intersecciones[ 0 ].object.name == "uka uka"){
            obj.position.x -= player.vx;
          }else{
            if(intersecciones[ 0 ].object.name == "TNT"){
              //codigo
            }
            if(intersecciones[ 0 ].object.name == "coin2"){
            player.position(-1000,-180,-100);
            m2.position.set(0,-10000,0);
            sonidoOP.parar();
            perderVida.play();
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }
          }

            if(intersecciones[ 0 ].object.name == "estrellita"){
            est1.position.set(850,10000,-100);
            cabezaMala.position.set(980,-10000,-100);
            cabezaBuena.position.set(980,-200,-100);
            box35.position.set(920,-90,-100);
            florB.position.set(920,-30,-100);
            atrapar.play();

          }

          if(intersecciones[ 0 ].object.name == "lava"){
            
            player.position(-1000,-180,-100);
            //player.vidas.die();
            //player.puntos.tomaTuTeterito(-5);
            sonidoOP.parar();
            perderVida.play();
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }

          }


          if(intersecciones[ 0 ].object.name == "honguito"){
               // player.puntos.tomaTuTeterito(10);
               // puntos.play();

              hon1.position.set(850,-10000,-100);
              est1.position.set(850,150,-100);
              box35.position.set(600,-250,-100);
              box36.position.set(690,-150,-100);
              atrapar.play();
             
          }


          if("bossM1" == intersecciones[ 0 ].object.name){
               
    
           player.position(-1000,-180,-100);
           sonidoOP.parar();
           perderVida.play();
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }
                           
          }

          if("bossL1" == intersecciones[ 0 ].object.name){
               
    
           player.position(-1000,-180,-100);
           sonidoOP.parar();
           perderVida.play();
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }
                           
          }

          if("goomba1" == intersecciones[ 0 ].object.name){
               
    
           player.position(-1000,-180,-100);
           sonidoOP.parar();
           perderVida.play();
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }
                           
          }


          if("goomba2" == intersecciones[ 0 ].object.name){
               
    
           player.position(-1000,-180,-100);
           sonidoOP.parar();
           perderVida.play();
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }
                           
          }

          if(intersecciones[ 0 ].object.name == "coinb4"){
            m4.position.set(65,-10000,-100);
             monedaSong.play();
  
          }

         if(intersecciones[ 0 ].object.name == "estrella1"){
            es1.position.set(-70,-10000,-100);
            totalContadorFlores += 1;
            console.log(totalContadorFlores);
            atrapar.play();
            //Almacenar en la base de datos de flores
          }

          if(intersecciones[ 0 ].object.name == "estrella2"){
            es2.position.set(490,-10000,-100);
            totalContadorFlores += 1;
            console.log(totalContadorFlores);
            atrapar.play();
            //Almacenar en la base de datos de flores
          }

          if(intersecciones[ 0 ].object.name == "estrella3"){
            es3.position.set(750,-10000,-100);
            totalContadorFlores += 1;
            console.log(totalContadorFlores);
            atrapar.play();
            //Almacenar en la base de datos de flores
          }

          if(intersecciones[ 0 ].object.name == "coinb1"){
               // player.puntos.tomaTuTeterito(10);
               // puntos.play();

                
            m1.position.set(0,-10000,0);
            monedaSong.play();
                        
          }


           if(intersecciones[ 0 ].object.name == "coinM4"){
            player.position(-1000,-180,-100);
            m6.position.set(700,-10000,0);
            sonidoOP.parar();
            perderVida.play();
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }
          }

          if(intersecciones[ 0 ].object.name == "coinb2"){
               // player.puntos.tomaTuTeterito(10);
               // puntos.play();
               monedaSong.play();

                
            m3.position.set(340,-10000,0);
                        
          }

          if(intersecciones[ 0 ].object.name == "coinb3"){
            //player.position(-1000,-180,-100);
            m5.position.set(-10,-10000,0);
            monedaSong.play();
          }

          if("bomba1" == intersecciones[ 0 ].object.name){
            
            player.position(-1000,-180,-100);
            //player.vidas.die();
            //player.puntos.tomaTuTeterito(-5);
            sonidoOP.parar();
            perderVida.play();
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }

          }

          if("bomba2" == intersecciones[ 0 ].object.name){
            
            player.position(-1000,-180,-100);
            //player.vidas.die();
            //player.puntos.tomaTuTeterito(-5);
            sonidoOP.parar();
            perderVida.play();
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }

          }

          if("bomba3" == intersecciones[ 0 ].object.name ){
            
            player.position(-1000,-180,-100);
            //player.vidas.die();
            //player.puntos.tomaTuTeterito(-5);
            sonidoOP.parar();
            perderVida.play();
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }

          }

          if("bomba4" == intersecciones[ 0 ].object.name){
            
            player.position(-1000,-180,-100);
            //player.vidas.die();
            //player.puntos.tomaTuTeterito(-5);
            sonidoOP.parar();
            perderVida.play();
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }

          }

          if("bomba5" == intersecciones[ 0 ].object.name){
            
            player.position(-1000,-180,-100);
            //player.vidas.die();
            //player.puntos.tomaTuTeterito(-5);
            sonidoOP.parar();
            perderVida.play();
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }

          }

          if("bomba6" == intersecciones[ 0 ].object.name){
            
            player.position(-1000,-180,-100);
            //player.vidas.die();
            //player.puntos.tomaTuTeterito(-5);
            sonidoOP.parar();
            perderVida.play();
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }

          }

            else{
              obj.material.color = new THREE.Color(0xffffff);
            }
          }
        }
      }
    };

    Colisiones.collideRight = function(player){

      var rayFront = new THREE.Raycaster();
      rayFront.ray.direction.set( -1, 0, 0 );

      var obj = player.obj;
      var origen = obj.position.clone();
      rayFront.ray.origin.copy( origen );

      var intersecciones = rayFront.intersectObjects( collidableMeshList );

      if( intersecciones.length > 0 ){
        var distancia = intersecciones[0].distance;
        if(distancia > 0 && distancia <= obj.collidableDistance){
          obj.position.x += player.vx;

          if(intersecciones[ 0 ].object.name == "uka uka"){
            obj.position.x += player.vx;
          }else{
            if(intersecciones[ 0 ].object.name == "TNT"){
              //codigo
            }

            if(intersecciones[ 0 ].object.name == "estrellita"){
            est1.position.set(850,10000,-100);
            cabezaMala.position.set(980,-10000,-100);
            cabezaBuena.position.set(980,-200,-100);
            box35.position.set(920,-90,-100);
            florB.position.set(920,-30,-100);
            atrapar.play();

          }
          if(intersecciones[ 0 ].object.name == "lava"){
            
            player.position(-1000,-180,-100);
            //player.vidas.die();
            //player.puntos.tomaTuTeterito(-5);
            sonidoOP.parar();
            perderVida.play();
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }

          }

          if(intersecciones[ 0 ].object.name == "malaC"){
            player.position(-1000,-180,-100);
            sonidoOP.parar();
            perderVida.play();
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }
          }

          if("bossL1" == intersecciones[ 0 ].object.name){
               
    
           player.position(-1000,-180,-100);
           sonidoOP.parar();
           perderVida.play();
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }
                           
          }

          if("goomba1" == intersecciones[ 0 ].object.name){
               
    
           player.position(-1000,-180,-100);
           sonidoOP.parar();
           perderVida.play();
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }
                           
          }


          if("goomba2" == intersecciones[ 0 ].object.name){
               
    
           player.position(-1000,-180,-100);
           sonidoOP.parar();
           perderVida.play();
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }
                           
          }

            if(intersecciones[ 0 ].object.name == "coin2"){
            player.position(-1000,-180,-100);
            m2.position.set(0,-10000,0);
            sonidoOP.parar();
            perderVida.play();
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }
          }

          if(intersecciones[ 0 ].object.name == "coinb4"){
            m4.position.set(65,-10000,-100);
             monedaSong.play();
  
          }
           if(intersecciones[ 0 ].object.name == "coinM4"){
            player.position(-1000,-180,-100);
            m6.position.set(700,-10000,0);
             sonidoOP.parar();
             perderVida.play();
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }
          }

          if(intersecciones[ 0 ].object.name == "honguito"){
               // player.puntos.tomaTuTeterito(10);
               // puntos.play();

              hon1.position.set(850,-10000,-100);
              box35.position.set(600,-250,-100);
              box36.position.set(690,-150,-100);
              atrapar.play();
             
          }


          if("bossM1" == intersecciones[ 0 ].object.name){
               
    
           player.position(-1000,-180,-100);
           sonidoOP.parar();
           perderVida.play();
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }
                           
          }


          if(intersecciones[ 0 ].object.name == "estrella1"){
            es1.position.set(-70,-10000,-100);
            totalContadorFlores += 1;
            console.log(totalContadorFlores);
            atrapar.play();
            //Almacenar en la base de datos de flores
          }

          if(intersecciones[ 0 ].object.name == "estrella2"){
            es2.position.set(490,-10000,-100);
            totalContadorFlores += 1;
            console.log(totalContadorFlores);
            atrapar.play();
            //Almacenar en la base de datos de flores
          }

          if(intersecciones[ 0 ].object.name == "estrella3"){
            es3.position.set(750,-10000,-100);
            totalContadorFlores += 1;
            console.log(totalContadorFlores);
            atrapar.play();
            //Almacenar en la base de datos de flores
          }

          if(intersecciones[ 0 ].object.name == "coinb1"){
               // player.puntos.tomaTuTeterito(10);
               // puntos.play();
               monedaSong.play();

                
            m1.position.set(0,-10000,0);
                        
          }

          if(intersecciones[ 0 ].object.name == "coinb2"){
               // player.puntos.tomaTuTeterito(10);
               // puntos.play();
               monedaSong.play();

                
            m3.position.set(340,-10000,0);
                        
          }

          if(intersecciones[ 0 ].object.name == "coinb3"){
            //player.position(-1000,-180,-100);
            m5.position.set(-10,-10000,0);
            monedaSong.play();
          }

          if("bomba1" == intersecciones[ 0 ].object.name){
            
            player.position(-1000,-180,-100);
            //player.vidas.die();
            //player.puntos.tomaTuTeterito(-5);
            sonidoOP.parar();
            perderVida.play();
            if(perdiendo == false){
                setTimeout(explode, 2800);
                perdiendo = true;
              }
              console.log(perdiendo);
              if(perdiendo == true){
                setTimeout(explode, 2800);
                perdiendo = false;
              }

          }


            else{
              obj.material.color = new THREE.Color(0xffffff);
            }
          }
        }
      }
    };