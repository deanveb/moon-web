async function displayContent()
{
  // Initialize question
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const lessonName = urlParams.get('name');
  
  const response = await fetch(`data/dap-an/${lessonName}.json`);
  const data = await response.json();

  const questionList = document.getElementById('question-list');

  data.forEach(question => {
    const questionLi = document.createElement('li');
    questionLi.className = 'question';
    questionLi.id = question['questionId'];
    
    // Question's basic info
    const info = document.createElement('p');
    info.className = 'info';
    info.innerHTML = `Câu ${question['order']}: [${question['questionId']}]`;
    questionLi.appendChild(info);

    // Question's content (includes the question text and choices)
    const content = document.createElement('div');
    content.className = 'content';

    const questionContent = document.createElement('p');
    questionContent.className = 'question-content';
    questionContent.innerHTML = question['questionText'];
    content.appendChild(questionContent);

    const choiceContent = document.createElement('div');
    choiceContent.className = 'choice-content';
    for (let i = 0; i < 4; i++) {
      let choiceChar = ['A', 'B', 'C', 'D'];
      let choice = document.createElement('p');
      choice.className = 'choice';
      choice.innerHTML = `${choiceChar[i]}. ${question[choiceChar[i].toLowerCase()]}`;
      choiceContent.innerHTML += choice.outerHTML;
    }
    content.appendChild(choiceContent);

    questionLi.appendChild(content);

    // Question's answer (includes short and long answer)
    const answer = document.createElement('div');
    
    // const shortAnswer = document.createElement('p');
    // shortAnswer.className = 'short-answer';
    // shortAnswer.innerHTML = question['key'];
    // answer.appendChild(shortAnswer);

    const longAnswer = document.createElement('p');
    longAnswer.className = 'long-answer';
    longAnswer.innerHTML = question['answer'];
    answer.appendChild(longAnswer);

    questionLi.appendChild(answer);
    questionList.appendChild(questionLi);
  })
  // Initialize content table
  const contentTable = document.getElementById('content-table');
  const questions = document.getElementsByClassName('question');
  for (let i = 0; i < questions.length; i++) {
    const link = document.createElement('a');
    link.className = 'question-link';
    link.href = `#${questions.item(i).id}`;
    link.innerHTML = i+1;
    contentTable.appendChild(link);
  }
}

document.addEventListener('DOMContentLoaded', (e) => {
  displayContent();
  const searchBar = document.getElementById('search-bar');
  searchBar.addEventListener('input', (e) => {
    const questions = document.getElementsByClassName('question');
    // console.log(e.currentTarget.value);
    
    for (let i = 0; i < questions.length; i++) {
      if (questions.item(i).id.includes(e.currentTarget.value)) {
        questions.item(i).style.display = "";
      } else {
        questions.item(i).style.display = "none";
      }
    }
  });
})