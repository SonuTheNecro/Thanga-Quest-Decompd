//=============================================================================
// Yanfly Engine Plugins - Save Core Extension - Autosave
// YEP_X_Autosave.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_Autosave = true;

var Yanfly = Yanfly || {};
Yanfly.Autosave = Yanfly.Autosave || {};
Yanfly.Autosave.version = 1.10;

//=============================================================================
/*:
* @plugindesc v1.10 (Req YEP_SaveCore.js) Adds Autosave functionality to your
* RPG Maker game.
* @author Yanfly Engine Plugins
*
* @help
* ============================================================================
* Introduction
* ============================================================================
*
* This plugin requires YEP_SaveCore. Make sure this plugin is located under
* YEP_SaveCore in the plugin list.
*
* Autosave is a common feature found in standard RPG's nowadays. Games would
* save at certain triggers or upon changing maps so that the player won't lose
* any progress in case they forget to manually save. This plugin adds in an
* Autosave function to your game(s) and lets you control when to Autosave or
* set it to do it automatically under certain conditions.
*
* ============================================================================
* Instructions
* ============================================================================
*
* There are three ways to go about Autosave with this plugin. Please read them
* carefully and decide which one(s) is best suited for your game.
*
* ---
*
* Manual:
* - By default, Autosave does not happen automatically with this plugin. You,
* as the game dev, need to insert the Plugin Command: Autosave at the various
* points you want the Autosave to occur. This one gives you the most control
* over your game.
*
* ---
*
* Autosave on Map Load:
* - This is a Plugin Parameter. When it is set to true, the game will Autosave
* each time the map scene is loaded. This means entering a new map, coming out
* of a menu, or finishing a battle. All three of those conditions causes the
* Autosave function to activate.
*
* ---
*
* Autosave on Main Menu:
* - This is a Plugin Parameter. When it is set to true, the game will Autosave
* each time the player enters the Main Menu from the map scene. Autosave will
* NOT occur any other way regarding the Main Menu, meaning that coming out of
* the Item scene to the Main Menu will not activate Autosave.
*
* ---
*
* Autosaving will not occur if the player disables Autosave. If you don't want
* to give the player the ability to disable Autosave, you can set the Plugin
* Parameter "Show Option" to false.
*
* You can use all three methods of Autosaving together. You can have it done
* manually, Autosave on loading a map, and Autosave on calling the Main Menu
* to get the most coverage.
*
* *NOTE: Although you can use all three methods together, be mindful of your
* players. Sometimes, saving a game could induce a bit of lag depending on how
* big the save files are. Autosaving is no different. This is something that
* cannot be fixed by plugins.
*
* *NOTE: Autosaving will not occur until the player saved manually at least
* once in-game. After that, Autosave will take the slot that was used to save
* and continue saving to it or whichever save slot the player moved to later.
*
* ============================================================================
* Plugin Commands
* ============================================================================
*
* Autosave is manually done by the game developer using plugin commands. There
* are also other plugin commands that can control autosaving, too.
*
*   Plugin Commands:
*
*      Autosave
*      - This will make the game automatically save in the last saved file
*      slot used by the player. If the player has started a new game and did
*      not save into a slot yet, nothing will happen. If autosave is disabled
*      by the player through the Options menu or disabled by the system with
*      a plugin command, nothing will happen either.
*
*      EnableAutosave
*      DisableAutosave
*      - This will forcibly enable or disable autosaving done by the game.
*      This will not bypass the player's option to disable Autosave if trying
*      to enable it. The player's decision to disable Autosaving will take
*      priority over the game dev's. If you wish to take this option away from
*      the player, please change it in the plugin parameters.
*
* ============================================================================
* Options Core Settings - Adding the New Option
* ============================================================================
*
* If you are using YEP_OptionsCore.js, you can add a new Option using this
* plugin. Here's the following code/parameter settings you can use with it.
*
* ---------
* Settings:
* ---------
*
* Name:
* \i[231]Autosave
*
* Help Description:
* Enables \c[4]Autosaving\c[0] for your game if ON.
* You can still manually save your game.
*
* Symbol:
* autosave
*
* Show/Hide:
* show = Imported.AutosaveShowOpt;
*
* Enable:
* enabled = true;
*
* Ext:
* ext = 0;
*
* ----------
* Functions:
* ----------
*
* Make Option Code:
* this.addCommand(name, symbol, enabled, ext);
*
* Draw Option Code:
* var rect = this.itemRectForText(index);
* var statusWidth = this.statusWidth();
* var titleWidth = rect.width - statusWidth;
* this.resetTextColor();
* this.changePaintOpacity(this.isCommandEnabled(index));
* this.drawOptionsName(index);
* this.drawOptionsOnOff(index);
*
* Process OK Code:
* var index = this.index();
* var symbol = this.commandSymbol(index);
* var value = this.getConfigValue(symbol);
* this.changeValue(symbol, !value);
*
* Cursor Right Code:
* var index = this.index();
* var symbol = this.commandSymbol(index);
* var value = this.getConfigValue(symbol);
* this.changeValue(symbol, true);
*
* Cursor Left Code:
* var index = this.index();
* var symbol = this.commandSymbol(index);
* var value = this.getConfigValue(symbol);
* this.changeValue(symbol, false);
*
* Default Config Code:
* // Empty. Provided by this plugin.
*
* Save Config Code:
* // Empty. Provided by this plugin.
*
* Load Config Code:
* // Empty. Provided by this plugin.
*
* ============================================================================
* Changelog
* ============================================================================
*
* Version 1.00:
* - Finished Plugin!
*
* Version 1.10:
* - Edited by DKPlugins
*
* ============================================================================
* End of Helpfile
* ============================================================================
*
* @param ---Slots---
*
* @param Auto Save Slots
* @parent ---Slots---
* @desc How many auto save slots should the game have?
* @type number
* @default 2
*
* @param ---Save Texts---
*
* @param Auto Save Text
* @parent ---Save Texts---
* @desc Text shown in the save and load menu to identify auto save slots.
* @default Autosave
*
* @param Save After Map Change Text
* @parent Save Texts
* @desc Text that is displayed for a after map change auto saves.
* @default Entering Area
*
* @param Save On Menu Call Text
* @parent ---Save Texts---
* @desc Text that is displayed for menu call auto saves.
* @default Opening Menu
*
* @param Save Standard Text
* @parent ---Save Texts---
* @desc Text that is displayed for a normal save.
* @default Normal Save
*
* @param ---Automatic---
* @default
*
* @param Save After Map Change
* @parent ---Automatic---
* @desc Should the game autosave after the map is changed?
* @type boolean
* @default true
*
* @param OnMainMenu
* @text Autosave on Main Menu
* @parent ---Automatic---
* @type boolean
* @desc Autosave whenever main menu is called.
* @default false
*
* @param ---Option Menu---
* @default
*
* @param Show Option
* @parent ---Option Menu---
* @type boolean
* @desc Give player the option to enable or disable Autosave?
* @default true
*
* @param Option Name
* @parent ---Option Menu---
* @desc The option command text used in-game.
* @default Autosave
*
* @param Default
* @text Default Setting
* @parent ---Option Menu---
* @desc Do you want Autosaving to be enabled by default?
* @type boolean
* @default true
*
* @param ---Visual---
* @default
*
* @param ShowAutosave
* @text Show Autosave Message
* @parent ---Visual---
* @type boolean
* @desc Show a message when Autosave happens?
* @default true
*
* @param AutosaveMsgSave
* @text Autosave Message On Save
* @parent ShowAutosave
* @desc Text used for the auto save message.
* Can use text codes.
* @default \i[83]Autosave Complete!
*
* @param AutosaveMsgLoad
* @text Autosave Message On Load
* @parent ShowAutosave
* @desc Text used for the auto save message.
* Can use text codes.
* @default \i[83]Autosave Loaded!
*
* @param MsgGradient1
* @text Message Gradient 1
* @parent ShowAutosave
* @desc Hex color used for the softer gradient color.
* rgba(0, 0, 0, 0) Reference: Red, Green, Blue, Alpha
* @default rgba(0, 0, 0, 0)
*
* @param MsgGradient2
* @text Message Gradient 2
* @parent ShowAutosave
* @desc Hex color used for the softer gradient color.
* rgba(0, 0, 0, 0) Reference: Red, Green, Blue, Alpha
* @default rgba(0, 0, 0, 0.6)
*
* @param MsgGradientCode
* @text Message Gradient Code
* @parent ShowAutosave
* @type note
* @desc JavaScript code for those who would like to tweak
* how the gradient is drawn.
* @default "var textWidth = this.textWidthEx(this.message());\nvar half = this.textPadding() + Math.ceil(textWidth / 2);\nvar height = this.lineHeight();\nvar color1 = Yanfly.Param.AutosaveMsgColor1;\nvar color2 = Yanfly.Param.AutosaveMsgColor2;\nthis.contents.gradientFillRect(0, 0, half, height, color1, color2);\nthis.contents.gradientFillRect(half, 0, this.width - half, height, color2, color1);"
*
* @param MsgX
* @text Message X
* @parent ShowAutosave
* @desc X position of the message.
* You can use code here.
* @default Graphics.boxWidth - 180
*
* @param MsgY
* @text Message Y
* @parent ShowAutosave
* @desc Y position of the message.
* You can use code here.
* @default Graphics.boxHeight - this.fittingHeight(1) * 2
*
* @param MsgDuration
* @text Message Duration
* @parent ShowAutosave
* @type number
* @desc Duration of the message in frames.
* @default 120
*
* @param FadeSpeed
* @text Message Fade Speed
* @parent ShowAutosave
* @desc Fade speed of the window.
* Lower - slower     Higher - faster
* @default 16
*
*/
//=============================================================================

