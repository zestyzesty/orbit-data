import { assert } from '@orbit/utils';
import { settleInSeries, fulfillInSeries } from '@orbit/core';
import { buildQuery } from '../query';
import { Source } from '../source';
export const QUERYABLE = '__queryable__';
/**
 * Has a source been decorated as `@queryable`?
 *
 * @export
 * @param {object} obj
 * @returns
 */
export function isQueryable(source) {
    return !!source[QUERYABLE];
}
/**
 * Marks a source as "queryable" and adds an implementation of the `Queryable`
 * interface.
 *
 * The `query` method is part of the "request flow" in Orbit. Requests trigger
 * events before and after processing of each request. Observers can delay the
 * resolution of a request by returning a promise in an event listener.
 *
 * The `Queryable` interface introduces the following events:
 *
 * - `beforeQuery` - emitted prior to the processing of `query`, this event
 * includes the requested `Query` as an argument.
 *
 * - `query` - emitted after a `query` has successfully returned, this event's
 * arguments include both the requested `Query` and the results.
 *
 * - `queryFail` - emitted when an error has occurred processing a query, this
 * event's arguments include both the requested `Query` and the error.
 *
 * A queryable source must implement a private method `_query`, which performs
 * the processing required for `query` and returns a promise that resolves to a
 * set of results.
 *
 * @export
 * @decorator
 * @param {SourceClass} Klass
 * @returns {void}
 */
