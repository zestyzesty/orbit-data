import Orbit from '../main';
import { assert, isArray } from '@orbit/utils';
import { fulfillInSeries, settleInSeries } from '@orbit/core';
import { Source } from '../source';
export var SYNCABLE = '__syncable__';
/**
 * Has a source been decorated as `@syncable`?
 *
 * @export
 * @param {SourceClass} source
 * @returns
 */
export function isSyncable(source) {
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
export default function syncable(Klass) {
    var proto = Klass.prototype;
    if (isSyncable(proto)) {
        return;
    }
    assert('Syncable interface can only be applied to a Source', proto instanceof Source);
    proto[SYNCABLE] = true;
    proto.sync = function (transformOrTransforms) {
        var _this = this;

        if (isArray(transformOrTransforms)) {
            var transforms = transformOrTransforms;
            return transforms.reduce(function (chain, transform) {
                return chain.then(function () {
                    return _this.sync(transform);
                });
            }, Orbit.Promise.resolve());
        } else {
            var transform = transformOrTransforms;
            if (this.transformLog.contains(transform.id)) {
                return Orbit.Promise.resolve();
            }
            return this._enqueueSync('sync', transform);
        }
    };
    proto.__sync__ = function (transform) {
        var _this2 = this;

        if (this.transformLog.contains(transform.id)) {
            return Orbit.Promise.resolve();
        }
        return fulfillInSeries(this, 'beforeSync', transform).then(function () {
            if (_this2.transformLog.contains(transform.id)) {
                return Orbit.Promise.resolve();
            } else {
                return _this2._sync(transform).then(function () {
                    return _this2._transformed([transform]);
                }).then(function () {
                    return settleInSeries(_this2, 'sync', transform);
                });
            }
        }).catch(function (error) {
            return settleInSeries(_this2, 'syncFail', transform, error).then(function () {
                throw error;
            });
        });
    };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luY2FibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc291cmNlLWludGVyZmFjZXMvc3luY2FibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxBQUFLLFdBQU0sQUFBUyxBQUFDO0FBQzVCLEFBQU8sU0FBRSxBQUFNLFFBQUUsQUFBTyxBQUFFLGVBQU0sQUFBYyxBQUFDO0FBQy9DLEFBQU8sU0FBRSxBQUFlLGlCQUFFLEFBQWMsQUFBRSxzQkFBTSxBQUFhLEFBQUM7QUFDOUQsQUFBTyxTQUFFLEFBQU0sQUFBZSxjQUFNLEFBQVcsQUFBQztBQUdoRCxBQUFNLE9BQUMsSUFBTSxBQUFRLFdBQUcsQUFBYyxBQUFDO0FBRXZDLEFBTUc7Ozs7Ozs7QUFDSCxBQUFNLDJCQUFxQixBQUFjO0FBQ3ZDLEFBQU0sV0FBQyxDQUFDLENBQUMsQUFBTSxPQUFDLEFBQVEsQUFBQyxBQUFDLEFBQzVCO0FBQUM7QUFzQkQsQUFlRzs7Ozs7Ozs7Ozs7Ozs7OztBQUNILEFBQU0sQUFBQyxBQUFPLGlDQUFtQixBQUFrQjtBQUNqRCxRQUFJLEFBQUssUUFBRyxBQUFLLE1BQUMsQUFBUyxBQUFDO0FBRTVCLEFBQUUsQUFBQyxRQUFDLEFBQVUsV0FBQyxBQUFLLEFBQUMsQUFBQyxRQUFDLEFBQUM7QUFDdEIsQUFBTSxBQUFDLEFBQ1Q7QUFBQztBQUVELEFBQU0sV0FBQyxBQUFvRCxzREFBRSxBQUFLLGlCQUFZLEFBQU0sQUFBQyxBQUFDO0FBRXRGLEFBQUssVUFBQyxBQUFRLEFBQUMsWUFBRyxBQUFJLEFBQUM7QUFFdkIsQUFBSyxVQUFDLEFBQUksT0FBRyxVQUFTLEFBQThDOzs7QUFDbEUsQUFBRSxBQUFDLFlBQUMsQUFBTyxRQUFDLEFBQXFCLEFBQUMsQUFBQyx3QkFBQyxBQUFDO0FBQ25DLGdCQUFNLEFBQVUsYUFBZ0IsQUFBcUIsQUFBQztBQUV0RCxBQUFNLDhCQUFZLEFBQU0sT0FBQyxVQUFDLEFBQUssT0FBRSxBQUFTLEFBQUUsQUFBRTtBQUM1QyxBQUFNLDZCQUFPLEFBQUk7QUFBQyxBQUFHLEFBQUUsMkJBQUMsQUFBSSxNQUFDLEFBQUksS0FBQyxBQUFTLEFBQUMsQUFBQyxBQUFDLEFBQ2hEO2lCQURTLEFBQUs7QUFDYixhQUZNLEFBQVUsRUFFZCxBQUFLLE1BQUMsQUFBTyxRQUFDLEFBQU8sQUFBRSxBQUFDLEFBQUMsQUFDOUI7QUFBQyxBQUFDLEFBQUksZUFBQyxBQUFDO0FBQ04sZ0JBQU0sQUFBUyxZQUFjLEFBQXFCLEFBQUM7QUFFbkQsQUFBRSxBQUFDLGdCQUFDLEFBQUksS0FBQyxBQUFZLGFBQUMsQUFBUSxTQUFDLEFBQVMsVUFBQyxBQUFFLEFBQUMsQUFBQyxLQUFDLEFBQUM7QUFDN0MsQUFBTSx1QkFBQyxBQUFLLE1BQUMsQUFBTyxRQUFDLEFBQU8sQUFBRSxBQUFDLEFBQ2pDO0FBQUM7QUFFRCxBQUFNLG1CQUFDLEFBQUksS0FBQyxBQUFZLGFBQUMsQUFBTSxRQUFFLEFBQVMsQUFBQyxBQUFDLEFBQzlDO0FBQUMsQUFDSDtBQUFDO0FBRUQsQUFBSyxVQUFDLEFBQVEsV0FBRyxVQUFTLEFBQW9COzs7QUFDNUMsQUFBRSxBQUFDLFlBQUMsQUFBSSxLQUFDLEFBQVksYUFBQyxBQUFRLFNBQUMsQUFBUyxVQUFDLEFBQUUsQUFBQyxBQUFDLEtBQUMsQUFBQztBQUM3QyxBQUFNLG1CQUFDLEFBQUssTUFBQyxBQUFPLFFBQUMsQUFBTyxBQUFFLEFBQUMsQUFDakM7QUFBQztBQUVELEFBQU0sK0JBQWlCLEFBQUksTUFBRSxBQUFZLGNBQUUsQUFBUyxBQUFDLFdBQ2xELEFBQUksS0FBQyxBQUFHLEFBQUU7QUFDVCxBQUFFLEFBQUMsZ0JBQUMsQUFBSSxPQUFDLEFBQVksYUFBQyxBQUFRLFNBQUMsQUFBUyxVQUFDLEFBQUUsQUFBQyxBQUFDLEtBQUMsQUFBQztBQUM3QyxBQUFNLHVCQUFDLEFBQUssTUFBQyxBQUFPLFFBQUMsQUFBTyxBQUFFLEFBQUMsQUFDakM7QUFBQyxBQUFDLEFBQUksbUJBQUMsQUFBQztBQUNOLEFBQU0sOEJBQU0sQUFBSyxNQUFDLEFBQVMsQUFBQyxXQUN6QixBQUFJO0FBQUMsQUFBRyxBQUFFLDJCQUFDLEFBQUksT0FBQyxBQUFZLGFBQUMsQ0FBQyxBQUFTLEFBQUMsQUFBQyxBQUFDO2lCQUR0QyxBQUFJLEVBRVIsQUFBSTtBQUFDLEFBQUcsQUFBRSwyQkFBQyxBQUFjLEFBQUMsQUFBSSx1QkFBRSxBQUFNLFFBQUUsQUFBUyxBQUFDLEFBQUMsQUFBQyxBQUN6RDs7QUFBQyxBQUNIO0FBQUMsQUFBQyxTQVRHLEFBQWUsRUFVbkIsQUFBSyxNQUFDLEFBQUssQUFBQyxBQUFFO0FBQ2IsQUFBTSwwQ0FBc0IsQUFBVSxZQUFFLEFBQVMsV0FBRSxBQUFLLEFBQUMsT0FDdEQsQUFBSSxLQUFDLEFBQUcsQUFBRTtBQUFHLHNCQUFNLEFBQUssQUFBQyxBQUFDO0FBQUMsQUFBQyxBQUFDLEFBQ2xDLGFBRlMsQUFBYyxBQUFDLEFBQUk7QUFFM0IsQUFBQyxBQUFDLEFBQ1A7QUFBQyxBQUNIO0FBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgT3JiaXQgZnJvbSAnLi4vbWFpbic7XG5pbXBvcnQgeyBhc3NlcnQsIGlzQXJyYXkgfSBmcm9tICdAb3JiaXQvdXRpbHMnO1xuaW1wb3J0IHsgZnVsZmlsbEluU2VyaWVzLCBzZXR0bGVJblNlcmllcyB9IGZyb20gJ0BvcmJpdC9jb3JlJztcbmltcG9ydCB7IFNvdXJjZSwgU291cmNlQ2xhc3MgfSBmcm9tICcuLi9zb3VyY2UnO1xuaW1wb3J0IHsgVHJhbnNmb3JtIH0gZnJvbSAnLi4vdHJhbnNmb3JtJztcblxuZXhwb3J0IGNvbnN0IFNZTkNBQkxFID0gJ19fc3luY2FibGVfXyc7XG5cbi8qKlxuICogSGFzIGEgc291cmNlIGJlZW4gZGVjb3JhdGVkIGFzIGBAc3luY2FibGVgP1xuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7U291cmNlQ2xhc3N9IHNvdXJjZVxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3luY2FibGUoc291cmNlOiBTb3VyY2UpIHtcbiAgcmV0dXJuICEhc291cmNlW1NZTkNBQkxFXTtcbn1cblxuLyoqXG4gKiBBIHNvdXJjZSBkZWNvcmF0ZWQgYXMgYEBzeW5jYWJsZWAgbXVzdCBhbHNvIGltcGxlbWVudCB0aGUgYFN5bmNhYmxlYFxuICogaW50ZXJmYWNlLlxuICpcbiAqIEBleHBvcnRcbiAqIEBpbnRlcmZhY2UgU3luY2FibGVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTeW5jYWJsZSB7XG4gIC8qKlxuICAgKiBUaGUgYHN5bmNgIG1ldGhvZCB0byBhIHNvdXJjZS4gVGhpcyBtZXRob2QgYWNjZXB0cyBhIGBUcmFuc2Zvcm1gIG9yIGFycmF5XG4gICAqIG9mIGBUcmFuc2Zvcm1gcyBhcyBhbiBhcmd1bWVudCBhbmQgYXBwbGllcyBpdCB0byB0aGUgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0geyhUcmFuc2Zvcm0gfCBUcmFuc2Zvcm1bXSl9IHRyYW5zZm9ybU9yVHJhbnNmb3Jtc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICpcbiAgICogQG1lbWJlck9mIFN5bmNhYmxlXG4gICAqL1xuICBzeW5jKHRyYW5zZm9ybU9yVHJhbnNmb3JtczogVHJhbnNmb3JtIHwgVHJhbnNmb3JtW10pOiBQcm9taXNlPHZvaWQ+O1xufVxuXG4vKipcbiAqIE1hcmtzIGEgc291cmNlIGFzIFwic3luY2FibGVcIiBhbmQgYWRkcyBhbiBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgYFN5bmNhYmxlYFxuICogaW50ZXJmYWNlLlxuICpcbiAqIFRoZSBgc3luY2AgbWV0aG9kIGlzIHBhcnQgb2YgdGhlIFwic3luYyBmbG93XCIgaW4gT3JiaXQuIFRoaXMgZmxvdyBpcyB1c2VkIHRvXG4gKiBzeW5jaHJvbml6ZSB0aGUgY29udGVudHMgb2Ygc291cmNlcy5cbiAqXG4gKiBPdGhlciBzb3VyY2VzIGNhbiBwYXJ0aWNpcGF0ZSBpbiB0aGUgcmVzb2x1dGlvbiBvZiBhIGBzeW5jYCBieSBvYnNlcnZpbmcgdGhlXG4gKiBgdHJhbnNmb3JtYCBldmVudCwgd2hpY2ggaXMgZW1pdHRlZCB3aGVuZXZlciBhIG5ldyBgVHJhbnNmb3JtYCBpcyBhcHBsaWVkIHRvXG4gKiBhIHNvdXJjZS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAZGVjb3JhdG9yXG4gKiBAcGFyYW0ge1NvdXJjZUNsYXNzfSBLbGFzc1xuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN5bmNhYmxlKEtsYXNzOiBTb3VyY2VDbGFzcyk6IHZvaWQge1xuICBsZXQgcHJvdG8gPSBLbGFzcy5wcm90b3R5cGU7XG5cbiAgaWYgKGlzU3luY2FibGUocHJvdG8pKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgYXNzZXJ0KCdTeW5jYWJsZSBpbnRlcmZhY2UgY2FuIG9ubHkgYmUgYXBwbGllZCB0byBhIFNvdXJjZScsIHByb3RvIGluc3RhbmNlb2YgU291cmNlKTtcblxuICBwcm90b1tTWU5DQUJMRV0gPSB0cnVlO1xuXG4gIHByb3RvLnN5bmMgPSBmdW5jdGlvbih0cmFuc2Zvcm1PclRyYW5zZm9ybXM6IFRyYW5zZm9ybSB8IFRyYW5zZm9ybVtdKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKGlzQXJyYXkodHJhbnNmb3JtT3JUcmFuc2Zvcm1zKSkge1xuICAgICAgY29uc3QgdHJhbnNmb3JtcyA9IDxUcmFuc2Zvcm1bXT50cmFuc2Zvcm1PclRyYW5zZm9ybXM7XG5cbiAgICAgIHJldHVybiB0cmFuc2Zvcm1zLnJlZHVjZSgoY2hhaW4sIHRyYW5zZm9ybSkgPT4ge1xuICAgICAgICByZXR1cm4gY2hhaW4udGhlbigoKSA9PiB0aGlzLnN5bmModHJhbnNmb3JtKSk7XG4gICAgICB9LCBPcmJpdC5Qcm9taXNlLnJlc29sdmUoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRyYW5zZm9ybSA9IDxUcmFuc2Zvcm0+dHJhbnNmb3JtT3JUcmFuc2Zvcm1zO1xuXG4gICAgICBpZiAodGhpcy50cmFuc2Zvcm1Mb2cuY29udGFpbnModHJhbnNmb3JtLmlkKSkge1xuICAgICAgICByZXR1cm4gT3JiaXQuUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLl9lbnF1ZXVlU3luYygnc3luYycsIHRyYW5zZm9ybSk7XG4gICAgfVxuICB9XG5cbiAgcHJvdG8uX19zeW5jX18gPSBmdW5jdGlvbih0cmFuc2Zvcm06IFRyYW5zZm9ybSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICh0aGlzLnRyYW5zZm9ybUxvZy5jb250YWlucyh0cmFuc2Zvcm0uaWQpKSB7XG4gICAgICByZXR1cm4gT3JiaXQuUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bGZpbGxJblNlcmllcyh0aGlzLCAnYmVmb3JlU3luYycsIHRyYW5zZm9ybSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMudHJhbnNmb3JtTG9nLmNvbnRhaW5zKHRyYW5zZm9ybS5pZCkpIHtcbiAgICAgICAgICByZXR1cm4gT3JiaXQuUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX3N5bmModHJhbnNmb3JtKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5fdHJhbnNmb3JtZWQoW3RyYW5zZm9ybV0pKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gc2V0dGxlSW5TZXJpZXModGhpcywgJ3N5bmMnLCB0cmFuc2Zvcm0pKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIHJldHVybiBzZXR0bGVJblNlcmllcyh0aGlzLCAnc3luY0ZhaWwnLCB0cmFuc2Zvcm0sIGVycm9yKVxuICAgICAgICAgIC50aGVuKCgpID0+IHsgdGhyb3cgZXJyb3I7IH0pO1xuICAgICAgfSk7XG4gIH1cbn1cbiJdfQ==