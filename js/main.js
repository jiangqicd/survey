var ind = 0;
var e_count = 0;
var p_count = 0;
var c_count = 0;
var embedding_rating = {
    question: "Which option do you think is the most suitable?",
    answer: {
        "Very Good": 5,
        "Good": 4,
        "Neutral": 3,
        "Poor": 2,
        "Very Poor": 1,
    }
}
var path_rating = {
    question: "How do you feel about this transition path?",
    answer: {
        "Very Good": 5,
        "Good": 4,
        "Neutral": 3,
        "Poor": 2,
        "Very Poor": 1,
    }
}
var embedding_num = 5
var path_num = 5
var quiz = [
    {
        question: "Unde veți sărbători sfârșitul carantinei?",
        answer: [
            'La sala de simulatoare',
            'La un antrenament de grup',
            'Antrenament online plus sală de sport',
            'Oriunde, numai să ies din casă'
        ]
    },
    {
        question: "La ce oră puteți face sport?",
        answer: [
            'Dimineața',
            'Ziua',
            'Seara',
            'Oricând, numai să revin odată la sală'
        ]
    },
    {
        question: "Care sunt scopurile Dmneavoastră la sală?",
        answer: [
            'Să slăbesc',
            'Să-mi cresc masa musculară',
            'Tonifiere și reliefare',
            'Să-mi găsesc prieteni noi'
        ]
    },
    {
        question: "Antrenorul Dumneavoastră personal trebuie să fie:",
        answer: [
            'Un bărbat',
            'O femeie',
            'Profesionist în domeniu'
        ]
    }
];

var survey_result = [];

function render_question(i) {

    if (i > 0 && i < quiz.length) {
        if (!$('#inapoi').length)
            $('.divper').after('<button type="button" id="next" class="btn btn-primary">Next</button>');
    }
    else {
        $('#inapoi').remove();
    }

    var quest = quiz[i].question;
    var ans = quiz[i].answer;
    var question_base = `<div id="question-${i}"></div>`
    $('.divper').append(question_base);

    var ht = `<h3>${quest}</h3></hr>`;

    $(`#question-${i}`).append(ht);


    for (var j = 0; j < ans.length; j++) {
        var cur_ans = ans[j];
        var item = $(`\
         <div class="form-group  per"> \
        <input type="checkbox" name="fancy-checkbox-danger${j}" id="fancy-checkbox-danger${j}" autocomplete="off" /> \
        <div class=" btn-group "> \
            <label for="fancy-checkbox-danger${j}" class="btn btn-danger${j}" style="color:white; background-color:red;"> \
                <span class=" glyphicon glyphicon-ok"></span> \
                <span> </span> \
            </label> \
            <label for="fancy-checkbox-danger${j}" class="btn btn-default active" style="background-color: white; border-color: white; "> \
                ${cur_ans}\
            </label> \
        </div> \
    </div> `).hide().fadeIn();
        $(`#question-${i}`).append(item);
    }
    console.log(i, (typeof survey_result[i] != "undefined"))
    if (typeof survey_result[i] != "undefined") {
        var saved_ans = survey_result[i].index;
        $(`label[for="fancy-checkbox-danger${saved_ans}"]`)[0].click();
    }
    next_question(i);
}

function next_question(index) {

    $('#inapoi').click(function () {

        $(`#question-${index}`).fadeOut(359, function () {
            $(this).remove();
            index--;
            render_question(index);
        });
    })
    $('.btn-group').click(function () {

        console.log(this.textContent);
        var temp_obj = {};
        temp_obj.ans = this.textContent;
        temp_obj.index = parseInt(this.childNodes[1].htmlFor.replace(/\D/g, ''));
        survey_result[index] = temp_obj;
        $(`#question-${index}`).fadeOut(359, function () {
            $(this).remove();
            index++;
            render_question(index);
        });
    })
}

$("#start").on("click", function () {
    var name = $("#name").val()
    console.log(name)
    var age = $("#age").val()
    var experience = $("#experience").val()
    var Gender = null
    var obj = document.getElementsByName("gender")
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].checked) {
            Gender = obj[i].value
        }
    }
    result["name"] = name
    result["gender"] = Gender
    result["age"] = age
    result["experience in data analysis"] = experience
    $("#user").remove()
    $("#title").remove()
    startSurvey()
})

