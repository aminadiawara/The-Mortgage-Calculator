
/// Comma Separator
var separator = new Intl.NumberFormat('en-US')

/// Add button
var addButton = document.querySelector('.addButt')

/// compare button
var compareButton = document.querySelector('.compareButt')

var graph = document.querySelector('#graph')

/// userName
var userName = document.querySelector('.name')
var userNameh3 = document.createElement('h3')
userNameh3.classList.add('userNameH3')
///////////////////////////////////////////////////////////

///Mortgage 1 info
var calculate = document.querySelector('.calculate')
var table = document.querySelector('.table')
var p = document.querySelector('.amount')
var r  = document.querySelector('.interest')
var n = document.querySelector('.length')

/// Mortgage 1 Extra Payment nodes 
var downpayment = document.querySelector('.down')
var extraMonthPay = document.querySelector('.extramonth')
var extraYearPay = document.querySelector('.extrayear')


/// Summary nodes
var youramt = document.querySelector('.youramt')
var yourInt = document.querySelector('.yourInt')
var yourMon = document.querySelector('.yourMon')
var yourDown = document.querySelector('.yourDown')
var yourExtra = document.querySelector('.yourExtra')
var yourPaymt = document.querySelector('.yourPaymt')
var yourTotalIn = document.querySelector('.yourTotalIn')
var yourTotalPay = document.querySelector('.yourTotalPay')
var yourMonSaved = document.querySelector('.yourMonSaved')
var yourIntSave = document.querySelector('.yourIntSave')


/// Mortgage 2 elements
var mortgage2 = function(){
document.querySelector('.mortinfo2').style.display = "block"
document.querySelector('.extrapay2').style.display = "block"
document.querySelector('.mortinfo1h3').style.display = "block"
document.querySelector('.extrapay1h3').style.display = "block"
document.querySelector('.dataEnteredh3').style.display = "block"
document.querySelector('.dataCalculatedh3').style.display = "block"



}

/// Declaring variables so they could be out of the block scope
var monthsSaved = 0
var interestSaved = 0
var monthsSaved2 = 0
var interestSaved2 = 0

var monthly, totalPayment, totalInterestPaid, totalPayment2, totalInterestPaid2, oldMonthly, oldMonthly2;

////////////////////////////////////////////////////////////////

