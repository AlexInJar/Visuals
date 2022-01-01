// constructor
var theNode = function (k, v) {
    this.id = k,
    this.value = v
    // Static methpd
    // this.setLabel = function(this) {
    //     return this.value.toString()
    // }

    this.borr_ = function () {
        this.value --
    }
    this.label = v.toString()

};

//instance
theNode.prototype.setValue = function (newv) {
    this.value = newv;
};
theNode.prototype.incValue = function () {
    this.value ++ ;
};
theNode.prototype.decValue = function() {
    this.value -- ;
};

var valulst = [-1, -1, 1, 1, 1]


var nodar = [];
var edgar = [];
for (i=1;i<6;i++) {
    nd = new theNode(i,i)
    // console.log(nd)
    // console.log(nd.key)
    // nd.incValue()
    nodar.push(nd)
    // addNodeRow(nd)
    for (j = i+1;j<6;j++) {
        edgar.push({from: i, to: j})
    }
}

var gtable = document.getElementById('GTableData')
function addNodesRow(somenodes) {

    for (let nodei of somenodes) {
        var grow = gtable.insertRow(gtable.length);
        grow.insertCell(0).innerHTML = nodei.label
        grow.insertCell(1).innerHTML = nodei.value
        grow.insertCell(2).innerHTML = '<input type="button" value = "Borrow_" onClick="Javacsript:borr_i(this)">'    
        grow.insertCell(3).innerHTML = '<input type="button" value = "Lend_" onClick="Javacsript:lend_i(this)">'
    }
}

addNodesRow(nodar)



// create an array with nodes
// var nodes = new vis.DataSet([
//     {id: 1, label: '1'},
//     {id: 2, label: 'Node 2'},
//     {id: 3, label: 'Node 3'},
//     {id: 4, label: 'Node 4'},
//     {id: 5, label: 'Node 5'}
// ]);

var nodes = new vis.DataSet(nodar);
// console.log(nodes)

// create an array with edges
// var edges = new vis.DataSet([
//     {from: 1, to: 3},
//     {from: 1, to: 2},
//     {from: 2, to: 4},
//     {from: 2, to: 5}
// ]);
var edges = new vis.DataSet(edgar)

// create a network
var container = document.getElementById('mynetwork');

// provide the data in the vis format
var data = {
    nodes: nodes,
    edges: edges
};
var options = {
    interaction : {
        navigationButtons : true
    },
    // dataManipulation: {
    //     enabled: true,
    //     initiallyVisible: true
    // },
    nodes:{
        shape: "dot",
        scaling: {
            customScalingFunction: function (min, max, total, value){
                return value/total
            },
            min: 5,
            max: 40,
        }
    },
    edges: {
        color: 'grey',
        width: 4
    }
};

function incNdidx(incid) {
    thisVal = parseInt(gtable.rows[incid].cells[1].innerHTML) + 1
    console.log(thisVal)
    nodes.update(
        {id:incid,value:thisVal}
    )
    // console.log(gtable.rows[ndid].cells[1].innerHTML)
    gtable.rows[incid].cells[1].innerHTML = thisVal
};

function decNdidx(decid) {
    thisVal = parseInt(gtable.rows[decid].cells[1].innerHTML) - 1
    // console.log(thisVal)
    nodes.update(
        {id:decid,value:thisVal}
    )
    // console.log(gtable.rows[ndid].cells[1].innerHTML)
    gtable.rows[decid].cells[1].innerHTML = thisVal
};

// nodes.update(
//     {id:5,value:5}
// )

// initialize your network!
var network = new vis.Network(container, data, options);

function borr_i(obj) {
    // console.log(obj.parentNode.parentNode.rowIndex)
    ndid = obj.parentNode.parentNode.rowIndex
    // incNdidx(ndid)
    adjar = network.getConnectedNodes(ndid)
    // console.log(adjar)
    for (let adji of adjar) {
        // console.log(adji)
        decNdidx(adji)
        incNdidx(ndid)
    }
}

function lend_i(obj) {
    ndid = obj.parentNode.parentNode.rowIndex
    adjar = network.getConnectedNodes(ndid)
    for (let adji of adjar) {
        incNdidx(adji)
        decNdidx(ndid)
    }
}