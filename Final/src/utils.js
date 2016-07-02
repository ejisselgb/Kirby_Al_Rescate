function resizeApp(){
                //camaraActiva.aspect = window.innerWidth / window.innerHeight;
                //camaraActiva.updateProjectionMatrix();
                renderer.setSize(window.innerWidth,window.innerHeight);
}

function addFaceUvs(geometria,textCoord){

    //Primer triángulo
            geometria.faceVertexUvs[0].push(
                    [
                        textCoord[0],
                        textCoord[2],
                        textCoord[1]
                    ]
                );
                

    //Segundo triángulo
                geometria.faceVertexUvs[0].push(
                    [
                        textCoord[2],
                        textCoord[3],
                        textCoord[1]
                    ]
                );

}