/// Mortgae Calculate calculation
calculate.addEventListener('click', function()
{

    // Conversions
    p = parseFloat(p.value)
    r = (parseFloat(r.value) / 100) / 12
    n = parseFloat(n.value) * 12
    

    // Extra Payment
    downpayment = parseFloat(downpayment.value)
    extraMonthPay = parseFloat(extraMonthPay.value)
    extraYearPay = parseFloat(extraYearPay.value)
    console.log(downpayment, extraMonthPay, extraYearPay)

    /// in case of downpayment
    if(downpayment > 0) {p -= downpayment}

    /// Monthly payment 
    monthly = (p * r * (1 + r) ** n) / ((1 + r) ** n - 1) // Monthly payment
    
    // Totals
    totalPayment = monthly * n // Total Payment
    totalInterestPaid = totalPayment - p // Total interest paid

    /// initial amounts
    var initialPayment = monthly
    var initialn = n
    var intialTotalPayment = totalPayment
    var initialTotalInterestPaid = totalInterestPaid


    /// in case of extra payment 
    if (extraMonthPay > 0 || extraYearPay > 0) { 
        if (extraMonthPay > 0) {monthly += extraMonthPay} 
        else 
        {monthly += extraYearPay / 12}

        n = - Math.log( 1 - ((p * r) / monthly)) / Math.log(1 + r)

        // Totals
        totalPayment = monthly * n // Total Payment
        totalInterestPaid = totalPayment - p // Total interest paid
        
        /// Dealing with whole months
        if(Number.isInteger(n) == false) {n = Math.floor(n) + 1}

        //Savings
        monthsSaved = initialn - n
        interestSaved = initialTotalInterestPaid - totalInterestPaid
    }   
    // Amortization Table
    var principalBalance = p;
    var interestPaid, principalPaid;

    oldMonthly = monthly    
    for (var i= 1; i <= n; i++){

    /// Last Month Payment
    if(i == n){
    monthly = principalBalance
    interestPaid = r * principalBalance
    principalPaid = monthly - interestPaid
    principalBalance = 0

    } else {

    // Calculations if not last month
    interestPaid = r * principalBalance
    principalPaid = monthly - interestPaid
    principalBalance -= principalPaid
    }
    // Amortization table
    var tr = document.createElement('tr') // row
    var ntd = document.createElement('td') // months
    ntd.textContent = i
    tr.appendChild(ntd)
    var mtd = document.createElement('td') //payment
    mtd.textContent = separator.format(monthly.toFixed(0))
    tr.appendChild(mtd)
    var rtd = document.createElement('td') //interest paid
    rtd.textContent = separator.format(interestPaid.toFixed(0))
    tr.appendChild(rtd)
    var prtd = document.createElement('td') //principal paid
    prtd.textContent = separator.format(principalPaid.toFixed(0))
    tr.appendChild(prtd)
    var ptd = document.createElement('td') //principal balance
    ptd.textContent = separator.format(principalBalance.toFixed(0))
    tr.appendChild(ptd)
    table.appendChild(tr)

}
monthly = oldMonthly
// console.log(totalPayment.toFixed(0), totalInterestPaid.toFixed(0))

addButton.style.display = "block"
calculate.style.display = "none"
graph.style.display = "block"

userNameh3.textContent = userName.value
document.querySelector('.userName').removeChild(document.querySelector('.name'))
document.querySelector('.userName').removeChild(document.querySelector('.namelabel'))
document.querySelector('.userName').appendChild(userNameh3)


youramt.textContent = separator.format(p)
yourInt.textContent = r * 12 * 100
yourMon.textContent = n
yourDown.textContent = separator.format(downpayment)
yourExtra.textContent = separator.format(extraMonthPay)
yourPaymt.textContent = separator.format(monthly.toFixed(0))
yourTotalIn.textContent = separator.format(totalInterestPaid.toFixed(0))
yourTotalPay.textContent = separator.format(totalPayment.toFixed(0))
yourMonSaved.textContent = monthsSaved
yourIntSave.textContent = separator.format(interestSaved.toFixed(0))

document.querySelector('.mort1Entry').style.display = "block"
document.querySelector('.mort1Calc').style.display = "block"
document.querySelector('.amortable1').style.display = "block"

var paymentY = parseFloat(totalPayment.toFixed(0))
var interestY = parseFloat(totalInterestPaid.toFixed(0))



CanvasJS.addColorSet("greenShades",
                [//colorSet Array

                "#931420",
                "#facd8a",
                "black"                
                ]);

var chart = new CanvasJS.Chart("graph", {
	animationEnabled: true,

    colorSet: "greenShades",
	legend:{
        cursor: "pointer",
        fontFamily: "verdana",
        fontWeight: "lighter",
		itemclick: explodePie
	},
	data: [{
		type: "pie",
        showInLegend: true,
        fontFamily: "verdana",
        fontWeight: "lighter",
		toolTipContent: "{name}: <strong>{y}</strong>",
        indexLabel: "{name} - {y}",
		dataPoints: [
			{ y: paymentY, name: "Total Payment" },
            { y: interestY, name: "Total Interest Payment", exploded: true },
            { y: paymentY - interestY, name: "Total Principal Payment" }

		]
	}]
});
chart.render();

function explodePie (e) {
	if(typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
		e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
	} else {
		e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
	}
	e.chart.render();
 
}  



})


///////////////////////////////////////////////////////////////////////


/// Second mortgage display

addButton.addEventListener('click', function(){
    mortgage2()
    calculate.style.display = "none"
    addButton.style.display = "none"
    compareButton.style.display = "block"

})


/// Second mortgage information

///Mortgage 2 info
var table2 = document.querySelector('.table2')
var p2 = document.querySelector('.amount2')
var r2 = document.querySelector('.interest2')
var n2 = document.querySelector('.length2')


/// Mortgage 2 Extra Payment nodes 
var downpayment2 = document.querySelector('.down2')
var extraMonthPay2 = document.querySelector('.extramonth2')
var extraYearPay2 = document.querySelector('.extrayear2')

/// Mortgage 2 Savings nodes
// var monSaved2 = document.querySelector('.monSaved2')
// var inSaved2 = document.querySelector('.inSaved2')



/// Summary nodes
var youramt2 = document.querySelector('.youramt2')
var yourInt2 = document.querySelector('.yourInt2')
var yourMon2 = document.querySelector('.yourMon2')
var yourDown2 = document.querySelector('.yourDown2')
var yourExtra2 = document.querySelector('.yourExtra2')
var yourPaymt2 = document.querySelector('.yourPaymt2')
var yourTotalIn2 = document.querySelector('.yourTotalIn2')
var yourTotalPay2 = document.querySelector('.yourTotalPay2')
var yourMonSaved2 = document.querySelector('.yourMonSaved2')
var yourIntSave2 = document.querySelector('.yourIntSave2')

/// Second Mortgage & Comparison

