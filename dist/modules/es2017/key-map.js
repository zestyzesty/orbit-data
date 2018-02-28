import { deepGet, deepSet, firstResult } from '@orbit/utils';
/**
 * Maintains a map between records' ids and keys.
 *
 * @export
 * @class KeyMap
 */
export default class KeyMap {
    constructor() {
        this.reset();
    }
    /**
     * Resets the contents of the key map.
     *
     * @memberof KeyMap
     */
    reset() {
        this._idsToKeys = {};
        this._keysToIds = {};
    }
    /**
     * Return a key value given a model type, key name, and id.
     *
     * @param {string} type
     * @param {string} keyName
     * @param {string} idValue
     * @returns {string}
     *
     * @memberOf KeyMap
     */
    idToKey(type, keyName, idValue) {
        return deepGet(this._idsToKeys, [type, keyName, idValue]);
    }
    /**
     * Return an id value given a model type, key name, and key value.
     *
     * @param {string} type
     * @param {string} keyName
     * @param {string} keyValue
     * @returns {string}
     *
     * @memberOf KeyMap
     */
    keyToId(type, keyName, keyValue) {
        return deepGet(this._keysToIds, [type, keyName, keyValue]);
    }
    /**
     * Store the id and key values of a record in this key map.
     *
     * @param {Record} record
     * @returns {void}
     *
     * @memberOf KeyMap
     */
    pushRecord(record) {
        const { type, id, keys } = record;
        if (!keys || !id) {
            return;
        }
        Object.keys(keys).forEach(keyName => {
            let keyValue = keys[keyName];
            if (keyValue) {
                deepSet(this._idsToKeys, [type, keyName, id], keyValue);
                deepSet(this._keysToIds, [type, keyName, keyValue], id);
            }
        });
    }
    /**
     * Given a record, find the cached id if it exists.
     *
     * @param {string} type
     * @param {Dict<string>} keys
     * @returns {string}
     *
     * @memberOf KeyMap
     */
    idFromKeys(type, keys) {
        let keyNames = Object.keys(keys);
        return firstResult(keyNames, (keyName) => {
            let keyValue = keys[keyName];
            if (keyValue) {
                return this.keyToId(type, keyName, keyValue);
            }
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5LW1hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNyYy9rZXktbWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBVSxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBUSxNQUFNLGNBQWMsQ0FBQztBQUczRTs7Ozs7R0FLRztBQUNILE1BQU0sQ0FBQyxPQUFPO0lBSVo7UUFDRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUs7UUFDSCxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsT0FBTyxDQUFDLElBQVksRUFBRSxPQUFlLEVBQUUsT0FBZTtRQUNwRCxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILE9BQU8sQ0FBQyxJQUFZLEVBQUUsT0FBZSxFQUFFLFFBQWdCO1FBQ3JELE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILFVBQVUsQ0FBQyxNQUFjO1FBQ3ZCLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQztRQUVsQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxDQUFDO1FBQ1QsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ2xDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM3QixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNiLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDeEQsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzFELENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILFVBQVUsQ0FBQyxJQUFZLEVBQUUsSUFBa0I7UUFDekMsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVqQyxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3ZDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM3QixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDL0MsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXNzZXJ0LCBkZWVwR2V0LCBkZWVwU2V0LCBmaXJzdFJlc3VsdCwgRGljdCB9IGZyb20gJ0BvcmJpdC91dGlscyc7XG5pbXBvcnQgeyBSZWNvcmQgfSBmcm9tICcuL3JlY29yZCc7XG5cbi8qKlxuICogTWFpbnRhaW5zIGEgbWFwIGJldHdlZW4gcmVjb3JkcycgaWRzIGFuZCBrZXlzLlxuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBLZXlNYXBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgS2V5TWFwIHtcbiAgcHJpdmF0ZSBfaWRzVG9LZXlzOiBEaWN0PERpY3Q8c3RyaW5nPj47XG4gIHByaXZhdGUgX2tleXNUb0lkczogRGljdDxEaWN0PHN0cmluZz4+O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucmVzZXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgdGhlIGNvbnRlbnRzIG9mIHRoZSBrZXkgbWFwLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgS2V5TWFwXG4gICAqL1xuICByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLl9pZHNUb0tleXMgPSB7fTtcbiAgICB0aGlzLl9rZXlzVG9JZHMgPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSBrZXkgdmFsdWUgZ2l2ZW4gYSBtb2RlbCB0eXBlLCBrZXkgbmFtZSwgYW5kIGlkLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5TmFtZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRWYWx1ZVxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKlxuICAgKiBAbWVtYmVyT2YgS2V5TWFwXG4gICAqL1xuICBpZFRvS2V5KHR5cGU6IHN0cmluZywga2V5TmFtZTogc3RyaW5nLCBpZFZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBkZWVwR2V0KHRoaXMuX2lkc1RvS2V5cywgW3R5cGUsIGtleU5hbWUsIGlkVmFsdWVdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYW4gaWQgdmFsdWUgZ2l2ZW4gYSBtb2RlbCB0eXBlLCBrZXkgbmFtZSwgYW5kIGtleSB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleU5hbWVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleVZhbHVlXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqXG4gICAqIEBtZW1iZXJPZiBLZXlNYXBcbiAgICovXG4gIGtleVRvSWQodHlwZTogc3RyaW5nLCBrZXlOYW1lOiBzdHJpbmcsIGtleVZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBkZWVwR2V0KHRoaXMuX2tleXNUb0lkcywgW3R5cGUsIGtleU5hbWUsIGtleVZhbHVlXSk7XG4gIH1cblxuICAvKipcbiAgICogU3RvcmUgdGhlIGlkIGFuZCBrZXkgdmFsdWVzIG9mIGEgcmVjb3JkIGluIHRoaXMga2V5IG1hcC5cbiAgICpcbiAgICogQHBhcmFtIHtSZWNvcmR9IHJlY29yZFxuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICpcbiAgICogQG1lbWJlck9mIEtleU1hcFxuICAgKi9cbiAgcHVzaFJlY29yZChyZWNvcmQ6IFJlY29yZCk6IHZvaWQge1xuICAgIGNvbnN0IHsgdHlwZSwgaWQsIGtleXMgfSA9IHJlY29yZDtcblxuICAgIGlmICgha2V5cyB8fCAhaWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBPYmplY3Qua2V5cyhrZXlzKS5mb3JFYWNoKGtleU5hbWUgPT4ge1xuICAgICAgbGV0IGtleVZhbHVlID0ga2V5c1trZXlOYW1lXTtcbiAgICAgIGlmIChrZXlWYWx1ZSkge1xuICAgICAgICBkZWVwU2V0KHRoaXMuX2lkc1RvS2V5cywgW3R5cGUsIGtleU5hbWUsIGlkXSwga2V5VmFsdWUpO1xuICAgICAgICBkZWVwU2V0KHRoaXMuX2tleXNUb0lkcywgW3R5cGUsIGtleU5hbWUsIGtleVZhbHVlXSwgaWQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdpdmVuIGEgcmVjb3JkLCBmaW5kIHRoZSBjYWNoZWQgaWQgaWYgaXQgZXhpc3RzLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge0RpY3Q8c3RyaW5nPn0ga2V5c1xuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKlxuICAgKiBAbWVtYmVyT2YgS2V5TWFwXG4gICAqL1xuICBpZEZyb21LZXlzKHR5cGU6IHN0cmluZywga2V5czogRGljdDxzdHJpbmc+KTogc3RyaW5nIHtcbiAgICBsZXQga2V5TmFtZXMgPSBPYmplY3Qua2V5cyhrZXlzKTtcblxuICAgIHJldHVybiBmaXJzdFJlc3VsdChrZXlOYW1lcywgKGtleU5hbWUpID0+IHtcbiAgICAgIGxldCBrZXlWYWx1ZSA9IGtleXNba2V5TmFtZV07XG4gICAgICBpZiAoa2V5VmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5VG9JZCh0eXBlLCBrZXlOYW1lLCBrZXlWYWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==