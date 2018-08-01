# surveyor
Easy survey making

```html

<div class="root"></div>

<script src="surveyor.js"></script>
  <script>
  
    // First let's create an array of our questions and answers with the below format.
  
    let survey = [{
      question: 'How many people does it take to change a lightbulb?',
      answers: [
        '1 Person',
        '12 People',
        '3 People',
        '7 People'
      ]
    },{
      question: 'How many elephants does it take to change a lightbulb?',
      answers: [
        '1 Elephant',
        '12 Elephants',
        '3 Elephants',
        '7 Elephants'
      ]
    }];
  
    // Next let's initiate the Surveyor object. Specifying our survey array as the first parameter, and the second a selector to attach our survey to.
  
    let surveyor = new Surveyor(survey, '.root');
  
    // If we want to know when the survey is completed...
  
    surveyor.completed = () => {
      console.log("The survey has been complete!");
    }
  
    // If we want to know the survey has been completed AND submitted...
  
    surveyor.submitted = (results) => {
      console.log(results);
    }
  
  </script>

```

<p align="center"><img src="https://i.imgur.com/3G5GJ2j.png" /></p>
