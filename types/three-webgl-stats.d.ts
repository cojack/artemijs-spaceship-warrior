declare module 'three-webgl-stats' {
	export default class RendererStats {
		public domElement: Element;
		constructor();
		public update(): void;
	}
}
