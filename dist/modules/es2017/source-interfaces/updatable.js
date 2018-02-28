import Orbit from '../main';
import { assert } from '@orbit/utils';
import { settleInSeries, fulfillInSeries } from '@orbit/core';
import { Source } from '../source';
import { buildTransform } from '../transform';
export const UPDATABLE = '__updatable__';
/**
 * Has a source been decorated as `@updatable`?
 *
 * @export
 * @param {*} obj
 * @returns
 */
export function isUpdatable(source) {
    return !!source[UPDATABLE];
}
/**
 * Marks a source as "updatable" and adds an implementation of the `Updatable`
 * interface.
 *
 * The `update` method is part of the "request flow" in Orbit. Requests trigger
 * events before and after processing of each request. Observers can delay the
 * resolution of a request by returning a promise in an event listener.
 *
 * An updatable source emits the following events:
 *
 * - `beforeUpdate` - emitted prior to the processing of `update`, this event
 * includes the requested `Transform` as an argument.
 *
 * - `update` - emitted after an `update` has successfully been applied, this
 * event includes the requested `Transform` as an argument.
 *
 * - `updateFail` - emitted when an error has occurred applying an update, this
 * event's arguments include both the requested `Transform` and the error.
 *
 * An updatable source must implement a private method `_update`, which performs
 * the processing required for `update` and returns a promise that resolves when
 * complete.
 *
 * @export
 * @decorator
 * @param {SourceClass} Klass
 * @returns {void}
 */
