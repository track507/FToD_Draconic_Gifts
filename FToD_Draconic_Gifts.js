var iFileName = "pub_20211019_FToD_Addon-Draconic-Gifts.js";
RequiredSheetVersion("13.1.14");

// CompanionList for draconic familiar choice
CompanionList.draconic_familiar = {
	name : "Draconic Familiar",
	nameMenu : "Familiar (Draconic Gift)",
	source : [["FToD", 27]],
	includeCheck : function(sCrea, objCrea, iCreaCR) { //only pseudodragon
		return /^(pseudodragon)$/i.test(sCrea);
	},
    attributesAdd : {
        header : "Familiar",
        features : [{
            name : "Find Familiar",
            description : "If dropped to 0 HP, the familiar disappears, leaving behind no physical form. The familiar must obey all commands of its master."
        }]
    },
    notes : function() {
        var a = newObj(Base_CompanionList.familiar.notes);
        a[0].description = [
            "appearing in an unoccupied space within 10 ft",
            "It assumes the form of a pseudodragon",
            "When the familiar drops to 0 hit points, it disappears, leaving behind no physical form",
            "It reappears when I cast this spell again"
        ].join("\n   ");
	    a[1].description = a[1].description.replace("but it can't attack", "but it can't attack on its turn");
        a.splice(3, 0, {
            name : "With my Attack action",
            description : "I can forgo one attack to have the familiar make one with its reaction",
            joinString : ", "
        });
        return a;
    }()
};

FeatsList["draconic familiar [uncommon]"] = {
    name : "Draconic Familiar [Uncommon]",
    source : [["FToD", 27]],
    description : "I can cast the Find Familiar spell as a ritual without using any material components. When casted this way, the familiar always takes the form of a pseudodragon. Additionally, when I take the attack action on my turn, I can forgo one of my attacks to allow my familiar to make one attack of its own with its reaction.",
    creaturesAdd : [["Pseudodragon", true, false, "draconic_familiar"]],
    spellcastingBonus : [{
        name : "Draconic Familiar",
        spells : ["find familiar"],
        selection : ["find familiar"],
        times : 1
    }],
    spellChanges : {
        "find familiar" : {
            compMaterial : "",
            changes : "I can cast the Find Familiar spell as a ritual without using any material components."
        }
    }
}

