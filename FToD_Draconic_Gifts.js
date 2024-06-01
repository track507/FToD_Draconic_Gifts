var iFileName = "FToD_Draconic_Gifts.js";
RequiredSheetVersion("13.1.13");

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


/*
    This will need some help to get to work. I am unsure what the field name for the Race drop down menu is (using PickDropdown)
    Either keep all skills or pick 2
    Need to change the name in the Racial Trait to read "original race name (dragonborn)" since only the traits is replaced by gem/chromatic/metallic
    A possible work around is to create a new RaceList entry and useFromPreviousRace. Possibly add that using an eval so that it normally can't be accessed outside of this feat
    Another solution is to add each gift as its own FeatsList entry so that the gem/chromatic/metallic can be selectable choices, but this does not solve the issue of applying it to the current Racial Traits
*/

// FeatsList["draconic rebirth [uncommon]"] = {
//     name : "Draconic Rebirth [Uncommon]",
//     source : [["FToD", 27]],
//     // missing description
//     eval : function() {
//         if(!CurrentRace.known) return;

//         var cVar = (CurrentRace.variant != '' ? CurrentRace.variant : ''); // if we are a racial variant
//         var cRace = CurrentRace.known; // current race
//         var rObjName = cRace + (cVar == '' ? '' : ' ' + cVar) + ' (rebirth)'; // Current Race + Racial Variant + Rebirth
//         var rTraits = What("Racial Traits");
//         var rObj = RaceList[cRace];

//         RaceList[rObjName] = {
//             // all necessary and required by the sheet.
//             name : rObjName,
//             regExpSearch : /\b\(rebirth\)\b/i, // the only thing we care about in the name
//             plural : (cVar == '' || !rObj.variants[cVar].plural ? rObj.plural : rObj.variants[cVar].plural), // if there is no current variant OR the current variant does not have a plural attribute
//             source : (cVar == '' || !rObj.variants[cVar].source ? rObj.source : rObj.variants[cVar].source), // all races must have a source, but in case it doesn't, this should pick the current races source instead of the variant's source
//             traits : "", // to be replaced by a dragon's trait
//             size : tDoc.getField("Size Category").currentValueIndices,
//             speed : (cVar == '' || !rObj.variants[cVar].speed ? rObj.speed : rObj.variants[cVar].speed),
//             useFromPreviousRace : {
//                 message : "" + desc([]),
//                 gainTraits : ["size", "age", "height", "weight", "heightMetric", "weightMetric", "languageProfs", "skillstxt", "skills", "speed.climb", "speed.fly", "speed.swim"],
//                 // name does not need to be updated since it's done above.
//             }
//         }
//     }
// }


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


/*

    This was my initial attempt to make this under 1 FeatsList object but due to the complexity of some, requiring choices, this will need to be done separately. 

*/

// FeatsList["draconic gifts"] = {
//     name : "Draconic Gifts",
//     source : [["FToD", 27]],
//     descriptionFull : "",
// 	allowDuplicates : true,
//     choices : ["Draconic Familiar [Uncommon]", "Draconic Senses [Rare]", "Echo of Dragonsight [Very Rare]", "Frightful Presence [Very Rare]"],
//     //choices : ["Draconic Familiar [Uncommon]", "Draconic Rebirth [Uncommon]", "Draconic Senses [Rare]", "Echo of Dragonsight [Very Rare]", "Frightful Presence [Very Rare]", "Psionic Reach [Very Rare]", "Scaled Toughness [Legendary]", "Tongue of the Dragon [Uncommon]"],
//     "draconic familiar [uncommon]" : {
//         name : "Draconic Familiar [Uncommon]",
//         description : "I gain the aid of a draconic familiar. I can cast the Find Familiar spell as a ritual without using any material components. When casted this way, the familiar always takes the form of a pseudodragon. Additionally, when I take the attack action on my turn, I can forgo one of my attacks to allow my pseudodragon familiar to make one attack of its own with its reaction.",
//         creaturesAdd : [["Pseudodragon", true, false, "draconic_familiar"]],
//         spellcastingBonus : [{
//             name : "Draconic Familiar",
//             spells : ["find familiar"],
//             selection : ["find familiar"],
//             times : 1
//         }],
//         spellChanges : {
//             "find familiar" : {
//                 compMaterial : "",
//                 changes : "I can cast the Find Familiar spell as a ritual without using any material components."
//             }
//         }
//     },
//     /*
//         This will need some help to get to work. I am unsure what the field name for the Race drop down menu is (using PickDropdown)
//         Either keep all skills or pick 2
//         Need to change the name in the Racial Trait to read "original race name (dragonborn)" since only the traits is replaced by gem/chromatic/metallic
//         A possible work around is to create a new RaceList entry and useFromPreviousRace. Possiblly add that using an eval so that it normally can't be accessed outside of this feat
//         Another solution is to add each gift as its own FeatsList entry so that the gem/chromatic/metallic can be selectable choices, but this does not solve the issue of applying it to the current Racial Traits
//     */
//     // "draconic rebirth [uncommon]" : { 
//     //     name : "Draconic Rebirth [Uncommon]",
//     //     eval : function() {
//     //         if(!CurrentRace.known) return;

