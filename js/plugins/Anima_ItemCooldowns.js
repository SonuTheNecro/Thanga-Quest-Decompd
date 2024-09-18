/*=============================================================================
 * Anima - Item Cooldowns
 * By Liquidize - http://anima.mintkit.lol
 * Anima_ItemCooldowns.js
 * Version: 1.03
 * Free for commercial/non-commercial use, Credit Liquidize or the
 * "Anima Framework".
 *
 *
 * Special Thanks: Yanfly - this is heavily based off YEP_SkillCooldowns, to the point
 * where it basically is just straight skill cooldowns, but for items. I also
 * borrowed Yanfly's utility function.
 *
 *=============================================================================*/
/*:
 * @plugindesc Plugin Description <Anima_ItemCooldowns>
 * @author Liquidize
 *
 * @param ---General---
 * @default
 *
 * @param Text Padding
 * @desc The padding amount when drawing the cooldown information.
 * @default 4
 *
 * @param ---Cooldown---
 * @default
 *
 * @param Cooldown Format
 * @desc This is the text format used for cooldowns.
 * %1 - Turns Remaining
 * @default %1CD
 *
 * @param Cooldown Font Size
 * @desc This is the font size used for cooldowns.
 * Default: 28
 * @default 20
 *
 * @param Cooldown Text Color
 * @desc Adjusts the text color used for cooldowns.
 * @default 6
 *
 * @param Cooldown Icon
 * @desc What icon to be used for cooldowns.
 * Use 0 for no icon.
 * @default 75
 *
 * @param Cooldown After Battle
 * @desc How are cooldowns handled after battle?
 * @default -10
 *
 * @param Cooldown Steps
 * @desc Outside of battle, this is how many steps on the map the
 * player must walk to drop each cooldown by 1.
 * @default 5
 *
 * @param Cooldown Bypass
 * @desc This is a list of items that cannot be on cooldown.
 * Input a list seperated by a space. e.g: 1 2 3 4 5
 * @default
 *
 * @param ---Warmup---
 * @default
 *
 * @param Warmup Format
 * @desc This is the text format used for warmups.
 * %1 - Turns Remaining
 * @default %1WU
 *
 * @param Warmup Font Size
 * @desc This is the font size used for warmups.
 * Default: 28
 * @default 20
 *
 * @param Warmup Text Color
 * @desc Adjusts the text color used for warmups.
 * @default 4
 *
 * @param Warmup Icon
 * @desc What icon to be used for warmups.
 * Use 0 for no icon.
 * @default 75
 *
 * @param ---Battle Core---
 * @default
 *
 * @param Time Based
 * @desc If a battle system is Tick-based, use time instead
 * of turns for cooldowns? NO - false   YES - true
 * @default false
 *
 * @param Turn Time
 * @desc How many ticks must pass to equal 1 cooldown turn?
 * @default 100
 *
 * @help
 *
 * ============================================================================
 * Anima_ItemCooldowns
 * ============================================================================
 * Inspired by and heavily based off YEP_SkillCooldowns this plugin aims to
 * provide the same feature set, and cool down functionality that YEP_SkillCooldowns
 * provides, but for items. This plugin shares relatively the same note tag setup
 * as YEP_SkillCooldowns to make it familiar for those whom use that. Due to the
 * similarities between this plugin and YEP_SkillCooldowns, the documentation
 * will seem familiar as well.
 *
 * ============================================================================
 * The Anima Framework
 * ============================================================================
 * What is it? It's a series of plugins, a 'framework' if you will, developed by
 * as a part of my contribution to the RPG Maker MV community. The
 * plugin contained within this framework are plugins that are derived
 * from the plugin request forums at RPGMakerWeb. They are requests that have been
 * found interesting/unique or potentially fun to make so I went ahead and made them.
 * Anyone is free to use these in any project provided that credit is given.
 * You are free to suggest improvements, features, suggestions, or whole plugins.
 * If I like them, or its a popular request, I will add them to my list.
 *
 * Check out my website:
 * http://anima.mintkit.lol
 *
 * ============================================================================
 * Compatibility
 * ============================================================================
 * This plugin overwrites some existing functionality for using items, but
 * mainly for the Scene and Windows where items are used. This is because it
 * completely overhauls the using process as the native process doesn't take
 * into account cooldowns, and thus aliasing the methods would be rather pointless.
 * Due to this, it may not be compatible with plugins that try to manipulate the
 * functions this plugin overwrites, however if you place this above that
 * plugin in the plugin manager, it may work. While I strive to make all my plugins
 * compatible with most other plugins within reason, sometimes you just cant.
 * If a plugin is not compatible with this, please notify me and I willl
 * do my utmost to try to make a patch.
 *
 * ============================================================================
 * Cooldown Types
 * ============================================================================
 *
 * Cooldown (Normal)
 * The normal type of cooldown only occurs when an item has a cooldown to pay.
 * The item cannot be used for 'x' turns as determined by the cooldown. There
 * are multiple things that can contribute to the cooldown going down. The first
 * thing would be simply waiting. Each turn in battle causes a cooldown to be
 * lowered by 1 turn. Skills and Items  can be used to speed up the process.
 * The second would be to finish battles, finishing a battle causes all cooldows
 * to drop by a certain amount, as defined in the parameters. The third way would
 * be to be walking or running on field maps, every certain amount of steps
 * will allow an item's cooldown to decrease.
 *
 * Warmups
 * This type of cooldown acts mostly in the same way as the normal type of cool
 * down. The difference however is warmups only occur during battle. At the very
 * start of the battle, if an item has a warmup it will not be usable until the
 * initial warmup cooldown is over. Warmups and cooldowns do not stack, if a
 * cooldown is already occurring on the item during the warmup time, both the
 * cooldown and the warmup are updated.
 *
 * Linked Cooldowns
 * These cooldowns occur when an item that is used causes another item in the
 * game parties item library to have a cooldown. All attributes of this cooldown
 * are the same as the normal cooldown. This cooldown will have priority over
 * global cooldowns if this type is defined.
 *
 * Item Type Cooldowns
 * When an Item Type Cooldown occurs all items in the game parties item
 * library with the matching Item Type will be put on cooldown. All other
 * attributes about this type of cooldown are the same as a normal cooldowns. This
 * type of cooldown will take priority over a global cooldown if this cooldown is
 * defined.
 *
 * When a cooldown is applied for an item that already has a cooldown, the
 * cooldown will be adjusted to whatever the largest value is. This means
 * if a item has 4 turns for a cooldown, and an Item Type Cooldown would be
 * set for 1 turn, the 4 turns would remain. On the flip side however, if a item
 * has 4 and the Item Type Cooldown has 5, then the cooldown would be changed
 * to 5 turns.
 *
 * Party Cooldowns
 * These cooldowns and warmups function just like normal cooldowns and warmups,
 * except that they're for your entire party. Each party member contributes to
 * the effects of this cooldown, so if one party member has a state that can
 * reduce this particular item types,or items cooldown rate,or duration then
 * the entire parties cooldown rate or duration for this particular cooldown/item
 * is also effect. All for one, one for all as they say. Party cooldowns super
 * cede individual actor cooldowns, if and only if the party cooldown is greater
 * than that of the actors own cooldown.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The below are note tags which can be used to apply cooldown effects. They
 * are case insensitive so any combination of capital letters/lowercase can be
 * used.
 *
 * ----------------------------------------------------------------------------
 * Item Note tags
 * ----------------------------------------------------------------------------
 *
 * <Cooldown: x>
 * Sets the cooldown of the item to X turns. This cooldown only affects this
 * item. This value will take priority over Item Type Cooldown and Global Cooldowns.
 *
 * <Warmup: x>
 * Sets the warmup of the item to X turns. This warmup only affects this item. This
 * value will take priority over Item Type Warmup and Global Warmup.
 *
 * <Party Cooldown: x>
 * Sets this item to be an item cooldown, if x is set to true.
 *
 * <After Battle Cooldown: +x>
 * <After Battle Cooldown: -x>
 *  After a battle ends, change the cooldown for this item by +x turns, or -x turns.
 *
 * <Cooldown Steps: x>
 *  Outside of battle, every x steps that the player takes, this items
 *  cooldown will drop by 1.
 *
 * <Item x Cooldown: y>
 * When using this item, item x will have a linked cooldown of y turns.
 * This will take priority over Item Type and Global Cooldowns.
 *
 * <IType x Cooldown: y>
 * When using this item, all items with the same Item Type x will be placed
 * on cooldown for y turns. This value takes priority over global cooldowns.
 *
 * <Global Cooldown: x>
 * When using this item, all items within the parties item library, will be
 * placed on a cooldown of x turns, for the actor who used this. This has
 * less of a priority then IType and Individual cooldowns.
 *
 * <IType x Party Cooldown: y>
 * Same as IType Cooldown, but for the entire party.
 *
 * <Party Cooldown: x>
 * Same as Cooldown, but for the entire party. See party cooldowns.
 *
 * <Global Party Cooldown: x>
 * Same as Global Cooldown, but for the entire party. See party cooldowns.
 *
 * <Bypass Cooldown>
 * This causes the item to bypass cooldowns, no matter what. This should be
 * used for items you wish to not ever be placed on a cooldown, even if
 * another item, or skill tries to cause it to be.
 *
 * ----------------------------------------------------------------------------
 * Item and Skill Note tags
 * ----------------------------------------------------------------------------
 *
 * <Item x Cooldown: +y>
 * <Item x Cooldown: -y>
 * Targets hit by this skill, or item will have item x's cooldown adjusted by y.
 * This does not apply to the user and only applies to the targets.
 *
 * <IType x Cooldown: +y>
 * <IType x Cooldown: -y>
 * Targets hit by this skill,or item will have all items with the item type x
 * cooldown adjusted by y. This does not apply to the the user, and only applies
 * to the targets.
 *
 * <Item Global Cooldown: +x>
 * <Item Global Cooldown: -x>
 * Targets hit by this skill, or item will have all items cooldown adjusted by x.
 * This does not apply to the user, only to the targets.
 *
 * ----------------------------------------------------------------------------
 * Class,Actor,Weapon,Armor and State Notetags
 * ----------------------------------------------------------------------------
 *
 * <Item x Cooldown Duration: y%>
 * Alters the cooldown duration of item x to y% when the cooldown is applied.
 * The effect only applies to Item x.
 *
 * <IType x Cooldown Duration: y%>
 * Alters the cooldown duration of all items with item type x by y% when the
 * cooldown is applied. This only applies to Item Type x.
 *
 * <Item Global Cooldown Duration: x%>
 * Alters the cooldown duration of all items by x% when the cooldown is applied.
 *
 * <Item x Cooldown Rate: y%>
 * Sets the cooldown rate for item x to y% when the cooldown counter goes down.
 * This effect only applies to item x.
 *
 * <IType x Cooldown Rate: y%>
 * Sets the cooldown rate for all items with Item Type x to y% when the
 * cooldown counter goes down. This effect only applies to x Item type.
 *
 * <Item Global Cooldown Rate: y%>
 * Sets the cooldown rate for all items to y% when the cooldown counter goes
 * down.
 *
 * <Item x Cooldown: +y>
 * <Item x Cooldown: -y>
 * If the user uses item x, it will have an increased or decreased cooldown by
 * value y so long as the user has actor,class,weapon,armor, or state active/equipped.
 * These flat cooldown modifications are applied after the rates and duration modifiers
 * have been calculated.
 *
 * <IType x Cooldown: +y>
 * <IType x Cooldown: -y>
 * If the user uses any item with the same Item Type as x then it will have an
 * increased cooldown by y. So long as the user is the actor, or class, or has the
 * weapon or armor equipped, or is affected by the state. These flat cooldown
 * modifications are applied after the rates and duration modifiers have been
 * calculated.
 *
 * <Item Global Cooldown: +x>
 * <Item Global Cooldown: -x>
 * If the user uses any item, it will have an increased or decreased cooldown specified
 * by x. So long as the user is the actor, or class that this is given to, or so long
 * as the user has the weapon,armor, or state active. This is applied after the rate
 * and duration modifiers have been calculated.
 *
 * <Item x Warmup: +y>
 * <Item x Warmup: +y>
 * At the start of a battle, item x will have an increased or decreased warmup value
 * based off the value of y. So long as the user has this notetag anywhere, be it
 * on the actor,class,a weapon or armor equipped, a state they have, etc. Flat
 * warmup modifications are calculated after rate and duration.
 *
 * <IType x Warmup: +y>
 * <IType x Warmup: -y>
 * At the start of a battle, any item that shares x Item Type will have their
 * warmup time increased or decreased by the value of y. So long as the user has
 * this note tag, in either their actor,current class, an equipped piece of gear,
 * or on a state they are affected by. These flat modifications are applied after
 * the duration and rate modifications are calculated.
 *
 * <Item Global Warmup: +x>
 * <Item Global Warmup: -x>
 * At the start of a battle, all items will have their warmup timed increased or
 * decreased by value x. So long as the user has this note tag, in either their
 * actor,current class, an equipped piece of gear, or on a state they are affected
 * by. These flat modifications are applied after the duration and rate modifications
 * are calculated.
 *
 * ============================================================================
 * "Lunatic Mode" - Specialized Cooldowns
 * ============================================================================
 * Just like with YEP_SkillCooldowns, this plugin features a "Lunatic" mode as
 * called by Yanfly.
 *
 * For items, you can set cooldowns to have a special code determine its value
 * when the item is used.
 *
 * Item Notetag
 *   <Cooldown Eval>
 *   cooldown = x;
 *   cooldown += x;
 *   </Cooldown Eval>
 *   Insert these two tags into the items's notebox to give it a unique way to
 *   determine the cooldown's value. The 'cooldown' variable determines the
 *   amount of turns for the cooldown.
 *
 *   <Warmup Eval>
 *   warmup = x;
 *   warmup += x;
 *   </Warmup Eval>
 *   Insert these two tags into the item's notebox to give it a unique way to
 *   determine the warmup's value. The 'warmup' variable determines the amount
 *   of turns for the warmup.
 *
 * <Party Cooldown Eval>
 * </Party Cooldown Eval>
 * These two evaluation tags are the same as <Cooldown Eval></Cooldown Eval>
 * except for the entire party, see party cooldowns.
 *
 * ============================================================================
 * Change Log
 * ============================================================================
 *
 * Version 1.03:
 *            - Fixed an issue that caused weapons and armors to not display.
 *
 * Version 1.02:
 *            - Fixed a bug that caused the plugin to not function
 *            without YEP Battle Engine
 *            - Added Party Cooldowns
 *
 * Version 1.01:
 *            - Fixed an error caused by After Battle Cooldowns.
 *            - Added compatibility with Bobstah's Item Socket Plugin.
 *
 * Version 1.0:
 *            - Finished Script!
 *
 *=============================================================================*/
