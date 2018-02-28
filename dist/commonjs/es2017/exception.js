'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RecordAlreadyExistsException = exports.RelationshipNotFoundException = exports.RecordNotFoundException = exports.RecordException = exports.ModelNotFound = exports.SchemaError = exports.TransformNotAllowed = exports.QueryNotAllowed = exports.QueryExpressionParseError = exports.NetworkError = exports.ServerError = exports.ClientError = undefined;

var _core = require('@orbit/core');

/**
 * An client-side error occurred while communicating with a remote server.
 *
 * @export
 * @class ClientError
 * @extends {Exception}
 */
class ClientError extends _core.Exception {
    constructor(description) {
        super(`Client error: ${description}`);
        this.description = description;
    }
}
exports.ClientError = ClientError; /**
                                    * A server-side error occurred while communicating with a remote server.
                                    *
                                    * @export
                                    * @class ServerError
                                    * @extends {Exception}
                                    */

class ServerError extends _core.Exception {
    constructor(description) {
        super(`Server error: ${description}`);
        this.description = description;
    }
}
exports.ServerError = ServerError; /**
                                    * A networking error occurred while attempting to communicate with a remote
                                    * server.
                                    *
                                    * @export
                                    * @class NetworkError
                                    * @extends {Exception}
                                    */

class NetworkError extends _core.Exception {
    constructor(description) {
        super(`Network error: ${description}`);
        this.description = description;
    }
}
exports.NetworkError = NetworkError; /**
                                      * A query expression could not be parsed.
                                      *
                                      * @export
                                      * @class QueryExpressionParseError
                                      * @extends {Exception}
                                      */

class QueryExpressionParseError extends _core.Exception {
    constructor(description, expression) {
        super(`Query expression parse error: ${description}`);
        this.description = description;
        this.expression = expression;
    }
}
exports.QueryExpressionParseError = QueryExpressionParseError; /**
                                                                * A query is invalid for a particular source.
                                                                *
                                                                * @export
                                                                * @class QueryNotAllowed
                                                                * @extends {Exception}
                                                                */

class QueryNotAllowed extends _core.Exception {
    constructor(description, query) {
        super(`Query not allowed: ${description}`);
        this.description = description;
        this.query = query;
    }
}
exports.QueryNotAllowed = QueryNotAllowed; /**
                                            * A transform is invalid for a particular source.
                                            *
                                            * @export
                                            * @class TransformNotAllowed
                                            * @extends {Exception}
                                            */

class TransformNotAllowed extends _core.Exception {
    constructor(description, transform) {
        super(`Transform not allowed: ${description}`);
        this.description = description;
        this.transform = transform;
    }
}
exports.TransformNotAllowed = TransformNotAllowed; /**
                                                    * An error occured related to the schema.
                                                    *
                                                    * @export
                                                    * @class SchemaError
                                                    */

class SchemaError extends _core.Exception {
    constructor(description) {
        super(`Schema error: ${description}`);
        this.description = description;
    }
}
exports.SchemaError = SchemaError; /**
                                    * A model could not be found in the schema.
                                    *
                                    * @export
                                    * @class ModelNotFound
                                    */

class ModelNotFound extends SchemaError {
    constructor(type) {
        super(`Model definition for ${type} not found`);
    }
}
exports.ModelNotFound = ModelNotFound; /**
                                        * An error occurred related to a particular record.
                                        *
                                        * @export
                                        * @abstract
                                        * @class RecordException
                                        * @extends {Exception}
                                        */

class RecordException extends _core.Exception {
    constructor(description, type, id, relationship) {
        let message = `${description}: ${type}:${id}`;
        if (relationship) {
            message += '/' + relationship;
        }
        super(message);
        this.description = description;
        this.type = type;
        this.id = id;
        this.relationship = relationship;
    }
}
exports.RecordException = RecordException; /**
                                            * A record could not be found.
                                            *
                                            * @export
                                            * @class RecordNotFoundException
                                            * @extends {RecordException}
                                            */

