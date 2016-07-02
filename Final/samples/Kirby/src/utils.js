function resizeApp(){
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth,window.innerHeight);
}

function textTure(ts,fw,fs,ff,c,t,x,y){

    var canvas = document.createElement('canvas');
    canvas.width = ts; canvas.height = ts;
    var context = canvas.getContext('2d');
    context.font = fw+" "+fs+" "+ff;
    context.fillStyle = "rgba("+c+")";
    context.fillText(t, x, y);
    
    // canvas contents will be used for a texture
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    return texture;

}

function twoPointsDistance(a,b){//d = b-a
    return new THREE.Vector3(b.x-a.x,b.y-a.y,b.z-a.z);
}
function modulo(a){
    return Math.sqrt( (a.x*a.x) + (a.y*a.y) + (a.z*a.z) );
}
function unitario(a){
    var m = modulo(a);
    return new THREE.Vector3((a.x/m) , (a.y/m) , (a.z/m));
}
function randomHexColor(){
    return '#'+Math.floor(Math.random()*16777215).toString(16);
}
function parsePromtParams(string,flag){
    value = string.split(flag);
    for (var i = 0; i < value.length; i++) {
        if(i != value.length-1) value[i] = parseFloat(value[i]);
    };
    return value;
}

function crearCuboInterface(){

    var message = "Que viva el prompt carajo!";
    var params = prompt(message,"w,h,d,ws,hs,ds,color");

    if(params){

        var values = parsePromtParams(params,",");
        var w = values[0] || 10,
        h = values[1] || 10,
        d = values[2] || 10,
        ws = values[3] || 1,
        hs = values[4] || 1,
        ds = values[5] || 1;
        var color = values[6] || randomHexColor();

        return crearCubo(w,h,d,ws,hs,ds,color);
    }
    return false;
}

function crearCubo(w,h,d,ws,hs,ds,color){
    var geometria = new THREE.CubeGeometry(w,h,d,ws,hs,ds);
    var material = new THREE.MeshBasicMaterial({
        color: color, wireframe: true
    });
    var cubo = new THREE.Mesh( geometria, material);
    objetos.push(cubo);
    scene.add(cubo);

    var obj = {
        id: objetos.length-1,
        name: "Cube | Obj "+objetos.length
    };

    return obj;
}