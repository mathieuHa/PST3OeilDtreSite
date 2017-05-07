/**
 * Created by kafim on 26/02/2017.
 */
$(document).ready(function(){

    var IP = "http://oeildtreapi.hanotaux.fr/api";
    // initialisation de l'api google pour les graphiques linéaires
    google.charts.load('current', {'packages':['line'], 'language': 'fr'});
    google.charts.load('current', {'packages':['corechart'], 'language': 'fr'});

    console.log($(window).innerWidth(), $(window).innerHeight());
    console.log($("#chart1").innerWidth());

    $('#button-date').on("click", function () {
        console.log($('#date').val());
        switch (select){
            case "day":
                str = $('#date').val().split("/");
                time = new Time(str.pop(),str.pop(),str.pop());
                handleDay();
                break;
            case "week":
                str = $('#date').val().split("/");
                time = new Time(str.pop(),str.pop(),str.pop());
                handleWeek();
                break;
            case "month":
                str = $('#date2').val().split("/");
                time = new Time(str.pop(),str.pop(),0);
                handleMonth();
                break;
            case "semester":
                str = $('#date2').val().split("/");
                time = new Time(str.pop(),str.pop(),0);
                handleSemester();
                break;
            case "year":
                str = $('#date3').val().split("/");
                time = new Time(str.pop(),0,0);
                handleYear();
                break;
        }

        console.log(time);
    });


    function Time(year, month, day) {
        this.year = year;
        this.month = month;
        this.day = day;
    }

    function Sensor(id, name, title, subtitle, location, data) {
        this.id = id;
        this.name = name;
        this.title = title;
        this.subtitle = subtitle;
        this.location = location;
        this.data = data;
    }

    var select = "";

    var sensors = [];
    now = new Date();
    var time = new Time (now.getUTCFullYear(), now.getUTCMonth()+1, now.getUTCDate());
    console.log(time);

    function getSensorInformation() {
        $.ajax({
            url: IP+"/sensors",
            type: 'GET',
            dataType: 'json',
            success: function(result) {
                alert('hello!');
                console.log(result);
                $.each(result, function(i, field){
                    sensors.push(new Sensor(field["id"],field["name"],field["title"],field["subtitle"],"chart"+(i+1), null));
                });
                console.log(sensors);
                setDatePickerDay();
                setDatePickerMonth();
                setDatePickerYear();
                select = "day";
                handleDay();
            },
            error: function() { alert('boo!'); },
            beforeSend: setHeader
        });

/*
        $.ajax(IP+"/sensors", function(result){

        });
        */
    }

    function getDayData(sensor, time) {
        console.log(time);
        $.getJSON(IP+"/sensors/" +sensor.id+ "/data/day" +
            "?day="+ time.day +
            "&month="+ time.month +
            "&year="+ time.year
            , function(result){
                sensor.data = result;
                if(sensor.data.length != 0){
                    google.charts.setOnLoadCallback(drawDayChart(sensor));
                } else {
                    noData(sensor.location);
                }

            });
    }
    function getWeekData(sensor, time) {
        $.getJSON(IP+"/sensors/"+sensor.id+"/dailydata/week" +
            "?day="+ time.day +
            "&month="+ time.month +
            "&year="+ time.year
            , function(result){
                sensor.data = result;
                if(sensor.data.length != 0){
                    google.charts.setOnLoadCallback(drawLongChart(sensor));
                } else {
                    noData(sensor.location);
                }
            });
    }
    function getMonthData(sensor, time) {
        $.getJSON(IP+"/sensors/"+sensor.id+"/dailydata/month" +
            "?month="+ time.month +
            "&year="+ time.year
            , function(result){
                sensor.data = result;
                if(sensor.data.length != 0){
                    google.charts.setOnLoadCallback(drawLongChart(sensor));
                } else {
                    noData(sensor.location);
                }
            });
    }
    function getSemesterData(sensor, time) {
        $.getJSON(IP+"/sensors/"+sensor.id+"/dailydata/semester" +
            "?month="+ time.month +
            "&year="+ time.year
            , function(result){
                sensor.data = result;
                if(sensor.data.length != 0){
                    google.charts.setOnLoadCallback(drawLongChart(sensor));
                } else {
                    noData(sensor.location);
                }
            });
    }
    function getYearData(sensor, time) {
        $.getJSON(IP+"/sensors/"+sensor.id+"/dailydata/year" +
            "?year="+ time.year
            , function(result){
                sensor.data = result;
                if(sensor.data.length != 0){
                    google.charts.setOnLoadCallback(drawLongChart(sensor));
                } else {
                    noData(sensor.location);
                }
            });
    }
    function drawDayChart(sensor) {
        var data = new google.visualization.DataTable();
        data.addColumn('date', 'Journée');
        data.addColumn('number', 'Température');
        $.each(sensor.data, function(i, field){
            data.addRow([new Date(field["date"]),field["value"]]);
        });

        var options = {
            title: sensor.title,
            subtitle: sensor.subtitle,
            'width':'100%',
            'height':400,
            legend: { position: 'right' },
            hAxis: {
                format: 'HH:mm'
            },
            vAxis: {
                viewWindow : {
                    max : 30,
                    min : -5
                }
            },
            animation:{
                duration: 3000,
                easing: 'inAndOut'
            }
        };
        var chart = new google.charts.Line(document.getElementById(sensor.location));
        chart.draw(data, google.charts.Line.convertOptions(options));
    }
    function drawLongChart(sensor) {
        var data = new google.visualization.DataTable();
        data.addColumn('date', 'Semaine');
        data.addColumn('number', sensor.name + ' moyen(ne)');
        data.addColumn('number', sensor.name + ' minimum');
        data.addColumn('number', sensor.name + ' maximum');
        $.each(sensor.data, function(i, field){
            data.addRow([new Date(field["date"]),field["value"],field["min"],field["max"]]);
        });

        var options = {
            title: sensor.title,
            subtitle: sensor.subtitle,
            'width':'100%',
            'height':400,
            legend: { position: 'right' },
            /*hAxis: {
             format: 'dd MMM'
             }*/
            vAxis: {
                viewWindow : {
                    max : 30,
                    min : -5
                }
            },
            hAxis: {
                gridlines: {count: -1}
            }
        };
        var chart = new google.charts.Line(document.getElementById(sensor.location));
        chart.draw(data, google.charts.Line.convertOptions(options));
    }

    $("#day").on("click", function () {
        select = "day";
        setDatePickerDay();
        handleDay();
    });
    $("#week").on("click", function () {
        select = "week";
        setDatePickerDay();
        handleWeek();
    });
    $("#month").on("click", function () {
        select = "month";
        setDatePickerMonth();
        handleMonth();
    });
    $("#semester").on("click", function () {
        select = "semester";
        setDatePickerMonth();
        handleSemester();
    });
    $("#year").on("click", function () {
        select = "year";
        setDatePickerYear();
        handleYear();
    });

    $(".desactiver").on("click", function () {
        $(".desactiver").removeClass("active");
        $(this).addClass("active");
    });

    function setDatePickerDay() {
        $('#datetimepicker1').datetimepicker({
            format: 'DD/MM/YYYY',
            useCurrent: true,
            defaultDate: new Date()
        });
    }

    function setDatePickerMonth() {
        $('#datetimepicker2').datetimepicker({
            format: 'MM/YYYY',
            useCurrent: true,
            defaultDate: new Date()
        });
    }

    function setDatePickerYear() {
        $('#datetimepicker3').datetimepicker({
            format: 'YYYY',
            useCurrent: true,
            defaultDate: new Date()
        });
    }

    function handleYear() {
        for (var j = 0; j < sensors.length; j++) {
            getYearData(sensors[j], time);
        }
    }

    function handleMonth() {
        for (var j = 0; j < sensors.length; j++) {
            getMonthData(sensors[j], time);
        }
    }

    function handleSemester() {
        for (var j = 0; j < sensors.length; j++) {
            getSemesterData(sensors[j], time);
        }
    }

    function handleWeek() {
        for (var j = 0; j < sensors.length; j++) {
            getWeekData(sensors[j], time);
        }
    }

    function handleDay() {
        for (var j = 0; j < sensors.length; j++) {
            getDayData(sensors[j], time);
        }
    }

    function noData (location) {
        message = "no data for this moment";
        switch (location) {
            case "chart1":
                $("#chart1").html(message);
                break;
            case "chart2":
                $("#chart2").html(message);
                break;
            case "chart3":
                $("#chart3").html(message);
                break;
            case "chart4":
                $("#chart4").html(message);
                break;
        }
    }
    function setHeader(xhr) {
        xhr.setRequestHeader('X-Auth-Token', token);
    }

    function getToken() {
        $.ajax({
            url: IP+"/auth-tokens",
            type: 'POST',
            dataType: 'json',
            success: function(result) {
                console.log(result);

            },
            error: function() {
                console.log("Erreur autentification POST /auth-tokens");
            },
            beforeSend: setHeader
        });
    }


    getSensorInformation();
});