class RecordNotFoundException extends RecordException {
    constructor(type, id) {
        super('Record not found', type, id);
    }
}
exports.RecordNotFoundException = RecordNotFoundException; /**
                                                            * A relationship could not be found.
                                                            *
                                                            * @export
                                                            * @class RelationshipNotFoundException
                                                            * @extends {RecordException}
                                                            */

class RelationshipNotFoundException extends RecordException {
    constructor(type, id, relationship) {
        super('Relationship not found', type, id, relationship);
    }
}
exports.RelationshipNotFoundException = RelationshipNotFoundException; /**
                                                                        * The record already exists.
                                                                        *
                                                                        * @export
                                                                        * @class RecordAlreadyExistsException
                                                                        * @extends {RecordException}
                                                                        */

class RecordAlreadyExistsException extends RecordException {
    constructor(type, id) {
        super('Record already exists', type, id);
    }
}
exports.RecordAlreadyExistsException = RecordAlreadyExistsException;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjZXB0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3JjL2V4Y2VwdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsQUFBTyxBQUFFLEFBQVMsQUFBRSxBQUFNLEFBQWEsQUFBQzs7QUFFeEMsQUFNRyxBQUNILEFBQU07Ozs7Ozs7TUFBbUIsQUFBUSxBQUFTO0FBR3hDLGdCQUFZLEFBQW1CO0FBQzdCLEFBQUssQUFBQywrQkFBaUIsQUFBVyxXQUFFLEFBQUMsQUFBQztBQUN0QyxBQUFJLGFBQUMsQUFBVyxjQUFHLEFBQVcsQUFBQyxBQUNqQztBQUFDLEFBQ0Y7O21DQUVELEFBTUcsQUFDSCxBQUFNOzs7Ozs7OztNQUFtQixBQUFRLEFBQVM7QUFHeEMsZ0JBQVksQUFBbUI7QUFDN0IsQUFBSyxBQUFDLCtCQUFpQixBQUFXLFdBQUUsQUFBQyxBQUFDO0FBQ3RDLEFBQUksYUFBQyxBQUFXLGNBQUcsQUFBVyxBQUFDLEFBQ2pDO0FBQUMsQUFDRjs7bUNBRUQsQUFPRyxBQUNILEFBQU07Ozs7Ozs7OztNQUFvQixBQUFRLEFBQVM7QUFHekMsZ0JBQVksQUFBbUI7QUFDN0IsQUFBSyxBQUFDLGdDQUFrQixBQUFXLFdBQUUsQUFBQyxBQUFDO0FBQ3ZDLEFBQUksYUFBQyxBQUFXLGNBQUcsQUFBVyxBQUFDLEFBQ2pDO0FBQUMsQUFDRjs7cUNBRUQsQUFNRyxBQUNILEFBQU07Ozs7Ozs7O01BQWlDLEFBQVEsQUFBUztBQUl0RCxnQkFBWSxBQUFtQixhQUFFLEFBQWU7QUFDOUMsQUFBSyxBQUFDLCtDQUFpQyxBQUFXLFdBQUUsQUFBQyxBQUFDO0FBQ3RELEFBQUksYUFBQyxBQUFXLGNBQUcsQUFBVyxBQUFDO0FBQy9CLEFBQUksYUFBQyxBQUFVLGFBQUcsQUFBVSxBQUFDLEFBQy9CO0FBQUMsQUFDRjs7K0RBRUQsQUFNRyxBQUNILEFBQU07Ozs7Ozs7O01BQXVCLEFBQVEsQUFBUztBQUk1QyxnQkFBWSxBQUFtQixhQUFFLEFBQVU7QUFDekMsQUFBSyxBQUFDLG9DQUFzQixBQUFXLFdBQUUsQUFBQyxBQUFDO0FBQzNDLEFBQUksYUFBQyxBQUFXLGNBQUcsQUFBVyxBQUFDO0FBQy9CLEFBQUksYUFBQyxBQUFLLFFBQUcsQUFBSyxBQUFDLEFBQ3JCO0FBQUMsQUFDRjs7MkNBRUQsQUFNRyxBQUNILEFBQU07Ozs7Ozs7O01BQTJCLEFBQVEsQUFBUztBQUloRCxnQkFBWSxBQUFtQixhQUFFLEFBQWM7QUFDN0MsQUFBSyxBQUFDLHdDQUEwQixBQUFXLFdBQUUsQUFBQyxBQUFDO0FBQy9DLEFBQUksYUFBQyxBQUFXLGNBQUcsQUFBVyxBQUFDO0FBQy9CLEFBQUksYUFBQyxBQUFTLFlBQUcsQUFBUyxBQUFDLEFBQzdCO0FBQUMsQUFDRjs7bURBRUQsQUFLRyxBQUNILEFBQU07Ozs7Ozs7TUFBbUIsQUFBUSxBQUFTO0FBR3hDLGdCQUFZLEFBQW1CO0FBQzdCLEFBQUssQUFBQywrQkFBaUIsQUFBVyxXQUFFLEFBQUMsQUFBQztBQUN0QyxBQUFJLGFBQUMsQUFBVyxjQUFHLEFBQVcsQUFBQyxBQUNqQztBQUFDLEFBQ0Y7O21DQUdELEFBS0csQUFDSCxBQUFNOzs7Ozs7O01BQXFCLHNCQUFRLEFBQVc7QUFDNUMsZ0JBQVksQUFBWTtBQUN0QixBQUFLLEFBQUMsc0NBQXdCLEFBQUksSUFBWSxBQUFDLEFBQUMsQUFDbEQ7QUFBQyxBQUNGOzt1Q0FFRCxBQU9HLEFBQ0gsQUFBTTs7Ozs7Ozs7O01BQWdDLEFBQVEsQUFBUztBQU1yRCxnQkFBWSxBQUFtQixhQUFFLEFBQVksTUFBRSxBQUFVLElBQUUsQUFBcUI7QUFDOUUsWUFBSSxBQUFPLEFBQVcsYUFBRyxBQUFXLGdCQUFLLEFBQUksUUFBSSxBQUFFLEVBQUUsQUFBQztBQUV0RCxBQUFFLEFBQUMsWUFBQyxBQUFZLEFBQUMsY0FBQyxBQUFDO0FBQ2pCLEFBQU8sdUJBQUksQUFBRyxNQUFHLEFBQVksQUFBQyxBQUNoQztBQUFDO0FBRUQsQUFBSyxjQUFDLEFBQU8sQUFBQyxBQUFDO0FBRWYsQUFBSSxhQUFDLEFBQVcsY0FBRyxBQUFXLEFBQUM7QUFDL0IsQUFBSSxhQUFDLEFBQUksT0FBRyxBQUFJLEFBQUM7QUFDakIsQUFBSSxhQUFDLEFBQUUsS0FBRyxBQUFFLEFBQUM7QUFDYixBQUFJLGFBQUMsQUFBWSxlQUFHLEFBQVksQUFBQyxBQUNuQztBQUFDLEFBQ0Y7OzJDQUVELEFBTUcsQUFDSCxBQUFNOzs7Ozs7OztNQUErQixnQ0FBUSxBQUFlO0FBQzFELGdCQUFZLEFBQVksTUFBRSxBQUFVO0FBQ2xDLEFBQUssY0FBQyxBQUFrQixvQkFBRSxBQUFJLE1BQUUsQUFBRSxBQUFDLEFBQUMsQUFDdEM7QUFBQyxBQUNGOzsyREFFRCxBQU1HLEFBQ0gsQUFBTTs7Ozs7Ozs7TUFBcUMsc0NBQVEsQUFBZTtBQUNoRSxnQkFBWSxBQUFZLE1BQUUsQUFBVSxJQUFFLEFBQW9CO0FBQ3hELEFBQUssY0FBQyxBQUF3QiwwQkFBRSxBQUFJLE1BQUUsQUFBRSxJQUFFLEFBQVksQUFBQyxBQUFDLEFBQzFEO0FBQUMsQUFDRjs7dUVBRUQsQUFNRyxBQUNILEFBQU07Ozs7Ozs7O01BQW9DLHFDQUFRLEFBQWU7QUFDL0QsZ0JBQVksQUFBWSxNQUFFLEFBQVU7QUFDbEMsQUFBSyxjQUFDLEFBQXVCLHlCQUFFLEFBQUksTUFBRSxBQUFFLEFBQUMsQUFBQyxBQUMzQztBQUFDLEFBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFeGNlcHRpb24gfSBmcm9tICdAb3JiaXQvY29yZSc7XG5cbi8qKlxuICogQW4gY2xpZW50LXNpZGUgZXJyb3Igb2NjdXJyZWQgd2hpbGUgY29tbXVuaWNhdGluZyB3aXRoIGEgcmVtb3RlIHNlcnZlci5cbiAqIFxuICogQGV4cG9ydFxuICogQGNsYXNzIENsaWVudEVycm9yXG4gKiBAZXh0ZW5kcyB7RXhjZXB0aW9ufVxuICovXG5leHBvcnQgY2xhc3MgQ2xpZW50RXJyb3IgZXh0ZW5kcyBFeGNlcHRpb24ge1xuICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihkZXNjcmlwdGlvbjogc3RyaW5nKSB7XG4gICAgc3VwZXIoYENsaWVudCBlcnJvcjogJHtkZXNjcmlwdGlvbn1gKTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gIH1cbn1cblxuLyoqXG4gKiBBIHNlcnZlci1zaWRlIGVycm9yIG9jY3VycmVkIHdoaWxlIGNvbW11bmljYXRpbmcgd2l0aCBhIHJlbW90ZSBzZXJ2ZXIuXG4gKiBcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBTZXJ2ZXJFcnJvclxuICogQGV4dGVuZHMge0V4Y2VwdGlvbn1cbiAqL1xuZXhwb3J0IGNsYXNzIFNlcnZlckVycm9yIGV4dGVuZHMgRXhjZXB0aW9uIHtcbiAgcHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoZGVzY3JpcHRpb246IHN0cmluZykge1xuICAgIHN1cGVyKGBTZXJ2ZXIgZXJyb3I6ICR7ZGVzY3JpcHRpb259YCk7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICB9XG59XG5cbi8qKlxuICogQSBuZXR3b3JraW5nIGVycm9yIG9jY3VycmVkIHdoaWxlIGF0dGVtcHRpbmcgdG8gY29tbXVuaWNhdGUgd2l0aCBhIHJlbW90ZVxuICogc2VydmVyLlxuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBOZXR3b3JrRXJyb3JcbiAqIEBleHRlbmRzIHtFeGNlcHRpb259XG4gKi9cbmV4cG9ydCBjbGFzcyBOZXR3b3JrRXJyb3IgZXh0ZW5kcyBFeGNlcHRpb24ge1xuICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihkZXNjcmlwdGlvbjogc3RyaW5nKSB7XG4gICAgc3VwZXIoYE5ldHdvcmsgZXJyb3I6ICR7ZGVzY3JpcHRpb259YCk7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICB9XG59XG5cbi8qKlxuICogQSBxdWVyeSBleHByZXNzaW9uIGNvdWxkIG5vdCBiZSBwYXJzZWQuXG4gKiBcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBRdWVyeUV4cHJlc3Npb25QYXJzZUVycm9yXG4gKiBAZXh0ZW5kcyB7RXhjZXB0aW9ufVxuICovXG5leHBvcnQgY2xhc3MgUXVlcnlFeHByZXNzaW9uUGFyc2VFcnJvciBleHRlbmRzIEV4Y2VwdGlvbiB7XG4gIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBwdWJsaWMgZXhwcmVzc2lvbjogYW55O1xuXG4gIGNvbnN0cnVjdG9yKGRlc2NyaXB0aW9uOiBzdHJpbmcsIGV4cHJlc3Npb246IGFueSkge1xuICAgIHN1cGVyKGBRdWVyeSBleHByZXNzaW9uIHBhcnNlIGVycm9yOiAke2Rlc2NyaXB0aW9ufWApO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICB0aGlzLmV4cHJlc3Npb24gPSBleHByZXNzaW9uO1xuICB9XG59XG5cbi8qKlxuICogQSBxdWVyeSBpcyBpbnZhbGlkIGZvciBhIHBhcnRpY3VsYXIgc291cmNlLlxuICogXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgUXVlcnlOb3RBbGxvd2VkXG4gKiBAZXh0ZW5kcyB7RXhjZXB0aW9ufVxuICovXG5leHBvcnQgY2xhc3MgUXVlcnlOb3RBbGxvd2VkIGV4dGVuZHMgRXhjZXB0aW9uIHtcbiAgcHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIHB1YmxpYyBxdWVyeTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKGRlc2NyaXB0aW9uOiBzdHJpbmcsIHF1ZXJ5OiBhbnkpIHtcbiAgICBzdXBlcihgUXVlcnkgbm90IGFsbG93ZWQ6ICR7ZGVzY3JpcHRpb259YCk7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHRoaXMucXVlcnkgPSBxdWVyeTtcbiAgfVxufVxuXG4vKipcbiAqIEEgdHJhbnNmb3JtIGlzIGludmFsaWQgZm9yIGEgcGFydGljdWxhciBzb3VyY2UuXG4gKiBcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBUcmFuc2Zvcm1Ob3RBbGxvd2VkXG4gKiBAZXh0ZW5kcyB7RXhjZXB0aW9ufVxuICovXG5leHBvcnQgY2xhc3MgVHJhbnNmb3JtTm90QWxsb3dlZCBleHRlbmRzIEV4Y2VwdGlvbiB7XG4gIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBwdWJsaWMgdHJhbnNmb3JtOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoZGVzY3JpcHRpb246IHN0cmluZywgdHJhbnNmb3JtOiBhbnkpIHtcbiAgICBzdXBlcihgVHJhbnNmb3JtIG5vdCBhbGxvd2VkOiAke2Rlc2NyaXB0aW9ufWApO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICB0aGlzLnRyYW5zZm9ybSA9IHRyYW5zZm9ybTtcbiAgfVxufVxuXG4vKipcbiAqIEFuIGVycm9yIG9jY3VyZWQgcmVsYXRlZCB0byB0aGUgc2NoZW1hLlxuICogXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgU2NoZW1hRXJyb3JcbiAqL1xuZXhwb3J0IGNsYXNzIFNjaGVtYUVycm9yIGV4dGVuZHMgRXhjZXB0aW9uIHtcbiAgcHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoZGVzY3JpcHRpb246IHN0cmluZykge1xuICAgIHN1cGVyKGBTY2hlbWEgZXJyb3I6ICR7ZGVzY3JpcHRpb259YCk7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICB9XG59XG5cblxuLyoqXG4gKiBBIG1vZGVsIGNvdWxkIG5vdCBiZSBmb3VuZCBpbiB0aGUgc2NoZW1hLlxuICogXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgTW9kZWxOb3RGb3VuZFxuICovXG5leHBvcnQgY2xhc3MgTW9kZWxOb3RGb3VuZCBleHRlbmRzIFNjaGVtYUVycm9yIHtcbiAgY29uc3RydWN0b3IodHlwZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoYE1vZGVsIGRlZmluaXRpb24gZm9yICR7dHlwZX0gbm90IGZvdW5kYCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBbiBlcnJvciBvY2N1cnJlZCByZWxhdGVkIHRvIGEgcGFydGljdWxhciByZWNvcmQuXG4gKiBcbiAqIEBleHBvcnRcbiAqIEBhYnN0cmFjdFxuICogQGNsYXNzIFJlY29yZEV4Y2VwdGlvblxuICogQGV4dGVuZHMge0V4Y2VwdGlvbn1cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJlY29yZEV4Y2VwdGlvbiBleHRlbmRzIEV4Y2VwdGlvbiB7XG4gIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBwdWJsaWMgdHlwZTogc3RyaW5nO1xuICBwdWJsaWMgaWQ6IHN0cmluZztcbiAgcHVibGljIHJlbGF0aW9uc2hpcDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKGRlc2NyaXB0aW9uOiBzdHJpbmcsIHR5cGU6IHN0cmluZywgaWQ6IHN0cmluZywgcmVsYXRpb25zaGlwPzogc3RyaW5nKSB7XG4gICAgbGV0IG1lc3NhZ2U6IHN0cmluZyA9IGAke2Rlc2NyaXB0aW9ufTogJHt0eXBlfToke2lkfWA7XG5cbiAgICBpZiAocmVsYXRpb25zaGlwKSB7XG4gICAgICBtZXNzYWdlICs9ICcvJyArIHJlbGF0aW9uc2hpcDtcbiAgICB9XG5cbiAgICBzdXBlcihtZXNzYWdlKTtcblxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLnJlbGF0aW9uc2hpcCA9IHJlbGF0aW9uc2hpcDtcbiAgfVxufVxuXG4vKipcbiAqIEEgcmVjb3JkIGNvdWxkIG5vdCBiZSBmb3VuZC5cbiAqIFxuICogQGV4cG9ydFxuICogQGNsYXNzIFJlY29yZE5vdEZvdW5kRXhjZXB0aW9uXG4gKiBAZXh0ZW5kcyB7UmVjb3JkRXhjZXB0aW9ufVxuICovXG5leHBvcnQgY2xhc3MgUmVjb3JkTm90Rm91bmRFeGNlcHRpb24gZXh0ZW5kcyBSZWNvcmRFeGNlcHRpb24ge1xuICBjb25zdHJ1Y3Rvcih0eXBlOiBzdHJpbmcsIGlkOiBzdHJpbmcpIHtcbiAgICBzdXBlcignUmVjb3JkIG5vdCBmb3VuZCcsIHR5cGUsIGlkKTtcbiAgfVxufVxuXG4vKipcbiAqIEEgcmVsYXRpb25zaGlwIGNvdWxkIG5vdCBiZSBmb3VuZC5cbiAqIFxuICogQGV4cG9ydFxuICogQGNsYXNzIFJlbGF0aW9uc2hpcE5vdEZvdW5kRXhjZXB0aW9uXG4gKiBAZXh0ZW5kcyB7UmVjb3JkRXhjZXB0aW9ufVxuICovXG5leHBvcnQgY2xhc3MgUmVsYXRpb25zaGlwTm90Rm91bmRFeGNlcHRpb24gZXh0ZW5kcyBSZWNvcmRFeGNlcHRpb24ge1xuICBjb25zdHJ1Y3Rvcih0eXBlOiBzdHJpbmcsIGlkOiBzdHJpbmcsIHJlbGF0aW9uc2hpcDogc3RyaW5nKSB7XG4gICAgc3VwZXIoJ1JlbGF0aW9uc2hpcCBub3QgZm91bmQnLCB0eXBlLCBpZCwgcmVsYXRpb25zaGlwKTtcbiAgfVxufVxuXG4vKipcbiAqIFRoZSByZWNvcmQgYWxyZWFkeSBleGlzdHMuXG4gKiBcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBSZWNvcmRBbHJlYWR5RXhpc3RzRXhjZXB0aW9uXG4gKiBAZXh0ZW5kcyB7UmVjb3JkRXhjZXB0aW9ufVxuICovXG5leHBvcnQgY2xhc3MgUmVjb3JkQWxyZWFkeUV4aXN0c0V4Y2VwdGlvbiBleHRlbmRzIFJlY29yZEV4Y2VwdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHR5cGU6IHN0cmluZywgaWQ6IHN0cmluZykge1xuICAgIHN1cGVyKCdSZWNvcmQgYWxyZWFkeSBleGlzdHMnLCB0eXBlLCBpZCk7XG4gIH1cbn1cbiJdfQ==