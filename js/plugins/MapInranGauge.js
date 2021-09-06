//=============================================================================
// InranGaugePlugin - マップ右上に淫乱ゲージ追加
// バージョン: 1.0.0
// 最終更新日: 2017/08/14
// 元コード製造元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
//=============================================================================
// Copyright (c) 2016 TRS
//=============================================================================

/*:
 * @plugindesc マップシーン右上に淫乱ゲージを表示します。
 **
 * @param gaugeWindowX
 * @desc 淫乱ゲージウィンドウのＸ座標
 * 初期値: 528
 * @default 528
 *
 * @param gaugeWindowY
 * @desc 淫乱ゲージウィンドウのＹ座標
 * 初期値: 0
 * @default 0
 *
 * @param gaugeWindowWidth
 * @desc 淫乱ゲージウィンドウの幅
 * 初期値: 288
 * @default 288
 *
 * @param gaugeWindowHeight
 * @desc 淫乱ゲージウィンドウの高さ
 * 初期値: 64
 * @default 64
 *
 * @param gaugeType
 * @desc ゲージのタイプ(コードの都合で残す)
 * 初期値: VN
 * @default VN
 *
 * @param gaugeX
 * @desc ゲージのＸ座標（ウィンドウ内の左端が 0 ）
 * 初期値: 12
 * @default 12
 *
 * @param gaugeY
 * @desc ゲージのＹ座標（ウィンドウ内の上端が 0 ）
 * 初期値: 12
 * @default 12
 *
 * @param gaugeWidth
 * @desc ゲージＡの長さ
 * 初期値: 144
 * @default 144
 *
 * @param gaugeHeight
 * @desc ゲージの表示領域（数値とゲージ合わせて）の高さ
 * 初期値: 36
 * @default 36
 *
 * @param gaugeFontSize
 * @desc ゲージのフォントサイズ
 * 初期値: 28
 * @default 28
 *
 * @param gaugeParam
 * @desc 現在値とするゲーム変数番号
 * 初期値: 0
 * @default 0
 *
 * @param gaugeMax
 * @desc 最大値とするゲーム変数番号
 * 初期値: 0
 * @default 0
 *
 * @param gaugeName
 * @desc ゲージのタイプが VN のときに表示するパラメータ名
 * 初期値: 淫乱
 * @default 淫乱
 *
 * @param gaugeColor
 * @desc ゲージＡのタイプが VN のときのゲージカラー
 * 初期値: #ff60c0 #ffa0e0
 * @default #ff60c0 #ffa0e0
 *
 * @param faceOffsetX
 * @desc 顔グラフィックのＸ座標補正値
 * 初期値: -4
 * @default -4
 *
 * @param faceOffsetY
 * @desc 顔グラフィックのＹ座標補正値
 * 初期値: -4
 * @default -4
 *
 * @param startVisible
 * @desc ゲーム開始時の表示状態
 * 初期値: 1（ 0 で非表示 / 1 で表示）
 * @default 1
 *
 * @param collideOpacity
 * @desc プレイヤーと重なったときの不透明度
 * 初期値: 128（ 0 ～ 255 ）
 * @default 128
 *
 * @param messageBusyHide
 * @desc メッセージウィンドウ表示中はログウィンドウを隠す
 * 初期値: 1（ 0 で隠さない / 1 で隠す）
 * @default 1
 *
 * @param eventBusyHide
 * @desc イベント起動中はログウィンドウを隠す
 * 初期値: 1（ 0 で隠さない / 1 で隠す）
 * @default 1
 *
 * @help
 * 使い方:
 *
 *   プラグインパラメータをいじってお好みのＨＰゲージを表示してください。
 *
 *   このプラグインは RPGツクールMV Version 1.3.0 で動作確認をしています。
 *
 *
 * プラグインコマンド:
 *
 *   showGauge
 *     ゲージを表示します。プラグインパラメータ startVisible が 0 の場合、
 *     このコマンドが実行されるまでゲージは表示されません。
 *
 *   hideGauge
 *     ゲージを隠します。showHpGauge コマンドが実行されるまで
 *     表示されないままです。
 *
 *
 */

var Imported = Imported || {};
Imported.MapInranGauge = true;

