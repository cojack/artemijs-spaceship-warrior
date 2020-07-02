import {SpaceshipWarrior} from './spaceship-warrior';

window.addEventListener('load', () => {
	const spaceshipWarrior = new SpaceshipWarrior();
	spaceshipWarrior.bootstrap();
	spaceshipWarrior.start();
});
