import {Aspect, Bag, ComponentMapper, Entity, EntitySystem} from 'artemijs';
import {atlasToSprites} from 'gingerale';
import {Camera, SpriteMaterial, Sprite as ThreeSprite, Vector3, Texture, Scene, TextureLoader} from 'three';
import {Sprite, Position} from '../components';

export class SpriteRenderSystem extends EntitySystem {

	private pm: ComponentMapper<Position> | undefined;
	private sm: ComponentMapper<Sprite> | undefined;

	private regions = new Map<string, ThreeSprite>();

	constructor(private readonly scene: Scene) {
		super(Aspect.getAspectForAll(Position, Sprite));
	}

	public async initialize(): Promise<void> {
		if (!this.world) {
			return;
		}
		this.pm = this.world.getMapper(Position);
		this.sm = this.world.getMapper(Sprite);
		const sprites: any = await atlasToSprites('/assets/textures.png', '/assets/atlas.json');
		for (const image of sprites) {
			const texture = new Texture(image.frame);
			texture.needsUpdate = true;
			const sprite = new ThreeSprite(new SpriteMaterial({map: texture}));
			sprite.name = image.name;
			sprite.visible = false;
			this.regions.set(sprite.name, sprite);
			this.scene.add(sprite);
		}
	}

	protected checkProcessing(): boolean {
		return true;
	}

	protected processEntities(entities: Bag<Entity>): void {
		for (const entity of entities) {
			this.action(entity);
		}
	}

	protected action(entity: Entity): void {
		if (!this.pm?.has(entity)) {
			return;
		}

		const position = this.pm.get(entity) as Position;
		const sprite = this.sm?.get(entity) as Sprite;

		const tsprite = this.regions.get(sprite.name) as ThreeSprite;
		tsprite.visible = true;
		tsprite?.position.set(position.x, position.y, 0);
	}
}
