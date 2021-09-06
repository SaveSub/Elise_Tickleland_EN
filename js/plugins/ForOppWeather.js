//=============================================================================
// ForOppWeather.js
//=============================================================================

/*:ja
 * @plugindesc ver1.01 雪が降っているのではない・・・
 * お前が降ってるんだよ！（適当）
 * @author まっつＵＰ
 * 
 * @param dimrate
 * @desc 天候によって変わる画面の暗さの強弱です。
 * このIDの変数の値を参照します。
 * @default 10
 * 
 * @param fill
 * @desc このIDの変数に'white'などと入れることによって
 * 天候のスプライトの色を変更します。
 * @default 11
 * 
 * @param fill2
 * @desc このIDの変数にfillの値を天候変動時自動で記録します。
 * @default 12
 * 
 * @param oppo
 * @desc このIDの変数が0未満の時天候の動きが反転します。
 * @default 13
 *
 * @help
 * 
 * RPGで笑顔を・・・
 * 
 * このヘルプとパラメータの説明をよくお読みになってからお使いください。
 * 
 * dimrateが0のとき（変数の値でなくパラメータの値）は
 * デフォルト通りの機能になります。
 * 
 * fillなどは変数に'red'と入れれば赤い雨が降ります！
 * （イベントコマンド「変数の操作」で「スクリプト」に'red'と入れてください。）
 * 'rgba(0, 0, 0, 0.5)'と入れればやや透明な黒い雨が降ります！
 * 'rgba(255, 255, 255, 0)'と入れれば全く透明な白い雨が降ります！
 * ここから先は自分の目で確かめてみてくれ！（丸投げ）
 * 
 * 色の変更判定はイベントコマンド「天候の設定」の時に行われます。
 * なお、変数が0のときは一括で白（'white'）です。
 * 意図せず黒いのになっているときは失敗している可能性が高いです（小声）
 * 
 * fill2にが0のとき（変数の値でなくパラメータの値）は
 * fillの値を天候変動時の自動記録を行いません。
 * これは、マップのシーンに入った時に本来であれば元の天候が復帰するだけなのですが
 * このプラグインを使う場合は復帰するときに再び色付けを行います。
 * そのため、このとき天候は当然fillの色になります。
 * 天候の発生から天候を消すまでfillの変数の値を変えるつもりがない方は
 * fill2を0にしても全く問題ないです。
 * 
 * 裏技：（スクリプトコマンド）FOWflag = 1;
 * 色の変更判定を行います。
 * これをイベントの実行内容と絡めることで
 * 天候を発生させながら色を変えたり、天候の向きを変えたりできるでしょう。
 * 
 * このプラグインを利用する場合は
 * readmeなどに「まっつＵＰ」の名を入れてください。
 * また、素材のみの販売はダメです。
 * 上記以外の規約等はございません。
 * もちろんツクールMVで使用する前提です。
 * 何か不具合ありましたら気軽にどうぞ。
 * 
 * ver1.01 ヘルプの記述内容の充実
 *         申し訳程度の競合対策
 *         fill2が0の時fill2の機能を無効にする。
 *  
 * 免責事項：
 * このプラグインを利用したことによるいかなる損害も制作者は一切の責任を負いません。
 * 
 */

//(function() {
    
    var parameters = PluginManager.parameters('ForOppWeather');
    var FOWdimrate = Number(parameters['dimrate'] || 10);
    var FOWfill = Number(parameters['fill'] || 11);
    var FOWfill2 = Number(parameters['fill2'] || 12);
    var FOWoppo = Number(parameters['oppo'] || 13);
    var FOWflag = 0;

/**
 * Updates the weather for each frame.
 *
 * @method update
 */
var FOW_updweat = Weather.prototype.update;
Weather.prototype.update = function() {
//createでは不可能だったためupdateで色付けする
    if(FOWflag >= 1 && this.type !== 'none'){ 
    if($gameVariables.value(FOWfill) != 0){
      var Fill = $gameVariables.value(FOWfill);
     }else{
      var Fill = 'white';
     }
    if(FOWflag == 2){
      if(FOWfill2 > 0) var Fill = $gameVariables.value(FOWfill2);
    }else{
      if(FOWfill2 > 0) $gameVariables.setValue(FOWfill2, Fill);
    }
    this._rainBitmap.fillAll(Fill);
    this._stormBitmap.fillAll(Fill);
    this._snowBitmap.drawCircle(4, 4, 4, Fill);
    FOWflag = 0;
    }
   FOW_updweat.call(this);
};

    /**
 * @method _createBitmaps
 * @private
 */
Weather.prototype._createBitmaps = function() {
    this._rainBitmap = new Bitmap(1, 60);
    this._stormBitmap = new Bitmap(2, 100);
    this._snowBitmap = new Bitmap(9, 9);
    FOWflag = 2;
};

/**
 * @method _updateDimmer
 * @private
 */
Weather.prototype._updateDimmer = function() {
    if(FOWdimrate <= 0){
      this._dimmerSprite.opacity = Math.floor(this.power * 6);
    }else{
      this._dimmerSprite.opacity = Math.floor(this.power * $gameVariables.value(FOWdimrate));
    }
};

/**
 * @method _updateRainSprite
 * @param {Sprite} sprite
 * @private
 */
Weather.prototype._updateRainSprite = function(sprite) {
    sprite.bitmap = this._rainBitmap;
    sprite.rotation = Math.PI / 16;
    if($gameVariables.value(FOWoppo) < 0){
      sprite.ax += 6 * Math.sin(sprite.rotation);
      sprite.ay -= 6 * Math.cos(sprite.rotation);
    }else{
      sprite.ax -= 6 * Math.sin(sprite.rotation);
      sprite.ay += 6 * Math.cos(sprite.rotation);
    }
    sprite.opacity -= 6;
};

/**
 * @method _updateStormSprite
 * @param {Sprite} sprite
 * @private
 */
Weather.prototype._updateStormSprite = function(sprite) {
    sprite.bitmap = this._stormBitmap;
    sprite.rotation = Math.PI / 8;
    if($gameVariables.value(FOWoppo) < 0){
      sprite.ax += 8 * Math.sin(sprite.rotation);
      sprite.ay -= 8 * Math.cos(sprite.rotation);
    }else{
      sprite.ax -= 8 * Math.sin(sprite.rotation);
      sprite.ay += 8 * Math.cos(sprite.rotation);
    }
    sprite.opacity -= 8;
};

/**
 * @method _updateSnowSprite
 * @param {Sprite} sprite
 * @private
 */
Weather.prototype._updateSnowSprite = function(sprite) {
    sprite.bitmap = this._snowBitmap;
    sprite.rotation = Math.PI / 16;
    if($gameVariables.value(FOWoppo) < 0){
      sprite.ax += 3 * Math.sin(sprite.rotation);
      sprite.ay -= 3 * Math.cos(sprite.rotation);
    }else{
      sprite.ax -= 3 * Math.sin(sprite.rotation);
      sprite.ay += 3 * Math.cos(sprite.rotation);
    }
    sprite.opacity -= 3;
};

var _Game_Screen_changeWeather = Game_Screen.prototype.changeWeather;
Game_Screen.prototype.changeWeather = function(type, power, duration) {
    FOWflag = 1;
    _Game_Screen_changeWeather.call(this, type, power, duration);
};

//})();
