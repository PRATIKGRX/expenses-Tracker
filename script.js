
var expenses = [];
function addExp(event) {
    event.preventDefault();
    const expName = document.getElementById("expName").value;
    const expAmt = parseInt(document.getElementById("expAmt").value);
    const expCategory = document.getElementById("expCategory").value;
    const expDate = document.getElementById("expDate").value;
    const expense = {
        name: expName,
        amount: expAmt,
        category: expCategory,
        date: expDate,
    };
    expenses.push(expense);
    display();
    updateAmt();

}
function display() {
    const expList = document.getElementById("expList");
    expList.innerHTML = ""; 
    expenses.forEach((exp,i) =>{
        const tr = document.createElement("tr");
        tr.innerHTML=`
        <td>${exp.name}</td>
                <td>${exp.amount}</td>
                <td>${exp.category}</td>
                <td>${exp.date}</td>
                <td><button onclick="deleteExp(`+i+`)">Delete</button></td>
        `;
        expList.appendChild(tr);

    });
}
function deleteExp(index){
    expenses.splice(index,1);
    display();
}
function updateAmt() {
    const total = expenses.reduce((sum, exp) => {
        return sum + parseInt(exp.amount); 
    }, 0);  
    document.getElementById("total").textContent = parseInt(total.toFixed(2));
}