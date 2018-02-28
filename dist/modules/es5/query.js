import Orbit from './main';
import { QueryTerm } from './query-term';
import { isObject } from '@orbit/utils';
/**
 * A builder function for creating a Query from its constituent parts.
 *
 * If a `Query` is passed in with an `id` and `expression`, and no replacement
 * `id` or `options` are also passed in, then the `Query` will be returned
 * unchanged.
 *
 * For all other cases, a new `Query` object will be created and returned.
 *
 * Queries will be assigned the specified `queryId` as `id`. If none is
 * specified, a UUID will be generated.
 *
 * @export
 * @param {QueryOrExpression} queryOrExpression
 * @param {object} [queryOptions]
 * @param {string} [queryId]
 * @param {QueryBuilder} [queryBuilder]
 * @returns {Query}
 */
export function buildQuery(queryOrExpression, queryOptions, queryId, queryBuilder) {
    if (typeof queryOrExpression === 'function') {
        return buildQuery(queryOrExpression(queryBuilder), queryOptions, queryId);
    } else {
        var query = queryOrExpression;
        var expression = void 0;
        var options = void 0;
        if (isObject(query) && query.expression) {
            if (query.id && !queryOptions && !queryId) {
                return query;
            }
            expression = query.expression;
            options = queryOptions || query.options;
        } else {
            if (queryOrExpression instanceof QueryTerm) {
                expression = queryOrExpression.toQueryExpression();
            } else {
                expression = queryOrExpression;
            }
            options = queryOptions;
        }
        var id = queryId || Orbit.uuid();
        return { expression: expression, options: options, id: id };
    }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcmMvcXVlcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxBQUFLLFdBQU0sQUFBUSxBQUFDO0FBRTNCLEFBQU8sU0FBRSxBQUFTLEFBQUUsaUJBQU0sQUFBYyxBQUFDO0FBRXpDLEFBQU8sU0FBRSxBQUFRLEFBQUUsZ0JBQU0sQUFBYyxBQUFDO0FBaUJ4QyxBQWtCRzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNILEFBQU0sMkJBQXFCLEFBQW9DLG1CQUFFLEFBQXFCLGNBQUUsQUFBZ0IsU0FBRSxBQUEyQjtBQUNuSSxBQUFFLEFBQUMsUUFBQyxPQUFPLEFBQWlCLHNCQUFLLEFBQVUsQUFBQyxZQUFDLEFBQUM7QUFDNUMsQUFBTSxlQUFDLEFBQVUsV0FBQyxBQUFpQixrQkFBQyxBQUFZLEFBQUMsZUFBRSxBQUFZLGNBQUUsQUFBTyxBQUFDLEFBQUMsQUFFNUU7QUFBQyxBQUFDLEFBQUksV0FBQyxBQUFDO0FBQ04sWUFBSSxBQUFLLFFBQUcsQUFBMEIsQUFBQztBQUN2QyxZQUFJLEFBQTJCLEFBQUM7QUFDaEMsWUFBSSxBQUFlLEFBQUM7QUFFcEIsQUFBRSxBQUFDLFlBQUMsQUFBUSxTQUFDLEFBQUssQUFBQyxVQUFJLEFBQUssTUFBQyxBQUFVLEFBQUMsWUFBQyxBQUFDO0FBQ3hDLEFBQUUsQUFBQyxnQkFBQyxBQUFLLE1BQUMsQUFBRSxNQUFJLENBQUMsQUFBWSxnQkFBSSxDQUFDLEFBQU8sQUFBQyxTQUFDLEFBQUM7QUFDMUMsQUFBTSx1QkFBQyxBQUFLLEFBQUMsQUFDZjtBQUFDO0FBQ0QsQUFBVSx5QkFBRyxBQUFLLE1BQUMsQUFBVSxBQUFDO0FBQzlCLEFBQU8sc0JBQUcsQUFBWSxnQkFBSSxBQUFLLE1BQUMsQUFBTyxBQUFDLEFBQzFDO0FBQUMsQUFBQyxBQUFJLGVBQUMsQUFBQztBQUNOLEFBQUUsQUFBQyxnQkFBQyxBQUFpQiw2QkFBWSxBQUFTLEFBQUMsV0FBQyxBQUFDO0FBQzNDLEFBQVUsNkJBQUcsQUFBaUIsa0JBQUMsQUFBaUIsQUFBRSxBQUFDLEFBQ3JEO0FBQUMsQUFBQyxBQUFJLG1CQUFDLEFBQUM7QUFDTixBQUFVLDZCQUFHLEFBQW9DLEFBQUMsQUFDcEQ7QUFBQztBQUNELEFBQU8sc0JBQUcsQUFBWSxBQUFDLEFBQ3pCO0FBQUM7QUFFRCxZQUFJLEFBQUUsS0FBVyxBQUFPLFdBQUksQUFBSyxNQUFDLEFBQUksQUFBRSxBQUFDO0FBRXpDLEFBQU0sZUFBQyxFQUFFLEFBQVUsd0JBQUUsQUFBTyxrQkFBRSxBQUFFLEFBQUUsQUFBQyxBQUNyQztBQUFDLEFBQ0g7QUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBPcmJpdCBmcm9tICcuL21haW4nO1xuaW1wb3J0IHsgUXVlcnlFeHByZXNzaW9uIH0gZnJvbSAnLi9xdWVyeS1leHByZXNzaW9uJztcbmltcG9ydCB7IFF1ZXJ5VGVybSB9IGZyb20gJy4vcXVlcnktdGVybSc7XG5pbXBvcnQgUXVlcnlCdWlsZGVyIGZyb20gJy4vcXVlcnktYnVpbGRlcic7XG5pbXBvcnQgeyBpc09iamVjdCB9IGZyb20gJ0BvcmJpdC91dGlscyc7XG5cbmV4cG9ydCB0eXBlIFF1ZXJ5QnVpbGRlckZ1bmMgPSAoUXVlcnlCdWlsZGVyKSA9PiBRdWVyeUV4cHJlc3Npb247XG5leHBvcnQgdHlwZSBRdWVyeU9yRXhwcmVzc2lvbiA9IFF1ZXJ5IHwgUXVlcnlFeHByZXNzaW9uIHwgUXVlcnlUZXJtIHwgUXVlcnlCdWlsZGVyRnVuYztcblxuLyoqXG4gKiBRdWVyaWVzIGFyZSB1c2VkIHRvIGV4dHJhY3QgZGF0YSBmcm9tIGEgc291cmNlLlxuICpcbiAqIEBleHBvcnRcbiAqIEBpbnRlcmZhY2UgUXVlcnlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBRdWVyeSB7XG4gIGlkOiBzdHJpbmc7XG4gIGV4cHJlc3Npb246IFF1ZXJ5RXhwcmVzc2lvbjtcbiAgb3B0aW9ucz86IGFueTtcbn1cblxuLyoqXG4gKiBBIGJ1aWxkZXIgZnVuY3Rpb24gZm9yIGNyZWF0aW5nIGEgUXVlcnkgZnJvbSBpdHMgY29uc3RpdHVlbnQgcGFydHMuXG4gKlxuICogSWYgYSBgUXVlcnlgIGlzIHBhc3NlZCBpbiB3aXRoIGFuIGBpZGAgYW5kIGBleHByZXNzaW9uYCwgYW5kIG5vIHJlcGxhY2VtZW50XG4gKiBgaWRgIG9yIGBvcHRpb25zYCBhcmUgYWxzbyBwYXNzZWQgaW4sIHRoZW4gdGhlIGBRdWVyeWAgd2lsbCBiZSByZXR1cm5lZFxuICogdW5jaGFuZ2VkLlxuICpcbiAqIEZvciBhbGwgb3RoZXIgY2FzZXMsIGEgbmV3IGBRdWVyeWAgb2JqZWN0IHdpbGwgYmUgY3JlYXRlZCBhbmQgcmV0dXJuZWQuXG4gKlxuICogUXVlcmllcyB3aWxsIGJlIGFzc2lnbmVkIHRoZSBzcGVjaWZpZWQgYHF1ZXJ5SWRgIGFzIGBpZGAuIElmIG5vbmUgaXNcbiAqIHNwZWNpZmllZCwgYSBVVUlEIHdpbGwgYmUgZ2VuZXJhdGVkLlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7UXVlcnlPckV4cHJlc3Npb259IHF1ZXJ5T3JFeHByZXNzaW9uXG4gKiBAcGFyYW0ge29iamVjdH0gW3F1ZXJ5T3B0aW9uc11cbiAqIEBwYXJhbSB7c3RyaW5nfSBbcXVlcnlJZF1cbiAqIEBwYXJhbSB7UXVlcnlCdWlsZGVyfSBbcXVlcnlCdWlsZGVyXVxuICogQHJldHVybnMge1F1ZXJ5fVxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRRdWVyeShxdWVyeU9yRXhwcmVzc2lvbjogUXVlcnlPckV4cHJlc3Npb24sIHF1ZXJ5T3B0aW9ucz86IG9iamVjdCwgcXVlcnlJZD86IHN0cmluZywgcXVlcnlCdWlsZGVyPzogUXVlcnlCdWlsZGVyKTogUXVlcnkge1xuICBpZiAodHlwZW9mIHF1ZXJ5T3JFeHByZXNzaW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGJ1aWxkUXVlcnkocXVlcnlPckV4cHJlc3Npb24ocXVlcnlCdWlsZGVyKSwgcXVlcnlPcHRpb25zLCBxdWVyeUlkKTtcblxuICB9IGVsc2Uge1xuICAgIGxldCBxdWVyeSA9IHF1ZXJ5T3JFeHByZXNzaW9uIGFzIFF1ZXJ5O1xuICAgIGxldCBleHByZXNzaW9uOiBRdWVyeUV4cHJlc3Npb247XG4gICAgbGV0IG9wdGlvbnM6IG9iamVjdDtcblxuICAgIGlmIChpc09iamVjdChxdWVyeSkgJiYgcXVlcnkuZXhwcmVzc2lvbikge1xuICAgICAgaWYgKHF1ZXJ5LmlkICYmICFxdWVyeU9wdGlvbnMgJiYgIXF1ZXJ5SWQpIHtcbiAgICAgICAgcmV0dXJuIHF1ZXJ5O1xuICAgICAgfVxuICAgICAgZXhwcmVzc2lvbiA9IHF1ZXJ5LmV4cHJlc3Npb247XG4gICAgICBvcHRpb25zID0gcXVlcnlPcHRpb25zIHx8IHF1ZXJ5Lm9wdGlvbnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChxdWVyeU9yRXhwcmVzc2lvbiBpbnN0YW5jZW9mIFF1ZXJ5VGVybSkge1xuICAgICAgICBleHByZXNzaW9uID0gcXVlcnlPckV4cHJlc3Npb24udG9RdWVyeUV4cHJlc3Npb24oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGV4cHJlc3Npb24gPSBxdWVyeU9yRXhwcmVzc2lvbiBhcyBRdWVyeUV4cHJlc3Npb247XG4gICAgICB9XG4gICAgICBvcHRpb25zID0gcXVlcnlPcHRpb25zO1xuICAgIH1cblxuICAgIGxldCBpZDogc3RyaW5nID0gcXVlcnlJZCB8fCBPcmJpdC51dWlkKCk7XG5cbiAgICByZXR1cm4geyBleHByZXNzaW9uLCBvcHRpb25zLCBpZCB9O1xuICB9XG59XG4iXX0=