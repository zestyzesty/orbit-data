"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Source = undefined;

var _main = require("./main");

var _main2 = _interopRequireDefault(_main);

var _core = require("@orbit/core");

var _queryBuilder = require("./query-builder");

var _queryBuilder2 = _interopRequireDefault(_queryBuilder);

var _transformBuilder = require("./transform-builder");

var _transformBuilder2 = _interopRequireDefault(_transformBuilder);

var _utils = require("@orbit/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 Base class for sources.

 @class Source
 @namespace Orbit
 @param {Object} [settings] - settings for source
 @param {String} [settings.name] - Name for source
 @param {Schema} [settings.schema] - Schema for source
 @constructor
 */
let Source = class Source {
    constructor(settings = {}) {
        this._schema = settings.schema;
        this._keyMap = settings.keyMap;
        const name = this._name = settings.name;
        const bucket = this._bucket = settings.bucket;
        this._queryBuilder = settings.queryBuilder;
        this._transformBuilder = settings.transformBuilder;
        const requestQueueSettings = settings.requestQueueSettings || {};
        const syncQueueSettings = settings.syncQueueSettings || {};
        if (bucket) {
            (0, _utils.assert)('TransformLog requires a name if it has a bucket', !!name);
        }
        this._transformLog = new _core.Log({ name: name ? `${name}-log` : undefined, bucket });
        this._requestQueue = new _core.TaskQueue(this, Object.assign({ name: name ? `${name}-requests` : undefined, bucket }, requestQueueSettings));
        this._syncQueue = new _core.TaskQueue(this, Object.assign({ name: name ? `${name}-sync` : undefined, bucket }, syncQueueSettings));
        if (this._schema && (settings.autoUpgrade === undefined || settings.autoUpgrade)) {
            this._schema.on('upgrade', () => this.upgrade());
        }
    }
    get name() {
        return this._name;
    }
    get schema() {
        return this._schema;
    }
    get keyMap() {
        return this._keyMap;
    }
    get bucket() {
        return this._bucket;
    }
    get transformLog() {
        return this._transformLog;
    }
    get requestQueue() {
        return this._requestQueue;
    }
    get syncQueue() {
        return this._syncQueue;
    }
    get queryBuilder() {
        let qb = this._queryBuilder;
        if (qb === undefined) {
            qb = this._queryBuilder = new _queryBuilder2.default();
        }
        return qb;
    }
    get transformBuilder() {
        let tb = this._transformBuilder;
        if (tb === undefined) {
            tb = this._transformBuilder = new _transformBuilder2.default({
                recordInitializer: this._schema
            });
        }
        return tb;
    }
    // Performer interface
    perform(task) {
        let method = `__${task.type}__`;
        return this[method].call(this, task.data);
    }

    /**
     * Upgrade source as part of a schema upgrade.
     *
     * @returns {Promise<void>}
     * @memberof Source
     */
    upgrade() {
        return _main2.default.Promise.resolve();
    }
    /////////////////////////////////////////////////////////////////////////////
    // Private methods
    /////////////////////////////////////////////////////////////////////////////
    /**
     Notifies listeners that this source has been transformed by emitting the
     `transform` event.
        Resolves when any promises returned to event listeners are resolved.
        Also, adds an entry to the Source's `transformLog` for each transform.
        @private
     @method _transformed
     @param {Array} transforms - Transforms that have occurred.
     @returns {Promise} Promise that resolves to transforms.
    */
    _transformed(transforms) {
        return transforms.reduce((chain, transform) => {
            return chain.then(() => {
                if (this._transformLog.contains(transform.id)) {
                    return _main2.default.Promise.resolve();
                }
                return this._transformLog.append(transform.id).then(() => (0, _core.settleInSeries)(this, 'transform', transform));
            });
        }, _main2.default.Promise.resolve()).then(() => transforms);
    }
    _enqueueRequest(type, data) {
        return this._requestQueue.push({ type, data });
    }
    _enqueueSync(type, data) {
        return this._syncQueue.push({ type, data });
    }
};
exports.Source = Source = __decorate([_core.evented], Source);
exports.Source = Source;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291cmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3JjL3NvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsQUFBTyxBQUFLLEFBQU0sQUFBUSxBQUFDOzs7O0FBQzNCLEFBQU8sQUFDTCxBQUFPLEFBQVcsQUFBYyxBQUVoQyxBQUFTLEFBRVQsQUFBRyxBQUNKLEFBQU0sQUFBYSxBQUFDOztBQUdyQixBQUFPLEFBQVksQUFBTSxBQUFpQixBQUFDOzs7O0FBRTNDLEFBQU8sQUFBZ0IsQUFBTSxBQUFxQixBQUFDOzs7O0FBQ25ELEFBQU8sQUFBRSxBQUFNLEFBQUUsQUFBTSxBQUFjLEFBQUM7Ozs7Ozs7Ozs7OztBQWdCdEMsQUFTRzs7Ozs7Ozs7OztBQUVILElBQXNCLEFBQU0sU0FBNUI7QUFrQkUsZ0JBQVksV0FBMkIsQUFBRTtBQUN2QyxBQUFJLGFBQUMsQUFBTyxVQUFHLEFBQVEsU0FBQyxBQUFNLEFBQUM7QUFDL0IsQUFBSSxhQUFDLEFBQU8sVUFBRyxBQUFRLFNBQUMsQUFBTSxBQUFDO0FBQy9CLGNBQU0sQUFBSSxPQUFHLEFBQUksS0FBQyxBQUFLLFFBQUcsQUFBUSxTQUFDLEFBQUksQUFBQztBQUN4QyxjQUFNLEFBQU0sU0FBRyxBQUFJLEtBQUMsQUFBTyxVQUFHLEFBQVEsU0FBQyxBQUFNLEFBQUM7QUFDOUMsQUFBSSxhQUFDLEFBQWEsZ0JBQUcsQUFBUSxTQUFDLEFBQVksQUFBQztBQUMzQyxBQUFJLGFBQUMsQUFBaUIsb0JBQUcsQUFBUSxTQUFDLEFBQWdCLEFBQUM7QUFDbkQsY0FBTSxBQUFvQix1QkFBRyxBQUFRLFNBQUMsQUFBb0Isd0JBQUksQUFBRSxBQUFDO0FBQ2pFLGNBQU0sQUFBaUIsb0JBQUcsQUFBUSxTQUFDLEFBQWlCLHFCQUFJLEFBQUUsQUFBQztBQUUzRCxBQUFFLEFBQUMsWUFBQyxBQUFNLEFBQUMsUUFBQyxBQUFDO0FBQ1gsQUFBTSwrQkFBQyxBQUFpRCxtREFBRSxDQUFDLENBQUMs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LEFBQUMsQUFBQyxBQUM5QztBQUFDLEFBQ0Y7O0FBeEpxQixBQUFNLFFBQU4sQUFBTSw2QkFEM0IsQUFBTyxpQkFDYyxBQUFNLEFBd0ozQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBPcmJpdCBmcm9tICcuL21haW4nO1xuaW1wb3J0IHtcbiAgZXZlbnRlZCwgRXZlbnRlZCwgc2V0dGxlSW5TZXJpZXMsXG4gIEJ1Y2tldCxcbiAgVGFza1F1ZXVlLFxuICBUYXNrLCBQZXJmb3JtZXIsXG4gIExvZ1xufSBmcm9tICdAb3JiaXQvY29yZSc7XG5pbXBvcnQgS2V5TWFwIGZyb20gJy4va2V5LW1hcCc7XG5pbXBvcnQgU2NoZW1hIGZyb20gJy4vc2NoZW1hJztcbmltcG9ydCBRdWVyeUJ1aWxkZXIgZnJvbSAnLi9xdWVyeS1idWlsZGVyJztcbmltcG9ydCB7IFRyYW5zZm9ybSB9IGZyb20gJy4vdHJhbnNmb3JtJztcbmltcG9ydCBUcmFuc2Zvcm1CdWlsZGVyIGZyb20gJy4vdHJhbnNmb3JtLWJ1aWxkZXInO1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnQG9yYml0L3V0aWxzJztcblxuZXhwb3J0IGludGVyZmFjZSBTb3VyY2VTZXR0aW5ncyB7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIHNjaGVtYT86IFNjaGVtYTtcbiAga2V5TWFwPzogS2V5TWFwO1xuICBidWNrZXQ/OiBCdWNrZXQ7XG4gIHF1ZXJ5QnVpbGRlcj86IFF1ZXJ5QnVpbGRlcjtcbiAgdHJhbnNmb3JtQnVpbGRlcj86IFRyYW5zZm9ybUJ1aWxkZXI7XG4gIGF1dG9VcGdyYWRlPzogYm9vbGVhbjtcbiAgcmVxdWVzdFF1ZXVlU2V0dGluZ3M/OiBUYXNrUXVldWVTZXR0aW5ncztcbiAgc3luY1F1ZXVlU2V0dGluZ3M/OiBUYXNrUXVldWVTZXR0aW5ncztcbn1cblxuZXhwb3J0IHR5cGUgU291cmNlQ2xhc3MgPSAobmV3ICgpID0+IFNvdXJjZSk7XG5cbi8qKlxuIEJhc2UgY2xhc3MgZm9yIHNvdXJjZXMuXG5cbiBAY2xhc3MgU291cmNlXG4gQG5hbWVzcGFjZSBPcmJpdFxuIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIC0gc2V0dGluZ3MgZm9yIHNvdXJjZVxuIEBwYXJhbSB7U3RyaW5nfSBbc2V0dGluZ3MubmFtZV0gLSBOYW1lIGZvciBzb3VyY2VcbiBAcGFyYW0ge1NjaGVtYX0gW3NldHRpbmdzLnNjaGVtYV0gLSBTY2hlbWEgZm9yIHNvdXJjZVxuIEBjb25zdHJ1Y3RvclxuICovXG5AZXZlbnRlZFxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFNvdXJjZSBpbXBsZW1lbnRzIEV2ZW50ZWQsIFBlcmZvcm1lciB7XG4gIHByb3RlY3RlZCBfbmFtZTogc3RyaW5nO1xuICBwcm90ZWN0ZWQgX2J1Y2tldDogQnVja2V0O1xuICBwcm90ZWN0ZWQgX2tleU1hcDogS2V5TWFwO1xuICBwcm90ZWN0ZWQgX3NjaGVtYTogU2NoZW1hO1xuICBwcm90ZWN0ZWQgX3RyYW5zZm9ybUxvZzogTG9nO1xuICBwcm90ZWN0ZWQgX3JlcXVlc3RRdWV1ZTogVGFza1F1ZXVlO1xuICBwcm90ZWN0ZWQgX3N5bmNRdWV1ZTogVGFza1F1ZXVlO1xuICBwcm90ZWN0ZWQgX3F1ZXJ5QnVpbGRlcjogUXVlcnlCdWlsZGVyO1xuICBwcm90ZWN0ZWQgX3RyYW5zZm9ybUJ1aWxkZXI6IFRyYW5zZm9ybUJ1aWxkZXI7XG5cbiAgLy8gRXZlbnRlZCBpbnRlcmZhY2Ugc3R1YnNcbiAgb246IChldmVudDogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24sIGJpbmRpbmc/OiBvYmplY3QpID0+IHZvaWQ7XG4gIG9mZjogKGV2ZW50OiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbiwgYmluZGluZz86IG9iamVjdCkgPT4gdm9pZDtcbiAgb25lOiAoZXZlbnQ6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uLCBiaW5kaW5nPzogb2JqZWN0KSA9PiB2b2lkO1xuICBlbWl0OiAoZXZlbnQ6IHN0cmluZywgLi4uYXJncykgPT4gdm9pZDtcbiAgbGlzdGVuZXJzOiAoZXZlbnQ6IHN0cmluZykgPT4gYW55W107XG5cbiAgY29uc3RydWN0b3Ioc2V0dGluZ3M6IFNvdXJjZVNldHRpbmdzID0ge30pIHtcbiAgICB0aGlzLl9zY2hlbWEgPSBzZXR0aW5ncy5zY2hlbWE7XG4gICAgdGhpcy5fa2V5TWFwID0gc2V0dGluZ3Mua2V5TWFwO1xuICAgIGNvbnN0IG5hbWUgPSB0aGlzLl9uYW1lID0gc2V0dGluZ3MubmFtZTtcbiAgICBjb25zdCBidWNrZXQgPSB0aGlzLl9idWNrZXQgPSBzZXR0aW5ncy5idWNrZXQ7XG4gICAgdGhpcy5fcXVlcnlCdWlsZGVyID0gc2V0dGluZ3MucXVlcnlCdWlsZGVyO1xuICAgIHRoaXMuX3RyYW5zZm9ybUJ1aWxkZXIgPSBzZXR0aW5ncy50cmFuc2Zvcm1CdWlsZGVyO1xuICAgIGNvbnN0IHJlcXVlc3RRdWV1ZVNldHRpbmdzID0gc2V0dGluZ3MucmVxdWVzdFF1ZXVlU2V0dGluZ3MgfHwge307XG4gICAgY29uc3Qgc3luY1F1ZXVlU2V0dGluZ3MgPSBzZXR0aW5ncy5zeW5jUXVldWVTZXR0aW5ncyB8fCB7fTtcblxuICAgIGlmIChidWNrZXQpIHtcbiAgICAgIGFzc2VydCgnVHJhbnNmb3JtTG9nIHJlcXVpcmVzIGEgbmFtZSBpZiBpdCBoYXMgYSBidWNrZXQnLCAhIW5hbWUpO1xuICAgIH1cblxuICAgIHRoaXMuX3RyYW5zZm9ybUxvZyA9IG5ldyBMb2coeyBuYW1lOiBuYW1lID8gYCR7bmFtZX0tbG9nYCA6IHVuZGVmaW5lZCwgYnVja2V0IH0pO1xuXG4gICAgdGhpcy5fcmVxdWVzdFF1ZXVlID0gbmV3IFRhc2tRdWV1ZSh0aGlzLCB7XG4gICAgICBuYW1lOiBuYW1lID8gYCR7bmFtZX0tcmVxdWVzdHNgIDogdW5kZWZpbmVkLFxuICAgICAgYnVja2V0LFxuICAgICAgLi4ucmVxdWVzdFF1ZXVlU2V0dGluZ3NcbiAgICB9KTtcblxuICAgIHRoaXMuX3N5bmNRdWV1ZSA9IG5ldyBUYXNrUXVldWUodGhpcywge1xuICAgICAgbmFtZTogbmFtZSA/IGAke25hbWV9LXN5bmNgIDogdW5kZWZpbmVkLFxuICAgICAgYnVja2V0LFxuICAgICAgLi4uc3luY1F1ZXVlU2V0dGluZ3NcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLl9zY2hlbWEgJiYgKHNldHRpbmdzLmF1dG9VcGdyYWRlID09PSB1bmRlZmluZWQgfHwgc2V0dGluZ3MuYXV0b1VwZ3JhZGUpKSB7XG4gICAgICB0aGlzLl9zY2hlbWEub24oJ3VwZ3JhZGUnLCAoKSA9PiB0aGlzLnVwZ3JhZGUoKSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgfVxuXG4gIGdldCBzY2hlbWEoKTogU2NoZW1hIHtcbiAgICByZXR1cm4gdGhpcy5fc2NoZW1hO1xuICB9XG5cbiAgZ2V0IGtleU1hcCgpOiBLZXlNYXAge1xuICAgIHJldHVybiB0aGlzLl9rZXlNYXA7XG4gIH1cblxuICBnZXQgYnVja2V0KCk6IEJ1Y2tldCB7XG4gICAgcmV0dXJuIHRoaXMuX2J1Y2tldDtcbiAgfVxuXG4gIGdldCB0cmFuc2Zvcm1Mb2coKTogTG9nIHtcbiAgICByZXR1cm4gdGhpcy5fdHJhbnNmb3JtTG9nO1xuICB9XG5cbiAgZ2V0IHJlcXVlc3RRdWV1ZSgpOiBUYXNrUXVldWUge1xuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0UXVldWU7XG4gIH1cblxuICBnZXQgc3luY1F1ZXVlKCk6IFRhc2tRdWV1ZSB7XG4gICAgcmV0dXJuIHRoaXMuX3N5bmNRdWV1ZTtcbiAgfVxuXG4gIGdldCBxdWVyeUJ1aWxkZXIoKTogUXVlcnlCdWlsZGVyIHtcbiAgICBsZXQgcWIgPSB0aGlzLl9xdWVyeUJ1aWxkZXI7XG4gICAgaWYgKHFiID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHFiID0gdGhpcy5fcXVlcnlCdWlsZGVyID0gbmV3IFF1ZXJ5QnVpbGRlcigpO1xuICAgIH1cbiAgICByZXR1cm4gcWI7XG4gIH1cblxuICBnZXQgdHJhbnNmb3JtQnVpbGRlcigpOiBUcmFuc2Zvcm1CdWlsZGVyIHtcbiAgICBsZXQgdGIgPSB0aGlzLl90cmFuc2Zvcm1CdWlsZGVyO1xuICAgIGlmICh0YiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0YiA9IHRoaXMuX3RyYW5zZm9ybUJ1aWxkZXIgPSBuZXcgVHJhbnNmb3JtQnVpbGRlcih7XG4gICAgICAgIHJlY29yZEluaXRpYWxpemVyOiB0aGlzLl9zY2hlbWFcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGI7XG4gIH1cblxuICAvLyBQZXJmb3JtZXIgaW50ZXJmYWNlXG4gIHBlcmZvcm0odGFzazogVGFzayk6IFByb21pc2U8YW55PiB7XG4gICAgbGV0IG1ldGhvZCA9IGBfXyR7dGFzay50eXBlfV9fYDtcbiAgICByZXR1cm4gdGhpc1ttZXRob2RdLmNhbGwodGhpcywgdGFzay5kYXRhKTtcbiAgfTtcblxuICAvKipcbiAgICogVXBncmFkZSBzb3VyY2UgYXMgcGFydCBvZiBhIHNjaGVtYSB1cGdyYWRlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICogQG1lbWJlcm9mIFNvdXJjZVxuICAgKi9cbiAgdXBncmFkZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gT3JiaXQuUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAvLyBQcml2YXRlIG1ldGhvZHNcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAvKipcbiAgIE5vdGlmaWVzIGxpc3RlbmVycyB0aGF0IHRoaXMgc291cmNlIGhhcyBiZWVuIHRyYW5zZm9ybWVkIGJ5IGVtaXR0aW5nIHRoZVxuICAgYHRyYW5zZm9ybWAgZXZlbnQuXG5cbiAgIFJlc29sdmVzIHdoZW4gYW55IHByb21pc2VzIHJldHVybmVkIHRvIGV2ZW50IGxpc3RlbmVycyBhcmUgcmVzb2x2ZWQuXG5cbiAgIEFsc28sIGFkZHMgYW4gZW50cnkgdG8gdGhlIFNvdXJjZSdzIGB0cmFuc2Zvcm1Mb2dgIGZvciBlYWNoIHRyYW5zZm9ybS5cblxuICAgQHByaXZhdGVcbiAgIEBtZXRob2QgX3RyYW5zZm9ybWVkXG4gICBAcGFyYW0ge0FycmF5fSB0cmFuc2Zvcm1zIC0gVHJhbnNmb3JtcyB0aGF0IGhhdmUgb2NjdXJyZWQuXG4gICBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRyYW5zZm9ybXMuXG4gICovXG4gIHByaXZhdGUgX3RyYW5zZm9ybWVkKHRyYW5zZm9ybXM6IFRyYW5zZm9ybVtdKTogUHJvbWlzZTxUcmFuc2Zvcm1bXT4ge1xuICAgIHJldHVybiB0cmFuc2Zvcm1zXG4gICAgICAucmVkdWNlKChjaGFpbiwgdHJhbnNmb3JtKSA9PiB7XG4gICAgICAgIHJldHVybiBjaGFpbi50aGVuKCgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5fdHJhbnNmb3JtTG9nLmNvbnRhaW5zKHRyYW5zZm9ybS5pZCkpIHtcbiAgICAgICAgICAgIHJldHVybiBPcmJpdC5Qcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gdGhpcy5fdHJhbnNmb3JtTG9nLmFwcGVuZCh0cmFuc2Zvcm0uaWQpXG4gICAgICAgICAgICAudGhlbigoKSA9PiBzZXR0bGVJblNlcmllcyh0aGlzLCAndHJhbnNmb3JtJywgdHJhbnNmb3JtKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSwgT3JiaXQuUHJvbWlzZS5yZXNvbHZlKCkpXG4gICAgICAudGhlbigoKSA9PiB0cmFuc2Zvcm1zKTtcbiAgfVxuXG4gIHByaXZhdGUgX2VucXVldWVSZXF1ZXN0KHR5cGU6IHN0cmluZywgZGF0YTogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3RRdWV1ZS5wdXNoKHsgdHlwZSwgZGF0YSB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2VucXVldWVTeW5jKHR5cGU6IHN0cmluZywgZGF0YTogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX3N5bmNRdWV1ZS5wdXNoKHsgdHlwZSwgZGF0YSB9KTtcbiAgfVxufVxuIl19