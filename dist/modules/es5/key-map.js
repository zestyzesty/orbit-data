function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { deepGet, deepSet, firstResult } from '@orbit/utils';
/**
 * Maintains a map between records' ids and keys.
 *
 * @export
 * @class KeyMap
 */

var KeyMap = function () {
    function KeyMap() {
        _classCallCheck(this, KeyMap);

        this.reset();
    }
    /**
     * Resets the contents of the key map.
     *
     * @memberof KeyMap
     */


    KeyMap.prototype.reset = function reset() {
        this._idsToKeys = {};
        this._keysToIds = {};
    };
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


    KeyMap.prototype.idToKey = function idToKey(type, keyName, idValue) {
        return deepGet(this._idsToKeys, [type, keyName, idValue]);
    };
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


    KeyMap.prototype.keyToId = function keyToId(type, keyName, keyValue) {
        return deepGet(this._keysToIds, [type, keyName, keyValue]);
    };
    /**
     * Store the id and key values of a record in this key map.
     *
     * @param {Record} record
     * @returns {void}
     *
     * @memberOf KeyMap
     */


    KeyMap.prototype.pushRecord = function pushRecord(record) {
        var _this = this;

        var type = record.type,
            id = record.id,
            keys = record.keys;

        if (!keys || !id) {
            return;
        }
        Object.keys(keys).forEach(function (keyName) {
            var keyValue = keys[keyName];
            if (keyValue) {
                deepSet(_this._idsToKeys, [type, keyName, id], keyValue);
                deepSet(_this._keysToIds, [type, keyName, keyValue], id);
            }
        });
    };
    /**
     * Given a record, find the cached id if it exists.
     *
     * @param {string} type
     * @param {Dict<string>} keys
     * @returns {string}
     *
     * @memberOf KeyMap
     */


    KeyMap.prototype.idFromKeys = function idFromKeys(type, keys) {
        var _this2 = this;

        var keyNames = Object.keys(keys);
        return firstResult(keyNames, function (keyName) {
            var keyValue = keys[keyName];
            if (keyValue) {
                return _this2.keyToId(type, keyName, keyValue);
            }
        });
    };

    return KeyMap;
}();

