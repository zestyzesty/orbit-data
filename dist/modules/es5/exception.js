function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

import { Exception } from '@orbit/core';
/**
 * An client-side error occurred while communicating with a remote server.
 *
 * @export
 * @class ClientError
 * @extends {Exception}
 */
export var ClientError = function (_Exception) {
    _inherits(ClientError, _Exception);

    function ClientError(description) {
        _classCallCheck(this, ClientError);

        var _this = _possibleConstructorReturn(this, _Exception.call(this, 'Client error: ' + description));

        _this.description = description;
        return _this;
    }

    return ClientError;
}(Exception);
/**
 * A server-side error occurred while communicating with a remote server.
 *
 * @export
 * @class ServerError
 * @extends {Exception}
 */
export var ServerError = function (_Exception2) {
    _inherits(ServerError, _Exception2);

    function ServerError(description) {
        _classCallCheck(this, ServerError);

        var _this2 = _possibleConstructorReturn(this, _Exception2.call(this, 'Server error: ' + description));

        _this2.description = description;
        return _this2;
    }

    return ServerError;
}(Exception);
/**
 * A networking error occurred while attempting to communicate with a remote
 * server.
 *
 * @export
 * @class NetworkError
 * @extends {Exception}
 */
export var NetworkError = function (_Exception3) {
    _inherits(NetworkError, _Exception3);

    function NetworkError(description) {
        _classCallCheck(this, NetworkError);

        var _this3 = _possibleConstructorReturn(this, _Exception3.call(this, 'Network error: ' + description));

        _this3.description = description;
        return _this3;
    }

    return NetworkError;
}(Exception);
/**
 * A query expression could not be parsed.
 *
 * @export
 * @class QueryExpressionParseError
 * @extends {Exception}
 */
export var QueryExpressionParseError = function (_Exception4) {
    _inherits(QueryExpressionParseError, _Exception4);

    function QueryExpressionParseError(description, expression) {
        _classCallCheck(this, QueryExpressionParseError);

        var _this4 = _possibleConstructorReturn(this, _Exception4.call(this, 'Query expression parse error: ' + description));

        _this4.description = description;
        _this4.expression = expression;
        return _this4;
    }

    return QueryExpressionParseError;
}(Exception);
/**
 * A query is invalid for a particular source.
 *
 * @export
 * @class QueryNotAllowed
 * @extends {Exception}
 */
export var QueryNotAllowed = function (_Exception5) {
    _inherits(QueryNotAllowed, _Exception5);

    function QueryNotAllowed(description, query) {
        _classCallCheck(this, QueryNotAllowed);

        var _this5 = _possibleConstructorReturn(this, _Exception5.call(this, 'Query not allowed: ' + description));

        _this5.description = description;
        _this5.query = query;
        return _this5;
    }

    return QueryNotAllowed;
}(Exception);
/**
 * A transform is invalid for a particular source.
 *
 * @export
 * @class TransformNotAllowed
 * @extends {Exception}
 */
export var TransformNotAllowed = function (_Exception6) {
    _inherits(TransformNotAllowed, _Exception6);

    function TransformNotAllowed(description, transform) {
        _classCallCheck(this, TransformNotAllowed);

        var _this6 = _possibleConstructorReturn(this, _Exception6.call(this, 'Transform not allowed: ' + description));

        _this6.description = description;
        _this6.transform = transform;
        return _this6;
    }

    return TransformNotAllowed;
}(Exception);
/**
 * An error occured related to the schema.
 *
 * @export
 * @class SchemaError
 */
export var SchemaError = function (_Exception7) {
    _inherits(SchemaError, _Exception7);

    function SchemaError(description) {
        _classCallCheck(this, SchemaError);

        var _this7 = _possibleConstructorReturn(this, _Exception7.call(this, 'Schema error: ' + description));

        _this7.description = description;
        return _this7;
    }

    return SchemaError;
}(Exception);
/**
 * A model could not be found in the schema.
 *
 * @export
 * @class ModelNotFound
 */
export var ModelNotFound = function (_SchemaError) {
    _inherits(ModelNotFound, _SchemaError);

    function ModelNotFound(type) {
        _classCallCheck(this, ModelNotFound);

        return _possibleConstructorReturn(this, _SchemaError.call(this, 'Model definition for ' + type + ' not found'));
    }

    return ModelNotFound;
}(SchemaError);
/**
 * An error occurred related to a particular record.
 *
 * @export
 * @abstract
 * @class RecordException
 * @extends {Exception}
 */
