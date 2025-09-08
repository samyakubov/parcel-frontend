import isNumber from "lodash-es/isNumber"

export const FORMAT_PRICE = (price: number | string): string => {
	if (!isNumber(price)) return price as string
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(price)
}