var FToD_dragonborns_add = function () { // Copied from the main script and edited to fit Draconic Rebirth
	var objDragonborns = {
		Chromatic : {
			regExpSearch : /^(?=.*chromatic)(?=.*dragonborn)(?=.*reborn).*$/i,
			source : [["FToD", 27]],
			variants : [["Black", "Acid"], ["Blue", "Lightning"], ["Green", "Poison"], ["Red", "Fire"], ["White", "Cold"]],
			breathWeaponShape : "5-ft by 30-ft line",
			trait : desc([
				">>TYPE<< Breath Weapon: When I take the Attack action on my turn, I can replace one attack with a breath weapon that deals 1d10 >>type<< damage to all in a 5-ft by 30-ft line, Dex save halves (DC 8 + Con mod + Proficiency Bonus). I can do this my Proficiency Bonus per long rest. The damage increases with +1d10 at 5th, 11th, and 17th level.",
				"Chromatic Warding: From 5th level, I can protect myself using my draconic energies. As an action once per long rest, I can become immune to >>type<< damage for 1 minute."
			], "\n \u2022 "),
			features : {
				"chromatic warding" : {
					name : "Chromatic Warding",
					source : [["FToD", 10]],
					minlevel : 5,
					usages : 1,
					recovery : "long rest",
					action : [["action", ""]]
				}
			}
		},
		Gem : {
			regExpSearch : /^(?=.*gem)(?=.*dragonborn)(?=.*reborn).*$/i,
			source : [["FToD", 27]],
			variants : [["Amethyst", "Force"], ["Crystal", "Radiant"], ["Emerald", "Psychic"], ["Sapphire", "Thunder"], ["Topaz", "Necrotic"]],
			breathWeaponShape : "15-ft cone",
			trait : desc([
				">>TYPE<< Breath Weapon: When I take the Attack action on my turn, I can replace one attack with a breath weapon that deals 1d10 >>type<< damage to all in a 15-ft cone, Dex save halves (DC 8 + Con mod + Prof Bonus). I can do this my Prof" + (typePF ? "iciency" : ".") + " Bonus per long rest.",
				"Psionic Mind: " + (typePF ? "I can send telepathic messages to any creature I can see within 30 ft that understands at least one language." : "I can telepathically message a creature with a language I can see in 30 ft."),
				"Gem Flight: From 5th level, I can manifest spectral wings. As a bonus action once per long rest, I can gain, for 1 minute, a flying speed equal to my walking speed and can hover."
			], "\n \u2022 "),
			features : {
				"gem flight" : {
					name : "Gem Flight",
					source : [["FToD", 11]],
					minlevel : 5,
					usages : 1,
					recovery : "long rest",
					action : [["bonus action", ""]]
				}
			}
		},
		Metallic : {
			regExpSearch : /^(?=.*metallic)(?=.*dragonborn)(?=.*reborn).*$/i,
			source : [["FToD", 27]],
			variants : [["Brass", "Fire"], ["Bronze", "Lightning"], ["Copper", "Acid"], ["Gold", "Fire"], ["Silver", "Cold"]],
			breathWeaponShape : "15-ft cone",
			trait : desc([
				">>TYPE<< Breath Weapon: When I take the Attack action on my turn, I can replace one attack with a breath weapon that deals 1d10 >>type<< damage to all in a 15-ft cone, Dex save halves (DC 8 + Con mod + Prof" + (typePF ? "iciency" : ".") + " Bonus). I can do this my Prof" + (typePF ? "iciency" : ".") + " Bonus per long rest.",
				"Metallic Breath Weapon: At 5th level I gain a second breath weapon once per long rest, that works just like the first, but I choose the effect when I use it: Enervating: Con save or incapacitated until my next turn starts. Repulsion: Str save or pushed 20 ft and prone."
			], "\n \u2022 "),
			features : {
				"metallic breath weapon" : {
					name : "Metallic Breath Weapon",
					source : [["FToD", 12]],
					minlevel : 5,
					usages : 1,
					recovery : "long rest",
					weaponOptions : [{
						regExpSearch : /^(?=.*metallic)(?=.*breath)(?=.*weapon).*$/i,
						name : "Metallic breath weapon",
						source : [["FToD", 12]],
						ability : 3,
						type : 'Natural',
						damage : ['Enervating', '', 'or Repulsion'],
						range : "15-ft cone",
						description : "Repulsion: Str save or pushed 20 ft \u0026 prone; Enervating: Con save or incapacitated till my next turn starts",
						abilitytodamage : false,
						dc : true,
						selectNow : true
					}]
				}
			}
		}
	}
	for (var sDrBrn in objDragonborns) {
		var sDrBrnLC = sDrBrn.toLowerCase();
		var oDrBrn = objDragonborns[sDrBrn];
		RaceList["reborn " + sDrBrnLC + " dragonborn"] = {
			regExpSearch : oDrBrn.regExpSearch,
			name : "Reborn " + sDrBrn + " Dragonborn",
			sortname : "Reborn Dragonborn, " + sDrBrn,
			source : oDrBrn.source,
			plural : sDrBrn + " Dragonborn",
			size : 3,
			speed : {
				walk : { spd : 30, enc : 20 }
			},
			weaponsAdd : ["Breath Weapon"],
			weaponOptions : [{
				regExpSearch : /^(?=.*breath)(?=.*weapon).*$/i,
				name : "Breath weapon",
				source : oDrBrn.source,
				ability : 3,
				type : 'Natural',
				damage : ['C', 10, 'fire'],
				range : oDrBrn.breathWeaponShape.replace('by', '\xD7'),
				description : "Hits all in area; Dex save, success - half damage",
				abilitytodamage : false,
				dc : true,
				dbBreathWeapon : true
			}],
			age : " reach adulthood by 15 and live around 80 years",
			height : " stand well over 6 feet tall (5'6\" + 2d8\")",
			weight : " weigh around 240 lb (175 + 2d8 \xD7 2d6 lb)",
			heightMetric : " stand well over 1,8 metres tall (170 + 5d8 cm)",
			weightMetric : " weigh around 110 kg (80 + 5d8 \xD7 4d6 / 10 kg)",
			scoresGeneric : true,
            skillstxt : "Choose any two",
			trait : sDrBrn + " Dragonborn Reborn"+
				"\n \u2022 " + sDrBrn + ' Ancestry: Choose a type of dragon using the "Racial Options" button. The damage type of my resistance and my breath weapon are determined by the dragon type chosen.'+
				+ oDrBrn.trait.replace(/>>type<< /ig, ""),
			features : {
				"breath weapon" : {
					name : "Breath Weapon",
					minlevel : 1,
					usages : "Proficiency bonus per ",
					usagescalc : "event.value = How('Proficiency Bonus');",
					recovery : "long rest",
					additional : levels.map(function (n) {
						return (n < 5 ? 1 : n < 11 ? 2 : n < 17 ? 3 : 4) + 'd10';
					}),
					calcChanges : {
						atkAdd : [
							function (fields, v) {
								if (v.theWea.dbBreathWeapon && (/dragonborn/i).test(CurrentRace.known) && CurrentRace.variant) {
									fields.Damage_Type = CurrentRace.dmgres[0];
								}
							},
							'',
							1
						]
					}
				}
			},
            useFromPreviousRace : {
                message : "If you choose 'Yes', you can keep any skill proficiencies you gained from your previous race."+
                "\n\nIf you choose 'No', you can pick any two skills proficiencies of your choice\n",
                gainTraits : ["skillstxt", "skills"],
                updateName : "suffix"
            },
			variants : []
		};
		if (oDrBrn.features) {
			for (var sFea in oDrBrn.features) {
				RaceList["reborn " + sDrBrnLC + " dragonborn"].features[sFea] = oDrBrn.features[sFea];
			}
		}
		for (var i = 0; i < oDrBrn.variants.length; i++) {
			var sDrBrnVar = oDrBrn.variants[i][0];
			var sDrBrnDmg = oDrBrn.variants[i][1];
			AddRacialVariant("reborn " + sDrBrnLC + " dragonborn", sDrBrnVar.toLowerCase(), {
				regExpSearch : RegExp(sDrBrnVar, "i"),
				name : "Reborn " + sDrBrnVar + " " + sDrBrn + " Dragonborn",
				trait : "Reborn " + sDrBrnVar + " " + sDrBrn + " Dragonborn"+
					oDrBrn.trait.replace(/>>TYPE<</g, sDrBrnDmg).replace(/>>type<</g, sDrBrnDmg.toLowerCase()),
				dmgres : [sDrBrnDmg]
			});
		}
	}
}();

