import {Aspect, ComponentMapper, Entity, EntityProcessingSystem} from 'artemijs';
import {Camera, Vector2, Vector3} from 'three';
import {Player, Position, Velocity} from '../components';

export class PlayerInputSystem extends EntityProcessingSystem {

	private static HorizontalThrusters = 300;
	private static HorizontalMaxSpeed = 300;
	private static VerticalThrusters = 200;
	private static VerticalMaxSpeed = 200;
	private static FireRate = 0.1;

	private pm: ComponentMapper<Position> | undefined;
	private vm: ComponentMapper<Velocity> | undefined;
	private readonly mouseVector = new Vector2();

	constructor(private readonly camera: Camera) {
		super(Aspect.getAspectFor(Position, Velocity, Player));
		window.addEventListener('mousemove', event => this.onMouseMove(event));
	}

	public async initialize(): Promise<void> {
		if (!this.world) {
			return;
		}
		this.pm = this.world.getMapper(Position);
		this.vm = this.world.getMapper(Velocity);
	}

	protected action(entity: Entity): void {
		const position = this.pm?.get(entity) as Position;
		position.x = this.mouseVector.x;
		position.y = this.mouseVector.y;
	}

	private onMouseMove(event: MouseEvent) {
		const x = ( event.clientX / window.innerWidth ) * 2 - 1;
		const y = - ( event.clientY / window.innerHeight ) * 2 + 1;
		const vec = new Vector3(x, y, 0);
		vec.unproject(this.camera);
		vec.sub(this.camera.position).normalize();

		this.mouseVector.set(vec.x, vec.y);
	}
}
