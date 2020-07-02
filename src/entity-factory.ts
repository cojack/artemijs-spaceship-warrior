import {Entity, GroupManager, World} from 'artemijs';
import {Scene} from 'three';
import {Position, Velocity, Sprite, Player} from './components';
import {GroupEnum} from './group.enum';

export class EntityFactory {
	public static createPlayer(world: World, scene: Scene, x: number, y: number): Entity {
		const entity = world.createEntity();
		const position = new Position(x, y);
		entity.addComponent(position);

		const velocity = new Velocity();
		entity.addComponent(velocity);

		const sprite = new Sprite(scene);
		entity.addComponent(sprite);

		const player = new Player();
		entity.addComponent(player);

		world.getManager<GroupManager>(GroupManager)?.add(entity, GroupEnum.PLAYER_SHIP);

		return entity;
	}
}
