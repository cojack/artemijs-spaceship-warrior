import {Aspect, Bag, ComponentMapper, Entity, EntitySystem} from 'artemijs';
import {atlasToSprites} from 'gingerale';
import {Camera, Vector2, Vector3} from 'three';
import {Sprite, Position} from '../components';

export class SpriteRenderSystem extends EntitySystem {

	private pm: ComponentMapper<Position> | undefined;
	private sm: ComponentMapper<Sprite> | undefined;

	constructor(private readonly camera: Camera) {
		super(Aspect.getAspectForAll(Position, Sprite));
	}

	public async initialize(): Promise<void> {
		if (!this.world) {
			return;
		}
		this.pm = this.world.getMapper(Position);
		this.sm = this.world.getMapper(Sprite);
		const sprites = await atlasToSprites('/assets/textures.png', '/assets/atlas.json');
	}

	protected checkProcessing(): boolean {
		return true;
	}

	protected processEntities(entities: Bag<Entity>): void {
		for(const entity of entities) {
			this.action(entity);
		}
	}

	protected action(entity: Entity): void {
		if (!this.pm?.has(entity)) {
			return;
		}

		const position = this.pm?.get(entity) as Position;
		const sprite = this.sm?.get(entity) as Sprite;
		const vec = new Vector3(position.x, position.y, 0);

		vec.unproject(this.camera);
		vec.sub( this.camera.position ).normalize();
	}
}
