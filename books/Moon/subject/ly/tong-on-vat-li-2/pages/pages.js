async function displayContent() {
  // Initialize question
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let lessonName = urlParams.get('name');
  document.getElementById("main-title").innerHTML = lessonName;
  lessonName.replaceAll(" ", "\\ ");


  const url = window.location.href;
  // Go back once
  const lastSlash = url.substring(0, url.lastIndexOf('/'));
  const BASE = url.lastIndexOf('/', lastSlash);

  const response = await fetch(`${BASE}/data/dap-an/${lessonName}.json`);
  if (!response.ok) {
    // console.log('out!');

    // TODO: put a things on checklist https://www.checklist.design/website/404 here
    document.body.innerHTML = "not found";
    return
  }
  const data = await response.json();
  // console.log(data);

  // Load the title
  document.title = lessonName;
  // TODO: add content table


  const questionList = document.getElementById('question-list');

  data.forEach(question => {
    const questionLi = document.createElement('li');
    questionLi.className = 'question';
    questionLi.id = question['questionId'];

    // Question's basic info
    const info = document.createElement('p');
    info.className = 'info';
    if (question['bookId']) {
      info.innerHTML = `Câu ${question['order']}: [${question['questionId']}]`;
      questionLi.appendChild(info);
    } else {
      info.innerHTML = `Câu ${question['order']}:`;
      questionLi.appendChild(info);
      document.getElementById('search-bar').style.display = 'None'
    }

    // Question's content (includes the question text and choices)
    const content = document.createElement('div');
    content.className = 'content';

    const questionContent = document.createElement('p');
    questionContent.className = 'question-content';
    questionContent.innerHTML = question['questionText'];
    content.appendChild(questionContent);

    if (question['a']) {
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
    }


    // Question's answer (includes short and long answer)
    const answer = document.createElement('div');

    // Create a toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.id = `${question['questionId']}-btn`
    toggleBtn.className = "toggle-btn";
    toggleBtn.innerHTML = "Đáp án";
    toggleBtn.onclick = () => {
      $(`#${question['questionId']}-question`).toggle();
    };

    answer.className = 'answer';

    const longAnswer = document.createElement('div');
    longAnswer.className = 'long-answer';
    longAnswer.id = `${question['questionId']}-question`;
    longAnswer.innerHTML = question['answer'];
    answer.appendChild(toggleBtn);
    answer.appendChild(longAnswer);

    content.appendChild(answer);

    questionLi.appendChild(content);
    questionList.appendChild(questionLi);
  })
  // // Initialize content table
  // const contentTable = document.getElementById('content-table');
  // const questions = document.getElementsByClassName('question');
  // for (let i = 0; i < questions.length; i++) {
  //   const link = document.createElement('a');
  //   link.className = 'question-link';
  //   link.href = `#${questions.item(i).id}`;
  //   link.innerHTML = i + 1;
  //   contentTable.appendChild(link);
  // }
}

document.addEventListener('DOMContentLoaded', () => {
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
