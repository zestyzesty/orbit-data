'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
class TransformBuilder {
    constructor(settings = {}) {
        this._recordInitializer = settings.recordInitializer;
    }
    get recordInitializer() {
        return this._recordInitializer;
    }
    /**
     * Instantiate a new `addRecord` operation.
     *
     * @param {Record} record
     * @returns {AddRecordOperation}
     */
    addRecord(record) {
        if (this._recordInitializer) {
            this._recordInitializer.initializeRecord(record);
        }
        return { op: 'addRecord', record };
    }
    /**
     * Instantiate a new `replaceRecord` operation.
     *
     * @param {Record} record
     * @returns {ReplaceRecordOperation}
     */
    replaceRecord(record) {
        return { op: 'replaceRecord', record };
    }
    /**
     * Instantiate a new `removeRecord` operation.
     *
     * @param {RecordIdentity} record
     * @returns {RemoveRecordOperation}
     */
    removeRecord(record) {
        return { op: 'removeRecord', record };
    }
    /**
     * Instantiate a new `replaceKey` operation.
     *
     * @param {RecordIdentity} record
     * @param {string} key
     * @param {string} value
     * @returns {ReplaceKeyOperation}
     */
    replaceKey(record, key, value) {
        return { op: 'replaceKey', record, key, value };
    }
    /**
     * Instantiate a new `replaceAttribute` operation.
     *
     * @param {RecordIdentity} record
     * @param {string} attribute
     * @param {*} value
     * @returns {ReplaceAttributeOperation}
     */
    replaceAttribute(record, attribute, value) {
        return { op: 'replaceAttribute', record, attribute, value };
    }
    /**
     * Instantiate a new `addToRelatedRecords` operation.
     *
     * @param {RecordIdentity} record
     * @param {string} relationship
     * @param {RecordIdentity} relatedRecord
     * @returns {AddToRelatedRecordsOperation}
     */
    addToRelatedRecords(record, relationship, relatedRecord) {
        return { op: 'addToRelatedRecords', record, relationship, relatedRecord };
    }
    /**
     * Instantiate a new `removeFromRelatedRecords` operation.
     *
     * @param {RecordIdentity} record
     * @param {string} relationship
     * @param {RecordIdentity} relatedRecord
     * @returns {RemoveFromRelatedRecordsOperation}
     */
    removeFromRelatedRecords(record, relationship, relatedRecord) {
        return { op: 'removeFromRelatedRecords', record, relationship, relatedRecord };
    }
    /**
     * Instantiate a new `replaceRelatedRecords` operation.
     *
     * @param {RecordIdentity} record
     * @param {string} relationship
     * @param {RecordIdentity[]} relatedRecords
     * @returns {ReplaceRelatedRecordsOperation}
     */
    replaceRelatedRecords(record, relationship, relatedRecords) {
        return { op: 'replaceRelatedRecords', record, relationship, relatedRecords };
    }
    /**
     * Instantiate a new `replaceRelatedRecord` operation.
     *
     * @param {RecordIdentity} record
     * @param {string} relationship
     * @param {RecordIdentity} relatedRecord
     * @returns {ReplaceRelatedRecordOperation}
     */
    replaceRelatedRecord(record, relationship, relatedRecord) {
        return { op: 'replaceRelatedRecord', record, relationship, relatedRecord };
    }
}
exports.default = TransformBuilder;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmb3JtLWJ1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcmMvdHJhbnNmb3JtLWJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBeUJFLGdCQUFZLFdBQXFDLEFBQUU7QUFDakQsQUFBSSxhQUFDLEFBQWtCLHFCQUFHLEFBQVEsU0FBQyxBQUFpQixBQUFDLEFBQ3ZEO0FBQUM7QUFFRCxRQUFJLEFBQWlCO0FBQ25CLEFBQU0sZUFBQyxBQUFJLEtBQUMsQUFBa0IsQUFBQyxBQUNqQztBQUFDO0FBRUQsQUFLRzs7Ozs7O0FBQ0gsQUFBUyxjQUFDLEFBQWM7QUFDdEIsQUFBRSxBQUFDLFlBQUMsQUFBSSxLQUFDLEFBQWtCLEFBQUMsb0JBQUMsQUFBQztBQUM1QixBQUFJLGlCQUFDLEFBQWtCLG1CQUFDLEFBQWdCLGlCQUFDLEFBQU0sQUFBQyxBQUFDLEFBQ25EO0FBQUM7QUFDRCxBQUFNLGVBQUMsRUFBRSxBQUFFLElBQUUsQUFBVyxhQUFFLEFBQU0sQUFBQyxBQUFDLEFBQ3BDO0FBQUM7QUFFRCxBQUtHOzs7Ozs7QUFDSCxBQUFhLGtCQUFDLEFBQWM7QUFDMUIsQUFBTSxlQUFDLEVBQUUsQUFBRSxJQUFFLEFBQWUsaUJBQUUsQUFBTSxBQUFDLEFBQUMsQUFDeEM7QUFBQztBQUVELEFBS0c7Ozs7OztBQUNILEFBQVksaUJBQUMsQUFBc0I7QUFDakMsQUFBTSxlQUFDLEVBQUUsQUFBRSxJQUFFLEFBQWMsZ0JBQUUsQUFBTSxBQUFDLEFBQUMsQUFDdkM7QUFBQztBQUVELEFBT0c7Ozs7Ozs7O0FBQ0gsQUFBVSxlQUFDLEFBQXNCLFFBQUUsQUFBVyxLQUFFLEFBQWE7QUFDM0QsQUFBTSxlQUFDLEVBQUUsQUFBRSxJQUFFLEFBQVksY0FBRSxBQUFNLFFBQUUsQUFBRyxLQUFFLEFBQUssQUFBRSxBQUFDLEFBQ2xEO0FBQUM7QUFFRCxBQU9HOzs7Ozs7OztBQUNILEFBQWdCLHFCQUFDLEFBQXNCLFFBQUUsQUFBaUIsV0FBRSxBQUFVO0FBQ3BFLEFBQU0sZUFBQyxFQUFFLEFBQUUsSUFBRSxBQUFrQixvQkFBRSxBQUFNLFFBQUUsQUFBUyxXQUFFLEFBQUssQUFBRSxBQUFDLEFBQzlEO0FBQUM7QUFFRCxBQU9HOzs7Ozs7OztBQUNILEFBQW1CLHdCQUFDLEFBQXNCLFFBQUUsQUFBb0IsY0FBRSxBQUE2QjtBQUM3RixBQUFNLGVBQUMsRUFBRSxBQUFFLElBQUUsQUFBcUIsdUJBQUUsQUFBTSxRQUFFLEFBQVksY0FBRSxBQUFhLEFBQUUsQUFBQyxBQUM1RTtBQUFDO0FBRUQsQUFPRzs7Ozs7Ozs7QUFDSCxBQUF3Qiw2QkFBQyxBQUFzQixRQUFFLEFBQW9CLGNBQUUsQUFBNkI7QUFDbEcsQUFBTSxlQUFDLEVBQUUsQUFBRSxJQUFFLEFBQTBCLDRCQUFFLEFBQU0sUUFBRSxBQUFZLGNBQUUsQUFBYSxBQUFFLEFBQUMsQUFDakY7QUFBQztBQUVELEFBT0c7Ozs7Ozs7O0FBQ0gsQUFBcUIsMEJBQUMsQUFBc0IsUUFBRSxBQUFvQixjQUFFLEFBQWdDO0FBQ2xHLEFBQU0sZUFBQyxFQUFFLEFBQUUsSUFBRSxBQUF1Qix5QkFBRSxBQUFNLFFBQUUsQUFBWSxjQUFFLEFBQWMsQUFBRSxBQUFDLEFBQy9FO0FBQUM7QUFFRCxBQU9HOzs7Ozs7OztBQUNILEFBQW9CLHlCQUFDLEFBQXNCLFFBQUUsQUFBb0IsY0FBRSxBQUE2QjtBQUM5RixBQUFNLGVBQUMsRUFBRSxBQUFFLElBQUUsQUFBc0Isd0JBQUUsQUFBTSxRQUFFLEFBQVksY0FBRSxBQUFhLEFBQUUsQUFBQyxBQUM3RTtBQUFDLEFBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBSZWNvcmQsXG4gIFJlY29yZElkZW50aXR5LFxuICBSZWNvcmRJbml0aWFsaXplclxufSBmcm9tICcuL3JlY29yZCc7XG5pbXBvcnQge1xuICBBZGRSZWNvcmRPcGVyYXRpb24sXG4gIFJlcGxhY2VSZWNvcmRPcGVyYXRpb24sXG4gIFJlbW92ZVJlY29yZE9wZXJhdGlvbixcbiAgUmVwbGFjZUtleU9wZXJhdGlvbixcbiAgUmVwbGFjZUF0dHJpYnV0ZU9wZXJhdGlvbixcbiAgQWRkVG9SZWxhdGVkUmVjb3Jkc09wZXJhdGlvbixcbiAgUmVtb3ZlRnJvbVJlbGF0ZWRSZWNvcmRzT3BlcmF0aW9uLFxuICBSZXBsYWNlUmVsYXRlZFJlY29yZHNPcGVyYXRpb24sXG4gIFJlcGxhY2VSZWxhdGVkUmVjb3JkT3BlcmF0aW9uXG59IGZyb20gJy4vb3BlcmF0aW9uJztcbmltcG9ydCB7IGVxIH0gZnJvbSAnQG9yYml0L3V0aWxzJztcblxuZXhwb3J0IGludGVyZmFjZSBUcmFuc2Zvcm1CdWlsZGVyU2V0dGluZ3Mge1xuICByZWNvcmRJbml0aWFsaXplcj86IFJlY29yZEluaXRpYWxpemVyO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUcmFuc2Zvcm1CdWlsZGVyIHtcbiAgcHJpdmF0ZSBfcmVjb3JkSW5pdGlhbGl6ZXI6IFJlY29yZEluaXRpYWxpemVyO1xuXG4gIGNvbnN0cnVjdG9yKHNldHRpbmdzOiBUcmFuc2Zvcm1CdWlsZGVyU2V0dGluZ3MgPSB7fSkge1xuICAgIHRoaXMuX3JlY29yZEluaXRpYWxpemVyID0gc2V0dGluZ3MucmVjb3JkSW5pdGlhbGl6ZXI7XG4gIH1cblxuICBnZXQgcmVjb3JkSW5pdGlhbGl6ZXIoKTogUmVjb3JkSW5pdGlhbGl6ZXIge1xuICAgIHJldHVybiB0aGlzLl9yZWNvcmRJbml0aWFsaXplcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnN0YW50aWF0ZSBhIG5ldyBgYWRkUmVjb3JkYCBvcGVyYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7UmVjb3JkfSByZWNvcmRcbiAgICogQHJldHVybnMge0FkZFJlY29yZE9wZXJhdGlvbn1cbiAgICovXG4gIGFkZFJlY29yZChyZWNvcmQ6IFJlY29yZCk6IEFkZFJlY29yZE9wZXJhdGlvbiB7XG4gICAgaWYgKHRoaXMuX3JlY29yZEluaXRpYWxpemVyKSB7XG4gICAgICB0aGlzLl9yZWNvcmRJbml0aWFsaXplci5pbml0aWFsaXplUmVjb3JkKHJlY29yZCk7XG4gICAgfVxuICAgIHJldHVybiB7IG9wOiAnYWRkUmVjb3JkJywgcmVjb3JkfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnN0YW50aWF0ZSBhIG5ldyBgcmVwbGFjZVJlY29yZGAgb3BlcmF0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlY29yZH0gcmVjb3JkXG4gICAqIEByZXR1cm5zIHtSZXBsYWNlUmVjb3JkT3BlcmF0aW9ufVxuICAgKi9cbiAgcmVwbGFjZVJlY29yZChyZWNvcmQ6IFJlY29yZCk6IFJlcGxhY2VSZWNvcmRPcGVyYXRpb24ge1xuICAgIHJldHVybiB7IG9wOiAncmVwbGFjZVJlY29yZCcsIHJlY29yZH07XG4gIH1cblxuICAvKipcbiAgICogSW5zdGFudGlhdGUgYSBuZXcgYHJlbW92ZVJlY29yZGAgb3BlcmF0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlY29yZElkZW50aXR5fSByZWNvcmRcbiAgICogQHJldHVybnMge1JlbW92ZVJlY29yZE9wZXJhdGlvbn1cbiAgICovXG4gIHJlbW92ZVJlY29yZChyZWNvcmQ6IFJlY29yZElkZW50aXR5KTogUmVtb3ZlUmVjb3JkT3BlcmF0aW9uIHtcbiAgICByZXR1cm4geyBvcDogJ3JlbW92ZVJlY29yZCcsIHJlY29yZH07XG4gIH1cblxuICAvKipcbiAgICogSW5zdGFudGlhdGUgYSBuZXcgYHJlcGxhY2VLZXlgIG9wZXJhdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtSZWNvcmRJZGVudGl0eX0gcmVjb3JkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gICAqIEByZXR1cm5zIHtSZXBsYWNlS2V5T3BlcmF0aW9ufVxuICAgKi9cbiAgcmVwbGFjZUtleShyZWNvcmQ6IFJlY29yZElkZW50aXR5LCBrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IFJlcGxhY2VLZXlPcGVyYXRpb24ge1xuICAgIHJldHVybiB7IG9wOiAncmVwbGFjZUtleScsIHJlY29yZCwga2V5LCB2YWx1ZSB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEluc3RhbnRpYXRlIGEgbmV3IGByZXBsYWNlQXR0cmlidXRlYCBvcGVyYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7UmVjb3JkSWRlbnRpdHl9IHJlY29yZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXR0cmlidXRlXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICogQHJldHVybnMge1JlcGxhY2VBdHRyaWJ1dGVPcGVyYXRpb259XG4gICAqL1xuICByZXBsYWNlQXR0cmlidXRlKHJlY29yZDogUmVjb3JkSWRlbnRpdHksIGF0dHJpYnV0ZTogc3RyaW5nLCB2YWx1ZTogYW55KTogUmVwbGFjZUF0dHJpYnV0ZU9wZXJhdGlvbiB7XG4gICAgcmV0dXJuIHsgb3A6ICdyZXBsYWNlQXR0cmlidXRlJywgcmVjb3JkLCBhdHRyaWJ1dGUsIHZhbHVlIH07XG4gIH1cblxuICAvKipcbiAgICogSW5zdGFudGlhdGUgYSBuZXcgYGFkZFRvUmVsYXRlZFJlY29yZHNgIG9wZXJhdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtSZWNvcmRJZGVudGl0eX0gcmVjb3JkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbnNoaXBcbiAgICogQHBhcmFtIHtSZWNvcmRJZGVudGl0eX0gcmVsYXRlZFJlY29yZFxuICAgKiBAcmV0dXJucyB7QWRkVG9SZWxhdGVkUmVjb3Jkc09wZXJhdGlvbn1cbiAgICovXG4gIGFkZFRvUmVsYXRlZFJlY29yZHMocmVjb3JkOiBSZWNvcmRJZGVudGl0eSwgcmVsYXRpb25zaGlwOiBzdHJpbmcsIHJlbGF0ZWRSZWNvcmQ6IFJlY29yZElkZW50aXR5KTogQWRkVG9SZWxhdGVkUmVjb3Jkc09wZXJhdGlvbiB7XG4gICAgcmV0dXJuIHsgb3A6ICdhZGRUb1JlbGF0ZWRSZWNvcmRzJywgcmVjb3JkLCByZWxhdGlvbnNoaXAsIHJlbGF0ZWRSZWNvcmQgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnN0YW50aWF0ZSBhIG5ldyBgcmVtb3ZlRnJvbVJlbGF0ZWRSZWNvcmRzYCBvcGVyYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7UmVjb3JkSWRlbnRpdHl9IHJlY29yZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25zaGlwXG4gICAqIEBwYXJhbSB7UmVjb3JkSWRlbnRpdHl9IHJlbGF0ZWRSZWNvcmRcbiAgICogQHJldHVybnMge1JlbW92ZUZyb21SZWxhdGVkUmVjb3Jkc09wZXJhdGlvbn1cbiAgICovXG4gIHJlbW92ZUZyb21SZWxhdGVkUmVjb3JkcyhyZWNvcmQ6IFJlY29yZElkZW50aXR5LCByZWxhdGlvbnNoaXA6IHN0cmluZywgcmVsYXRlZFJlY29yZDogUmVjb3JkSWRlbnRpdHkpOiBSZW1vdmVGcm9tUmVsYXRlZFJlY29yZHNPcGVyYXRpb24ge1xuICAgIHJldHVybiB7IG9wOiAncmVtb3ZlRnJvbVJlbGF0ZWRSZWNvcmRzJywgcmVjb3JkLCByZWxhdGlvbnNoaXAsIHJlbGF0ZWRSZWNvcmQgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnN0YW50aWF0ZSBhIG5ldyBgcmVwbGFjZVJlbGF0ZWRSZWNvcmRzYCBvcGVyYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7UmVjb3JkSWRlbnRpdHl9IHJlY29yZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25zaGlwXG4gICAqIEBwYXJhbSB7UmVjb3JkSWRlbnRpdHlbXX0gcmVsYXRlZFJlY29yZHNcbiAgICogQHJldHVybnMge1JlcGxhY2VSZWxhdGVkUmVjb3Jkc09wZXJhdGlvbn1cbiAgICovXG4gIHJlcGxhY2VSZWxhdGVkUmVjb3JkcyhyZWNvcmQ6IFJlY29yZElkZW50aXR5LCByZWxhdGlvbnNoaXA6IHN0cmluZywgcmVsYXRlZFJlY29yZHM6IFJlY29yZElkZW50aXR5W10pOiBSZXBsYWNlUmVsYXRlZFJlY29yZHNPcGVyYXRpb24ge1xuICAgIHJldHVybiB7IG9wOiAncmVwbGFjZVJlbGF0ZWRSZWNvcmRzJywgcmVjb3JkLCByZWxhdGlvbnNoaXAsIHJlbGF0ZWRSZWNvcmRzIH07XG4gIH1cblxuICAvKipcbiAgICogSW5zdGFudGlhdGUgYSBuZXcgYHJlcGxhY2VSZWxhdGVkUmVjb3JkYCBvcGVyYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7UmVjb3JkSWRlbnRpdHl9IHJlY29yZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25zaGlwXG4gICAqIEBwYXJhbSB7UmVjb3JkSWRlbnRpdHl9IHJlbGF0ZWRSZWNvcmRcbiAgICogQHJldHVybnMge1JlcGxhY2VSZWxhdGVkUmVjb3JkT3BlcmF0aW9ufVxuICAgKi9cbiAgcmVwbGFjZVJlbGF0ZWRSZWNvcmQocmVjb3JkOiBSZWNvcmRJZGVudGl0eSwgcmVsYXRpb25zaGlwOiBzdHJpbmcsIHJlbGF0ZWRSZWNvcmQ6IFJlY29yZElkZW50aXR5KTogUmVwbGFjZVJlbGF0ZWRSZWNvcmRPcGVyYXRpb24ge1xuICAgIHJldHVybiB7IG9wOiAncmVwbGFjZVJlbGF0ZWRSZWNvcmQnLCByZWNvcmQsIHJlbGF0aW9uc2hpcCwgcmVsYXRlZFJlY29yZCB9O1xuICB9XG59Il19