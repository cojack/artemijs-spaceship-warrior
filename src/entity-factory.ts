import {Entity, GroupManager, World} from 'artemijs';
import {Scene} from 'three';
import {Position, Velocity, Sprite, Player, Layer} from './components';
import {GroupEnum} from './group.enum';

export class EntityFactory {
	public static createPlayer(world: World, scene: Scene, x: number, y: number): Entity {
		const entity = world.createEntity();
		const position = new Position(x, y);
		entity.addComponent(position);

		const velocity = new Velocity();
		entity.addComponent(velocity);

		const sprite = new Sprite();
		sprite.name = 'fighter';
		sprite.r = 93/255;
		sprite.g = 255/255;
		sprite.b = 129/255;
		sprite.layer = Layer.ACTORS_3;
		entity.addComponent(sprite);

		const player = new Player();
		entity.addComponent(player);

		world.getManager<GroupManager>(GroupManager)?.add(entity, GroupEnum.PLAYER_SHIP);

		return entity;
	}
}
