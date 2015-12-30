"use strict";

var Wall;

module.exports = Wall = (function() {
	function Wall(args) {
		this.walls = [false, false, false, false, false, false];
		this.distance = args.distance || 250;
		this.width = args.width || 50;

		var _checkValid = function(walls) {
			for (var i = 0; i < walls.length; i++) {
				if (walls[i] == false)
					return true;
			}
			return false;
		};

		this.generatePattern = function(amount) {
			for (var i = 0; i < amount; i++)
				this.walls[i] = Boolean(Math.round(Math.random()));
			if (!_checkValid(this.walls))
				this.generatePattern(amount);
		};

		this.draw = function(canvas, color) {
			var ctx = canvas.getContext('2d');
			var cx = canvas.width / 2,
			cy = canvas.height / 2;

			for (var i = 0; i < this.walls.length; i++) {
				if (!this.walls[i])
					continue;

				ctx.beginPath();
				ctx.moveTo(cx + this.distance * Math.cos(i * 2 * Math.PI / 6), cy + this.distance * Math.sin(i * 2 * Math.PI / 6));
				ctx.lineTo(cx + this.distance * Math.cos((i + 1) * 2 * Math.PI / 6), cy + this.distance * Math.sin((i + 1) * 2 * Math.PI / 6));
				ctx.lineTo(cx + (this.distance - this.width) * Math.cos((i + 1) * 2 * Math.PI / 6), cy + (this.distance - this.width) * Math.sin((i + 1) * 2 * Math.PI / 6));
				ctx.lineTo(cx + (this.distance - this.width) * Math.cos(i * 2 * Math.PI / 6), cy + (this.distance - this.width) * Math.sin(i * 2 * Math.PI / 6));
				ctx.closePath();

				ctx.fillStyle = color;
				ctx.strokeStyle = color;
				ctx.lineWidth = 1;
				ctx.fill();
				ctx.stroke();
			}
		};

		this.checkCollision = function(coord, canvas) {
			for (var i = 0; i < this.walls.length; i++) {
				var a_1 = i * (360 / 6),
				a_2 = (i + 1) * (360 / 6);
				if (!this.walls[i])
					continue;
				if (a_1 <= coord.a && a_2 >= coord.a) {
					if ((this.distance - this.width) <= coord.d &&
						this.distance >= coord.d)
						return true;
				}
			};

			return false;
		};
	};

	return Wall;
}());