//     //         var cVar = ''; // if we are a racial variant
//     //         var cRace = CurrentRace.known; // current race
//     //         var rObjName = cRace + (cVar == '' ? '' : ' ' + cVar) + ' (rebirth)'; // Current Race + Racial Variant + Rebirth
//     //         var rTraits = What("Racial Traits");
//     //         var rObj = RaceList[cRace];

//     //         if(CurrentRace.variant != '') cVar = CurrentRace.variant;
//     //         RaceList[rObjName] = {
//     //             // all necessary and required by the sheet.
//     //             name : rObjName,
//     //             regExpSearch : /\b\(rebirth\)\b/i, // the only thing we care about in the name
//     //             plural : (cVar == '' || !rObj.variants[cVar].plural ? rObj.plural : rObj.variants[cVar].plural), // if there is no current variant OR the current variant does not have a plural attribute
//     //             source : (cVar == '' || !rObj.variants[cVar].source ? rObj.source : rObj.variants[cVar].source), // all races must have a source, but in case it doesn't, this should pick the current races source instead of the variant's source
//     //             traits : "", // to be replaced by a dragon's trait
//     //             size : tDoc.getField("Size Category").currentValueIndices,
//     //             speed : (cVar == '' || !rObj.variants[cVar].speed ? rObj.speed : rObj.variants[cVar].speed),
//     //             useFromPreviousRace : {
//     //                 message : "" + desc([]),
//     //                 gainTraits : ["size", "age", "height", "weight", "heightMetric", "weightMetric", "languageProfs", "skillstxt", "skills", "speed.climb", "speed.fly", "speed.swim"],
//     //                 // name does not need to be updated since it's done above.
//     //             }
//     //         }
//     //     }
//     // },
//     "draconic senses [rare]" : {
//         name : "Draconic Senses [Rare]",
//         description : "I gain keen senses like a dragon. I have blindsight out to a range of 10 ft. Within this range, I can see anything that isn't behind total cover, even if I am blinded or in darkness. This also includes invisible creatures, unless the creatures successfully hide from me. Additionally, I have advantage on Perception checks.",
//         vision : [["Blindsight", 10], ["Adv. on Perception", 0]]
//     },
//     "echo of dragonsight [very rare]" : {
//         name : "Echo of Dragonsight [Very Rare]",
//         description : "I can cast Contact Other Plane as a ritual. The entity I contact is a dragon on another world in the Material Plane, so its knowledge of my world might be limited. Also, this dragon is an echo of the dragon who is the source of the gift, which might affects its attitude and behavior toward me.",
//         spellcastingBonus : {
//             name : "Echo of Dragonsight",
//             spells : ["contact other plane"],
//             selection : ["contact other plane"],
//             times : 1
//         }
//     },
//     "frightful presence [very rare]" : {
//         name : "Frightful Presence [Very Rare]",
//         calculate : "event.value = 'My Prof bonus per long rest, I can use a bonus action to force each creature of my choice within 120 ft and aware of me to make a Wisdom saving throw vs. DC ' + (8 + Number(How('Proficiency Bonus')) + Number(What('Cha Mod'))) + ' (8 + Prof + Cha mod) or become frightened of me for 1 minute, repeating the save at the end of each of its turns, ending the effect on a success.';",
//         limfeaname : "Frightful Presence",
//         action : [["bonus action", "Frightful Presence"]],
//         usages : "Proficiency bonus per ",
//         usagescalc : "event.value = How('Proficiency Bonus');",
//         recovery : "long rest"
//     },
//     "psionic reach [very rare]" : {
//         name : "Psionic Reach [Very Rare]",
//         description : "I gain resistance to psychic damage. Additionally, I learn the Telekinesis spell, and can cast it without expending a spell slot once per long rest or using a spell slot I have of the appropriate level. The spellcasting ability is Intelligence, Wisdom, or Charisma when I cast the spell with this gift (chosen when I gain the gift)."
//     }
// }