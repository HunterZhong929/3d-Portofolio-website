import * as THREE from "three";
import Experience from "../Experience";
import Room from "./Room";
import Environment from "./Environment";
import { EventEmitter } from "events";
import Controls from "./Controls";
import Floor from "./Floor";
export default class World extends EventEmitter{
    constructor() {
        super();
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        
        console.log("resources printing")
        console.log(this.resources)
        this.resources.on("ready",()=>{
            this.environment = new Environment();
            this.room = new Room();
            
            
            this.floor = new Floor();
            this.emit("world ready");
            //console.log("created room")
        });

        //this.room = new Room();
       
    }
    
   
    resize(){
        
    }

    update(){
        if(this.room){
            this.room.update();
        }
        if(this.controls){
            this.controls.update();
        }
    }
}