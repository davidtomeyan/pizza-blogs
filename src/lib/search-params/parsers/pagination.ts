import { createParser, parseAsInteger, type UrlKeys } from "nuqs/server";
import {isNumber} from "@/lib/utils/is-number";

const paginationParsers = (props?: {
	totalPages?: number;
	defaultLimit?: number;
}) => ({
	page: createParser({
		...parseAsInteger,
		parse: (v) => {
			const n = parseAsInteger.parse(v);
			if (!isNumber(n)) return n;
			return isNumber(props?.totalPages)
				? Math.min(Math.max(1, n), props.totalPages)
				: Math.max(1, n);
		},
	}).withDefault(1),
	limit: parseAsInteger.withDefault(props?.defaultLimit ?? 5),
});

const paginationUrlKeys: UrlKeys<typeof paginationParsers> = {
	page: "page",
	limit: "limit",
};

export { paginationUrlKeys, paginationParsers };
