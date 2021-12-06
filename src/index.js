// Find the latest version by visiting https://cdn.skypack.dev/three.
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls'
const objLoader = new THREE.ObjectLoader();
let clock = new THREE.Clock();
let controls, camera, renderer, scene, light
main();
animate();

function main() {

scene = new THREE.Scene();


camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.01, 1000.00);

camera.position.set(0,.425,-.5); // Set position like this

camera.lookAt(0,0,0);

THREE.Object3D.DefaultUp.set(0.0, 0.0, 1.0);
renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
renderer.outputEncoding = THREE.sRGBEncoding;
const loader = new GLTFLoader();

loader.load( 'Batho.glb', function ( gltf ) {
    gltf.scene.traverse( function ( child ) {
                    
        
        child.frustumCulled = false;
            
      
        if ( child.isMesh ) {

            // TOFIX RoughnessMipmapper seems to be broken with WebGL 2.0
            // roughnessMipmapper.generateMipmaps( child.material );

        }

    } );
    scene.add( gltf.scene );
    scene.background = new THREE.Color('black');
    const color = 0xFFFFFF;
    const intensity = 1;
    light = new THREE.AmbientLight(color, intensity);
    scene.add(light);
    controls = new FirstPersonControls( camera, renderer.domElement );

    controls.movementSpeed = 500;
    controls.domElement = renderer.domElement;
    controls.rollSpeed = Math.PI / 24;
    controls.autoForward = false;
    controls.dragToLook = false;
    controls.lookSpeed = .05

    //controls.lookAt(-1.6436521868795548, 0.04807859305309277, 2.5592707352968556)

}, function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

}, function ( error ) {

console.error( error );

} );


}

function animate() {
    requestAnimationFrame( animate );
    
    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;
    const delta = clock.getDelta();
    controls.movementSpeed = 1
	controls.update( delta );
    renderer.render( scene, camera );
    // console.log("position");
    // console.log(camera.position);
    // console.log("rotation");
    // console.log(camera.rotation);
    
};