export var RecordException = function (_Exception8) {
    _inherits(RecordException, _Exception8);

    function RecordException(description, type, id, relationship) {
        _classCallCheck(this, RecordException);

        var message = description + ': ' + type + ':' + id;
        if (relationship) {
            message += '/' + relationship;
        }

        var _this9 = _possibleConstructorReturn(this, _Exception8.call(this, message));

        _this9.description = description;
        _this9.type = type;
        _this9.id = id;
        _this9.relationship = relationship;
        return _this9;
    }

    return RecordException;
}(Exception);
/**
 * A record could not be found.
 *
 * @export
 * @class RecordNotFoundException
 * @extends {RecordException}
 */
export var RecordNotFoundException = function (_RecordException) {
    _inherits(RecordNotFoundException, _RecordException);

    function RecordNotFoundException(type, id) {
        _classCallCheck(this, RecordNotFoundException);

        return _possibleConstructorReturn(this, _RecordException.call(this, 'Record not found', type, id));
    }

    return RecordNotFoundException;
}(RecordException);
/**
 * A relationship could not be found.
 *
 * @export
 * @class RelationshipNotFoundException
 * @extends {RecordException}
 */
export var RelationshipNotFoundException = function (_RecordException2) {
    _inherits(RelationshipNotFoundException, _RecordException2);

    function RelationshipNotFoundException(type, id, relationship) {
        _classCallCheck(this, RelationshipNotFoundException);

        return _possibleConstructorReturn(this, _RecordException2.call(this, 'Relationship not found', type, id, relationship));
    }

    return RelationshipNotFoundException;
}(RecordException);
/**
 * The record already exists.
 *
 * @export
 * @class RecordAlreadyExistsException
 * @extends {RecordException}
 */