export default KeyMap;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5LW1hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNyYy9rZXktbWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsQUFBTyxTQUFVLEFBQU8sU0FBRSxBQUFPLFNBQUUsQUFBVyxBQUFRLG1CQUFNLEFBQWMsQUFBQztBQUczRSxBQUtHLEFBQ0gsQUFBTSxBQUFDLEFBQU87Ozs7Ozs7O0FBSVo7OztBQUNFLEFBQUksYUFBQyxBQUFLLEFBQUUsQUFBQyxBQUNmO0FBQUM7QUFFRCxBQUlHOzs7Ozs7O3FCQUNILEFBQUs7QUFDSCxBQUFJLGFBQUMsQUFBVSxhQUFHLEFBQUUsQUFBQztBQUNyQixBQUFJLGFBQUMsQUFBVSxhQUFHLEFBQUUsQUFBQyxBQUN2QjtBQUFDO0FBRUQsQUFTRzs7Ozs7Ozs7Ozs7O3FCQUNILEFBQU8sMkJBQUMsQUFBWSxNQUFFLEFBQWUsU0FBRSxBQUFlO0FBQ3BELEFBQU0sZUFBQyxBQUFPLFFBQUMsQUFBSSxLQUFDLEFBQVUsWUFBRSxDQUFDLEFBQUksTUFBRSxBQUFPLFNBQUUsQUFBTyxBQUFDLEFBQUMsQUFBQyxBQUM1RDtBQUFDO0FBRUQsQUFTRzs7Ozs7Ozs7Ozs7O3FCQUNILEFBQU8sMkJBQUMsQUFBWSxNQUFFLEFBQWUsU0FBRSxBQUFnQjtBQUNyRCxBQUFNLGVBQUMsQUFBTyxRQUFDLEFBQUksS0FBQyxBQUFVLFlBQUUsQ0FBQyxBQUFJLE1BQUUsQUFBTyxTQUFFLEFBQVEsQUFBQyxBQUFDLEFBQUMsQUFDN0Q7QUFBQztBQUVELEFBT0c7Ozs7Ozs7Ozs7cUJBQ0gsQUFBVSxpQ0FBQyxBQUFjO0FBQ3ZCLEFBQU07O1lBQUUsQUFBSTtZQUFFLEFBQUUsS0FBVyxBQUFNLEFBQUM7WUFBaEIsQUFBSSxBQUFFOztBQUV4QixBQUFFLEFBQUMsWUFBQyxDQUFDLEFBQUksUUFBSSxDQUFDLEFBQUUsQUFBQyxJQUFDLEFBQUM7QUFDakIsQUFBTSxBQUFDLEFBQ1Q7QUFBQztBQUVELEFBQU0sZUFBQyxBQUFJLEtBQUMsQUFBSSxBQUFDLE1BQUMsQUFBTyxRQUFDLEFBQU8sQUFBQyxBQUFFO0FBQ2xDLGdCQUFJLEFBQVEsV0FBRyxBQUFJLEtBQUMsQUFBTyxBQUFDLEFBQUM7QUFDN0IsQUFBRSxBQUFDLGdCQUFDLEFBQVEsQUFBQyxVQUFDLEFBQUM7QUFDYixBQUFPLHdCQUFDLEFBQUksTUFBQyxBQUFVLFlBQUUsQ0FBQyxBQUFJLE1BQUUsQUFBTyxTQUFFLEFBQUUsQUFBQyxLQUFFLEFBQVEsQUFBQyxBQUFDO0FBQ3hELEFBQU8sd0JBQUMsQUFBSSxNQUFDLEFBQVUsWUFBRSxDQUFDLEFBQUksTUFBRSxBQUFPLFNBQUUsQUFBUSxBQUFDLFdBQUUsQUFBRSxBQUFDLEFBQUMsQUFDMUQ7QUFBQyxBQUNIO0FBQUMsQUFBQyxBQUFDLEFBQ0w7QUFBQztBQUVELEFBUUc7Ozs7Ozs7Ozs7O3FCQUNILEFBQVUsaUNBQUMsQUFBWSxNQUFFLEFBQWtCOzs7QUFDekMsWUFBSSxBQUFRLFdBQUcsQUFBTSxPQUFDLEFBQUksS0FBQyxBQUFJLEFBQUMsQUFBQztBQUVqQyxBQUFNLDJCQUFhLEFBQVEsVUFBRSxVQUFDLEFBQU8sQUFBRSxBQUFFO0FBQ3ZDLGdCQUFJLEFBQVEsV0FBRyxBQUFJLEtBQUMsQUFBTyxBQUFDLEFBQUM7QUFDN0IsQUFBRSxBQUFDLGdCQUFDLEFBQVEsQUFBQyxVQUFDLEFBQUM7QUFDYixBQUFNLHVCQUFDLEFBQUksT0FBQyxBQUFPLFFBQUMsQUFBSSxNQUFFLEFBQU8sU0FBRSxBQUFRLEFBQUMsQUFBQyxBQUMvQztBQUFDLEFBQ0g7QUFBQyxBQUFDLEFBQUMsQUFDTCxTQU5TLEFBQVc7QUFNbkIsQUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFzc2VydCwgZGVlcEdldCwgZGVlcFNldCwgZmlyc3RSZXN1bHQsIERpY3QgfSBmcm9tICdAb3JiaXQvdXRpbHMnO1xuaW1wb3J0IHsgUmVjb3JkIH0gZnJvbSAnLi9yZWNvcmQnO1xuXG4vKipcbiAqIE1haW50YWlucyBhIG1hcCBiZXR3ZWVuIHJlY29yZHMnIGlkcyBhbmQga2V5cy5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgS2V5TWFwXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtleU1hcCB7XG4gIHByaXZhdGUgX2lkc1RvS2V5czogRGljdDxEaWN0PHN0cmluZz4+O1xuICBwcml2YXRlIF9rZXlzVG9JZHM6IERpY3Q8RGljdDxzdHJpbmc+PjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnJlc2V0KCk7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIHRoZSBjb250ZW50cyBvZiB0aGUga2V5IG1hcC5cbiAgICpcbiAgICogQG1lbWJlcm9mIEtleU1hcFxuICAgKi9cbiAgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5faWRzVG9LZXlzID0ge307XG4gICAgdGhpcy5fa2V5c1RvSWRzID0ge307XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGEga2V5IHZhbHVlIGdpdmVuIGEgbW9kZWwgdHlwZSwga2V5IG5hbWUsIGFuZCBpZC5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleU5hbWVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkVmFsdWVcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICpcbiAgICogQG1lbWJlck9mIEtleU1hcFxuICAgKi9cbiAgaWRUb0tleSh0eXBlOiBzdHJpbmcsIGtleU5hbWU6IHN0cmluZywgaWRWYWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZGVlcEdldCh0aGlzLl9pZHNUb0tleXMsIFt0eXBlLCBrZXlOYW1lLCBpZFZhbHVlXSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGFuIGlkIHZhbHVlIGdpdmVuIGEgbW9kZWwgdHlwZSwga2V5IG5hbWUsIGFuZCBrZXkgdmFsdWUuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlOYW1lXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlWYWx1ZVxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKlxuICAgKiBAbWVtYmVyT2YgS2V5TWFwXG4gICAqL1xuICBrZXlUb0lkKHR5cGU6IHN0cmluZywga2V5TmFtZTogc3RyaW5nLCBrZXlWYWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZGVlcEdldCh0aGlzLl9rZXlzVG9JZHMsIFt0eXBlLCBrZXlOYW1lLCBrZXlWYWx1ZV0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3JlIHRoZSBpZCBhbmQga2V5IHZhbHVlcyBvZiBhIHJlY29yZCBpbiB0aGlzIGtleSBtYXAuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVjb3JkfSByZWNvcmRcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqXG4gICAqIEBtZW1iZXJPZiBLZXlNYXBcbiAgICovXG4gIHB1c2hSZWNvcmQocmVjb3JkOiBSZWNvcmQpOiB2b2lkIHtcbiAgICBjb25zdCB7IHR5cGUsIGlkLCBrZXlzIH0gPSByZWNvcmQ7XG5cbiAgICBpZiAoIWtleXMgfHwgIWlkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgT2JqZWN0LmtleXMoa2V5cykuZm9yRWFjaChrZXlOYW1lID0+IHtcbiAgICAgIGxldCBrZXlWYWx1ZSA9IGtleXNba2V5TmFtZV07XG4gICAgICBpZiAoa2V5VmFsdWUpIHtcbiAgICAgICAgZGVlcFNldCh0aGlzLl9pZHNUb0tleXMsIFt0eXBlLCBrZXlOYW1lLCBpZF0sIGtleVZhbHVlKTtcbiAgICAgICAgZGVlcFNldCh0aGlzLl9rZXlzVG9JZHMsIFt0eXBlLCBrZXlOYW1lLCBrZXlWYWx1ZV0sIGlkKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHaXZlbiBhIHJlY29yZCwgZmluZCB0aGUgY2FjaGVkIGlkIGlmIGl0IGV4aXN0cy5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtIHtEaWN0PHN0cmluZz59IGtleXNcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICpcbiAgICogQG1lbWJlck9mIEtleU1hcFxuICAgKi9cbiAgaWRGcm9tS2V5cyh0eXBlOiBzdHJpbmcsIGtleXM6IERpY3Q8c3RyaW5nPik6IHN0cmluZyB7XG4gICAgbGV0IGtleU5hbWVzID0gT2JqZWN0LmtleXMoa2V5cyk7XG5cbiAgICByZXR1cm4gZmlyc3RSZXN1bHQoa2V5TmFtZXMsIChrZXlOYW1lKSA9PiB7XG4gICAgICBsZXQga2V5VmFsdWUgPSBrZXlzW2tleU5hbWVdO1xuICAgICAgaWYgKGtleVZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmtleVRvSWQodHlwZSwga2V5TmFtZSwga2V5VmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=