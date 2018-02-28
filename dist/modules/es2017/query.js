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
    }
    else {
        let query = queryOrExpression;
        let expression;
        let options;
        if (isObject(query) && query.expression) {
            if (query.id && !queryOptions && !queryId) {
                return query;
            }
            expression = query.expression;
            options = queryOptions || query.options;
        }
        else {
            if (queryOrExpression instanceof QueryTerm) {
                expression = queryOrExpression.toQueryExpression();
            }
            else {
                expression = queryOrExpression;
            }
            options = queryOptions;
        }
        let id = queryId || Orbit.uuid();
        return { expression, options, id };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcmMvcXVlcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLE1BQU0sUUFBUSxDQUFDO0FBRTNCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFekMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQWlCeEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILE1BQU0scUJBQXFCLGlCQUFvQyxFQUFFLFlBQXFCLEVBQUUsT0FBZ0IsRUFBRSxZQUEyQjtJQUNuSSxFQUFFLENBQUMsQ0FBQyxPQUFPLGlCQUFpQixLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDNUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsRUFBRSxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFFNUUsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sSUFBSSxLQUFLLEdBQUcsaUJBQTBCLENBQUM7UUFDdkMsSUFBSSxVQUEyQixDQUFDO1FBQ2hDLElBQUksT0FBZSxDQUFDO1FBRXBCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUN4QyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDMUMsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNmLENBQUM7WUFDRCxVQUFVLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQztZQUM5QixPQUFPLEdBQUcsWUFBWSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDMUMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sRUFBRSxDQUFDLENBQUMsaUJBQWlCLFlBQVksU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDM0MsVUFBVSxHQUFHLGlCQUFpQixDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDckQsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLFVBQVUsR0FBRyxpQkFBb0MsQ0FBQztZQUNwRCxDQUFDO1lBQ0QsT0FBTyxHQUFHLFlBQVksQ0FBQztRQUN6QixDQUFDO1FBRUQsSUFBSSxFQUFFLEdBQVcsT0FBTyxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUV6QyxNQUFNLENBQUMsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3JDLENBQUM7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE9yYml0IGZyb20gJy4vbWFpbic7XG5pbXBvcnQgeyBRdWVyeUV4cHJlc3Npb24gfSBmcm9tICcuL3F1ZXJ5LWV4cHJlc3Npb24nO1xuaW1wb3J0IHsgUXVlcnlUZXJtIH0gZnJvbSAnLi9xdWVyeS10ZXJtJztcbmltcG9ydCBRdWVyeUJ1aWxkZXIgZnJvbSAnLi9xdWVyeS1idWlsZGVyJztcbmltcG9ydCB7IGlzT2JqZWN0IH0gZnJvbSAnQG9yYml0L3V0aWxzJztcblxuZXhwb3J0IHR5cGUgUXVlcnlCdWlsZGVyRnVuYyA9IChRdWVyeUJ1aWxkZXIpID0+IFF1ZXJ5RXhwcmVzc2lvbjtcbmV4cG9ydCB0eXBlIFF1ZXJ5T3JFeHByZXNzaW9uID0gUXVlcnkgfCBRdWVyeUV4cHJlc3Npb24gfCBRdWVyeVRlcm0gfCBRdWVyeUJ1aWxkZXJGdW5jO1xuXG4vKipcbiAqIFF1ZXJpZXMgYXJlIHVzZWQgdG8gZXh0cmFjdCBkYXRhIGZyb20gYSBzb3VyY2UuXG4gKlxuICogQGV4cG9ydFxuICogQGludGVyZmFjZSBRdWVyeVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFF1ZXJ5IHtcbiAgaWQ6IHN0cmluZztcbiAgZXhwcmVzc2lvbjogUXVlcnlFeHByZXNzaW9uO1xuICBvcHRpb25zPzogYW55O1xufVxuXG4vKipcbiAqIEEgYnVpbGRlciBmdW5jdGlvbiBmb3IgY3JlYXRpbmcgYSBRdWVyeSBmcm9tIGl0cyBjb25zdGl0dWVudCBwYXJ0cy5cbiAqXG4gKiBJZiBhIGBRdWVyeWAgaXMgcGFzc2VkIGluIHdpdGggYW4gYGlkYCBhbmQgYGV4cHJlc3Npb25gLCBhbmQgbm8gcmVwbGFjZW1lbnRcbiAqIGBpZGAgb3IgYG9wdGlvbnNgIGFyZSBhbHNvIHBhc3NlZCBpbiwgdGhlbiB0aGUgYFF1ZXJ5YCB3aWxsIGJlIHJldHVybmVkXG4gKiB1bmNoYW5nZWQuXG4gKlxuICogRm9yIGFsbCBvdGhlciBjYXNlcywgYSBuZXcgYFF1ZXJ5YCBvYmplY3Qgd2lsbCBiZSBjcmVhdGVkIGFuZCByZXR1cm5lZC5cbiAqXG4gKiBRdWVyaWVzIHdpbGwgYmUgYXNzaWduZWQgdGhlIHNwZWNpZmllZCBgcXVlcnlJZGAgYXMgYGlkYC4gSWYgbm9uZSBpc1xuICogc3BlY2lmaWVkLCBhIFVVSUQgd2lsbCBiZSBnZW5lcmF0ZWQuXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHtRdWVyeU9yRXhwcmVzc2lvbn0gcXVlcnlPckV4cHJlc3Npb25cbiAqIEBwYXJhbSB7b2JqZWN0fSBbcXVlcnlPcHRpb25zXVxuICogQHBhcmFtIHtzdHJpbmd9IFtxdWVyeUlkXVxuICogQHBhcmFtIHtRdWVyeUJ1aWxkZXJ9IFtxdWVyeUJ1aWxkZXJdXG4gKiBAcmV0dXJucyB7UXVlcnl9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZFF1ZXJ5KHF1ZXJ5T3JFeHByZXNzaW9uOiBRdWVyeU9yRXhwcmVzc2lvbiwgcXVlcnlPcHRpb25zPzogb2JqZWN0LCBxdWVyeUlkPzogc3RyaW5nLCBxdWVyeUJ1aWxkZXI/OiBRdWVyeUJ1aWxkZXIpOiBRdWVyeSB7XG4gIGlmICh0eXBlb2YgcXVlcnlPckV4cHJlc3Npb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gYnVpbGRRdWVyeShxdWVyeU9yRXhwcmVzc2lvbihxdWVyeUJ1aWxkZXIpLCBxdWVyeU9wdGlvbnMsIHF1ZXJ5SWQpO1xuXG4gIH0gZWxzZSB7XG4gICAgbGV0IHF1ZXJ5ID0gcXVlcnlPckV4cHJlc3Npb24gYXMgUXVlcnk7XG4gICAgbGV0IGV4cHJlc3Npb246IFF1ZXJ5RXhwcmVzc2lvbjtcbiAgICBsZXQgb3B0aW9uczogb2JqZWN0O1xuXG4gICAgaWYgKGlzT2JqZWN0KHF1ZXJ5KSAmJiBxdWVyeS5leHByZXNzaW9uKSB7XG4gICAgICBpZiAocXVlcnkuaWQgJiYgIXF1ZXJ5T3B0aW9ucyAmJiAhcXVlcnlJZCkge1xuICAgICAgICByZXR1cm4gcXVlcnk7XG4gICAgICB9XG4gICAgICBleHByZXNzaW9uID0gcXVlcnkuZXhwcmVzc2lvbjtcbiAgICAgIG9wdGlvbnMgPSBxdWVyeU9wdGlvbnMgfHwgcXVlcnkub3B0aW9ucztcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHF1ZXJ5T3JFeHByZXNzaW9uIGluc3RhbmNlb2YgUXVlcnlUZXJtKSB7XG4gICAgICAgIGV4cHJlc3Npb24gPSBxdWVyeU9yRXhwcmVzc2lvbi50b1F1ZXJ5RXhwcmVzc2lvbigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXhwcmVzc2lvbiA9IHF1ZXJ5T3JFeHByZXNzaW9uIGFzIFF1ZXJ5RXhwcmVzc2lvbjtcbiAgICAgIH1cbiAgICAgIG9wdGlvbnMgPSBxdWVyeU9wdGlvbnM7XG4gICAgfVxuXG4gICAgbGV0IGlkOiBzdHJpbmcgPSBxdWVyeUlkIHx8IE9yYml0LnV1aWQoKTtcblxuICAgIHJldHVybiB7IGV4cHJlc3Npb24sIG9wdGlvbnMsIGlkIH07XG4gIH1cbn1cbiJdfQ==