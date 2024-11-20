//DU4
function main(dtoIn)
{
    const generateEmployeeData = require('./DU3.js');    
    const listOfemployees = generateEmployeeData(dtoIn); // Zajistí, že dtoIn je předáno správně    
    const statistics = getEmployeeStatistics(listOfemployees);

    // Vrácení výstupních dat
    const dtoOut = {
        employees: listOfemployees,
        statistics: statistics
    };

    return dtoOut;

}
function getEmployeeStatistics(listOfemployees) {
    let total=listOfemployees.length;
    let workload10 = 0;
    let workload20 = 0;
    let workload30 = 0;
    let workload40 = 0;
    let countOffemaleEmployee = 0;
    let sumaWorkloadFemale = 0;
    let workloadListsorted = [];
    let medianWorkload = 0;
    let medianAge=0;
    let ageList=[];
    let sumaAge=0;
    let averageAge=0;
    

    // Seřazení zaměstnanců podle workloadu
    let sortedByWorkload = listOfemployees.sort((a, b) => a.workload - b.workload);

    // Zpracování zaměstnanců
    for (let i = 0; i < total; i++) {
        let employee = listOfemployees[i];

        // Počítání podle úvazků
        switch (employee.workload) {
            case 10:
                workload10++;
                break;
            case 20:
                workload20++;
                break;
            case 30:
                workload30++;
                break;
            case 40:
                workload40++;
                break;
        }

        // Počítání zaměstnankyň
        if (employee.gender === "female") {
            countOffemaleEmployee++;
            sumaWorkloadFemale += employee.workload;
        }
        const now= new Date();        
        let age = now.getFullYear()-employee.birthdate.getFullYear();
        const monthDifference = now.getMonth() - employee.birthdate.getMonth();
        const dayDifference = now.getDate() - employee.birthdate.getDate();

        if(monthDifference < 0 || (monthDifference === 0 && dayDifference < 0))
        {
            age--;
        }
        ageList.push(age);
        sumaAge+=age;
    }    
    averageAge=sumaAge/total;
    
    
    // Plnění workloadListsorted
    for (let i = 0; i < sortedByWorkload.length; i++) {
        workloadListsorted.push(sortedByWorkload[i].workload);
    }

    // Výpočet mediánu workloadu
    workloadListsorted.sort((a, b) => a - b); // Seřadit úvazky
    let mid = Math.floor(workloadListsorted.length / 2);
    if (workloadListsorted.length % 2 === 0) {
        medianWorkload = (workloadListsorted[mid - 1] + workloadListsorted[mid]) / 2;
    } else {
        medianWorkload = workloadListsorted[mid];
    }

    // Výpočet medianu věku
    ageList.sort((a,b) => a - b);
    mid= Math.floor(ageList.length/2);
    if(ageList.length%2==0)
    {
        medianAge = (ageList[mid - 1] + ageList[mid]) / 2;
    }
    else{
        medianAge=ageList[mid];
    }
      
    // Výpočet průměrného úvazku zaměstnankyň
    let averageWomenWorkload = countOffemaleEmployee > 0 ? sumaWorkloadFemale / countOffemaleEmployee : 0;
    return {
        total: total,
        workload10:workload10,
        workload20:workload20,
        workload30:workload30,
        workload40:workload40,
        averageAge: averageAge,
        maxAge: Math.max(...ageList),
        minAge: Math.min(...ageList),
        medianAge: medianAge,
        medianWorkload: medianWorkload,
        averageWomenWorkload: averageWomenWorkload,
        sortedByWorkload:sortedByWorkload    
        
    };
    
}

const dtoIn = {
    age: {
        min: 20,
        max: 40
    },
    count: 10// Počet zaměstnanců, které chceme vygenerovat
};
const dtoOut=main(dtoIn);
console.log(JSON.stringify(dtoOut, null, 2));