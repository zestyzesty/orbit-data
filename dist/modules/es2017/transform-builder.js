export default class TransformBuilder {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmb3JtLWJ1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcmMvdHJhbnNmb3JtLWJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBc0JBLE1BQU0sQ0FBQyxPQUFPO0lBR1osWUFBWSxXQUFxQyxFQUFFO1FBQ2pELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxRQUFRLENBQUMsaUJBQWlCLENBQUM7SUFDdkQsQ0FBQztJQUVELElBQUksaUJBQWlCO1FBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUM7SUFDakMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsU0FBUyxDQUFDLE1BQWM7UUFDdEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkQsQ0FBQztRQUNELE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsYUFBYSxDQUFDLE1BQWM7UUFDMUIsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLGVBQWUsRUFBRSxNQUFNLEVBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxZQUFZLENBQUMsTUFBc0I7UUFDakMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILFVBQVUsQ0FBQyxNQUFzQixFQUFFLEdBQVcsRUFBRSxLQUFhO1FBQzNELE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQztJQUNsRCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILGdCQUFnQixDQUFDLE1BQXNCLEVBQUUsU0FBaUIsRUFBRSxLQUFVO1FBQ3BFLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDO0lBQzlELENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsbUJBQW1CLENBQUMsTUFBc0IsRUFBRSxZQUFvQixFQUFFLGFBQTZCO1FBQzdGLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxDQUFDO0lBQzVFLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsd0JBQXdCLENBQUMsTUFBc0IsRUFBRSxZQUFvQixFQUFFLGFBQTZCO1FBQ2xHLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSwwQkFBMEIsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxDQUFDO0lBQ2pGLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gscUJBQXFCLENBQUMsTUFBc0IsRUFBRSxZQUFvQixFQUFFLGNBQWdDO1FBQ2xHLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxDQUFDO0lBQy9FLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsb0JBQW9CLENBQUMsTUFBc0IsRUFBRSxZQUFvQixFQUFFLGFBQTZCO1FBQzlGLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxDQUFDO0lBQzdFLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFJlY29yZCxcbiAgUmVjb3JkSWRlbnRpdHksXG4gIFJlY29yZEluaXRpYWxpemVyXG59IGZyb20gJy4vcmVjb3JkJztcbmltcG9ydCB7XG4gIEFkZFJlY29yZE9wZXJhdGlvbixcbiAgUmVwbGFjZVJlY29yZE9wZXJhdGlvbixcbiAgUmVtb3ZlUmVjb3JkT3BlcmF0aW9uLFxuICBSZXBsYWNlS2V5T3BlcmF0aW9uLFxuICBSZXBsYWNlQXR0cmlidXRlT3BlcmF0aW9uLFxuICBBZGRUb1JlbGF0ZWRSZWNvcmRzT3BlcmF0aW9uLFxuICBSZW1vdmVGcm9tUmVsYXRlZFJlY29yZHNPcGVyYXRpb24sXG4gIFJlcGxhY2VSZWxhdGVkUmVjb3Jkc09wZXJhdGlvbixcbiAgUmVwbGFjZVJlbGF0ZWRSZWNvcmRPcGVyYXRpb25cbn0gZnJvbSAnLi9vcGVyYXRpb24nO1xuaW1wb3J0IHsgZXEgfSBmcm9tICdAb3JiaXQvdXRpbHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFRyYW5zZm9ybUJ1aWxkZXJTZXR0aW5ncyB7XG4gIHJlY29yZEluaXRpYWxpemVyPzogUmVjb3JkSW5pdGlhbGl6ZXI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRyYW5zZm9ybUJ1aWxkZXIge1xuICBwcml2YXRlIF9yZWNvcmRJbml0aWFsaXplcjogUmVjb3JkSW5pdGlhbGl6ZXI7XG5cbiAgY29uc3RydWN0b3Ioc2V0dGluZ3M6IFRyYW5zZm9ybUJ1aWxkZXJTZXR0aW5ncyA9IHt9KSB7XG4gICAgdGhpcy5fcmVjb3JkSW5pdGlhbGl6ZXIgPSBzZXR0aW5ncy5yZWNvcmRJbml0aWFsaXplcjtcbiAgfVxuXG4gIGdldCByZWNvcmRJbml0aWFsaXplcigpOiBSZWNvcmRJbml0aWFsaXplciB7XG4gICAgcmV0dXJuIHRoaXMuX3JlY29yZEluaXRpYWxpemVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEluc3RhbnRpYXRlIGEgbmV3IGBhZGRSZWNvcmRgIG9wZXJhdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtSZWNvcmR9IHJlY29yZFxuICAgKiBAcmV0dXJucyB7QWRkUmVjb3JkT3BlcmF0aW9ufVxuICAgKi9cbiAgYWRkUmVjb3JkKHJlY29yZDogUmVjb3JkKTogQWRkUmVjb3JkT3BlcmF0aW9uIHtcbiAgICBpZiAodGhpcy5fcmVjb3JkSW5pdGlhbGl6ZXIpIHtcbiAgICAgIHRoaXMuX3JlY29yZEluaXRpYWxpemVyLmluaXRpYWxpemVSZWNvcmQocmVjb3JkKTtcbiAgICB9XG4gICAgcmV0dXJuIHsgb3A6ICdhZGRSZWNvcmQnLCByZWNvcmR9O1xuICB9XG5cbiAgLyoqXG4gICAqIEluc3RhbnRpYXRlIGEgbmV3IGByZXBsYWNlUmVjb3JkYCBvcGVyYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7UmVjb3JkfSByZWNvcmRcbiAgICogQHJldHVybnMge1JlcGxhY2VSZWNvcmRPcGVyYXRpb259XG4gICAqL1xuICByZXBsYWNlUmVjb3JkKHJlY29yZDogUmVjb3JkKTogUmVwbGFjZVJlY29yZE9wZXJhdGlvbiB7XG4gICAgcmV0dXJuIHsgb3A6ICdyZXBsYWNlUmVjb3JkJywgcmVjb3JkfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnN0YW50aWF0ZSBhIG5ldyBgcmVtb3ZlUmVjb3JkYCBvcGVyYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7UmVjb3JkSWRlbnRpdHl9IHJlY29yZFxuICAgKiBAcmV0dXJucyB7UmVtb3ZlUmVjb3JkT3BlcmF0aW9ufVxuICAgKi9cbiAgcmVtb3ZlUmVjb3JkKHJlY29yZDogUmVjb3JkSWRlbnRpdHkpOiBSZW1vdmVSZWNvcmRPcGVyYXRpb24ge1xuICAgIHJldHVybiB7IG9wOiAncmVtb3ZlUmVjb3JkJywgcmVjb3JkfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnN0YW50aWF0ZSBhIG5ldyBgcmVwbGFjZUtleWAgb3BlcmF0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlY29yZElkZW50aXR5fSByZWNvcmRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICogQHJldHVybnMge1JlcGxhY2VLZXlPcGVyYXRpb259XG4gICAqL1xuICByZXBsYWNlS2V5KHJlY29yZDogUmVjb3JkSWRlbnRpdHksIGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogUmVwbGFjZUtleU9wZXJhdGlvbiB7XG4gICAgcmV0dXJuIHsgb3A6ICdyZXBsYWNlS2V5JywgcmVjb3JkLCBrZXksIHZhbHVlIH07XG4gIH1cblxuICAvKipcbiAgICogSW5zdGFudGlhdGUgYSBuZXcgYHJlcGxhY2VBdHRyaWJ1dGVgIG9wZXJhdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtSZWNvcmRJZGVudGl0eX0gcmVjb3JkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyaWJ1dGVcbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKiBAcmV0dXJucyB7UmVwbGFjZUF0dHJpYnV0ZU9wZXJhdGlvbn1cbiAgICovXG4gIHJlcGxhY2VBdHRyaWJ1dGUocmVjb3JkOiBSZWNvcmRJZGVudGl0eSwgYXR0cmlidXRlOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBSZXBsYWNlQXR0cmlidXRlT3BlcmF0aW9uIHtcbiAgICByZXR1cm4geyBvcDogJ3JlcGxhY2VBdHRyaWJ1dGUnLCByZWNvcmQsIGF0dHJpYnV0ZSwgdmFsdWUgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnN0YW50aWF0ZSBhIG5ldyBgYWRkVG9SZWxhdGVkUmVjb3Jkc2Agb3BlcmF0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlY29yZElkZW50aXR5fSByZWNvcmRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uc2hpcFxuICAgKiBAcGFyYW0ge1JlY29yZElkZW50aXR5fSByZWxhdGVkUmVjb3JkXG4gICAqIEByZXR1cm5zIHtBZGRUb1JlbGF0ZWRSZWNvcmRzT3BlcmF0aW9ufVxuICAgKi9cbiAgYWRkVG9SZWxhdGVkUmVjb3JkcyhyZWNvcmQ6IFJlY29yZElkZW50aXR5LCByZWxhdGlvbnNoaXA6IHN0cmluZywgcmVsYXRlZFJlY29yZDogUmVjb3JkSWRlbnRpdHkpOiBBZGRUb1JlbGF0ZWRSZWNvcmRzT3BlcmF0aW9uIHtcbiAgICByZXR1cm4geyBvcDogJ2FkZFRvUmVsYXRlZFJlY29yZHMnLCByZWNvcmQsIHJlbGF0aW9uc2hpcCwgcmVsYXRlZFJlY29yZCB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEluc3RhbnRpYXRlIGEgbmV3IGByZW1vdmVGcm9tUmVsYXRlZFJlY29yZHNgIG9wZXJhdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtSZWNvcmRJZGVudGl0eX0gcmVjb3JkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbnNoaXBcbiAgICogQHBhcmFtIHtSZWNvcmRJZGVudGl0eX0gcmVsYXRlZFJlY29yZFxuICAgKiBAcmV0dXJucyB7UmVtb3ZlRnJvbVJlbGF0ZWRSZWNvcmRzT3BlcmF0aW9ufVxuICAgKi9cbiAgcmVtb3ZlRnJvbVJlbGF0ZWRSZWNvcmRzKHJlY29yZDogUmVjb3JkSWRlbnRpdHksIHJlbGF0aW9uc2hpcDogc3RyaW5nLCByZWxhdGVkUmVjb3JkOiBSZWNvcmRJZGVudGl0eSk6IFJlbW92ZUZyb21SZWxhdGVkUmVjb3Jkc09wZXJhdGlvbiB7XG4gICAgcmV0dXJuIHsgb3A6ICdyZW1vdmVGcm9tUmVsYXRlZFJlY29yZHMnLCByZWNvcmQsIHJlbGF0aW9uc2hpcCwgcmVsYXRlZFJlY29yZCB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEluc3RhbnRpYXRlIGEgbmV3IGByZXBsYWNlUmVsYXRlZFJlY29yZHNgIG9wZXJhdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtSZWNvcmRJZGVudGl0eX0gcmVjb3JkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbnNoaXBcbiAgICogQHBhcmFtIHtSZWNvcmRJZGVudGl0eVtdfSByZWxhdGVkUmVjb3Jkc1xuICAgKiBAcmV0dXJucyB7UmVwbGFjZVJlbGF0ZWRSZWNvcmRzT3BlcmF0aW9ufVxuICAgKi9cbiAgcmVwbGFjZVJlbGF0ZWRSZWNvcmRzKHJlY29yZDogUmVjb3JkSWRlbnRpdHksIHJlbGF0aW9uc2hpcDogc3RyaW5nLCByZWxhdGVkUmVjb3JkczogUmVjb3JkSWRlbnRpdHlbXSk6IFJlcGxhY2VSZWxhdGVkUmVjb3Jkc09wZXJhdGlvbiB7XG4gICAgcmV0dXJuIHsgb3A6ICdyZXBsYWNlUmVsYXRlZFJlY29yZHMnLCByZWNvcmQsIHJlbGF0aW9uc2hpcCwgcmVsYXRlZFJlY29yZHMgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnN0YW50aWF0ZSBhIG5ldyBgcmVwbGFjZVJlbGF0ZWRSZWNvcmRgIG9wZXJhdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtSZWNvcmRJZGVudGl0eX0gcmVjb3JkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbnNoaXBcbiAgICogQHBhcmFtIHtSZWNvcmRJZGVudGl0eX0gcmVsYXRlZFJlY29yZFxuICAgKiBAcmV0dXJucyB7UmVwbGFjZVJlbGF0ZWRSZWNvcmRPcGVyYXRpb259XG4gICAqL1xuICByZXBsYWNlUmVsYXRlZFJlY29yZChyZWNvcmQ6IFJlY29yZElkZW50aXR5LCByZWxhdGlvbnNoaXA6IHN0cmluZywgcmVsYXRlZFJlY29yZDogUmVjb3JkSWRlbnRpdHkpOiBSZXBsYWNlUmVsYXRlZFJlY29yZE9wZXJhdGlvbiB7XG4gICAgcmV0dXJuIHsgb3A6ICdyZXBsYWNlUmVsYXRlZFJlY29yZCcsIHJlY29yZCwgcmVsYXRpb25zaGlwLCByZWxhdGVkUmVjb3JkIH07XG4gIH1cbn0iXX0=