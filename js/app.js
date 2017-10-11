(function(){

 $("#loading").show();
 $("#results").hide();

var searchSourceID = '61a92dbd-2dfd-4191-815f-7c7536ee10b2';
$.ajax({
    url: window.location.protocol + "//" + window.location.host + "/_api/search/query?sourceid='" + searchSourceID + "'&rowlimit='500'&selectproperties='PictureURL,PreferredName,WorkEmail,WorkPhone,Department,AccountName,MobilePhone,JobTitle,AboutMe,LastName'",
    headers: { "Accept": "application/json; odata=verbose" },
    contentType: "application/json; odata=verbose",
    data:{
        format: 'json'
    },
    type: "GET",
    success: function (data) {
    var users = [];
    var results;
    var Picurl;
    var allpeople = new Array();
    var allresults = new Array();

        if (data.d) {
            results = data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results;
            for (i = 0; i < results.length; i++) {
                var item = results[i];
                var itemCell = item.Cells;
                var itemResults = itemCell.results;
                //Get Values for User
                var userPic = getValueByKey("PictureURL", itemResults);
                var fullname = getValueByKey("PreferredName", itemResults);
                var workEmail = getValueByKey("WorkEmail", itemResults);
                var workPhone= getValueByKey("WorkPhone", itemResults);
                var department = getValueByKey("Department", itemResults);
                var accountname = getValueByKey("AccountName", itemResults);
                var groupline = getValueByKey("MobilePhone", itemResults);
                var title = getValueByKey("JobTitle", itemResults);
                var portfolio = getValueByKey("AboutMe", itemResults);
                var lastName = getValueByKey("LastName", itemResults);
                if (lastName != null){
                    lastName = lastName.toUpperCase();
                }else if(lastName == null){
                    console.log(fullname);
                }

                if (department != undefined){
                    if(userPic!= null){
                    var group = department.split(';');
                    department = group[0];
                    //This is user's profile picture.
                    if(userPic!= null){
                        Picurl = userPic;
                    }else{
                        Picurl = '/_layouts/15/images/person.gif';
                    }
                    Picurl = userPic;
                    Picurl = Picurl.replace("MThumb", "LThumb");
                    users[i] = [Picurl,fullname,workEmail,workPhone,department,accountname,groupline,title,portfolio,lastName];
                    allresults.push(users[i]);
                    }
                }

                }}
                //This piece of code sorts alphabetical names.
                allresults = allresults.sort(function(a,b){
                  var x = a[9];
                  var y = b[9];
                if (x < y) return -1;
                if (x > y) return 1;
                return 0;
                });
                for (var i = 0; i < allresults.length; i++) {
                  allpeople.push(createGrid(allresults[i]));
                }
                $("#results").html(allpeople);
                $("#results").show();
                $("#loading").hide();
    }
});

function getValueByKey(key, results) {
    var postItem = $.grep(results, function (e) {
     if (e.Key === key)
          return e;
     })[0].Value;
     return postItem;
};

function createGrid(data){
    if (data[7]==null){
        var portfolio = data[1];
    }else if (data[8]==null){
        var portfolio = data[1] +  ", " + data[7];
    }else{
        var portfolio = data[1] +  ", " + data[7] + ", " + data[8] + "";
    }
    theInfo = "<div class='col-xs-12 col-md-4 col-lg-3' style='height:180px;'><div class='panel panel-default' style='height:90%;'>";
    theInfo += "<div class='panel-body' ><a href='javascript: void(0)' data-html='true' data-toggle='tooltip' data-original-title='" + portfolio +  "'><img class='img-responsive' onload='this.style.opacity=1' style='float:left;height:100px;padding-right:5px;' src='" + data[0] + "'></img>" + data[1] + "</a>";
    theInfo += "<br/>#" + data[4] + "</br>";
    if(data[3]!=null){
       theInfo += "Direct: " +data[3] + "</br>";
    }else{
        theInfo += "</br>";
    }
    if(data[6]!=null){
       theInfo += "Main: " +data[6] + "";
    }else{
        theInfo += "";
    }
    theInfo += "<div style='visibility:hidden;'>" + data[7] + " " + data[8] + "</div>";
    theInfo += "<div class='btn-toolbar pull-right' id='buttons'>";
    theInfo += "<div class='btn btn-default btn-sm'  type='button'><a href='https://mysites44.eop.ic.gov/Person.aspx?accountname=" + data[5] + "' target='_blank'>View Profile</a></div>";
    theInfo += "<div class='btn btn-default btn-sm'  type='button'><a href='mailto:" + data[2] + "'>Email</a></div>";
    theInfo += "</div>";
    theInfo += "</div></div></div>";
    return theInfo;
};



})();
