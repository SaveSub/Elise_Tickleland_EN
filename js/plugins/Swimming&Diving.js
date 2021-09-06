//=============================================================================
// Swimming&Diving.js
// by Tsukimi
// Last Updated: 2017.11.21
//=============================================================================


/*:
 * @plugindesc Swimming and diving System
 * @author Tsukimi
 * 
 * @param diving/surface Region 1
 * @desc diving/surface Region 1 (0 = don't use)
 * @type number
 * @min 0
 * @max 255
 * @default 21
 * 
 * @param diving/surface Region 2
 * @desc diving/surface Region 2 (0 = don't use)
 * @type number
 * @min 0
 * @max 255
 * @default 22
 * 
 * @param diving/surface Region 3
 * @desc diving/surface Region 3 (0 = don't use)
 * @type number
 * @min 0
 * @max 255
 * @default 23
 * 
 * @param diving/surface Region 4
 * @desc diving/surface Region 4 (0 = don't use)
 * @type number
 * @min 0
 * @max 255
 * @default 0
 * 
 * @param diving/surface Region 5
 * @desc diving/surface Region 5 (0 = don't use)
 * @type number
 * @min 0
 * @max 255
 * @default 0
 * @param diving/surface Region 6
 * @desc diving/surface Region 6 (0 = don't use)
 * @type number
 * @min 0
 * @max 255
 * @default 0
 * 
 * @param diving/surface Region 7
 * @desc diving/surface Region 7 (0 = don't use)
 * @type number
 * @min 0
 * @max 255
 * @default 0
 * @param diving/surface Region 8
 * @desc diving/surface Region 8 (0 = don't use)
 * @type number
 * @min 0
 * @max 255
 * @default 0
 * 
 * @param diving/surface Region 9
 * @desc diving/surface Region 9 (0 = don't use)
 * @type number
 * @min 0
 * @max 255
 * @default 0
 *
 * @help
 *
 * Plugin Command:
 */


