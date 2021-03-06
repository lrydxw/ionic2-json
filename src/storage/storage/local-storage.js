var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var storage_1 = require('./storage');
/**
 * @name LocalStorage
 * @description
 * The LocalStorage storage engine uses the browser's local storage system for
 * storing key/value pairs.
 *
 * Note: LocalStorage should ONLY be used for temporary data that you can afford to lose.
 * Given disk space constraints on a mobile device, local storage might be "cleaned up"
 * by the operating system (iOS).
 *
 * For guaranteed, long-term storage, use the SqlStorage engine which stores data in a file.
 *
 * @usage
 * ```ts
 * import {Page, Storage, LocalStorage} from 'ionic-angular';
 * @Page({
 *   template: `<ion-content></ion-content>`
 * });
 * export class MyClass{
 *  constructor(){
 *    this.local = new Storage(LocalStorage);
 *    this.local.set('didTutorial', true);
 *  }
 *}
 *```
 * @demo /docs/v2/demos/local-storage/
 * @see {@link /docs/v2/platform/storage/ Storage Platform Docs}
 */
var LocalStorage = (function (_super) {
    __extends(LocalStorage, _super);
    function LocalStorage(options) {
        if (options === void 0) { options = {}; }
        _super.call(this);
    }
    /**
     * Get the value of a key in LocalStorage
     * @param {String} key the key you want to lookup in LocalStorage
     */
    LocalStorage.prototype.get = function (key) {
        return new Promise(function (resolve, reject) {
            try {
                var value = window.localStorage.getItem(key);
                resolve(value);
            }
            catch (e) {
                reject(e);
            }
        });
    };
    /**
     * Set a key value pair and save it to LocalStorage
     * @param {String} key the key you want to save to LocalStorage
     * @param {Any} value the value of the key you're saving
     */
    LocalStorage.prototype.set = function (key, value) {
        return new Promise(function (resolve, reject) {
            try {
                window.localStorage.setItem(key, value);
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    };
    /**
     * Remove a key from LocalStorage
     * @param {String} key the key you want to remove from LocalStorage
     */
    LocalStorage.prototype.remove = function (key) {
        return new Promise(function (resolve, reject) {
            try {
                window.localStorage.removeItem(key);
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    };
    return LocalStorage;
})(storage_1.StorageEngine);
exports.LocalStorage = LocalStorage;
