'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PULLABLE = undefined;
exports.isPullable = isPullable;
exports.default = pullable;

var _utils = require('@orbit/utils');

var _core = require('@orbit/core');

var _source = require('../source');

var _query = require('../query');

var PULLABLE = exports.PULLABLE = '__pullable__';
/**
 * Has a source been decorated as `@pullable`?
 *
 * @export
 * @param {Source} source
 * @returns
 */
function isPullable(source) {
    return !!source[PULLABLE];
}
/**
 * Marks a source as "pullable" and adds an implementation of the `Pullable`
 * interface.
 *
 * The `pull` method is part of the "request flow" in Orbit. Requests trigger
 * events before and after processing of each request. Observers can delay the
 * resolution of a request by returning a promise in an event listener.
 *
 * A pullable source emits the following events:
 *
 * - `beforePull` - emitted prior to the processing of `pull`, this event
 * includes the requested `Query` as an argument.
 *
 * - `pull` - emitted after a `pull` has successfully been requested, this
 * event's arguments include both the requested `Query` and an array of the
 * resulting `Transform` instances.
 *
 * - `pullFail` - emitted when an error has occurred processing a `pull`, this
 * event's arguments include both the requested `Query` and the error.
 *
 * A pullable source must implement a private method `_pull`, which performs
 * the processing required for `pull` and returns a promise that resolves to an
 * array of `Transform` instances.
 *
 * @export
 * @decorator
 * @param {SourceClass} Klass
 * @returns {void}
 */
