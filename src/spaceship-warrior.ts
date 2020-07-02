import {GroupManager, World} from 'artemijs';
import {Camera, Scene} from 'three';
import {EntityFactory} from './entity-factory';
import {GameScreen} from './game-screen';
import {MovementSystem} from './systems';
import {PlayerInputSystem} from './systems/player-input-system';
import {SpriteRenderSystem} from './systems/sprite-render-system';

export class SpaceshipWarrior {
	private readonly world = new World();
	private readonly gameScreen: GameScreen;

	constructor() {
		this.gameScreen = new GameScreen(this.world);
		this.gameScreen.enableStats();
	}

	public bootstrap() {
		this.gameScreen.initialize();
		this.bigBang();
	}

	public start() {
		this.animate();
	}

	private animate(delta = 0) {
		requestAnimationFrame(delta => this.animate(delta));
		this.world.setDelta(delta);
		this.world.process();
		this.gameScreen.render(delta);
	}


	private bigBang(): void {
		this.world.setManager(new GroupManager());
		this.createSystems();
		this.world.initialize();
		this.createEntities();
	}

	private createSystems() {
		this.world.setSystem(new MovementSystem());
		this.world.setSystem(new PlayerInputSystem());
		this.world.setSystem(new SpriteRenderSystem(this.gameScreen.camera as Camera));
	}

	private createEntities() {
		EntityFactory.createPlayer(this.world, this.gameScreen.scene as Scene, 0, 0).addToWorld();
	}
}
