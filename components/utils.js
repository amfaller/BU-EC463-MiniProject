export function getThemeColor() {
    return '#9FF8A0'
}

export function getThemeColorByOpacity(opacity) {
    if (opacity >= 0 && opacity <= 1) {
        return 'rgba(111, 217, 142, ' + opacity + ')'
    } else {
        return getThemeColor()
    }
}