/*:ja
 * @plugindesc 遊泳＆ダイビング　システム
 * @author ツキミ
 * 
 * @param 選択肢自動表示
 * @desc 条件が満たされると選択肢を自動表示するかどうか。
 * スイッチによる制御も可能。　記入例：true / false / 12
 * @default true
 * 
 * @param 水中減速
 * @desc 水の抵抗力による減速（デフォルト移動速度は4）
 * @type number
 * @min 0
 * @max 2
 * @decimals 1
 * @default 0.3
 * 
 * @param 水面歩行画像変更
 * @desc 水面にいる時に自動で 「元ファイル名_swim」の画像に変更
 * 例：actor.png→ actor_swim.png　※フォロワーにも有効
 * @type boolean
 * @default false
 * 
 * @param 水中歩行画像変更
 * @desc 水中にいる時に自動で 「元ファイル名_swim」の画像に変更
 * 例：actor.png→ actor_swim.png　※フォロワーにも有効
 * @type boolean
 * @default false
 * 
 * @param ------- 選択肢の文字列 設定
 * @desc 
 *
 * @param 「水の中に入る」選択肢の文字列
 * @desc 「水の中に入る」選択肢の文字列
 * @default 　水の中に入る　
 *
 * @param 「水の中から出る」選択肢の文字列
 * @desc 「水の中から出る」選択肢の文字列
 * @default 　水の中から出る　
 *
 * @param 「潜る」選択肢の文字列
 * @desc 「潜る」選択肢の文字列
 * @default 　潜る　
 *
 * @param 「浮上する」選択肢の文字列
 * @desc 「浮上する」選択肢の文字列
 * @default 　浮上する　
 *
 * @param 「何もしない」選択肢の文字列
 * @desc 「何もしない」選択肢の文字列
 * @default 　何もしない　
 * 
 * @param ------- SE 設定
 * @desc 
 * 
 * @param 水面に入るSE
 * @desc 水の中に入るSE (.ogg, .m4a ←不要)
 * 「,」で区切ってピッチも指定可能
 * @default Dive
 * 
 * @param 水面から出るSE
 * @desc 水面から出る入るSE (.ogg, .m4a ←不要)
 * 「,」で区切ってピッチも指定可能
 * @default Water1
 * 
 * @param 潜る/浮上するSE
 * @desc 潜る/浮上するSE (.ogg, .m4a ←不要)
 * 「,」で区切ってピッチも指定可能
 * @default Water2,75
 * 
 * @param ------- リージョンID 設定
 * @desc 
 * 
 * @param 潜る/浮上するリージョンID 1
 * @desc 潜る/浮上することを触発するリージョンID 1 (0 = 不使用)
 * @type number
 * @min 0
 * @max 255
 * @default 21
 * 
 * @param 潜る/浮上するリージョンID 2
 * @desc 潜る/浮上することを触発するリージョンID 2 (0 = 不使用)
 * @type number
 * @min 0
 * @max 255
 * @default 22
 * 
 * @param 潜る/浮上するリージョンID 3
 * @desc 潜る/浮上することを触発するリージョンID 3 (0 = 不使用)
 * @type number
 * @min 0
 * @max 255
 * @default 23
 * 
 * @param 潜る/浮上するリージョンID 4
 * @desc 潜る/浮上することを触発するリージョンID 4 (0 = 不使用)
 * @type number
 * @min 0
 * @max 255
 * @default 0
 * 
 * @param 潜る/浮上するリージョンID 5
 * @desc 潜る/浮上することを触発するリージョンID 5 (0 = 不使用)
 * @type number
 * @min 0
 * @max 255
 * @default 0
 * 
 * @param 潜る/浮上するリージョンID 6
 * @desc 潜る/浮上することを触発するリージョンID 6 (0 = 不使用)
 * @type number
 * @min 0
 * @max 255
 * @default 0
 * 
 * @param 潜る/浮上するリージョンID 7
 * @desc 潜る/浮上することを触発するリージョンID 7 (0 = 不使用)
 * @type number
 * @min 0
 * @max 255
 * @default 0
 * 
 * @param 潜る/浮上するリージョンID 8
 * @desc 潜る/浮上することを触発するリージョンID 8 (0 = 不使用)
 * @type number
 * @min 0
 * @max 255
 * @default 0
 * 
 * @param 潜る/浮上するリージョンID 9
 * @desc 潜る/浮上することを触発するリージョンID 9 (0 = 不使用)
 * @type number
 * @min 0
 * @max 255
 * @default 0
 *
 * @param ------- 詳細設定
 * @desc 
 * 
 * @param 水面強制通行リージョンID
 * @desc カスタマイズ用、強制通行リージョンID (0 = 不使用)
 * 「,」区切りで複数入力可能
 * @default 0
 * 
 * @param 水面下部分の透明度
 * @desc 水上にいる時、下半身の透明度
 * @type number
 * @min 0
 * @max 255
 * @default 96
 * 
 * @param 水面下部分の高さ
 * @desc 水面にいる時、半透明になる部分の高さ
 * @type number
 * @min 0
 * @default 20
 * 
 *
 * @help
 *
 * Swimming&Diving.js 遊泳＆ダイビング システム
 * 
 * 遊泳の通行可タイルは基本的に乗り物の船と同じですが、
 * マップ設計の自由度を増やすために、強制通行リージョンを敷くと
 * 無理矢理通れます。
 * ただし、イベントの衝突判定は行われています。
 * 
 * 
 * 潜る/浮上の転送先の指定方法：
 * 　マップのメモに
 * 　<Dive"リージョンID":"マップID","マップX","マップY"(,"向き")>
 * 　<Surface"リージョンID":"マップID","マップX","マップY"(,"向き")>
 * 　お置く。
 * 　　　例：
 * 　　　<Dive23:16,34,25>
 *         - リージョン23で決定キーを押すと、ダイビングで マップ16の(34,25)に転送する
 * 　　　<Surface21:5,15,23,2>
 *         - リージョン21で決定キーを押すと、浮上で マップ5の(15,23)に転送する、向きは下
 * 
 * 
 * 水上イベント
 * 　イベントの移動範囲を水上に制限する（陸上に上がれない）
 *  イベントのメモに<Swimming>を置く
 * 　　　例：
 * 　　　　<Swimming>
 * 
 * 
 * 
 * プラグインコマンド:
 * 　testSwim
 * 　　このコマンドを実行すると、水の中に入れるか/水から出れるかの判定を行い、
 * 　　できる場合はその行動を実行します。
 * 　　　例：testSwim
 * 　　　
 * 　testDive
 * 　　このコマンドを実行すると、この位置で潜れるか/浮上できるかの判定を行い、
 * 　　できる場合はその行動を実行します。
 * 　　　例：testDive
 * 　　　
 * 　testSwimDive
 * 　　上述の両者を同時に判定し、実行可能の行動が片方だけの場合、その片方
 * 　　の行動を実行します。
 * 　　両方実行可能の場合は選択肢を出します。
 * 　　　例：testSwimDive
 * 　　　
 * 　askSwimDive
 * 　　上のコマンドとほぼ同じですが、行動する前に必ず選択肢を出します。
 * 　　　例：askSwimDive
 * 
 * 　forceWaterLayer [数字]
 * 　　水の深度を強制設定します。
 * 　　water Layer：地面は０，水面は１、潜る度に１増えます
 * 　　テレポートなどの時に使用してください。
 * 　　　例：forceWaterLayer 0
 * 
 * -----------------
 * オススメ併用プラグイン：KMS_WaterMapEffect　（水中のエフェクト）
 * 
 */

