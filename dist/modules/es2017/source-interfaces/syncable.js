import Orbit from '../main';
import { assert, isArray } from '@orbit/utils';
import { fulfillInSeries, settleInSeries } from '@orbit/core';
import { Source } from '../source';
export const SYNCABLE = '__syncable__';
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
    let proto = Klass.prototype;
    if (isSyncable(proto)) {
        return;
    }
    assert('Syncable interface can only be applied to a Source', proto instanceof Source);
    proto[SYNCABLE] = true;
    proto.sync = function (transformOrTransforms) {
        if (isArray(transformOrTransforms)) {
            const transforms = transformOrTransforms;
            return transforms.reduce((chain, transform) => {
                return chain.then(() => this.sync(transform));
            }, Orbit.Promise.resolve());
        }
        else {
            const transform = transformOrTransforms;
            if (this.transformLog.contains(transform.id)) {
                return Orbit.Promise.resolve();
            }
            return this._enqueueSync('sync', transform);
        }
    };
    proto.__sync__ = function (transform) {
        if (this.transformLog.contains(transform.id)) {
            return Orbit.Promise.resolve();
        }
        return fulfillInSeries(this, 'beforeSync', transform)
            .then(() => {
            if (this.transformLog.contains(transform.id)) {
                return Orbit.Promise.resolve();
            }
            else {
                return this._sync(transform)
                    .then(() => this._transformed([transform]))
                    .then(() => settleInSeries(this, 'sync', transform));
            }
        })
            .catch(error => {
            return settleInSeries(this, 'syncFail', transform, error)
                .then(() => { throw error; });
        });
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luY2FibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc291cmNlLWludGVyZmFjZXMvc3luY2FibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLE1BQU0sU0FBUyxDQUFDO0FBQzVCLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzlELE9BQU8sRUFBRSxNQUFNLEVBQWUsTUFBTSxXQUFXLENBQUM7QUFHaEQsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUFHLGNBQWMsQ0FBQztBQUV2Qzs7Ozs7O0dBTUc7QUFDSCxNQUFNLHFCQUFxQixNQUFjO0lBQ3ZDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzVCLENBQUM7QUFzQkQ7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sbUJBQW1CLEtBQWtCO0lBQ2pELElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7SUFFNUIsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixNQUFNLENBQUM7SUFDVCxDQUFDO0lBRUQsTUFBTSxDQUFDLG9EQUFvRCxFQUFFLEtBQUssWUFBWSxNQUFNLENBQUMsQ0FBQztJQUV0RixLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBRXZCLEtBQUssQ0FBQyxJQUFJLEdBQUcsVUFBUyxxQkFBOEM7UUFDbEUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLE1BQU0sVUFBVSxHQUFnQixxQkFBcUIsQ0FBQztZQUV0RCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFBRTtnQkFDNUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2hELENBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDOUIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxTQUFTLEdBQWMscUJBQXFCLENBQUM7WUFFbkQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0MsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDakMsQ0FBQztZQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztRQUM5QyxDQUFDO0lBQ0gsQ0FBQyxDQUFBO0lBRUQsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFTLFNBQW9CO1FBQzVDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0MsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDakMsQ0FBQztRQUVELE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUM7YUFDbEQsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNULEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2pDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7cUJBQ3pCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztxQkFDMUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDekQsQ0FBQztRQUNILENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNiLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDO2lCQUN0RCxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQTtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgT3JiaXQgZnJvbSAnLi4vbWFpbic7XG5pbXBvcnQgeyBhc3NlcnQsIGlzQXJyYXkgfSBmcm9tICdAb3JiaXQvdXRpbHMnO1xuaW1wb3J0IHsgZnVsZmlsbEluU2VyaWVzLCBzZXR0bGVJblNlcmllcyB9IGZyb20gJ0BvcmJpdC9jb3JlJztcbmltcG9ydCB7IFNvdXJjZSwgU291cmNlQ2xhc3MgfSBmcm9tICcuLi9zb3VyY2UnO1xuaW1wb3J0IHsgVHJhbnNmb3JtIH0gZnJvbSAnLi4vdHJhbnNmb3JtJztcblxuZXhwb3J0IGNvbnN0IFNZTkNBQkxFID0gJ19fc3luY2FibGVfXyc7XG5cbi8qKlxuICogSGFzIGEgc291cmNlIGJlZW4gZGVjb3JhdGVkIGFzIGBAc3luY2FibGVgP1xuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7U291cmNlQ2xhc3N9IHNvdXJjZVxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3luY2FibGUoc291cmNlOiBTb3VyY2UpIHtcbiAgcmV0dXJuICEhc291cmNlW1NZTkNBQkxFXTtcbn1cblxuLyoqXG4gKiBBIHNvdXJjZSBkZWNvcmF0ZWQgYXMgYEBzeW5jYWJsZWAgbXVzdCBhbHNvIGltcGxlbWVudCB0aGUgYFN5bmNhYmxlYFxuICogaW50ZXJmYWNlLlxuICpcbiAqIEBleHBvcnRcbiAqIEBpbnRlcmZhY2UgU3luY2FibGVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTeW5jYWJsZSB7XG4gIC8qKlxuICAgKiBUaGUgYHN5bmNgIG1ldGhvZCB0byBhIHNvdXJjZS4gVGhpcyBtZXRob2QgYWNjZXB0cyBhIGBUcmFuc2Zvcm1gIG9yIGFycmF5XG4gICAqIG9mIGBUcmFuc2Zvcm1gcyBhcyBhbiBhcmd1bWVudCBhbmQgYXBwbGllcyBpdCB0byB0aGUgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0geyhUcmFuc2Zvcm0gfCBUcmFuc2Zvcm1bXSl9IHRyYW5zZm9ybU9yVHJhbnNmb3Jtc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICpcbiAgICogQG1lbWJlck9mIFN5bmNhYmxlXG4gICAqL1xuICBzeW5jKHRyYW5zZm9ybU9yVHJhbnNmb3JtczogVHJhbnNmb3JtIHwgVHJhbnNmb3JtW10pOiBQcm9taXNlPHZvaWQ+O1xufVxuXG4vKipcbiAqIE1hcmtzIGEgc291cmNlIGFzIFwic3luY2FibGVcIiBhbmQgYWRkcyBhbiBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgYFN5bmNhYmxlYFxuICogaW50ZXJmYWNlLlxuICpcbiAqIFRoZSBgc3luY2AgbWV0aG9kIGlzIHBhcnQgb2YgdGhlIFwic3luYyBmbG93XCIgaW4gT3JiaXQuIFRoaXMgZmxvdyBpcyB1c2VkIHRvXG4gKiBzeW5jaHJvbml6ZSB0aGUgY29udGVudHMgb2Ygc291cmNlcy5cbiAqXG4gKiBPdGhlciBzb3VyY2VzIGNhbiBwYXJ0aWNpcGF0ZSBpbiB0aGUgcmVzb2x1dGlvbiBvZiBhIGBzeW5jYCBieSBvYnNlcnZpbmcgdGhlXG4gKiBgdHJhbnNmb3JtYCBldmVudCwgd2hpY2ggaXMgZW1pdHRlZCB3aGVuZXZlciBhIG5ldyBgVHJhbnNmb3JtYCBpcyBhcHBsaWVkIHRvXG4gKiBhIHNvdXJjZS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAZGVjb3JhdG9yXG4gKiBAcGFyYW0ge1NvdXJjZUNsYXNzfSBLbGFzc1xuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN5bmNhYmxlKEtsYXNzOiBTb3VyY2VDbGFzcyk6IHZvaWQge1xuICBsZXQgcHJvdG8gPSBLbGFzcy5wcm90b3R5cGU7XG5cbiAgaWYgKGlzU3luY2FibGUocHJvdG8pKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgYXNzZXJ0KCdTeW5jYWJsZSBpbnRlcmZhY2UgY2FuIG9ubHkgYmUgYXBwbGllZCB0byBhIFNvdXJjZScsIHByb3RvIGluc3RhbmNlb2YgU291cmNlKTtcblxuICBwcm90b1tTWU5DQUJMRV0gPSB0cnVlO1xuXG4gIHByb3RvLnN5bmMgPSBmdW5jdGlvbih0cmFuc2Zvcm1PclRyYW5zZm9ybXM6IFRyYW5zZm9ybSB8IFRyYW5zZm9ybVtdKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKGlzQXJyYXkodHJhbnNmb3JtT3JUcmFuc2Zvcm1zKSkge1xuICAgICAgY29uc3QgdHJhbnNmb3JtcyA9IDxUcmFuc2Zvcm1bXT50cmFuc2Zvcm1PclRyYW5zZm9ybXM7XG5cbiAgICAgIHJldHVybiB0cmFuc2Zvcm1zLnJlZHVjZSgoY2hhaW4sIHRyYW5zZm9ybSkgPT4ge1xuICAgICAgICByZXR1cm4gY2hhaW4udGhlbigoKSA9PiB0aGlzLnN5bmModHJhbnNmb3JtKSk7XG4gICAgICB9LCBPcmJpdC5Qcm9taXNlLnJlc29sdmUoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRyYW5zZm9ybSA9IDxUcmFuc2Zvcm0+dHJhbnNmb3JtT3JUcmFuc2Zvcm1zO1xuXG4gICAgICBpZiAodGhpcy50cmFuc2Zvcm1Mb2cuY29udGFpbnModHJhbnNmb3JtLmlkKSkge1xuICAgICAgICByZXR1cm4gT3JiaXQuUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLl9lbnF1ZXVlU3luYygnc3luYycsIHRyYW5zZm9ybSk7XG4gICAgfVxuICB9XG5cbiAgcHJvdG8uX19zeW5jX18gPSBmdW5jdGlvbih0cmFuc2Zvcm06IFRyYW5zZm9ybSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICh0aGlzLnRyYW5zZm9ybUxvZy5jb250YWlucyh0cmFuc2Zvcm0uaWQpKSB7XG4gICAgICByZXR1cm4gT3JiaXQuUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bGZpbGxJblNlcmllcyh0aGlzLCAnYmVmb3JlU3luYycsIHRyYW5zZm9ybSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMudHJhbnNmb3JtTG9nLmNvbnRhaW5zKHRyYW5zZm9ybS5pZCkpIHtcbiAgICAgICAgICByZXR1cm4gT3JiaXQuUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX3N5bmModHJhbnNmb3JtKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5fdHJhbnNmb3JtZWQoW3RyYW5zZm9ybV0pKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gc2V0dGxlSW5TZXJpZXModGhpcywgJ3N5bmMnLCB0cmFuc2Zvcm0pKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIHJldHVybiBzZXR0bGVJblNlcmllcyh0aGlzLCAnc3luY0ZhaWwnLCB0cmFuc2Zvcm0sIGVycm9yKVxuICAgICAgICAgIC50aGVuKCgpID0+IHsgdGhyb3cgZXJyb3I7IH0pO1xuICAgICAgfSk7XG4gIH1cbn1cbiJdfQ==