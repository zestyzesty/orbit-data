function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { FindRecordTerm, FindRecordsTerm, FindRelatedRecordTerm, FindRelatedRecordsTerm } from './query-term';

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
        return new FindRecordTerm(record);
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
        return new FindRecordsTerm(type);
    };
    /**
     * Find a record in a to-one relationship.
     *
     * @param {RecordIdentity} record
     * @param {string} relationship
     * @returns {FindRelatedRecordTerm}
     */


    QueryBuilder.prototype.findRelatedRecord = function findRelatedRecord(record, relationship) {
        return new FindRelatedRecordTerm(record, relationship);
    };
    /**
     * Find records in a to-many relationship.
     *
     * @param {RecordIdentity} record
     * @param {string} relationship
     * @returns {FindRelatedRecordsTerm}
     */


    QueryBuilder.prototype.findRelatedRecords = function findRelatedRecords(record, relationship) {
        return new FindRelatedRecordsTerm(record, relationship);
    };

    return QueryBuilder;
}();

export default QueryBuilder;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNyYy9xdWVyeS1idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsQUFBTyxTQUFhLEFBQWMsZ0JBQUUsQUFBZSxpQkFBRSxBQUFxQix1QkFBRSxBQUFzQixBQUFFLDhCQUFNLEFBQWMsQUFBQyxBQUV6SCxBQUFNLEFBQUMsQUFBTzs7Ozs7OztBQUNaLEFBS0c7Ozs7OzsyQkFDSCxBQUFVLGlDQUFDLEFBQXNCO0FBQy9CLEFBQU0sZUFBQyxJQUFJLEFBQWMsZUFBQyxBQUFNLEFBQUMsQUFBQyxBQUNwQztBQUFDO0FBRUQsQUFPRzs7Ozs7Ozs7OzsyQkFDSCxBQUFXLG1DQUFDLEFBQWE7QUFDdkIsQUFBTSxlQUFDLElBQUksQUFBZSxnQkFBQyxBQUFJLEFBQUMsQUFBQyxBQUNuQztBQUFDO0FBRUQsQUFNRzs7Ozs7Ozs7OzJCQUNILEFBQWlCLCtDQUFDLEFBQXNCLFFBQUUsQUFBb0I7QUFDNUQsQUFBTSxlQUFDLElBQUksQUFBcUIsc0JBQUMsQUFBTSxRQUFFLEFBQVksQUFBQyxBQUFDLEFBQ3pEO0FBQUM7QUFFRCxBQU1HOzs7Ozs7Ozs7MkJBQ0gsQUFBa0IsaURBQUMsQUFBc0IsUUFBRSxBQUFvQjtBQUM3RCxBQUFNLGVBQUMsSUFBSSxBQUFzQix1QkFBQyxBQUFNLFFBQUUsQUFBWSxBQUFDLEFBQUMsQUFDMUQ7QUFBQyxBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVjb3JkSWRlbnRpdHkgfSBmcm9tICcuL3JlY29yZCc7XG5pbXBvcnQgeyBRdWVyeVRlcm0sIEZpbmRSZWNvcmRUZXJtLCBGaW5kUmVjb3Jkc1Rlcm0sIEZpbmRSZWxhdGVkUmVjb3JkVGVybSwgRmluZFJlbGF0ZWRSZWNvcmRzVGVybSB9IGZyb20gJy4vcXVlcnktdGVybSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFF1ZXJ5QnVpbGRlciB7XG4gIC8qKlxuICAgKiBGaW5kIGEgcmVjb3JkIGJ5IGl0cyBpZGVudGl0eS5cbiAgICpcbiAgICogQHBhcmFtIHtSZWNvcmRJZGVudGl0eX0gcmVjb3JkSWRlbnRpdHlcbiAgICogQHJldHVybnMge0ZpbmRSZWNvcmRUZXJtfVxuICAgKi9cbiAgZmluZFJlY29yZChyZWNvcmQ6IFJlY29yZElkZW50aXR5KTogRmluZFJlY29yZFRlcm0ge1xuICAgIHJldHVybiBuZXcgRmluZFJlY29yZFRlcm0ocmVjb3JkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGFsbCByZWNvcmRzIG9mIGEgc3BlY2lmaWMgdHlwZS5cbiAgICpcbiAgICogSWYgYHR5cGVgIGlzIHVuc3BlY2lmaWVkLCBmaW5kIGFsbCByZWNvcmRzIHVuZmlsdGVyZWQgYnkgdHlwZS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IFt0eXBlXVxuICAgKiBAcmV0dXJucyB7RmluZFJlY29yZHNUZXJtfVxuICAgKi9cbiAgZmluZFJlY29yZHModHlwZT86IHN0cmluZyk6IEZpbmRSZWNvcmRzVGVybSB7XG4gICAgcmV0dXJuIG5ldyBGaW5kUmVjb3Jkc1Rlcm0odHlwZSk7XG4gIH1cblxuICAvKipcbiAgICogRmluZCBhIHJlY29yZCBpbiBhIHRvLW9uZSByZWxhdGlvbnNoaXAuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVjb3JkSWRlbnRpdHl9IHJlY29yZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25zaGlwXG4gICAqIEByZXR1cm5zIHtGaW5kUmVsYXRlZFJlY29yZFRlcm19XG4gICAqL1xuICBmaW5kUmVsYXRlZFJlY29yZChyZWNvcmQ6IFJlY29yZElkZW50aXR5LCByZWxhdGlvbnNoaXA6IHN0cmluZyk6IEZpbmRSZWxhdGVkUmVjb3JkVGVybSB7XG4gICAgcmV0dXJuIG5ldyBGaW5kUmVsYXRlZFJlY29yZFRlcm0ocmVjb3JkLCByZWxhdGlvbnNoaXApO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgcmVjb3JkcyBpbiBhIHRvLW1hbnkgcmVsYXRpb25zaGlwLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlY29yZElkZW50aXR5fSByZWNvcmRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uc2hpcFxuICAgKiBAcmV0dXJucyB7RmluZFJlbGF0ZWRSZWNvcmRzVGVybX1cbiAgICovXG4gIGZpbmRSZWxhdGVkUmVjb3JkcyhyZWNvcmQ6IFJlY29yZElkZW50aXR5LCByZWxhdGlvbnNoaXA6IHN0cmluZyk6IEZpbmRSZWxhdGVkUmVjb3Jkc1Rlcm0ge1xuICAgIHJldHVybiBuZXcgRmluZFJlbGF0ZWRSZWNvcmRzVGVybShyZWNvcmQsIHJlbGF0aW9uc2hpcCk7XG4gIH1cbn1cbiJdfQ==