var Imported = Imported || {};
Imported.TKM_Swimming = true;
var $TKMvar = $TKMvar || {};
$TKMvar.swimming = {};

(function() {
    
    var pluginName = 'Swimming&Diving';
    var getParam = function(paramNames) {
        if (!Array.isArray(paramNames)) paramNames = [paramNames];
        for (var i = 0; i < paramNames.length; i++) {
            var name = PluginManager.parameters(pluginName)[paramNames[i]];
            if (name) return name;
        }
        return null;
    };
    
    $TKMvar.swimming.diveRegionID = [];
    // PARAMETER
    var parameters = PluginManager.parameters(pluginName);
    var temp = 0;
    for(var i = 1; i <= 9; i++) {
        temp = Number( getParam(['diving/surface Region '+i, '潜る/浮上するリージョンID '+i]) ) || 0;
        if(temp !== 0) $TKMvar.swimming.diveRegionID.push(temp);
    }
    
    temp = getParam(['水面に入るSE']); temp = temp.split(',');
    $TKMvar.swimming.inPoolSE = {};
    $TKMvar.swimming.inPoolSE.pitch = ( temp.length === 1 ? 100 : Number(temp.pop()) ).clamp(50, 150);
    $TKMvar.swimming.inPoolSE.se = temp.join('');
    
    temp = getParam(['水面から出るSE']); temp = temp.split(',');
    $TKMvar.swimming.outPoolSE = {};
    $TKMvar.swimming.outPoolSE.pitch = temp.length === 1 ? 100 : Number(temp.pop());
    $TKMvar.swimming.outPoolSE.se = temp.join('');
    
    temp = getParam(['潜る/浮上するSE']); temp = temp.split(',');
    $TKMvar.swimming.diveSE = {};
    $TKMvar.swimming.diveSE.pitch = temp.length === 1 ? 100 : Number(temp.pop());
    $TKMvar.swimming.diveSE.se = temp.join('');
    
    $TKMvar.swimming.charString = {};
    $TKMvar.swimming.charString.inWater  = getParam(['「水の中に入る」選択肢の文字列']);
    $TKMvar.swimming.charString.outWater = getParam(['「水の中から出る」選択肢の文字列']);
    $TKMvar.swimming.charString.dive     = getParam(['「潜る」選択肢の文字列']);
    $TKMvar.swimming.charString.surface  = getParam(['「浮上する」選択肢の文字列']);
    $TKMvar.swimming.charString.nothing  = getParam(['「何もしない」選択肢の文字列']);
    
    $TKMvar.swimming.forceThroughID = new Set();
    var temp = getParam(['水面強制通行リージョンID']) .split(',');
    for(var i = 0; i < temp.length; i++) {
        var num = Number( temp[i] );
        if(num) $TKMvar.swimming.forceThroughID.add(num);
    }
    
    $TKMvar.swimming.autoAsk = getParam(['選択肢自動表示']);
    
    var doAutoAsk = function (ask) {
        if(ask === "true") return true;
        if(ask === "false") return false;
        return $gameSwitches.value(Number(ask) || 1);
    };
    
    $TKMvar.swimming.slowMove = Number( getParam(['水中減速']) ) || 0;
    
    $TKMvar.swimming.autoImgOnWater = getParam(['水面歩行画像変更']) === "true" ? true : false;
    $TKMvar.swimming.autoImgInWater = getParam(['水中歩行画像変更']) === "true" ? true : false;
    
    temp = Number( getParam(['水面下部分の透明度']) );
    $TKMvar.swimming.lowerBodyOpacity = isNaN(temp) ? 32 : temp;
    
    temp = Number( getParam(['水面下部分の高さ']) );
    $TKMvar.swimming.lowerBodyHeight = isNaN(temp) ? 20 : temp;
    
    
    // PLUGIN COMMAND
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);

        if (command.toUpperCase() === 'TESTSWIM') {
            $gamePlayer.testSwim();
        }
        else if (command.toUpperCase() === 'TESTDIVE') {
            $gamePlayer.testDive();
        }
        else if (command.toUpperCase() === 'TESTSWIMDIVE') {

            var pool = false, dive = false;

            if(!$gamePlayer.isSwimming() || $gamePlayer._waterLayer === 0) { // 水の中に入る？
                if( !!$gamePlayer.isJumpIntoWaterOk() ) {
                    pool = true;
                }
            }
            else if($gamePlayer._waterLayer === 1) {
                if( !!$gamePlayer.isGetupFromWaterOk() ) { // 水の中から出る？
                    pool = true;
                }
            }
            
            var divingInfo = $gamePlayer.isGetDivingInfoOk();
            if(!!divingInfo) { // 潜る/浮上する？
                dive = true;
            }
            
            if(pool && dive) $gameMap.askSwimDive();
            else if(pool) $gamePlayer.testSwim();
            else if(dive) $gamePlayer.justDiveTo(divingInfo);

        }
        else if(command.toUpperCase() === 'ASKSWIMDIVE') {
            $gameMap.askSwimDive();
        }
        else if(command.toUpperCase() === 'FORCEWATERLAYER') {
            var waterLayer = Number(args[0]);
            if(!isNaN(waterLayer) && waterLayer >= 0) {
                $gamePlayer._waterLayer = waterLayer;
                if(waterLayer === 0) $gamePlayer._isSwimming = false;
                else $gamePlayer._isSwimming = true;
                $gamePlayer.refreshBushDepth();
            }
        }
    };
    
    // 便利な機能
    var _Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
    Game_CharacterBase.prototype.initMembers = function() {
        _Game_CharacterBase_initMembers.apply(this, arguments);
        this._fadingAdd = 0;
    };
    
    Game_CharacterBase.prototype.fadeOut = function(fadeSpeed) {
        this._fadingAdd = -fadeSpeed;
    };
    
    Game_CharacterBase.prototype.fadeIn = function(fadeSpeed) {
        this._fadingAdd = fadeSpeed;
    };
    
    var _Game_CharacterBase_update = Game_CharacterBase.prototype.update;
    Game_CharacterBase.prototype.update = function() {
        _Game_CharacterBase_update.apply(this, arguments);
        this.updateFade();
    };
    
    Game_CharacterBase.prototype.updateFade = function() {
        this._opacity = (this._opacity + this._fadingAdd).clamp(0, 255);
        if(this._opacity === 0 || this._opacity === 255) this._fadingAdd = 0;
    };
    
    Game_CharacterBase.prototype.isFading = function() {
        return (this._fadingAdd === 0);
    };
    
    // キャラが水中にいるときの表現設定
    
    var _Game_Character_initMembers = Game_Character.prototype.initMembers;
    Game_Character.prototype.initMembers = function() {
        _Game_Character_initMembers.apply(this, arguments);
        this._isSwimming = false;
        this._waterLayer = 0;
    };
    
    Game_Character.prototype.isSwimming = function() {
        return this._isSwimming;
    };
    
    Game_Character.prototype.refreshBushDepth = function() {
        Game_CharacterBase.prototype.refreshBushDepth.apply(this, arguments);
        if(!!this.isSwimming() && this._waterLayer === 1) {
            this._bushDepth = $TKMvar.swimming.lowerBodyHeight;
        }
    };
    
    Game_Character.prototype.isMapPassable = function(x, y, d) {
        var result = Game_CharacterBase.prototype.isMapPassable.apply(this, arguments);
        if(!!this.isSwimming() && this._waterLayer === 1) {
            var x2 = $gameMap.roundXWithDirection(x, d);
            var y2 = $gameMap.roundYWithDirection(y, d);
            var forceThroughOK = $TKMvar.swimming.forceThroughID.has($gameMap.regionId(x2, y2)) && (!this.isCollidedWithCharacters(x2, y2));
            return $gameMap.isBoatPassable(x2, y2) ||  forceThroughOK;
        }
        return result;
    };
    
    var _Game_Event_initialize = Game_Event.prototype.initialize;
    Game_Event.prototype.initialize = function() {
        _Game_Event_initialize.apply(this, arguments);
        if(this._mapId === $gameMap.mapId()) {
            if(!!$dataMap.events[this._eventId].meta["Swimming"]) {
                this._isSwimming = true;
                this._waterLayer = 1;
                this.refreshBushDepth();
            }
        }
    }
    
    // 水の抵抗力
    Game_Character.prototype.realMoveSpeed = function() {
        var result = Game_CharacterBase.prototype.realMoveSpeed.apply(this, arguments);
        return result - (!!this.isSwimming() ? $TKMvar.swimming.slowMove : 0);
    };
    
    var _Sprite_Character_createHalfBodySprites = Sprite_Character.prototype.createHalfBodySprites;
    Sprite_Character.prototype.createHalfBodySprites = function() {
        _Sprite_Character_createHalfBodySprites.apply(this, arguments);
        if(this._character._waterLayer === 1 && !!this._lowerBody) this._lowerBody.opacity = $TKMvar.swimming.lowerBodyOpacity;
    };
    
    // 自動メッセージ
    var _Game_Player_triggerButtonAction = Game_Player.prototype.triggerButtonAction;
    Game_Player.prototype.triggerButtonAction = function() {
        if( _Game_Player_triggerButtonAction.apply(this, arguments) ) return true;
        if( Input.isTriggered('ok') && doAutoAsk($TKMvar.swimming.autoAsk) ) {
            if( $gameMap.askSwimDive() ) {
                return true;
            } 
        }
        return false;
    };
    
    var _Game_Player_triggerTouchActionD1 = Game_Player.prototype.triggerTouchActionD1;
    Game_Player.prototype.triggerTouchActionD1 = function() {
        if( _Game_Player_triggerTouchActionD1.apply(this, arguments) ) return true;
        if ( TouchInput.isTriggered() && doAutoAsk($TKMvar.swimming.autoAsk) ) {
            if( $gameMap.askSwimDive() ) {
                return true;
            } 
        }
        return false;
    };
    
    var _Game_Player_triggerTouchActionD2 = Game_Player.prototype.triggerTouchActionD2;
    Game_Player.prototype.triggerTouchActionD2 = function() {
        if( _Game_Player_triggerTouchActionD2.apply(this, arguments) ) return true;
        if ( TouchInput.isTriggered() && doAutoAsk($TKMvar.swimming.autoAsk) ) {
            if( $gameMap.askSwimDive() ) {
                return true;
            } 
        }
        return false;
    };
    
    // プレイヤー、フォロワー画像変更
    
    Game_Player.prototype.characterName = function() {
        var result = Game_CharacterBase.prototype.characterName.apply(this, arguments);
        var needChange = this.isSwimming() && ( ($TKMvar.swimming.autoImgOnWater && this._waterLayer === 1) || ($TKMvar.swimming.autoImgInWater && this._waterLayer > 1) );
        if(needChange && result !== "") result = result + "_swim";
        return result;
    };
    
    Game_Follower.prototype.characterName = function() {
        var result = Game_CharacterBase.prototype.characterName.apply(this, arguments);
        var needChange = this.isSwimming() && ( ($TKMvar.swimming.autoImgOnWater && this._waterLayer === 1) || ($TKMvar.swimming.autoImgInWater && this._waterLayer > 1) );
        if(needChange && result !== "") result = result + "_swim";
        return result;
    };
    
    Game_Follower.prototype.isSwimming = function() {
        return $gamePlayer.isSwimming();
    };
    
    var _Game_Follower_update = Game_Follower.prototype.update;
    Game_Follower.prototype.update = function() {
        _Game_Follower_update.apply(this, arguments);
        if(this._waterLayer !== $gamePlayer._waterLayer) {
            this._isSwimming = $gamePlayer.isSwimming();
            this._waterLayer = $gamePlayer._waterLayer;
            this.refreshBushDepth();
        }
    }
    // フォロワーのrealMoveSpeed は $gamPlayer.realMoveSpeed() - 0.3 - 0.3 と二重減速しちゃったので、
    // 修正
    Game_Follower.prototype.realMoveSpeed = function() {
        return this._moveSpeed;
    }
    
    //プレイヤーが水に飛び込む、水中に潜る、浮上する　など
    
    Game_Player.prototype.testSwim = function() {
        var d = this.direction();
        var jumpX = d === 6 ? 1 : d === 4 ? -1 : 0;
        var jumpY = d === 2 ? 1 : d === 8 ? -1 : 0;
        
        if(!this.isSwimming() || this._waterLayer === 0) {
            if( !this.isJumpIntoWaterOk() ) {
                return false;
            }
            var se = $TKMvar.swimming.inPoolSE.se;
            var pitch = $TKMvar.swimming.inPoolSE.pitch;
            var list = [{"code":205,"indent":0,"parameters":[-1,{"list":[{"code":14,"parameters":[jumpX,jumpY],"indent":null},{"code":44,"parameters":[{"name":se,"volume":90,"pitch":pitch,"pan":0}],"indent":null},{"code":45,"parameters":["this._isSwimming = true; this._waterLayer = 1; this.refreshBushDepth();"],"indent":null},{"code":0}],"repeat":false,"skippable":false,"wait":true}]}];
                                                                 
            if(!!$gameMap._interpreter.isRunning()) {
                var int = $gameMap._interpreter;
                while(!!int._childInterpreter) int = int._childInterpreter;
                int.setupChild(list, 0);
            }
            else {
                $gameMap._interpreter.setup(list, 0);
            }
            return true;
        }
        else if(this._waterLayer === 1) {
            if( !this.isGetupFromWaterOk() ) {
                return false;
            }
            
            var se = $TKMvar.swimming.outPoolSE.se;
            var pitch = $TKMvar.swimming.outPoolSE.pitch;
            var list = [{"code":205,"indent":0,"parameters":[-1,{"list":[{"code":44,"parameters":[{"name":se,"volume":90,"pitch":pitch,"pan":0}],"indent":null},{"code":45,"parameters":["this._isSwimming = false; this._waterLayer = 0; this.refreshBushDepth();"],"indent":null},{"code":14,"parameters":[jumpX,jumpY],"indent":null},{"code":0}],"repeat":false,"skippable":false,"wait":true}]}];
                                                                 
            if(!!$gameMap._interpreter.isRunning()) {
                var int = $gameMap._interpreter;
                while(!!int._childInterpreter) int = int._childInterpreter;
                int.setupChild(list, 0);
            }
            else {
                $gameMap._interpreter.setup(list, 0);
            }
            return true;
        }
        
    };
    
    Game_Player.prototype.testDive = function() {
        var info = this.isGetDivingInfoOk();
        if(!!info) this.justDiveTo(info);
    };
    
    Game_Player.prototype.justDiveTo = function(info) {
        
        var isSurfacing = info.isSurfacing;
        var dest = info.dest;
        if(dest.length <=3) dest.push(0);
        
        var se = $TKMvar.swimming.diveSE.se;
        var pitch = $TKMvar.swimming.diveSE.pitch;
        
        var list = []; // diving event page
        this.diveHideFollowers(list);
        //play SE
        list.push( {"code":250,"indent":0,"parameters":[{"name":se,"volume":90,"pitch":pitch,"pan":0}]} );
        list.push( {"code":355,"indent":0,"parameters":["$gamePlayer._stopScroll = true;"]} );
        // diving Effect
        if(!isSurfacing && this._waterLayer !== 1) list.push( {"code":355,"indent":0,"parameters":["$gamePlayer._y += 2.5; $gamePlayer.resetStopCount(); $gamePlayer.fadeOut(10);"]} );
        else if(isSurfacing) list.push( {"code":355,"indent":0,"parameters":["$gamePlayer._y -= 2.5; $gamePlayer.resetStopCount(); $gamePlayer.fadeOut(10);"]} );
            
        list.push( {"code":221,"indent":0,"parameters":[]} ); // Screen fade Out
        list.push( {"code":355,"indent":0,"parameters":["$gamePlayer._opacity = 0;"]} );
        list.push( {"code":201,"indent":0,"parameters":[0,dest[0],dest[1],dest[2],dest[3],0]} ); // trasfer
        list.push( {"code":230,"indent":0,"parameters":[15]} ); // wait
        if(isSurfacing && this._waterLayer === 2) {
            var sePlayed2 = true;
            list.push( {"code":355,"indent":0,"parameters":["$gamePlayer._opacity = 255; $gamePlayer._waterLayer -= 1; $gamePlayer.refreshBushDepth(); $gamePlayer._stopScroll = false;"]} ); // special up to water Surface
            list.push( {"code":250,"indent":0,"parameters":[{"name":se,"volume":90,"pitch":pitch,"pan":0}]} ); // play SE again
            this.diveShowFollowers(list);
        }
        list.push( {"code":222,"indent":0,"parameters":[]} ); // Screen fade In
        
        
        if(!sePlayed2) list.push( {"code":250,"indent":0,"parameters":[{"name":se,"volume":90,"pitch":pitch,"pan":0}]} ); // play SE again
            
        if(!isSurfacing) {
            
            list.push( {"code":205,"indent":0,"parameters":[-1,{"list":[{"code":45,"parameters":["this.fadeIn(6); this._realY -= 2; this.resetStopCount(); this._waterLayer += 1; this.refreshBushDepth();"],"indent":null},{"code":45,"parameters":["this._stopScroll = false"]},{"code":0}],"repeat":false,"skippable":false,"wait":true}]} );
        } 
        else if(isSurfacing && this._waterLayer !== 2) {
            list.push( {"code":205,"indent":0,"parameters":[-1,{"list":[{"code":45,"parameters":["this.fadeIn(6); this._realY += 2; this.resetStopCount(); this._waterLayer -= 1; this.refreshBushDepth();"],"indent":null},{"code":45,"parameters":["this._stopScroll = false"]},{"code":0}],"repeat":false,"skippable":false,"wait":true}]} );
        }
        this.diveShowFollowers(list);
            
        // run
        if(!!$gameMap._interpreter.isRunning()) {
                var int = $gameMap._interpreter;
                while(!!int._childInterpreter) int = int._childInterpreter;
                int.setupChild(list, 0);
        }
        else {
            $gameMap._interpreter.setup(list, 0);
        }
    };
    
    Game_Player.prototype.isGetDivingInfoOk = function() {
        // check if is swimming
        if(!this.isSwimming() || this._waterLayer <= 0) return false;
        
        // check if region setted
        var x = this.x;
        var y = this.y;
        var Rid = $gameMap.regionId(x, y);
        
        var match = 0;
        for(var i = 0; i < $TKMvar.swimming.diveRegionID.length; i++) {
            if(Rid === $TKMvar.swimming.diveRegionID[i]) { match = Rid; break; }
        }
        if(!match) return false; 
        
        // check if tag set
        if(!!$dataMap && (!!$dataMap.meta["Dive"+match] || !!$dataMap.meta["Surface"+match]) ) {
            var isSurfacing = false;
            var dest;
            if(!!$dataMap.meta["Surface"+match]) {
                isSurfacing = true;
                dest = $dataMap.meta["Surface"+match];
            }
            else dest = $dataMap.meta["Dive"+match];
            
            if(typeof(dest) === "boolean") return false;
            
            // can't surface at the surface of water
            if(isSurfacing && this._waterLayer === 1) return false;
            
            dest = dest.split(',');
            for(var i = 0; i < dest.length; i++) dest[i] = Number(dest[i]) || 0;
            
            var returnObject = {"isSurfacing": isSurfacing, "dest": dest};
            
            return returnObject;
            
        }
        else return false;
    };
    
    Game_Player.prototype.isJumpIntoWaterOk = function() {
        var x = this.x;
        var y = this.y;
        var d = this.direction();
        
        var x2 = $gameMap.roundXWithDirection(x, d);
        var y2 = $gameMap.roundYWithDirection(y, d);
        var forceThroughOK = $TKMvar.swimming.forceThroughID.has($gameMap.regionId(x2, y2));
        
        if (!$gameMap.isValid(x2, y2)) {
            return false;
        }
        if (!$gameMap.isBoatPassable(x2, y2) && !forceThroughOK) {
            return false;
        }
        if (this.isCollidedWithCharacters(x2, y2)) {
            return false;
        }
        return true;
    };
    
    Game_Player.prototype.isGetupFromWaterOk = function() {
        var x = this.x;
        var y = this.y;
        var d = this.direction();
        
        var x2 = $gameMap.roundXWithDirection(x, d);
        var y2 = $gameMap.roundYWithDirection(y, d);
        var forceThroughOK = $TKMvar.swimming.forceThroughID.has($gameMap.regionId(x2, y2));
        
        if (!$gameMap.isValid(x2, y2)) {
            return false;
        }
        if (!$gameMap.isPassable(x2, y2, this.reverseDir(d)) || forceThroughOK) {
            return false;
        }
        if (this.isCollidedWithCharacters(x2, y2)) {
            return false;
        }
        
        return true;
    };
    
    
    Game_Map.prototype.askSwimDive = function() {
        
        var commandArray = [];
        var pool = false;
        var dive = false;
        
        if(!$gamePlayer.isSwimming() || $gamePlayer._waterLayer === 0) { // 水の中に入る？
            if( !!$gamePlayer.isJumpIntoWaterOk() ) {
                commandArray.push($TKMvar.swimming.charString.inWater);
                pool = true;
            }
        }
        else if($gamePlayer._waterLayer === 1) {
            if( !!$gamePlayer.isGetupFromWaterOk() ) { // 水の中から出る？
                commandArray.push($TKMvar.swimming.charString.outWater);
                pool = true;
            }
        }
           
        var divingInfo = $gamePlayer.isGetDivingInfoOk();
        if(!!divingInfo) { // 潜る/浮上するする？
            dive = true;
            if(divingInfo.isSurfacing) commandArray.push($TKMvar.swimming.charString.surface);
            else commandArray.push($TKMvar.swimming.charString.dive);
        }
        if(commandArray.length === 0) return false;
        
        commandArray.push($TKMvar.swimming.charString.nothing);
        var length = commandArray.length;
        var list = [];
        list.push( {"code":102,"indent":0,"parameters":[commandArray,length-1,0,1,0]} );
        
        list.push( {"code":402,"indent":0,"parameters":[0,commandArray[0]]});
        list.push( {"code":230,"indent":1,"parameters":[15]} );
        
        if(pool) list.push( {"code":355,"indent":1,"parameters":["$gamePlayer.testSwim();"]} );
        else list.push( {"code":355,"indent":1,"parameters":["$gamePlayer.justDiveTo(" + JSON.stringify(divingInfo) + ");"]} );
        
        list.push( {"code":0,"indent":1,"parameters":[]} );
        list.push( {"code":402,"indent":0,"parameters":[1,commandArray[1]]});
        if(length === 3) {
            list.push( {"code":230,"indent":1,"parameters":[15]} );
            list.push( {"code":355,"indent":1,"parameters":["$gamePlayer.justDiveTo(" + JSON.stringify(divingInfo) + ");"]} );
            list.push( {"code":0,"indent":1,"parameters":[]} );
            list.push( {"code":402,"indent":0,"parameters":[2,commandArray[2]]});
        }
        list.push( {"code":0,"indent":1,"parameters":[]} );
        list.push( {"code":404,"indent":0,"parameters":[]} );
        
        // run
        if(!!this._interpreter.isRunning()) {
            var int = this._interpreter;
            while(!!int._childInterpreter) int = int._childInterpreter;
            int.setupChild(list, 0);
        }
        else {
            this._interpreter.setup(list, 0);
        }
        return true;
    };
    
    Game_Player.prototype.diveHideFollowers = function(list) {
        if(this._followers._visible === true) {
            var curIndent = 0;
            if(list.length > 0) curIndent = list[list.length-1].indent;
            list.push( {"code":217,"indent":curIndent,"parameters":[]} );
            list.push( {"code":216,"indent":curIndent,"parameters":[1]} );
            $gameTemp._divingHidedFollowers = true;
        }
    }
    
    Game_Player.prototype.diveShowFollowers = function(list) {
        if(!!$gameTemp._divingHidedFollowers) {
            var curIndent = list[list.length-1].indent;
            list.push( {"code":216,"indent":curIndent,"parameters":[0]} );
            $gameTemp._divingHidedFollowers = undefined;
        }
    }
    
    var _Game_Player_updateScroll = Game_Player.prototype.updateScroll;
    Game_Player.prototype.updateScroll = function(lastScrolledX, lastScrolledY) {
        if( !!this._stopScroll ) return;
        _Game_Player_updateScroll.apply(this, arguments);
    };
    
})();
