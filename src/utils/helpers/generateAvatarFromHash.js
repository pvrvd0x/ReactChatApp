import tinycolor from 'tinycolor2';


export default hash => {
    const [r, g, b] = hash
        .toString()
        .substr(-3)
        .split('')
        .map(char => (char.charCodeAt(0) > 255) ? 255 : char.charCodeAt(0));
    const color = tinycolor({r, g, b});

    return {
        color: color
            .lighten(10)
            .saturate(10)
            .toHexString(),
        colorLighten: color
            .lighten(30)
            .saturate(30)
            .toHexString()
    };
}