export var RecordAlreadyExistsException = function (_RecordException3) {
    _inherits(RecordAlreadyExistsException, _RecordException3);

    function RecordAlreadyExistsException(type, id) {
        _classCallCheck(this, RecordAlreadyExistsException);

        return _possibleConstructorReturn(this, _RecordException3.call(this, 'Record already exists', type, id));
    }

    return RecordAlreadyExistsException;
}(RecordException);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjZXB0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3JjL2V4Y2VwdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLEFBQU8sU0FBRSxBQUFTLEFBQUUsaUJBQU0sQUFBYSxBQUFDO0FBRXhDLEFBTUc7Ozs7Ozs7QUFDSCxBQUFNLFdBQW1COzs7QUFHdkIseUJBQVksQUFBbUI7OztxREFDN0IsQUFBSyxBQUFDLHlDQUFpQixBQUFXLEFBQUUsQUFBQyxBQUFDOztBQUN0QyxBQUFJLGNBQUMsQUFBVyxjQUFHLEFBQVcsQUFBQyxBQUNqQzs7QUFBQyxBQUNGOzs7RUFQZ0MsQUFBUztBQVMxQyxBQU1HOzs7Ozs7O0FBQ0gsQUFBTSxXQUFtQjs7O0FBR3ZCLHlCQUFZLEFBQW1COzs7c0RBQzdCLEFBQUssQUFBQywwQ0FBaUIsQUFBVyxBQUFFLEFBQUMsQUFBQzs7QUFDdEMsQUFBSSxlQUFDLEFBQVcsY0FBRyxBQUFXLEFBQUMsQUFDakM7O0FBQUMsQUFDRjs7O0VBUGdDLEFBQVM7QUFTMUMsQUFPRzs7Ozs7Ozs7QUFDSCxBQUFNLFdBQW9COzs7QUFHeEIsMEJBQVksQUFBbUI7OztzREFDN0IsQUFBSyxBQUFDLDJDQUFrQixBQUFXLEFBQUUsQUFBQyxBQUFDOztBQUN2QyxBQUFJLGVBQUMsQUFBVyxjQUFHLEFBQVcsQUFBQyxBQUNqQzs7QUFBQyxBQUNGOzs7RUFQaUMsQUFBUztBQVMzQyxBQU1HOzs7Ozs7O0FBQ0gsQUFBTSxXQUFpQzs7O0FBSXJDLHVDQUFZLEFBQW1CLGFBQUUsQUFBZTs7O3NEQUM5QyxBQUFLLEFBQUMsMERBQWlDLEFBQVcsQUFBRSxBQUFDLEFBQUM7O0FBQ3RELEFBQUksZUFBQyxBQUFXLGNBQUcsQUFBVyxBQUFDO0FBQy9CLEFBQUksZUFBQyxBQUFVLGFBQUcsQUFBVSxBQUFDLEFBQy9COztBQUFDLEFBQ0Y7OztFQVQ4QyxBQUFTO0FBV3hELEFBTUc7Ozs7Ozs7QUFDSCxBQUFNLFdBQXVCOzs7QUFJM0IsNkJBQVksQUFBbUIsYUFBRSxBQUFVOzs7c0RBQ3pDLEFBQUssQUFBQywrQ0FBc0IsQUFBVyxBQUFFLEFBQUMsQUFBQzs7QUFDM0MsQUFBSSxlQUFDLEFBQVcsY0FBRyxBQUFXLEFBQUM7QUFDL0IsQUFBSSxlQUFDLEFBQUssUUFBRyxBQUFLLEFBQUMsQUFDckI7O0FBQUMsQUFDRjs7O0VBVG9DLEFBQVM7QUFXOUMsQUFNRzs7Ozs7OztBQUNILEFBQU0sV0FBMkI7OztBQUkvQixpQ0FBWSxBQUFtQixhQUFFLEFBQWM7OztzREFDN0MsQUFBSyxBQUFDLG1EQUEwQixBQUFXLEFBQUUsQUFBQyxBQUFDOztBQUMvQyxBQUFJLGVBQUMsQUFBVyxjQUFHLEFBQVcsQUFBQztBQUMvQixBQUFJLGVBQUMsQUFBUyxZQUFHLEFBQVMsQUFBQyxBQUM3Qjs7QUFBQyxBQUNGOzs7RUFUd0MsQUFBUztBQVdsRCxBQUtHOzs7Ozs7QUFDSCxBQUFNLFdBQW1COzs7QUFHdkIseUJBQVksQUFBbUI7OztzREFDN0IsQUFBSyxBQUFDLDBDQUFpQixBQUFXLEFBQUUsQUFBQyxBQUFDOztBQUN0QyxBQUFJLGVBQUMsQUFBVyxjQUFHLEFBQVcsQUFBQyxBQUNqQzs7QUFBQyxBQUNGOzs7RUFQZ0MsQUFBUztBQVUxQyxBQUtHOzs7Ozs7QUFDSCxBQUFNLFdBQXFCOzs7QUFDekIsMkJBQVksQUFBWTs7O2dEQUN0QixBQUFLLEFBQUMsa0RBQXdCLEFBQUksQUFBWSxBQUFDLEFBQUMsQUFDbEQ7QUFBQyxBQUNGOzs7RUFKa0MsQUFBVztBQU05QyxBQU9HOzs7Ozs7OztBQUNILEFBQU0sV0FBZ0M7OztBQU1wQyw2QkFBWSxBQUFtQixhQUFFLEFBQVksTUFBRSxBQUFVLElBQUUsQUFBcUI7OztBQUM5RSxZQUFJLEFBQU8sQUFBVyxVQUFHLEFBQVcscUJBQUssQUFBSSxhQUFJLEFBQUUsQUFBRSxBQUFDO0FBRXRELEFBQUUsQUFBQyxZQUFDLEFBQVksQUFBQyxjQUFDLEFBQUM7QUFDakIsQUFBTyx1QkFBSSxBQUFHLE1BQUcsQUFBWSxBQUFDLEFBQ2hDO0FBQUM7O3NEQUVELEFBQUssdUJBQUMsQUFBTyxBQUFDLEFBQUM7O0FBRWYsQUFBSSxlQUFDLEFBQVcsY0FBRyxBQUFXLEFBQUM7QUFDL0IsQUFBSSxlQUFDLEFBQUksT0FBRyxBQUFJLEFBQUM7QUFDakIsQUFBSSxlQUFDLEFBQUUsS0FBRyxBQUFFLEFBQUM7QUFDYixBQUFJLGVBQUMsQUFBWSxlQUFHLEFBQVksQUFBQyxBQUNuQzs7QUFBQyxBQUNGOzs7RUFwQjZDLEFBQVM7QUFzQnZELEFBTUc7Ozs7Ozs7QUFDSCxBQUFNLFdBQStCOzs7QUFDbkMscUNBQVksQUFBWSxNQUFFLEFBQVU7OztnREFDbEMsQUFBSyw0QkFBQyxBQUFrQixvQkFBRSxBQUFJLE1BQUUsQUFBRSxBQUFDLEFBQUMsQUFDdEM7QUFBQyxBQUNGOzs7RUFKNEMsQUFBZTtBQU01RCxBQU1HOzs7Ozs7O0FBQ0gsQUFBTSxXQUFxQzs7O0FBQ3pDLDJDQUFZLEFBQVksTUFBRSxBQUFVLElBQUUsQUFBb0I7OztnREFDeEQsQUFBSyw2QkFBQyxBQUF3QiwwQkFBRSxBQUFJLE1BQUUsQUFBRSxJQUFFLEFBQVksQUFBQyxBQUFDLEFBQzFEO0FBQUMsQUFDRjs7O0VBSmtELEFBQWU7QUFNbEUsQUFNRzs7Ozs7OztBQUNILEFBQU0sV0FBb0M7OztBQUN4QywwQ0FBWSxBQUFZLE1BQUUsQUFBVTs7O2dEQUNsQyxBQUFLLDZCQUFDLEFBQXVCLHlCQUFFLEFBQUksTUFBRSxBQUFFLEFBQUMsQUFBQyxBQUMzQztBQUFDLEFBQ0Y7OztFQUppRCxBQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXhjZXB0aW9uIH0gZnJvbSAnQG9yYml0L2NvcmUnO1xuXG4vKipcbiAqIEFuIGNsaWVudC1zaWRlIGVycm9yIG9jY3VycmVkIHdoaWxlIGNvbW11bmljYXRpbmcgd2l0aCBhIHJlbW90ZSBzZXJ2ZXIuXG4gKiBcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBDbGllbnRFcnJvclxuICogQGV4dGVuZHMge0V4Y2VwdGlvbn1cbiAqL1xuZXhwb3J0IGNsYXNzIENsaWVudEVycm9yIGV4dGVuZHMgRXhjZXB0aW9uIHtcbiAgcHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoZGVzY3JpcHRpb246IHN0cmluZykge1xuICAgIHN1cGVyKGBDbGllbnQgZXJyb3I6ICR7ZGVzY3JpcHRpb259YCk7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICB9XG59XG5cbi8qKlxuICogQSBzZXJ2ZXItc2lkZSBlcnJvciBvY2N1cnJlZCB3aGlsZSBjb21tdW5pY2F0aW5nIHdpdGggYSByZW1vdGUgc2VydmVyLlxuICogXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgU2VydmVyRXJyb3JcbiAqIEBleHRlbmRzIHtFeGNlcHRpb259XG4gKi9cbmV4cG9ydCBjbGFzcyBTZXJ2ZXJFcnJvciBleHRlbmRzIEV4Y2VwdGlvbiB7XG4gIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKGRlc2NyaXB0aW9uOiBzdHJpbmcpIHtcbiAgICBzdXBlcihgU2VydmVyIGVycm9yOiAke2Rlc2NyaXB0aW9ufWApO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgfVxufVxuXG4vKipcbiAqIEEgbmV0d29ya2luZyBlcnJvciBvY2N1cnJlZCB3aGlsZSBhdHRlbXB0aW5nIHRvIGNvbW11bmljYXRlIHdpdGggYSByZW1vdGVcbiAqIHNlcnZlci5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgTmV0d29ya0Vycm9yXG4gKiBAZXh0ZW5kcyB7RXhjZXB0aW9ufVxuICovXG5leHBvcnQgY2xhc3MgTmV0d29ya0Vycm9yIGV4dGVuZHMgRXhjZXB0aW9uIHtcbiAgcHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoZGVzY3JpcHRpb246IHN0cmluZykge1xuICAgIHN1cGVyKGBOZXR3b3JrIGVycm9yOiAke2Rlc2NyaXB0aW9ufWApO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgfVxufVxuXG4vKipcbiAqIEEgcXVlcnkgZXhwcmVzc2lvbiBjb3VsZCBub3QgYmUgcGFyc2VkLlxuICogXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgUXVlcnlFeHByZXNzaW9uUGFyc2VFcnJvclxuICogQGV4dGVuZHMge0V4Y2VwdGlvbn1cbiAqL1xuZXhwb3J0IGNsYXNzIFF1ZXJ5RXhwcmVzc2lvblBhcnNlRXJyb3IgZXh0ZW5kcyBFeGNlcHRpb24ge1xuICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZztcbiAgcHVibGljIGV4cHJlc3Npb246IGFueTtcblxuICBjb25zdHJ1Y3RvcihkZXNjcmlwdGlvbjogc3RyaW5nLCBleHByZXNzaW9uOiBhbnkpIHtcbiAgICBzdXBlcihgUXVlcnkgZXhwcmVzc2lvbiBwYXJzZSBlcnJvcjogJHtkZXNjcmlwdGlvbn1gKTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgdGhpcy5leHByZXNzaW9uID0gZXhwcmVzc2lvbjtcbiAgfVxufVxuXG4vKipcbiAqIEEgcXVlcnkgaXMgaW52YWxpZCBmb3IgYSBwYXJ0aWN1bGFyIHNvdXJjZS5cbiAqIFxuICogQGV4cG9ydFxuICogQGNsYXNzIFF1ZXJ5Tm90QWxsb3dlZFxuICogQGV4dGVuZHMge0V4Y2VwdGlvbn1cbiAqL1xuZXhwb3J0IGNsYXNzIFF1ZXJ5Tm90QWxsb3dlZCBleHRlbmRzIEV4Y2VwdGlvbiB7XG4gIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBwdWJsaWMgcXVlcnk6IGFueTtcblxuICBjb25zdHJ1Y3RvcihkZXNjcmlwdGlvbjogc3RyaW5nLCBxdWVyeTogYW55KSB7XG4gICAgc3VwZXIoYFF1ZXJ5IG5vdCBhbGxvd2VkOiAke2Rlc2NyaXB0aW9ufWApO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICB0aGlzLnF1ZXJ5ID0gcXVlcnk7XG4gIH1cbn1cblxuLyoqXG4gKiBBIHRyYW5zZm9ybSBpcyBpbnZhbGlkIGZvciBhIHBhcnRpY3VsYXIgc291cmNlLlxuICogXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgVHJhbnNmb3JtTm90QWxsb3dlZFxuICogQGV4dGVuZHMge0V4Y2VwdGlvbn1cbiAqL1xuZXhwb3J0IGNsYXNzIFRyYW5zZm9ybU5vdEFsbG93ZWQgZXh0ZW5kcyBFeGNlcHRpb24ge1xuICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZztcbiAgcHVibGljIHRyYW5zZm9ybTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKGRlc2NyaXB0aW9uOiBzdHJpbmcsIHRyYW5zZm9ybTogYW55KSB7XG4gICAgc3VwZXIoYFRyYW5zZm9ybSBub3QgYWxsb3dlZDogJHtkZXNjcmlwdGlvbn1gKTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgdGhpcy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm07XG4gIH1cbn1cblxuLyoqXG4gKiBBbiBlcnJvciBvY2N1cmVkIHJlbGF0ZWQgdG8gdGhlIHNjaGVtYS5cbiAqIFxuICogQGV4cG9ydFxuICogQGNsYXNzIFNjaGVtYUVycm9yXG4gKi9cbmV4cG9ydCBjbGFzcyBTY2hlbWFFcnJvciBleHRlbmRzIEV4Y2VwdGlvbiB7XG4gIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKGRlc2NyaXB0aW9uOiBzdHJpbmcpIHtcbiAgICBzdXBlcihgU2NoZW1hIGVycm9yOiAke2Rlc2NyaXB0aW9ufWApO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgfVxufVxuXG5cbi8qKlxuICogQSBtb2RlbCBjb3VsZCBub3QgYmUgZm91bmQgaW4gdGhlIHNjaGVtYS5cbiAqIFxuICogQGV4cG9ydFxuICogQGNsYXNzIE1vZGVsTm90Rm91bmRcbiAqL1xuZXhwb3J0IGNsYXNzIE1vZGVsTm90Rm91bmQgZXh0ZW5kcyBTY2hlbWFFcnJvciB7XG4gIGNvbnN0cnVjdG9yKHR5cGU6IHN0cmluZykge1xuICAgIHN1cGVyKGBNb2RlbCBkZWZpbml0aW9uIGZvciAke3R5cGV9IG5vdCBmb3VuZGApO1xuICB9XG59XG5cbi8qKlxuICogQW4gZXJyb3Igb2NjdXJyZWQgcmVsYXRlZCB0byBhIHBhcnRpY3VsYXIgcmVjb3JkLlxuICogXG4gKiBAZXhwb3J0XG4gKiBAYWJzdHJhY3RcbiAqIEBjbGFzcyBSZWNvcmRFeGNlcHRpb25cbiAqIEBleHRlbmRzIHtFeGNlcHRpb259XG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSZWNvcmRFeGNlcHRpb24gZXh0ZW5kcyBFeGNlcHRpb24ge1xuICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZztcbiAgcHVibGljIHR5cGU6IHN0cmluZztcbiAgcHVibGljIGlkOiBzdHJpbmc7XG4gIHB1YmxpYyByZWxhdGlvbnNoaXA6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihkZXNjcmlwdGlvbjogc3RyaW5nLCB0eXBlOiBzdHJpbmcsIGlkOiBzdHJpbmcsIHJlbGF0aW9uc2hpcD86IHN0cmluZykge1xuICAgIGxldCBtZXNzYWdlOiBzdHJpbmcgPSBgJHtkZXNjcmlwdGlvbn06ICR7dHlwZX06JHtpZH1gO1xuXG4gICAgaWYgKHJlbGF0aW9uc2hpcCkge1xuICAgICAgbWVzc2FnZSArPSAnLycgKyByZWxhdGlvbnNoaXA7XG4gICAgfVxuXG4gICAgc3VwZXIobWVzc2FnZSk7XG5cbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy5yZWxhdGlvbnNoaXAgPSByZWxhdGlvbnNoaXA7XG4gIH1cbn1cblxuLyoqXG4gKiBBIHJlY29yZCBjb3VsZCBub3QgYmUgZm91bmQuXG4gKiBcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBSZWNvcmROb3RGb3VuZEV4Y2VwdGlvblxuICogQGV4dGVuZHMge1JlY29yZEV4Y2VwdGlvbn1cbiAqL1xuZXhwb3J0IGNsYXNzIFJlY29yZE5vdEZvdW5kRXhjZXB0aW9uIGV4dGVuZHMgUmVjb3JkRXhjZXB0aW9uIHtcbiAgY29uc3RydWN0b3IodHlwZTogc3RyaW5nLCBpZDogc3RyaW5nKSB7XG4gICAgc3VwZXIoJ1JlY29yZCBub3QgZm91bmQnLCB0eXBlLCBpZCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBIHJlbGF0aW9uc2hpcCBjb3VsZCBub3QgYmUgZm91bmQuXG4gKiBcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBSZWxhdGlvbnNoaXBOb3RGb3VuZEV4Y2VwdGlvblxuICogQGV4dGVuZHMge1JlY29yZEV4Y2VwdGlvbn1cbiAqL1xuZXhwb3J0IGNsYXNzIFJlbGF0aW9uc2hpcE5vdEZvdW5kRXhjZXB0aW9uIGV4dGVuZHMgUmVjb3JkRXhjZXB0aW9uIHtcbiAgY29uc3RydWN0b3IodHlwZTogc3RyaW5nLCBpZDogc3RyaW5nLCByZWxhdGlvbnNoaXA6IHN0cmluZykge1xuICAgIHN1cGVyKCdSZWxhdGlvbnNoaXAgbm90IGZvdW5kJywgdHlwZSwgaWQsIHJlbGF0aW9uc2hpcCk7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGUgcmVjb3JkIGFscmVhZHkgZXhpc3RzLlxuICogXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgUmVjb3JkQWxyZWFkeUV4aXN0c0V4Y2VwdGlvblxuICogQGV4dGVuZHMge1JlY29yZEV4Y2VwdGlvbn1cbiAqL1xuZXhwb3J0IGNsYXNzIFJlY29yZEFscmVhZHlFeGlzdHNFeGNlcHRpb24gZXh0ZW5kcyBSZWNvcmRFeGNlcHRpb24ge1xuICBjb25zdHJ1Y3Rvcih0eXBlOiBzdHJpbmcsIGlkOiBzdHJpbmcpIHtcbiAgICBzdXBlcignUmVjb3JkIGFscmVhZHkgZXhpc3RzJywgdHlwZSwgaWQpO1xuICB9XG59XG4iXX0=