function startSurvey() {
    var beginTime = new Date().getTime()
    var item = '<div id="embedding" style="height: 1000px;width: 1000px;position: absolute;left: 100px"></div>'
    $("#container").append(item);
    var quest = (e_count + 1).toString() + "-"
    quest += embedding_rating.question
    var ht = `<h4 id="question">${quest}</h4></hr>`;
    var image = '<div id="imge" style="height: 800px;width: 1000px"></div>'
    var text = '<div id="text" style="height: 200px;"></div>'
    $("#embedding").append(image);
    $("#embedding").append(text);
    $("#text").append(ht);
    var img = document.createElement("img")
    img.src = "./img/scatter/scatter_1.png"
    img.className = "image"
    img.width = 1600
    img.height = 800
    $("#imge").append(img);
    var item1 = '<input type="radio" name="rate" value="A"/> A'
    var item2 = '<input type="radio" name="rate" value="B"/> B'
    var item3 = '<input type="radio" name="rate" value="C"/> C'
    var item4 = '<input type="radio" name="rate" value="D"/> D'
    var next = '<button type="button" id="nextembedding"  style="color: #384ade;">Next</button>'
    $("#text").append(item1);
    $("#text").append(item2);
    $("#text").append(item3);
    $("#text").append(item4);
    $("#text").append('<p>    </p>');
    $("#text").append(next);
    $("#nextembedding").on("click", function () {
        var endTime = new Date().getTime()
        if (e_count < 4) {
            var value = null
            var obj = document.getElementsByName("rate")
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].checked) {
                    value = obj[i].value
                }
            }
            if (value) {
                var obj = document.getElementsByName("rate")
                for (var i = 0; i < obj.length; i++) {
                    obj[i].checked = false
                }
                result["embedding-" + e_count.toString()] = value
                result["embedding-" + e_count.toString() + "-time"] = (endTime - beginTime) / 1000
                beginTime = endTime
                e_count += 1
                var quest = (e_count + 1).toString() + "-"
                quest += embedding_rating.question
                $('h4').text(quest)
                var img = document.createElement("img")
                img.src = "./img/scatter/scatter_" + (e_count + 1).toString() + ".png"
                img.className = "image"
                img.width = 1600
                img.height = 800
                $("#imge").empty();
                $("#imge").append(img);
            }
        } else {
            var value = null
            var obj = document.getElementsByName("rate")
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].checked) {
                    value = obj[i].value
                }
            }
            if (value) {
                result["embedding-" + e_count.toString()] = value
                result["embedding-" + e_count.toString() + "-time"] = (endTime - beginTime) / 1000
                beginTime = endTime
                $("#embedding").remove()
                startPath()
            }
        }
    })
}

function startPath() {
    var item = '<div id="path" style="height: 1000px;width: 1000px;position: absolute;left: 100px"></div>'
    $("#container").append(item);
    var quest = (p_count + 1).toString() + "-"
    quest += path_rating.question
    var ht = `<h4 id="question">${quest}</h4></hr>`;
    var image = '<div id="imge" style="height: 500px;width: 1000px"></div>'
    var text = '<div id="text" style="height: 200px;"></div>'
    $("#path").append(image);
    $("#path").append(text);
    $("#text").append(ht);
    var img = document.createElement("img")
    img.src = "./img/path/path_1.png"
    img.className = "image"
    img.width = 1600
    img.height = 400
    $("#imge").append(img);
    var item1 = '<input type="radio" name="rate" value="5"/> Very Good'
    var item2 = '<input type="radio" name="rate" value="4"/> Good'
    var item3 = '<input type="radio" name="rate" value="3"/> Neutral'
    var item4 = '<input type="radio" name="rate" value="2"/>  Poor'
    var item5 = '<input type="radio" name="rate" value="1"/>  Very Poor'
    var next = '<button type="button" id="nextpath"  style="color: #384ade;">Next</button>'
    $("#text").append(item1);
    $("#text").append(item2);
    $("#text").append(item3);
    $("#text").append(item4);
    $("#text").append(item5);
    $("#text").append('<p>    </p>');
    $("#text").append(next);
    $("#nextpath").on("click", function () {
        if (p_count < 4) {
            var value = null
            var obj = document.getElementsByName("rate")
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].checked) {
                    value = obj[i].value
                }
            }
            if (value) {
                var obj = document.getElementsByName("rate")
                for (var i = 0; i < obj.length; i++) {
                    obj[i].checked = false
                }
                result["path-" + p_count.toString()] = value
                p_count += 1
                var quest = (p_count + 1).toString() + "-"
                quest += path_rating.question
                $('h4').text(quest)
                var img = document.createElement("img")
                img.src = "./img/path/path_" + (p_count + 1).toString() + ".png"
                img.className = "image"
                img.width = 1600
                img.height = 400
                $("#imge").empty();
                $("#imge").append(img);
            }
        } else {
            var value = null
            var obj = document.getElementsByName("rate")
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].checked) {
                    value = obj[i].value
                }
            }
            if (value) {
                result["path-" + e_count.toString()] = value
                $("#path").remove()
                console.log(result)
                end()
            }
        }
    })
}

function end() {
    var item = '<div id="end" style="height: 1000px;width: 1000px;position: absolute;left: 100px"></div>'
    $("#container").append(item);
    var item1 = '<textarea id="result" cols="50" rows="10" style="margin-top: 30px"></textarea>'
    $("#end").append(item1);
    $("#result").val(JSON.stringify(result, null, 4));
}

function startCompare() {
    console.log("111111111111111111111")
    var item = '<div id="compare" class="row"style="background: #06bd00;height: 10px"></div>'
    $("#container").append(item);
    var quest = (p_count + 1).toString() + "-"
    quest += path_rating.question
    var ht = `<h4 id="question">${quest}</h4></hr>`;
    var image = '<div id="imge" class="row"style="background: #06bd00;height: 10px"></div>'
    var text = '<div id="text" class="row"style="background: #06bd00;height: 10px"></div>'
    $("#path").append(image);
    $("#path").append(text);
    $("#text").append(ht);
    var item1 = '<input type="radio" name="rate" value="5"/> Very Good'
    var item2 = '<input type="radio" name="rate" value="4"/> Good'
    var item3 = '<input type="radio" name="rate" value="3"/> Neutral'
    var item4 = '<input type="radio" name="rate" value="2"/>  Poor'
    var item5 = '<input type="radio" name="rate" value="1"/>  Very Poor'
    var next = '<button type="button" id="nextpath"  style="color: #384ade;">Next</button>'
    $("#text").append(item1);
    $("#text").append(item2);
    $("#text").append(item3);
    $("#text").append(item4);
    $("#text").append(item5);
    $("#text").append('<p>    </p>');
    $("#text").append(next);
}

