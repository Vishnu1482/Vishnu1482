/*................. */

var textWrapper = document.querySelector('.welcome');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({
        loop: true
    })
    .add({
        targets: '.welcome .letter',
        opacity: [0, 1],
        easing: "easeInOutQuad",
        duration: 1500,
        delay: (el, i) => 150 * (i + 1)
    }).add({
        targets: '.welcome',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
    });