"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require("@orbit/utils");

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

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
        return (0, _utils.deepGet)(this._idsToKeys, [type, keyName, idValue]);
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
        return (0, _utils.deepGet)(this._keysToIds, [type, keyName, keyValue]);
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
                (0, _utils.deepSet)(_this._idsToKeys, [type, keyName, id], keyValue);
                (0, _utils.deepSet)(_this._keysToIds, [type, keyName, keyValue], id);
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
        return (0, _utils.firstResult)(keyNames, function (keyName) {
            var keyValue = keys[keyName];
            if (keyValue) {
                return _this2.keyToId(type, keyName, keyValue);
            }
        });
    };

    return KeyMap;
}();

exports.default = KeyMap;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5LW1hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNyYy9rZXktbWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLEFBQU8sQUFBVSxBQUFPLEFBQUUsQUFBTyxBQUFFLEFBQVcsQUFBUSxBQUFNLEFBQWMsQUFBQzs7Ozs7Ozs7QUFHM0UsQUFLRyxBQUNILEFBQU0sQUFBQyxBQUFPOzs7Ozs7O3lCQUlaOzs4QkFDRSxBQUFJOzthQUFDLEFBQUssQUFBRSxBQUFDLEFBQ2YsQUFBQztBQUVELEFBSUc7Ozs7Ozs7cUJBQ0gsQUFBSyx5QkFDSCxBQUFJO2FBQUMsQUFBVSxhQUFHLEFBQUUsQUFBQyxBQUNyQixBQUFJO2FBQUMsQUFBVSxhQUFHLEFBQUUsQUFBQyxBQUN2QixBQUFDO0FBRUQsQUFTRzs7Ozs7Ozs7Ozs7O3FCQUNILEFBQU8sMkJBQUMsQUFBWSxNQUFFLEFBQWUsU0FBRSxBQUFlLFNBQ3BELEFBQU07ZUFBQyxBQUFPLG9CQUFDLEFBQUksS0FBQyxBQUFVLFlBQUUsQ0FBQyxBQUFJLE1BQUUsQUFBTyxTQUFFLEFBQU8sQUFBQyxBQUFDLEFBQUMsQUFDNUQsQUFBQztBQUVELEFBU0c7Ozs7Ozs7Ozs7OztxQkFDSCxBQUFPLDJCQUFDLEFBQVksTUFBRSxBQUFlLFNBQUUsQUFBZ0IsVUFDckQsQUFBTTtlQUFDLEFBQU8sb0JBQUMsQUFBSSxLQUFDLEFBQVUsWUFBRSxDQUFDLEFBQUksTUFBRSxBQUFPLFNBQUUsQUFBUSxBQUFDLEFBQUMsQUFBQyxBQUM3RCxBQUFDO0FBRUQsQUFPRzs7Ozs7Ozs7OztxQkFDSCxBQUFVLGlDQUFDLEFBQWMsUUFDdkIsQUFBTTs7O1lBQUUsQUFBSTtZQUFFLEFBQUUsS0FBVyxBQUFNLEFBQUM7WUFBaEIsQUFBSSxBQUFFLGNBRXhCLEFBQUUsQUFBQzs7WUFBQyxDQUFDLEFBQUksUUFBSSxDQUFDLEFBQUUsQUFBQyxJQUFDLEFBQUMsQUFDakIsQUFBTSxBQUFDLEFBQ1Q7QUFBQztBQUVELEFBQU07ZUFBQyxBQUFJLEtBQUMsQUFBSSxBQUFDLE1BQUMsQUFBTyxRQUFDLEFBQU8sQUFBQyxBQUFFLG1CQUNsQztnQkFBSSxBQUFRLFdBQUcsQUFBSSxLQUFDLEFBQU8sQUFBQyxBQUFDLEFBQzdCLEFBQUUsQUFBQztnQkFBQyxBQUFRLEFBQUMsVUFBQyxBQUFDLEFBQ2IsQUFBTztvQ0FBQyxBQUFJLE1BQUMsQUFBVSxZQUFFLENBQUMsQUFBSSxNQUFFLEFBQU8sU0FBRSxBQUFFLEFBQUMsS0FBRSxBQUFRLEFBQUMsQUFBQyxBQUN4RCxBQUFPO29DQUFDLEFBQUksTUFBQyxBQUFVLFlBQUUsQ0FBQyxBQUFJLE1BQUUsQUFBTyxTQUFFLEFBQVEsQUFBQyxXQUFFLEFBQUUsQUFBQyxBQUFDLEFBQzFELEFBQUMsQUFDSDtBQUFDLEFBQUMsQUFBQyxBQUNMO0FBQUM7QUFFRCxBQVFHOzs7Ozs7Ozs7OztxQkFDSCxBQUFVLGlDQUFDLEFBQVksTUFBRSxBQUFrQjtxQkFDekM7O1lBQUksQUFBUSxXQUFHLEFBQU0sT0FBQyxBQUFJLEtBQUMsQUFBSSxBQUFDLEFBQUMsQUFFakMsQUFBTTt1Q0FBYSxBQUFRLFVBQUUsVUFBQyxBQUFPLEFBQUUsQUFBRSxTQUN2QztnQkFBSSxBQUFRLFdBQUcsQUFBSSxLQUFDLEFBQU8sQUFBQyxBQUFDLEFBQzdCLEFBQUUsQUFBQztnQkFBQyxBQUFRLEFBQUMsVUFBQyxBQUFDLEFBQ2IsQUFBTTt1QkFBQyxBQUFJLE9BQUMsQUFBTyxRQUFDLEFBQUksTUFBRSxBQUFPLFNBQUUsQUFBUSxBQUFDLEFBQUMsQUFDL0MsQUFBQyxBQUNIO0FBQUMsQUFBQyxBQUFDLEFBQ0w7QUFOUyxBQUFXLEFBTW5CLEFBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhc3NlcnQsIGRlZXBHZXQsIGRlZXBTZXQsIGZpcnN0UmVzdWx0LCBEaWN0IH0gZnJvbSAnQG9yYml0L3V0aWxzJztcbmltcG9ydCB7IFJlY29yZCB9IGZyb20gJy4vcmVjb3JkJztcblxuLyoqXG4gKiBNYWludGFpbnMgYSBtYXAgYmV0d2VlbiByZWNvcmRzJyBpZHMgYW5kIGtleXMuXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIEtleU1hcFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBLZXlNYXAge1xuICBwcml2YXRlIF9pZHNUb0tleXM6IERpY3Q8RGljdDxzdHJpbmc+PjtcbiAgcHJpdmF0ZSBfa2V5c1RvSWRzOiBEaWN0PERpY3Q8c3RyaW5nPj47XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5yZXNldCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGUgY29udGVudHMgb2YgdGhlIGtleSBtYXAuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBLZXlNYXBcbiAgICovXG4gIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuX2lkc1RvS2V5cyA9IHt9O1xuICAgIHRoaXMuX2tleXNUb0lkcyA9IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIGtleSB2YWx1ZSBnaXZlbiBhIG1vZGVsIHR5cGUsIGtleSBuYW1lLCBhbmQgaWQuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlOYW1lXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFZhbHVlXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqXG4gICAqIEBtZW1iZXJPZiBLZXlNYXBcbiAgICovXG4gIGlkVG9LZXkodHlwZTogc3RyaW5nLCBrZXlOYW1lOiBzdHJpbmcsIGlkVmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGRlZXBHZXQodGhpcy5faWRzVG9LZXlzLCBbdHlwZSwga2V5TmFtZSwgaWRWYWx1ZV0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhbiBpZCB2YWx1ZSBnaXZlbiBhIG1vZGVsIHR5cGUsIGtleSBuYW1lLCBhbmQga2V5IHZhbHVlLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5TmFtZVxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5VmFsdWVcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICpcbiAgICogQG1lbWJlck9mIEtleU1hcFxuICAgKi9cbiAga2V5VG9JZCh0eXBlOiBzdHJpbmcsIGtleU5hbWU6IHN0cmluZywga2V5VmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGRlZXBHZXQodGhpcy5fa2V5c1RvSWRzLCBbdHlwZSwga2V5TmFtZSwga2V5VmFsdWVdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9yZSB0aGUgaWQgYW5kIGtleSB2YWx1ZXMgb2YgYSByZWNvcmQgaW4gdGhpcyBrZXkgbWFwLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlY29yZH0gcmVjb3JkXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKlxuICAgKiBAbWVtYmVyT2YgS2V5TWFwXG4gICAqL1xuICBwdXNoUmVjb3JkKHJlY29yZDogUmVjb3JkKTogdm9pZCB7XG4gICAgY29uc3QgeyB0eXBlLCBpZCwga2V5cyB9ID0gcmVjb3JkO1xuXG4gICAgaWYgKCFrZXlzIHx8ICFpZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIE9iamVjdC5rZXlzKGtleXMpLmZvckVhY2goa2V5TmFtZSA9PiB7XG4gICAgICBsZXQga2V5VmFsdWUgPSBrZXlzW2tleU5hbWVdO1xuICAgICAgaWYgKGtleVZhbHVlKSB7XG4gICAgICAgIGRlZXBTZXQodGhpcy5faWRzVG9LZXlzLCBbdHlwZSwga2V5TmFtZSwgaWRdLCBrZXlWYWx1ZSk7XG4gICAgICAgIGRlZXBTZXQodGhpcy5fa2V5c1RvSWRzLCBbdHlwZSwga2V5TmFtZSwga2V5VmFsdWVdLCBpZCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2l2ZW4gYSByZWNvcmQsIGZpbmQgdGhlIGNhY2hlZCBpZCBpZiBpdCBleGlzdHMuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7RGljdDxzdHJpbmc+fSBrZXlzXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqXG4gICAqIEBtZW1iZXJPZiBLZXlNYXBcbiAgICovXG4gIGlkRnJvbUtleXModHlwZTogc3RyaW5nLCBrZXlzOiBEaWN0PHN0cmluZz4pOiBzdHJpbmcge1xuICAgIGxldCBrZXlOYW1lcyA9IE9iamVjdC5rZXlzKGtleXMpO1xuXG4gICAgcmV0dXJuIGZpcnN0UmVzdWx0KGtleU5hbWVzLCAoa2V5TmFtZSkgPT4ge1xuICAgICAgbGV0IGtleVZhbHVlID0ga2V5c1trZXlOYW1lXTtcbiAgICAgIGlmIChrZXlWYWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5rZXlUb0lkKHR5cGUsIGtleU5hbWUsIGtleVZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19