compareButton.addEventListener('click', function(){

    // Conversions
    p2 = parseFloat(p2.value)
    r2 = (parseFloat(r2.value) / 100) / 12
    n2 = parseFloat(n2.value) * 12
    

    // Extra Payment
    downpayment2 = parseFloat(downpayment2.value)
    extraMonthPay2 = parseFloat(extraMonthPay2.value)
    extraYearPay2 = parseFloat(extraYearPay2.value)
    console.log(downpayment2, extraMonthPay2, extraYearPay2)

    /// in case of downpayment
    if(downpayment2 > 0) {p2 -= downpayment2}

    /// Monthly payment 
    var monthly2 = (p2 * r2 * (1 + r2) ** n2) / ((1 + r2) ** n2 - 1) // Monthly payment
    
    // Totals
    totalPayment2 = monthly2 * n2 // Total Payment
    totalInterestPaid2 = totalPayment2 - p2 // Total interest paid

    /// initial amounts
    var initialPayment2 = monthly2
    var initialn2 = n2
    var intialTotalPayment2 = totalPayment2
    var initialTotalInterestPaid2 = totalInterestPaid2


    /// in case of extra payment 

    if (extraMonthPay2 > 0 || extraYearPay2 > 0) { 
        if (extraMonthPay2 > 0) {monthly2 += extraMonthPay2} 
        else 
        {monthly2 += extraYearPay2 / 12}

        n2 = - Math.log( 1 - ((p2 * r2) / monthly2)) / Math.log(1 + r2)
        
        // Totals
        totalPayment2 = monthly2 * n2 // Total Payment
        totalInterestPaid2 = totalPayment2 - p2 // Total interest paid
        
        /// Dealing with whole months
        if(Number.isInteger(n2) == false) {n2 = Math.floor(n2) + 1}

        //Savings
        monthsSaved2 = initialn2 - n2
        interestSaved2 = initialTotalInterestPaid2 - totalInterestPaid2


    }
  

    console.log(monthly2, n2, "initials2", initialPayment2, initialn2, "savings2", monthsSaved2, interestSaved2)
   
    // Amortization Table
    var principalBalance2 = p2;
    var interestPaid2, principalPaid2;
    oldMonthly2 = monthly2 

    for (var i2= 1; i2 <= n2; i2++){

    /// Last Month Payment
    if(i2 == n2){
    monthly2 = principalBalance2
    interestPaid2 = r2 * principalBalance2
    principalPaid2 = monthly2 - interestPaid2
    principalBalance2 = 0

    } else {

    // Calculations if not last month
    interestPaid2 = r2 * principalBalance2
    principalPaid2 = monthly2 - interestPaid2
    principalBalance2 -= principalPaid2
    }
    // Amortization table
    var tr2 = document.createElement('tr') // row
    var ntd2 = document.createElement('td') // months
    ntd2.textContent = i2
    tr2.appendChild(ntd2)
    var mtd2 = document.createElement('td') //payment
    mtd2.textContent = separator.format(monthly2.toFixed(0))
    tr2.appendChild(mtd2)
    var rtd2 = document.createElement('td') //interest paid
    rtd2.textContent = separator.format(interestPaid2.toFixed(0))
    tr2.appendChild(rtd2)
    var prtd2 = document.createElement('td') //principal paid
    prtd2.textContent = separator.format(principalPaid2.toFixed(0))
    tr2.appendChild(prtd2)
    var ptd2 = document.createElement('td') //principal balance
    ptd2.textContent = separator.format(principalBalance2.toFixed(0))
    tr2.appendChild(ptd2)
    table2.appendChild(tr2)

}

monthly2 = oldMonthly2

youramt2.textContent = separator.format(p2)
yourInt2.textContent = r2 * 12 * 100
yourMon2.textContent = n2
yourDown2.textContent = separator.format(downpayment2)
yourExtra2.textContent = separator.format(extraMonthPay2)
yourPaymt2.textContent = separator.format(monthly2.toFixed(0))
yourTotalIn2.textContent = separator.format(totalInterestPaid2.toFixed(0))
yourTotalPay2.textContent = separator.format(totalPayment2.toFixed(0))
yourMonSaved2.textContent = monthsSaved2
yourIntSave2.textContent = separator.format(interestSaved2.toFixed(0))

document.querySelector('.dataEntered').style.display = "block"
document.querySelector('.dataCalculated').style.display = "block"
document.querySelector('.amortable2').style.display = "block"
document.querySelector('.tableSpan').textContent = "Amortization Table Mortgae 1"
document.querySelector('#graph').style.display = "none"
document.querySelector('#graph2').style.display = "block"


var paymentY1 = parseFloat(totalPayment.toFixed(0))
var interestY1 = parseFloat(totalInterestPaid.toFixed(0))
var monthlyY1 = parseFloat(monthly.toFixed(0))
var durationY1 = parseFloat(n)

var paymentY2 = parseFloat(totalPayment2.toFixed(0))
var interestY2 = parseFloat(totalInterestPaid2.toFixed(0))
var monthlyY2 = parseFloat(monthly2.toFixed(0))
var durationY2 = parseFloat(n2)


CanvasJS.addColorSet("myColor",
                [              
                "#facd8a",
                "black"                
                ]);


var chart2 = new CanvasJS.Chart("graph2", {
	animationEnabled: true,
	title:{
        text: "Total Payment",
        fontFamily: "verdana",
        fontWeight: "bold",
        fontColor: "#931420",
        margin: 0

	},
    colorSet: "myColor",
	legend:{
        cursor: "pointer",
        fontFamily: "verdana",
        fontWeight: "lighter",
		itemclick: explodePie
    },
    width:265,
	data: [{
		type: "pie",
        showInLegend: false,
        indexLabelFontFamily: "verdana",
        indexLabelFontWeight: "bold",
        indexLabelFontColor: "white",
        indexLabelPlacement: "inside",
        indexLabelFontSize: 12,
		toolTipContent: "{name}: <strong>{y}</strong>",
        indexLabel: "{name}  {y}",
		dataPoints: [
			{ y: paymentY2, name: "Mortgage 2" },
            { y: paymentY1, name: "Mortgage 1", exploded: true },
		]
	}]
});
chart2.render();

var chart3 = new CanvasJS.Chart("graph3", {
	animationEnabled: true,
	title:{
        text: "Total Interest",
        fontFamily: "verdana",
        fontWeight: "bold",
        fontColor: "#931420",
        margin: 0

	},
    colorSet: "myColor",
	legend:{
        cursor: "pointer",
        fontFamily: "verdana",
        fontWeight: "lighter",
		itemclick: explodePie
    },
    width:265,
	data: [{
		type: "pie",
        showInLegend: false,
        indexLabelFontFamily: "verdana",
        indexLabelFontWeight: "bold",
        indexLabelFontColor: "white",
        indexLabelPlacement: "inside",
        indexLabelFontSize: 12,
		toolTipContent: "{name}: <strong>{y}</strong>",
        indexLabel: "{name}  {y}",
		dataPoints: [
			{ y: interestY2, name: "Mortgage 2" },
            { y: interestY1, name: "Mortgage 1", exploded: true },
		]
	}]
});
chart3.render();

var chart4 = new CanvasJS.Chart("graph4", {
	animationEnabled: true,
	title:{
        text: "Monthly Payment",
        fontFamily: "verdana",
        fontWeight: "bold",
        fontColor: "#931420",
        margin: 0

	},
    colorSet: "myColor",
	legend:{
        cursor: "pointer",
        fontFamily: "verdana",
        fontWeight: "lighter",
		itemclick: explodePie
    },
    width:265,
	data: [{
		type: "pie",
        showInLegend: false,
        indexLabelFontFamily: "verdana",
        indexLabelFontWeight: "bold",
        indexLabelFontColor: "white",
        indexLabelPlacement: "inside",
        indexLabelFontSize: 12,
		toolTipContent: "{name}: <strong>{y}</strong>",
        indexLabel: "{name}  {y}",
		dataPoints: [
			{ y: monthlyY2, name: "Mortgage 2" },
            { y: monthlyY1, name: "Mortgage 1", exploded: true },
		]
	}]
});
chart4.render();

var chart5 = new CanvasJS.Chart("graph5", {
	animationEnabled: true,
	title:{
        text: "Duration in Month",
        fontFamily: "verdana",
        fontWeight: "bold",
        fontColor: "#931420",
        margin: 0

	},
    colorSet: "myColor",
	legend:{
        cursor: "pointer",
        fontFamily: "verdana",
        fontWeight: "lighter",
		itemclick: explodePie
    },
    width:265,
	data: [{
		type: "pie",
        showInLegend: false,
        indexLabelFontFamily: "verdana",
        indexLabelFontWeight: "bold",
        indexLabelFontColor: "white",
        indexLabelPlacement: "inside",
        indexLabelFontSize: 12,
		toolTipContent: "{name}: <strong>{y}</strong>",
        indexLabel: "{name}  {y}",
		dataPoints: [
			{ y: durationY2, name: "Mortgage 2" },
            { y: durationY1, name: "Mortgage 1", exploded: true },
		]
	}]
});
chart5.render();





function explodePie (e) {
	if(typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
		e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
	} else {
		e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
	}
	e.chart.render();
 
}  

document.querySelector('.graphs').style.display = "flex"

})

