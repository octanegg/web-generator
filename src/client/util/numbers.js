import numeral from "numeral"

export function NumberFormatter(key, value) {
    switch (key) {
        case "SHP":
        case "GP":
        case "SP":
            return numeral(value).format("0.00%");
        default:
            return numeral(value).format("0.00");
    }
}