var TMPlugin = TMPlugin || {};
TMPlugin.MapGauge = {};
TMPlugin.MapGauge.Parameters = PluginManager.parameters('MapInranGauge');
TMPlugin.MapGauge.WindowX      = +(TMPlugin.MapGauge.Parameters['gaugeWindowX'] || 0);
TMPlugin.MapGauge.WindowY      = +(TMPlugin.MapGauge.Parameters['gaugeWindowY'] || 0);
TMPlugin.MapGauge.WindowWidth  = +(TMPlugin.MapGauge.Parameters['gaugeWindowWidth'] || 288);
TMPlugin.MapGauge.WindowHeight = +(TMPlugin.MapGauge.Parameters['gaugeWindowHeight'] || 64);
TMPlugin.MapGauge.GaugeA = {type: TMPlugin.MapGauge.Parameters['gaugeType'],
                              x: +(TMPlugin.MapGauge.Parameters['gaugeX'] || 12),
                              y: +(TMPlugin.MapGauge.Parameters['gaugeY'] || 12),
                              width: +(TMPlugin.MapGauge.Parameters['gaugeWidth'] || 144),
                              height: +(TMPlugin.MapGauge.Parameters['gaugeHeight'] || 36),
                              fontSize: +(TMPlugin.MapGauge.Parameters['gaugeFontSize'] || 28),
                              param: +(TMPlugin.MapGauge.Parameters['gaugeParam'] || 0),
                              max: +(TMPlugin.MapGauge.Parameters['gaugeMax'] || 0),
                              name: TMPlugin.MapGauge.Parameters['gaugeName'],
                              color: (TMPlugin.MapGauge.Parameters['gaugeColor'] || '#ff60c0 #ffa0e0').split(' ')};

TMPlugin.MapGauge.Gauges = [TMPlugin.MapGauge.GaugeA, TMPlugin.MapGauge.GaugeA, TMPlugin.MapGauge.GaugeA];
TMPlugin.MapGauge.FaceOffsetX     = +(TMPlugin.MapGauge.Parameters['faceOffsetX'] || -4);
TMPlugin.MapGauge.FaceOffsetY     = +(TMPlugin.MapGauge.Parameters['faceOffsetY'] || -4);
TMPlugin.MapGauge.CollideOpacity  = +(TMPlugin.MapGauge.Parameters['collideOpacity'] || 128);
TMPlugin.MapGauge.StartVisible    = TMPlugin.MapGauge.Parameters['startVisible'] === '1';
TMPlugin.MapGauge.MessageBusyHide = TMPlugin.MapGauge.Parameters['messageBusyHide'] === '1';
TMPlugin.MapGauge.EventBusyHide   = TMPlugin.MapGauge.Parameters['eventBusyHide'] === '1';

