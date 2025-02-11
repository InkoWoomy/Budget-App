function storeExpense(item)
{
    let itemArray = getExpensesData();
    if(!itemArray.includes(item))
    {
        itemArray.push(item);
    }
    localStorage.setItem('expenses', JSON.stringify(itemArray));
    console.log(localStorage)
}

function getExpensesData()
{
    let expenseData = localStorage.getItem('expenses');

    if (expenseData == null)
    {
        return [];
    }

    return JSON.parse(expenseData);
}

function deleteExpense(item)
{
    let expenseData = getExpensesData();
    let itemIndex = expenseData.indexOf(item);
    expenseData.splice(itemIndex, 1);
    localStorage.setItem('expenses', JSON.stringify(expenseData));
}

export { getExpensesData, storeExpense, deleteExpense };