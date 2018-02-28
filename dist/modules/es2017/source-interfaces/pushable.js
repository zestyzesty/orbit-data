import Orbit from '../main';
import { assert } from '@orbit/utils';
import { settleInSeries, fulfillInSeries } from '@orbit/core';
import { Source } from '../source';
import { buildTransform } from '../transform';
export const PUSHABLE = '__pushable__';
/**
 * Has a source been decorated as `@pushable`?
 *
 * @export
 * @param {Source} source
 * @returns
 */
export function isPushable(source) {
    return !!source[PUSHABLE];
}
/**
 * Marks a source as "pushable" and adds an implementation of the `Pushable`
 * interface.
 *
 * The `push` method is part of the "request flow" in Orbit. Requests trigger
 * events before and after processing of each request. Observers can delay the
 * resolution of a request by returning a promise in an event listener.
 *
 * A pushable source emits the following events:
 *
 * - `beforePush` - emitted prior to the processing of `push`, this event
 * includes the requested `Transform` as an argument.
 *
 * - `push` - emitted after a `push` has successfully been applied, this event's
 * arguments include both the requested `Transform` and an array of the actual
 * applied `Transform` instances.
 *
 * - `pushFail` - emitted when an error has occurred pushing a transform, this
 * event's arguments include both the requested `Transform` and the error.
 *
 * A pushable source must implement a private method `_push`, which performs
 * the processing required for `push` and returns a promise that resolves to an
 * array of `Transform` instances.
 *
 * @export
 * @decorator
 * @param {SourceClass} Klass
 * @returns {void}
 */
