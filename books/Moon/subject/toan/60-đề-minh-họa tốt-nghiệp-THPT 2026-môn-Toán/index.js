async function displayContent() {
  const list = document.getElementById('lessons-list')
  const url = window.location.href;
  const BASE = url.substring(0, url.lastIndexOf('/'));
  const response = await fetch(`${BASE}/data/ds-bai-hoc/lessons.json`);
  const data = await response.json();
  // TODO: improve the sorting algorithm to be sorted according to lessons order
  data.sort((b, a) => {
    b.name.localeCompare(a.name, 'vi', { numeric: true })
  });
  // console.log(data);

  data.forEach(lesson => {
    const newLesson = document.createElement('li');
    newLesson.className = 'lesson';
    // this feel wrong
    newLesson.id = lesson['name'];
    const link = document.createElement('a');
    link.href = `${BASE}/pages/pages.html?name=${lesson['name']}`;
    link.innerHTML = lesson['name'];
    newLesson.appendChild(link);
    list.appendChild(newLesson);
  });
}

document.addEventListener('DOMContentLoaded', (e) => {
  displayContent();
})
