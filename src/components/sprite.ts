import {Component} from 'artemijs';
import {Scene, Sprite as TSprite, SpriteMaterial, TextureLoader, Vector3} from 'three';

export enum Layer {
	DEFAULT,
	BACKGROUND,
	ACTORS_1,
	ACTORS_2,
	ACTORS_3,
	PARTICLES
}

export class Sprite extends Component {
	public name = '';
	public scaleX = 1;
	public scaleY = 1;
	public rotation = 0;
	public r = 1;
	public g = 1;
	public b = 1;
	public a = 1;
	public layer = Layer.DEFAULT;
}
