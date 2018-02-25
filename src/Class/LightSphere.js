import { ObjectGenerator } from './ObjectGenerator';
import { SphereGeometry, Vector3,
    FaceColors, Mesh, MeshStandardMaterial, PointLight } from 'three';


export class LightSphere extends ObjectGenerator {
    
    constructor(...args) {
        super(...args)
    }
    get mesh() {
        if(!this.mesh_) {
            this.geometry_ = new SphereGeometry( 2, 20, 20 );
            let bulbLight = new PointLight( 0xffee88, 1, 100, 2 );
            this.material_ = new MeshStandardMaterial( {
                    emissive: 0xffffee,
                    emissiveIntensity: 1,
                    color: 0x000000
                });
            bulbLight.add( new Mesh( this.geometry_, this.material_ ) );
            bulbLight.position.set( 0, 0, 0 );
            bulbLight.castShadow = true;
    
            this.mesh_ = bulbLight;
            this.mesh_.position.copy(this.position_);
        } 
        return this.mesh_;
    }

}