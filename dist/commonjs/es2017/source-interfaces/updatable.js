'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UPDATABLE = undefined;
exports.isUpdatable = isUpdatable;
exports.default = updatable;

var _main = require('../main');

var _main2 = _interopRequireDefault(_main);

var _utils = require('@orbit/utils');

var _core = require('@orbit/core');

var _source = require('../source');

var _transform = require('../transform');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UPDATABLE = exports.UPDATABLE = '__updatable__';
/**
 * Has a source been decorated as `@updatable`?
 *
 * @export
 * @param {*} obj
 * @returns
 */
function isUpdatable(source) {
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
function updatable(Klass) {
    let proto = Klass.prototype;
    if (isUpdatable(proto)) {
        return;
    }
    (0, _utils.assert)('Updatable interface can only be applied to a Source', proto instanceof _source.Source);
    proto[UPDATABLE] = true;
    proto.update = function (transformOrOperations, options, id) {
        const transform = (0, _transform.buildTransform)(transformOrOperations, options, id, this.transformBuilder);
        if (this.transformLog.contains(transform.id)) {
            return _main2.default.Promise.resolve();
        }
        return this._enqueueRequest('update', transform);
    };
    proto.__update__ = function (transform) {
        if (this.transformLog.contains(transform.id)) {
            return _main2.default.Promise.resolve();
        }
        return (0, _core.fulfillInSeries)(this, 'beforeUpdate', transform).then(() => {
            if (this.transformLog.contains(transform.id)) {
                return _main2.default.Promise.resolve();
            } else {
                return this._update(transform).then(result => {
                    return this._transformed([transform]).then(() => (0, _core.settleInSeries)(this, 'update', transform, result)).then(() => result);
                });
            }
        }).catch(error => {
            return (0, _core.settleInSeries)(this, 'updateFail', transform, error).then(() => {
                throw error;
            });
        });
    };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NvdXJjZS1pbnRlcmZhY2VzL3VwZGF0YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxBQUFPLEFBQUssQUFBTSxBQUFTLEFBQUM7Ozs7QUFDNUIsQUFBTyxBQUFFLEFBQU0sQUFBRSxBQUFNLEFBQWMsQUFBQzs7QUFDdEMsQUFBTyxBQUFFLEFBQWMsQUFBRSxBQUFlLEFBQUUsQUFBTSxBQUFhLEFBQUM7O0FBRTlELEFBQU8sQUFBRSxBQUFNLEFBQWUsQUFBTSxBQUFXLEFBQUM7O0FBQ2hELEFBQU8sQUFBb0MsQUFBYyxBQUFFLEFBQU0sQUFBYyxBQUFDLEFBRWhGLEFBQU07Ozs7QUFBQyxNQUFNLEFBQVMsZ0NBQUcsQUFBZSxBQUFDO0FBRXpDLEFBTUcsQUFDSCxBQUFNOzs7Ozs7O3FCQUFzQixBQUFjO0FBQ3hDLEFBQU0sV0FBQyxDQUFDLENBQUMsQUFBTSxPQUFDLEFBQVMsQUFBQyxBQUFDLEFBQzdCO0FBQUM7QUEyQkQsQUEyQkcsQUFDSCxBQUFNLEFBQUMsQUFBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQkFBb0IsQUFBa0I7QUFDbEQsUUFBSSxBQUFLLFFBQUcsQUFBSyxNQUFDLEFBQVMsQUFBQztBQUU1QixBQUFFLEFBQUMsUUFBQyxBQUFXLFlBQUMsQUFBSyxBQUFDLEFBQUMsUUFBQyxBQUFDO0FBQ3ZCLEFBQU0sQUFBQyxBQUNUO0FBQUM7QUFFRCxBQUFNLHVCQUFDLEFBQXFELHVEQUFFLEFBQUssQUFBWSxBQUFNLEFBQUMsQUFBQztBQUV2RixBQUFLLFVBQUMsQUFBUyxBQUFDLGFBQUcsQUFBSSxBQUFDO0FBRXhCLEFBQUssVUFBQyxBQUFNLFNBQUcsVUFBUyxBQUE0Qyx1QkFBRSxBQUFnQixTQUFFLEFBQVc7QUFDakcsY0FBTSxBQUFTLFlBQUcsQUFBYywrQkFBQyxBQUFxQix1QkFBRSxBQUFPLFNBQUUsQUFBRSxJQUFFLEFBQUksS0FBQyxBQUFnQixBQUFDLEFBQUM7QUFFNUYsQUFBRSxBQUFDLFlBQUMsQUFBSSxLQUFDLEFBQVksYUFBQyxBQUFRLFNBQUMsQUFBUyxVQUFDLEFBQUUsQUFBQyxBQUFDLEtBQUMsQUFBQztBQUM3QyxBQUFNLG1CQUFDLEFBQUssZUFBQyxBQUFPLFFBQUMsQUFBTyxBQUFFLEFBQUMsQUFDakM7QUFBQztBQUVELEFBQU0sZUFBQyxBQUFJLEtBQUMsQUFBZSxnQkFBQyxBQUFRLFVBQUUsQUFBUyxBQUFDLEFBQUMsQUFDbkQ7QUFBQztBQUVELEFBQUssVUFBQyxBQUFVLGFBQUcsVUFBUyxBQUFvQjtBQUM5QyxBQUFFLEFBQUMsWUFBQyxBQUFJLEtBQUMsQUFBWSxhQUFDLEFBQVEsU0FBQyxBQUFTLFVBQUMsQUFBRSxBQUFDLEFBQUMsS0FBQyxBQUFDO0FBQzdDLEFBQU0sbUJBQUMsQUFBSyxlQUFDLEFBQU8sUUFBQyxBQUFPLEFBQUUsQUFBQyxBQUNqQztBQUFDO0FBRUQsQUFBTSwwQ0FBaUIsQUFBSSxNQUFFLEFBQWMsZ0JBQUUsQUFBUyxBQUFDLFdBQ3BELEFBQUksS0FBQyxBQUFHLEFBQUU7QUFDVCxBQUFFLEFBQUMsZ0JBQUMsQUFBSSxLQUFDLEFBQVksYUFBQyxBQUFRLFNBQUMsQUFBUyxVQUFDLEFBQUUsQUFBQyxBQUFDLEtBQUMsQUFBQztBQUM3QyxBQUFNLHVCQUFDLEFBQUssZUFBQyxBQUFPLFFBQUMsQUFBTyxBQUFFLEFBQUMsQUFDakM7QUFBQyxBQUFDLEFBQUksbUJBQUMsQUFBQztBQUNOLEFBQU0sNEJBQU0sQUFBTyxRQUFDLEFBQVMsQUFBQyxXQUMzQixBQUFJLEtBQUMsQUFBTSxBQUFDLEFBQUU7QUFDYixBQUFNLDJCQUFDLEFBQUksS0FBQyxBQUFZLGFBQUMsQ0FBQyxBQUFTLEFBQUMsQUFBQyxZQUNsQyxBQUFJLEtBQUMsQUFBRyxBQUFFLE1BQUMsQUFBYywwQkFBQyxBQUFJLE1BQUUsQUFBUSxVQUFFLEFBQVMsV0FBRSxBQUFNLEFBQUMsQUFBQyxTQUM3RCxBQUFJLEtBQUMsQUFBRyxBQUFFLE1BQUMsQUFBTSxBQUFDLEFBQUMsQUFDeEI7QUFBQyxBQUFDLEFBQ04saUJBTlMsQUFBSTtBQU1aLEFBQ0g7QUFBQyxBQUFDLFNBWkcsQUFBZSxFQWFuQixBQUFLLE1BQUMsQUFBSyxBQUFDLEFBQUU7QUFDYixBQUFNLDZDQUFnQixBQUFJLE1BQUUsQUFBWSxjQUFFLEFBQVMsV0FBRSxBQUFLLEFBQUMsT0FDeEQsQUFBSSxLQUFDLEFBQUcsQUFBRTtBQUFHLHNCQUFNLEFBQUssQUFBQyxBQUFDO0FBQUMsQUFBQyxBQUFDLEFBQ2xDLGFBRlMsQUFBYztBQUV0QixBQUFDLEFBQUMsQUFDUDtBQUFDLEFBQ0g7QUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBPcmJpdCBmcm9tICcuLi9tYWluJztcbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ0BvcmJpdC91dGlscyc7XG5pbXBvcnQgeyBzZXR0bGVJblNlcmllcywgZnVsZmlsbEluU2VyaWVzIH0gZnJvbSAnQG9yYml0L2NvcmUnO1xuaW1wb3J0IHsgT3BlcmF0aW9uIH0gZnJvbSAnLi4vb3BlcmF0aW9uJztcbmltcG9ydCB7IFNvdXJjZSwgU291cmNlQ2xhc3MgfSBmcm9tICcuLi9zb3VyY2UnO1xuaW1wb3J0IHsgVHJhbnNmb3JtLCBUcmFuc2Zvcm1Pck9wZXJhdGlvbnMsIGJ1aWxkVHJhbnNmb3JtIH0gZnJvbSAnLi4vdHJhbnNmb3JtJztcblxuZXhwb3J0IGNvbnN0IFVQREFUQUJMRSA9ICdfX3VwZGF0YWJsZV9fJztcblxuLyoqXG4gKiBIYXMgYSBzb3VyY2UgYmVlbiBkZWNvcmF0ZWQgYXMgYEB1cGRhdGFibGVgP1xuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7Kn0gb2JqXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgZnVuY3Rpb24gaXNVcGRhdGFibGUoc291cmNlOiBTb3VyY2UpIHtcbiAgcmV0dXJuICEhc291cmNlW1VQREFUQUJMRV07XG59XG5cbi8qKlxuICogQSBzb3VyY2UgZGVjb3JhdGVkIGFzIGBAdXBkYXRhYmxlYCBtdXN0IGFsc28gaW1wbGVtZW50IHRoZSBgVXBkYXRhYmxlYFxuICogaW50ZXJmYWNlLlxuICpcbiAqIEBleHBvcnRcbiAqIEBpbnRlcmZhY2UgVXBkYXRhYmxlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVXBkYXRhYmxlIHtcbiAgLyoqXG4gICAqIFRoZSBgdXBkYXRlYCBtZXRob2QgYWNjZXB0cyBhIGBUcmFuc2Zvcm1gIGluc3RhbmNlIG9yIGFuIGFycmF5IG9mXG4gICAqIG9wZXJhdGlvbnMgd2hpY2ggaXQgdGhlbiBjb252ZXJ0cyB0byBhIGBUcmFuc2Zvcm1gIGluc3RhbmNlLiBUaGUgc291cmNlXG4gICAqIGFwcGxpZXMgdGhlIHVwZGF0ZSBhbmQgcmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIGNvbXBsZXRlLlxuICAgKlxuICAgKiBAcGFyYW0ge1RyYW5zZm9ybU9yT3BlcmF0aW9uc30gdHJhbnNmb3JtT3JPcGVyYXRpb25zXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtpZF1cbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAqXG4gICAqIEBtZW1iZXJPZiBVcGRhdGFibGVcbiAgICovXG4gIHVwZGF0ZSh0cmFuc2Zvcm1Pck9wZXJhdGlvbnM6IFRyYW5zZm9ybU9yT3BlcmF0aW9ucywgb3B0aW9ucz86IG9iamVjdCwgaWQ/OiBzdHJpbmcpOiBQcm9taXNlPGFueT47XG5cbiAgX3VwZGF0ZSh0cmFuc2Zvcm06IFRyYW5zZm9ybSk6IFByb21pc2U8YW55Pjtcbn1cblxuLyoqXG4gKiBNYXJrcyBhIHNvdXJjZSBhcyBcInVwZGF0YWJsZVwiIGFuZCBhZGRzIGFuIGltcGxlbWVudGF0aW9uIG9mIHRoZSBgVXBkYXRhYmxlYFxuICogaW50ZXJmYWNlLlxuICpcbiAqIFRoZSBgdXBkYXRlYCBtZXRob2QgaXMgcGFydCBvZiB0aGUgXCJyZXF1ZXN0IGZsb3dcIiBpbiBPcmJpdC4gUmVxdWVzdHMgdHJpZ2dlclxuICogZXZlbnRzIGJlZm9yZSBhbmQgYWZ0ZXIgcHJvY2Vzc2luZyBvZiBlYWNoIHJlcXVlc3QuIE9ic2VydmVycyBjYW4gZGVsYXkgdGhlXG4gKiByZXNvbHV0aW9uIG9mIGEgcmVxdWVzdCBieSByZXR1cm5pbmcgYSBwcm9taXNlIGluIGFuIGV2ZW50IGxpc3RlbmVyLlxuICpcbiAqIEFuIHVwZGF0YWJsZSBzb3VyY2UgZW1pdHMgdGhlIGZvbGxvd2luZyBldmVudHM6XG4gKlxuICogLSBgYmVmb3JlVXBkYXRlYCAtIGVtaXR0ZWQgcHJpb3IgdG8gdGhlIHByb2Nlc3Npbmcgb2YgYHVwZGF0ZWAsIHRoaXMgZXZlbnRcbiAqIGluY2x1ZGVzIHRoZSByZXF1ZXN0ZWQgYFRyYW5zZm9ybWAgYXMgYW4gYXJndW1lbnQuXG4gKlxuICogLSBgdXBkYXRlYCAtIGVtaXR0ZWQgYWZ0ZXIgYW4gYHVwZGF0ZWAgaGFzIHN1Y2Nlc3NmdWxseSBiZWVuIGFwcGxpZWQsIHRoaXNcbiAqIGV2ZW50IGluY2x1ZGVzIHRoZSByZXF1ZXN0ZWQgYFRyYW5zZm9ybWAgYXMgYW4gYXJndW1lbnQuXG4gKlxuICogLSBgdXBkYXRlRmFpbGAgLSBlbWl0dGVkIHdoZW4gYW4gZXJyb3IgaGFzIG9jY3VycmVkIGFwcGx5aW5nIGFuIHVwZGF0ZSwgdGhpc1xuICogZXZlbnQncyBhcmd1bWVudHMgaW5jbHVkZSBib3RoIHRoZSByZXF1ZXN0ZWQgYFRyYW5zZm9ybWAgYW5kIHRoZSBlcnJvci5cbiAqXG4gKiBBbiB1cGRhdGFibGUgc291cmNlIG11c3QgaW1wbGVtZW50IGEgcHJpdmF0ZSBtZXRob2QgYF91cGRhdGVgLCB3aGljaCBwZXJmb3Jtc1xuICogdGhlIHByb2Nlc3NpbmcgcmVxdWlyZWQgZm9yIGB1cGRhdGVgIGFuZCByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW5cbiAqIGNvbXBsZXRlLlxuICpcbiAqIEBleHBvcnRcbiAqIEBkZWNvcmF0b3JcbiAqIEBwYXJhbSB7U291cmNlQ2xhc3N9IEtsYXNzXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXBkYXRhYmxlKEtsYXNzOiBTb3VyY2VDbGFzcyk6IHZvaWQge1xuICBsZXQgcHJvdG8gPSBLbGFzcy5wcm90b3R5cGU7XG5cbiAgaWYgKGlzVXBkYXRhYmxlKHByb3RvKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGFzc2VydCgnVXBkYXRhYmxlIGludGVyZmFjZSBjYW4gb25seSBiZSBhcHBsaWVkIHRvIGEgU291cmNlJywgcHJvdG8gaW5zdGFuY2VvZiBTb3VyY2UpO1xuXG4gIHByb3RvW1VQREFUQUJMRV0gPSB0cnVlO1xuXG4gIHByb3RvLnVwZGF0ZSA9IGZ1bmN0aW9uKHRyYW5zZm9ybU9yT3BlcmF0aW9uczogVHJhbnNmb3JtT3JPcGVyYXRpb25zLCBvcHRpb25zPzogb2JqZWN0LCBpZD86IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3QgdHJhbnNmb3JtID0gYnVpbGRUcmFuc2Zvcm0odHJhbnNmb3JtT3JPcGVyYXRpb25zLCBvcHRpb25zLCBpZCwgdGhpcy50cmFuc2Zvcm1CdWlsZGVyKTtcblxuICAgIGlmICh0aGlzLnRyYW5zZm9ybUxvZy5jb250YWlucyh0cmFuc2Zvcm0uaWQpKSB7XG4gICAgICByZXR1cm4gT3JiaXQuUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2VucXVldWVSZXF1ZXN0KCd1cGRhdGUnLCB0cmFuc2Zvcm0pO1xuICB9XG5cbiAgcHJvdG8uX191cGRhdGVfXyA9IGZ1bmN0aW9uKHRyYW5zZm9ybTogVHJhbnNmb3JtKTogUHJvbWlzZTxhbnk+IHtcbiAgICBpZiAodGhpcy50cmFuc2Zvcm1Mb2cuY29udGFpbnModHJhbnNmb3JtLmlkKSkge1xuICAgICAgcmV0dXJuIE9yYml0LlByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cblxuICAgIHJldHVybiBmdWxmaWxsSW5TZXJpZXModGhpcywgJ2JlZm9yZVVwZGF0ZScsIHRyYW5zZm9ybSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMudHJhbnNmb3JtTG9nLmNvbnRhaW5zKHRyYW5zZm9ybS5pZCkpIHtcbiAgICAgICAgICByZXR1cm4gT3JiaXQuUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX3VwZGF0ZSh0cmFuc2Zvcm0pXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdHJhbnNmb3JtZWQoW3RyYW5zZm9ybV0pXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gc2V0dGxlSW5TZXJpZXModGhpcywgJ3VwZGF0ZScsIHRyYW5zZm9ybSwgcmVzdWx0KSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiByZXN1bHQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIHJldHVybiBzZXR0bGVJblNlcmllcyh0aGlzLCAndXBkYXRlRmFpbCcsIHRyYW5zZm9ybSwgZXJyb3IpXG4gICAgICAgICAgLnRoZW4oKCkgPT4geyB0aHJvdyBlcnJvcjsgfSk7XG4gICAgICB9KTtcbiAgfVxufVxuIl19