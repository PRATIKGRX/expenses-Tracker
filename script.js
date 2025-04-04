
var expenses = [];
function saveToLocalStorage() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}
function loadFromLocalStorage() {
    const storedExpenses = localStorage.getItem("expenses");
    if (storedExpenses) {
        expenses = JSON.parse(storedExpenses);
        display();
        updateAmt();
    }
}
function addExp(event) {

    event.preventDefault();
    const expName = document.getElementById("expName").value;
    const expAmt = parseInt(document.getElementById("expAmt").value);
    const expCategory = document.getElementById("expCategory").value;
    const expDate = document.getElementById("expDate").value;
    if (expName.trim() == '') {
        alert("Name Of the Expenses Required:");
        return;

    }
    else {
        if (isNaN(expAmt)) {
            alert("amount is not a Number or empty");
            return;

        }
        else {
            if (expCategory == "select") {
                alert("select the category");
                return;
            }
            else {
                if (expDate == '') {
                    let userConfirm = confirm("Date is empty, Want to put today Date:");
                    if (userConfirm) {
                        let date = new Date();
                        let formattedDate = date.getFullYear() + "-" +
                            (date.getMonth() + 1).toString().padStart(2, '0') + "-" +
                            date.getDate().toString().padStart(2, '0');
                        const expense = {
                            name: expName,
                            amount: expAmt,
                            category: expCategory,
                            date: formattedDate ? formattedDate : expDate,
                        };

                        expenses.push(expense);
                        display();
                        updateAmt();
                        saveToLocalStorage();
                    }
                    else {
                        alert("Input Date");
                        return;


                    }
                }
                else {
                    const expense = {
                        name: expName,
                        amount: expAmt,
                        category: expCategory,
                        date: expDate,
                    };

                    expenses.push(expense);
                    display();
                    updateAmt();
                    saveToLocalStorage();

                }

            }

        }

    }
    document.getElementById("expName").value = "";
    document.getElementById("expAmt").value = "";
    document.getElementById("expCategory").value = "select";



}
function display() {
    const expList = document.getElementById("expList");
    expList.innerHTML = "";
    expenses.forEach((exp, i) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td  class="w-[45%]">${exp.name}</td>
                <td class="w-[15%]">${exp.amount}</td>
                <td class="w-[15%] text-center">${exp.category}</td>
                <td class="w-[15%] text-center">${exp.date}</td>
                <td class="w-[10%] text-center"><button onclick="deleteExp(`+ i + `)" class="bg-red-800 text-white rounded-sm w-full my-[2px]">Delete</button></td>
        `;
        expList.appendChild(tr);

    });

}
function deleteExp(index) {
    expenses.splice(index, 1);
    display();
    updateAmt();
    saveToLocalStorage();
}
function updateAmt() {
    const total = expenses.reduce((sum, exp) => {
        return sum + parseInt(exp.amount);
    }, 0);
    document.getElementById("total").textContent = parseInt(total.toFixed(2));

}
window.onload = loadFromLocalStorage;