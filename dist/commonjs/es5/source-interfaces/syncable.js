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

var SYNCABLE = exports.SYNCABLE = '__syncable__';
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
    var proto = Klass.prototype;
    if (isSyncable(proto)) {
        return;
    }
    (0, _utils.assert)('Syncable interface can only be applied to a Source', proto instanceof _source.Source);
    proto[SYNCABLE] = true;
    proto.sync = function (transformOrTransforms) {
        var _this = this;

        if ((0, _utils.isArray)(transformOrTransforms)) {
            var transforms = transformOrTransforms;
            return transforms.reduce(function (chain, transform) {
                return chain.then(function () {
                    return _this.sync(transform);
                });
            }, _main2.default.Promise.resolve());
        } else {
            var transform = transformOrTransforms;
            if (this.transformLog.contains(transform.id)) {
                return _main2.default.Promise.resolve();
            }
            return this._enqueueSync('sync', transform);
        }
    };
    proto.__sync__ = function (transform) {
        var _this2 = this;

        if (this.transformLog.contains(transform.id)) {
            return _main2.default.Promise.resolve();
        }
        return (0, _core.fulfillInSeries)(this, 'beforeSync', transform).then(function () {
            if (_this2.transformLog.contains(transform.id)) {
                return _main2.default.Promise.resolve();
            } else {
                return _this2._sync(transform).then(function () {
                    return _this2._transformed([transform]);
                }).then(function () {
                    return (0, _core.settleInSeries)(_this2, 'sync', transform);
                });
            }
        }).catch(function (error) {
            return (0, _core.settleInSeries)(_this2, 'syncFail', transform, error).then(function () {
                throw error;
            });
        });
    };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luY2FibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc291cmNlLWludGVyZmFjZXMvc3luY2FibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFLLEFBQU0sQUFBUyxBQUFDOzs7O0FBQzVCLEFBQU8sQUFBRSxBQUFNLEFBQUUsQUFBTyxBQUFFLEFBQU0sQUFBYyxBQUFDOztBQUMvQyxBQUFPLEFBQUUsQUFBZSxBQUFFLEFBQWMsQUFBRSxBQUFNLEFBQWEsQUFBQzs7QUFDOUQsQUFBTyxBQUFFLEFBQU0sQUFBZSxBQUFNLEFBQVcsQUFBQyxBQUdoRCxBQUFNOzs7O0FBQUMsSUFBTSxBQUFRLDhCQUFHLEFBQWMsQUFBQztBQUV2QyxBQU1HLEFBQ0gsQUFBTTs7Ozs7OztvQkFBcUIsQUFBYyxRQUN2QyxBQUFNO1dBQUMsQ0FBQyxDQUFDLEFBQU0sT0FBQyxBQUFRLEFBQUMsQUFBQyxBQUM1QixBQUFDOztBQXNCRCxBQWVHLEFBQ0gsQUFBTSxBQUFDLEFBQU87Ozs7Ozs7Ozs7Ozs7Ozs7a0JBQW1CLEFBQWtCLE9BQ2pEO1FBQUksQUFBSyxRQUFHLEFBQUssTUFBQyxBQUFTLEFBQUMsQUFFNUIsQUFBRSxBQUFDO1FBQUMsQUFBVSxXQUFDLEFBQUssQUFBQyxBQUFDLFFBQUMsQUFBQyxBQUN0QixBQUFNLEFBQUMsQUFDVDtBQUFDO0FBRUQsQUFBTTt1QkFBQyxBQUFvRCxzREFBRSxBQUFLLEFBQVksQUFBTSxBQUFDLEFBQUMsQUFFdEYsQUFBSztVQUFDLEFBQVEsQUFBQyxZQUFHLEFBQUksQUFBQyxBQUV2QixBQUFLO1VBQUMsQUFBSSxPQUFHLFVBQVMsQUFBOEM7b0JBQ2xFLEFBQUUsQUFBQzs7WUFBQyxBQUFPLG9CQUFDLEFBQXFCLEFBQUMsQUFBQyx3QkFBQyxBQUFDLEFBQ25DO2dCQUFNLEFBQVUsYUFBZ0IsQUFBcUIsQUFBQyxBQUV0RCxBQUFNOzhCQUFZLEFBQU0sT0FBQyxVQUFDLEFBQUssT0FBRSxBQUFTLEFBQUUsQUFBRSxXQUM1QyxBQUFNOzZCQUFPLEFBQUksaUJBQUMsQUFBRyxBQUFFOzJCQUFDLEFBQUksTUFBQyxBQUFJLEtBQUMsQUFBUyxBQUFDLEFBQUMsQUFBQyxBQUNoRDtBQURTLEFBQUssQUFDYjtBQUZNLEFBQVUsZUFFZCxBQUFLLGVBQUMsQUFBTyxRQUFDLEFBQU8sQUFBRSxBQUFDLEFBQUMsQUFDOUIsQUFBQyxBQUFDLEFBQUk7ZUFBQyxBQUFDLEFBQ047Z0JBQU0sQUFBUyxZQUFjLEFBQXFCLEFBQUMsQUFFbkQsQUFBRSxBQUFDO2dCQUFDLEFBQUksS0FBQyxBQUFZLGFBQUMsQUFBUSxTQUFDLEFBQVMsVUFBQyxBQUFFLEFBQUMsQUFBQyxLQUFDLEFBQUMsQUFDN0MsQUFBTTt1QkFBQyxBQUFLLGVBQUMsQUFBTyxRQUFDLEFBQU8sQUFBRSxBQUFDLEFBQ2pDLEFBQUM7QUFFRCxBQUFNO21CQUFDLEFBQUksS0FBQyxBQUFZLGFBQUMsQUFBTSxRQUFFLEFBQVMsQUFBQyxBQUFDLEFBQzlDLEFBQUMsQUFDSDtBQUFDO0FBRUQsQUFBSztVQUFDLEFBQVEsV0FBRyxVQUFTLEFBQW9CO3FCQUM1QyxBQUFFLEFBQUM7O1lBQUMsQUFBSSxLQUFDLEFBQVksYUFBQyxBQUFRLFNBQUMsQUFBUyxVQUFDLEFBQUUsQUFBQyxBQUFDLEtBQUMsQUFBQyxBQUM3QyxBQUFNO21CQUFDLEFBQUssZUFBQyxBQUFPLFFBQUMsQUFBTyxBQUFFLEFBQUMsQUFDakMsQUFBQztBQUVELEFBQU07MENBQWlCLEFBQUksTUFBRSxBQUFZLGNBQUUsQUFBUyxBQUFDLFdBQ2xELEFBQUksS0FBQyxBQUFHLEFBQUUsWUFDVCxBQUFFLEFBQUM7Z0JBQUMsQUFBSSxPQUFDLEFBQVksYUFBQyxBQUFRLFNBQUMsQUFBUyxVQUFDLEFBQUUsQUFBQyxBQUFDLEtBQUMsQUFBQyxBQUM3QyxBQUFNO3VCQUFDLEFBQUssZUFBQyxBQUFPLFFBQUMsQUFBTyxBQUFFLEFBQUMsQUFDakMsQUFBQyxBQUFDLEFBQUk7bUJBQUMsQUFBQyxBQUNOLEFBQU07OEJBQU0sQUFBSyxNQUFDLEFBQVMsQUFBQyxXQUN6QixBQUFJLGlCQUFDLEFBQUcsQUFBRTsyQkFBQyxBQUFJLE9BQUMsQUFBWSxhQUFDLENBQUMsQUFBUyxBQUFDLEFBQUMsQUFBQztBQUR0QyxBQUFJLG1CQUVSLEFBQUksaUJBQUMsQUFBRyxBQUFFOzJCQUFDLEFBQWMsQUFBQyxBQUFJLGtDQUFFLEFBQU0sUUFBRSxBQUFTLEFBQUMsQUFBQyxBQUFDLEFBQ3pEO0FBQUMsQUFDSDtBQUFDLEFBQUM7QUFURyxBQUFlLFdBVW5CLEFBQUssTUFBQyxBQUFLLEFBQUMsQUFBRSxpQkFDYixBQUFNO3FEQUFzQixBQUFVLFlBQUUsQUFBUyxXQUFFLEFBQUssQUFBQyxPQUN0RCxBQUFJLEtBQUMsQUFBRyxBQUFFLFlBQUc7c0JBQU0sQUFBSyxBQUFDLEFBQUMsQUFBQyxBQUFDLEFBQUMsQUFDbEM7QUFGUyxBQUFjLEFBQUMsQUFBSSxBQUUzQixBQUFDLEFBQUMsQUFDUDtBQUFDLEFBQ0g7QUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBPcmJpdCBmcm9tICcuLi9tYWluJztcbmltcG9ydCB7IGFzc2VydCwgaXNBcnJheSB9IGZyb20gJ0BvcmJpdC91dGlscyc7XG5pbXBvcnQgeyBmdWxmaWxsSW5TZXJpZXMsIHNldHRsZUluU2VyaWVzIH0gZnJvbSAnQG9yYml0L2NvcmUnO1xuaW1wb3J0IHsgU291cmNlLCBTb3VyY2VDbGFzcyB9IGZyb20gJy4uL3NvdXJjZSc7XG5pbXBvcnQgeyBUcmFuc2Zvcm0gfSBmcm9tICcuLi90cmFuc2Zvcm0nO1xuXG5leHBvcnQgY29uc3QgU1lOQ0FCTEUgPSAnX19zeW5jYWJsZV9fJztcblxuLyoqXG4gKiBIYXMgYSBzb3VyY2UgYmVlbiBkZWNvcmF0ZWQgYXMgYEBzeW5jYWJsZWA/XG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHtTb3VyY2VDbGFzc30gc291cmNlXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTeW5jYWJsZShzb3VyY2U6IFNvdXJjZSkge1xuICByZXR1cm4gISFzb3VyY2VbU1lOQ0FCTEVdO1xufVxuXG4vKipcbiAqIEEgc291cmNlIGRlY29yYXRlZCBhcyBgQHN5bmNhYmxlYCBtdXN0IGFsc28gaW1wbGVtZW50IHRoZSBgU3luY2FibGVgXG4gKiBpbnRlcmZhY2UuXG4gKlxuICogQGV4cG9ydFxuICogQGludGVyZmFjZSBTeW5jYWJsZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFN5bmNhYmxlIHtcbiAgLyoqXG4gICAqIFRoZSBgc3luY2AgbWV0aG9kIHRvIGEgc291cmNlLiBUaGlzIG1ldGhvZCBhY2NlcHRzIGEgYFRyYW5zZm9ybWAgb3IgYXJyYXlcbiAgICogb2YgYFRyYW5zZm9ybWBzIGFzIGFuIGFyZ3VtZW50IGFuZCBhcHBsaWVzIGl0IHRvIHRoZSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7KFRyYW5zZm9ybSB8IFRyYW5zZm9ybVtdKX0gdHJhbnNmb3JtT3JUcmFuc2Zvcm1zXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgKlxuICAgKiBAbWVtYmVyT2YgU3luY2FibGVcbiAgICovXG4gIHN5bmModHJhbnNmb3JtT3JUcmFuc2Zvcm1zOiBUcmFuc2Zvcm0gfCBUcmFuc2Zvcm1bXSk6IFByb21pc2U8dm9pZD47XG59XG5cbi8qKlxuICogTWFya3MgYSBzb3VyY2UgYXMgXCJzeW5jYWJsZVwiIGFuZCBhZGRzIGFuIGltcGxlbWVudGF0aW9uIG9mIHRoZSBgU3luY2FibGVgXG4gKiBpbnRlcmZhY2UuXG4gKlxuICogVGhlIGBzeW5jYCBtZXRob2QgaXMgcGFydCBvZiB0aGUgXCJzeW5jIGZsb3dcIiBpbiBPcmJpdC4gVGhpcyBmbG93IGlzIHVzZWQgdG9cbiAqIHN5bmNocm9uaXplIHRoZSBjb250ZW50cyBvZiBzb3VyY2VzLlxuICpcbiAqIE90aGVyIHNvdXJjZXMgY2FuIHBhcnRpY2lwYXRlIGluIHRoZSByZXNvbHV0aW9uIG9mIGEgYHN5bmNgIGJ5IG9ic2VydmluZyB0aGVcbiAqIGB0cmFuc2Zvcm1gIGV2ZW50LCB3aGljaCBpcyBlbWl0dGVkIHdoZW5ldmVyIGEgbmV3IGBUcmFuc2Zvcm1gIGlzIGFwcGxpZWQgdG9cbiAqIGEgc291cmNlLlxuICpcbiAqIEBleHBvcnRcbiAqIEBkZWNvcmF0b3JcbiAqIEBwYXJhbSB7U291cmNlQ2xhc3N9IEtsYXNzXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3luY2FibGUoS2xhc3M6IFNvdXJjZUNsYXNzKTogdm9pZCB7XG4gIGxldCBwcm90byA9IEtsYXNzLnByb3RvdHlwZTtcblxuICBpZiAoaXNTeW5jYWJsZShwcm90bykpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBhc3NlcnQoJ1N5bmNhYmxlIGludGVyZmFjZSBjYW4gb25seSBiZSBhcHBsaWVkIHRvIGEgU291cmNlJywgcHJvdG8gaW5zdGFuY2VvZiBTb3VyY2UpO1xuXG4gIHByb3RvW1NZTkNBQkxFXSA9IHRydWU7XG5cbiAgcHJvdG8uc3luYyA9IGZ1bmN0aW9uKHRyYW5zZm9ybU9yVHJhbnNmb3JtczogVHJhbnNmb3JtIHwgVHJhbnNmb3JtW10pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoaXNBcnJheSh0cmFuc2Zvcm1PclRyYW5zZm9ybXMpKSB7XG4gICAgICBjb25zdCB0cmFuc2Zvcm1zID0gPFRyYW5zZm9ybVtdPnRyYW5zZm9ybU9yVHJhbnNmb3JtcztcblxuICAgICAgcmV0dXJuIHRyYW5zZm9ybXMucmVkdWNlKChjaGFpbiwgdHJhbnNmb3JtKSA9PiB7XG4gICAgICAgIHJldHVybiBjaGFpbi50aGVuKCgpID0+IHRoaXMuc3luYyh0cmFuc2Zvcm0pKTtcbiAgICAgIH0sIE9yYml0LlByb21pc2UucmVzb2x2ZSgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdHJhbnNmb3JtID0gPFRyYW5zZm9ybT50cmFuc2Zvcm1PclRyYW5zZm9ybXM7XG5cbiAgICAgIGlmICh0aGlzLnRyYW5zZm9ybUxvZy5jb250YWlucyh0cmFuc2Zvcm0uaWQpKSB7XG4gICAgICAgIHJldHVybiBPcmJpdC5Qcm9taXNlLnJlc29sdmUoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuX2VucXVldWVTeW5jKCdzeW5jJywgdHJhbnNmb3JtKTtcbiAgICB9XG4gIH1cblxuICBwcm90by5fX3N5bmNfXyA9IGZ1bmN0aW9uKHRyYW5zZm9ybTogVHJhbnNmb3JtKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKHRoaXMudHJhbnNmb3JtTG9nLmNvbnRhaW5zKHRyYW5zZm9ybS5pZCkpIHtcbiAgICAgIHJldHVybiBPcmJpdC5Qcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVsZmlsbEluU2VyaWVzKHRoaXMsICdiZWZvcmVTeW5jJywgdHJhbnNmb3JtKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy50cmFuc2Zvcm1Mb2cuY29udGFpbnModHJhbnNmb3JtLmlkKSkge1xuICAgICAgICAgIHJldHVybiBPcmJpdC5Qcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fc3luYyh0cmFuc2Zvcm0pXG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLl90cmFuc2Zvcm1lZChbdHJhbnNmb3JtXSkpXG4gICAgICAgICAgICAudGhlbigoKSA9PiBzZXR0bGVJblNlcmllcyh0aGlzLCAnc3luYycsIHRyYW5zZm9ybSkpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgcmV0dXJuIHNldHRsZUluU2VyaWVzKHRoaXMsICdzeW5jRmFpbCcsIHRyYW5zZm9ybSwgZXJyb3IpXG4gICAgICAgICAgLnRoZW4oKCkgPT4geyB0aHJvdyBlcnJvcjsgfSk7XG4gICAgICB9KTtcbiAgfVxufVxuIl19