function generateId() {
    return 'id-' + Math.random().toString(36).substr(2, 9);
}

let userId = localStorage.getItem('userId');
if (!userId) {
    userId = generateId();
    localStorage.setItem('userId', userId);
}

document.getElementById("more").addEventListener('click', (e) => {
    e.preventDefault()
    let element = document.createElement('div');
    element.classList.add("examens")
    element.innerHTML = `
        <input type="text" name="nom" placeholder="Nom de l'examen" required><br>
        <input type="number" name="duree" placeholder="Durée (minutes)" required><br>
        <textarea name="description" placeholder="Description"></textarea><br>`
    const form = document.getElementById("form-examen");
    const lastLine = form.querySelector('button')
    form.insertBefore(element, lastLine)
})


document.getElementById("form-examen").addEventListener('submit', (e) => {
    e.preventDefault();
    const examens = document.querySelectorAll(".examens")
    const propr = document.getElementById('proprietaire').value
    const examenList = []
    examens.forEach(e => {
        const nom = e.querySelector('[name="nom"]').value;
        const duree = parseInt(e.querySelector('[name="duree"]').value);
        const description = e.querySelector('[name="description"]').value;
        examenList.push({
            nom,
            duree,
            description,
            propr,
            questions: []
        });
    })
    const examsKey = 'examens_' + userId;
    const exams = JSON.parse(localStorage.getItem(examsKey)) || [];
    exams.push(...examenList);
    localStorage.setItem(examsKey, JSON.stringify(exams));
    alert('Examen(s) ajouté(s) avec succès !');

    document.getElementById('proprietaire').value = '';
    const allExamens = document.querySelectorAll(".examens");
    allExamens.forEach((exam, index) => {
        if (index === 0) {
            exam.querySelector('[name="nom"]').value = '';
            exam.querySelector('[name="duree"]').value = '';
            exam.querySelector('[name="description"]').value = '';
        } else {
            exam.remove();
        }
    });
})