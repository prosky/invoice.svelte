function cubicOut(t) {
    const f = t - 1.0;
    return f * f * f + 1.0;
}
function elasticOut(t) {
    return (Math.sin((-13.0 * (t + 1.0) * Math.PI) / 2) * Math.pow(2.0, -10.0 * t) + 1.0);
}
function quintOut(t) {
    return --t * t * t * t * t + 1;
}

export { cubicOut as c, elasticOut as e, quintOut as q };
