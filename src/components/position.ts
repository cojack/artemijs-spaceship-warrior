import {Component} from 'artemijs';

export class Position extends Component {
	constructor(public x = 0, public y = 0) {
		super();
	}
}