FeatsList["draconic senses [rare]"] = {
    name : "Draconic Senses [Rare]",
    source : [["FToD", 27]],
    description : "I gain keen senses like a dragon. I have blindsight out to a range of 10 ft. Within this range, I can see anything that isn't behind total cover, even if I am blinded or in darkness. This also includes invisible creatures, unless the creatures successfully hide from me. Additionally, I have advantage on Perception checks.",
    vision : [["Blindsight", 10], ["Adv. on Perception", 0]]
}

FeatsList["echo of dragonsight [very rare]"] = {
    name : "Echo of Dragonsight [Very Rare]",
    source : [["FToD", 27]],
    description : "I can cast Contact Other Plane as a ritual. The entity I contact is a dragon on another world in the Material Plane, so its knowledge of my world might be limited. Also, this dragon is an echo of the dragon who is the source of the gift, which might affects its attitude and behavior toward me.",
    spellcastingBonus : {
        name : "Echo of Dragonsight",
        spells : ["contact other plane"],
        selection : ["contact other plane"],
        times : 1
    }
}

FeatsList["frightful presence [very rare]"] = {
    name : "Frightful Presence [Very Rare]",
    source : [["FToD", 27]],
    calculate : "event.value = 'My Prof bonus per long rest, I can use a bonus action to force each creature of my choice within 120 ft and aware of me to make a Wisdom saving throw vs. DC ' + (8 + Number(How('Proficiency Bonus')) + Number(What('Cha Mod'))) + ' (8 + Prof + Cha mod) or become frightened of me for 1 minute, repeating the save at the end of each of its turns, ending the effect on a success.';",
    limfeaname : "Frightful Presence",
    action : [["bonus action", "Frightful Presence"]],
    usages : "Proficiency bonus per ",
    usagescalc : "event.value = How('Proficiency Bonus');",
    recovery : "long rest"
}

FeatsList["psionic reach [very rare]"] = {
    name : "Psionic Reach [Very Rare]",
    source : [["FToD", 27]],
    description : "I gain resistance to psychic damage. Additionally, I learn the Telekinesis spell and can cast it without expending a spell slot once per long rest, or using a spell slot I have of the appropriate level. The spellcasting ability is Intelligence, Wisdom, or Charisma when I cast the spell with this gift (chosen when I gain the gift).",
    dmgres : ["Psychic"],
    spellcastingBonus : [{
        name : "Psionic Reach",
        spells : ["telekinesis"],
        selection : ["telekinesis"],
        times : 1,
        firstCol : "oncelr"
    }],
    choices : ["Intelligence", "Wisdom", "Charisma"],
    "intelligence" : {
		description : "I gain resistance to psychic damage. Additionally, I learn the Telekinesis spell and can cast it without expending a spell slot once per long rest, or by expending a spell slot I have of the appropriate level. The spellcasting ability for this is Intelligence.",
        spellcastingAbility : 4
	},
	"wisdom" : {
		description : "I gain resistance to psychic damage. Additionally, I learn the Telekinesis spell and can cast it without expending a spell slot once per long rest, or by expending a spell slot I have of the appropriate level. The spellcasting ability for this is Wisdom.",
        spellcastingAbility : 5
	},
	"charisma" : {
		description : "I gain resistance to psychic damage. Additionally, I learn the Telekinesis spell and can cast it without expending a spell slot once per long rest, or by expending a spell slot I have of the appropriate level. The spellcasting ability for this is Charisma.",
        spellcastingAbility : 6
	}
}

FeatsList["scaled tougness [legendary]"] = {
    name : "Scaled Toughness [Legendary]",
    source : [["FToD", 27]],
    description : "I gain resistance to piercing and slashing damage.",
    dmgres : ["Piercing", "Slashing"]
}

FeatsList["tongue of the dragon [uncommon]"] = {
    name : "Tongue of the Dragon [Uncommon]",
    source : [["FToD", 27]],
    description : "I can speak, read, and write Draconic. As a bonus action, I can make my voice audible up to 300 ft away for 1 minute. I have advantage on Persuasion checks.",
    languageProfs : ["Draconic"],
    action : ["bonus action", "Tongue of the Dragon (300 ft)"]
}