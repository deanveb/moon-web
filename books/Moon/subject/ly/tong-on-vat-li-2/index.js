async function displayContent() {
  const list = document.getElementById('lessons-list')
  const response = await fetch("data/ds-bai-hoc/lessons.json");
  const data = await response.json();
  // TODO: improve the sorting algorithm to be sorted according to lessons order
  data.sort((a, b) => {
    // return b.id - a.id;
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (nameA < nameB) {
        return -1; // nameA comes first
    }
    if (nameA > nameB) {
        return 1; // nameB comes first
    }
    return 0; // names are equal
  });
  // console.log(data);

  data.forEach(lesson => {
    const newLesson = document.createElement('li');
    newLesson.className = 'lesson';
    // this feel wrong
    newLesson.id = lesson['name'];
    const link = document.createElement('a');
    link.href = `pages/pages.html?name=${lesson['name']}`;
    link.innerHTML = lesson['name'];
    newLesson.appendChild(link);
    list.appendChild(newLesson);
  });
}

document.addEventListener('DOMContentLoaded', (e) => {
  displayContent();
})
