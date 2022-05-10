function createControls(controls) {
    controls.forEach((c, i) => {
        const yOffset = c.height === 'large' ? 8 : 0;
        const s = createSlider(c.min, c.max, c.default, c.steps);
        const top = 50;
        s.position(120, top + i * 30);
        const l = createDiv(c.label);
        l.class('label');
        if (c.style === 'dark') {
            l.class('dark');
        }
        l.position(50, top - 2 + i * 30 + yOffset);
        s.input(() => {
            if (c.callback) {
                c.callback(s);
            }
            draw();
        });
    });
}

function linlin(value, start1, stop1, start2, stop2) {
    return start2 + ((value - start1) / (stop1 - start1)) * (stop2 - start2);
}

function linexp(value, start1, stop1, start2, stop2) {
    return bezierPoint(start2, stop2, stop2, stop2, linlin(value, start1, stop1, 0, 1));
}

function cerp(start2, stop2, _in, out, t) {
    return bezierPoint(start2, _in, stop2 - out, stop2, t);
}
