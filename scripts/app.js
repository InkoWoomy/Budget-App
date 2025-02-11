import { getExpensesData, storeExpense, deleteExpense } from "./localstorage.js"

//Main Menu
const menuStart = document.getElementById("menuStart");
const textBudget = document.getElementById("textBudget");
const btnUpdateBudget = document.getElementById("btnUpdateBudget");
const btnManageExpenses = document.getElementById("btnManageExpenses");
const btnAddExpense = document.getElementById("btnAddExpense");

//Update Budget Menu
const menuUpdateBudget = document.getElementById("menuUpdateBudget")
const inputUpdateBudget = document.getElementById("inputUpdateBudget");
const btnConfirmUpdate = document.getElementById("btnConfirmUpdate");

//Manage Expense Menu
const menuManageExpenses = document.getElementById("menuManageExpenses");
const expensesDataList = document.getElementById("expensesDataList");

//Add Expense Menu
const menuAddExpense = document.getElementById("menuAddExpense");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const btnConfirmAddExpense = document.getElementById("btnConfirmAddExpense");

// Budget - Expenses = total
let budgetStart = 0;
// Update Budget button creates the base Budget button
let expenseTotal = 0;
// Expenses added will subtract from Expenses
// Total will be what is displayed to the user
let budgetTotal = 0;

//TEST! REMOVE BEFORE SUBMITTING!!!
// localStorage.clear() 
let expenseTypes = [];
let expensePrice = [];

function budgetRefresh()
{
    let expenseData = getExpensesData();
    expenseTypes = [];
    expensePrice = [];
    
    for (let i = 0; i < expenseData.length; i++)
    {
        if (!expenseData[i].includes("~")) 
        {
            localStorage.removeItem(i);
        }   
        let temp = "";
        for (let j = 0; j < expenseData[i].length; j++)
        {

            if (expenseData[i][j] != "~")
            {
                temp += expenseData[i][j];
            } else {
                console.log("ExpenseTypes",expenseTypes);
                temp = "";
            }
        }
        expensePrice.push(temp);
        console.log("ExpensePrice",expensePrice);
       
    }
    console.log(expenseTypes);
    console.log(expensePrice);

    for (let i = 0; i < expensePrice.length; i++)
    {
        expenseTotal += JSON.parse(expensePrice[i]);
        console.log(expenseTotal)
    }


    menuStart.style = "display: block";
    menuUpdateBudget.style = "display: none";
    menuAddExpense.style = "display: none";
    menuManageExpenses.style = "display: none";
    budgetTotal = budgetStart - expenseTotal;
    textBudget.innerText = `BUDGET: $${budgetTotal}`;

    //Clearing textboxes for the other pages
    //UpdateBudget
    inputUpdateBudget.value = "";
}

budgetRefresh();


//Update Budget Page Functions
btnUpdateBudget.addEventListener('click', () => {
    menuStart.style = "display: none;"
    menuUpdateBudget.style = "display: block;"
    inputUpdateBudget.placeholder = `Current Budget: $${budgetTotal}`
})

btnConfirmUpdate.addEventListener('click', () => {
    budgetStart = inputUpdateBudget.value;
    console.log(budgetStart);
    budgetRefresh();
})

//Manage Expense Page Functions
btnManageExpenses.addEventListener('click', async() => {
    menuStart.style = "display: none;"
    menuManageExpenses.style = "display: block;"
    expensesDataList.innerHTML = "";


    let expenseData = await getExpensesData();
    expenseTypes = [];
    expensePrice = [];
    
    for (let i = 0; i < expenseData.length; i++)
    {
        if (!expenseData[i].includes("~")) 
        {
            localStorage.removeItem(i);
        }   
        let temp = "";
        for (let j = 0; j < expenseData[i].length; j++)
        {

            if (expenseData[i][j] != "~")
            {
                temp += expenseData[i][j];
            } else {
                console.log("ExpenseTypes",expenseTypes);
                temp = "";
            }
        }
        expensePrice.push(temp);
        console.log("ExpensePrice",expensePrice);
       
    }
    console.log(expenseTypes);
    console.log(expensePrice);


    expensePrice.map(index => {
        console.log(`MAPPING`, index)
        let h1 = document.createElement('h1');
        h1.type = "button";
        h1.className = `col-span-2 px-2 bg-white hover:bg-blue-200 rounded-s-xl`;
        h1.innerText = index;
        
        let btnDelete = document.createElement('button');
        btnDelete.type = "button";
        btnDelete.className = `col-start-3 bg-white h-full hover:bg-red-500 rounded-e-2xl`;
        btnDelete.addEventListener('click', function()
        {
            deleteExpense(index);
            expensesDataList.removeChild(h1);
            expensesDataList.removeChild(btnDelete);
        });

        expensesDataList.appendChild(h1);
        expensesDataList.appendChild(btnDelete);
    });
});

//Add Expense Page Functions
btnAddExpense.addEventListener('click', () => {
    menuStart.style = "display: none;"
    menuAddExpense.style = "display: block;" 
})

btnConfirmAddExpense.addEventListener('click', () => {
    storeExpense((expenseName.value)+ "~" +(expenseAmount.value));
    budgetRefresh();
})