export default function queryable(Klass) {
    let proto = Klass.prototype;
    if (isQueryable(proto)) {
        return;
    }
    assert('Queryable interface can only be applied to a Source', proto instanceof Source);
    proto[QUERYABLE] = true;
    proto.query = function (queryOrExpression, options, id) {
        const query = buildQuery(queryOrExpression, options, id, this.queryBuilder);
        return this._enqueueRequest('query', query);
    };
    proto.__query__ = function (query) {
        return fulfillInSeries(this, 'beforeQuery', query)
            .then(() => this._query(query))
            .then((result) => {
            return settleInSeries(this, 'query', query, result)
                .then(() => result);
        })
            .catch((error) => {
            return settleInSeries(this, 'queryFail', query, error)
                .then(() => { throw error; });
        });
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnlhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NvdXJjZS1pbnRlcmZhY2VzL3F1ZXJ5YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzlELE9BQU8sRUFBNEIsVUFBVSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxNQUFNLEVBQWUsTUFBTSxXQUFXLENBQUM7QUFFaEQsTUFBTSxDQUFDLE1BQU0sU0FBUyxHQUFHLGVBQWUsQ0FBQztBQUV6Qzs7Ozs7O0dBTUc7QUFDSCxNQUFNLHNCQUFzQixNQUFjO0lBQ3hDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzdCLENBQUM7QUEwQkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCRztBQUNILE1BQU0sQ0FBQyxPQUFPLG9CQUFvQixLQUFrQjtJQUNsRCxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO0lBRTVCLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsTUFBTSxDQUFDO0lBQ1QsQ0FBQztJQUVELE1BQU0sQ0FBQyxxREFBcUQsRUFBRSxLQUFLLFlBQVksTUFBTSxDQUFDLENBQUM7SUFFdkYsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUV4QixLQUFLLENBQUMsS0FBSyxHQUFHLFVBQVMsaUJBQW9DLEVBQUUsT0FBZ0IsRUFBRSxFQUFXO1FBQ3hGLE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM1RSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDOUMsQ0FBQyxDQUFBO0lBRUQsS0FBSyxDQUFDLFNBQVMsR0FBRyxVQUFTLEtBQVk7UUFDckMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFLEtBQUssQ0FBQzthQUMvQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM5QixJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNmLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDO2lCQUNoRCxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDZixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztpQkFDbkQsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUE7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnQG9yYml0L3V0aWxzJztcbmltcG9ydCB7IHNldHRsZUluU2VyaWVzLCBmdWxmaWxsSW5TZXJpZXMgfSBmcm9tICdAb3JiaXQvY29yZSc7XG5pbXBvcnQgeyBRdWVyeSwgUXVlcnlPckV4cHJlc3Npb24sIGJ1aWxkUXVlcnkgfSBmcm9tICcuLi9xdWVyeSc7XG5pbXBvcnQgeyBTb3VyY2UsIFNvdXJjZUNsYXNzIH0gZnJvbSAnLi4vc291cmNlJztcblxuZXhwb3J0IGNvbnN0IFFVRVJZQUJMRSA9ICdfX3F1ZXJ5YWJsZV9fJztcblxuLyoqXG4gKiBIYXMgYSBzb3VyY2UgYmVlbiBkZWNvcmF0ZWQgYXMgYEBxdWVyeWFibGVgP1xuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmpcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1F1ZXJ5YWJsZShzb3VyY2U6IFNvdXJjZSkge1xuICByZXR1cm4gISFzb3VyY2VbUVVFUllBQkxFXTtcbn1cblxuLyoqXG4gKiBBIHNvdXJjZSBkZWNvcmF0ZWQgYXMgYEBxdWVyeWFibGVgIG11c3QgYWxzbyBpbXBsZW1lbnQgdGhlIGBRdWVyeWFibGVgXG4gKiBpbnRlcmZhY2UuXG4gKlxuICogQGV4cG9ydFxuICogQGludGVyZmFjZSBRdWVyeWFibGVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBRdWVyeWFibGUge1xuICAvKipcbiAgICogVGhlIGBxdWVyeWAgbWV0aG9kIGFjY2VwdHMgYSBgUXVlcnlgIGluc3RhbmNlLiBJdCBldmFsdWF0ZXMgdGhlIHF1ZXJ5IGFuZFxuICAgKiByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgc3RhdGljIHNldCBvZiByZXN1bHRzLlxuICAgKlxuICAgKiBAcGFyYW0ge1F1ZXJ5T3JFeHByZXNzaW9ufSBxdWVyeU9yRXhwcmVzc2lvblxuICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbaWRdXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAqXG4gICAqIEBtZW1iZXJPZiBRdWVyeWFibGVcbiAgICovXG4gIHF1ZXJ5KHF1ZXJ5T3JFeHByZXNzaW9uOiBRdWVyeU9yRXhwcmVzc2lvbiwgb3B0aW9ucz86IG9iamVjdCwgaWQ/OiBzdHJpbmcpOiBQcm9taXNlPGFueT47XG5cbiAgX3F1ZXJ5KHF1ZXJ5OiBRdWVyeSk6IFByb21pc2U8YW55Pjtcbn1cblxuLyoqXG4gKiBNYXJrcyBhIHNvdXJjZSBhcyBcInF1ZXJ5YWJsZVwiIGFuZCBhZGRzIGFuIGltcGxlbWVudGF0aW9uIG9mIHRoZSBgUXVlcnlhYmxlYFxuICogaW50ZXJmYWNlLlxuICpcbiAqIFRoZSBgcXVlcnlgIG1ldGhvZCBpcyBwYXJ0IG9mIHRoZSBcInJlcXVlc3QgZmxvd1wiIGluIE9yYml0LiBSZXF1ZXN0cyB0cmlnZ2VyXG4gKiBldmVudHMgYmVmb3JlIGFuZCBhZnRlciBwcm9jZXNzaW5nIG9mIGVhY2ggcmVxdWVzdC4gT2JzZXJ2ZXJzIGNhbiBkZWxheSB0aGVcbiAqIHJlc29sdXRpb24gb2YgYSByZXF1ZXN0IGJ5IHJldHVybmluZyBhIHByb21pc2UgaW4gYW4gZXZlbnQgbGlzdGVuZXIuXG4gKlxuICogVGhlIGBRdWVyeWFibGVgIGludGVyZmFjZSBpbnRyb2R1Y2VzIHRoZSBmb2xsb3dpbmcgZXZlbnRzOlxuICpcbiAqIC0gYGJlZm9yZVF1ZXJ5YCAtIGVtaXR0ZWQgcHJpb3IgdG8gdGhlIHByb2Nlc3Npbmcgb2YgYHF1ZXJ5YCwgdGhpcyBldmVudFxuICogaW5jbHVkZXMgdGhlIHJlcXVlc3RlZCBgUXVlcnlgIGFzIGFuIGFyZ3VtZW50LlxuICpcbiAqIC0gYHF1ZXJ5YCAtIGVtaXR0ZWQgYWZ0ZXIgYSBgcXVlcnlgIGhhcyBzdWNjZXNzZnVsbHkgcmV0dXJuZWQsIHRoaXMgZXZlbnQnc1xuICogYXJndW1lbnRzIGluY2x1ZGUgYm90aCB0aGUgcmVxdWVzdGVkIGBRdWVyeWAgYW5kIHRoZSByZXN1bHRzLlxuICpcbiAqIC0gYHF1ZXJ5RmFpbGAgLSBlbWl0dGVkIHdoZW4gYW4gZXJyb3IgaGFzIG9jY3VycmVkIHByb2Nlc3NpbmcgYSBxdWVyeSwgdGhpc1xuICogZXZlbnQncyBhcmd1bWVudHMgaW5jbHVkZSBib3RoIHRoZSByZXF1ZXN0ZWQgYFF1ZXJ5YCBhbmQgdGhlIGVycm9yLlxuICpcbiAqIEEgcXVlcnlhYmxlIHNvdXJjZSBtdXN0IGltcGxlbWVudCBhIHByaXZhdGUgbWV0aG9kIGBfcXVlcnlgLCB3aGljaCBwZXJmb3Jtc1xuICogdGhlIHByb2Nlc3NpbmcgcmVxdWlyZWQgZm9yIGBxdWVyeWAgYW5kIHJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYVxuICogc2V0IG9mIHJlc3VsdHMuXG4gKlxuICogQGV4cG9ydFxuICogQGRlY29yYXRvclxuICogQHBhcmFtIHtTb3VyY2VDbGFzc30gS2xhc3NcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBxdWVyeWFibGUoS2xhc3M6IFNvdXJjZUNsYXNzKTogdm9pZCB7XG4gIGxldCBwcm90byA9IEtsYXNzLnByb3RvdHlwZTtcblxuICBpZiAoaXNRdWVyeWFibGUocHJvdG8pKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgYXNzZXJ0KCdRdWVyeWFibGUgaW50ZXJmYWNlIGNhbiBvbmx5IGJlIGFwcGxpZWQgdG8gYSBTb3VyY2UnLCBwcm90byBpbnN0YW5jZW9mIFNvdXJjZSk7XG5cbiAgcHJvdG9bUVVFUllBQkxFXSA9IHRydWU7XG5cbiAgcHJvdG8ucXVlcnkgPSBmdW5jdGlvbihxdWVyeU9yRXhwcmVzc2lvbjogUXVlcnlPckV4cHJlc3Npb24sIG9wdGlvbnM/OiBvYmplY3QsIGlkPzogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCBxdWVyeSA9IGJ1aWxkUXVlcnkocXVlcnlPckV4cHJlc3Npb24sIG9wdGlvbnMsIGlkLCB0aGlzLnF1ZXJ5QnVpbGRlcik7XG4gICAgcmV0dXJuIHRoaXMuX2VucXVldWVSZXF1ZXN0KCdxdWVyeScsIHF1ZXJ5KTtcbiAgfVxuXG4gIHByb3RvLl9fcXVlcnlfXyA9IGZ1bmN0aW9uKHF1ZXJ5OiBRdWVyeSk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIGZ1bGZpbGxJblNlcmllcyh0aGlzLCAnYmVmb3JlUXVlcnknLCBxdWVyeSlcbiAgICAgIC50aGVuKCgpID0+IHRoaXMuX3F1ZXJ5KHF1ZXJ5KSlcbiAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgcmV0dXJuIHNldHRsZUluU2VyaWVzKHRoaXMsICdxdWVyeScsIHF1ZXJ5LCByZXN1bHQpXG4gICAgICAgICAgLnRoZW4oKCkgPT4gcmVzdWx0KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIHJldHVybiBzZXR0bGVJblNlcmllcyh0aGlzLCAncXVlcnlGYWlsJywgcXVlcnksIGVycm9yKVxuICAgICAgICAgIC50aGVuKCgpID0+IHsgdGhyb3cgZXJyb3I7IH0pO1xuICAgICAgfSk7XG4gIH1cbn1cbiJdfQ==