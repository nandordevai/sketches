document.querySelectorAll('video').forEach((_) => {
    _.addEventListener('play', () => {
        _.removeAttribute('controls');
    });
    _.addEventListener('mouseout', () => {
        _.removeAttribute('controls');
    });
    _.addEventListener('mouseover', () => {
        _.setAttribute('controls', 'controls');
    });
    _.addEventListener('mousemove', () => {
        _.setAttribute('controls', 'controls');
    });
});