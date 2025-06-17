let nemoCount = 0;
let doryCount = 0;


const aquarium   = document.getElementById('aquarium');
const nemoArea   = document.getElementById('nemo-area');
const doryArea   = document.getElementById('dory-area');
const nemoLabel  = document.getElementById('countNemo');
const doryLabel  = document.getElementById('countDory');

let bubbleIdCounter = 0;


[nemoArea, doryArea].forEach(area => {
    area.addEventListener('dragover', e => e.preventDefault());
    area.addEventListener('drop', handleDropOnFish);
});

function handleDropOnFish(e) {
    e.preventDefault();
    const fishType = this.id.split('-')[0];
    const bubbleId = e.dataTransfer.getData('text/plain');
    const bubble   = document.getElementById(bubbleId);
    if (!bubble) return;

    if (bubble.dataset.fish === fishType) {
        if (fishType === 'nemo') {
            nemoCount++;
            nemoLabel.textContent = nemoCount;
        } else {
            doryCount++;
            doryLabel.textContent = doryCount;
        }
        bubble.remove();
    } else {
        bubble.dataset.droppedCorrectly = 'false';
    }
}


function spawnBubble(type) {
    const bubble = document.createElement('div');
    const id     = `bubble-${type}-${bubbleIdCounter++}`;
    bubble.id    = id;
    bubble.classList.add('bubble', type);
    bubble.draggable      = true;
    bubble.dataset.fish   = type;

    const { width } = aquarium.getBoundingClientRect();
    const size      = 30; // px
    const x         = Math.random() * (width - size);
    bubble.style.left = `${x}px`;
    bubble.style.top  = `0px`;
    bubble.dataset.origLeft = bubble.style.left;
    bubble.dataset.origTop  = bubble.style.top;

    bubble.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', bubble.id);
    });
    bubble.addEventListener('dragend', () => {
        if (bubble.dataset.droppedCorrectly !== 'true') {
            bubble.style.left = bubble.dataset.origLeft;
            bubble.style.top  = bubble.dataset.origTop;
        }
        delete bubble.dataset.droppedCorrectly;
    });

    aquarium.appendChild(bubble);
}

window.addEventListener('DOMContentLoaded', () => {
    setInterval(() => {
        spawnBubble('nemo');
        spawnBubble('dory');
    }, 2000);
});
