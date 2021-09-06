/*:
 * @plugindesc マップの幅・高さに関わらず、常にプレイヤーを画面中央に表示します。
 * @author 茶の助
 */
 
(function(){

	Game_Map.prototype.scrollDown = function(distance) {
		if (this.isLoopVertical()) {
			this._displayY += distance;
			this._displayY %= $dataMap.height;
			if (this._parallaxLoopY) {
				this._parallaxY += distance;
			}
		} else if (this.height() >= this.screenTileY()) {
			var lastY = this._displayY;
			this._displayY = this._displayY + distance;
			this._parallaxY += this._displayY - lastY;
		}
	};

	Game_Map.prototype.scrollLeft = function(distance) {
		if (this.isLoopHorizontal()) {
			this._displayX += $dataMap.width - distance;
			this._displayX %= $dataMap.width;
			if (this._parallaxLoopX) {
				this._parallaxX -= distance;
			}
		} else if (this.width() >= this.screenTileX()) {
			var lastX = this._displayX;
			this._displayX = this._displayX - distance;
			this._parallaxX += this._displayX - lastX;
		}
	};

	Game_Map.prototype.scrollRight = function(distance) {
		if (this.isLoopHorizontal()) {
			this._displayX += distance;
			this._displayX %= $dataMap.width;
			if (this._parallaxLoopX) {
				this._parallaxX += distance;
			}
		} else if (this.width() >= this.screenTileX()) {
			var lastX = this._displayX;
			this._displayX = this._displayX + distance;
			this._parallaxX += this._displayX - lastX;
		}
	};

	Game_Map.prototype.scrollUp = function(distance) {
		if (this.isLoopVertical()) {
			this._displayY += $dataMap.height - distance;
			this._displayY %= $dataMap.height;
			if (this._parallaxLoopY) {
				this._parallaxY -= distance;
			}
		} else if (this.height() >= this.screenTileY()) {
			var lastY = this._displayY;
			this._displayY = this._displayY - distance;
			this._parallaxY += this._displayY - lastY;
		}
	};
    
})();