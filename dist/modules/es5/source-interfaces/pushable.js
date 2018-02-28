import Orbit from '../main';
import { assert } from '@orbit/utils';
import { settleInSeries, fulfillInSeries } from '@orbit/core';
import { Source } from '../source';
import { buildTransform } from '../transform';
export var PUSHABLE = '__pushable__';
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
    var proto = Klass.prototype;
    if (isPushable(proto)) {
        return;
    }
    assert('Pushable interface can only be applied to a Source', proto instanceof Source);
    proto[PUSHABLE] = true;
    proto.push = function (transformOrOperations, options, id) {
        var transform = buildTransform(transformOrOperations, options, id, this.transformBuilder);
        if (this.transformLog.contains(transform.id)) {
            return Orbit.Promise.resolve([]);
        }
        return this._enqueueRequest('push', transform);
    };
    proto.__push__ = function (transform) {
        var _this = this;

        if (this.transformLog.contains(transform.id)) {
            return Orbit.Promise.resolve([]);
        }
        return fulfillInSeries(this, 'beforePush', transform).then(function () {
            if (_this.transformLog.contains(transform.id)) {
                return Orbit.Promise.resolve([]);
            } else {
                return _this._push(transform).then(function (result) {
                    return _this._transformed(result).then(function () {
                        return settleInSeries(_this, 'push', transform, result);
                    }).then(function () {
                        return result;
                    });
                });
            }
        }).catch(function (error) {
            return settleInSeries(_this, 'pushFail', transform, error).then(function () {
                throw error;
            });
        });
    };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVzaGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc291cmNlLWludGVyZmFjZXMvcHVzaGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxBQUFLLFdBQU0sQUFBUyxBQUFDO0FBQzVCLEFBQU8sU0FBRSxBQUFNLEFBQUUsY0FBTSxBQUFjLEFBQUM7QUFDdEMsQUFBTyxTQUFFLEFBQWMsZ0JBQUUsQUFBZSxBQUFFLHVCQUFNLEFBQWEsQUFBQztBQUM5RCxBQUFPLFNBQUUsQUFBTSxBQUFlLGNBQU0sQUFBVyxBQUFDO0FBQ2hELEFBQU8sU0FBb0MsQUFBYyxBQUFFLHNCQUFNLEFBQWMsQUFBQztBQUVoRixBQUFNLE9BQUMsSUFBTSxBQUFRLFdBQUcsQUFBYyxBQUFDO0FBRXZDLEFBTUc7Ozs7Ozs7QUFDSCxBQUFNLDJCQUFxQixBQUFjO0FBQ3ZDLEFBQU0sV0FBQyxDQUFDLENBQUMsQUFBTSxPQUFDLEFBQVEsQUFBQyxBQUFDLEFBQzVCO0FBQUM7QUE0QkQsQUE0Qkc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0gsQUFBTSxBQUFDLEFBQU8saUNBQW1CLEFBQWtCO0FBQ2pELFFBQUksQUFBSyxRQUFHLEFBQUssTUFBQyxBQUFTLEFBQUM7QUFFNUIsQUFBRSxBQUFDLFFBQUMsQUFBVSxXQUFDLEFBQUssQUFBQyxBQUFDLFFBQUMsQUFBQztBQUN0QixBQUFNLEFBQUMsQUFDVDtBQUFDO0FBRUQsQUFBTSxXQUFDLEFBQW9ELHNEQUFFLEFBQUssaUJBQVksQUFBTSxBQUFDLEFBQUM7QUFFdEYsQUFBSyxVQUFDLEFBQVEsQUFBQyxZQUFHLEFBQUksQUFBQztBQUV2QixBQUFLLFVBQUMsQUFBSSxPQUFHLFVBQVMsQUFBNEMsdUJBQUUsQUFBZ0IsU0FBRSxBQUFXO0FBQy9GLFlBQU0sQUFBUyxZQUFHLEFBQWMsZUFBQyxBQUFxQix1QkFBRSxBQUFPLFNBQUUsQUFBRSxJQUFFLEFBQUksS0FBQyxBQUFnQixBQUFDLEFBQUM7QUFFNUYsQUFBRSxBQUFDLFlBQUMsQUFBSSxLQUFDLEFBQVksYUFBQyxBQUFRLFNBQUMsQUFBUyxVQUFDLEFBQUUsQUFBQyxBQUFDLEtBQUMsQUFBQztBQUM3QyxBQUFNLG1CQUFDLEFBQUssTUFBQyxBQUFPLFFBQUMsQUFBTyxRQUFDLEFBQUUsQUFBQyxBQUFDLEFBQ25DO0FBQUM7QUFFRCxBQUFNLGVBQUMsQUFBSSxLQUFDLEFBQWUsZ0JBQUMsQUFBTSxRQUFFLEFBQVMsQUFBQyxBQUFDLEFBQ2pEO0FBQUM7QUFFRCxBQUFLLFVBQUMsQUFBUSxXQUFHLFVBQVMsQUFBb0I7OztBQUM1QyxBQUFFLEFBQUMsWUFBQyxBQUFJLEtBQUMsQUFBWSxhQUFDLEFBQVEsU0FBQyxBQUFTLFVBQUMsQUFBRSxBQUFDLEFBQUMsS0FBQyxBQUFDO0FBQzdDLEFBQU0sbUJBQUMsQUFBSyxNQUFDLEFBQU8sUUFBQyxBQUFPLFFBQUMsQUFBRSxBQUFDLEFBQUMsQUFDbkM7QUFBQztBQUVELEFBQU0sK0JBQWlCLEFBQUksTUFBRSxBQUFZLGNBQUUsQUFBUyxBQUFDLFdBQ2xELEFBQUksS0FBQyxBQUFHLEFBQUU7QUFDVCxBQUFFLEFBQUMsZ0JBQUMsQUFBSSxNQUFDLEFBQVksYUFBQyxBQUFRLFNBQUMsQUFBUyxVQUFDLEFBQUUsQUFBQyxBQUFDLEtBQUMsQUFBQztBQUM3QyxBQUFNLHVCQUFDLEFBQUssTUFBQyxBQUFPLFFBQUMsQUFBTyxRQUFDLEFBQUUsQUFBQyxBQUFDLEFBQ25DO0FBQUMsQUFBQyxBQUFJLG1CQUFDLEFBQUM7QUFDTixBQUFNLDZCQUFNLEFBQUssTUFBQyxBQUFTLEFBQUMsV0FDekIsQUFBSSxLQUFDLEFBQU0sQUFBQyxBQUFFO0FBQ2IsQUFBTSxpQ0FBTSxBQUFZLGFBQUMsQUFBTSxBQUFDLFFBQzdCLEFBQUk7QUFBQyxBQUFHLEFBQUUsK0JBQUMsQUFBYyxBQUFDLEFBQUksc0JBQUUsQUFBTSxRQUFFLEFBQVMsV0FBRSxBQUFNLEFBQUMsQUFBQztxQkFEdkQsQUFBSSxFQUVSLEFBQUk7QUFBQyxBQUFHLEFBQUUsK0JBQUMsQUFBTSxBQUFDLEFBQUMsQUFDeEI7O0FBQUMsQUFBQyxBQUNOLGlCQU5TLEFBQUk7QUFNWixBQUNIO0FBQUMsQUFBQyxTQVpHLEFBQWUsRUFhbkIsQUFBSyxNQUFDLEFBQUssQUFBQyxBQUFFO0FBQ2IsQUFBTSx5Q0FBc0IsQUFBVSxZQUFFLEFBQVMsV0FBRSxBQUFLLEFBQUMsT0FDdEQsQUFBSSxLQUFDLEFBQUcsQUFBRTtBQUFHLHNCQUFNLEFBQUssQUFBQyxBQUFDO0FBQUMsQUFBQyxBQUFDLEFBQ2xDLGFBRlMsQUFBYyxBQUFDLEFBQUk7QUFFM0IsQUFBQyxBQUFDLEFBQ1A7QUFBQyxBQUNIO0FBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgT3JiaXQgZnJvbSAnLi4vbWFpbic7XG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdAb3JiaXQvdXRpbHMnO1xuaW1wb3J0IHsgc2V0dGxlSW5TZXJpZXMsIGZ1bGZpbGxJblNlcmllcyB9IGZyb20gJ0BvcmJpdC9jb3JlJztcbmltcG9ydCB7IFNvdXJjZSwgU291cmNlQ2xhc3MgfSBmcm9tICcuLi9zb3VyY2UnO1xuaW1wb3J0IHsgVHJhbnNmb3JtLCBUcmFuc2Zvcm1Pck9wZXJhdGlvbnMsIGJ1aWxkVHJhbnNmb3JtIH0gZnJvbSAnLi4vdHJhbnNmb3JtJztcblxuZXhwb3J0IGNvbnN0IFBVU0hBQkxFID0gJ19fcHVzaGFibGVfXyc7XG5cbi8qKlxuICogSGFzIGEgc291cmNlIGJlZW4gZGVjb3JhdGVkIGFzIGBAcHVzaGFibGVgP1xuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7U291cmNlfSBzb3VyY2VcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1B1c2hhYmxlKHNvdXJjZTogU291cmNlKSB7XG4gIHJldHVybiAhIXNvdXJjZVtQVVNIQUJMRV07XG59XG5cbi8qKlxuICogQSBzb3VyY2UgZGVjb3JhdGVkIGFzIGBAcHVzaGFibGVgIG11c3QgYWxzbyBpbXBsZW1lbnQgdGhlIGBQdXNoYWJsZWBcbiAqIGludGVyZmFjZS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAaW50ZXJmYWNlIFB1c2hhYmxlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUHVzaGFibGUge1xuICAvKipcbiAgICogVGhlIGBwdXNoYCBtZXRob2QgYWNjZXB0cyBhIGBUcmFuc2Zvcm1gIGluc3RhbmNlIGFzIGFuIGFyZ3VtZW50IGFuZCByZXR1cm5zXG4gICAqIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGFuIGFycmF5IG9mIGBUcmFuc2Zvcm1gIGluc3RhbmNlcyB0aGF0IGFyZVxuICAgKiBhcHBsaWVkIGFzIGEgcmVzdWx0LiBJbiBvdGhlciB3b3JkcywgYHB1c2hgIGNhcHR1cmVzIHRoZSBkaXJlY3QgcmVzdWx0c1xuICAgKiBfYW5kXyBzaWRlIGVmZmVjdHMgb2YgYXBwbHlpbmcgYSBgVHJhbnNmb3JtYCB0byBhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIHtUcmFuc2Zvcm1Pck9wZXJhdGlvbnN9IHRyYW5zZm9ybU9yT3BlcmF0aW9uc1xuICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbaWRdXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPFRyYW5zZm9ybVtdPn1cbiAgICpcbiAgICogQG1lbWJlck9mIFB1c2hhYmxlXG4gICAqL1xuICBwdXNoKHRyYW5zZm9ybU9yT3BlcmF0aW9uczogVHJhbnNmb3JtT3JPcGVyYXRpb25zLCBvcHRpb25zPzogb2JqZWN0LCBpZD86IHN0cmluZyk6IFByb21pc2U8VHJhbnNmb3JtW10+O1xuXG4gIF9wdXNoKHRyYW5zZm9ybTogVHJhbnNmb3JtKTogUHJvbWlzZTxUcmFuc2Zvcm1bXT47XG59XG5cbi8qKlxuICogTWFya3MgYSBzb3VyY2UgYXMgXCJwdXNoYWJsZVwiIGFuZCBhZGRzIGFuIGltcGxlbWVudGF0aW9uIG9mIHRoZSBgUHVzaGFibGVgXG4gKiBpbnRlcmZhY2UuXG4gKlxuICogVGhlIGBwdXNoYCBtZXRob2QgaXMgcGFydCBvZiB0aGUgXCJyZXF1ZXN0IGZsb3dcIiBpbiBPcmJpdC4gUmVxdWVzdHMgdHJpZ2dlclxuICogZXZlbnRzIGJlZm9yZSBhbmQgYWZ0ZXIgcHJvY2Vzc2luZyBvZiBlYWNoIHJlcXVlc3QuIE9ic2VydmVycyBjYW4gZGVsYXkgdGhlXG4gKiByZXNvbHV0aW9uIG9mIGEgcmVxdWVzdCBieSByZXR1cm5pbmcgYSBwcm9taXNlIGluIGFuIGV2ZW50IGxpc3RlbmVyLlxuICpcbiAqIEEgcHVzaGFibGUgc291cmNlIGVtaXRzIHRoZSBmb2xsb3dpbmcgZXZlbnRzOlxuICpcbiAqIC0gYGJlZm9yZVB1c2hgIC0gZW1pdHRlZCBwcmlvciB0byB0aGUgcHJvY2Vzc2luZyBvZiBgcHVzaGAsIHRoaXMgZXZlbnRcbiAqIGluY2x1ZGVzIHRoZSByZXF1ZXN0ZWQgYFRyYW5zZm9ybWAgYXMgYW4gYXJndW1lbnQuXG4gKlxuICogLSBgcHVzaGAgLSBlbWl0dGVkIGFmdGVyIGEgYHB1c2hgIGhhcyBzdWNjZXNzZnVsbHkgYmVlbiBhcHBsaWVkLCB0aGlzIGV2ZW50J3NcbiAqIGFyZ3VtZW50cyBpbmNsdWRlIGJvdGggdGhlIHJlcXVlc3RlZCBgVHJhbnNmb3JtYCBhbmQgYW4gYXJyYXkgb2YgdGhlIGFjdHVhbFxuICogYXBwbGllZCBgVHJhbnNmb3JtYCBpbnN0YW5jZXMuXG4gKlxuICogLSBgcHVzaEZhaWxgIC0gZW1pdHRlZCB3aGVuIGFuIGVycm9yIGhhcyBvY2N1cnJlZCBwdXNoaW5nIGEgdHJhbnNmb3JtLCB0aGlzXG4gKiBldmVudCdzIGFyZ3VtZW50cyBpbmNsdWRlIGJvdGggdGhlIHJlcXVlc3RlZCBgVHJhbnNmb3JtYCBhbmQgdGhlIGVycm9yLlxuICpcbiAqIEEgcHVzaGFibGUgc291cmNlIG11c3QgaW1wbGVtZW50IGEgcHJpdmF0ZSBtZXRob2QgYF9wdXNoYCwgd2hpY2ggcGVyZm9ybXNcbiAqIHRoZSBwcm9jZXNzaW5nIHJlcXVpcmVkIGZvciBgcHVzaGAgYW5kIHJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYW5cbiAqIGFycmF5IG9mIGBUcmFuc2Zvcm1gIGluc3RhbmNlcy5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAZGVjb3JhdG9yXG4gKiBAcGFyYW0ge1NvdXJjZUNsYXNzfSBLbGFzc1xuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHB1c2hhYmxlKEtsYXNzOiBTb3VyY2VDbGFzcyk6IHZvaWQge1xuICBsZXQgcHJvdG8gPSBLbGFzcy5wcm90b3R5cGU7XG5cbiAgaWYgKGlzUHVzaGFibGUocHJvdG8pKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgYXNzZXJ0KCdQdXNoYWJsZSBpbnRlcmZhY2UgY2FuIG9ubHkgYmUgYXBwbGllZCB0byBhIFNvdXJjZScsIHByb3RvIGluc3RhbmNlb2YgU291cmNlKTtcblxuICBwcm90b1tQVVNIQUJMRV0gPSB0cnVlO1xuXG4gIHByb3RvLnB1c2ggPSBmdW5jdGlvbih0cmFuc2Zvcm1Pck9wZXJhdGlvbnM6IFRyYW5zZm9ybU9yT3BlcmF0aW9ucywgb3B0aW9ucz86IG9iamVjdCwgaWQ/OiBzdHJpbmcpOiBQcm9taXNlPFRyYW5zZm9ybVtdPiB7XG4gICAgY29uc3QgdHJhbnNmb3JtID0gYnVpbGRUcmFuc2Zvcm0odHJhbnNmb3JtT3JPcGVyYXRpb25zLCBvcHRpb25zLCBpZCwgdGhpcy50cmFuc2Zvcm1CdWlsZGVyKTtcblxuICAgIGlmICh0aGlzLnRyYW5zZm9ybUxvZy5jb250YWlucyh0cmFuc2Zvcm0uaWQpKSB7XG4gICAgICByZXR1cm4gT3JiaXQuUHJvbWlzZS5yZXNvbHZlKFtdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fZW5xdWV1ZVJlcXVlc3QoJ3B1c2gnLCB0cmFuc2Zvcm0pO1xuICB9XG5cbiAgcHJvdG8uX19wdXNoX18gPSBmdW5jdGlvbih0cmFuc2Zvcm06IFRyYW5zZm9ybSk6IFByb21pc2U8VHJhbnNmb3JtW10+IHtcbiAgICBpZiAodGhpcy50cmFuc2Zvcm1Mb2cuY29udGFpbnModHJhbnNmb3JtLmlkKSkge1xuICAgICAgcmV0dXJuIE9yYml0LlByb21pc2UucmVzb2x2ZShbXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bGZpbGxJblNlcmllcyh0aGlzLCAnYmVmb3JlUHVzaCcsIHRyYW5zZm9ybSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMudHJhbnNmb3JtTG9nLmNvbnRhaW5zKHRyYW5zZm9ybS5pZCkpIHtcbiAgICAgICAgICByZXR1cm4gT3JiaXQuUHJvbWlzZS5yZXNvbHZlKFtdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fcHVzaCh0cmFuc2Zvcm0pXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdHJhbnNmb3JtZWQocmVzdWx0KVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHNldHRsZUluU2VyaWVzKHRoaXMsICdwdXNoJywgdHJhbnNmb3JtLCByZXN1bHQpKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHJlc3VsdCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgcmV0dXJuIHNldHRsZUluU2VyaWVzKHRoaXMsICdwdXNoRmFpbCcsIHRyYW5zZm9ybSwgZXJyb3IpXG4gICAgICAgICAgLnRoZW4oKCkgPT4geyB0aHJvdyBlcnJvcjsgfSk7XG4gICAgICB9KTtcbiAgfVxufVxuIl19