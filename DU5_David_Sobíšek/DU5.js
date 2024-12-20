function main(dtoIn) {
    const generateEmployeeData = require('./DU3.js');
    // Kontrola validnosti vstupních dat
    if (dtoIn.count <= 0) {
        // Pokud počet zaměstnanců není kladný
        return "Chyba-počet zaměstnancu neni spravný";
    }
    if (dtoIn.age.min >= dtoIn.age.max) {
        // Pokud minimální věk je větší nebo roven maximálnímu
        return "Chyba-minimální věk je větší nebo roven maximálnímu";
    }

    // Generování seznamu zaměstnanců na základě dtoIn
    const listOfEmployees = generateEmployeeData(dtoIn);

    // Výpočet statistik zaměstnanců
    const names = getEmployeeChartContent(listOfEmployees);
    
    const dtoOut = {
        names: names // Vypočítané statistiky
    };
    return dtoOut;

    
}
function getEmployeeChartContent(listOfEmployees)
{
    let allFrequency = {}; // Četnost všech jmen
    let maleFrequency = {}; // Četnost pouze mužských jmen
    let femaleFrequency={};
    let maleFullTimeFrequency={};
    let femalePartTimeFrequency={};

    // Spočítání četnosti jmen
    listOfEmployees.forEach(element => {
        // Četnost všech jmen
        if (allFrequency[element.name] === undefined) {
            allFrequency[element.name] = 1;
        } else {
            allFrequency[element.name]++;
        }

        // Četnost mužských jmen
        if (element.gender === 'male') { // Ověření pohlaví
            if (maleFrequency[element.name] === undefined) {
                maleFrequency[element.name] = 1;
            } else {
                maleFrequency[element.name]++;
            }
            if(element.workload===40)
            {
                if (maleFullTimeFrequency[element.name] === undefined) {
                    maleFullTimeFrequency[element.name] = 1;
                } else {
                    maleFullTimeFrequency[element.name]++;
                }

            }
        }
        else
        { 
            if (femaleFrequency[element.name] === undefined) {
                femaleFrequency[element.name] = 1;
            } else {
                femaleFrequency[element.name]++;
            }
            if(element.workload!==40)
            {
                if (femalePartTimeFrequency[element.name] === undefined) {
                    femalePartTimeFrequency[element.name] = 1;
                } else {
                    femalePartTimeFrequency[element.name]++;
                }

            }
        }
    });
    
    
   
    console.log(JSON.stringify(allFrequency, null, 2));
    // Návrat hodnot
    return {
        all:sort(allFrequency),
        male:sort(maleFrequency),
        female:sort(femaleFrequency),
        maleFullTime:sort(maleFullTimeFrequency),
        femalePartTime:sort(femalePartTimeFrequency)


    };

}
function sort(range) {   
    const objectSorted = Object.entries(range).sort((a, b) => b[1] - a[1]);
    return Object.fromEntries(objectSorted); // Vrátí objekt místo pole
}


const dtoIn = {
    age: {
        min: 20,
        max: 40
    },
    count: 15// Počet zaměstnanců, které chceme vygenerovat
};

let dtoOut = main(dtoIn);
console.log(JSON.stringify(dtoOut, null, 2));