var Imported = Imported || {};
var Anima = Anima || {};
Anima.ItemCooldowns = Anima.ItemCooldowns || {};

(function ($) {
    "use strict";

    var parameters = $plugins.filter(function (plugin) {
        return plugin.description.contains('<Anima_ItemCooldowns>');
    });
    if (parameters.length === 0) {
        throw new Error("Couldn't find Liquidize's Anima_ItemCooldowns parameters.");
    }
    $.Parameters = parameters[0].parameters;
    $.Param = {};
    $.Param.cdTimeBased = eval($.Parameters['Time Based']);
    $.Param.cdTurnTime = Number($.Parameters['Turn Time']);
    $.Param.cdAfterBattle = String($.Parameters['Cooldown After Battle']);
    $.Param.cdSteps = String($.Parameters['Cooldown Steps']);
    $.Param.cdBypass = String($.Parameters['Cooldown Bypass']).split(' ');
    for ($.Param.i = 0; $.Param.i < $.Param.cdBypass.length; $.Param.i++) {
        $.Param.cdBypass[$.Param.i] = parseInt($.Param.cdBypass[$.Param.i]);
    }

    $.Param.cdFmt = String($.Parameters['Cooldown Format']);
    $.Param.cdFontSize = Number($.Parameters['Cooldown Font Size']);
    $.Param.cdTextColor = Number($.Parameters['Cooldown Text Color']);
    $.Param.cdIcon = Number($.Parameters['Cooldown Icon']);
    $.Param.wuFmt = String($.Parameters['Warmup Format']);
    $.Param.wuFontSize = Number($.Parameters['Warmup Font Size']);
    $.Param.wuTextColor = Number($.Parameters['Warmup Text Color']);
    $.Param.wuIcon = Number($.Parameters['Warmup Icon']);
    $.Param.padding = Number($.Parameters['Text Padding']);

    //=============================================================================
    // DataManager
    //=============================================================================

    var itemCooldownsDataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function () {
        if (!itemCooldownsDataManager_isDatabaseLoaded.call(this)) return false;
        this.processItemCDNotetags($dataItems);
        this.processItemCDNotetags2($dataItems);
        this.processItemCDNotetags2($dataSkills);
        this.processItemCDNotetags2($dataActors);
        this.processItemCDNotetags2($dataClasses);
        this.processItemCDNotetags2($dataStates);
        this.processItemCDNotetags2($dataEnemies);
        this.processItemCDNotetags2($dataWeapons);
        this.processItemCDNotetags2($dataArmors);
        this.processItemCDNotetags3($dataActors);
        this.processItemCDNotetags3($dataClasses);
        this.processItemCDNotetags3($dataEnemies);
        this.processItemCDNotetags3($dataWeapons);
        this.processItemCDNotetags3($dataArmors);
        this.processItemCDNotetags3($dataStates);
        return true;
    };

    DataManager.processItemCDNotetags = function (group) {
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            var notedata = obj.note.split(/[\r\n]+/);
            obj.cooldown = {};
            obj.itypeCooldown = {};
            obj.globalCooldown = 0;
            obj.afterBattleCooldown = eval($.Param.cdAfterBattle);
            obj.cooldownSteps = Math.max(1, parseInt($.Param.cdSteps));
            obj.itemTypeId = -1;
            obj.warmup = 0;
            obj.bypassCooldown = $.Param.cdBypass.contains(obj.id);
            obj.cooldownEval = '';
            obj.warmupEval = '';
            obj.partyCooldown = false;
            obj.partyCooldownTurns = {};
            obj.partyITypeCooldowns = {};
            obj.partyGlobalCooldown = 0;
            obj.partyCooldownEval = '';
            var evalMode = 'none';

            for (var i = 0; i < notedata.length; i++) {
                var line = notedata[i];
                if (line.match(/<(?:COOLDOWN):[ ](\d+)>/i)) {
                    obj.cooldown[obj.id] = parseInt(RegExp.$1);
                } else if (line.match(/<(?:PARTY COOLDOWN):[ ](\d+)>/i)) {
                    var turns = parseInt(RegExp.$1);
                    obj.partyCooldownTurns[obj.id] = turns;
                    if (turns > 0) obj.partyCooldown = true;
                } else if (line.match(/<(?:ITYPE):[ ](\d+)>/i)) {
                    obj.itemTypeId = parseInt(RegExp.$1);
                } else if (line.match(/<(?:AFTER BATTLE COOLDOWN):[ ]([\+\-]\d+)>/i)) {
                    obj.afterBattleCooldown = parseInt(RegExp.$1);
                } else if (line.match(/<(?:COOLDOWN STEPS):[ ](\d+)>/i)) {
                    obj.cooldownSteps = parseInt(RegExp.$1);
                } else if (line.match(/<(?:WARMUP):[ ](\d+)>/i)) {
                    obj.warmup = parseInt(RegExp.$1);
                } else if (line.match(/<(?:ITEM)[ ](\d+)[ ](?:COOLDOWN):[ ](\d+)>/i)) {
                    obj.cooldown[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
                } else if (line.match(/<(?:ITYPE)[ ](\d+)[ ](?:COOLDOWN):[ ](\d+)>/i)) {
                    obj.itypeCooldown[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
                } else if (line.match(/<(?:ITYPE)[ ](\d+)[ ](?:PARTY COOLDOWN):[ ](\d+)>/i)) {
                    obj.partyITypeCooldowns[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
                    obj.partyCooldown = true;
                }
                else if (line.match(/<(?:GLOBAL COOLDOWN):[ ](\d+)>/i)) {
                    obj.globalCooldown = parseInt(RegExp.$1);
                }
                else if (line.match(/<(?:GLOBAL PARTY COOLDOWN):[ ](\d+)>/i)) {
                    obj.partyGlobalCooldown = parseInt(RegExp.$1);
                } else if (line.match(/<(?:BYPASS COOLDOWN)>/i)) {
                    obj.bypassCooldown = true;
                } else if (line.match(/<(?:COOLDOWN EVAL)>/i)) {
                    evalMode = 'cooldown';
                } else if (line.match(/<\/(?:COOLDOWN EVAL)>/i)) {
                    evalMode = 'none';
                } else if (line.match(/<(?:WARMUP EVAL)>/i)) {
                    evalMode = 'warmup';
                } else if (line.match(/<\/(?:WARMUP EVAL)>/i)) {
                    evalMode = 'none';
                } else if (line.match(/<(?:PARTY COOLDOWN EVAL)>/i)) {
                    evalMode = 'partycooldown';
                } else if (line.match(/<\/(?:PARTY COOLDOWN EVAL)>/i)) {
                    evalMode = 'none';
                } else if (evalMode === 'cooldown') {
                    obj.cooldownEval = obj.cooldownEval + line + '\n';
                }else if (evalMode === 'partycooldown') {
                    obj.partyCooldownEval = obj.partyCooldownEval + line + '\n';
                } else if (evalMode === 'warmup') {
                    obj.warmupEval = obj.warmupEval + line + '\n';
                }
            }
        }
    };

    DataManager.processItemCDNotetags3 = function (group) {
        var note1 = /<(?:ITEM)[ ](\d+)[ ](?:COOLDOWN DURATION):[ ](\d+)([%ï¼…])>/i;
        var note2 = /<(?:ITYPE)[ ](\d+)[ ](?:COOLDOWN DURATION):[ ](\d+)([%ï¼…])>/i;
        var note3 = /<(?:ITEM GLOBAL COOLDOWN DURATION):[ ](\d+)([%ï¼…])>/i;
        var note4 = /<(?:ITEM)[ ](\d+)[ ](?:COOLDOWN RATE):[ ](\d+)([%ï¼…])>/i;
        var note5 = /<(?:ITYPE)[ ](\d+)[ ](?:COOLDOWN RATE):[ ](\d+)([%ï¼…])>/i;
        var note6 = /<(?:ITEM GLOBAL COOLDOWN RATE):[ ](\d+)([%ï¼…])>/i;
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            var notedata = obj.note.split(/[\r\n]+/);

            obj.itemCooldownDuration = {};
            obj.itypeCooldownDuration = {};
            obj.itemGlobalCooldownDuration = 1.0;
            obj.itemCooldownRate = {};
            obj.itypeCooldownRate = {};
            obj.itemGlobalCooldownRate = 1.0;

            for (var i = 0; i < notedata.length; i++) {
                var line = notedata[i];
                if (line.match(note1)) {
                    obj.itemCooldownDuration[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
                } else if (line.match(note2)) {
                    obj.itypeCooldownDuration[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
                } else if (line.match(note3)) {
                    obj.itemGlobalCooldownDuration = parseFloat(RegExp.$1 * 0.01);
                } else if (line.match(note4)) {
                    obj.itemCooldownRate[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
                } else if (line.match(note5)) {
                    obj.itypeCooldownRate[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
                } else if (line.match(note6)) {
                    obj.itemGlobalCooldownRate = parseFloat(RegExp.$1 * 0.01);
                }
            }
        }
    };


    DataManager.processItemCDNotetags2 = function (group) {
        var note1 = /<(?:ITEM)[ ](\d+)[ ](?:COOLDOWN):[ ]([\+\-]\d+)>/i;
        var note2 = /<(?:ITYPE)[ ](\d+)[ ](?:COOLDOWN):[ ]([\+\-]\d+)>/i;
        var note3 = /<(?:ITEM GLOBAL COOLDOWN):[ ]([\+\-]\d+)>/i;
        var note4 = /<(?:ITEM)[ ](\d+)[ ](?:WARMUP):[ ]([\+\-]\d+)>/i;
        var note5 = /<(?:ITYPE)[ ](\d+)[ ](?:WARMUP):[ ]([\+\-]\d+)>/i;
        var note6 = /<(?:ITEM GLOBAL WARMUP):[ ]([\+\-]\d+)>/i;
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            var notedata = obj.note.split(/[\r\n]+/);

            obj.itemCooldownChange = {};
            obj.itypeCooldownChange = {};
            obj.itemGlobalCooldownChange = 0;
            obj.itemWarmupChange = {};
            obj.itypeWarmupChange = {};
            obj.itemGlobalWarmupChange = 0;

            for (var i = 0; i < notedata.length; i++) {
                var line = notedata[i];
                if (line.match(note1)) {
                    obj.itemCooldownChange[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
                } else if (line.match(note2)) {
                    obj.itypeCooldownChange[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
                } else if (line.match(note3)) {
                    obj.itemGlobalCooldownChange = parseInt(RegExp.$1);
                } else if (line.match(note4)) {
                    obj.itemWarmupChange[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
                } else if (line.match(note5)) {
                    obj.itypeWarmupChange[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
                } else if (line.match(note6)) {
                    obj.itemGlobalWarmupChange = parseInt(RegExp.$1);
                }
            }
        }
    };


    //=============================================================================
    // BattleManager
    //=============================================================================

    var itemCoolDownsBattleManager_endBattle = BattleManager.endBattle;
    BattleManager.endBattle = function (result) {
        itemCoolDownsBattleManager_endBattle.call(this, result);
        $gameParty.endBattleItemCooldowns();
    };


    BattleManager.timeBasedItemCooldowns = function () {
        if (!$gameParty.inBattle()) return false;
        if (!Imported.YEP_BattleEngineCore) return false;
        if (this.isTurnBased()) return false;
        if (this._timeBasedItemCooldowns !== undefined) return this._timeBasedItemCooldowns;
        this._timeBasedItemCooldowns = $.Param.cdTimeBased;
        return this._timeBasedItemCooldowns;
    };

    if (!Imported.YEP_BattleEngineCore) {
        var itemCooldownsBattleManager_endTurn = BattleManager.endTurn;
        BattleManager.endTurn = function () {
            itemCooldownsBattleManager_endTurn.call(this);
            if (!BattleManager.timeBasedItemCooldowns()) {
                $gameParty.updateItemPartyCooldowns();
                $gameParty.updateItemPartyWarmups();
            }
        };
    }


    //=============================================================================
    // Game_BattlerBase
    //=============================================================================

    var itemCoolDownsGameBattlerBase_initMembers = Game_BattlerBase.prototype.initMembers;
    Game_BattlerBase.prototype.initMembers = function () {
        itemCoolDownsGameBattlerBase_initMembers.call(this);
        this.clearItemCooldowns();
        this.clearItemWarmups();
    };

    Game_BattlerBase.prototype.clearItemCooldowns = function () {
        this._itemCooldownTurns = {};
    };

    Game_BattlerBase.prototype.clearItemWarmups = function () {
        this._itemWarmupTurns = {};
    };

    Game_BattlerBase.prototype.itemCooldown = function (itemId) {
        if (this._itemCooldownTurns === undefined) this.clearItemCooldowns();
        if (this._itemCooldownTurns[itemId] === undefined) {
            this._itemCooldownTurns[itemId] = 0;
        }
        return this._itemCooldownTurns[itemId];
    };

    Game_BattlerBase.prototype.itemWarmup = function (itemId) {
        if (this._itemWarmupTurns === undefined) this.clearItemWarmups();
        if (this._itemWarmupTurns[itemId] === undefined) {
            this._itemWarmupTurns[itemId] = 0;
        }
        return this._itemWarmupTurns[itemId];
    };

    Game_BattlerBase.prototype.setItemCooldown = function (itemId, value) {
        if (!$dataItems[itemId]) return;
        if ($dataItems[itemId].bypassCooldown) return;
        if (this._itemCooldownTurns === undefined) this.clearItemCooldowns();
        this._itemCooldownTurns[itemId] = value;
    };

    Game_BattlerBase.prototype.addItemCooldown = function (itemId, value) {
        if (!$dataItems[itemId]) return;
        if ($dataItems[itemId].bypassCooldown) return;
        if (this._itemCooldownTurns === undefined) this.clearItemCooldowns();
        if (!this._itemCooldownTurns[itemId]) this._itemCooldownTurns[itemId] = 0;
        this._itemCooldownTurns[itemId] += value;
    };

    Game_BattlerBase.prototype.setItemWarmup = function (itemId, value) {
        if (!$dataItems[itemId]) return;
        if ($dataItems[itemId].bypassCooldown) return;
        if (this._itemWarmupTurns === undefined) this.clearItemWarmups();
        this._itemWarmupTurns[itemId] = value;
    };

    Game_BattlerBase.prototype.startItemWarmups = function () {
        if (this._itemWarmupTurns === undefined) this.clearItemWarmups();
        for (var i = 0; i < $gameParty.items().length; ++i) {
            var item = $gameParty.items()[i];
            if (!item) continue;

            var warmup = item.warmup;
            if (item.warmupEval.length > 0) {
                var item = item;
                var a = this;
                var user = this;
                var subject = this;
                var s = $gameSwitches._data;
                var v = $gameVariables._data;
                eval(item.warmupEval);

            }
            warmup *= this.itemCooldownDuration(item);
            warmup += this.getItemWarmupMods(item);

            this.setItemWarmup(item.id, warmup);

        }
    };

    Game_BattlerBase.prototype.updateItemCooldowns = function () {
        if (this._itemCooldownTurns === undefined) this.clearItemCooldowns();
        for (var itemId in this._itemCooldownTurns) {
            var item = $dataItems[itemId];
            if (!item) continue;
            this._itemCooldownTurns[itemId] -= this.itemCooldownRate(item);
        }
    };

    Game_BattlerBase.prototype.updateItemWarmups = function () {
        if (this._itemWarmupTurns === undefined) this.clearItemWarmups();
        for (var itemId in this._itemWarmupTurns) {
            var item = $dataItems[itemId];
            if (!item) continue;
            this._itemWarmupTurns[itemId] -= this.itemCooldownRate(item);
        }
    };


    Game_BattlerBase.prototype.itemCooldownRateTick = function (item) {
        this._itemCooldownTickRate = this._itemCooldownTickRate || {};
        if (!this._itemCooldownTickRate[item.id]) {
            this._itemCooldownTickRate[item.id] = this.itemCooldownRate(item);
        }
        var rate = this._itemCooldownTickRate[item.id];
        rate *= BattleManager.tickRate() / $.Param.cdTurnTime;
        return rate;
    };

    Game_BattlerBase.prototype.updateItemCooldownTicks = function () {
        if (this._itemCooldownTurns === undefined) this.clearItemCooldowns();
        for (var itemId in this._itemCooldownTurns) {
            var item = $dataItems[itemId];
            if (!item) continue;
            if (this._itemCooldownTurns[itemId] <= 0) continue;
            this._itemCooldownTurns[itemId] -= this.itemCooldownRateTick(item);
            this._itemCooldownTurns[itemId] = Math.max(0, this._itemCooldownTurns[itemId]);
        }
    };

    Game_BattlerBase.prototype.updateItemWarmupTicks = function () {
        if (this._itemWarmupTurns === undefined) this.clearItemWarmups();
        for (var itemId in this._itemWarmupTurns) {
            var item = $dataSkills[itemId];
            if (!item) continue;
            if (this._itemWarmupTurns[itemId] <= 0) continue;
            this._itemWarmupTurns[itemId] -= this.itemCooldownRateTick(item);
            this._itemWarmupTurns[itemId] = Math.max(0, this._itemWarmupTurns[itemId]);
        }
    };

    var itemCooldownsGameBattlerBase_meetsItemConditions = Game_BattlerBase.prototype.meetsItemConditions;
    Game_BattlerBase.prototype.meetsItemConditions = function (item) {
        if (item.partyCooldown) {
            if (this.friendsUnit().itemPartyCooldown(item.id) > 0) return false;
            if (this.friendsUnit().itemPartyWarmup(item.id) > 0) return false;
        }
        if (this.itemCooldown(item.id) > 0) return false;
        if (this.itemWarmup(item.id) > 0) return false;
        return itemCooldownsGameBattlerBase_meetsItemConditions.call(this, item);
    };

    Game_BattlerBase.prototype.endBattleItemCooldowns = function () {
        this.resetItemCooldownTickRates();
        for (var itemId in this._itemCooldownTurns) {
            this._itemCooldownTurns[itemId] += $dataItems[itemId].afterBattleCooldown;
        }
    };

    Game_BattlerBase.prototype.resetItemCooldownTickRates = function () {
        this._itemCooldownTickRate = {};
    };


    Game_BattlerBase.prototype.updateItemCooldownSteps = function () {
        for (var itemId in this._itemCooldownTurns) {
            var item = $dataItems[itemId];
            if (item) {
                if ($gameParty.steps() % item.cooldownSteps === 0) {
                    this._itemCooldownTurns[itemId] -= this.itemCooldownRate(item);
                }
            }
        }
    };

    Game_BattlerBase.prototype.applyItemCooldownEffect = function (item) {
        this.applyGlobalItemCooldownChange(item);
        this.applyItypeCooldownChange(item);
        this.applyItemCooldownChange(item);
    };


    Game_BattlerBase.prototype.applyItemCooldownChange = function (item) {
        for (var itemId in item.cooldownChange) {
            itemId = parseInt(itemId);
            if (!$dataItems[itemId]) continue;
            if (!item.cooldownChange[itemId]) continue;
            var value = item.cooldownChange[itemId];
            this.addItemCooldown(itemId, value);
        }
    };


    Game_BattlerBase.prototype.applyItypeCooldownChange = function (mainItem) {
        for (var itypeId in mainItem.itypeCooldownChange) {
            itypeId = parseInt(itypeId);
            for (var i = 0; i < $gameParty.items().length; ++i) {
                var item = $gameParty.items()[i];
                if (!item) continue;
                if (item.itemTypeId !== itypeId) continue;
                if (!mainItem.itypeCooldownChange[itypeId]) continue;
                var value = mainItem.itypeCooldownChange[itypeId];
                this.addItemCooldown(item.id, value);
            }
        }
    };


    Game_BattlerBase.prototype.applyGlobalItemCooldownChange = function (mainItem) {
        for (var i = 0; i < $gameParty.items().length; ++i) {
            var item = $gameParty.items()[i];
            if (!item) continue;
            var value = mainItem.itemGlobalCooldownChange;
            this.addItemCooldown(item.id, value);
        }
    };


    Game_BattlerBase.prototype.getItemWarmupMods = function (item) {
        var value = 0;
        value += this.flatItemWarmupChange(item);
        return value;
    };

    Game_BattlerBase.prototype.applyItemCooldownMods = function (item) {
        var value = this.itemCooldown(item.id);
        value += this.flatItemCooldownChange(item);
        this.setItemCooldown(item.id, Math.max(0, value));
    };


    Game_BattlerBase.prototype.payGlobalItemCooldown = function (mainItem) {
        for (var i = 0; i < $gameParty.items().length; ++i) {
            var item = $gameParty.items()[i];
            if (!item) continue;
            var value = mainItem.globalCooldown;
            value *= this.itemCooldownDuration(mainItem);
            value = Math.max(value, this.itemCooldown(item.id));
            this.setItemCooldown(item.id, value);
        }
    };

    Game_BattlerBase.prototype.payItypeCooldownCost = function (mainItem) {
        for (var itypeId in mainItem.itypeCooldown) {
            itypeId = parseInt(itypeId);
            for (var i = 0; i < $gameParty.items().length; ++i) {
                var item = $gameParty.items()[i];
                if (!item) continue;
                if (item.itemTypeId !== itypeId) continue;
                var value = mainItem.itypeCooldown[itypeId];
                value *= this.itemCooldownDuration(mainItem);
                value = Math.max(value, this.itemCooldown(item.id));
                this.setItemCooldown(item.id, value);
            }
        }
    };

    Game_BattlerBase.prototype.payItemCooldownCost = function (item) {
        for (var itemId in item.cooldown) {
            itemId = parseInt(itemId);
            if (!$dataItems[itemId]) continue;
            var cooldown = item.cooldown[itemId];
            if (item.id === itemId) {
                if (item.cooldownEval.length > 0) {
                    var item = item;
                    var a = this;
                    var user = this;
                    var subject = this;
                    var s = $gameSwitches._data;
                    var v = $gameVariables._data;
                    eval(item.cooldownEval);
                }
            }
            cooldown *= this.itemCooldownDuration(item);
            cooldown = Math.max(cooldown, this.itemCooldown(item.id));
            this.setItemCooldown(itemId, cooldown);
        }
    };


    //===============================================================================
    // Game_Battler
    //===============================================================================

    var itemCooldownsGameBattler_consumeItem = Game_Battler.prototype.consumeItem;
    Game_Battler.prototype.consumeItem = function (item) {
        if (DataManager.isItem(item)) {
            $gameParty.payGlobalPartyItemCooldown(item);
            $gameParty.payItypePartyCooldownCost(item);
            $gameParty.payItemPartyCooldownCost(item,this);
            $gameParty.applyItemPartyCooldownMods(item);

            this.payGlobalItemCooldown(item);
            this.payItypeCooldownCost(item);
            this.payItemCooldownCost(item);
            this.applyItemCooldownMods(item);

        }
        itemCooldownsGameBattler_consumeItem.call(this, item);
    };

    Game_Battler.prototype.itemCooldownDuration = function (item) {
        var itemId = item.id;
        var itypeId = item.itemTypeId;
        var value = 1.0;
        for (var i = 0; i < this.states().length; ++i) {
            var state = this.states()[i];
            if (!state) continue;
            if (state.itemCooldownDuration[itemId] !== undefined) {
                value *= state.itemCooldownDuration[itemId];
            }
            if (state.itypeCooldownDuration[itypeId] !== undefined) {
                value *= state.itypeCooldownDuration[itypeId];
            }
            value *= state.itemGlobalCooldownDuration;
        }
        return value;
    };

    Game_Battler.prototype.itemCooldownRate = function (item) {
        var itemId = item.id;
        var itypeId = item.itemTypeId;
        var value = 1;
        for (var i = 0; i < this.states().length; ++i) {
            var state = this.states()[i];
            if (!state) continue;
            if (state.itemCooldownRate[itemId] !== undefined) {
                value *= state.itemCooldownRate[itemId];
            }
            if (state.itypeCooldownRate[itypeId] !== undefined) {
                value *= state.itypeCooldownRate[itypeId];
            }
            value *= state.itemGlobalCooldownRate;
        }
        return value;
    };


    Game_Battler.prototype.flatItemCooldownChange = function (item) {
        var itemId = item.id;
        var itypeId = item.itemTypeId;
        var value = 0;
        for (var i = 0; i < this.states().length; ++i) {
            var state = this.states()[i];
            if (!state) continue;
            if (state.itemCooldownChange[itemId] !== undefined) {
                value += state.itemCooldownChange[itemId];
            }
            if (state.itypeCooldownChange[itypeId] !== undefined) {
                value += state.itypeCooldownChange[itypeId];
            }
            value += state.itemGlobalCooldownChange;
        }
        return value;
    };

    Game_Battler.prototype.flatItemWarmupChange = function (item) {
        var itemId = item.id;
        var itypeId = item.itemTypeId;
        var value = 0;
        for (var i = 0; i < this.states().length; ++i) {
            var state = this.states()[i];
            if (!state) continue;
            if (state.itemWarmupChange[itemId] !== undefined) {
                value += state.itemWarmupChange[itemId];
            }
            if (state.itypeWarmupChange[itypeId] !== undefined) {
                value += state.itypeWarmupChange[itypeId];
            }
            value += state.itemGlobalWarmupChange;
        }
        return value;
    };

    var itemCooldownsGameBattler_refresh = Game_Battler.prototype.refresh;
    Game_Battler.prototype.refresh = function () {
        itemCooldownsGameBattler_refresh.call(this);
        this.resetItemCooldownTickRates();
    };


    if (!Imported.YEP_BattleEngineCore) {
        var itemCoolDownsGameBattler_onTurnEnd = Game_Battler.prototype.onTurnEnd;
        Game_Battler.prototype.onTurnEnd = function () {
            itemCoolDownsGameBattler_onTurnEnd.call(this);
            if (!BattleManager.timeBasedItemCooldowns()) {
                this.updateItemCooldowns();
                this.updateItemWarmups();
            }
        };
    }


    // Battle Engine Core Compatibility
    if (Imported.YEP_BattleEngineCore) {

        var itemCoolDownsGameBattler_onTurnStart = Game_Battler.prototype.onTurnStart;
        Game_Battler.prototype.onTurnStart = function () {
            itemCoolDownsGameBattler_onTurnStart.call(this);
            if (BattleManager.isTickBased() && !BattleManager.timeBasedItemCooldowns()) {
                this.updateItemCooldowns();
                this.updateItemWarmups();
            }
        };

        var itemCooldownsGameBattler_updateTick = Game_Battler.prototype.updateTick;
        Game_Battler.prototype.updateTick = function () {
            itemCooldownsGameBattler_updateTick.call(this);
            if (BattleManager.isTickBased() && BattleManager.timeBasedItemCooldowns()) {
                this.updateItemCooldownTicks();
                this.updateItemWarmupTicks();
            }

        };

    }


    //=============================================================================
    // Game_Actor
    //=============================================================================


    var itemCooldownsGameActor_onBattleStart = Game_Actor.prototype.onBattleStart;
    Game_Actor.prototype.onBattleStart = function () {
        itemCooldownsGameActor_onBattleStart.call(this);
        this.resetItemCooldownTickRates();
        this.startItemWarmups();
    };

    Game_Actor.prototype.itemCooldownDuration = function (item) {
        var value = Game_Battler.prototype.itemCooldownDuration.call(this, item);
        var itemId = item.id;
        var itypeId = item.itemTypeId;
        if (this.actor().itemCooldownDuration[itemId] !== undefined) {
            value *= this.actor().itemCooldownDuration[itemId];
        }
        if (this.currentClass().itemCooldownDuration[itemId] !== undefined) {
            value *= this.currentClass().itemCooldownDuration[itemId];
        }
        if (this.actor().itypeCooldownDuration[itypeId] !== undefined) {
            value *= this.actor().itypeCooldownDuration[itypeId];
        }
        if (this.currentClass().itypeCooldownDuration[itypeId] !== undefined) {
            value *= this.currentClass().itypeCooldownDuration[itypeId];
        }
        value *= this.actor().itemGlobalCooldownDuration;
        value *= this.currentClass().itemGlobalCooldownDuration;
        for (var i = 0; i < this.equips().length; ++i) {
            var equip = this.equips()[i];
            if (!equip) continue;
            if (equip.itemCooldownDuration !== undefined) {
                if (equip.itemCooldownDuration[itemId] !== undefined) {
                    value *= equip.itemCooldownDuration[itemId];
                }
            }
            if (equip.itypeCooldownDuration !== undefined) {
                if (equip.itypeCooldownDuration[itypeId] !== undefined) {
                    value *= equip.itypeCooldownDuration[itypeId];
                }
            }
            if (equip.itemGlobalCooldownDuration !== undefined) {
                value *= equip.itemGlobalCooldownDuration;
            }
        }
        return value;
    };

    Game_Actor.prototype.itemCooldownRate = function (item) {
        var value = Game_Battler.prototype.itemCooldownRate.call(this, item);
        var itemId = item.id;
        var itypeId = item.itemTypeId;
        if (this.actor().itemCooldownRate[itemId] !== undefined) {
            value *= this.actor().itemCooldownRate[itemId];
        }
        if (this.currentClass().itemCooldownRate[itemId] !== undefined) {
            value *= this.currentClass().itemCooldownRate[itemId];
        }
        if (this.actor().itypeCooldownRate[itypeId] !== undefined) {
            value *= this.actor().itypeCooldownRate[itypeId];
        }
        if (this.currentClass().itypeCooldownRate[itypeId] !== undefined) {
            value *= this.currentClass().itypeCooldownRate[itypeId];
        }
        value *= this.actor().itemGlobalCooldownRate;
        value *= this.currentClass().itemGlobalCooldownRate;
        for (var i = 0; i < this.equips().length; ++i) {
            var equip = this.equips()[i];
            if (!equip) continue;
            if (equip.itemCooldownRate !== undefined) {
                if (equip.itemCooldownRate[itemId] !== undefined) {
                    value *= equip.itemCooldownRate[itemId];
                }
            }
            if (equip.itypeCooldownRate !== undefined) {
                if (equip.itypeCooldownRate[itypeId] !== undefined) {
                    value *= equip.itypeCooldownRate[itypeId];
                }
            }
            if (equip.itemGlobalCooldownRate !== undefined) {
                value *= equip.itemGlobalCooldownRate;
            }
        }
        return value;
    };

    Game_Actor.prototype.flatItemCooldownChange = function (item) {
        var itemId = item.id;
        var itypeId = item.itemTypeId;
        var value = Game_Battler.prototype.flatItemCooldownChange.call(this, item);
        if (this.actor().itemCooldownChange[itemId] !== undefined) {
            value += this.actor().itemCooldownChange[itemId];
        }
        if (this.currentClass().itemCooldownChange[itemId] !== undefined) {
            value += this.currentClass().itemCooldownChange[itemId];
        }
        if (this.actor().itypeCooldownChange[itypeId] !== undefined) {
            value += this.actor().itypeCooldownChange[itypeId];
        }
        if (this.currentClass().itypeCooldownChange[itypeId] !== undefined) {
            value += this.currentClass().itypeCooldownChange[itypeId];
        }
        value += this.actor().itemGlobalCooldownChange;
        value += this.currentClass().itemGlobalCooldownChange;
        for (var i = 0; i < this.equips().length; ++i) {
            var equip = this.equips()[i];
            if (!equip) continue;
            if (equip.itemCooldownChange === undefined) continue;
            if (equip.itemCooldownChange[itemId] !== undefined) {
                value += equip.itemCooldownChange[itemId];
            }
            if (equip.itypeCooldownChange[itypeId] !== undefined) {
                value += equip.itypeCooldownChange[itypeId];
            }
            value += equip.itemGlobalCooldownChange;
        }
        return value;
    };

    Game_Actor.prototype.flatItemWarmupChange = function (item) {
        var itemId = item.id;
        var itypeId = item.itemTypeId;
        var value = Game_Battler.prototype.flatItemWarmupChange.call(this, item);
        if (this.actor().itemWarmupChange[itemId] !== undefined) {
            value += this.actor().itemWarmupChange[itemId];
        }
        if (this.currentClass().itemWarmupChange[itemId] !== undefined) {
            value += this.currentClass().itemWarmupChange[itemId];
        }
        if (this.actor().itypeWarmupChange[itypeId] !== undefined) {
            value += this.actor().itypeWarmupChange[itypeId];
        }
        if (this.currentClass().itypeWarmupChange[itypeId] !== undefined) {
            value += this.currentClass().itypeWarmupChange[itypeId];
        }
        value += this.actor().itemGlobalWarmupChange;
        value += this.currentClass().itemGlobalWarmupChange;
        for (var i = 0; i < this.equips().length; ++i) {
            var equip = this.equips()[i];
            if (!equip) continue;
            if (equip.itemWarmupChange === undefined) continue;
            if (equip.itemWarmupChange[itemId] !== undefined) {
                value += equip.itemWarmupChange[itemId];
            }
            if (equip.itypeWarmupChange[itypeId] !== undefined) {
                value += equip.itypeWarmupChange[itypeId];
            }
            value += equip.itemGlobalWarmupChange;
        }
        return value;
    };

    //=============================================================================
    // Game_Action
    //=============================================================================

    var itemCooldownsGameAction_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
    Game_Action.prototype.applyItemUserEffect = function (target) {
        itemCooldownsGameAction_applyItemUserEffect.call(this, target);
        $gameParty.applyItemPartyCooldownEffect(this.item());
        target.applyItemCooldownEffect(this.item());

    };


    //=============================================================================
    // Game_Unit
    //=============================================================================

    Game_Unit.prototype.updateItemCooldowns = function () {
        if (BattleManager.timeBasedItemCooldowns()) return;
        return this.members().forEach(function (member) {
            member.updateItemCooldowns();
            member.updateItemWarmups();
        });
    };

    Game_Unit.prototype.endBattleItemCooldowns = function () {
        this.members().forEach(function (member) {
            member.endBattleItemCooldowns();
            member.clearItemWarmups();
        });
        this.clearItemPartyWarmups();
        this.endBattlePartyItemCooldowns();
    };

    //=============================================================================
    // Game_Party
    //=============================================================================

    var itemCooldownsGameParty_increaseSteps = Game_Party.prototype.increaseSteps;
    Game_Party.prototype.increaseSteps = function () {
        itemCooldownsGameParty_increaseSteps.call(this);
        this.updateItemCooldownSteps();
        this.updateItemPartyCooldownSteps();
    };

    Game_Party.prototype.updateItemCooldownSteps = function () {
        return this.members().forEach(function (member) {
            return member.updateItemCooldownSteps();
        });
    };

    var itemCooldownsGameParty_initialize = Game_Party.prototype.initialize;
    Game_Party.prototype.initialize = function () {
        itemCooldownsGameParty_initialize.call(this);
        this.clearItemPartyCooldowns();
        this.clearItemPartyWarmups();
    };

    var itemCooldownsGameParty_onBattleStart = Game_Party.prototype.onBattleStart;
    Game_Party.prototype.onBattleStart = function () {
        itemCooldownsGameParty_onBattleStart.call(this);
        this.resetItemPartyCooldownTickRates();
        this.startItemPartyWarmups();
    };


    Game_Party.prototype.clearItemPartyCooldowns = function () {
        this._itemCooldownTurns = {};
    };

    Game_Party.prototype.clearItemPartyWarmups = function () {
        this._itemWarmupTurns = {};
    };

    Game_Party.prototype.itemPartyCooldown = function (itemId) {
        if (this._itemCooldownTurns === undefined) this.clearItemPartyCooldowns();
        if (this._itemCooldownTurns[itemId] === undefined) {
            this._itemCooldownTurns[itemId] = 0;
        }
        return this._itemCooldownTurns[itemId];
    };

    Game_Party.prototype.itemPartyWarmup = function (itemId) {
        if (this._itemWarmupTurns === undefined) this.clearItemPartyWarmups();
        if (this._itemWarmupTurns[itemId] === undefined) {
            this._itemWarmupTurns[itemId] = 0;
        }
        return this._itemWarmupTurns[itemId];
    };

    Game_Party.prototype.setItemPartyCooldown = function (itemId, value) {
        if (!$dataItems[itemId]) return;
        if ($dataItems[itemId].bypassCooldown) return;
        if (this._itemCooldownTurns === undefined) this.clearItemPartyCooldowns();
        this._itemCooldownTurns[itemId] = value;
    };

    Game_Party.prototype.addItemPartyCooldown = function (itemId, value) {
        if (!$dataItems[itemId]) return;
        if ($dataItems[itemId].bypassCooldown) return;
        if (this._itemCooldownTurns === undefined) this.clearItemPartyCooldowns();
        if (!this._itemCooldownTurns[itemId]) this._itemCooldownTurns[itemId] = 0;
        this._itemCooldownTurns[itemId] += value;
    };

    Game_Party.prototype.setItemPartyWarmup = function (itemId, value) {
        if (!$dataItems[itemId]) return;
        if ($dataItems[itemId].bypassCooldown) return;
        if (this._itemWarmupTurns === undefined) this.clearItemPartyWarmups();
        this._itemWarmupTurns[itemId] = value;
    };

    Game_Party.prototype.startItemPartyWarmups = function () {
        if (this._itemWarmupTurns === undefined) this.clearItemPartyWarmups();
        for (var i = 0; i < this.items().length; ++i) {
            var item = this.items()[i];
            if (!item) continue;

            var warmup = item.warmup;
            if (item.warmupEval.length > 0) {
                var item = item;
                var members = this.allMembers();
                var battlers = this.battleMembers();
                var leader = this.leader();
                var party = this;
                var s = $gameSwitches._data;
                var v = $gameVariables._data;
                eval(item.warmupEval);
            }
            warmup *= this.itemPartyCooldownDuration(item);
            warmup += this.getItemPartyWarmupMods(item);

            this.setItemPartyWarmup(item.id, warmup);

        }
    };

    Game_Party.prototype.updateItemPartyCooldowns = function () {
        if (this._itemCooldownTurns === undefined) this.clearItemPartyCooldowns();
        for (var itemId in this._itemCooldownTurns) {
            var item = $dataItems[itemId];
            if (!item) continue;
            this._itemCooldownTurns[itemId] -= this.itemPartyCooldownRate(item);
        }
    };

    Game_Party.prototype.updateItemPartyWarmups = function () {
        if (this._itemWarmupTurns === undefined) this.clearItemPartyWarmups();
        for (var itemId in this._itemWarmupTurns) {
            var item = $dataItems[itemId];
            if (!item) continue;
            this._itemWarmupTurns[itemId] -= this.itemPartyCooldownRate(item);
        }
    };


    Game_Party.prototype.itemCooldownPartyRateTick = function (item) {
        this._itemCooldownTickRate = this._itemCooldownTickRate || {};
        if (!this._itemCooldownTickRate[item.id]) {
            this._itemCooldownTickRate[item.id] = this.itemPartyCooldownRate(item);
        }
        var rate = this._itemCooldownTickRate[item.id];
        rate *= BattleManager.tickRate() / $.Param.cdTurnTime;
        return rate;
    };

    Game_Party.prototype.updateItemPartyCooldownTicks = function () {
        if (this._itemCooldownTurns === undefined) this.clearItemPartyCooldowns();
        for (var itemId in this._itemCooldownTurns) {
            var item = $dataItems[itemId];
            if (!item) continue;
            if (this._itemCooldownTurns[itemId] <= 0) continue;
            this._itemCooldownTurns[itemId] -= this.itemCooldownPartyRateTick(item);
            this._itemCooldownTurns[itemId] = Math.max(0, this._itemCooldownTurns[itemId]);
        }
    };

    Game_Party.prototype.updateItemPartyWarmupTicks = function () {
        if (this._itemWarmupTurns === undefined) this.clearItemPartyWarmups();
        for (var itemId in this._itemWarmupTurns) {
            var item = $dataSkills[itemId];
            if (!item) continue;
            if (this._itemWarmupTurns[itemId] <= 0) continue;
            this._itemWarmupTurns[itemId] -= this.itemCooldownPartyRateTick(item);
            this._itemWarmupTurns[itemId] = Math.max(0, this._itemWarmupTurns[itemId]);
        }
    };

    Game_Party.prototype.endBattlePartyItemCooldowns = function () {
        this.resetItemPartyCooldownTickRates();
        for (var itemId in this._itemCooldownTurns) {
            this._itemCooldownTurns[itemId] += $dataItems[itemId].afterBattleCooldown;
        }
    };

    Game_Party.prototype.resetItemPartyCooldownTickRates = function () {
        this._itemCooldownTickRate = {};
    };


    Game_Party.prototype.updateItemPartyCooldownSteps = function () {
        for (var itemId in this._itemCooldownTurns) {
            var item = $dataItems[itemId];
            if (item) {
                if (this.steps() % item.cooldownSteps === 0) {
                    this._itemCooldownTurns[itemId] -= this.itemPartyCooldownRate(item);
                }
            }
        }
    };

    Game_Party.prototype.applyItemPartyCooldownEffect = function (item) {
        this.applyGlobalItemPartyCooldownChange(item);
        this.applyItypePartyCooldownChange(item);
        this.applyItemPartyCooldownChange(item);
    };


    Game_Party.prototype.applyItemPartyCooldownChange = function (item) {
        for (var itemId in item.cooldownChange) {
            itemId = parseInt(itemId);
            if (!$dataItems[itemId]) continue;
            if (!item.cooldownChange[itemId]) continue;
            var value = item.cooldownChange[itemId];
            this.addItemPartyCooldown(itemId, value);
        }
    };


    Game_Party.prototype.applyItypePartyCooldownChange = function (mainItem) {
        for (var itypeId in mainItem.itypeCooldownChange) {
            itypeId = parseInt(itypeId);
            for (var i = 0; i < $gameParty.items().length; ++i) {
                var item = $gameParty.items()[i];
                if (!item) continue;
                if (item.itemTypeId !== itypeId) continue;
                if (!mainItem.itypeCooldownChange[itypeId]) continue;
                var value = mainItem.itypeCooldownChange[itypeId];
                this.addItemPartyCooldown(item.id, value);
            }
        }
    };

    Game_Party.prototype.itemPartyCooldownDuration = function (item) {
        var itemId = item.id;
        var itypeId = item.itemTypeId;
        var value = 1.0;
        for (var m = 0; m < this.members().length; m++) {
            var member = this.members()[m];
            for (var i = 0; i < member.states().length; ++i) {
                var state = member.states()[i];
                if (!state) continue;
                if (state.itemCooldownDuration[itemId] !== undefined) {
                    value *= state.itemCooldownDuration[itemId];
                }
                if (state.itypeCooldownDuration[itypeId] !== undefined) {
                    value *= state.itypeCooldownDuration[itypeId];
                }
                value *= state.itemGlobalCooldownDuration;
            }
            if (member.actor().itemCooldownDuration[itemId] !== undefined) {
                value *= member.actor().itemCooldownDuration[itemId];
            }
            if (member.currentClass().itemCooldownDuration[itemId] !== undefined) {
                value *= member.currentClass().itemCooldownDuration[itemId];
            }
            if (member.actor().itypeCooldownDuration[itypeId] !== undefined) {
                value *= member.actor().itypeCooldownDuration[itypeId];
            }
            if (member.currentClass().itypeCooldownDuration[itypeId] !== undefined) {
                value *= member.currentClass().itypeCooldownDuration[itypeId];
            }
            value *= member.actor().itemGlobalCooldownDuration;
            value *= member.currentClass().itemGlobalCooldownDuration;
            for (var e = 0; e < member.equips().length; ++e) {
                var equip = member.equips()[e];
                if (!equip) continue;
                if (equip.itemCooldownDuration !== undefined) {
                    if (equip.itemCooldownDuration[itemId] !== undefined) {
                        value *= equip.itemCooldownDuration[itemId];
                    }
                }
                if (equip.itypeCooldownDuration !== undefined) {
                    if (equip.itypeCooldownDuration[itypeId] !== undefined) {
                        value *= equip.itypeCooldownDuration[itypeId];
                    }
                }
                if (equip.itemGlobalCooldownDuration !== undefined) {
                    value *= equip.itemGlobalCooldownDuration;
                }
            }

        }

        return value;
    };

    Game_Party.prototype.itemPartyCooldownRate = function (item) {
        var itemId = item.id;
        var itypeId = item.itemTypeId;
        var value = 1;
        for (var m = 0; m < this.members().length; m++) {
            var member = this.members()[m];
            for (var i = 0; i < member.states().length; ++i) {
                var state = member.states()[i];
                if (!state) continue;
                if (state.itemCooldownRate[itemId] !== undefined) {
                    value *= state.itemCooldownRate[itemId];
                }
                if (state.itypeCooldownRate[itypeId] !== undefined) {
                    value *= state.itypeCooldownRate[itypeId];
                }
                value *= state.itemGlobalCooldownRate;
            }

            if (member.actor().itemCooldownRate[itemId] !== undefined) {
                value *= member.actor().itemCooldownRate[itemId];
            }
            if (member.currentClass().itemCooldownRate[itemId] !== undefined) {
                value *= member.currentClass().itemCooldownRate[itemId];
            }
            if (member.actor().itypeCooldownRate[itypeId] !== undefined) {
                value *= member.actor().itypeCooldownRate[itypeId];
            }
            if (member.currentClass().itypeCooldownRate[itypeId] !== undefined) {
                value *= member.currentClass().itypeCooldownRate[itypeId];
            }
            value *= member.actor().itemGlobalCooldownRate;
            value *= member.currentClass().itemGlobalCooldownRate;
            for (var e = 0; e < member.equips().length; ++e) {
                var equip = member.equips()[e];
                if (!equip) continue;
                if (equip.itemCooldownRate !== undefined) {
                    if (equip.itemCooldownRate[itemId] !== undefined) {
                        value *= equip.itemCooldownRate[itemId];
                    }
                }
                if (equip.itypeCooldownRate !== undefined) {
                    if (equip.itypeCooldownRate[itypeId] !== undefined) {
                        value *= equip.itypeCooldownRate[itypeId];
                    }
                }
                if (equip.itemGlobalCooldownRate !== undefined) {
                    value *= equip.itemGlobalCooldownRate;
                }
            }
        }

        return value;
    };


    Game_Party.prototype.flatItemPartyCooldownChange = function (item) {
        var itemId = item.id;
        var itypeId = item.itemTypeId;
        var value = 0;
        for (var m = 0; m < this.members().length; m++) {
            var member = this.members()[m];
            for (var i = 0; i < member.states().length; ++i) {
                var state = member.states()[i];
                if (!state) continue;
                if (state.itemCooldownChange[itemId] !== undefined) {
                    value += state.itemCooldownChange[itemId];
                }
                if (state.itypeCooldownChange[itypeId] !== undefined) {
                    value += state.itypeCooldownChange[itypeId];
                }
                value += state.itemGlobalCooldownChange;
            }

            if (member.actor().itemCooldownChange[itemId] !== undefined) {
                value += member.actor().itemCooldownChange[itemId];
            }
            if (member.currentClass().itemCooldownChange[itemId] !== undefined) {
                value += member.currentClass().itemCooldownChange[itemId];
            }
            if (member.actor().itypeCooldownChange[itypeId] !== undefined) {
                value += member.actor().itypeCooldownChange[itypeId];
            }
            if (member.currentClass().itypeCooldownChange[itypeId] !== undefined) {
                value += member.currentClass().itypeCooldownChange[itypeId];
            }
            value += member.actor().itemGlobalCooldownChange;
            value += member.currentClass().itemGlobalCooldownChange;
            for (var e = 0; e < member.equips().length; ++e) {
                var equip = member.equips()[e];
                if (!equip) continue;
                if (equip.itemCooldownChange === undefined) continue;
                if (equip.itemCooldownChange[itemId] !== undefined) {
                    value += equip.itemCooldownChange[itemId];
                }
                if (equip.itypeCooldownChange[itypeId] !== undefined) {
                    value += equip.itypeCooldownChange[itypeId];
                }
                value += equip.itemGlobalCooldownChange;
            }

        }
        return value;
    };

    Game_Party.prototype.flatItemPartyWarmupChange = function (item) {
        var itemId = item.id;
        var itypeId = item.itemTypeId;
        var value = 0;
        for (var m = 0; m < this.members().length; m++) {
            var member = this.members()[m];
            for (var i = 0; i < member.states().length; ++i) {
                var state = member.states()[i];
                if (!state) continue;
                if (state.itemWarmupChange[itemId] !== undefined) {
                    value += state.itemWarmupChange[itemId];
                }
                if (state.itypeWarmupChange[itypeId] !== undefined) {
                    value += state.itypeWarmupChange[itypeId];
                }
                value += state.itemGlobalWarmupChange;
            }

            if (member.actor().itemWarmupChange[itemId] !== undefined) {
                value += member.actor().itemWarmupChange[itemId];
            }
            if (member.currentClass().itemWarmupChange[itemId] !== undefined) {
                value += member.currentClass().itemWarmupChange[itemId];
            }
            if (member.actor().itypeWarmupChange[itypeId] !== undefined) {
                value += member.actor().itypeWarmupChange[itypeId];
            }
            if (member.currentClass().itypeWarmupChange[itypeId] !== undefined) {
                value += member.currentClass().itypeWarmupChange[itypeId];
            }
            value += member.actor().itemGlobalWarmupChange;
            value += member.currentClass().itemGlobalWarmupChange;
            for (var e = 0; e < member.equips().length; ++e) {
                var equip = member.equips()[e];
                if (!equip) continue;
                if (equip.itemWarmupChange === undefined) continue;
                if (equip.itemWarmupChange[itemId] !== undefined) {
                    value += equip.itemWarmupChange[itemId];
                }
                if (equip.itypeWarmupChange[itypeId] !== undefined) {
                    value += equip.itypeWarmupChange[itypeId];
                }
                value += equip.itemGlobalWarmupChange;
            }

        }
        return value;
    };

    Game_Party.prototype.applyGlobalItemPartyCooldownChange = function (mainItem) {
        for (var i = 0; i < $gameParty.items().length; ++i) {
            var item = $gameParty.items()[i];
            if (!item) continue;
            var value = mainItem.itemGlobalCooldownChange;
            this.addItemPartyCooldown(item.id, value);
        }
    };


    Game_Party.prototype.getItemPartyWarmupMods = function (item) {
        var value = 0;
        value += this.flatItemPartyWarmupChange(item);
        return value;
    };

    Game_Party.prototype.applyItemPartyCooldownMods = function (item) {
        var value = this.itemPartyCooldown(item.id);
        value += this.flatItemPartyCooldownChange(item);
        this.setItemPartyCooldown(item.id, Math.max(0, value));
    };


    Game_Party.prototype.payGlobalPartyItemCooldown = function (mainItem) {
        for (var i = 0; i < this.items().length; ++i) {
            var item = this.items()[i];
            if (!item) continue;
            var value = mainItem.partyGlobalCooldown;
            value *= this.itemPartyCooldownDuration(mainItem);
            value = Math.max(value, this.itemPartyCooldown(item.id));
            this.setItemPartyCooldown(item.id, value);
        }
    };

    Game_Party.prototype.payItypePartyCooldownCost = function (mainItem) {
        for (var itypeId in mainItem.partyITypeCooldowns) {
            itypeId = parseInt(itypeId);
            for (var i = 0; i < this.items().length; ++i) {
                var item = this.items()[i];
                if (!item) continue;
                if (item.itemTypeId !== itypeId) continue;
                var value = mainItem.partyITypeCooldowns[itypeId];
                if (value <= 0) continue;
                value *= this.itemPartyCooldownDuration(mainItem);
                value = Math.max(value, this.itemPartyCooldown(item.id));
                this.setItemPartyCooldown(item.id, value);
            }
        }
    };

    Game_Party.prototype.payItemPartyCooldownCost = function (item,actor) {
        for (var itemId in item.partyCooldownTurns) {
            itemId = parseInt(itemId);
            if (!$dataItems[itemId]) continue;
            var cooldown = item.partyCooldownTurns[itemId];
            if (cooldown <= 0) continue;
            if (item.id === itemId) {
                if (item.partyCooldownEval.length > 0) {
                    var item = item;
                    var members = this.allMembers();
                    var battlers = this.battleMembers();
                    var leader = this.leader();
                    var party = this;
                    var actor = actor;
                    var subject = actor;
                    var a = actor;
                    var s = $gameSwitches._data;
                    var v = $gameVariables._data;
                    eval(item.partyCooldownEval);
                }
            }
            cooldown *= this.itemPartyCooldownDuration(item);
            cooldown = Math.max(cooldown, this.itemPartyCooldown(item.id));
            this.setItemPartyCooldown(itemId, cooldown);
        }
    };


    if (Imported.YEP_BattleEngineCore) {
        var itemCooldownsGameParty_onTurnStart = Game_Party.prototype.onTurnStart;
        Game_Party.prototype.onTurnStart = function () {
            itemCooldownsGameParty_onTurnStart.call(this);
            if (BattleManager.isTickBased() && !BattleManager.timeBasedItemCooldowns()) {
                this.updateItemPartyCooldowns();
                this.updateItemPartyWarmups();
            }
        };

        var itemCooldownsGameParty_updateTick = Game_Party.prototype.updateTick;
        Game_Party.prototype.updateTick = function () {
            itemCooldownsGameParty_updateTick.call(this);
            if (BattleManager.isTickBased() && BattleManager.timeBasedItemCooldowns()) {
                this.updateItemPartyCooldownTicks();
                this.updateItemPartyWarmupTicks();
            }
        };
    }

    //=============================================================================
    // Window_ItemList
    //=============================================================================

    var itemCooldownsWindowItemList_initialize = Window_ItemList.prototype.initialize;
    Window_ItemList.prototype.initialize = function (x, y, width, height) {
        itemCooldownsWindowItemList_initialize.call(this, x, y, width, height);
        this._actor = this.initialActor();
    };

    Window_ItemList.prototype.initialActor = function () {
        var members = $gameParty.movableMembers();
        var bestActor = members[0];
        var bestPha = 0;
        for (var i = 0; i < members.length; i++) {
            if (members[i].pha > bestPha) {
                bestPha = members[i].pha;
                bestActor = members[i];
            }
        }
        return bestActor;
    };

    Window_ItemList.prototype.setActor = function (actor) {
        this._actor = actor;
    };

    Window_ItemList.prototype.actor = function () {
        if (this._actor) return this._actor;
        return null;
    };

    var itemCooldownsItemList_isEnabled = Window_ItemList.prototype.isEnabled;
    Window_ItemList.prototype.isEnabled = function (item) {
        if (this.actor() !== null) {
            return this.actor().canUse(item);
        }
        // Failsafe in case actor is null.
        itemCooldownsItemList_isEnabled.call(this, item);
    };


    Window_ItemList.prototype.itemCooldown = function (item) {
        var actorCooldown = this.actor().itemCooldown(item.id);
        var partyCooldown = $gameParty.itemPartyCooldown(item.id);

        if (actorCooldown > partyCooldown) {
            return actorCooldown;
        }
        return partyCooldown;

    };

    Window_ItemList.prototype.itemWarmup = function (item) {
        var actorWarmup = this.actor().itemWarmup(item.id);
        var partyWarmup = $gameParty.itemPartyWarmup(item.id);

        if (actorWarmup > partyWarmup) {
            return actorWarmup;
        }
        return partyWarmup;

    };

    var itemCooldownsWindowItemList_drawItem = Window_ItemList.prototype.drawItem;
    Window_ItemList.prototype.drawItem = function (index) {
        var item = this._data[index];
        if (item) {
            if (DataManager.isItem(item)) {
                if (this.itemWarmup(item) > 0) {
                    this.drawItemWarmup(item, index);
                } else if (this.itemCooldown(item) > 0) {
                    this.drawItemCooldown(item, index);
                } else {
                    return itemCooldownsWindowItemList_drawItem.call(this, index);
                }
            }
            else {
                return itemCooldownsWindowItemList_drawItem.call(this, index);
            }
        }
        else {
            return itemCooldownsWindowItemList_drawItem.call(this, index);
        }

    };

    Window_ItemList.prototype.drawItemWarmup = function (item, index) {
        var numberWidth = this.numberWidth();
        var rect = this.itemRect(index);
        rect.width -= this.textPadding();
        this.changePaintOpacity(this.isEnabled(item));
        this.drawItemName(item, rect.x, rect.y, rect.width - numberWidth);
        this.drawWarmup(item, rect.x, rect.y, rect.width - numberWidth);
        this.drawItemNumber(item, rect.x, rect.y, rect.width);
        this.changePaintOpacity(1);
    };

    Window_ItemList.prototype.drawItemCooldown = function (item, index) {
        var numberWidth = this.numberWidth();
        var rect = this.itemRect(index);
        rect.width -= this.textPadding();
        this.changePaintOpacity(this.isEnabled(item));
        this.drawItemName(item, rect.x, rect.y, rect.width - numberWidth);
        this.drawCooldown(item, rect.x, rect.y, rect.width - numberWidth);
        this.drawItemNumber(item, rect.x, rect.y, rect.width);
        this.changePaintOpacity(1);
    };

    Window_ItemList.prototype.drawCooldown = function (item, x, y, width) {
        if ($.Param.cdIcon > 0) {
            var iw = x + width - Window_Base._iconWidth;
            this.drawIcon($.Param.cdIcon, iw, y + 2);
            width -= Window_Base._iconWidth + 2;
        }
        this.changeTextColor(this.textColor($.Param.cdTextColor));
        var fmt = $.Param.cdFmt;
        var value = this.itemCooldown(item);
        if (value % 1 !== 0) value = value.toFixed(2);
        if (value <= 0.009) value = 0.01;
        var text = fmt.format(Anima.Util.toGroup(value));
        this.contents.fontSize = $.Param.cdFontSize;
        this.drawText(text, x, y, width, 'right');
        var returnWidth = width - this.textWidth(text) - $.Param.padding;
        this.resetFontSettings();
        return returnWidth;
    };

    Window_ItemList.prototype.drawWarmup = function (item, x, y, width) {
        if ($.Param.wuIcon > 0) {
            var iw = x + width - Window_Base._iconWidth;
            this.drawIcon($.Param.wuIcon, iw, y + 2);
            width -= Window_Base._iconWidth + 2;
        }
        this.changeTextColor(this.textColor($.Param.wuTextColor));
        var fmt = $.Param.wuFmt;
        var value = this.itemWarmup(item);
        if (value % 1 !== 0) value = value.toFixed(2);
        if (value <= 0.009) value = 0.01;
        var text = fmt.format(Anima.Util.toGroup(value));
        this.contents.fontSize = $.Param.wuFontSize;
        this.drawText(text, x, y, width, 'right');
        var returnWidth = width - this.textWidth(text) - $.Param.padding;
        this.resetFontSettings();
        return returnWidth;
    };


    //=============================================================================
    // Window_BattleItem
    //=============================================================================

    Window_BattleItem.prototype.isEnabled = function (item) {
        if (this.actor()) {
            return this.actor().canUse(item);
        }
        return false;
    };

    Window_BattleItem.prototype.includes = function (item) {
        if (item) {
            return item.occasion === 0 || item.occasion === 1;
        }
        return false;
    };


    var itemCooldownsWindowBattleItem_drawItem = Window_BattleItem.prototype.drawItem;
    Window_BattleItem.prototype.drawItem = function (index) {
        var item = this._data[index];
        if (item) {
            if (this.actor().itemWarmup(item.id) > 0) {
                this.drawItemWarmup(item, index);
            } else if (this.actor().itemCooldown(item.id) > 0) {
                this.drawItemCooldown(item, index);
            } else {
                return itemCooldownsWindowBattleItem_drawItem.call(this, index);
            }
        }
    };

    //=============================================================================
    // Scene_Battle
    //=============================================================================


    var itemCooldownsSceneBattle_commandItem = Scene_Battle.prototype.commandItem;
    Scene_Battle.prototype.commandItem = function () {
        this._itemWindow.setActor(BattleManager.actor());
        itemCooldownsSceneBattle_commandItem.call(this);
    };


    //=============================================================================
    // Scene_Menu
    //=============================================================================

    var itemCooldownsSceneMenu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function () {
        itemCooldownsSceneMenu_createCommandWindow.call(this);
        this._commandWindow.setHandler('item', this.commandPersonal.bind(this));
    };


    var itemCooldownsSceneMenu_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
    Scene_Menu.prototype.onPersonalOk = function () {
        switch (this._commandWindow.currentSymbol()) {
            case 'item':
                SceneManager.push(Scene_Item);
        }
        itemCooldownsSceneMenu_onPersonalOk.call(this);
    };

    //=============================================================================
    // Scene_Item
    //=============================================================================

    var itemCooldownsSceneItem_createItemWindow = Scene_Item.prototype.createItemWindow;
    Scene_Item.prototype.createItemWindow = function () {
        itemCooldownsSceneItem_createItemWindow.call(this);
        this._itemWindow.setActor(this.actor());
        this._itemWindow.refresh();
    };

    Scene_Item.prototype.canUse = function () {
        return this._itemWindow.actor().canUse(this.item()) && this.isItemEffectsValid();
    };

    Scene_Item.prototype.useItem = function () {
        this.playSeForItem();
        this._itemWindow.actor().useItem(this.item());
        this.applyItem();
        this.checkCommonEvent();
        this.checkGameover();
        this._actorWindow.refresh();
        this._itemWindow.refresh();
    };


    //=============================================================================
    // Utilities
    //=============================================================================

    Anima.Util = Anima.Util || {};

    // To Group function copied from YEP_CoreEngine
    if (!Anima.Util.toGroup) {
        Anima.Util.toGroup = function (inVal) {
            if (typeof inVal !== 'string') {
                inVal = String(inVal);
            }
            if (!Yanfly.Param.DigitGroup) return inVal;
            if (!eval(Yanfly.Param.DigitGroup)) return inVal;
            return inVal.replace(/(^|[^\w.])(\d{4,})/g, function ($0, $1, $2) {
                return $1 + $2.replace(/\d(?=(?:\d\d\d)+(?!\d))/g, "$&,");
            });
        };
    }

})(Anima.ItemCooldowns);

ItemCooldowns = Anima.ItemCooldowns;
Imported["Anima_ItemCooldowns"] = 1.03;