var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TransformBuilder = function () {
    function TransformBuilder() {
        var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, TransformBuilder);

        this._recordInitializer = settings.recordInitializer;
    }

    /**
     * Instantiate a new `addRecord` operation.
     *
     * @param {Record} record
     * @returns {AddRecordOperation}
     */
    TransformBuilder.prototype.addRecord = function addRecord(record) {
        if (this._recordInitializer) {
            this._recordInitializer.initializeRecord(record);
        }
        return { op: 'addRecord', record: record };
    };
    /**
     * Instantiate a new `replaceRecord` operation.
     *
     * @param {Record} record
     * @returns {ReplaceRecordOperation}
     */


    TransformBuilder.prototype.replaceRecord = function replaceRecord(record) {
        return { op: 'replaceRecord', record: record };
    };
    /**
     * Instantiate a new `removeRecord` operation.
     *
     * @param {RecordIdentity} record
     * @returns {RemoveRecordOperation}
     */


    TransformBuilder.prototype.removeRecord = function removeRecord(record) {
        return { op: 'removeRecord', record: record };
    };
    /**
     * Instantiate a new `replaceKey` operation.
     *
     * @param {RecordIdentity} record
     * @param {string} key
     * @param {string} value
     * @returns {ReplaceKeyOperation}
     */


    TransformBuilder.prototype.replaceKey = function replaceKey(record, key, value) {
        return { op: 'replaceKey', record: record, key: key, value: value };
    };
    /**
     * Instantiate a new `replaceAttribute` operation.
     *
     * @param {RecordIdentity} record
     * @param {string} attribute
     * @param {*} value
     * @returns {ReplaceAttributeOperation}
     */


    TransformBuilder.prototype.replaceAttribute = function replaceAttribute(record, attribute, value) {
        return { op: 'replaceAttribute', record: record, attribute: attribute, value: value };
    };
    /**
     * Instantiate a new `addToRelatedRecords` operation.
     *
     * @param {RecordIdentity} record
     * @param {string} relationship
     * @param {RecordIdentity} relatedRecord
     * @returns {AddToRelatedRecordsOperation}
     */


    TransformBuilder.prototype.addToRelatedRecords = function addToRelatedRecords(record, relationship, relatedRecord) {
        return { op: 'addToRelatedRecords', record: record, relationship: relationship, relatedRecord: relatedRecord };
    };
    /**
     * Instantiate a new `removeFromRelatedRecords` operation.
     *
     * @param {RecordIdentity} record
     * @param {string} relationship
     * @param {RecordIdentity} relatedRecord
     * @returns {RemoveFromRelatedRecordsOperation}
     */


    TransformBuilder.prototype.removeFromRelatedRecords = function removeFromRelatedRecords(record, relationship, relatedRecord) {
        return { op: 'removeFromRelatedRecords', record: record, relationship: relationship, relatedRecord: relatedRecord };
    };
    /**
     * Instantiate a new `replaceRelatedRecords` operation.
     *
     * @param {RecordIdentity} record
     * @param {string} relationship
     * @param {RecordIdentity[]} relatedRecords
     * @returns {ReplaceRelatedRecordsOperation}
     */


    TransformBuilder.prototype.replaceRelatedRecords = function replaceRelatedRecords(record, relationship, relatedRecords) {
        return { op: 'replaceRelatedRecords', record: record, relationship: relationship, relatedRecords: relatedRecords };
    };
    /**
     * Instantiate a new `replaceRelatedRecord` operation.
     *
     * @param {RecordIdentity} record
     * @param {string} relationship
     * @param {RecordIdentity} relatedRecord
     * @returns {ReplaceRelatedRecordOperation}
     */


    TransformBuilder.prototype.replaceRelatedRecord = function replaceRelatedRecord(record, relationship, relatedRecord) {
        return { op: 'replaceRelatedRecord', record: record, relationship: relationship, relatedRecord: relatedRecord };
    };

    _createClass(TransformBuilder, [{
        key: 'recordInitializer',
        get: function () {
            return this._recordInitializer;
        }
    }]);

    return TransformBuilder;
}();

