import {Aspect, ComponentMapper, Constructor, Entity, EntityProcessingSystem} from 'artemijs';
import {Camera, Vector3} from 'three';
import {Position, Velocity} from '../components';

export class MovementSystem extends EntityProcessingSystem {

	private pm: ComponentMapper<Position> | undefined;
	private vm: ComponentMapper<Velocity> | undefined;

	public constructor() {
		super(Aspect.getAspectFor(Position, Velocity));
	}

	public async initialize(): Promise<void> {
		if (!this.world) {
			return;
		}
		this.pm = this.world.getMapper(Position);
		this.vm = this.world.getMapper(Velocity);
	}

	protected action(entity: Entity): void {
		if (!this.world) {
			return;
		}

		const position = this.pm?.get(entity) as Position;
		const velocity = this.vm?.get(entity) as Velocity;

		position.x += velocity.vectorX * this.world.getDelta();
		position.y += velocity.vectorY * this.world.getDelta();
	}

}
