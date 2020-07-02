import {World} from 'artemijs';
import Stats from 'stats.js';
import {Camera, Color, PerspectiveCamera, Scene, WebGLRenderer} from 'three';
import RendererStats from 'three-webgl-stats';

export class GameScreen {
	public scene: Scene | undefined;
	public camera: Camera | undefined;

	private stats: Stats | undefined;
	private rendererStats: any;
	private renderer: WebGLRenderer | undefined;

	private readonly width: number;
	private readonly height: number;

	private container = document.createElement( 'div' );

	constructor(private readonly world: World, width = window.innerWidth, height = window.innerHeight) {
		this.width = width;
		this.height = height;
		document.body.appendChild(this.container);
	}

	public initialize() {
		this.makeRenderer();
		this.makeScene();
		this.makeCamera();
		this.makeControls();
	}

	public enableStats() {
		this.stats = new Stats();
		this.rendererStats = new RendererStats();
		this.rendererStats.domElement.style.position	= 'absolute'
		this.rendererStats.domElement.style.left	= '0px'
		this.rendererStats.domElement.style.bottom	= '0px'

		this.container.appendChild(this.stats.dom);
		this.container.appendChild(this.rendererStats.domElement);
	}

	public render(delta: number) {
		this.renderer?.render(this.scene as Scene, this.camera as Camera);
		if (this.stats) {
			this.stats.update();
			this.rendererStats.update(this.renderer);
		}
	}

	private makeScene() {
		this.scene = new Scene();
		this.scene.background = new Color( 0xf0f0f0 );
	}

	private makeCamera() {
		this.camera = new PerspectiveCamera(75, this.width/this.height,  0.1, 1000);
		this.camera.position.z = 10;
	}

	private makeRenderer() {
		this.renderer = new WebGLRenderer({alpha: true});
		this.renderer.setClearColor( 0xffffff, 1);
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( this.width, this.height );
		this.container.appendChild( this.renderer.domElement );
	}

	private makeControls() {
		/*const controls = new OrbitControls(this.camera as Camera, this.renderer?.domElement);
		controls.minDistance = 50;
		controls.maxDistance = 200;*/
	}
}
