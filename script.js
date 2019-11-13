var x = false;
var divi = document.getElementById('detail');

//<-------handling back button functionalities---------->

window.onload = function () {
    if (typeof history.pushState === "function") {
        history.pushState("jibberish", null, null);
        window.onpopstate = function () {
            x = true;
            get();
            this.console.log('pressed');
            history.pushState('newjibberish', null, null);
        
        };
    }
    else {
        var ignoreHashChange = true;
        window.onhashchange = function () {
            if (!ignoreHashChange) {
                ignoreHashChange = true;
                window.location.hash = Math.random();
            }
            else {
                ignoreHashChange = false;
            }
        };
    }
}

//<------------accessing json data's by using fetch api--------->

var data;
var count = 0;
const value = document.getElementById("result").innerHTML = localStorage.getItem("txtvalue");
// console.log(value);
get();
async function get() {
    // console.log(count);
    if (x == false || count==1)
        count = count + 1;
    else if (x == true && count > 1)
        {
            count = count - 1;
             x=false;
        }
    
    const url = 'https://www.omdbapi.com/?apikey=e181a4c1&plot=full&s=';
    const response = await fetch(url + value + '&page=' + count);
    data = await response.json();
    var d = ""
    var r;
for(i in data){
    divi.style.display='none';
    // console.log(data.Response);
     if(data.Response == 'False') { 
       {
        r=true ; 
        d += '<div><h1>END OF PAGE</h1></div>';
        break;
}
}
  else{  
    r=false;  
    for (n in data.Search) {

     if (data.Search[n].Poster != "N/A") {
            d += "<div class='w3-hover-shadow d' id=" + n + " onclick=getDetails("+n+")>" + "<img src=" + data.Search[n].Poster + "><h4>" + data.Search[n].Title + "</h4> </div>";
        }
        else if (data.Search[n].Poster == "N/A"){
            d += "<div class='w3-hover-shadow '>" + "<img src='image/nan.jpg'><h4>" + data.Search[n].Title + "</h4> </div>";
        }
    }
}
}
          if(r==true) document.getElementById("end").innerHTML = d;
          else
            document.getElementById("root").innerHTML = d;
}

//<-------show's movie description------->

function getDetails(v) {
    var d = "";
    d += "<div class=' w3-content max'>" + "<img src=" + data.Search[v].Poster + "><p>"+'Title: '+data.Search[v].Title+'<br>Type: '+data.Search[v].Type +'<br>Year: '+data.Search[v].Year+'<br>imdbID: '+data.Search[v].imdbID+"</p></div>";
    document.getElementById("detail").innerHTML =d;
    divi.style.display='block';

}

