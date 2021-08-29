
function sayHello(username){
    if(!username) return `error`;
    
    console.log(`hi there ${username}`);
    return `hi there ${username}`;
}

function testFns(){
    let x = `jake`
    let res = sayHello(x);
    console.log(res);
}

function Dog(name,age){
    this.name=name;
    this.age=age;
    this.owner=`Kevin`;
}

class Cat {
    constructor(name,age,color){
        this.name=name;
        this.age=age;
        this.color=color;
        this.owner= `Kevo`;
    }
    roar(){
        console.log(`Im Roaringgggggg!!!`)
    }
}

function testObj(){
    // Object literal - good for one variable but is not reusable
    let lola = {
        name: `lola`,
        age: `3`
    }
    console.log(lola);

    //Object Constructor
    let fido = new Dog(`fido`,`4`);
    let sparky = new Dog(`sparky`,`7`);
    console.log(fido);
    console.log(sparky);

    // Class
    let whiskers=new Cat(`whiskers`,`8`,`calico`);
    let fang=new Cat(`fang`,`120`,`black`);
    console.log(whiskers);
    console.log(fang);

    // Use Objects
    console.log(fang.roar());
    console.log(fido.name);
}

function testReq(){
    $.ajax({
        type: `GET`,
        url: `http://restclass.azurewebsites.net/api/test`,
        success: function(res){
            console.log(`Request OK`,res);
        },
        error: function(error){
            console.log(`Request Failed D:`,error);
        },
    });
}


function safeKeep(){
//     <div class="currentTask mb-3">
//     <h6>${task.title}</h6>
//     <label>${task.location}</label>
//   </div>
}

function testTime(){
    var isoStr = new Date().toISOString();
    let test = $('#dueDate').val(isoStr);
    console.log(test);
}