function pullable(Klass) {
    var proto = Klass.prototype;
    if (isPullable(proto)) {
        return;
    }
    (0, _utils.assert)('Pullable interface can only be applied to a Source', proto instanceof _source.Source);
    proto[PULLABLE] = true;
    proto.pull = function (queryOrExpression, options, id) {
        var query = (0, _query.buildQuery)(queryOrExpression, options, id, this.queryBuilder);
        return this._enqueueRequest('pull', query);
    };
    proto.__pull__ = function (query) {
        var _this = this;

        return (0, _core.fulfillInSeries)(this, 'beforePull', query).then(function () {
            return _this._pull(query);
        }).then(function (result) {
            return _this._transformed(result);
        }).then(function (result) {
            return (0, _core.settleInSeries)(_this, 'pull', query, result).then(function () {
                return result;
            });
        }).catch(function (error) {
            return (0, _core.settleInSeries)(_this, 'pullFail', query, error).then(function () {
                throw error;
            });
        });
    };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVsbGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc291cmNlLWludGVyZmFjZXMvcHVsbGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFFLEFBQU0sQUFBRSxBQUFNLEFBQWMsQUFBQzs7QUFDdEMsQUFBTyxBQUFFLEFBQWMsQUFBRSxBQUFlLEFBQUUsQUFBTSxBQUFhLEFBQUM7O0FBQzlELEFBQU8sQUFBRSxBQUFNLEFBQWUsQUFBTSxBQUFXLEFBQUM7O0FBQ2hELEFBQU8sQUFBNEIsQUFBVSxBQUFFLEFBQU0sQUFBVSxBQUFDLEFBR2hFLEFBQU07O0FBQUMsSUFBTSxBQUFRLDhCQUFHLEFBQWMsQUFBQztBQUV2QyxBQU1HLEFBQ0gsQUFBTTs7Ozs7OztvQkFBcUIsQUFBYyxRQUN2QyxBQUFNO1dBQUMsQ0FBQyxDQUFDLEFBQU0sT0FBQyxBQUFRLEFBQUMsQUFBQyxBQUM1QixBQUFDOztBQTRCRCxBQTRCRyxBQUNILEFBQU0sQUFBQyxBQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkFBbUIsQUFBa0IsT0FDakQ7UUFBSSxBQUFLLFFBQUcsQUFBSyxNQUFDLEFBQVMsQUFBQyxBQUU1QixBQUFFLEFBQUM7UUFBQyxBQUFVLFdBQUMsQUFBSyxBQUFDLEFBQUMsUUFBQyxBQUFDLEFBQ3RCLEFBQU0sQUFBQyxBQUNUO0FBQUM7QUFFRCxBQUFNO3VCQUFDLEFBQW9ELHNEQUFFLEFBQUssQUFBWSxBQUFNLEFBQUMsQUFBQyxBQUV0RixBQUFLO1VBQUMsQUFBUSxBQUFDLFlBQUcsQUFBSSxBQUFDLEFBRXZCLEFBQUs7VUFBQyxBQUFJLE9BQUcsVUFBUyxBQUFvQyxtQkFBRSxBQUFnQixTQUFFLEFBQVcsSUFDdkY7WUFBTSxBQUFLLFFBQUcsQUFBVSx1QkFBQyxBQUFpQixtQkFBRSxBQUFPLFNBQUUsQUFBRSxJQUFFLEFBQUksS0FBQyxBQUFZLEFBQUMsQUFBQyxBQUM1RSxBQUFNO2VBQUMsQUFBSSxLQUFDLEFBQWUsZ0JBQUMsQUFBTSxRQUFFLEFBQUssQUFBQyxBQUFDLEFBQzdDLEFBQUM7QUFFRCxBQUFLO1VBQUMsQUFBUSxXQUFHLFVBQVMsQUFBWTtvQkFDcEMsQUFBTTs7MENBQWlCLEFBQUksTUFBRSxBQUFZLGNBQUUsQUFBSyxBQUFDLE9BQzlDLEFBQUksaUJBQUMsQUFBRyxBQUFFO21CQUFDLEFBQUksTUFBQyxBQUFLLE1BQUMsQUFBSyxBQUFDLEFBQUM7QUFEekIsQUFBZSxXQUVuQixBQUFJLHVCQUFDLEFBQU0sQUFBQyxBQUFFO21CQUFDLEFBQUksTUFBQyxBQUFZLGFBQUMsQUFBTSxBQUFDLEFBQUM7V0FDekMsQUFBSSxLQUFDLEFBQU0sQUFBQyxBQUFFLGtCQUNiLEFBQU07b0RBQXNCLEFBQU0sUUFBRSxBQUFLLE9BQUUsQUFBTSxBQUFDLFFBQy9DLEFBQUksaUJBQUMsQUFBRyxBQUFFO3VCQUFDLEFBQU0sQUFBQyxBQUFDLEFBQ3hCO0FBRlMsQUFBYyxBQUFDLEFBQUksQUFFM0IsQUFBQztXQUNELEFBQUssTUFBQyxBQUFLLEFBQUMsQUFBRSxpQkFDYixBQUFNO29EQUFzQixBQUFVLFlBQUUsQUFBSyxPQUFFLEFBQUssQUFBQyxPQUNsRCxBQUFJLEtBQUMsQUFBRyxBQUFFLFlBQUc7c0JBQU0sQUFBSyxBQUFDLEFBQUMsQUFBQyxBQUFDLEFBQUMsQUFDbEM7QUFGUyxBQUFjLEFBQUMsQUFBSSxBQUUzQixBQUFDLEFBQUMsQUFDUDtBQUFDLEFBQ0g7QUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFzc2VydCB9IGZyb20gJ0BvcmJpdC91dGlscyc7XG5pbXBvcnQgeyBzZXR0bGVJblNlcmllcywgZnVsZmlsbEluU2VyaWVzIH0gZnJvbSAnQG9yYml0L2NvcmUnO1xuaW1wb3J0IHsgU291cmNlLCBTb3VyY2VDbGFzcyB9IGZyb20gJy4uL3NvdXJjZSc7XG5pbXBvcnQgeyBRdWVyeSwgUXVlcnlPckV4cHJlc3Npb24sIGJ1aWxkUXVlcnkgfSBmcm9tICcuLi9xdWVyeSc7XG5pbXBvcnQgeyBUcmFuc2Zvcm0gfSBmcm9tICcuLi90cmFuc2Zvcm0nO1xuXG5leHBvcnQgY29uc3QgUFVMTEFCTEUgPSAnX19wdWxsYWJsZV9fJztcblxuLyoqXG4gKiBIYXMgYSBzb3VyY2UgYmVlbiBkZWNvcmF0ZWQgYXMgYEBwdWxsYWJsZWA/XG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHtTb3VyY2V9IHNvdXJjZVxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzUHVsbGFibGUoc291cmNlOiBTb3VyY2UpIHtcbiAgcmV0dXJuICEhc291cmNlW1BVTExBQkxFXTtcbn1cblxuLyoqXG4gKiBBIHNvdXJjZSBkZWNvcmF0ZWQgYXMgYEBwdWxsYWJsZWAgbXVzdCBhbHNvIGltcGxlbWVudCB0aGUgYFB1bGxhYmxlYFxuICogaW50ZXJmYWNlLlxuICpcbiAqIEBleHBvcnRcbiAqIEBpbnRlcmZhY2UgUHVsbGFibGVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQdWxsYWJsZSB7XG4gIC8qKlxuICAgKiBUaGUgYHB1bGxgIG1ldGhvZCBhY2NlcHRzIGEgcXVlcnkgb3IgZXhwcmVzc2lvbiBhbmQgcmV0dXJucyBhIHByb21pc2UgdGhhdFxuICAgKiByZXNvbHZlcyB0byBhbiBhcnJheSBvZiBgVHJhbnNmb3JtYCBpbnN0YW5jZXMgdGhhdCByZXByZXNlbnQgdGhlIGNoYW5nZXNldFxuICAgKiB0aGF0IHJlc3VsdGVkIGZyb20gYXBwbHlpbmcgdGhlIHF1ZXJ5LiBJbiBvdGhlciB3b3JkcywgYSBgcHVsbGAgcmVxdWVzdFxuICAgKiByZXRyaWV2ZXMgdGhlIHJlc3VsdHMgb2YgYSBxdWVyeSBpbiBgVHJhbnNmb3JtYCBmb3JtLlxuICAgKlxuICAgKiBAcGFyYW0ge1F1ZXJ5T3JFeHByZXNzaW9ufSBxdWVyeU9yRXhwcmVzc2lvblxuICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbaWRdXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPFRyYW5zZm9ybVtdPn1cbiAgICpcbiAgICogQG1lbWJlck9mIFB1bGxhYmxlXG4gICAqL1xuICBwdWxsKHF1ZXJ5T3JFeHByZXNzaW9uOiBRdWVyeU9yRXhwcmVzc2lvbiwgb3B0aW9ucz86IG9iamVjdCwgaWQ/OiBzdHJpbmcpOiBQcm9taXNlPFRyYW5zZm9ybVtdPjtcblxuICBfcHVsbChxdWVyeTogUXVlcnkpOiBQcm9taXNlPFRyYW5zZm9ybVtdPjtcbn1cblxuLyoqXG4gKiBNYXJrcyBhIHNvdXJjZSBhcyBcInB1bGxhYmxlXCIgYW5kIGFkZHMgYW4gaW1wbGVtZW50YXRpb24gb2YgdGhlIGBQdWxsYWJsZWBcbiAqIGludGVyZmFjZS5cbiAqXG4gKiBUaGUgYHB1bGxgIG1ldGhvZCBpcyBwYXJ0IG9mIHRoZSBcInJlcXVlc3QgZmxvd1wiIGluIE9yYml0LiBSZXF1ZXN0cyB0cmlnZ2VyXG4gKiBldmVudHMgYmVmb3JlIGFuZCBhZnRlciBwcm9jZXNzaW5nIG9mIGVhY2ggcmVxdWVzdC4gT2JzZXJ2ZXJzIGNhbiBkZWxheSB0aGVcbiAqIHJlc29sdXRpb24gb2YgYSByZXF1ZXN0IGJ5IHJldHVybmluZyBhIHByb21pc2UgaW4gYW4gZXZlbnQgbGlzdGVuZXIuXG4gKlxuICogQSBwdWxsYWJsZSBzb3VyY2UgZW1pdHMgdGhlIGZvbGxvd2luZyBldmVudHM6XG4gKlxuICogLSBgYmVmb3JlUHVsbGAgLSBlbWl0dGVkIHByaW9yIHRvIHRoZSBwcm9jZXNzaW5nIG9mIGBwdWxsYCwgdGhpcyBldmVudFxuICogaW5jbHVkZXMgdGhlIHJlcXVlc3RlZCBgUXVlcnlgIGFzIGFuIGFyZ3VtZW50LlxuICpcbiAqIC0gYHB1bGxgIC0gZW1pdHRlZCBhZnRlciBhIGBwdWxsYCBoYXMgc3VjY2Vzc2Z1bGx5IGJlZW4gcmVxdWVzdGVkLCB0aGlzXG4gKiBldmVudCdzIGFyZ3VtZW50cyBpbmNsdWRlIGJvdGggdGhlIHJlcXVlc3RlZCBgUXVlcnlgIGFuZCBhbiBhcnJheSBvZiB0aGVcbiAqIHJlc3VsdGluZyBgVHJhbnNmb3JtYCBpbnN0YW5jZXMuXG4gKlxuICogLSBgcHVsbEZhaWxgIC0gZW1pdHRlZCB3aGVuIGFuIGVycm9yIGhhcyBvY2N1cnJlZCBwcm9jZXNzaW5nIGEgYHB1bGxgLCB0aGlzXG4gKiBldmVudCdzIGFyZ3VtZW50cyBpbmNsdWRlIGJvdGggdGhlIHJlcXVlc3RlZCBgUXVlcnlgIGFuZCB0aGUgZXJyb3IuXG4gKlxuICogQSBwdWxsYWJsZSBzb3VyY2UgbXVzdCBpbXBsZW1lbnQgYSBwcml2YXRlIG1ldGhvZCBgX3B1bGxgLCB3aGljaCBwZXJmb3Jtc1xuICogdGhlIHByb2Nlc3NpbmcgcmVxdWlyZWQgZm9yIGBwdWxsYCBhbmQgcmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhblxuICogYXJyYXkgb2YgYFRyYW5zZm9ybWAgaW5zdGFuY2VzLlxuICpcbiAqIEBleHBvcnRcbiAqIEBkZWNvcmF0b3JcbiAqIEBwYXJhbSB7U291cmNlQ2xhc3N9IEtsYXNzXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcHVsbGFibGUoS2xhc3M6IFNvdXJjZUNsYXNzKTogdm9pZCB7XG4gIGxldCBwcm90byA9IEtsYXNzLnByb3RvdHlwZTtcblxuICBpZiAoaXNQdWxsYWJsZShwcm90bykpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBhc3NlcnQoJ1B1bGxhYmxlIGludGVyZmFjZSBjYW4gb25seSBiZSBhcHBsaWVkIHRvIGEgU291cmNlJywgcHJvdG8gaW5zdGFuY2VvZiBTb3VyY2UpO1xuXG4gIHByb3RvW1BVTExBQkxFXSA9IHRydWU7XG5cbiAgcHJvdG8ucHVsbCA9IGZ1bmN0aW9uKHF1ZXJ5T3JFeHByZXNzaW9uOiBRdWVyeU9yRXhwcmVzc2lvbiwgb3B0aW9ucz86IG9iamVjdCwgaWQ/OiBzdHJpbmcpOiBQcm9taXNlPFRyYW5zZm9ybVtdPiB7XG4gICAgY29uc3QgcXVlcnkgPSBidWlsZFF1ZXJ5KHF1ZXJ5T3JFeHByZXNzaW9uLCBvcHRpb25zLCBpZCwgdGhpcy5xdWVyeUJ1aWxkZXIpO1xuICAgIHJldHVybiB0aGlzLl9lbnF1ZXVlUmVxdWVzdCgncHVsbCcsIHF1ZXJ5KTtcbiAgfVxuXG4gIHByb3RvLl9fcHVsbF9fID0gZnVuY3Rpb24ocXVlcnk6IFF1ZXJ5KTogUHJvbWlzZTxUcmFuc2Zvcm1bXT4ge1xuICAgIHJldHVybiBmdWxmaWxsSW5TZXJpZXModGhpcywgJ2JlZm9yZVB1bGwnLCBxdWVyeSlcbiAgICAgIC50aGVuKCgpID0+IHRoaXMuX3B1bGwocXVlcnkpKVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHRoaXMuX3RyYW5zZm9ybWVkKHJlc3VsdCkpXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICByZXR1cm4gc2V0dGxlSW5TZXJpZXModGhpcywgJ3B1bGwnLCBxdWVyeSwgcmVzdWx0KVxuICAgICAgICAgIC50aGVuKCgpID0+IHJlc3VsdCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgcmV0dXJuIHNldHRsZUluU2VyaWVzKHRoaXMsICdwdWxsRmFpbCcsIHF1ZXJ5LCBlcnJvcilcbiAgICAgICAgICAudGhlbigoKSA9PiB7IHRocm93IGVycm9yOyB9KTtcbiAgICAgIH0pO1xuICB9XG59XG4iXX0=