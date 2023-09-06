import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";
export default class Room{
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.time = this.experience.time;
        this.resources = this.experience.resources;
        this.room = this.resources.items.room;
        this.computer = this.resources.items.computer;
        this.actualRoom = this.room.scene;
        this.actualComputer = this.computer.scene;
        //console.log(this.actualRoom);

        const textureChangeInterval = 1000

        this.lerp = {
            current:0,
            target:0,
            ease: 0.01
        }
        this.setModel();
        this.setAnimation();
        this.onMouseMove();
        this.changeTexture = () => {
            this.actualMonitor.material = new THREE.MeshBasicMaterial({
                map: this.resources.items.screen2,
            });
            
            
            
            
           
            
        
        };
        setInterval(this.changeTexture,textureChangeInterval);

    }
    setAnimation(){
        this.mixer = new THREE.AnimationMixer(this.actualComputer); //room is the resource list, actual room is the room object
        this.swim = this.mixer.clipAction(this.computer.animations[0]);
        console.log("animation");
        console.log(this.room.animations[0]);
        console.log(this.swim);
        this.mixer.timeScale = 0.001;
        this.swim.play(); //this is not playing
    }
    
    setModel(){
   
        this.actualComputer.children.forEach(child => {
            child.castShadow = true;
            child.receiveShadow = true;

            if(child instanceof THREE.Group){
                child.children.forEach((groupchild)=>{
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                })
            }
          
            if (child.name === "Disk_Tray") {
                console.log("disk tray");
                console.log(child);
                child.children[0].material = new THREE.MeshPhysicalMaterial();
                child.children[0].material.roughness = 0;
                child.children[0].material.color.set(0x549dd2);
                child.children[0].material.ior = 3;
                child.children[0].material.transmission = 1;
                child.children[0].material.opacity = 1;
                child.children[0].material.depthWrite = false;
                child.children[0].material.depthTest = false;
            }

            if(child.name === "Monitor001"){
                this.actualMonitor = child;
                //console.log("print monitor");
                //console.log(child);
                child.material = new THREE.MeshBasicMaterial({
                        map:this.resources.items.screen,
                });
                

            }
        });
        console.log("print items");
        console.log(this.actualComputer.children);
        console.log(this.actualRoom.children);
        //this.scene.add(this.actualRoom);
        this.scene.add(this.actualComputer);
        this.actualComputer.rotation.set(0, Math.PI/3, 0);
        
        this.actualComputer.scale.set(0.4,0.4,0.4);
        this.actualRoom.scale.set(0.2,0.2,0.2);
        //this.actualRoom.rotation.y = 0.25*Math.PI;\
        console.log("items");
        console.log(this.resources.items);

        const width = 0.5;
        const height = 0.7;
        const intensity = 1;
        const rectLight = new THREE.RectAreaLight(
            0xffffff,
            intensity,
            width,
            height
        );
        rectLight.position.set(7.68244, 7, 0.5);
        rectLight.rotation.x = -Math.PI / 2;
        rectLight.rotation.z = Math.PI / 4;
        this.actualComputer.add(rectLight);



    }
    onMouseMove(){
        window.addEventListener("mousemove",(e)=>{
            //console.log(e);
            //0----->screensize
            this.rotation = (2*(e.clientX - window.innerWidth / 2))/window.innerWidth;
            this.lerp.target = this.rotation*0.1;
            //console.log(this.rotation);            
        })
    }
    resize(){
        
    }


    

    update(){
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );
        this.actualComputer.rotation.y = this.lerp.current;
        this.mixer.update(this.time.delta); 
        //console.log(this.time.delta);  
    }
}