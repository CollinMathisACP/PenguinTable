var penguinPromise = d3.json("classData.json");
penguinPromise.then(

function(penguins)
    {
        var quizHeader = document.getElementById("quizes")
        quizHeader.onclick("click", makeTable(penguins, "quiz"));
        console.log("Works")
        makeTable(penguins, "none");
        
    },

function(err)
    {
        console.log(err);
    }

);

var makeTable = function(penguins, criteria)
{
    d3.selectAll("dataRows").remove();
    
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
    else
        {
            penguins.sort(function(a, b){
        var aFinal = a.final[0].grade;
        var bFinal = b.final[0].grade;
        return bFinal - aFinal;
        })
        }
    
    var row = d3.select("table").selectAll("tr").data(penguins).enter().append("tr").attr("class", "dataRow");
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
    
}