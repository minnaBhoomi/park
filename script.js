document.addEventListener('DOMContentLoaded', function () {
    const m1 = document.getElementById('mg1');
    m1.addEventListener('click', function () {
        alert("Merry-Go-Round will go fast now ohoo");
    });

    const fnt1 = document.getElementById('fnt1');
    fnt1.addEventListener('click', function () {
        alert("dam dum");
    });

    const birds = document.querySelectorAll('.bird');
    birds.forEach(bird => {
        bird.addEventListener('click', function () {
            alert("there is a bird oh look up");
        });
    });
});
