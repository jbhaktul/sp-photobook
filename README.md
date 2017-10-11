# sp-photobook
This is single page photobook application that I created within SharePoint 2013.

# Purpose
The problem that I was trying to solve was to create a web based phone directory with photos for the staff. I used SharePoint search to create a result source that filters on certain properties within the user's profiles. I also filtered out test accounts. I then used jquery's ajax to make a call to the SharePoint Search REST API and process the data to create the photobook. I usually use a template to organize my code better but for this case, I just wrote straight to the DOM.

This code filters the users as you type something in the search bar:

```javascript
function filter(element){
  var value = $(element).val().toLowerCase();
  $("#results > div > div > div").each(function(){
      if ($(this).text().toLowerCase().search(value) > -1){
          $(this).parent().parent().show();
      }else{
          $(this).parent().parent().hide();
      }
  })
};
```
# Screenshot of the application:
<br/>![Photobook Screeshot](https://github.com/jbhaktul/sp-photobook/blob/master/img/employee-directory.png)
