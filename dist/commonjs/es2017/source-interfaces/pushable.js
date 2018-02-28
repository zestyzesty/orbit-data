'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PUSHABLE = undefined;
exports.isPushable = isPushable;
exports.default = pushable;

var _main = require('../main');

var _main2 = _interopRequireDefault(_main);

var _utils = require('@orbit/utils');

var _core = require('@orbit/core');

var _source = require('../source');

var _transform = require('../transform');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PUSHABLE = exports.PUSHABLE = '__pushable__';
/**
 * Has a source been decorated as `@pushable`?
 *
 * @export
 * @param {Source} source
 * @returns
 */
function isPushable(source) {
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
function pushable(Klass) {
    let proto = Klass.prototype;
    if (isPushable(proto)) {
        return;
    }
    (0, _utils.assert)('Pushable interface can only be applied to a Source', proto instanceof _source.Source);
    proto[PUSHABLE] = true;
    proto.push = function (transformOrOperations, options, id) {
        const transform = (0, _transform.buildTransform)(transformOrOperations, options, id, this.transformBuilder);
        if (this.transformLog.contains(transform.id)) {
            return _main2.default.Promise.resolve([]);
        }
        return this._enqueueRequest('push', transform);
    };
    proto.__push__ = function (transform) {
        if (this.transformLog.contains(transform.id)) {
            return _main2.default.Promise.resolve([]);
        }
        return (0, _core.fulfillInSeries)(this, 'beforePush', transform).then(() => {
            if (this.transformLog.contains(transform.id)) {
                return _main2.default.Promise.resolve([]);
            } else {
                return this._push(transform).then(result => {
                    return this._transformed(result).then(() => (0, _core.settleInSeries)(this, 'push', transform, result)).then(() => result);
                });
            }
        }).catch(error => {
            return (0, _core.settleInSeries)(this, 'pushFail', transform, error).then(() => {
                throw error;
            });
        });
    };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVzaGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc291cmNlLWludGVyZmFjZXMvcHVzaGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFLLEFBQU0sQUFBUyxBQUFDOzs7O0FBQzVCLEFBQU8sQUFBRSxBQUFNLEFBQUUsQUFBTSxBQUFjLEFBQUM7O0FBQ3RDLEFBQU8sQUFBRSxBQUFjLEFBQUUsQUFBZSxBQUFFLEFBQU0sQUFBYSxBQUFDOztBQUM5RCxBQUFPLEFBQUUsQUFBTSxBQUFlLEFBQU0sQUFBVyxBQUFDOztBQUNoRCxBQUFPLEFBQW9DLEFBQWMsQUFBRSxBQUFNLEFBQWMsQUFBQyxBQUVoRixBQUFNOzs7O0FBQUMsTUFBTSxBQUFRLDhCQUFHLEFBQWMsQUFBQztBQUV2QyxBQU1HLEFBQ0gsQUFBTTs7Ozs7OztvQkFBcUIsQUFBYztBQUN2QyxBQUFNLFdBQUMsQ0FBQyxDQUFDLEFBQU0sT0FBQyxBQUFRLEFBQUMsQUFBQyxBQUM1QjtBQUFDO0FBNEJELEFBNEJHLEFBQ0gsQUFBTSxBQUFDLEFBQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQUFtQixBQUFrQjtBQUNqRCxRQUFJLEFBQUssUUFBRyxBQUFLLE1BQUMsQUFBUyxBQUFDO0FBRTVCLEFBQUUsQUFBQyxRQUFDLEFBQVUsV0FBQyxBQUFLLEFBQUMsQUFBQyxRQUFDLEFBQUM7QUFDdEIsQUFBTSxBQUFDLEFBQ1Q7QUFBQztBQUVELEFBQU0sdUJBQUMsQUFBb0Qsc0RBQUUsQUFBSyxBQUFZLEFBQU0sQUFBQyxBQUFDO0FBRXRGLEFBQUssVUFBQyxBQUFRLEFBQUMsWUFBRyxBQUFJLEFBQUM7QUFFdkIsQUFBSyxVQUFDLEFBQUksT0FBRyxVQUFTLEFBQTRDLHVCQUFFLEFBQWdCLFNBQUUsQUFBVztBQUMvRixjQUFNLEFBQVMsWUFBRyxBQUFjLCtCQUFDLEFBQXFCLHVCQUFFLEFBQU8sU0FBRSxBQUFFLElBQUUsQUFBSSxLQUFDLEFBQWdCLEFBQUMsQUFBQztBQUU1RixBQUFFLEFBQUMsWUFBQyxBQUFJLEtBQUMsQUFBWSxhQUFDLEFBQVEsU0FBQyxBQUFTLFVBQUMsQUFBRSxBQUFDLEFBQUMsS0FBQyxBQUFDO0FBQzdDLEFBQU0sbUJBQUMsQUFBSyxlQUFDLEFBQU8sUUFBQyxBQUFPLFFBQUMsQUFBRSxBQUFDLEFBQUMsQUFDbkM7QUFBQztBQUVELEFBQU0sZUFBQyxBQUFJLEtBQUMsQUFBZSxnQkFBQyxBQUFNLFFBQUUsQUFBUyxBQUFDLEFBQUMsQUFDakQ7QUFBQztBQUVELEFBQUssVUFBQyxBQUFRLFdBQUcsVUFBUyxBQUFvQjtBQUM1QyxBQUFFLEFBQUMsWUFBQyxBQUFJLEtBQUMsQUFBWSxhQUFDLEFBQVEsU0FBQyxBQUFTLFVBQUMsQUFBRSxBQUFDLEFBQUMsS0FBQyxBQUFDO0FBQzdDLEFBQU0sbUJBQUMsQUFBSyxlQUFDLEFBQU8sUUFBQyxBQUFPLFFBQUMsQUFBRSxBQUFDLEFBQUMsQUFDbkM7QUFBQztBQUVELEFBQU0sMENBQWlCLEFBQUksTUFBRSxBQUFZLGNBQUUsQUFBUyxBQUFDLFdBQ2xELEFBQUksS0FBQyxBQUFHLEFBQUU7QUFDVCxBQUFFLEFBQUMsZ0JBQUMsQUFBSSxLQUFDLEFBQVksYUFBQyxBQUFRLFNBQUMsQUFBUyxVQUFDLEFBQUUsQUFBQyxBQUFDLEtBQUMsQUFBQztBQUM3QyxBQUFNLHVCQUFDLEFBQUssZUFBQyxBQUFPLFFBQUMsQUFBTyxRQUFDLEFBQUUsQUFBQyxBQUFDLEFBQ25DO0FBQUMsQUFBQyxBQUFJLG1CQUFDLEFBQUM7QUFDTixBQUFNLDRCQUFNLEFBQUssTUFBQyxBQUFTLEFBQUMsV0FDekIsQUFBSSxLQUFDLEFBQU0sQUFBQyxBQUFFO0FBQ2IsQUFBTSwyQkFBQyxBQUFJLEtBQUMsQUFBWSxhQUFDLEFBQU0sQUFBQyxRQUM3QixBQUFJLEtBQUMsQUFBRyxBQUFFLE1BQUMsQUFBYywwQkFBQyxBQUFJLE1BQUUsQUFBTSxRQUFFLEFBQVMsV0FBRSxBQUFNLEFBQUMsQUFBQyxTQUMzRCxBQUFJLEtBQUMsQUFBRyxBQUFFLE1BQUMsQUFBTSxBQUFDLEFBQUMsQUFDeEI7QUFBQyxBQUFDLEFBQ04saUJBTlMsQUFBSTtBQU1aLEFBQ0g7QUFBQyxBQUFDLFNBWkcsQUFBZSxFQWFuQixBQUFLLE1BQUMsQUFBSyxBQUFDLEFBQUU7QUFDYixBQUFNLDZDQUFnQixBQUFJLE1BQUUsQUFBVSxZQUFFLEFBQVMsV0FBRSxBQUFLLEFBQUMsT0FDdEQsQUFBSSxLQUFDLEFBQUcsQUFBRTtBQUFHLHNCQUFNLEFBQUssQUFBQyxBQUFDO0FBQUMsQUFBQyxBQUFDLEFBQ2xDLGFBRlMsQUFBYztBQUV0QixBQUFDLEFBQUMsQUFDUDtBQUFDLEFBQ0g7QUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBPcmJpdCBmcm9tICcuLi9tYWluJztcbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ0BvcmJpdC91dGlscyc7XG5pbXBvcnQgeyBzZXR0bGVJblNlcmllcywgZnVsZmlsbEluU2VyaWVzIH0gZnJvbSAnQG9yYml0L2NvcmUnO1xuaW1wb3J0IHsgU291cmNlLCBTb3VyY2VDbGFzcyB9IGZyb20gJy4uL3NvdXJjZSc7XG5pbXBvcnQgeyBUcmFuc2Zvcm0sIFRyYW5zZm9ybU9yT3BlcmF0aW9ucywgYnVpbGRUcmFuc2Zvcm0gfSBmcm9tICcuLi90cmFuc2Zvcm0nO1xuXG5leHBvcnQgY29uc3QgUFVTSEFCTEUgPSAnX19wdXNoYWJsZV9fJztcblxuLyoqXG4gKiBIYXMgYSBzb3VyY2UgYmVlbiBkZWNvcmF0ZWQgYXMgYEBwdXNoYWJsZWA/XG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHtTb3VyY2V9IHNvdXJjZVxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzUHVzaGFibGUoc291cmNlOiBTb3VyY2UpIHtcbiAgcmV0dXJuICEhc291cmNlW1BVU0hBQkxFXTtcbn1cblxuLyoqXG4gKiBBIHNvdXJjZSBkZWNvcmF0ZWQgYXMgYEBwdXNoYWJsZWAgbXVzdCBhbHNvIGltcGxlbWVudCB0aGUgYFB1c2hhYmxlYFxuICogaW50ZXJmYWNlLlxuICpcbiAqIEBleHBvcnRcbiAqIEBpbnRlcmZhY2UgUHVzaGFibGVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQdXNoYWJsZSB7XG4gIC8qKlxuICAgKiBUaGUgYHB1c2hgIG1ldGhvZCBhY2NlcHRzIGEgYFRyYW5zZm9ybWAgaW5zdGFuY2UgYXMgYW4gYXJndW1lbnQgYW5kIHJldHVybnNcbiAgICogYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYW4gYXJyYXkgb2YgYFRyYW5zZm9ybWAgaW5zdGFuY2VzIHRoYXQgYXJlXG4gICAqIGFwcGxpZWQgYXMgYSByZXN1bHQuIEluIG90aGVyIHdvcmRzLCBgcHVzaGAgY2FwdHVyZXMgdGhlIGRpcmVjdCByZXN1bHRzXG4gICAqIF9hbmRfIHNpZGUgZWZmZWN0cyBvZiBhcHBseWluZyBhIGBUcmFuc2Zvcm1gIHRvIGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge1RyYW5zZm9ybU9yT3BlcmF0aW9uc30gdHJhbnNmb3JtT3JPcGVyYXRpb25zXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtpZF1cbiAgICogQHJldHVybnMge1Byb21pc2U8VHJhbnNmb3JtW10+fVxuICAgKlxuICAgKiBAbWVtYmVyT2YgUHVzaGFibGVcbiAgICovXG4gIHB1c2godHJhbnNmb3JtT3JPcGVyYXRpb25zOiBUcmFuc2Zvcm1Pck9wZXJhdGlvbnMsIG9wdGlvbnM/OiBvYmplY3QsIGlkPzogc3RyaW5nKTogUHJvbWlzZTxUcmFuc2Zvcm1bXT47XG5cbiAgX3B1c2godHJhbnNmb3JtOiBUcmFuc2Zvcm0pOiBQcm9taXNlPFRyYW5zZm9ybVtdPjtcbn1cblxuLyoqXG4gKiBNYXJrcyBhIHNvdXJjZSBhcyBcInB1c2hhYmxlXCIgYW5kIGFkZHMgYW4gaW1wbGVtZW50YXRpb24gb2YgdGhlIGBQdXNoYWJsZWBcbiAqIGludGVyZmFjZS5cbiAqXG4gKiBUaGUgYHB1c2hgIG1ldGhvZCBpcyBwYXJ0IG9mIHRoZSBcInJlcXVlc3QgZmxvd1wiIGluIE9yYml0LiBSZXF1ZXN0cyB0cmlnZ2VyXG4gKiBldmVudHMgYmVmb3JlIGFuZCBhZnRlciBwcm9jZXNzaW5nIG9mIGVhY2ggcmVxdWVzdC4gT2JzZXJ2ZXJzIGNhbiBkZWxheSB0aGVcbiAqIHJlc29sdXRpb24gb2YgYSByZXF1ZXN0IGJ5IHJldHVybmluZyBhIHByb21pc2UgaW4gYW4gZXZlbnQgbGlzdGVuZXIuXG4gKlxuICogQSBwdXNoYWJsZSBzb3VyY2UgZW1pdHMgdGhlIGZvbGxvd2luZyBldmVudHM6XG4gKlxuICogLSBgYmVmb3JlUHVzaGAgLSBlbWl0dGVkIHByaW9yIHRvIHRoZSBwcm9jZXNzaW5nIG9mIGBwdXNoYCwgdGhpcyBldmVudFxuICogaW5jbHVkZXMgdGhlIHJlcXVlc3RlZCBgVHJhbnNmb3JtYCBhcyBhbiBhcmd1bWVudC5cbiAqXG4gKiAtIGBwdXNoYCAtIGVtaXR0ZWQgYWZ0ZXIgYSBgcHVzaGAgaGFzIHN1Y2Nlc3NmdWxseSBiZWVuIGFwcGxpZWQsIHRoaXMgZXZlbnQnc1xuICogYXJndW1lbnRzIGluY2x1ZGUgYm90aCB0aGUgcmVxdWVzdGVkIGBUcmFuc2Zvcm1gIGFuZCBhbiBhcnJheSBvZiB0aGUgYWN0dWFsXG4gKiBhcHBsaWVkIGBUcmFuc2Zvcm1gIGluc3RhbmNlcy5cbiAqXG4gKiAtIGBwdXNoRmFpbGAgLSBlbWl0dGVkIHdoZW4gYW4gZXJyb3IgaGFzIG9jY3VycmVkIHB1c2hpbmcgYSB0cmFuc2Zvcm0sIHRoaXNcbiAqIGV2ZW50J3MgYXJndW1lbnRzIGluY2x1ZGUgYm90aCB0aGUgcmVxdWVzdGVkIGBUcmFuc2Zvcm1gIGFuZCB0aGUgZXJyb3IuXG4gKlxuICogQSBwdXNoYWJsZSBzb3VyY2UgbXVzdCBpbXBsZW1lbnQgYSBwcml2YXRlIG1ldGhvZCBgX3B1c2hgLCB3aGljaCBwZXJmb3Jtc1xuICogdGhlIHByb2Nlc3NpbmcgcmVxdWlyZWQgZm9yIGBwdXNoYCBhbmQgcmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhblxuICogYXJyYXkgb2YgYFRyYW5zZm9ybWAgaW5zdGFuY2VzLlxuICpcbiAqIEBleHBvcnRcbiAqIEBkZWNvcmF0b3JcbiAqIEBwYXJhbSB7U291cmNlQ2xhc3N9IEtsYXNzXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcHVzaGFibGUoS2xhc3M6IFNvdXJjZUNsYXNzKTogdm9pZCB7XG4gIGxldCBwcm90byA9IEtsYXNzLnByb3RvdHlwZTtcblxuICBpZiAoaXNQdXNoYWJsZShwcm90bykpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBhc3NlcnQoJ1B1c2hhYmxlIGludGVyZmFjZSBjYW4gb25seSBiZSBhcHBsaWVkIHRvIGEgU291cmNlJywgcHJvdG8gaW5zdGFuY2VvZiBTb3VyY2UpO1xuXG4gIHByb3RvW1BVU0hBQkxFXSA9IHRydWU7XG5cbiAgcHJvdG8ucHVzaCA9IGZ1bmN0aW9uKHRyYW5zZm9ybU9yT3BlcmF0aW9uczogVHJhbnNmb3JtT3JPcGVyYXRpb25zLCBvcHRpb25zPzogb2JqZWN0LCBpZD86IHN0cmluZyk6IFByb21pc2U8VHJhbnNmb3JtW10+IHtcbiAgICBjb25zdCB0cmFuc2Zvcm0gPSBidWlsZFRyYW5zZm9ybSh0cmFuc2Zvcm1Pck9wZXJhdGlvbnMsIG9wdGlvbnMsIGlkLCB0aGlzLnRyYW5zZm9ybUJ1aWxkZXIpO1xuXG4gICAgaWYgKHRoaXMudHJhbnNmb3JtTG9nLmNvbnRhaW5zKHRyYW5zZm9ybS5pZCkpIHtcbiAgICAgIHJldHVybiBPcmJpdC5Qcm9taXNlLnJlc29sdmUoW10pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9lbnF1ZXVlUmVxdWVzdCgncHVzaCcsIHRyYW5zZm9ybSk7XG4gIH1cblxuICBwcm90by5fX3B1c2hfXyA9IGZ1bmN0aW9uKHRyYW5zZm9ybTogVHJhbnNmb3JtKTogUHJvbWlzZTxUcmFuc2Zvcm1bXT4ge1xuICAgIGlmICh0aGlzLnRyYW5zZm9ybUxvZy5jb250YWlucyh0cmFuc2Zvcm0uaWQpKSB7XG4gICAgICByZXR1cm4gT3JiaXQuUHJvbWlzZS5yZXNvbHZlKFtdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVsZmlsbEluU2VyaWVzKHRoaXMsICdiZWZvcmVQdXNoJywgdHJhbnNmb3JtKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy50cmFuc2Zvcm1Mb2cuY29udGFpbnModHJhbnNmb3JtLmlkKSkge1xuICAgICAgICAgIHJldHVybiBPcmJpdC5Qcm9taXNlLnJlc29sdmUoW10pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9wdXNoKHRyYW5zZm9ybSlcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLl90cmFuc2Zvcm1lZChyZXN1bHQpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gc2V0dGxlSW5TZXJpZXModGhpcywgJ3B1c2gnLCB0cmFuc2Zvcm0sIHJlc3VsdCkpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gcmVzdWx0KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICByZXR1cm4gc2V0dGxlSW5TZXJpZXModGhpcywgJ3B1c2hGYWlsJywgdHJhbnNmb3JtLCBlcnJvcilcbiAgICAgICAgICAudGhlbigoKSA9PiB7IHRocm93IGVycm9yOyB9KTtcbiAgICAgIH0pO1xuICB9XG59XG4iXX0=