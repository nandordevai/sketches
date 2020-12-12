function createControls(controls) {
    controls.forEach((c, i) => {
        const s = createSlider(c.min, c.max, c.default, c.steps);
        const top = 50;
        s.position(120, top + i * 30);
        const l = createDiv(c.label);
        l.class('label');
        if (c.style === 'dark') {
            l.class('dark');
        }
        l.position(50, top - 2 + i * 30);
        s.input(() => {
            if (c.callback) {
                c.callback(s);
            }
            draw();
        });
    });
}