export default TransformBuilder;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmb3JtLWJ1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcmMvdHJhbnNmb3JtLWJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUF5QkU7WUFBWSwrRUFBcUMsQUFBRTs7OztBQUNqRCxBQUFJLGFBQUMsQUFBa0IscUJBQUcsQUFBUSxTQUFDLEFBQWlCLEFBQUMsQUFDdkQ7QUFBQyxBQUVELEFBQUksQUFBaUI7O0FBSXJCLEFBS0c7Ozs7OzsrQkFDSCxBQUFTLCtCQUFDLEFBQWM7QUFDdEIsQUFBRSxBQUFDLFlBQUMsQUFBSSxLQUFDLEFBQWtCLEFBQUMsb0JBQUMsQUFBQztBQUM1QixBQUFJLGlCQUFDLEFBQWtCLG1CQUFDLEFBQWdCLGlCQUFDLEFBQU0sQUFBQyxBQUFDLEFBQ25EO0FBQUM7QUFDRCxBQUFNLGVBQUMsRUFBRSxBQUFFLElBQUUsQUFBVyxhQUFFLEFBQU0sQUFBQyxBQUFDLEFBQ3BDO0FBQUM7QUFFRCxBQUtHOzs7Ozs7OzsrQkFDSCxBQUFhLHVDQUFDLEFBQWM7QUFDMUIsQUFBTSxlQUFDLEVBQUUsQUFBRSxJQUFFLEFBQWUsaUJBQUUsQUFBTSxBQUFDLEFBQUMsQUFDeEM7QUFBQztBQUVELEFBS0c7Ozs7Ozs7OytCQUNILEFBQVkscUNBQUMsQUFBc0I7QUFDakMsQUFBTSxlQUFDLEVBQUUsQUFBRSxJQUFFLEFBQWMsZ0JBQUUsQUFBTSxBQUFDLEFBQUMsQUFDdkM7QUFBQztBQUVELEFBT0c7Ozs7Ozs7Ozs7K0JBQ0gsQUFBVSxpQ0FBQyxBQUFzQixRQUFFLEFBQVcsS0FBRSxBQUFhO0FBQzNELEFBQU0sZUFBQyxFQUFFLEFBQUUsSUFBRSxBQUFZLGNBQUUsQUFBTSxnQkFBRSxBQUFHLFVBQUUsQUFBSyxBQUFFLEFBQUMsQUFDbEQ7QUFBQztBQUVELEFBT0c7Ozs7Ozs7Ozs7K0JBQ0gsQUFBZ0IsNkNBQUMsQUFBc0IsUUFBRSxBQUFpQixXQUFFLEFBQVU7QUFDcEUsQUFBTSxlQUFDLEVBQUUsQUFBRSxJQUFFLEFBQWtCLG9CQUFFLEFBQU0sZ0JBQUUsQUFBUyxzQkFBRSxBQUFLLEFBQUUsQUFBQyxBQUM5RDtBQUFDO0FBRUQsQUFPRzs7Ozs7Ozs7OzsrQkFDSCxBQUFtQixtREFBQyxBQUFzQixRQUFFLEFBQW9CLGNBQUUsQUFBNkI7QUFDN0YsQUFBTSxlQUFDLEVBQUUsQUFBRSxJQUFFLEFBQXFCLHVCQUFFLEFBQU0sZ0JBQUUsQUFBWSw0QkFBRSxBQUFhLEFBQUUsQUFBQyxBQUM1RTtBQUFDO0FBRUQsQUFPRzs7Ozs7Ozs7OzsrQkFDSCxBQUF3Qiw2REFBQyxBQUFzQixRQUFFLEFBQW9CLGNBQUUsQUFBNkI7QUFDbEcsQUFBTSxlQUFDLEVBQUUsQUFBRSxJQUFFLEFBQTBCLDRCQUFFLEFBQU0sZ0JBQUUsQUFBWSw0QkFBRSxBQUFhLEFBQUUsQUFBQyxBQUNqRjtBQUFDO0FBRUQsQUFPRzs7Ozs7Ozs7OzsrQkFDSCxBQUFxQix1REFBQyxBQUFzQixRQUFFLEFBQW9CLGNBQUUsQUFBZ0M7QUFDbEcsQUFBTSxlQUFDLEVBQUUsQUFBRSxJQUFFLEFBQXVCLHlCQUFFLEFBQU0sZ0JBQUUsQUFBWSw0QkFBRSxBQUFjLEFBQUUsQUFBQyxBQUMvRTtBQUFDO0FBRUQsQUFPRzs7Ozs7Ozs7OzsrQkFDSCxBQUFvQixxREFBQyxBQUFzQixRQUFFLEFBQW9CLGNBQUUsQUFBNkI7QUFDOUYsQUFBTSxlQUFDLEVBQUUsQUFBRSxJQUFFLEFBQXNCLHdCQUFFLEFBQU0sZ0JBQUUsQUFBWSw0QkFBRSxBQUFhLEFBQUUsQUFBQyxBQUM3RTtBQUFDLEFBQ0Y7Ozs7O0FBM0dHLEFBQU0sbUJBQUMsQUFBSSxLQUFDLEFBQWtCLEFBQUMsQUFDakM7QUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFJlY29yZCxcbiAgUmVjb3JkSWRlbnRpdHksXG4gIFJlY29yZEluaXRpYWxpemVyXG59IGZyb20gJy4vcmVjb3JkJztcbmltcG9ydCB7XG4gIEFkZFJlY29yZE9wZXJhdGlvbixcbiAgUmVwbGFjZVJlY29yZE9wZXJhdGlvbixcbiAgUmVtb3ZlUmVjb3JkT3BlcmF0aW9uLFxuICBSZXBsYWNlS2V5T3BlcmF0aW9uLFxuICBSZXBsYWNlQXR0cmlidXRlT3BlcmF0aW9uLFxuICBBZGRUb1JlbGF0ZWRSZWNvcmRzT3BlcmF0aW9uLFxuICBSZW1vdmVGcm9tUmVsYXRlZFJlY29yZHNPcGVyYXRpb24sXG4gIFJlcGxhY2VSZWxhdGVkUmVjb3Jkc09wZXJhdGlvbixcbiAgUmVwbGFjZVJlbGF0ZWRSZWNvcmRPcGVyYXRpb25cbn0gZnJvbSAnLi9vcGVyYXRpb24nO1xuaW1wb3J0IHsgZXEgfSBmcm9tICdAb3JiaXQvdXRpbHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFRyYW5zZm9ybUJ1aWxkZXJTZXR0aW5ncyB7XG4gIHJlY29yZEluaXRpYWxpemVyPzogUmVjb3JkSW5pdGlhbGl6ZXI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRyYW5zZm9ybUJ1aWxkZXIge1xuICBwcml2YXRlIF9yZWNvcmRJbml0aWFsaXplcjogUmVjb3JkSW5pdGlhbGl6ZXI7XG5cbiAgY29uc3RydWN0b3Ioc2V0dGluZ3M6IFRyYW5zZm9ybUJ1aWxkZXJTZXR0aW5ncyA9IHt9KSB7XG4gICAgdGhpcy5fcmVjb3JkSW5pdGlhbGl6ZXIgPSBzZXR0aW5ncy5yZWNvcmRJbml0aWFsaXplcjtcbiAgfVxuXG4gIGdldCByZWNvcmRJbml0aWFsaXplcigpOiBSZWNvcmRJbml0aWFsaXplciB7XG4gICAgcmV0dXJuIHRoaXMuX3JlY29yZEluaXRpYWxpemVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEluc3RhbnRpYXRlIGEgbmV3IGBhZGRSZWNvcmRgIG9wZXJhdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtSZWNvcmR9IHJlY29yZFxuICAgKiBAcmV0dXJucyB7QWRkUmVjb3JkT3BlcmF0aW9ufVxuICAgKi9cbiAgYWRkUmVjb3JkKHJlY29yZDogUmVjb3JkKTogQWRkUmVjb3JkT3BlcmF0aW9uIHtcbiAgICBpZiAodGhpcy5fcmVjb3JkSW5pdGlhbGl6ZXIpIHtcbiAgICAgIHRoaXMuX3JlY29yZEluaXRpYWxpemVyLmluaXRpYWxpemVSZWNvcmQocmVjb3JkKTtcbiAgICB9XG4gICAgcmV0dXJuIHsgb3A6ICdhZGRSZWNvcmQnLCByZWNvcmR9O1xuICB9XG5cbiAgLyoqXG4gICAqIEluc3RhbnRpYXRlIGEgbmV3IGByZXBsYWNlUmVjb3JkYCBvcGVyYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7UmVjb3JkfSByZWNvcmRcbiAgICogQHJldHVybnMge1JlcGxhY2VSZWNvcmRPcGVyYXRpb259XG4gICAqL1xuICByZXBsYWNlUmVjb3JkKHJlY29yZDogUmVjb3JkKTogUmVwbGFjZVJlY29yZE9wZXJhdGlvbiB7XG4gICAgcmV0dXJuIHsgb3A6ICdyZXBsYWNlUmVjb3JkJywgcmVjb3JkfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnN0YW50aWF0ZSBhIG5ldyBgcmVtb3ZlUmVjb3JkYCBvcGVyYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7UmVjb3JkSWRlbnRpdHl9IHJlY29yZFxuICAgKiBAcmV0dXJucyB7UmVtb3ZlUmVjb3JkT3BlcmF0aW9ufVxuICAgKi9cbiAgcmVtb3ZlUmVjb3JkKHJlY29yZDogUmVjb3JkSWRlbnRpdHkpOiBSZW1vdmVSZWNvcmRPcGVyYXRpb24ge1xuICAgIHJldHVybiB7IG9wOiAncmVtb3ZlUmVjb3JkJywgcmVjb3JkfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnN0YW50aWF0ZSBhIG5ldyBgcmVwbGFjZUtleWAgb3BlcmF0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlY29yZElkZW50aXR5fSByZWNvcmRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICogQHJldHVybnMge1JlcGxhY2VLZXlPcGVyYXRpb259XG4gICAqL1xuICByZXBsYWNlS2V5KHJlY29yZDogUmVjb3JkSWRlbnRpdHksIGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogUmVwbGFjZUtleU9wZXJhdGlvbiB7XG4gICAgcmV0dXJuIHsgb3A6ICdyZXBsYWNlS2V5JywgcmVjb3JkLCBrZXksIHZhbHVlIH07XG4gIH1cblxuICAvKipcbiAgICogSW5zdGFudGlhdGUgYSBuZXcgYHJlcGxhY2VBdHRyaWJ1dGVgIG9wZXJhdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtSZWNvcmRJZGVudGl0eX0gcmVjb3JkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyaWJ1dGVcbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKiBAcmV0dXJucyB7UmVwbGFjZUF0dHJpYnV0ZU9wZXJhdGlvbn1cbiAgICovXG4gIHJlcGxhY2VBdHRyaWJ1dGUocmVjb3JkOiBSZWNvcmRJZGVudGl0eSwgYXR0cmlidXRlOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBSZXBsYWNlQXR0cmlidXRlT3BlcmF0aW9uIHtcbiAgICByZXR1cm4geyBvcDogJ3JlcGxhY2VBdHRyaWJ1dGUnLCByZWNvcmQsIGF0dHJpYnV0ZSwgdmFsdWUgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnN0YW50aWF0ZSBhIG5ldyBgYWRkVG9SZWxhdGVkUmVjb3Jkc2Agb3BlcmF0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlY29yZElkZW50aXR5fSByZWNvcmRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uc2hpcFxuICAgKiBAcGFyYW0ge1JlY29yZElkZW50aXR5fSByZWxhdGVkUmVjb3JkXG4gICAqIEByZXR1cm5zIHtBZGRUb1JlbGF0ZWRSZWNvcmRzT3BlcmF0aW9ufVxuICAgKi9cbiAgYWRkVG9SZWxhdGVkUmVjb3JkcyhyZWNvcmQ6IFJlY29yZElkZW50aXR5LCByZWxhdGlvbnNoaXA6IHN0cmluZywgcmVsYXRlZFJlY29yZDogUmVjb3JkSWRlbnRpdHkpOiBBZGRUb1JlbGF0ZWRSZWNvcmRzT3BlcmF0aW9uIHtcbiAgICByZXR1cm4geyBvcDogJ2FkZFRvUmVsYXRlZFJlY29yZHMnLCByZWNvcmQsIHJlbGF0aW9uc2hpcCwgcmVsYXRlZFJlY29yZCB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEluc3RhbnRpYXRlIGEgbmV3IGByZW1vdmVGcm9tUmVsYXRlZFJlY29yZHNgIG9wZXJhdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtSZWNvcmRJZGVudGl0eX0gcmVjb3JkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbnNoaXBcbiAgICogQHBhcmFtIHtSZWNvcmRJZGVudGl0eX0gcmVsYXRlZFJlY29yZFxuICAgKiBAcmV0dXJucyB7UmVtb3ZlRnJvbVJlbGF0ZWRSZWNvcmRzT3BlcmF0aW9ufVxuICAgKi9cbiAgcmVtb3ZlRnJvbVJlbGF0ZWRSZWNvcmRzKHJlY29yZDogUmVjb3JkSWRlbnRpdHksIHJlbGF0aW9uc2hpcDogc3RyaW5nLCByZWxhdGVkUmVjb3JkOiBSZWNvcmRJZGVudGl0eSk6IFJlbW92ZUZyb21SZWxhdGVkUmVjb3Jkc09wZXJhdGlvbiB7XG4gICAgcmV0dXJuIHsgb3A6ICdyZW1vdmVGcm9tUmVsYXRlZFJlY29yZHMnLCByZWNvcmQsIHJlbGF0aW9uc2hpcCwgcmVsYXRlZFJlY29yZCB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEluc3RhbnRpYXRlIGEgbmV3IGByZXBsYWNlUmVsYXRlZFJlY29yZHNgIG9wZXJhdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtSZWNvcmRJZGVudGl0eX0gcmVjb3JkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbnNoaXBcbiAgICogQHBhcmFtIHtSZWNvcmRJZGVudGl0eVtdfSByZWxhdGVkUmVjb3Jkc1xuICAgKiBAcmV0dXJucyB7UmVwbGFjZVJlbGF0ZWRSZWNvcmRzT3BlcmF0aW9ufVxuICAgKi9cbiAgcmVwbGFjZVJlbGF0ZWRSZWNvcmRzKHJlY29yZDogUmVjb3JkSWRlbnRpdHksIHJlbGF0aW9uc2hpcDogc3RyaW5nLCByZWxhdGVkUmVjb3JkczogUmVjb3JkSWRlbnRpdHlbXSk6IFJlcGxhY2VSZWxhdGVkUmVjb3Jkc09wZXJhdGlvbiB7XG4gICAgcmV0dXJuIHsgb3A6ICdyZXBsYWNlUmVsYXRlZFJlY29yZHMnLCByZWNvcmQsIHJlbGF0aW9uc2hpcCwgcmVsYXRlZFJlY29yZHMgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnN0YW50aWF0ZSBhIG5ldyBgcmVwbGFjZVJlbGF0ZWRSZWNvcmRgIG9wZXJhdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtSZWNvcmRJZGVudGl0eX0gcmVjb3JkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbnNoaXBcbiAgICogQHBhcmFtIHtSZWNvcmRJZGVudGl0eX0gcmVsYXRlZFJlY29yZFxuICAgKiBAcmV0dXJucyB7UmVwbGFjZVJlbGF0ZWRSZWNvcmRPcGVyYXRpb259XG4gICAqL1xuICByZXBsYWNlUmVsYXRlZFJlY29yZChyZWNvcmQ6IFJlY29yZElkZW50aXR5LCByZWxhdGlvbnNoaXA6IHN0cmluZywgcmVsYXRlZFJlY29yZDogUmVjb3JkSWRlbnRpdHkpOiBSZXBsYWNlUmVsYXRlZFJlY29yZE9wZXJhdGlvbiB7XG4gICAgcmV0dXJuIHsgb3A6ICdyZXBsYWNlUmVsYXRlZFJlY29yZCcsIHJlY29yZCwgcmVsYXRpb25zaGlwLCByZWxhdGVkUmVjb3JkIH07XG4gIH1cbn0iXX0=