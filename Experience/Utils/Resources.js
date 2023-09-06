//load our resources and store it
import EventEmitter from "events";
import Experience from "../Experience";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import * as THREE from 'three';
export default class Resources extends EventEmitter{
    constructor(assets) {
        super();
        this.experience = new Experience();
        this.renderer = this.experience.renderer;

        this.assets = assets;
        console.log(this.assets);

        this.items = {};
        this.queue = this.assets.length;
        this.loaded = 0;

        this.setLoaders();
        this.startLoading();
    }
    setLoaders(){
        this.loaders = {};
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.dracoLoader = new DRACOLoader();
        this.loaders.dracoLoader.setDecoderPath("/draco/");
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
    }
    startLoading(){
        for(const asset of this.assets){
            if(asset.type === "glbModel"){
              



                console.log(asset.name);
                this.loaders.gltfLoader.load(asset.path, (file)=>{
                    this.singleAssetLoaded(asset, file);
                });

            }else if(asset.type === "videoTexture"){
                this.video = {};
                this.videoTexture = {};

                this.video[asset.name] = document.createElement("video");
                this.video[asset.name].src = asset.path;
                this.video[asset.name].muted = true;
                this.video[asset.name].playsInline = true;
                this.video[asset.name].autoplay = true;
                this.video[asset.name].loop = true;
                this.video[asset.name].play();
                
                this.videoTexture[asset.name] = new THREE.VideoTexture(this.video[asset.name]);

                this.videoTexture[asset.name].flipY = false;
                this.videoTexture[asset.name].minFilter =  THREE.LinearMipmapLinearFilter;
                this.videoTexture[asset.name].mageFilter = THREE.LinearFilter;
                this.videoTexture[asset.name].generateMipmaps = true;
                this.videoTexture[asset.name].colorSpace = THREE.SRGBColorSpace;
                
                this.singleAssetLoaded(asset,this.videoTexture[asset.name]);
            }
        }
    }
    singleAssetLoaded(asset, file){
        //create key value pair for us
        this.items[asset.name] = file;
        this.loaded++;
        console.log(file);
        if(this.loaded === this.queue){
            this.emit("ready");
        }
    }
}
