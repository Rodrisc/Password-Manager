import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
const dbName = 'base.db';
const dbPath = `${FileSystem.documentDirectory}${dbName}`;
console.log('caminho do save', dbPath)
export const dbConnection = {
    getConnection: () => SQLite.openDatabase(dbName)

};