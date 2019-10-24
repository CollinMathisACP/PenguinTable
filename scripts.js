var penguinPromise = d3.json("classData.json");
penguinPromise.then(

function(penguins)
    {
        d3.select("#quizes").on("click", function(){
            makeTable(penguins, "quiz")
        });
        d3.select("#tests").on("click", function(){
            makeTable(penguins, "test")
        });
        d3.select("#homework").on("click", function(){
            makeTable(penguins, "hw")
        });
        d3.select("#final").on("click", function(){
            makeTable(penguins, "final")
        });
        makeTable(penguins, "none");
        
        
        
    },

function(err)
    {
        console.log(err);
    }

);

var makeTable = function(penguins, criteria)
{
    var table = document.getElementById("table");
    while(table.childNodes.item(2) != null)
    {
          table.removeChild(table.childNodes.item(2));
    }

    if(criteria == "quiz")
        {
            penguins.sort(function(a, b){
        var aQuizGrades = a.quizes.map(function(quizes) { return quizes.grade})
        var aAvg = d3.mean(aQuizGrades);
        
        var bQuizGrades = b.quizes.map(function(quizes) { return quizes.grade})
        var bAvg = d3.mean(bQuizGrades);
        return bAvg - aAvg;
        
        
            })
        }
    else if(criteria == "test")
        {
            penguins.sort(function(a, b){
        var aTestGrades = a.test.map(function(test) { return test.grade})
        var aAvg = d3.mean(aTestGrades);
        
        var bTestGrades = b.test.map(function(test) { return test.grade})
        var bAvg = d3.mean(bTestGrades);
        return bAvg - aAvg;
        
        
            })
        }
    else if(criteria == "hw")
        {
            penguins.sort(function(a, b){
        var aHomeworkGrades = a.homework.map(function(homework) { return homework.grade})
        var aAvg = d3.mean(aHomeworkGrades);
        
        var bHomeworkGrades = b.homework.map(function(homework) { return homework.grade})
        var bAvg = d3.mean(bHomeworkGrades);
        return bAvg - aAvg;
        
        
            })
        }
    else if(criteria == "final")
        {
            penguins.sort(function(a, b){
        var aFinal = a.final[0].grade;
        var bFinal = b.final[0].grade;
        return bFinal - aFinal;
        })
        }
    
    var row = d3.select("table").selectAll("tr").data(penguins).enter().append("tr")
    row.append("td").append("img").attr("src", function(d) { return d.picture; });
    row.append("td").text(function(d) {
        var quizGrades = d.quizes.map(function(quizes) { return quizes.grade});
        return d3.mean(quizGrades);
    });
    
    row.append("td").text(function(d) {
        var testGrades = d.test.map(function(test) { return test.grade});
        return d3.mean(testGrades);
    });
    
    row.append("td").text(function(d) {
        var hwGrades = d.homework.map(function(homework) { return homework.grade});
        return d3.mean(hwGrades);
    });
    
    row.append("td").text(function(d) {
        return d.final[0].grade;
    });
    
    var penguin = row.append("td").text(function(d){ return classAverage(d) });
}

var classAverage = function(penguin)
{
    var quizes = penguin.quizes.map(function(quizObject) {
        return quizObject.grade;
    })
    var quizAverage = d3.mean(quizes);
    var tests = penguin.test.map(function(testObject) {
        return testObject.grade;
    })
    var testAverage = d3.mean(tests);
    
    var homework = penguin.homework.map(function(hwObject) {
        return hwObject.grade;
    })
    var homeworkAverage = d3.mean(homework);
    
    var finalGrade = penguin.final[0].grade;

    return (quizAverage * 2) + (testAverage * 0.3) + (homeworkAverage * 0.3) + (finalGrade * 0.35);
}