export default function updatable(Klass) {
    let proto = Klass.prototype;
    if (isUpdatable(proto)) {
        return;
    }
    assert('Updatable interface can only be applied to a Source', proto instanceof Source);
    proto[UPDATABLE] = true;
    proto.update = function (transformOrOperations, options, id) {
        const transform = buildTransform(transformOrOperations, options, id, this.transformBuilder);
        if (this.transformLog.contains(transform.id)) {
            return Orbit.Promise.resolve();
        }
        return this._enqueueRequest('update', transform);
    };
    proto.__update__ = function (transform) {
        if (this.transformLog.contains(transform.id)) {
            return Orbit.Promise.resolve();
        }
        return fulfillInSeries(this, 'beforeUpdate', transform)
            .then(() => {
            if (this.transformLog.contains(transform.id)) {
                return Orbit.Promise.resolve();
            }
            else {
                return this._update(transform)
                    .then(result => {
                    return this._transformed([transform])
                        .then(() => settleInSeries(this, 'update', transform, result))
                        .then(() => result);
                });
            }
        })
            .catch(error => {
            return settleInSeries(this, 'updateFail', transform, error)
                .then(() => { throw error; });
        });
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NvdXJjZS1pbnRlcmZhY2VzL3VwZGF0YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssTUFBTSxTQUFTLENBQUM7QUFDNUIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN0QyxPQUFPLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUU5RCxPQUFPLEVBQUUsTUFBTSxFQUFlLE1BQU0sV0FBVyxDQUFDO0FBQ2hELE9BQU8sRUFBb0MsY0FBYyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRWhGLE1BQU0sQ0FBQyxNQUFNLFNBQVMsR0FBRyxlQUFlLENBQUM7QUFFekM7Ozs7OztHQU1HO0FBQ0gsTUFBTSxzQkFBc0IsTUFBYztJQUN4QyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUM3QixDQUFDO0FBMkJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxvQkFBb0IsS0FBa0I7SUFDbEQsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztJQUU1QixFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLE1BQU0sQ0FBQztJQUNULENBQUM7SUFFRCxNQUFNLENBQUMscURBQXFELEVBQUUsS0FBSyxZQUFZLE1BQU0sQ0FBQyxDQUFDO0lBRXZGLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUM7SUFFeEIsS0FBSyxDQUFDLE1BQU0sR0FBRyxVQUFTLHFCQUE0QyxFQUFFLE9BQWdCLEVBQUUsRUFBVztRQUNqRyxNQUFNLFNBQVMsR0FBRyxjQUFjLENBQUMscUJBQXFCLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUU1RixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2pDLENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDbkQsQ0FBQyxDQUFBO0lBRUQsS0FBSyxDQUFDLFVBQVUsR0FBRyxVQUFTLFNBQW9CO1FBQzlDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0MsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDakMsQ0FBQztRQUVELE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRSxTQUFTLENBQUM7YUFDcEQsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNULEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2pDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7cUJBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtvQkFDYixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3lCQUNsQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO3lCQUM3RCxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3hCLENBQUMsQ0FBQyxDQUFBO1lBQ04sQ0FBQztRQUNILENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNiLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDO2lCQUN4RCxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQTtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgT3JiaXQgZnJvbSAnLi4vbWFpbic7XG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdAb3JiaXQvdXRpbHMnO1xuaW1wb3J0IHsgc2V0dGxlSW5TZXJpZXMsIGZ1bGZpbGxJblNlcmllcyB9IGZyb20gJ0BvcmJpdC9jb3JlJztcbmltcG9ydCB7IE9wZXJhdGlvbiB9IGZyb20gJy4uL29wZXJhdGlvbic7XG5pbXBvcnQgeyBTb3VyY2UsIFNvdXJjZUNsYXNzIH0gZnJvbSAnLi4vc291cmNlJztcbmltcG9ydCB7IFRyYW5zZm9ybSwgVHJhbnNmb3JtT3JPcGVyYXRpb25zLCBidWlsZFRyYW5zZm9ybSB9IGZyb20gJy4uL3RyYW5zZm9ybSc7XG5cbmV4cG9ydCBjb25zdCBVUERBVEFCTEUgPSAnX191cGRhdGFibGVfXyc7XG5cbi8qKlxuICogSGFzIGEgc291cmNlIGJlZW4gZGVjb3JhdGVkIGFzIGBAdXBkYXRhYmxlYD9cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0geyp9IG9ialxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzVXBkYXRhYmxlKHNvdXJjZTogU291cmNlKSB7XG4gIHJldHVybiAhIXNvdXJjZVtVUERBVEFCTEVdO1xufVxuXG4vKipcbiAqIEEgc291cmNlIGRlY29yYXRlZCBhcyBgQHVwZGF0YWJsZWAgbXVzdCBhbHNvIGltcGxlbWVudCB0aGUgYFVwZGF0YWJsZWBcbiAqIGludGVyZmFjZS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAaW50ZXJmYWNlIFVwZGF0YWJsZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFVwZGF0YWJsZSB7XG4gIC8qKlxuICAgKiBUaGUgYHVwZGF0ZWAgbWV0aG9kIGFjY2VwdHMgYSBgVHJhbnNmb3JtYCBpbnN0YW5jZSBvciBhbiBhcnJheSBvZlxuICAgKiBvcGVyYXRpb25zIHdoaWNoIGl0IHRoZW4gY29udmVydHMgdG8gYSBgVHJhbnNmb3JtYCBpbnN0YW5jZS4gVGhlIHNvdXJjZVxuICAgKiBhcHBsaWVzIHRoZSB1cGRhdGUgYW5kIHJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiBjb21wbGV0ZS5cbiAgICpcbiAgICogQHBhcmFtIHtUcmFuc2Zvcm1Pck9wZXJhdGlvbnN9IHRyYW5zZm9ybU9yT3BlcmF0aW9uc1xuICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbaWRdXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgKlxuICAgKiBAbWVtYmVyT2YgVXBkYXRhYmxlXG4gICAqL1xuICB1cGRhdGUodHJhbnNmb3JtT3JPcGVyYXRpb25zOiBUcmFuc2Zvcm1Pck9wZXJhdGlvbnMsIG9wdGlvbnM/OiBvYmplY3QsIGlkPzogc3RyaW5nKTogUHJvbWlzZTxhbnk+O1xuXG4gIF91cGRhdGUodHJhbnNmb3JtOiBUcmFuc2Zvcm0pOiBQcm9taXNlPGFueT47XG59XG5cbi8qKlxuICogTWFya3MgYSBzb3VyY2UgYXMgXCJ1cGRhdGFibGVcIiBhbmQgYWRkcyBhbiBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgYFVwZGF0YWJsZWBcbiAqIGludGVyZmFjZS5cbiAqXG4gKiBUaGUgYHVwZGF0ZWAgbWV0aG9kIGlzIHBhcnQgb2YgdGhlIFwicmVxdWVzdCBmbG93XCIgaW4gT3JiaXQuIFJlcXVlc3RzIHRyaWdnZXJcbiAqIGV2ZW50cyBiZWZvcmUgYW5kIGFmdGVyIHByb2Nlc3Npbmcgb2YgZWFjaCByZXF1ZXN0LiBPYnNlcnZlcnMgY2FuIGRlbGF5IHRoZVxuICogcmVzb2x1dGlvbiBvZiBhIHJlcXVlc3QgYnkgcmV0dXJuaW5nIGEgcHJvbWlzZSBpbiBhbiBldmVudCBsaXN0ZW5lci5cbiAqXG4gKiBBbiB1cGRhdGFibGUgc291cmNlIGVtaXRzIHRoZSBmb2xsb3dpbmcgZXZlbnRzOlxuICpcbiAqIC0gYGJlZm9yZVVwZGF0ZWAgLSBlbWl0dGVkIHByaW9yIHRvIHRoZSBwcm9jZXNzaW5nIG9mIGB1cGRhdGVgLCB0aGlzIGV2ZW50XG4gKiBpbmNsdWRlcyB0aGUgcmVxdWVzdGVkIGBUcmFuc2Zvcm1gIGFzIGFuIGFyZ3VtZW50LlxuICpcbiAqIC0gYHVwZGF0ZWAgLSBlbWl0dGVkIGFmdGVyIGFuIGB1cGRhdGVgIGhhcyBzdWNjZXNzZnVsbHkgYmVlbiBhcHBsaWVkLCB0aGlzXG4gKiBldmVudCBpbmNsdWRlcyB0aGUgcmVxdWVzdGVkIGBUcmFuc2Zvcm1gIGFzIGFuIGFyZ3VtZW50LlxuICpcbiAqIC0gYHVwZGF0ZUZhaWxgIC0gZW1pdHRlZCB3aGVuIGFuIGVycm9yIGhhcyBvY2N1cnJlZCBhcHBseWluZyBhbiB1cGRhdGUsIHRoaXNcbiAqIGV2ZW50J3MgYXJndW1lbnRzIGluY2x1ZGUgYm90aCB0aGUgcmVxdWVzdGVkIGBUcmFuc2Zvcm1gIGFuZCB0aGUgZXJyb3IuXG4gKlxuICogQW4gdXBkYXRhYmxlIHNvdXJjZSBtdXN0IGltcGxlbWVudCBhIHByaXZhdGUgbWV0aG9kIGBfdXBkYXRlYCwgd2hpY2ggcGVyZm9ybXNcbiAqIHRoZSBwcm9jZXNzaW5nIHJlcXVpcmVkIGZvciBgdXBkYXRlYCBhbmQgcmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuXG4gKiBjb21wbGV0ZS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAZGVjb3JhdG9yXG4gKiBAcGFyYW0ge1NvdXJjZUNsYXNzfSBLbGFzc1xuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVwZGF0YWJsZShLbGFzczogU291cmNlQ2xhc3MpOiB2b2lkIHtcbiAgbGV0IHByb3RvID0gS2xhc3MucHJvdG90eXBlO1xuXG4gIGlmIChpc1VwZGF0YWJsZShwcm90bykpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBhc3NlcnQoJ1VwZGF0YWJsZSBpbnRlcmZhY2UgY2FuIG9ubHkgYmUgYXBwbGllZCB0byBhIFNvdXJjZScsIHByb3RvIGluc3RhbmNlb2YgU291cmNlKTtcblxuICBwcm90b1tVUERBVEFCTEVdID0gdHJ1ZTtcblxuICBwcm90by51cGRhdGUgPSBmdW5jdGlvbih0cmFuc2Zvcm1Pck9wZXJhdGlvbnM6IFRyYW5zZm9ybU9yT3BlcmF0aW9ucywgb3B0aW9ucz86IG9iamVjdCwgaWQ/OiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHRyYW5zZm9ybSA9IGJ1aWxkVHJhbnNmb3JtKHRyYW5zZm9ybU9yT3BlcmF0aW9ucywgb3B0aW9ucywgaWQsIHRoaXMudHJhbnNmb3JtQnVpbGRlcik7XG5cbiAgICBpZiAodGhpcy50cmFuc2Zvcm1Mb2cuY29udGFpbnModHJhbnNmb3JtLmlkKSkge1xuICAgICAgcmV0dXJuIE9yYml0LlByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9lbnF1ZXVlUmVxdWVzdCgndXBkYXRlJywgdHJhbnNmb3JtKTtcbiAgfVxuXG4gIHByb3RvLl9fdXBkYXRlX18gPSBmdW5jdGlvbih0cmFuc2Zvcm06IFRyYW5zZm9ybSk6IFByb21pc2U8YW55PiB7XG4gICAgaWYgKHRoaXMudHJhbnNmb3JtTG9nLmNvbnRhaW5zKHRyYW5zZm9ybS5pZCkpIHtcbiAgICAgIHJldHVybiBPcmJpdC5Qcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVsZmlsbEluU2VyaWVzKHRoaXMsICdiZWZvcmVVcGRhdGUnLCB0cmFuc2Zvcm0pXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnRyYW5zZm9ybUxvZy5jb250YWlucyh0cmFuc2Zvcm0uaWQpKSB7XG4gICAgICAgICAgcmV0dXJuIE9yYml0LlByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLl91cGRhdGUodHJhbnNmb3JtKVxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RyYW5zZm9ybWVkKFt0cmFuc2Zvcm1dKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHNldHRsZUluU2VyaWVzKHRoaXMsICd1cGRhdGUnLCB0cmFuc2Zvcm0sIHJlc3VsdCkpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gcmVzdWx0KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICByZXR1cm4gc2V0dGxlSW5TZXJpZXModGhpcywgJ3VwZGF0ZUZhaWwnLCB0cmFuc2Zvcm0sIGVycm9yKVxuICAgICAgICAgIC50aGVuKCgpID0+IHsgdGhyb3cgZXJyb3I7IH0pO1xuICAgICAgfSk7XG4gIH1cbn1cbiJdfQ==