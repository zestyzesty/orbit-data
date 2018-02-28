import { FindRecordTerm, FindRecordsTerm, FindRelatedRecordTerm, FindRelatedRecordsTerm } from './query-term';
export default class QueryBuilder {
    /**
     * Find a record by its identity.
     *
     * @param {RecordIdentity} recordIdentity
     * @returns {FindRecordTerm}
     */
    findRecord(record) {
        return new FindRecordTerm(record);
    }
    /**
     * Find all records of a specific type.
     *
     * If `type` is unspecified, find all records unfiltered by type.
     *
     * @param {string} [type]
     * @returns {FindRecordsTerm}
     */
    findRecords(type) {
        return new FindRecordsTerm(type);
    }
    /**
     * Find a record in a to-one relationship.
     *
     * @param {RecordIdentity} record
     * @param {string} relationship
     * @returns {FindRelatedRecordTerm}
     */
    findRelatedRecord(record, relationship) {
        return new FindRelatedRecordTerm(record, relationship);
    }
    /**
     * Find records in a to-many relationship.
     *
     * @param {RecordIdentity} record
     * @param {string} relationship
     * @returns {FindRelatedRecordsTerm}
     */
    findRelatedRecords(record, relationship) {
        return new FindRelatedRecordsTerm(record, relationship);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNyYy9xdWVyeS1idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBYSxjQUFjLEVBQUUsZUFBZSxFQUFFLHFCQUFxQixFQUFFLHNCQUFzQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXpILE1BQU0sQ0FBQyxPQUFPO0lBQ1o7Ozs7O09BS0c7SUFDSCxVQUFVLENBQUMsTUFBc0I7UUFDL0IsTUFBTSxDQUFDLElBQUksY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsV0FBVyxDQUFDLElBQWE7UUFDdkIsTUFBTSxDQUFDLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxpQkFBaUIsQ0FBQyxNQUFzQixFQUFFLFlBQW9CO1FBQzVELE1BQU0sQ0FBQyxJQUFJLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsa0JBQWtCLENBQUMsTUFBc0IsRUFBRSxZQUFvQjtRQUM3RCxNQUFNLENBQUMsSUFBSSxzQkFBc0IsQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDMUQsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVjb3JkSWRlbnRpdHkgfSBmcm9tICcuL3JlY29yZCc7XG5pbXBvcnQgeyBRdWVyeVRlcm0sIEZpbmRSZWNvcmRUZXJtLCBGaW5kUmVjb3Jkc1Rlcm0sIEZpbmRSZWxhdGVkUmVjb3JkVGVybSwgRmluZFJlbGF0ZWRSZWNvcmRzVGVybSB9IGZyb20gJy4vcXVlcnktdGVybSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFF1ZXJ5QnVpbGRlciB7XG4gIC8qKlxuICAgKiBGaW5kIGEgcmVjb3JkIGJ5IGl0cyBpZGVudGl0eS5cbiAgICpcbiAgICogQHBhcmFtIHtSZWNvcmRJZGVudGl0eX0gcmVjb3JkSWRlbnRpdHlcbiAgICogQHJldHVybnMge0ZpbmRSZWNvcmRUZXJtfVxuICAgKi9cbiAgZmluZFJlY29yZChyZWNvcmQ6IFJlY29yZElkZW50aXR5KTogRmluZFJlY29yZFRlcm0ge1xuICAgIHJldHVybiBuZXcgRmluZFJlY29yZFRlcm0ocmVjb3JkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGFsbCByZWNvcmRzIG9mIGEgc3BlY2lmaWMgdHlwZS5cbiAgICpcbiAgICogSWYgYHR5cGVgIGlzIHVuc3BlY2lmaWVkLCBmaW5kIGFsbCByZWNvcmRzIHVuZmlsdGVyZWQgYnkgdHlwZS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IFt0eXBlXVxuICAgKiBAcmV0dXJucyB7RmluZFJlY29yZHNUZXJtfVxuICAgKi9cbiAgZmluZFJlY29yZHModHlwZT86IHN0cmluZyk6IEZpbmRSZWNvcmRzVGVybSB7XG4gICAgcmV0dXJuIG5ldyBGaW5kUmVjb3Jkc1Rlcm0odHlwZSk7XG4gIH1cblxuICAvKipcbiAgICogRmluZCBhIHJlY29yZCBpbiBhIHRvLW9uZSByZWxhdGlvbnNoaXAuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVjb3JkSWRlbnRpdHl9IHJlY29yZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25zaGlwXG4gICAqIEByZXR1cm5zIHtGaW5kUmVsYXRlZFJlY29yZFRlcm19XG4gICAqL1xuICBmaW5kUmVsYXRlZFJlY29yZChyZWNvcmQ6IFJlY29yZElkZW50aXR5LCByZWxhdGlvbnNoaXA6IHN0cmluZyk6IEZpbmRSZWxhdGVkUmVjb3JkVGVybSB7XG4gICAgcmV0dXJuIG5ldyBGaW5kUmVsYXRlZFJlY29yZFRlcm0ocmVjb3JkLCByZWxhdGlvbnNoaXApO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgcmVjb3JkcyBpbiBhIHRvLW1hbnkgcmVsYXRpb25zaGlwLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlY29yZElkZW50aXR5fSByZWNvcmRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uc2hpcFxuICAgKiBAcmV0dXJucyB7RmluZFJlbGF0ZWRSZWNvcmRzVGVybX1cbiAgICovXG4gIGZpbmRSZWxhdGVkUmVjb3JkcyhyZWNvcmQ6IFJlY29yZElkZW50aXR5LCByZWxhdGlvbnNoaXA6IHN0cmluZyk6IEZpbmRSZWxhdGVkUmVjb3Jkc1Rlcm0ge1xuICAgIHJldHVybiBuZXcgRmluZFJlbGF0ZWRSZWNvcmRzVGVybShyZWNvcmQsIHJlbGF0aW9uc2hpcCk7XG4gIH1cbn1cbiJdfQ==