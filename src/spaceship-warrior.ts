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

	public async bootstrap(): Promise<void> {
		this.gameScreen.initialize();
		await this.bigBang();
	}

	public start(): void {
		this.animate();
	}

	private animate(delta = 0): void {
		requestAnimationFrame(delta => this.animate(delta));
		this.world.setDelta(delta);
		this.world.process();
		this.gameScreen.render(delta);
	}


	private async bigBang(): Promise<void> {
		this.world.setManager(new GroupManager());
		this.createSystems();
		await this.world.initialize();
		this.createEntities();
	}

	private createSystems(): void {
		this.world.setSystem(new MovementSystem());
		this.world.setSystem(new PlayerInputSystem(this.gameScreen.camera as Camera));
		this.world.setSystem(new SpriteRenderSystem(this.gameScreen.scene as Scene));
	}

	private createEntities(): void {
		EntityFactory.createPlayer(this.world, this.gameScreen.scene as Scene, 0, 0).addToWorld();
	}
}