export default function pushable(Klass) {
    let proto = Klass.prototype;
    if (isPushable(proto)) {
        return;
    }
    assert('Pushable interface can only be applied to a Source', proto instanceof Source);
    proto[PUSHABLE] = true;
    proto.push = function (transformOrOperations, options, id) {
        const transform = buildTransform(transformOrOperations, options, id, this.transformBuilder);
        if (this.transformLog.contains(transform.id)) {
            return Orbit.Promise.resolve([]);
        }
        return this._enqueueRequest('push', transform);
    };
    proto.__push__ = function (transform) {
        if (this.transformLog.contains(transform.id)) {
            return Orbit.Promise.resolve([]);
        }
        return fulfillInSeries(this, 'beforePush', transform)
            .then(() => {
            if (this.transformLog.contains(transform.id)) {
                return Orbit.Promise.resolve([]);
            }
            else {
                return this._push(transform)
                    .then(result => {
                    return this._transformed(result)
                        .then(() => settleInSeries(this, 'push', transform, result))
                        .then(() => result);
                });
            }
        })
            .catch(error => {
            return settleInSeries(this, 'pushFail', transform, error)
                .then(() => { throw error; });
        });
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVzaGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc291cmNlLWludGVyZmFjZXMvcHVzaGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLE1BQU0sU0FBUyxDQUFDO0FBQzVCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdEMsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDOUQsT0FBTyxFQUFFLE1BQU0sRUFBZSxNQUFNLFdBQVcsQ0FBQztBQUNoRCxPQUFPLEVBQW9DLGNBQWMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUVoRixNQUFNLENBQUMsTUFBTSxRQUFRLEdBQUcsY0FBYyxDQUFDO0FBRXZDOzs7Ozs7R0FNRztBQUNILE1BQU0scUJBQXFCLE1BQWM7SUFDdkMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDNUIsQ0FBQztBQTRCRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILE1BQU0sQ0FBQyxPQUFPLG1CQUFtQixLQUFrQjtJQUNqRCxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO0lBRTVCLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEIsTUFBTSxDQUFDO0lBQ1QsQ0FBQztJQUVELE1BQU0sQ0FBQyxvREFBb0QsRUFBRSxLQUFLLFlBQVksTUFBTSxDQUFDLENBQUM7SUFFdEYsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUV2QixLQUFLLENBQUMsSUFBSSxHQUFHLFVBQVMscUJBQTRDLEVBQUUsT0FBZ0IsRUFBRSxFQUFXO1FBQy9GLE1BQU0sU0FBUyxHQUFHLGNBQWMsQ0FBQyxxQkFBcUIsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRTVGLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0MsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDakQsQ0FBQyxDQUFBO0lBRUQsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFTLFNBQW9CO1FBQzVDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0MsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFFRCxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsU0FBUyxDQUFDO2FBQ2xELElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDVCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbkMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztxQkFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO29CQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQzt5QkFDN0IsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQzt5QkFDM0QsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN4QixDQUFDLENBQUMsQ0FBQTtZQUNOLENBQUM7UUFDSCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDYixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQztpQkFDdEQsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUE7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE9yYml0IGZyb20gJy4uL21haW4nO1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnQG9yYml0L3V0aWxzJztcbmltcG9ydCB7IHNldHRsZUluU2VyaWVzLCBmdWxmaWxsSW5TZXJpZXMgfSBmcm9tICdAb3JiaXQvY29yZSc7XG5pbXBvcnQgeyBTb3VyY2UsIFNvdXJjZUNsYXNzIH0gZnJvbSAnLi4vc291cmNlJztcbmltcG9ydCB7IFRyYW5zZm9ybSwgVHJhbnNmb3JtT3JPcGVyYXRpb25zLCBidWlsZFRyYW5zZm9ybSB9IGZyb20gJy4uL3RyYW5zZm9ybSc7XG5cbmV4cG9ydCBjb25zdCBQVVNIQUJMRSA9ICdfX3B1c2hhYmxlX18nO1xuXG4vKipcbiAqIEhhcyBhIHNvdXJjZSBiZWVuIGRlY29yYXRlZCBhcyBgQHB1c2hhYmxlYD9cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge1NvdXJjZX0gc291cmNlXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgZnVuY3Rpb24gaXNQdXNoYWJsZShzb3VyY2U6IFNvdXJjZSkge1xuICByZXR1cm4gISFzb3VyY2VbUFVTSEFCTEVdO1xufVxuXG4vKipcbiAqIEEgc291cmNlIGRlY29yYXRlZCBhcyBgQHB1c2hhYmxlYCBtdXN0IGFsc28gaW1wbGVtZW50IHRoZSBgUHVzaGFibGVgXG4gKiBpbnRlcmZhY2UuXG4gKlxuICogQGV4cG9ydFxuICogQGludGVyZmFjZSBQdXNoYWJsZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFB1c2hhYmxlIHtcbiAgLyoqXG4gICAqIFRoZSBgcHVzaGAgbWV0aG9kIGFjY2VwdHMgYSBgVHJhbnNmb3JtYCBpbnN0YW5jZSBhcyBhbiBhcmd1bWVudCBhbmQgcmV0dXJuc1xuICAgKiBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhbiBhcnJheSBvZiBgVHJhbnNmb3JtYCBpbnN0YW5jZXMgdGhhdCBhcmVcbiAgICogYXBwbGllZCBhcyBhIHJlc3VsdC4gSW4gb3RoZXIgd29yZHMsIGBwdXNoYCBjYXB0dXJlcyB0aGUgZGlyZWN0IHJlc3VsdHNcbiAgICogX2FuZF8gc2lkZSBlZmZlY3RzIG9mIGFwcGx5aW5nIGEgYFRyYW5zZm9ybWAgdG8gYSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7VHJhbnNmb3JtT3JPcGVyYXRpb25zfSB0cmFuc2Zvcm1Pck9wZXJhdGlvbnNcbiAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2lkXVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxUcmFuc2Zvcm1bXT59XG4gICAqXG4gICAqIEBtZW1iZXJPZiBQdXNoYWJsZVxuICAgKi9cbiAgcHVzaCh0cmFuc2Zvcm1Pck9wZXJhdGlvbnM6IFRyYW5zZm9ybU9yT3BlcmF0aW9ucywgb3B0aW9ucz86IG9iamVjdCwgaWQ/OiBzdHJpbmcpOiBQcm9taXNlPFRyYW5zZm9ybVtdPjtcblxuICBfcHVzaCh0cmFuc2Zvcm06IFRyYW5zZm9ybSk6IFByb21pc2U8VHJhbnNmb3JtW10+O1xufVxuXG4vKipcbiAqIE1hcmtzIGEgc291cmNlIGFzIFwicHVzaGFibGVcIiBhbmQgYWRkcyBhbiBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgYFB1c2hhYmxlYFxuICogaW50ZXJmYWNlLlxuICpcbiAqIFRoZSBgcHVzaGAgbWV0aG9kIGlzIHBhcnQgb2YgdGhlIFwicmVxdWVzdCBmbG93XCIgaW4gT3JiaXQuIFJlcXVlc3RzIHRyaWdnZXJcbiAqIGV2ZW50cyBiZWZvcmUgYW5kIGFmdGVyIHByb2Nlc3Npbmcgb2YgZWFjaCByZXF1ZXN0LiBPYnNlcnZlcnMgY2FuIGRlbGF5IHRoZVxuICogcmVzb2x1dGlvbiBvZiBhIHJlcXVlc3QgYnkgcmV0dXJuaW5nIGEgcHJvbWlzZSBpbiBhbiBldmVudCBsaXN0ZW5lci5cbiAqXG4gKiBBIHB1c2hhYmxlIHNvdXJjZSBlbWl0cyB0aGUgZm9sbG93aW5nIGV2ZW50czpcbiAqXG4gKiAtIGBiZWZvcmVQdXNoYCAtIGVtaXR0ZWQgcHJpb3IgdG8gdGhlIHByb2Nlc3Npbmcgb2YgYHB1c2hgLCB0aGlzIGV2ZW50XG4gKiBpbmNsdWRlcyB0aGUgcmVxdWVzdGVkIGBUcmFuc2Zvcm1gIGFzIGFuIGFyZ3VtZW50LlxuICpcbiAqIC0gYHB1c2hgIC0gZW1pdHRlZCBhZnRlciBhIGBwdXNoYCBoYXMgc3VjY2Vzc2Z1bGx5IGJlZW4gYXBwbGllZCwgdGhpcyBldmVudCdzXG4gKiBhcmd1bWVudHMgaW5jbHVkZSBib3RoIHRoZSByZXF1ZXN0ZWQgYFRyYW5zZm9ybWAgYW5kIGFuIGFycmF5IG9mIHRoZSBhY3R1YWxcbiAqIGFwcGxpZWQgYFRyYW5zZm9ybWAgaW5zdGFuY2VzLlxuICpcbiAqIC0gYHB1c2hGYWlsYCAtIGVtaXR0ZWQgd2hlbiBhbiBlcnJvciBoYXMgb2NjdXJyZWQgcHVzaGluZyBhIHRyYW5zZm9ybSwgdGhpc1xuICogZXZlbnQncyBhcmd1bWVudHMgaW5jbHVkZSBib3RoIHRoZSByZXF1ZXN0ZWQgYFRyYW5zZm9ybWAgYW5kIHRoZSBlcnJvci5cbiAqXG4gKiBBIHB1c2hhYmxlIHNvdXJjZSBtdXN0IGltcGxlbWVudCBhIHByaXZhdGUgbWV0aG9kIGBfcHVzaGAsIHdoaWNoIHBlcmZvcm1zXG4gKiB0aGUgcHJvY2Vzc2luZyByZXF1aXJlZCBmb3IgYHB1c2hgIGFuZCByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGFuXG4gKiBhcnJheSBvZiBgVHJhbnNmb3JtYCBpbnN0YW5jZXMuXG4gKlxuICogQGV4cG9ydFxuICogQGRlY29yYXRvclxuICogQHBhcmFtIHtTb3VyY2VDbGFzc30gS2xhc3NcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwdXNoYWJsZShLbGFzczogU291cmNlQ2xhc3MpOiB2b2lkIHtcbiAgbGV0IHByb3RvID0gS2xhc3MucHJvdG90eXBlO1xuXG4gIGlmIChpc1B1c2hhYmxlKHByb3RvKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGFzc2VydCgnUHVzaGFibGUgaW50ZXJmYWNlIGNhbiBvbmx5IGJlIGFwcGxpZWQgdG8gYSBTb3VyY2UnLCBwcm90byBpbnN0YW5jZW9mIFNvdXJjZSk7XG5cbiAgcHJvdG9bUFVTSEFCTEVdID0gdHJ1ZTtcblxuICBwcm90by5wdXNoID0gZnVuY3Rpb24odHJhbnNmb3JtT3JPcGVyYXRpb25zOiBUcmFuc2Zvcm1Pck9wZXJhdGlvbnMsIG9wdGlvbnM/OiBvYmplY3QsIGlkPzogc3RyaW5nKTogUHJvbWlzZTxUcmFuc2Zvcm1bXT4ge1xuICAgIGNvbnN0IHRyYW5zZm9ybSA9IGJ1aWxkVHJhbnNmb3JtKHRyYW5zZm9ybU9yT3BlcmF0aW9ucywgb3B0aW9ucywgaWQsIHRoaXMudHJhbnNmb3JtQnVpbGRlcik7XG5cbiAgICBpZiAodGhpcy50cmFuc2Zvcm1Mb2cuY29udGFpbnModHJhbnNmb3JtLmlkKSkge1xuICAgICAgcmV0dXJuIE9yYml0LlByb21pc2UucmVzb2x2ZShbXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2VucXVldWVSZXF1ZXN0KCdwdXNoJywgdHJhbnNmb3JtKTtcbiAgfVxuXG4gIHByb3RvLl9fcHVzaF9fID0gZnVuY3Rpb24odHJhbnNmb3JtOiBUcmFuc2Zvcm0pOiBQcm9taXNlPFRyYW5zZm9ybVtdPiB7XG4gICAgaWYgKHRoaXMudHJhbnNmb3JtTG9nLmNvbnRhaW5zKHRyYW5zZm9ybS5pZCkpIHtcbiAgICAgIHJldHVybiBPcmJpdC5Qcm9taXNlLnJlc29sdmUoW10pO1xuICAgIH1cblxuICAgIHJldHVybiBmdWxmaWxsSW5TZXJpZXModGhpcywgJ2JlZm9yZVB1c2gnLCB0cmFuc2Zvcm0pXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnRyYW5zZm9ybUxvZy5jb250YWlucyh0cmFuc2Zvcm0uaWQpKSB7XG4gICAgICAgICAgcmV0dXJuIE9yYml0LlByb21pc2UucmVzb2x2ZShbXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX3B1c2godHJhbnNmb3JtKVxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RyYW5zZm9ybWVkKHJlc3VsdClcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBzZXR0bGVJblNlcmllcyh0aGlzLCAncHVzaCcsIHRyYW5zZm9ybSwgcmVzdWx0KSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiByZXN1bHQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIHJldHVybiBzZXR0bGVJblNlcmllcyh0aGlzLCAncHVzaEZhaWwnLCB0cmFuc2Zvcm0sIGVycm9yKVxuICAgICAgICAgIC50aGVuKCgpID0+IHsgdGhyb3cgZXJyb3I7IH0pO1xuICAgICAgfSk7XG4gIH1cbn1cbiJdfQ==