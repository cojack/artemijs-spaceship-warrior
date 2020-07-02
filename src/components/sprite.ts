import {Component} from 'artemijs';
import {Scene, Sprite as TSprite, SpriteMaterial, TextureLoader, Vector3} from 'three';

export class Sprite extends Component {
	private readonly sprite: TSprite;

	constructor(private readonly scene: Scene) {
		super();
		const spriteMap = new TextureLoader().load('/assets/ship.png');
		const spriteMaterial = new SpriteMaterial({map: spriteMap});
		this.sprite = new TSprite(spriteMaterial);
		this.sprite.position.set(0, 0, 0);

		scene.add(this.sprite);
	}

	public set position(vector: Vector3) {
		this.sprite.position.set(vector.x, vector.y, 0);
	}
}
