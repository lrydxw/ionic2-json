import { StorageEngine } from './storage';
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
export declare class SqlStorage extends StorageEngine {
    static BACKUP_LOCAL: number;
    static BACKUP_LIBRARY: number;
    static BACKUP_DOCUMENTS: number;
    private _db;
    constructor(options?: {});
    _getBackupLocation(dbFlag: number): number;
    _tryInit(): void;
    /**
     * Perform an arbitrary SQL operation on the database. Use this method
     * to have full control over the underlying database through SQL operations
     * like SELECT, INSERT, and UPDATE.
     *
     * @param {string} query the query to run
     * @param {array} params the additional params to use for query placeholders
     * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
     */
    query(query: any, params?: any[]): Promise<any>;
    /**
     * Get the value in the database identified by the given key.
     * @param {string} key the key
     * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
     */
    get(key: string): Promise<any>;
    /**
    * Set the value in the database for the given key. Existing values will be overwritten.
    * @param {string} key the key
    * @param {string} value The value (as a string)
    * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
    */
    set(key: string, value: string): Promise<any>;
    /**
    * Remove the value in the database for the given key.
    * @param {string} key the key
    * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
    */
    remove(key: string): Promise<any>;
}