if (Imported.YEP_SaveCore) {

    //=============================================================================
    // Parameter Variables
    //=============================================================================

    Yanfly.Parameters = PluginManager.parameters('YEP_X_Autosave');
    Yanfly.Param = Yanfly.Param || {};

    Yanfly.Param.AutosaveSlots = Number(Yanfly.Parameters['Auto Save Slots']) || 2;

    Yanfly.Param.AutosaveStandardText = String(Yanfly.Parameters['Save Standard Text'] || 'Normal Save');
    Yanfly.Param.AutosaveText = String(Yanfly.Parameters['Auto Save Text'] || 'Autosave');
    Yanfly.Param.AutosaveOnMapChangeText = String(Yanfly.Parameters['Save After Map Change Text'] || 'Entering Area');
    // Yanfly.Param.AutosaveOnMapLoadText = String(Yanfly.Parameters['Save On Map Load Text'] || 'Map Loaded');
    Yanfly.Param.AutosaveOnMenuCallText = String(Yanfly.Parameters['Save On Menu Call Text'] || 'Opening Menu');
    // Yanfly.Param.AutosaveOnMenuExitText = String(Yanfly.Parameters['Save On Menu Exit Text'] || 'Closing Menu');

    // Yanfly.Param.AutosaveOnMapLoad = eval(String(Yanfly.Parameters['OnMapLoad']));
    Yanfly.Param.AutosaveOnMapChange = eval(String(Yanfly.Parameters['Save After Map Change']));
    Yanfly.Param.AutosaveOnMainMenu = eval(String(Yanfly.Parameters['OnMainMenu']));

    Yanfly.Param.AutosaveShowOpt = eval(String(Yanfly.Parameters['Show Option']));
    Yanfly.Param.AutosaveOptionCmd = String(Yanfly.Parameters['Option Name']);
    Yanfly.Param.AutosaveDefault = eval(String(Yanfly.Parameters['Default']));

    Yanfly.Param.AutosaveShowMsg = eval(String(Yanfly.Parameters['ShowAutosave']));
    Yanfly.Param.AutosaveMsgSave = String(Yanfly.Parameters['AutosaveMsgSave']);
    Yanfly.Param.AutosaveMsgLoad = String(Yanfly.Parameters['AutosaveMsgLoad']);
    Yanfly.Param.AutosaveMsgColor1 = String(Yanfly.Parameters['MsgGradient1']);
    Yanfly.Param.AutosaveMsgColor2 = String(Yanfly.Parameters['MsgGradient2']);
    Yanfly.Param.AutosaveMsgCode = JSON.parse(Yanfly.Parameters['MsgGradientCode']);
    Yanfly.Param.AutosaveMsgX = String(Yanfly.Parameters['MsgX']);
    Yanfly.Param.AutosaveMsgY = String(Yanfly.Parameters['MsgY']);
    Yanfly.Param.AutosaveMsgDur = Number(Yanfly.Parameters['MsgDuration']) || 120;
    Yanfly.Param.AutosaveMsgFade = Number(Yanfly.Parameters['FadeSpeed']) || 16;

    Yanfly.Param.currentAutosaveFileId = 1;
    Yanfly.Param.AutosaveTriggerText = Yanfly.Param.AutosaveStandardText;

    //=============================================================================
    // ConfigManager
    //=============================================================================

    ConfigManager.autosave = Yanfly.Param.AutosaveDefault;

    Yanfly.Autosave.ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        var config = Yanfly.Autosave.ConfigManager_makeData.call(this);

        config.autosave = this.autosave;

        return config;
    };

    Yanfly.Autosave.ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        Yanfly.Autosave.ConfigManager_applyData.call(this, config);

        this.autosave = config['autosave'] || Yanfly.Param.AutosaveDefault;
    };

    //=============================================================================
    // DataManager
    //=============================================================================

	Yanfly.Autosave.DataManager_loadGame = DataManager.loadGameWithoutRescue;
	DataManager.loadGameWithoutRescue = function(savefileId) {
	  var value = Yanfly.Autosave.DataManager_loadGame.call(this, savefileId);
	  $gameTemp._autosaveLoading = true;
	  return value;
	};

    Yanfly.Autosave.DataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        var contents = Yanfly.Autosave.DataManager_makeSaveContents.call(this);

        contents.currentAutosaveFileId = Yanfly.Param.currentAutosaveFileId;

        return contents;
    };

    Yanfly.Autosave.DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        Yanfly.Autosave.DataManager_extractSaveContents.call(this, contents);

        Yanfly.Param.currentAutosaveFileId = contents.currentAutosaveFileId;
    };

    Yanfly.Autosave.DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
    DataManager.makeSavefileInfo = function() {
        const contents = Yanfly.Autosave.DataManager_makeSavefileInfo.call(this);

        contents.title = Yanfly.Param.AutosaveTriggerText;

        return contents;
    };

    Yanfly.Autosave.DataManager_maxSavefiles = DataManager.maxSavefiles;
    DataManager.maxSavefiles = function() {
        return Yanfly.Autosave.DataManager_maxSavefiles.call(this) + Yanfly.Param.AutosaveSlots;
    };

    //=============================================================================
    // StorageManager
    //=============================================================================

    StorageManager.getCurrentAutosaveSlot = function() {
        if (Yanfly.Param.currentAutosaveFileId >= Yanfly.Param.AutosaveSlots) {
            Yanfly.Param.currentAutosaveFileId = 1;
        } else {
            Yanfly.Param.currentAutosaveFileId++;
        }

        return Yanfly.Param.currentAutosaveFileId;
    };

    StorageManager.isAutosave = function(savefileId) {
        return savefileId > 0 && savefileId <= Yanfly.Param.AutosaveSlots;
    };

    //=============================================================================
    // Game_System
    //=============================================================================

    Yanfly.Autosave.Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        Yanfly.Autosave.Game_System_initialize.call(this);
        this.initAutosave();
    };

    Game_System.prototype.initAutosave = function() {
        this._allowAutosave = true;
    };

    Game_System.prototype.canAutosave = function() {
        if (this._allowAutosave === undefined) {
            this.initAutosave();
        }

        return this._allowAutosave;
    };

    Game_System.prototype.setAutosave = function(value) {
        this._allowAutosave = value;
    };

    Game_System.prototype.autoSaveGame = function() {
        if ($gameMap.mapId() <= 0 || !this.canAutosave()) {
            return;
        }

        $gameSystem.onBeforeSave();

        const fileId = StorageManager.getCurrentAutosaveSlot();

        if (DataManager.saveGame(fileId)) {
            console.log("Autosave successful. Saved in slot " + fileId + " with trigger " + Yanfly.Param.AutosaveTriggerText);

            StorageManager.cleanBackup(fileId);

            return true;
        } else {
            console.error("Autosave Failed.");
        }

        return false;
    };

    //===========================================================================
    // Game_Player
    //===========================================================================

    Yanfly.Autosave.Game_Player_performTransfer = Game_Player.prototype.performTransfer;
    Game_Player.prototype.performTransfer = function() {
		const newMapId = this._newMapId;
		const mapId = $gameMap.mapId();
		
        Yanfly.Autosave.Game_Player_performTransfer.call(this);

        if (newMapId > 0 && mapId > 0 && newMapId !== mapId && Yanfly.Param.AutosaveOnMapChange) {
            Yanfly.Param.AutosaveTriggerText = Yanfly.Param.AutosaveOnMapChangeText;

            $gameSystem.autoSaveGame();
        }
    };

    //=============================================================================
    // Game_Interpreter
    //=============================================================================

    Yanfly.Autosave.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        Yanfly.Autosave.Game_Interpreter_pluginCommand.call(this, command, args);

        if (command.match(/EnableAutosave/i)) {
            $gameSystem.setAutosave(true);
        } else if (command.match(/DisableAutosave/i)) {
            $gameSystem.setAutosave(false);
        } else if (command.match(/Autosave/i)) {
            $gameSystem.autoSaveGame();
        }
    };

    //=============================================================================
    // Window_Options
    //=============================================================================

    Yanfly.Autosave.Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
    Window_Options.prototype.addGeneralOptions = function() {
        Yanfly.Autosave.Window_Options_addGeneralOptions.call(this);

        if (!Imported.YEP_OptionsCore && Yanfly.Param.AutosaveShowOpt) {
            this.addCommand(Yanfly.Param.AutosaveOptionCmd, 'autosave');
        }
    };

    //===========================================================================
    // Window_SavefileList
    //===========================================================================

    Window_SavefileList.prototype.drawFileId = function(id, x, y) {
        if (StorageManager.isAutosave(id)) {
            this.drawText(Yanfly.Param.AutosaveText + ' ' + id, x, y, 180);
        } else{
            this.changePaintOpacity(true);
            this.drawText(TextManager.file + ' ' + (id - Yanfly.Param.AutosaveSlots), x, y, 180);
        }
    };

    //=============================================================================
    // Window_Autosave
    //=============================================================================

    function Window_Autosave() {
        this.initialize.apply(this, arguments);
    }

    Window_Autosave.prototype = Object.create(Window_Base.prototype);
    Window_Autosave.prototype.constructor = Window_Autosave;

    Window_Autosave.prototype.initialize = function() {
        var width = this.windowWidth();
        var height = this.windowHeight();
        var x = eval(Yanfly.Param.AutosaveMsgX);
        var y = eval(Yanfly.Param.AutosaveMsgY);

        Window_Base.prototype.initialize.call(this, x, y, width, height);

        this.opacity = 0;
        this.contentsOpacity = 0;
        this._showCount = 0;

        this.refresh();

        if ($gameTemp._autosaveLoading || $gameTemp._autosaveReveal) {
            this.reveal();

            $gameTemp._autosaveLoading = false;
			$gameTemp._autosaveReveal = false;
        }
    };

    Window_Autosave.prototype.standardPadding = function() {
        return 0;
    };

    Window_Autosave.prototype.windowWidth = function() {
        return Graphics.boxWidth;
    };

    Window_Autosave.prototype.windowHeight = function() {
        return this.fittingHeight(1);
    };

    Window_Autosave.prototype.update = function() {
        Window_Base.prototype.update.call(this);

        if (this._showCount > 0) {
            this.updateFadeIn();

            this._showCount--;
        } else {
            this.updateFadeOut();
        }
    };

    Window_Autosave.prototype.updateFadeIn = function() {
        this.contentsOpacity += Yanfly.Param.AutosaveMsgFade;
    };

    Window_Autosave.prototype.updateFadeOut = function() {
        this.contentsOpacity -= Yanfly.Param.AutosaveMsgFade;
    };

    Window_Autosave.prototype.reveal = function() {
        if (!Yanfly.Param.AutosaveShowMsg || this._showCount > 0) {
			return;
		}
		
        this._showCount = Yanfly.Param.AutosaveMsgDur;
		
        this.refresh();
    };

    Window_Autosave.prototype.message = function() {
        if ($gameTemp._autosaveLoading) {
            return Yanfly.Param.AutosaveMsgLoad;
        } else {
            return Yanfly.Param.AutosaveMsgSave;
        }
    };

    Window_Autosave.prototype.refresh = function() {
        this.contents.clear();
        this.drawGradient();
        this.drawTextEx(this.message(), this.textPadding(), 0);
    };

    Window_Autosave.prototype.drawGradient = function() {
        eval(Yanfly.Param.AutosaveMsgCode);
    };

    Window_Autosave.prototype.textWidthEx = function(text) {
        return this.drawTextEx(text, 0, this.contents.height);
    };

    //=============================================================================
    // Scene_Base
    //=============================================================================

    Scene_Base.prototype.performAutosave = function() {
    };

    //=============================================================================
    // Scene_Map
    //=============================================================================

    Yanfly.Autosave.Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
        Yanfly.Autosave.Scene_Map_createAllWindows.call(this);
        this.createAutosaveMessageWindow();
    };

    Scene_Map.prototype.createAutosaveMessageWindow = function() {
        this._autosaveMsgWindow = new Window_Autosave();

        this.addChild(this._autosaveMsgWindow);
    };

    Yanfly.Autosave.Scene_Map_callMenu = Scene_Map.prototype.callMenu;
    Scene_Map.prototype.callMenu = function() {
        Yanfly.Autosave.Scene_Map_callMenu.call(this);

        if (Yanfly.Param.AutosaveOnMainMenu) {
            Yanfly.Param.AutosaveTriggerText = Yanfly.Param.AutosaveOnMenuCallText;

            $gameSystem.autoSaveGame();
			$gameTemp._autosaveReveal = true;
        }
    };

    //===========================================================================
    // Scene_File
    //===========================================================================

    Yanfly.Autosave.Scene_File_performActionSave = Scene_File.prototype.performActionSave;
    Scene_File.prototype.performActionSave = function() {
        Yanfly.Param.AutosaveTriggerText = Yanfly.Param.AutosaveStandardText;
        Yanfly.Autosave.Scene_File_performActionSave.call(this);
    };

    //===========================================================================
    // Scene_Save
    //===========================================================================

    Scene_Save.prototype.firstSavefileIndex = function() {
        return Yanfly.Param.AutosaveSlots;
    };

    //=============================================================================
    // Save Core Check
    //=============================================================================
} else {

    Imported.YEP_X_Autosave = false;
    var text = '';
    text += 'You are getting this error because you are trying to run ';
    text += 'YEP_X_Autosave without the required plugins. Please visit ';
    text += 'Yanfly.moe and install the required plugins neede for this plugin ';
    text += 'found in this plugin\'s help file before you can use it.';
    console.log(text);
    require('nw.gui').Window.get().showDevTools();

}
//=============================================================================
// End of File
//=============================================================================
