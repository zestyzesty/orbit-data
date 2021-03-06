"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _queryTerm = require("./query-term");

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var QueryBuilder = function () {
    function QueryBuilder() {
        _classCallCheck(this, QueryBuilder);
    }

    /**
     * Find a record by its identity.
     *
     * @param {RecordIdentity} recordIdentity
     * @returns {FindRecordTerm}
     */
    QueryBuilder.prototype.findRecord = function findRecord(record) {
        return new _queryTerm.FindRecordTerm(record);
    };
    /**
     * Find all records of a specific type.
     *
     * If `type` is unspecified, find all records unfiltered by type.
     *
     * @param {string} [type]
     * @returns {FindRecordsTerm}
     */

    QueryBuilder.prototype.findRecords = function findRecords(type) {
        return new _queryTerm.FindRecordsTerm(type);
    };
    /**
     * Find a record in a to-one relationship.
     *
     * @param {RecordIdentity} record
     * @param {string} relationship
     * @returns {FindRelatedRecordTerm}
     */

    QueryBuilder.prototype.findRelatedRecord = function findRelatedRecord(record, relationship) {
        return new _queryTerm.FindRelatedRecordTerm(record, relationship);
    };
    /**
     * Find records in a to-many relationship.
     *
     * @param {RecordIdentity} record
     * @param {string} relationship
     * @returns {FindRelatedRecordsTerm}
     */

    QueryBuilder.prototype.findRelatedRecords = function findRelatedRecords(record, relationship) {
        return new _queryTerm.FindRelatedRecordsTerm(record, relationship);
    };

    return QueryBuilder;
}();

exports.default = QueryBuilder;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNyYy9xdWVyeS1idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLEFBQU8sQUFBYSxBQUFjLEFBQUUsQUFBZSxBQUFFLEFBQXFCLEFBQUUsQUFBc0IsQUFBRSxBQUFNLEFBQWMsQUFBQyxBQUV6SCxBQUFNLEFBQUMsQUFBTzs7Ozs7Ozs7Ozs7QUFDWixBQUtHOzs7Ozs7OzsyQkFDSCxBQUFVLGlDQUFDLEFBQXNCLFFBQy9CLEFBQU07ZUFBQyxBQUFJLEFBQWMsOEJBQUMsQUFBTSxBQUFDLEFBQUMsQUFDcEMsQUFBQztBQUVELEFBT0c7Ozs7Ozs7Ozs7MkJBQ0gsQUFBVyxtQ0FBQyxBQUFhLE1BQ3ZCLEFBQU07ZUFBQyxBQUFJLEFBQWUsK0JBQUMsQUFBSSxBQUFDLEFBQUMsQUFDbkMsQUFBQztBQUVELEFBTUc7Ozs7Ozs7OzsyQkFDSCxBQUFpQiwrQ0FBQyxBQUFzQixRQUFFLEFBQW9CLGNBQzVELEFBQU07ZUFBQyxBQUFJLEFBQXFCLHFDQUFDLEFBQU0sUUFBRSxBQUFZLEFBQUMsQUFBQyxBQUN6RCxBQUFDO0FBRUQsQUFNRzs7Ozs7Ozs7OzJCQUNILEFBQWtCLGlEQUFDLEFBQXNCLFFBQUUsQUFBb0IsY0FDN0QsQUFBTTtlQUFDLEFBQUksQUFBc0Isc0NBQUMsQUFBTSxRQUFFLEFBQVksQUFBQyxBQUFDLEFBQzFELEFBQUMsQUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlY29yZElkZW50aXR5IH0gZnJvbSAnLi9yZWNvcmQnO1xuaW1wb3J0IHsgUXVlcnlUZXJtLCBGaW5kUmVjb3JkVGVybSwgRmluZFJlY29yZHNUZXJtLCBGaW5kUmVsYXRlZFJlY29yZFRlcm0sIEZpbmRSZWxhdGVkUmVjb3Jkc1Rlcm0gfSBmcm9tICcuL3F1ZXJ5LXRlcm0nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBRdWVyeUJ1aWxkZXIge1xuICAvKipcbiAgICogRmluZCBhIHJlY29yZCBieSBpdHMgaWRlbnRpdHkuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVjb3JkSWRlbnRpdHl9IHJlY29yZElkZW50aXR5XG4gICAqIEByZXR1cm5zIHtGaW5kUmVjb3JkVGVybX1cbiAgICovXG4gIGZpbmRSZWNvcmQocmVjb3JkOiBSZWNvcmRJZGVudGl0eSk6IEZpbmRSZWNvcmRUZXJtIHtcbiAgICByZXR1cm4gbmV3IEZpbmRSZWNvcmRUZXJtKHJlY29yZCk7XG4gIH1cblxuICAvKipcbiAgICogRmluZCBhbGwgcmVjb3JkcyBvZiBhIHNwZWNpZmljIHR5cGUuXG4gICAqXG4gICAqIElmIGB0eXBlYCBpcyB1bnNwZWNpZmllZCwgZmluZCBhbGwgcmVjb3JkcyB1bmZpbHRlcmVkIGJ5IHR5cGUuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbdHlwZV1cbiAgICogQHJldHVybnMge0ZpbmRSZWNvcmRzVGVybX1cbiAgICovXG4gIGZpbmRSZWNvcmRzKHR5cGU/OiBzdHJpbmcpOiBGaW5kUmVjb3Jkc1Rlcm0ge1xuICAgIHJldHVybiBuZXcgRmluZFJlY29yZHNUZXJtKHR5cGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgYSByZWNvcmQgaW4gYSB0by1vbmUgcmVsYXRpb25zaGlwLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlY29yZElkZW50aXR5fSByZWNvcmRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uc2hpcFxuICAgKiBAcmV0dXJucyB7RmluZFJlbGF0ZWRSZWNvcmRUZXJtfVxuICAgKi9cbiAgZmluZFJlbGF0ZWRSZWNvcmQocmVjb3JkOiBSZWNvcmRJZGVudGl0eSwgcmVsYXRpb25zaGlwOiBzdHJpbmcpOiBGaW5kUmVsYXRlZFJlY29yZFRlcm0ge1xuICAgIHJldHVybiBuZXcgRmluZFJlbGF0ZWRSZWNvcmRUZXJtKHJlY29yZCwgcmVsYXRpb25zaGlwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIHJlY29yZHMgaW4gYSB0by1tYW55IHJlbGF0aW9uc2hpcC5cbiAgICpcbiAgICogQHBhcmFtIHtSZWNvcmRJZGVudGl0eX0gcmVjb3JkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbnNoaXBcbiAgICogQHJldHVybnMge0ZpbmRSZWxhdGVkUmVjb3Jkc1Rlcm19XG4gICAqL1xuICBmaW5kUmVsYXRlZFJlY29yZHMocmVjb3JkOiBSZWNvcmRJZGVudGl0eSwgcmVsYXRpb25zaGlwOiBzdHJpbmcpOiBGaW5kUmVsYXRlZFJlY29yZHNUZXJtIHtcbiAgICByZXR1cm4gbmV3IEZpbmRSZWxhdGVkUmVjb3Jkc1Rlcm0ocmVjb3JkLCByZWxhdGlvbnNoaXApO1xuICB9XG59XG4iXX0=