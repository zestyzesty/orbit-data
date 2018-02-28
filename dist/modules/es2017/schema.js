var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* eslint-disable valid-jsdoc */
import Orbit from './main';
import { ModelNotFound } from './exception';
import { evented } from '@orbit/core';
/**
 * A `Schema` defines the models allowed in a source, including their keys,
 * attributes, and relationships. A single schema may be shared across multiple
 * sources.
 *
 * @export
 * @class Schema
 * @implements {Evented}
 */
let Schema = class Schema {
    /**
     * Create a new Schema.
     *
     * @constructor
     * @param {SchemaSettings} [settings={}] Optional. Configuration settings.
     * @param {Integer}        [settings.version]       Optional. Schema version. Defaults to 1.
     * @param {Object}   [settings.models]        Optional. Schemas for individual models supported by this schema.
     * @param {Function} [settings.generateId]    Optional. Function used to generate IDs.
     * @param {Function} [settings.pluralize]     Optional. Function used to pluralize names.
     * @param {Function} [settings.singularize]   Optional. Function used to singularize names.
     */
    constructor(settings = {}) {
        if (settings.version === undefined) {
            settings.version = 1;
        }
        if (settings.models === undefined) {
            settings.models = {};
        }
        this._applySettings(settings);
    }
    /**
     * Version
     * @return {Integer} Version of schema.
     */
    get version() {
        return this._version;
    }
    /**
     * Upgrades Schema to a new version with new settings.
     *
     * Emits the `upgrade` event to cue sources to upgrade their data.
     *
     * @param {SchemaSettings} [settings={}]          Settings.
     * @param {Integer}        [settings.version]     Optional. Schema version. Defaults to the current version + 1.
     * @param {Object}         [settings.models]      Schemas for individual models supported by this schema.
     * @param {Function}       [settings.pluralize]   Optional. Function used to pluralize names.
     * @param {Function}       [settings.singularize] Optional. Function used to singularize names.
     */
    upgrade(settings = {}) {
        if (settings.version === undefined) {
            settings.version = this._version + 1;
        }
        this._applySettings(settings);
        this.emit('upgrade', this._version);
    }
    /**
     * Registers a complete set of settings
     *
     * @private
     * @param {Object} settings Settings passed into `constructor` or `upgrade`.
     */
    _applySettings(settings) {
        // Version
        this._version = settings.version;
        // Allow overrides
        if (settings.generateId) {
            this.generateId = settings.generateId;
        }
        if (settings.pluralize) {
            this.pluralize = settings.pluralize;
        }
        if (settings.singularize) {
            this.singularize = settings.singularize;
        }
        // Register model schemas
        if (settings.models) {
            this._models = settings.models;
        }
    }
    /**
     * Generate an id for a given model type.
     *
     * @param {String} type Optional. Type of the model for which the ID is being generated.
     * @return {String} Generated model ID
     */
    generateId(type) {
        return Orbit.uuid();
    }
    /**
     * A naive pluralization method.
     *
     * Override with a more robust general purpose inflector or provide an
     * inflector tailored to the vocabularly of your application.
     *
     * @param  {String} word
     * @return {String} plural form of `word`
     */
    pluralize(word) {
        return word + 's';
    }
    /**
     * A naive singularization method.
     *
     * Override with a more robust general purpose inflector or provide an
     * inflector tailored to the vocabularly of your application.
     *
     * @param  {String} word
     * @return {String} singular form of `word`
     */
    singularize(word) {
        if (word.lastIndexOf('s') === word.length - 1) {
            return word.substr(0, word.length - 1);
        }
        else {
            return word;
        }
    }
    initializeRecord(record) {
        if (record.id === undefined) {
            record.id = this.generateId(record.type);
        }
    }
    get models() {
        return this._models;
    }
    getModel(type) {
        let model = this.models[type];
        if (model) {
            return model;
        }
        else {
            throw new ModelNotFound(type);
        }
    }
    hasAttribute(type, attribute) {
        let model = this.getModel(type);
        if (model.attributes && model.attributes[attribute]) {
            return true;
        }
        else {
            return false;
        }
    }
    hasRelationship(type, relationship) {
        let model = this.getModel(type);
        if (model.relationships && model.relationships[relationship]) {
            return true;
        }
        else {
            return false;
        }
    }
};
Schema = __decorate([
    evented
], Schema);
export default Schema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3JjL3NjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxnQ0FBZ0M7QUFDaEMsT0FBTyxLQUFLLE1BQU0sUUFBUSxDQUFDO0FBQzNCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFNUMsT0FBTyxFQUFFLE9BQU8sRUFBVyxNQUFNLGFBQWEsQ0FBQztBQW9FL0M7Ozs7Ozs7O0dBUUc7QUFFSCxJQUFxQixNQUFNLEdBQTNCO0lBWUU7Ozs7Ozs7Ozs7T0FVRztJQUVILFlBQVksV0FBMkIsRUFBRTtRQUN2QyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsUUFBUSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDdkIsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNsQyxRQUFRLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUN2QixDQUFDO1FBRUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsSUFBSSxPQUFPO1FBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxPQUFPLENBQUMsV0FBMkIsRUFBRTtRQUNuQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsUUFBUSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUN2QyxDQUFDO1FBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJ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QUFlLENBQUMsSUFBWSxFQUFFLFlBQW9CO1FBQ2hELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLGFBQWEsSUFBSSxLQUFLLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3RCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNmLENBQUM7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQXRLb0IsTUFBTTtJQUQxQixPQUFPO0dBQ2EsTUFBTSxDQXNLMUI7ZUF0S29CLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSB2YWxpZC1qc2RvYyAqL1xuaW1wb3J0IE9yYml0IGZyb20gJy4vbWFpbic7XG5pbXBvcnQgeyBNb2RlbE5vdEZvdW5kIH0gZnJvbSAnLi9leGNlcHRpb24nO1xuaW1wb3J0IHsgYXNzZXJ0LCBjbG9uZSwgRGljdCB9IGZyb20gJ0BvcmJpdC91dGlscyc7XG5pbXBvcnQgeyBldmVudGVkLCBFdmVudGVkIH0gZnJvbSAnQG9yYml0L2NvcmUnO1xuaW1wb3J0IHsgUmVjb3JkLCBSZWNvcmRJbml0aWFsaXplciB9IGZyb20gJy4vcmVjb3JkJztcblxuZXhwb3J0IGludGVyZmFjZSBBdHRyaWJ1dGVEZWZpbml0aW9uIHtcbiAgdHlwZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZWxhdGlvbnNoaXBEZWZpbml0aW9uIHtcbiAgdHlwZTogJ2hhc01hbnknIHwgJ2hhc09uZSc7XG4gIG1vZGVsPzogc3RyaW5nO1xuICBpbnZlcnNlPzogc3RyaW5nO1xuICBkZXBlbmRlbnQ/OiAncmVtb3ZlJztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBLZXlEZWZpbml0aW9uIHtcbiAgcHJpbWFyeUtleT86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW9kZWxEZWZpbml0aW9uIHtcbiAga2V5cz86IERpY3Q8S2V5RGVmaW5pdGlvbj47XG4gIGF0dHJpYnV0ZXM/OiBEaWN0PEF0dHJpYnV0ZURlZmluaXRpb24+O1xuICByZWxhdGlvbnNoaXBzPzogRGljdDxSZWxhdGlvbnNoaXBEZWZpbml0aW9uPjtcbn1cblxuLyoqXG4gKiBTZXR0aW5ncyB1c2VkIHRvIGluaXRpYWx6ZSBhbmQvb3IgdXBncmFkZSBzY2hlbWFzLlxuICpcbiAqIEBleHBvcnRcbiAqIEBpbnRlcmZhY2UgU2NoZW1hU2V0dGluZ3NcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTY2hlbWFTZXR0aW5ncyB7XG4gIC8qKlxuICAgKiBTY2hlbWEgdmVyc2lvbi4gRGVmYXVsdHMgdG8gMS5cbiAgICpcbiAgICogQHR5cGUge251bWJlcn1AbWVtYmVyb2YgU2NoZW1hU2V0dGluZ3NcbiAgICovXG4gIHZlcnNpb24/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHVzZWQgdG8gZ2VuZXJhdGUgcmVjb3JkIElEcy5cbiAgICpcbiAgICogQG1lbWJlcm9mIFNjaGVtYVNldHRpbmdzXG4gICAqL1xuICBnZW5lcmF0ZUlkPzogKG1vZGVsPzogc3RyaW5nKSA9PiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHVzZWQgdG8gcGx1cmFsaXplIG5hbWVzLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgU2NoZW1hU2V0dGluZ3NcbiAgICovXG4gIHBsdXJhbGl6ZT86ICh3b3JkOiBzdHJpbmcpID0+IHN0cmluZztcblxuICAvKipcbiAgICogRnVuY3Rpb24gdXNlZCB0byBzaW5ndWxhcml6ZSBuYW1lcy5cbiAgICpcbiAgICogQG1lbWJlcm9mIFNjaGVtYVNldHRpbmdzXG4gICAqL1xuICBzaW5ndWxhcml6ZT86ICh3b3JkOiBzdHJpbmcpID0+IHN0cmluZztcblxuICAvKipcbiAgICogTWFwIG9mIG1vZGVsIGRlZmluaXRpb25zLlxuICAgKlxuICAgKiBAdHlwZSB7RGljdDxNb2RlbERlZmluaXRpb24+fVxuICAgKiBAbWVtYmVyb2YgU2NoZW1hU2V0dGluZ3NcbiAgICovXG4gIG1vZGVscz86IERpY3Q8TW9kZWxEZWZpbml0aW9uPjtcbn1cblxuLyoqXG4gKiBBIGBTY2hlbWFgIGRlZmluZXMgdGhlIG1vZGVscyBhbGxvd2VkIGluIGEgc291cmNlLCBpbmNsdWRpbmcgdGhlaXIga2V5cyxcbiAqIGF0dHJpYnV0ZXMsIGFuZCByZWxhdGlvbnNoaXBzLiBBIHNpbmdsZSBzY2hlbWEgbWF5IGJlIHNoYXJlZCBhY3Jvc3MgbXVsdGlwbGVcbiAqIHNvdXJjZXMuXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIFNjaGVtYVxuICogQGltcGxlbWVudHMge0V2ZW50ZWR9XG4gKi9cbkBldmVudGVkXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2hlbWEgaW1wbGVtZW50cyBFdmVudGVkLCBSZWNvcmRJbml0aWFsaXplciB7XG4gIHByaXZhdGUgX21vZGVsczogRGljdDxNb2RlbERlZmluaXRpb24+O1xuXG4gIHByaXZhdGUgX3ZlcnNpb246IG51bWJlcjtcblxuICAvLyBFdmVudGVkIGludGVyZmFjZSBzdHVic1xuICBvbjogKGV2ZW50OiBzdHJpbmcsIGNhbGxiYWNrOiAoYW55KSA9PiB2b2lkLCBiaW5kaW5nPzogYW55KSA9PiB2b2lkO1xuICBvZmY6IChldmVudDogc3RyaW5nLCBjYWxsYmFjazogKGFueSkgPT4gdm9pZCwgYmluZGluZz86IGFueSkgPT4gdm9pZDtcbiAgb25lOiAoZXZlbnQ6IHN0cmluZywgY2FsbGJhY2s6IChhbnkpID0+IHZvaWQsIGJpbmRpbmc/OiBhbnkpID0+IHZvaWQ7XG4gIGVtaXQ6IChldmVudDogc3RyaW5nLCAuLi5hcmdzKSA9PiB2b2lkO1xuICBsaXN0ZW5lcnM6IChldmVudDogc3RyaW5nKSA9PiBhbnlbXTtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFNjaGVtYS5cbiAgICpcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7U2NoZW1hU2V0dGluZ3N9IFtzZXR0aW5ncz17fV0gT3B0aW9uYWwuIENvbmZpZ3VyYXRpb24gc2V0dGluZ3MuXG4gICAqIEBwYXJhbSB7SW50ZWdlcn0gICAgICAgIFtzZXR0aW5ncy52ZXJzaW9uXSAgICAgICBPcHRpb25hbC4gU2NoZW1hIHZlcnNpb24uIERlZmF1bHRzIHRvIDEuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgIFtzZXR0aW5ncy5tb2RlbHNdICAgICAgICBPcHRpb25hbC4gU2NoZW1hcyBmb3IgaW5kaXZpZHVhbCBtb2RlbHMgc3VwcG9ydGVkIGJ5IHRoaXMgc2NoZW1hLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbc2V0dGluZ3MuZ2VuZXJhdGVJZF0gICAgT3B0aW9uYWwuIEZ1bmN0aW9uIHVzZWQgdG8gZ2VuZXJhdGUgSURzLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbc2V0dGluZ3MucGx1cmFsaXplXSAgICAgT3B0aW9uYWwuIEZ1bmN0aW9uIHVzZWQgdG8gcGx1cmFsaXplIG5hbWVzLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbc2V0dGluZ3Muc2luZ3VsYXJpemVdICAgT3B0aW9uYWwuIEZ1bmN0aW9uIHVzZWQgdG8gc2luZ3VsYXJpemUgbmFtZXMuXG4gICAqL1xuXG4gIGNvbnN0cnVjdG9yKHNldHRpbmdzOiBTY2hlbWFTZXR0aW5ncyA9IHt9KSB7XG4gICAgaWYgKHNldHRpbmdzLnZlcnNpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgc2V0dGluZ3MudmVyc2lvbiA9IDE7XG4gICAgfVxuXG4gICAgaWYgKHNldHRpbmdzLm1vZGVscyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBzZXR0aW5ncy5tb2RlbHMgPSB7fTtcbiAgICB9XG5cbiAgICB0aGlzLl9hcHBseVNldHRpbmdzKHNldHRpbmdzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWZXJzaW9uXG4gICAqIEByZXR1cm4ge0ludGVnZXJ9IFZlcnNpb24gb2Ygc2NoZW1hLlxuICAgKi9cbiAgZ2V0IHZlcnNpb24oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fdmVyc2lvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGdyYWRlcyBTY2hlbWEgdG8gYSBuZXcgdmVyc2lvbiB3aXRoIG5ldyBzZXR0aW5ncy5cbiAgICpcbiAgICogRW1pdHMgdGhlIGB1cGdyYWRlYCBldmVudCB0byBjdWUgc291cmNlcyB0byB1cGdyYWRlIHRoZWlyIGRhdGEuXG4gICAqXG4gICAqIEBwYXJhbSB7U2NoZW1hU2V0dGluZ3N9IFtzZXR0aW5ncz17fV0gICAgICAgICAgU2V0dGluZ3MuXG4gICAqIEBwYXJhbSB7SW50ZWdlcn0gICAgICAgIFtzZXR0aW5ncy52ZXJzaW9uXSAgICAgT3B0aW9uYWwuIFNjaGVtYSB2ZXJzaW9uLiBEZWZhdWx0cyB0byB0aGUgY3VycmVudCB2ZXJzaW9uICsgMS5cbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgW3NldHRpbmdzLm1vZGVsc10gICAgICBTY2hlbWFzIGZvciBpbmRpdmlkdWFsIG1vZGVscyBzdXBwb3J0ZWQgYnkgdGhpcyBzY2hlbWEuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259ICAgICAgIFtzZXR0aW5ncy5wbHVyYWxpemVdICAgT3B0aW9uYWwuIEZ1bmN0aW9uIHVzZWQgdG8gcGx1cmFsaXplIG5hbWVzLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSAgICAgICBbc2V0dGluZ3Muc2luZ3VsYXJpemVdIE9wdGlvbmFsLiBGdW5jdGlvbiB1c2VkIHRvIHNpbmd1bGFyaXplIG5hbWVzLlxuICAgKi9cbiAgdXBncmFkZShzZXR0aW5nczogU2NoZW1hU2V0dGluZ3MgPSB7fSk6IHZvaWQge1xuICAgIGlmIChzZXR0aW5ncy52ZXJzaW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHNldHRpbmdzLnZlcnNpb24gPSB0aGlzLl92ZXJzaW9uICsgMTtcbiAgICB9XG4gICAgdGhpcy5fYXBwbHlTZXR0aW5ncyhzZXR0aW5ncyk7XG4gICAgdGhpcy5lbWl0KCd1cGdyYWRlJywgdGhpcy5fdmVyc2lvbik7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGEgY29tcGxldGUgc2V0IG9mIHNldHRpbmdzXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzZXR0aW5ncyBTZXR0aW5ncyBwYXNzZWQgaW50byBgY29uc3RydWN0b3JgIG9yIGB1cGdyYWRlYC5cbiAgICovXG4gIF9hcHBseVNldHRpbmdzKHNldHRpbmdzOiBTY2hlbWFTZXR0aW5ncyk6IHZvaWQge1xuICAgIC8vIFZlcnNpb25cbiAgICB0aGlzLl92ZXJzaW9uID0gc2V0dGluZ3MudmVyc2lvbjtcblxuICAgIC8vIEFsbG93IG92ZXJyaWRlc1xuICAgIGlmIChzZXR0aW5ncy5nZW5lcmF0ZUlkKSB7XG4gICAgICB0aGlzLmdlbmVyYXRlSWQgPSBzZXR0aW5ncy5nZW5lcmF0ZUlkO1xuICAgIH1cbiAgICBpZiAoc2V0dGluZ3MucGx1cmFsaXplKSB7XG4gICAgICB0aGlzLnBsdXJhbGl6ZSA9IHNldHRpbmdzLnBsdXJhbGl6ZTtcbiAgICB9XG4gICAgaWYgKHNldHRpbmdzLnNpbmd1bGFyaXplKSB7XG4gICAgICB0aGlzLnNpbmd1bGFyaXplID0gc2V0dGluZ3Muc2luZ3VsYXJpemU7XG4gICAgfVxuXG4gICAgLy8gUmVnaXN0ZXIgbW9kZWwgc2NoZW1hc1xuICAgIGlmIChzZXR0aW5ncy5tb2RlbHMpIHtcbiAgICAgIHRoaXMuX21vZGVscyA9IHNldHRpbmdzLm1vZGVscztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgYW4gaWQgZm9yIGEgZ2l2ZW4gbW9kZWwgdHlwZS5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgT3B0aW9uYWwuIFR5cGUgb2YgdGhlIG1vZGVsIGZvciB3aGljaCB0aGUgSUQgaXMgYmVpbmcgZ2VuZXJhdGVkLlxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IEdlbmVyYXRlZCBtb2RlbCBJRFxuICAgKi9cbiAgZ2VuZXJhdGVJZCh0eXBlPzogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gT3JiaXQudXVpZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgbmFpdmUgcGx1cmFsaXphdGlvbiBtZXRob2QuXG4gICAqXG4gICAqIE92ZXJyaWRlIHdpdGggYSBtb3JlIHJvYnVzdCBnZW5lcmFsIHB1cnBvc2UgaW5mbGVjdG9yIG9yIHByb3ZpZGUgYW5cbiAgICogaW5mbGVjdG9yIHRhaWxvcmVkIHRvIHRoZSB2b2NhYnVsYXJseSBvZiB5b3VyIGFwcGxpY2F0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IHdvcmRcbiAgICogQHJldHVybiB7U3RyaW5nfSBwbHVyYWwgZm9ybSBvZiBgd29yZGBcbiAgICovXG4gIHBsdXJhbGl6ZSh3b3JkOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB3b3JkICsgJ3MnO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgbmFpdmUgc2luZ3VsYXJpemF0aW9uIG1ldGhvZC5cbiAgICpcbiAgICogT3ZlcnJpZGUgd2l0aCBhIG1vcmUgcm9idXN0IGdlbmVyYWwgcHVycG9zZSBpbmZsZWN0b3Igb3IgcHJvdmlkZSBhblxuICAgKiBpbmZsZWN0b3IgdGFpbG9yZWQgdG8gdGhlIHZvY2FidWxhcmx5IG9mIHlvdXIgYXBwbGljYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSAge1N0cmluZ30gd29yZFxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IHNpbmd1bGFyIGZvcm0gb2YgYHdvcmRgXG4gICAqL1xuICBzaW5ndWxhcml6ZSh3b3JkOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmICh3b3JkLmxhc3RJbmRleE9mKCdzJykgPT09IHdvcmQubGVuZ3RoIC0gMSkge1xuICAgICAgcmV0dXJuIHdvcmQuc3Vic3RyKDAsIHdvcmQubGVuZ3RoIC0gMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB3b3JkO1xuICAgIH1cbiAgfVxuXG4gIGluaXRpYWxpemVSZWNvcmQocmVjb3JkOiBSZWNvcmQpOiB2b2lkIHtcbiAgICBpZiAocmVjb3JkLmlkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlY29yZC5pZCA9IHRoaXMuZ2VuZXJhdGVJZChyZWNvcmQudHlwZSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG1vZGVscygpOiBEaWN0PE1vZGVsRGVmaW5pdGlvbj4ge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbHM7XG4gIH1cblxuICBnZXRNb2RlbCh0eXBlOiBzdHJpbmcpOiBNb2RlbERlZmluaXRpb24ge1xuICAgIGxldCBtb2RlbCA9IHRoaXMubW9kZWxzW3R5cGVdO1xuICAgIGlmIChtb2RlbCkge1xuICAgICAgcmV0dXJuIG1vZGVsO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgTW9kZWxOb3RGb3VuZCh0eXBlKTtcbiAgICB9XG4gIH1cblxuICBoYXNBdHRyaWJ1dGUodHlwZTogc3RyaW5nLCBhdHRyaWJ1dGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGxldCBtb2RlbCA9IHRoaXMuZ2V0TW9kZWwodHlwZSk7XG4gICAgaWYgKG1vZGVsLmF0dHJpYnV0ZXMgJiYgbW9kZWwuYXR0cmlidXRlc1thdHRyaWJ1dGVdKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGhhc1JlbGF0aW9uc2hpcCh0eXBlOiBzdHJpbmcsIHJlbGF0aW9uc2hpcDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgbGV0IG1vZGVsID0gdGhpcy5nZXRNb2RlbCh0eXBlKTtcbiAgICBpZiAobW9kZWwucmVsYXRpb25zaGlwcyAmJiBtb2RlbC5yZWxhdGlvbnNoaXBzW3JlbGF0aW9uc2hpcF0pIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG59XG4iXX0=