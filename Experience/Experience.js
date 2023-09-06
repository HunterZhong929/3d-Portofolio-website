import * as THREE from 'three';
import Sizes from './Utils/Sizes';
import Camera from './Camera';
import Renderer from './Renderer';
import Time from './Utils/Time';
import World from './World/World';
import Resources from './Utils/Resources';
import assets from './Utils/assets';
import Controls from './World/Controls';
export default class Experience{
    static instance
    constructor(canvas){
        if(Experience.instance){
            return Experience.instance
        }
        Experience.instance = this
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.sizes = new Sizes(); 
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.resources = new Resources(assets);
        this.time = new Time();
        this.world = new World();
        this.world.on("world ready",()=>{
            this.controls = new Controls();
    });
        this.time.on("update", ()=>{
            this.update();
        });
        this.sizes.on("resize",()=> {
            this.resize();
        })
    }
    resize(){
        this.camera.resize();
        this.renderer.resize();
        this.world.resize();
    }
    update(){
        this.camera.update();
        this.renderer.update();
        this.world.update();
        if (this.controls) {
            this.controls.update();
        }
    }
}