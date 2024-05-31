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
            "It reappears when I cast this spell again (in a new form if so desired)"
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

FeatsList["draconic gifts"] = {
    name : "Draconic Gifts",
    source : [["FToD", 27]],
    descriptionFull : "",
	allowDuplicates : true,
    choices : ["Draconic Familiar [Uncommon]"],
    //choices : ["Draconic Familiar [Uncommon]", "Draconic Rebirth [Uncommon]", "Draconic Senses [Rare]", "Echo of Dragonsight [Very Rare]", "Frightful Presence [Very Rare]", "Psionic Reach [Very Rare]", "Scaled Toughness [Legendary]", "Tongue of the Dragon [Uncommon]"],
    "draconic familiar [uncommon]" : {
        name : "Draconic Familiar [Uncommon]",
        description : "I gain the aid of a draconic familiar. I can cast the Find Familiar spell as a ritual without using any material components. When casted this way, the familiar always takes the form of a pseudodragon. Additionally, when I take the attack action on my turn, I can forgo one of my attacks to allow my pseudodragon familiar to make one attack of its own with its reaction.",
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
    },
    /*
        This will need some help to get to work. I am unsure what the field name for the Race drop down menu is (using PickDropdown)
        Either keep all skills or pick 2
        Need to change the name in the Racial Trait to read "original race name (dragonborn)" since only the traits is replaced by gem/chromatic/metallic
        A possible work around is to create a new RaceList entry and useFromPreviousRace. Possiblly add that using an eval so that it normally can't be accessed outside of this feat
        Another solution is to add each gift as its own FeatsList entry so that the gem/chromatic/metallic can be selectable choices, but this does not solve the issue of applying it to the current Racial Traits
    */
    // "draconic rebirth [uncommon]" : { 
    //     name : "Draconic Rebirth [Uncommon]",
    //     eval : function() {
    //         if(!CurrentRace.known) return;

    //         var cVar = ''; // if we are a racial variant
    //         var cRace = CurrentRace.known; // current race
    //         var rObjName = cRace + (cVar == '' ? '' : ' ' + cVar) + ' (rebirth)'; // Current Race + Racial Variant + Rebirth
    //         var rTraits = What("Racial Traits");
    //         var rObj = RaceList[cRace];

    //         if(CurrentRace.variant) cVar = CurrentRace.variant;
    //         RaceList[rObjName] = {
    //             // all necessary and required by the sheet.
    //             name : rObjName,
    //             regExpSearch : /\b\(rebirth\)\b/i, // the only thing we care about in the name
    //             plural : (cVar == '' || !rObj.variants[cVar].plural ? rObj.plural : rObj.variants[cVar].plural), // if there is no current variant OR the current variant does not have a plural attribute
    //             source : (cVar == '' || !rObj.variants[cVar].source ? rObj.source : rObj.variants[cVar].source), // all races must have a source, but in case it doesn't, this should pick the races source instead of the variant's source
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
}