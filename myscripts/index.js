(function() {
    var calendar = window.document.querySelector('#calendar tbody');
    var MONTHS = [
        {
          name: 'Январь',
          dayAmount: 31,
          begining: 1,
        },
        {
          name: 'Февраль',
          dayAmount: 28,
          begining: 4,
        },
        {
          name: 'Март',
          dayAmount: 31,
          begining: 4,
        },
        {
          name: 'Апрель',
          dayAmount: 30,
          begining: 7,
        },
        {
          name: 'Май',
          dayAmount: 31,
          begining: 2,
        },
        {
          name: 'Июнь',
          dayAmount: 30,
          begining: 5,
        },
        {
          name: 'Июль',
          dayAmount: 31,
          begining: 7,
        },
        {
          name: 'Август',
          dayAmount: 31,
          begining: 3,
        },
        {
          name: 'Сентябрь',
          dayAmount: 30,
          begining: 6,
        },
        {
          name: 'Октябрь',
          dayAmount: 31,
          begining: 1,
        },
        {
          name: 'Ноябрь',
          dayAmount: 30,
          begining: 4,
        },
        {
          name: 'Декабрь',
          dayAmount: 31,
          begining: 6,
        },
      ];
    var WEEK_DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    var shown = -1;

    // === Return correct ID in order not to go out of range ===
    function correct(id){
      if (id < 0) return 11;
      if (id > 11) return 0;
      else return id;
    }
    // === END Return correct ID ===



    // === Create table function ===
    function CreateTemplate(){
      var rowAmount = 6; // Max Value, when month (31 days) starts from Sunday

      //  Name of a month + week days row 
      var headRow = document.createElement('tr');
      for(var i = 0; i < 7; i++) {
        var temp = document.createElement('td');
        if (i == 0) {
          var hehey = document.createElement("button");
          temp.appendChild(hehey);
          hehey.id = "left";
          hehey.onclick = function(){GetMonth(shown - 1)};
          hehey.innerText = " <-- ";
          hehey.setAttribute("class", "buttons");
        }
        if (i == 3) temp.id = "month-name";
        if (i == 6){
          var hehey = document.createElement("button");
          temp.appendChild(hehey);
          hehey.id = "right";
          hehey.onclick = function(){GetMonth(shown + 1)};
          hehey.innerText = " --> ";
          hehey.setAttribute("class", "buttons");
        }
        headRow.appendChild(temp);
      }
      calendar.appendChild(headRow);



      var weekRaw = document.createElement('tr');
      weekRaw.className = 'week-days';

      WEEK_DAYS.forEach(function(el) {
        var day = document.createElement('td');
        day.innerText = el;
        weekRaw.appendChild(day);
      });
      calendar.appendChild(weekRaw);

      // === Creating templates for days ===
      var counter = 1;
      for (var i = 0; i < rowAmount; i++){
        var row = document.createElement('tr');
        for (var j = 0; j < 7; j++){
          var dayOfMonth = document.createElement('td');
          var text = document.createElement('p');
          text.id = "id" + counter.toString();
          counter++;
          dayOfMonth.appendChild(text);
          row.appendChild(dayOfMonth);
        }
        calendar.appendChild(row);
      }
      // === END Creating templates for numbers ===
    }
    // === END Create table function===



    // === Show month by its ID function ===
    function GetMonth (monthID) {
      monthID = correct(monthID);
      shown = monthID; // Saving number of the shown month
      var prev_month = MONTHS[correct(monthID - 1)];
      var this_month = MONTHS[correct(monthID)];
      var next_month = MONTHS[correct(monthID + 1)];

      var moname = document.getElementById("month-name");
      moname.innerText = this_month.name; // Setting month name

      var pseudostart = prev_month.dayAmount - this_month.begining + 2;
      var pseudoend = 1;
      var counter = 1;
      
      for (var i = 1; i <= 42; i++){
        var cell = document.getElementById("id" + counter.toString());

        // === Last month's days ===
        if (i < this_month.begining) { 
          cell.innerText = pseudostart.toString();
          cell.setAttribute("class", "not-focused");
          cell.onclick = function(){GetMonth(monthID - 1);};
          pseudostart++;
        }
        // === END Last month's days ===

        // === This month's days ===
        if (i >= this_month.begining && i - this_month.begining + 1 <= this_month.dayAmount){
          let vs = 7 - this_month.begining + 1;
          let sb = 6 - this_month.begining + 1;
          if ((i - this_month.begining + 1 - vs) % 7 == 0 || (i - this_month.begining + 1 - sb) % 7 == 0 ) {
            cell.setAttribute("class", "holiday");
          }
          else cell.setAttribute("class", "casual");
          cell.innerText = (i - this_month.begining + 1).toString();
          cell.onclick = function(event){
            if (event.target.getAttribute("class") != "not-focused"){
            alert("Who are you talking to right now? No, you clearly don't know who you're talking to, so let me clue you in." + 
            " I am not in danger, Skyler. I am the danger. A guy opens his door and gets shot and you think that of me? No. I am the one who knocks! \n " +
            "   I am the " + event.target.innerText + " of " + MONTHS[shown].name + " . -_-");} else alert("fuck")};
        }
        // === END This month's days ===

        // === Next month's days ===
        if (i - this_month.begining + 1 > this_month.dayAmount){ 
          cell.innerText = pseudoend.toString();
          cell.setAttribute("class", "not-focused");
          cell.onclick = function(){GetMonth(monthID + 1);};
          pseudoend++;
        }
        // === END Next month's days ===

        counter++;
      }
    }
    // === END Show month by its ID function ===
    
    var now = new Date();
    CreateTemplate();
    GetMonth(now.getMonth());
}) ();