import {SpaceshipWarrior} from './spaceship-warrior';

window.addEventListener('load', async () => {
	const spaceshipWarrior = new SpaceshipWarrior();
	await spaceshipWarrior.bootstrap();
	spaceshipWarrior.start();
});
