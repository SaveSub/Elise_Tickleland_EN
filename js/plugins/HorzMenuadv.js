//=============================================================================
// HorzMenuadv.js
//=============================================================================

/*:ja
 * @plugindesc ver1.05 ホリゾンタルなメニューコマンド構成
 * @author まっつＵＰ
 * 
 * @param back
 * @desc Backgroundのピクチャ名です。
 * @default
 * @require 1
 * @dir img/pictures/
 * @type file
 * 
 * @param loadtext
 * @desc コマンド「ロード」のコマンド名です。
 * @default ロード
 * 
 * @param opacity
 * @desc メニューコマンドウインドウの不透明度です。
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * 
 * @param xposi
 * @desc メニューコマンドウインドウのx座標です。
 * @type number
 * @min -1000
 * @max 2000
 * @default 0
 * 
 * @param yposi
 * @desc メニューコマンドウインドウのy座標です。
 * 0未満の時はプラグイン側で画面下部の辺りにyを調整します。
 * @type number
 * @min -1
 * @max 2000
 * @default -1
 * 
 * @param pretitle
 * @desc タイトルとメニュー共通で遷移するシーンでは
 * タイトルからの遷移では背景をデフォルトの処理にする。
 * @type boolean
 * @default true
 *
 * @help
 * 
 * RPGで笑顔を・・・
 * 
 * このヘルプとパラメータの説明をよくお読みになってからお使いください。
 * 
 * backのパラメータにはピクチャのファイル名を入れてください。
 * このとき''などで囲む必要はありません。
 * そのピクチャが表示されますが、デフォルトのBackgroundは表示されません。
 * 
 * コマンド「ロード」はイベントテスト中またはセーブデータがないときは選択不能になります。
 * 
 * なお、メニューコマンド「並び替え」の挙動については全く切っておりますので
 * このプラグインを使う時はメニューコマンド「並び替え」を使わない方がいいでしょう。
 * 
 * ver1.01 個人コマンド等の挙動を改善しました。
 * ver1.02 メニューコマンド「ゲームエンド」のエラー落ち回避のための記述を入れました。
 * ver1.03 メニューコマンドウインドウに関するパラメータを追加。
 * また、項目数が少ないときはメニューコマンドウインドウの幅を調整するようにしました。
 * ver1.04 タイトルシーンからの遷移の場合の処理を追加。
 * ver1.05 背景画像を指定しない場合、背景を通常の処理になるようにしました。
 * 
 * このプラグインを利用する場合は
 * readmeなどに「まっつＵＰ」の名を入れてください。
 * また、素材のみの販売はダメです。
 * 上記以外の規約等はございません。
 * もちろんツクールMVで使用する前提です。
 * 何か不具合ありましたら気軽にどうぞ。
 *  
 * 免責事項：
 * このプラグインを利用したことによるいかなる損害も制作者は一切の責任を負いません。
 * 
 */

(function() {
    
    var parameters = PluginManager.parameters('HorzMenuadv');
    var HMback = String(parameters['back'] || '');
    var HMloadtext = String(parameters['loadtext'] || 'ロード' || 'Load');
    var HMopacity = Number(parameters['opacity'] || 255);
    var HMxposi = Number(parameters['xposi'] || 0);
    var HMyposi = Number(parameters['yposi'] || -1);
    var HMpretitle = parameters['pretitle'] === 'true';

//Scene_MenuBase
    var _Scene_MenuBase_createBackground = Scene_MenuBase.prototype.createBackground;
    Scene_MenuBase.prototype.createBackground = function() {
    if(!HMback){
        _Scene_MenuBase_createBackground.call(this);
        return;
    }
    if(HMpretitle && SceneManager.isPreviousScene(Scene_Title)){
        _Scene_MenuBase_createBackground.call(this);
    }else{
        this._HMSprite1 = new Sprite(ImageManager.loadPicture(HMback));
        this.addChild(this._HMSprite1);
    }
    };

//Scene_Menu
    Scene_Menu.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createCommandWindow();
    this.createStatusWindow();
    };

    var _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
    _Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler('load', this.commandLoad.bind(this));
    };

    var _Scene_Menu_createStatusWindow = Scene_Menu.prototype.createStatusWindow;
    Scene_Menu.prototype.createStatusWindow = function() {
    _Scene_Menu_createStatusWindow.call(this);
    this._statusWindow.hide();
    };

    Scene_Menu.prototype.commandPersonal = function() {
    this._statusWindow.setFormationMode(false);
    this._statusWindow.selectLast();
    this._statusWindow.activate();
    this.onPersonalOk(); //直接選択処理を行う。
    };

    Scene_Menu.prototype.commandLoad = function() { //新規
    SceneManager.push(Scene_Load);
    };

//Scene_GameEnd
    Scene_GameEnd.prototype.createBackground = function() {
    Scene_MenuBase.prototype.createBackground.call(this);
    };

//Window_MenuCommand（メニューコマンド位置の改変などをしたい場合はここを弄ってください。）
    var _Window_MenuCommand_initialize = Window_MenuCommand.prototype.initialize;
    Window_MenuCommand.prototype.initialize = function(x, y) {
    x = HMxposi;
    if(HMyposi >= 0){
      y = HMyposi;
    }else{
      y = Graphics.boxHeight - this.fittingHeight(this.numVisibleRows());
    }
    _Window_MenuCommand_initialize.call(this, x, y);
    this.opacity = HMopacity;
    };
    
    Window_MenuCommand.prototype.windowWidth = function() {
      var widthA = this.standardFontSize() * 5;
      var realwidth =  this.maxCols() * widthA;
      return Math.min(Graphics.boxWidth, realwidth);
    };

    Window_MenuCommand.prototype.maxCols = function() { //新規プロパティ
    return this.maxItems();
    };


 Window_MenuCommand.prototype.windowWidth = function() {
        return 250;
    };


  Window_MenuCommand.prototype.windowHeight = function() {
        return 190;
    };

    Window_MenuCommand.prototype.maxCols = function() {
        return 1;
    };

    Window_MenuCommand.prototype.numVisibleRows = function() {
    return 1;
    };

    Window_MenuCommand.prototype.itemTextAlign = function() { //新規プロパティ
    return 'center';
    };

// フォントサイズ
    Window_MenuCommand.prototype.standardFontSize = function() {
    	return 30;
    };

    var _Window_MenuCommand_addSaveCommand = Window_MenuCommand.prototype.addSaveCommand;
    Window_MenuCommand.prototype.addSaveCommand = function() {
    _Window_MenuCommand_addSaveCommand.call(this);
     var enabled = this.isLoadEnabled();
     this.addCommand(HMloadtext, 'load', enabled);
    };
      
    Window_MenuCommand.prototype.isLoadEnabled = function() { //新規
    if(DataManager.isEventTest()) return false;
    return DataManager.isAnySavefileExists();
    };

})();
