'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SYNCABLE = undefined;
exports.isSyncable = isSyncable;
exports.default = syncable;

var _main = require('../main');

var _main2 = _interopRequireDefault(_main);

var _utils = require('@orbit/utils');

var _core = require('@orbit/core');

var _source = require('../source');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SYNCABLE = exports.SYNCABLE = '__syncable__';
/**
 * Has a source been decorated as `@syncable`?
 *
 * @export
 * @param {SourceClass} source
 * @returns
 */
function isSyncable(source) {
    return !!source[SYNCABLE];
}
/**
 * Marks a source as "syncable" and adds an implementation of the `Syncable`
 * interface.
 *
 * The `sync` method is part of the "sync flow" in Orbit. This flow is used to
 * synchronize the contents of sources.
 *
 * Other sources can participate in the resolution of a `sync` by observing the
 * `transform` event, which is emitted whenever a new `Transform` is applied to
 * a source.
 *
 * @export
 * @decorator
 * @param {SourceClass} Klass
 * @returns {void}
 */
function syncable(Klass) {
    let proto = Klass.prototype;
    if (isSyncable(proto)) {
        return;
    }
    (0, _utils.assert)('Syncable interface can only be applied to a Source', proto instanceof _source.Source);
    proto[SYNCABLE] = true;
    proto.sync = function (transformOrTransforms) {
        if ((0, _utils.isArray)(transformOrTransforms)) {
            const transforms = transformOrTransforms;
            return transforms.reduce((chain, transform) => {
                return chain.then(() => this.sync(transform));
            }, _main2.default.Promise.resolve());
        } else {
            const transform = transformOrTransforms;
            if (this.transformLog.contains(transform.id)) {
                return _main2.default.Promise.resolve();
            }
            return this._enqueueSync('sync', transform);
        }
    };
    proto.__sync__ = function (transform) {
        if (this.transformLog.contains(transform.id)) {
            return _main2.default.Promise.resolve();
        }
        return (0, _core.fulfillInSeries)(this, 'beforeSync', transform).then(() => {
            if (this.transformLog.contains(transform.id)) {
                return _main2.default.Promise.resolve();
            } else {
                return this._sync(transform).then(() => this._transformed([transform])).then(() => (0, _core.settleInSeries)(this, 'sync', transform));
            }
        }).catch(error => {
            return (0, _core.settleInSeries)(this, 'syncFail', transform, error).then(() => {
                throw error;
            });
        });
    };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luY2FibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc291cmNlLWludGVyZmFjZXMvc3luY2FibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFLLEFBQU0sQUFBUyxBQUFDOzs7O0FBQzVCLEFBQU8sQUFBRSxBQUFNLEFBQUUsQUFBTyxBQUFFLEFBQU0sQUFBYyxBQUFDOztBQUMvQyxBQUFPLEFBQUUsQUFBZSxBQUFFLEFBQWMsQUFBRSxBQUFNLEFBQWEsQUFBQzs7QUFDOUQsQUFBTyxBQUFFLEFBQU0sQUFBZSxBQUFNLEFBQVcsQUFBQyxBQUdoRCxBQUFNOzs7O0FBQUMsTUFBTSxBQUFRLDhCQUFHLEFBQWMsQUFBQztBQUV2QyxBQU1HLEFBQ0gsQUFBTTs7Ozs7OztvQkFBcUIsQUFBYztBQUN2QyxBQUFNLFdBQUMsQ0FBQyxDQUFDLEFBQU0sT0FBQyxBQUFRLEFBQUMsQUFBQyxBQUM1QjtBQUFDO0FBc0JELEFBZUcsQUFDSCxBQUFNLEFBQUMsQUFBTzs7Ozs7Ozs7Ozs7Ozs7OztrQkFBbUIsQUFBa0I7QUFDakQsUUFBSSxBQUFLLFFBQUcsQUFBSyxNQUFDLEFBQVMsQUFBQztBQUU1QixBQUFFLEFBQUMsUUFBQyxBQUFVLFdBQUMsQUFBSyxBQUFDLEFBQUMsUUFBQyxBQUFDO0FBQ3RCLEFBQU0sQUFBQyxBQUNUO0FBQUM7QUFFRCxBQUFNLHVCQUFDLEFBQW9ELHNEQUFFLEFBQUssQUFBWSxBQUFNLEFBQUMsQUFBQztBQUV0RixBQUFLLFVBQUMsQUFBUSxBQUFDLFlBQUcsQUFBSSxBQUFDO0FBRXZCLEFBQUssVUFBQyxBQUFJLE9BQUcsVUFBUyxBQUE4QztBQUNsRSxBQUFFLEFBQUMsWUFBQyxBQUFPLG9CQUFDLEFBQXFCLEFBQUMsQUFBQyx3QkFBQyxBQUFDO0FBQ25DLGtCQUFNLEFBQVUsYUFBZ0IsQUFBcUIsQUFBQztBQUV0RCxBQUFNLDhCQUFZLEFBQU0sT0FBQyxDQUFDLEFBQUssT0FBRSxBQUFTLEFBQUUsQUFBRTtBQUM1QyxBQUFNLHVCQUFDLEFBQUssTUFBQyxBQUFJLEtBQUMsQUFBRyxBQUFFLE1BQUMsQUFBSSxLQUFDLEFBQUksS0FBQyxBQUFTLEFBQUMsQUFBQyxBQUFDLEFBQ2hEO0FBQUMsYUFGTSxBQUFVLEVBRWQsQUFBSyxlQUFDLEFBQU8sUUFBQyxBQUFPLEFBQUUsQUFBQyxBQUFDLEFBQzlCO0FBQUMsQUFBQyxBQUFJLGVBQUMsQUFBQztBQUNOLGtCQUFNLEFBQVMsWUFBYyxBQUFxQixBQUFDO0FBRW5ELEFBQUUsQUFBQyxnQkFBQyxBQUFJLEtBQUMsQUFBWSxhQUFDLEFBQVEsU0FBQyxBQUFTLFVBQUMsQUFBRSxBQUFDLEFBQUMsS0FBQyxBQUFDO0FBQzdDLEFBQU0sdUJBQUMsQUFBSyxlQUFDLEFBQU8sUUFBQyxBQUFPLEFBQUUsQUFBQyxBQUNqQztBQUFDO0FBRUQsQUFBTSxtQkFBQyxBQUFJLEtBQUMsQUFBWSxhQUFDLEFBQU0sUUFBRSxBQUFTLEFBQUMsQUFBQyxBQUM5QztBQUFDLEFBQ0g7QUFBQztBQUVELEFBQUssVUFBQyxBQUFRLFdBQUcsVUFBUyxBQUFvQjtBQUM1QyxBQUFFLEFBQUMsWUFBQyxBQUFJLEtBQUMsQUFBWSxhQUFDLEFBQVEsU0FBQyxBQUFTLFVBQUMsQUFBRSxBQUFDLEFBQUMsS0FBQyxBQUFDO0FBQzdDLEFBQU0sbUJBQUMsQUFBSyxlQUFDLEFBQU8sUUFBQyxBQUFPLEFBQUUsQUFBQyxBQUNqQztBQUFDO0FBRUQsQUFBTSwwQ0FBaUIsQUFBSSxNQUFFLEFBQVksY0FBRSxBQUFTLEFBQUMsV0FDbEQsQUFBSSxLQUFDLEFBQUcsQUFBRTtBQUNULEFBQUUsQUFBQyxnQkFBQyxBQUFJLEtBQUMsQUFBWSxhQUFDLEFBQVEsU0FBQyxBQUFTLFVBQUMsQUFBRSxBQUFDLEFBQUMsS0FBQyxBQUFDO0FBQzdDLEFBQU0sdUJBQUMsQUFBSyxlQUFDLEFBQU8sUUFBQyxBQUFPLEFBQUUsQUFBQyxBQUNqQztBQUFDLEFBQUMsQUFBSSxtQkFBQyxBQUFDO0FBQ04sQUFBTSx1QkFBQyxBQUFJLEtBQUMsQUFBSyxNQUFDLEFBQVMsQUFBQyxXQUN6QixBQUFJLEtBQUMsQUFBRyxBQUFFLE1BQUMsQUFBSSxLQUFDLEFBQVksYUFBQyxDQUFDLEFBQVMsQUFBQyxBQUFDLEFBQUMsYUFDMUMsQUFBSSxLQUFDLEFBQUcsQUFBRSxNQUFDLEFBQWMsMEJBQUMsQUFBSSxNQUFFLEFBQU0sUUFBRSxBQUFTLEFBQUMsQUFBQyxBQUFDLEFBQ3pEO0FBQUMsQUFDSDtBQUFDLEFBQUMsU0FURyxBQUFlLEVBVW5CLEFBQUssTUFBQyxBQUFLLEFBQUMsQUFBRTtBQUNiLEFBQU0sNkNBQWdCLEFBQUksTUFBRSxBQUFVLFlBQUUsQUFBUyxXQUFFLEFBQUssQUFBQyxPQUN0RCxBQUFJLEtBQUMsQUFBRyxBQUFFO0FBQUcsc0JBQU0sQUFBSyxBQUFDLEFBQUM7QUFBQyxBQUFDLEFBQUMsQUFDbEMsYUFGUyxBQUFjO0FBRXRCLEFBQUMsQUFBQyxBQUNQO0FBQUMsQUFDSDtBQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE9yYml0IGZyb20gJy4uL21haW4nO1xuaW1wb3J0IHsgYXNzZXJ0LCBpc0FycmF5IH0gZnJvbSAnQG9yYml0L3V0aWxzJztcbmltcG9ydCB7IGZ1bGZpbGxJblNlcmllcywgc2V0dGxlSW5TZXJpZXMgfSBmcm9tICdAb3JiaXQvY29yZSc7XG5pbXBvcnQgeyBTb3VyY2UsIFNvdXJjZUNsYXNzIH0gZnJvbSAnLi4vc291cmNlJztcbmltcG9ydCB7IFRyYW5zZm9ybSB9IGZyb20gJy4uL3RyYW5zZm9ybSc7XG5cbmV4cG9ydCBjb25zdCBTWU5DQUJMRSA9ICdfX3N5bmNhYmxlX18nO1xuXG4vKipcbiAqIEhhcyBhIHNvdXJjZSBiZWVuIGRlY29yYXRlZCBhcyBgQHN5bmNhYmxlYD9cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge1NvdXJjZUNsYXNzfSBzb3VyY2VcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N5bmNhYmxlKHNvdXJjZTogU291cmNlKSB7XG4gIHJldHVybiAhIXNvdXJjZVtTWU5DQUJMRV07XG59XG5cbi8qKlxuICogQSBzb3VyY2UgZGVjb3JhdGVkIGFzIGBAc3luY2FibGVgIG11c3QgYWxzbyBpbXBsZW1lbnQgdGhlIGBTeW5jYWJsZWBcbiAqIGludGVyZmFjZS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAaW50ZXJmYWNlIFN5bmNhYmxlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU3luY2FibGUge1xuICAvKipcbiAgICogVGhlIGBzeW5jYCBtZXRob2QgdG8gYSBzb3VyY2UuIFRoaXMgbWV0aG9kIGFjY2VwdHMgYSBgVHJhbnNmb3JtYCBvciBhcnJheVxuICAgKiBvZiBgVHJhbnNmb3JtYHMgYXMgYW4gYXJndW1lbnQgYW5kIGFwcGxpZXMgaXQgdG8gdGhlIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIHsoVHJhbnNmb3JtIHwgVHJhbnNmb3JtW10pfSB0cmFuc2Zvcm1PclRyYW5zZm9ybXNcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAqXG4gICAqIEBtZW1iZXJPZiBTeW5jYWJsZVxuICAgKi9cbiAgc3luYyh0cmFuc2Zvcm1PclRyYW5zZm9ybXM6IFRyYW5zZm9ybSB8IFRyYW5zZm9ybVtdKTogUHJvbWlzZTx2b2lkPjtcbn1cblxuLyoqXG4gKiBNYXJrcyBhIHNvdXJjZSBhcyBcInN5bmNhYmxlXCIgYW5kIGFkZHMgYW4gaW1wbGVtZW50YXRpb24gb2YgdGhlIGBTeW5jYWJsZWBcbiAqIGludGVyZmFjZS5cbiAqXG4gKiBUaGUgYHN5bmNgIG1ldGhvZCBpcyBwYXJ0IG9mIHRoZSBcInN5bmMgZmxvd1wiIGluIE9yYml0LiBUaGlzIGZsb3cgaXMgdXNlZCB0b1xuICogc3luY2hyb25pemUgdGhlIGNvbnRlbnRzIG9mIHNvdXJjZXMuXG4gKlxuICogT3RoZXIgc291cmNlcyBjYW4gcGFydGljaXBhdGUgaW4gdGhlIHJlc29sdXRpb24gb2YgYSBgc3luY2AgYnkgb2JzZXJ2aW5nIHRoZVxuICogYHRyYW5zZm9ybWAgZXZlbnQsIHdoaWNoIGlzIGVtaXR0ZWQgd2hlbmV2ZXIgYSBuZXcgYFRyYW5zZm9ybWAgaXMgYXBwbGllZCB0b1xuICogYSBzb3VyY2UuXG4gKlxuICogQGV4cG9ydFxuICogQGRlY29yYXRvclxuICogQHBhcmFtIHtTb3VyY2VDbGFzc30gS2xhc3NcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzeW5jYWJsZShLbGFzczogU291cmNlQ2xhc3MpOiB2b2lkIHtcbiAgbGV0IHByb3RvID0gS2xhc3MucHJvdG90eXBlO1xuXG4gIGlmIChpc1N5bmNhYmxlKHByb3RvKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGFzc2VydCgnU3luY2FibGUgaW50ZXJmYWNlIGNhbiBvbmx5IGJlIGFwcGxpZWQgdG8gYSBTb3VyY2UnLCBwcm90byBpbnN0YW5jZW9mIFNvdXJjZSk7XG5cbiAgcHJvdG9bU1lOQ0FCTEVdID0gdHJ1ZTtcblxuICBwcm90by5zeW5jID0gZnVuY3Rpb24odHJhbnNmb3JtT3JUcmFuc2Zvcm1zOiBUcmFuc2Zvcm0gfCBUcmFuc2Zvcm1bXSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChpc0FycmF5KHRyYW5zZm9ybU9yVHJhbnNmb3JtcykpIHtcbiAgICAgIGNvbnN0IHRyYW5zZm9ybXMgPSA8VHJhbnNmb3JtW10+dHJhbnNmb3JtT3JUcmFuc2Zvcm1zO1xuXG4gICAgICByZXR1cm4gdHJhbnNmb3Jtcy5yZWR1Y2UoKGNoYWluLCB0cmFuc2Zvcm0pID0+IHtcbiAgICAgICAgcmV0dXJuIGNoYWluLnRoZW4oKCkgPT4gdGhpcy5zeW5jKHRyYW5zZm9ybSkpO1xuICAgICAgfSwgT3JiaXQuUHJvbWlzZS5yZXNvbHZlKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0cmFuc2Zvcm0gPSA8VHJhbnNmb3JtPnRyYW5zZm9ybU9yVHJhbnNmb3JtcztcblxuICAgICAgaWYgKHRoaXMudHJhbnNmb3JtTG9nLmNvbnRhaW5zKHRyYW5zZm9ybS5pZCkpIHtcbiAgICAgICAgcmV0dXJuIE9yYml0LlByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5fZW5xdWV1ZVN5bmMoJ3N5bmMnLCB0cmFuc2Zvcm0pO1xuICAgIH1cbiAgfVxuXG4gIHByb3RvLl9fc3luY19fID0gZnVuY3Rpb24odHJhbnNmb3JtOiBUcmFuc2Zvcm0pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAodGhpcy50cmFuc2Zvcm1Mb2cuY29udGFpbnModHJhbnNmb3JtLmlkKSkge1xuICAgICAgcmV0dXJuIE9yYml0LlByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cblxuICAgIHJldHVybiBmdWxmaWxsSW5TZXJpZXModGhpcywgJ2JlZm9yZVN5bmMnLCB0cmFuc2Zvcm0pXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnRyYW5zZm9ybUxvZy5jb250YWlucyh0cmFuc2Zvcm0uaWQpKSB7XG4gICAgICAgICAgcmV0dXJuIE9yYml0LlByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9zeW5jKHRyYW5zZm9ybSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuX3RyYW5zZm9ybWVkKFt0cmFuc2Zvcm1dKSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHNldHRsZUluU2VyaWVzKHRoaXMsICdzeW5jJywgdHJhbnNmb3JtKSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICByZXR1cm4gc2V0dGxlSW5TZXJpZXModGhpcywgJ3N5bmNGYWlsJywgdHJhbnNmb3JtLCBlcnJvcilcbiAgICAgICAgICAudGhlbigoKSA9PiB7IHRocm93IGVycm9yOyB9KTtcbiAgICAgIH0pO1xuICB9XG59XG4iXX0=