(function() {

  //-----------------------------------------------------------------------------
  // Game_System
  //

  Game_System.prototype.isVisibleMapEtcGauge = function() {
    if (this._visibleMapEtcGauge == null) {
      this._visibleMapEtcGauge = TMPlugin.MapGauge.StartVisible;
    }
    return this._visibleMapEtcGauge;
  };
  
  Game_System.prototype.setVisibleMapEtcGauge = function(flag) {
    this._visibleMapEtcGauge = flag;
  };

  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'showGauge') {
      $gameSystem.setVisibleMapEtcGauge(true);
    } else if (command === 'hideGauge') {
      $gameSystem.setVisibleMapEtcGauge(false);
    }
  };

  //-----------------------------------------------------------------------------
  // Window_MapEtcGauge(元の（TMMapHpGauge）」と共存できるように名前を変える)
  //

  function Window_MapEtcGauge() {
    this.initialize.apply(this, arguments);
  }

  Window_MapEtcGauge.prototype = Object.create(Window_Base.prototype);
  Window_MapEtcGauge.prototype.constructor = Window_MapEtcGauge;

  Window_MapEtcGauge.prototype.initialize = function() {
    var x      = TMPlugin.MapGauge.WindowX;
    var y      = TMPlugin.MapGauge.WindowY;
    var wight  = TMPlugin.MapGauge.WindowWidth;
    var height = TMPlugin.MapGauge.WindowHeight;
    Window_Base.prototype.initialize.call(this, x, y, wight, height);
    this.openness = $gameSystem.isVisibleMapEtcGauge() ? 255 : 0;
    this.opacity = 255;
    this.contentsOpacity = 255;
    this._gaugeParams = [];
    for (var i = 0; i < 1; i++) {
      var gaugeParam = {param: -1, max: -1};
      this._gaugeParams.push(gaugeParam);
    }
    this._icons = [];
    this._actorId = -1;
    this._shakeDuration = 0;
    this._baseX = x;
    this._needFaceRefresh = false;
    this._hideCount = 0;
    this.refresh();
  };

  Window_MapEtcGauge.prototype.lineHeight = function() {
    return this._lineHeight || 36;
  };

  // 標準パディングを取得
  Window_MapEtcGauge.prototype.standardPadding = function() {
    return 0;
  };

  // フレーム更新
  Window_MapEtcGauge.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (this.updateVisibility()) 
    {
    
      this.open();
      if (this._needFaceRefresh) this.refreshFace();
      var needRefresh = this.isNeedRefresh()
      if (needRefresh) 
      {
        var actor = $gameParty.leader();
        //if (needRefresh === 'SHAKE') this._shakeDuration = TMPlugin.MapGauge.ShakeTime;
        
        //gauge = TMPlugin.MapGauge.Gauges[0];
       // alert(gauge.type);
       //１ゲージのみになるため１回ループさせるだけに変更
	       for (var i = 0; i < 1; i++) 
	       {
	          var gauge = TMPlugin.MapGauge.Gauges[i];
	          if (gauge.type === 'HP') {
	            this._gaugeParams[i].param = actor.hp;
	            this._gaugeParams[i].max = actor.mhp;
	          } else if (gauge.type === 'MP') {
	            this._gaugeParams[i].param = actor.mp;
	            this._gaugeParams[i].max = actor.mmp;
	          } else if (gauge.type === 'TP') {
	            this._gaugeParams[i].param = actor.tp;
	            this._gaugeParams[i].max = actor.maxTp();
	          } else if (gauge.type === 'VN') {
	            this._gaugeParams[i].param = $gameVariables.value(gauge.param);
	            this._gaugeParams[i].max = $gameVariables.value(gauge.max);
	          }
	          
	        }
  
        this._icons = actor.stateIcons().concat(actor.buffIcons());
        this._actorId = actor.actorId();
        this.refresh();
      }
      //シェイク処理は無効化 
      /*
      if (this._shakeDuration > 0) 
      {
        this._shakeDuration--;
        this.x = this._baseX;
        if (this._shakeDuration > 0) 
        {
          this.x += Math.floor(Math.sin((this._shakeDuration % 10) * Math.PI / 5) * 8);
        }
      }*/
      this.updateOpacity();
    }
    else 
    {
      this.close();
    }
  };

  Window_MapEtcGauge.prototype.updateVisibility = function() {
    if (!$gameSystem.isVisibleMapEtcGauge()) return false;
    if ((TMPlugin.MapGauge.EventBusyHide && $gameMap.isEventRunning()) ||
        (TMPlugin.MapGauge.MessageBusyHide && $gameMessage.isBusy())) {
      this._hideCount++;
    } else {
      this._hideCount = 0;
    }
    return this._hideCount < 10 && $gameParty.leader();
  };

  // リフレッシュが必要かどうかを返す
  Window_MapEtcGauge.prototype.isNeedRefresh = function() {
    var actor = $gameParty.leader();
    if (actor) {
      if (this._actorId !== actor.actorId()) return true;
      
      //1ゲージだから１ループのみ
      for (var i = 0; i < 1; i++) 
      {
        var gauge = TMPlugin.MapGauge.Gauges[i];
        var gaugeParam = this._gaugeParams[i];
        if (gauge.type === 'HP') {
          if (gaugeParam.param !== actor.hp || gaugeParam.max !== actor.mhp) {
            return gaugeParam.param > actor.hp ? 'SHAKE' : true;
          }
        } else if (gauge.type === 'MP') {
          if (gaugeParam.param !== actor.mp || gaugeParam.max !== actor.mmp) {
            return true;
          }
        } else if (gauge.type === 'TP') {
          if (gaugeParam.param !== actor.tp || gaugeParam.max !== actor.maxTp()) {
            return true;
          }
        } else if (gauge.type === 'VN') {
          if (gaugeParam.param !== $gameVariables.value(gauge.param) ||
              gaugeParam.max !== $gameVariables.value(gauge.max)) {
            return true;
          }
        }
      }
      
      /*ステータスアイコン表示機能は未使用*/
      
      /*if (TMPlugin.MapGauge.StateIconMax > 0) {
        var icons = actor.stateIcons().concat(actor.buffIcons());
        if (this._icons.toString() !== icons.toString()) return true;
      }
      */
    }
    return false;
  };

  // 不透明度の更新
  Window_MapEtcGauge.prototype.updateOpacity = function() {
    if (this.x < $gamePlayer.screenX() + 24 &&
        this.x + TMPlugin.MapGauge.WindowWidth > $gamePlayer.screenX() - 24 &&
        this.y < $gamePlayer.screenY() &&
        this.y + TMPlugin.MapGauge.WindowHeight > $gamePlayer.screenY() - 48) {
      this.opacity = TMPlugin.MapGauge.CollideOpacity;
    } else {
      this.opacity = 255;
    }
    this.contentsOpacity = this.opacity;
  };

  // リフレッシュ
  Window_MapEtcGauge.prototype.refresh = function() {
    this.contents.clear();
    var actor = $gameParty.leader();
    if (actor) {
      this.refreshFace();
      
      //1ゲージだから１ループのみ
      for (var i = 0; i < 1; i++) 
      {
        var gauge = TMPlugin.MapGauge.Gauges[i];
        this._lineHeight = gauge.height;
        this.contents.fontSize = gauge.fontSize;
        if (gauge.type === 'HP') {
          this.drawActorHp(actor, gauge.x, gauge.y, gauge.width);
        } else if (gauge.type === 'MP') {
          this.drawActorMp(actor, gauge.x, gauge.y, gauge.width);
        } else if (gauge.type === 'TP') {
          this.drawActorTp(actor, gauge.x, gauge.y, gauge.width);
        } else if (gauge.type === 'VN') 
        {
          var rate = this._gaugeParams[i].max === 0 ? 0 :
                     this._gaugeParams[i].param / this._gaugeParams[i].max;
          var color1 = gauge.color[0];
          var color2 = gauge.color[1];
          //alert("ゲージX=" + gauge.x + " ゲージY=" + gauge.y);
          this.drawGauge(gauge.x, gauge.y, gauge.width, rate, color1, color2);
          this.changeTextColor(this.systemColor());
          this.drawText(gauge.name, gauge.x, gauge.y, 44);
          this.changeTextColor(this.normalColor());
          this.drawText(this._gaugeParams[i].param, gauge.x + gauge.width - 64,
                        gauge.y, 64, 'right');
         
        }
      }
      
      //ステートアイコンは不要なので書かない
      //for (var i = 0; i < TMPlugin.MapGauge.StateIconMax; i++) 
      //{
      //  if (!this._icons[i]) break;
      //  var x = TMPlugin.MapGauge.StateIconX + i * Window_Base._iconWidth;
      //  this.drawIcon(this._icons[i], x, TMPlugin.MapGauge.StateIconY);
      //}
      
      
      this._lineHeight = 36;
    }
  };
  
  Window_MapEtcGauge.prototype.refreshFace = function() {
    var x = TMPlugin.MapGauge.WindowWidth - 144 + TMPlugin.MapGauge.FaceOffsetX;
    var y = TMPlugin.MapGauge.FaceOffsetY;
    var height = Math.min(TMPlugin.MapGauge.WindowHeight, 144);
    var actor = $gameParty.leader();
    this.drawFace(actor._faceName, actor._faceIndex, x, y, 144, height);
  };

  Window_MapEtcGauge.prototype.drawFace = function(faceName, faceIndex, x, y, width, height) {
    var bitmap = ImageManager.loadFace(faceName);
    if (bitmap.width === 0) {
      this._needFaceRefresh = true;
      return;
    }
    width = width || Window_Base._faceWidth;
    height = height || Window_Base._faceHeight;
    var pw = Window_Base._faceWidth;
    var ph = Window_Base._faceHeight;
    var sw = Math.min(width, pw);
    var sh = Math.min(height, ph);
    var dx = Math.floor(x + Math.max(width - pw, 0) / 2);
    var dy = Math.floor(y + Math.max(height - ph, 0) / 2);
    var sx = faceIndex % 4 * pw + (pw - sw) / 2;
    var sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
    this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy);
    this._needFaceRefresh = false;
  };

  //-----------------------------------------------------------------------------
  // Scene_Map
  //

  var _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
  Scene_Map.prototype.createDisplayObjects = function() {
    _Scene_Map_createDisplayObjects.call(this);
    this.createMapEtcGaugeWindow();
  };

  // HPゲージウィンドウの作成
  Scene_Map.prototype.createMapEtcGaugeWindow = function() {
    this._mapHpGaugeWindow = new Window_MapEtcGauge();
    this.addChild(this._mapHpGaugeWindow);
  };

  var _Scene_Map_terminate = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function() {
    if (!SceneManager.isNextScene(Scene_Battle)) {
      this._mapHpGaugeWindow.hide();
    }
    _Scene_Map_terminate.call(this);
  };
  
  var _Scene_Map_launchBattle = Scene_Map.prototype.launchBattle;
  Scene_Map.prototype.launchBattle = function() {
    this._mapHpGaugeWindow.hide();
    this.removeChild(this._mapHpGaugeWindow);
    this._mapHpGaugeWindow = null;
    _Scene_Map_launchBattle.call(this);
  };
  
})();