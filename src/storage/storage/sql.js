var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var storage_1 = require('./storage');
var util_1 = require('../../../node_modules/ionic-angular/util/util');
var DB_NAME = '__ZRHS_ionicstorage_DB';
var win = window;
/**
 * SqlStorage uses SQLite or WebSQL (development only!) to store data in a
 * persistent SQL store on the filesystem.
 *
 * This is the preferred storage engine, as data will be stored in appropriate
 * app storage, unlike Local Storage which is treated differently by the OS.
 *
 * For convenience, the engine supports key/value storage for simple get/set and blob
 * storage. The full SQL engine is exposed underneath through the `query` method.
 *
 * @usage
 ```js
 * let storage = new Storage(SqlStorage, options);
 * storage.set('name', 'Max');
 * storage.get('name').then((name) => {
 * });
 *
 * // Sql storage also exposes the full engine underneath
 * storage.query('insert into projects(name, data) values("Cool Project", "blah")');
 * storage.query('select * from projects').then((resp) => {})
 * ```
 *
 * The `SqlStorage` service supports these options:
 * {
 *   name: the name of the database (__ionicstorage by default)
 *   backupFlag: // where to store the file, default is BACKUP_LOCAL which DOES NOT store to iCloud. Other options: BACKUP_LIBRARY, BACKUP_DOCUMENTS
 *   existingDatabase: whether to load this as an existing database (default is false)
 * }
 *
 */
var SqlStorage = (function (_super) {
    __extends(SqlStorage, _super);
    function SqlStorage(options) {
        if (options === void 0) { options = {}; }
        _super.call(this);
        var dbOptions = util_1.defaults(options, {
            name: DB_NAME,
            backupFlag: SqlStorage.BACKUP_LOCAL,
            existingDatabase: false
        });
        if (win.sqlitePlugin) {
            var location_1 = this._getBackupLocation(dbOptions.backupFlag);
            this._db = win.sqlitePlugin.openDatabase(util_1.assign({
                name: dbOptions.name,
                location: location_1,
                createFromLocation: dbOptions.existingDatabase ? 1 : 0
            }, dbOptions));
        }
        else {
            void 0;
            this._db = win.openDatabase(dbOptions.name, '1.0', 'database', 5 * 1024 * 1024);
        }
        this._tryInit();
    }
    SqlStorage.prototype._getBackupLocation = function (dbFlag) {
        switch (dbFlag) {
            case SqlStorage.BACKUP_LOCAL:
                return 2;
            case SqlStorage.BACKUP_LIBRARY:
                return 1;
            case SqlStorage.BACKUP_DOCUMENTS:
                return 0;
            default:
                throw Error('Invalid backup flag: ' + dbFlag);
        }
    };
    // Initialize the DB with our required tables
    SqlStorage.prototype._tryInit = function () {
        this._db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS kv (key text primary key, value text)', [], function (tx, res) {
            }, function (tx, err) {
                void 0;
            });
        });
    };
    /**
     * Perform an arbitrary SQL operation on the database. Use this method
     * to have full control over the underlying database through SQL operations
     * like SELECT, INSERT, and UPDATE.
     *
     * @param {string} query the query to run
     * @param {array} params the additional params to use for query placeholders
     * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
     */
    SqlStorage.prototype.query = function (query, params) {
        var _this = this;
        if (params === void 0) { params = []; }
        return new Promise(function (resolve, reject) {
            try {
                _this._db.transaction(function (tx) {
                    tx.executeSql(query, params, function (tx, res) {
                        resolve({
                            tx: tx,
                            res: res
                        });
                    }, function (tx, err) {
                        reject({
                            tx: tx,
                            err: err
                        });
                    });
                }, function (err) {
                    reject(err);
                });
            }
            catch (e) {
                reject(e);
            }
        });
    };
    /**
     * Get the value in the database identified by the given key.
     * @param {string} key the key
     * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
     */
    SqlStorage.prototype.get = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                _this._db.transaction(function (tx) {
                    tx.executeSql("select key, value from kv where key = ? limit 1", [key], function (tx, res) {
                        if (res.rows.length > 0) {
                            var item = res.rows.item(0);
                            resolve(item.value);
                        }
                        resolve(null);
                    }, function (tx, err) {
                        reject({
                            tx: tx,
                            err: err
                        });
                    });
                }, function (err) {
                    reject(err);
                });
            }
            catch (e) {
                reject(e);
            }
        });
    };
    /**
    * Set the value in the database for the given key. Existing values will be overwritten.
    * @param {string} key the key
    * @param {string} value The value (as a string)
    * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
    */
    SqlStorage.prototype.set = function (key, value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                _this._db.transaction(function (tx) {
                    tx.executeSql('insert or replace into kv(key, value) values (?, ?)', [key, value], function (tx, res) {
                        resolve();
                    }, function (tx, err) {
                        reject({
                            tx: tx,
                            err: err
                        });
                    });
                }, function (err) {
                    reject(err);
                });
            }
            catch (e) {
                reject(e);
            }
        });
    };
    /**
    * Remove the value in the database for the given key.
    * @param {string} key the key
    * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
    */
    SqlStorage.prototype.remove = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                _this._db.transaction(function (tx) {
                    tx.executeSql('delete from kv where key = ?', [key], function (tx, res) {
                        resolve();
                    }, function (tx, err) {
                        reject({
                            tx: tx,
                            err: err
                        });
                    });
                }, function (err) {
                    reject(err);
                });
            }
            catch (e) {
                reject(e);
            }
        });
    };
    SqlStorage.BACKUP_LOCAL = 2;
    SqlStorage.BACKUP_LIBRARY = 1;
    SqlStorage.BACKUP_DOCUMENTS = 0;
    return SqlStorage;
})(storage_1.StorageEngine);
exports.SqlStorage = SqlStorage;
