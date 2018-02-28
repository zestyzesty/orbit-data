"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

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

exports.default = TransformBuilder;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmb3JtLWJ1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcmMvdHJhbnNmb3JtLWJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21DQXlCRTs7WUFBWSwrRUFBcUMsQUFBRTs7OEJBQ2pELEFBQUk7O2FBQUMsQUFBa0IscUJBQUcsQUFBUSxTQUFDLEFBQWlCLEFBQUMsQUFDdkQsQUFBQyxBQUVELEFBQUksQUFBaUI7QUFJckIsQUFLRzs7Ozs7Ozs7K0JBQ0gsQUFBUywrQkFBQyxBQUFjLFFBQ3RCLEFBQUUsQUFBQztZQUFDLEFBQUksS0FBQyxBQUFrQixBQUFDLG9CQUFDLEFBQUMsQUFDNUIsQUFBSTtpQkFBQyxBQUFrQixtQkFBQyxBQUFnQixpQkFBQyxBQUFNLEFBQUMsQUFBQyxBQUNuRCxBQUFDO0FBQ0QsQUFBTTtlQUFDLEVBQUUsQUFBRSxJQUFFLEFBQVcsYUFBRSxBQUFNLEFBQUMsQUFBQyxBQUNwQyxRQUFDO0FBRUQsQUFLRzs7Ozs7Ozs7K0JBQ0gsQUFBYSx1Q0FBQyxBQUFjLFFBQzFCLEFBQU07ZUFBQyxFQUFFLEFBQUUsSUFBRSxBQUFlLGlCQUFFLEFBQU0sQUFBQyxBQUFDLEFBQ3hDLFFBQUM7QUFFRCxBQUtHOzs7Ozs7OzsrQkFDSCxBQUFZLHFDQUFDLEFBQXNCLFFBQ2pDLEFBQU07ZUFBQyxFQUFFLEFBQUUsSUFBRSxBQUFjLGdCQUFFLEFBQU0sQUFBQyxBQUFDLEFBQ3ZDLFFBQUM7QUFFRCxBQU9HOzs7Ozs7Ozs7OytCQUNILEFBQVUsaUNBQUMsQUFBc0IsUUFBRSxBQUFXLEtBQUUsQUFBYSxPQUMzRCxBQUFNO2VBQUMsRUFBRSxBQUFFLElBQUUsQUFBWSxjQUFFLEFBQU0sZ0JBQUUsQUFBRyxVQUFFLEFBQUssQUFBRSxBQUFDLEFBQ2xELE9BQUM7QUFFRCxBQU9HOzs7Ozs7Ozs7OytCQUNILEFBQWdCLDZDQUFDLEFBQXNCLFFBQUUsQUFBaUIsV0FBRSxBQUFVLE9BQ3BFLEFBQU07ZUFBQyxFQUFFLEFBQUUsSUFBRSxBQUFrQixvQkFBRSxBQUFNLGdCQUFFLEFBQVMsc0JBQUUsQUFBSyxBQUFFLEFBQUMsQUFDOUQsT0FBQztBQUVELEFBT0c7Ozs7Ozs7Ozs7K0JBQ0gsQUFBbUIsbURBQUMsQUFBc0IsUUFBRSxBQUFvQixjQUFFLEFBQTZCLGVBQzdGLEFBQU07ZUFBQyxFQUFFLEFBQUUsSUFBRSxBQUFxQix1QkFBRSxBQUFNLGdCQUFFLEFBQVksNEJBQUUsQUFBYSxBQUFFLEFBQUMsQUFDNUUsZUFBQztBQUVELEFBT0c7Ozs7Ozs7Ozs7K0JBQ0gsQUFBd0IsNkRBQUMsQUFBc0IsUUFBRSxBQUFvQixjQUFFLEFBQTZCLGVBQ2xHLEFBQU07ZUFBQyxFQUFFLEFBQUUsSUFBRSxBQUEwQiw0QkFBRSxBQUFNLGdCQUFFLEFBQVksNEJBQUUsQUFBYSxBQUFFLEFBQUMsQUFDakYsZUFBQztBQUVELEFBT0c7Ozs7Ozs7Ozs7K0JBQ0gsQUFBcUIsdURBQUMsQUFBc0IsUUFBRSxBQUFvQixjQUFFLEFBQWdDLGdCQUNsRyxBQUFNO2VBQUMsRUFBRSxBQUFFLElBQUUsQUFBdUIseUJBQUUsQUFBTSxnQkFBRSxBQUFZLDRCQUFFLEFBQWMsQUFBRSxBQUFDLEFBQy9FLGdCQUFDO0FBRUQsQUFPRzs7Ozs7Ozs7OzsrQkFDSCxBQUFvQixxREFBQyxBQUFzQixRQUFFLEFBQW9CLGNBQUUsQUFBNkIsZUFDOUYsQUFBTTtlQUFDLEVBQUUsQUFBRSxJQUFFLEFBQXNCLHdCQUFFLEFBQU0sZ0JBQUUsQUFBWSw0QkFBRSxBQUFhLEFBQUUsQUFBQyxBQUM3RSxlQUFDLEFBQ0Y7Ozs7O3lCQTNHRyxBQUFNO21CQUFDLEFBQUksS0FBQyxBQUFrQixBQUFDLEFBQ2pDLEFBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBSZWNvcmQsXG4gIFJlY29yZElkZW50aXR5LFxuICBSZWNvcmRJbml0aWFsaXplclxufSBmcm9tICcuL3JlY29yZCc7XG5pbXBvcnQge1xuICBBZGRSZWNvcmRPcGVyYXRpb24sXG4gIFJlcGxhY2VSZWNvcmRPcGVyYXRpb24sXG4gIFJlbW92ZVJlY29yZE9wZXJhdGlvbixcbiAgUmVwbGFjZUtleU9wZXJhdGlvbixcbiAgUmVwbGFjZUF0dHJpYnV0ZU9wZXJhdGlvbixcbiAgQWRkVG9SZWxhdGVkUmVjb3Jkc09wZXJhdGlvbixcbiAgUmVtb3ZlRnJvbVJlbGF0ZWRSZWNvcmRzT3BlcmF0aW9uLFxuICBSZXBsYWNlUmVsYXRlZFJlY29yZHNPcGVyYXRpb24sXG4gIFJlcGxhY2VSZWxhdGVkUmVjb3JkT3BlcmF0aW9uXG59IGZyb20gJy4vb3BlcmF0aW9uJztcbmltcG9ydCB7IGVxIH0gZnJvbSAnQG9yYml0L3V0aWxzJztcblxuZXhwb3J0IGludGVyZmFjZSBUcmFuc2Zvcm1CdWlsZGVyU2V0dGluZ3Mge1xuICByZWNvcmRJbml0aWFsaXplcj86IFJlY29yZEluaXRpYWxpemVyO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUcmFuc2Zvcm1CdWlsZGVyIHtcbiAgcHJpdmF0ZSBfcmVjb3JkSW5pdGlhbGl6ZXI6IFJlY29yZEluaXRpYWxpemVyO1xuXG4gIGNvbnN0cnVjdG9yKHNldHRpbmdzOiBUcmFuc2Zvcm1CdWlsZGVyU2V0dGluZ3MgPSB7fSkge1xuICAgIHRoaXMuX3JlY29yZEluaXRpYWxpemVyID0gc2V0dGluZ3MucmVjb3JkSW5pdGlhbGl6ZXI7XG4gIH1cblxuICBnZXQgcmVjb3JkSW5pdGlhbGl6ZXIoKTogUmVjb3JkSW5pdGlhbGl6ZXIge1xuICAgIHJldHVybiB0aGlzLl9yZWNvcmRJbml0aWFsaXplcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnN0YW50aWF0ZSBhIG5ldyBgYWRkUmVjb3JkYCBvcGVyYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7UmVjb3JkfSByZWNvcmRcbiAgICogQHJldHVybnMge0FkZFJlY29yZE9wZXJhdGlvbn1cbiAgICovXG4gIGFkZFJlY29yZChyZWNvcmQ6IFJlY29yZCk6IEFkZFJlY29yZE9wZXJhdGlvbiB7XG4gICAgaWYgKHRoaXMuX3JlY29yZEluaXRpYWxpemVyKSB7XG4gICAgICB0aGlzLl9yZWNvcmRJbml0aWFsaXplci5pbml0aWFsaXplUmVjb3JkKHJlY29yZCk7XG4gICAgfVxuICAgIHJldHVybiB7IG9wOiAnYWRkUmVjb3JkJywgcmVjb3JkfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnN0YW50aWF0ZSBhIG5ldyBgcmVwbGFjZVJlY29yZGAgb3BlcmF0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlY29yZH0gcmVjb3JkXG4gICAqIEByZXR1cm5zIHtSZXBsYWNlUmVjb3JkT3BlcmF0aW9ufVxuICAgKi9cbiAgcmVwbGFjZVJlY29yZChyZWNvcmQ6IFJlY29yZCk6IFJlcGxhY2VSZWNvcmRPcGVyYXRpb24ge1xuICAgIHJldHVybiB7IG9wOiAncmVwbGFjZVJlY29yZCcsIHJlY29yZH07XG4gIH1cblxuICAvKipcbiAgICogSW5zdGFudGlhdGUgYSBuZXcgYHJlbW92ZVJlY29yZGAgb3BlcmF0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlY29yZElkZW50aXR5fSByZWNvcmRcbiAgICogQHJldHVybnMge1JlbW92ZVJlY29yZE9wZXJhdGlvbn1cbiAgICovXG4gIHJlbW92ZVJlY29yZChyZWNvcmQ6IFJlY29yZElkZW50aXR5KTogUmVtb3ZlUmVjb3JkT3BlcmF0aW9uIHtcbiAgICByZXR1cm4geyBvcDogJ3JlbW92ZVJlY29yZCcsIHJlY29yZH07XG4gIH1cblxuICAvKipcbiAgICogSW5zdGFudGlhdGUgYSBuZXcgYHJlcGxhY2VLZXlgIG9wZXJhdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtSZWNvcmRJZGVudGl0eX0gcmVjb3JkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gICAqIEByZXR1cm5zIHtSZXBsYWNlS2V5T3BlcmF0aW9ufVxuICAgKi9cbiAgcmVwbGFjZUtleShyZWNvcmQ6IFJlY29yZElkZW50aXR5LCBrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IFJlcGxhY2VLZXlPcGVyYXRpb24ge1xuICAgIHJldHVybiB7IG9wOiAncmVwbGFjZUtleScsIHJlY29yZCwga2V5LCB2YWx1ZSB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEluc3RhbnRpYXRlIGEgbmV3IGByZXBsYWNlQXR0cmlidXRlYCBvcGVyYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7UmVjb3JkSWRlbnRpdHl9IHJlY29yZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXR0cmlidXRlXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICogQHJldHVybnMge1JlcGxhY2VBdHRyaWJ1dGVPcGVyYXRpb259XG4gICAqL1xuICByZXBsYWNlQXR0cmlidXRlKHJlY29yZDogUmVjb3JkSWRlbnRpdHksIGF0dHJpYnV0ZTogc3RyaW5nLCB2YWx1ZTogYW55KTogUmVwbGFjZUF0dHJpYnV0ZU9wZXJhdGlvbiB7XG4gICAgcmV0dXJuIHsgb3A6ICdyZXBsYWNlQXR0cmlidXRlJywgcmVjb3JkLCBhdHRyaWJ1dGUsIHZhbHVlIH07XG4gIH1cblxuICAvKipcbiAgICogSW5zdGFudGlhdGUgYSBuZXcgYGFkZFRvUmVsYXRlZFJlY29yZHNgIG9wZXJhdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtSZWNvcmRJZGVudGl0eX0gcmVjb3JkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbnNoaXBcbiAgICogQHBhcmFtIHtSZWNvcmRJZGVudGl0eX0gcmVsYXRlZFJlY29yZFxuICAgKiBAcmV0dXJucyB7QWRkVG9SZWxhdGVkUmVjb3Jkc09wZXJhdGlvbn1cbiAgICovXG4gIGFkZFRvUmVsYXRlZFJlY29yZHMocmVjb3JkOiBSZWNvcmRJZGVudGl0eSwgcmVsYXRpb25zaGlwOiBzdHJpbmcsIHJlbGF0ZWRSZWNvcmQ6IFJlY29yZElkZW50aXR5KTogQWRkVG9SZWxhdGVkUmVjb3Jkc09wZXJhdGlvbiB7XG4gICAgcmV0dXJuIHsgb3A6ICdhZGRUb1JlbGF0ZWRSZWNvcmRzJywgcmVjb3JkLCByZWxhdGlvbnNoaXAsIHJlbGF0ZWRSZWNvcmQgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnN0YW50aWF0ZSBhIG5ldyBgcmVtb3ZlRnJvbVJlbGF0ZWRSZWNvcmRzYCBvcGVyYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7UmVjb3JkSWRlbnRpdHl9IHJlY29yZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25zaGlwXG4gICAqIEBwYXJhbSB7UmVjb3JkSWRlbnRpdHl9IHJlbGF0ZWRSZWNvcmRcbiAgICogQHJldHVybnMge1JlbW92ZUZyb21SZWxhdGVkUmVjb3Jkc09wZXJhdGlvbn1cbiAgICovXG4gIHJlbW92ZUZyb21SZWxhdGVkUmVjb3JkcyhyZWNvcmQ6IFJlY29yZElkZW50aXR5LCByZWxhdGlvbnNoaXA6IHN0cmluZywgcmVsYXRlZFJlY29yZDogUmVjb3JkSWRlbnRpdHkpOiBSZW1vdmVGcm9tUmVsYXRlZFJlY29yZHNPcGVyYXRpb24ge1xuICAgIHJldHVybiB7IG9wOiAncmVtb3ZlRnJvbVJlbGF0ZWRSZWNvcmRzJywgcmVjb3JkLCByZWxhdGlvbnNoaXAsIHJlbGF0ZWRSZWNvcmQgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnN0YW50aWF0ZSBhIG5ldyBgcmVwbGFjZVJlbGF0ZWRSZWNvcmRzYCBvcGVyYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7UmVjb3JkSWRlbnRpdHl9IHJlY29yZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25zaGlwXG4gICAqIEBwYXJhbSB7UmVjb3JkSWRlbnRpdHlbXX0gcmVsYXRlZFJlY29yZHNcbiAgICogQHJldHVybnMge1JlcGxhY2VSZWxhdGVkUmVjb3Jkc09wZXJhdGlvbn1cbiAgICovXG4gIHJlcGxhY2VSZWxhdGVkUmVjb3JkcyhyZWNvcmQ6IFJlY29yZElkZW50aXR5LCByZWxhdGlvbnNoaXA6IHN0cmluZywgcmVsYXRlZFJlY29yZHM6IFJlY29yZElkZW50aXR5W10pOiBSZXBsYWNlUmVsYXRlZFJlY29yZHNPcGVyYXRpb24ge1xuICAgIHJldHVybiB7IG9wOiAncmVwbGFjZVJlbGF0ZWRSZWNvcmRzJywgcmVjb3JkLCByZWxhdGlvbnNoaXAsIHJlbGF0ZWRSZWNvcmRzIH07XG4gIH1cblxuICAvKipcbiAgICogSW5zdGFudGlhdGUgYSBuZXcgYHJlcGxhY2VSZWxhdGVkUmVjb3JkYCBvcGVyYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7UmVjb3JkSWRlbnRpdHl9IHJlY29yZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25zaGlwXG4gICAqIEBwYXJhbSB7UmVjb3JkSWRlbnRpdHl9IHJlbGF0ZWRSZWNvcmRcbiAgICogQHJldHVybnMge1JlcGxhY2VSZWxhdGVkUmVjb3JkT3BlcmF0aW9ufVxuICAgKi9cbiAgcmVwbGFjZVJlbGF0ZWRSZWNvcmQocmVjb3JkOiBSZWNvcmRJZGVudGl0eSwgcmVsYXRpb25zaGlwOiBzdHJpbmcsIHJlbGF0ZWRSZWNvcmQ6IFJlY29yZElkZW50aXR5KTogUmVwbGFjZVJlbGF0ZWRSZWNvcmRPcGVyYXRpb24ge1xuICAgIHJldHVybiB7IG9wOiAncmVwbGFjZVJlbGF0ZWRSZWNvcmQnLCByZWNvcmQsIHJlbGF0aW9uc2hpcCwgcmVsYXRlZFJlY29yZCB9O1xuICB9XG59Il19