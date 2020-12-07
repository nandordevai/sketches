function map(value, minFrom, maxFrom, minTo, maxTo) {
    if (value > maxFrom) return maxFrom;
    if (value < minFrom) return minFrom;
    return (maxTo - minTo) * (value / (maxFrom - minFrom)) + minTo;
}

function random(min, max) {
    return map(Math.random(), 0, 1, min, max);
}
