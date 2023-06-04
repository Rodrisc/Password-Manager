import { Password } from "../models/password.model";
import { dbConnection } from "../database/dbConnection";
import { accountData } from "../components/ShowData";



export default class PasswordServices {

    db: any = dbConnection.getConnection()

    public insertPassowrd(param: Password): any {
        try {
            this.db.transaction(tx => {
                tx.executeSql(
                    `insert into data(id, identifier, user, email, password, colorBox)
                    values(?,?,?,?,?,?)`,
                    [param.id,
                    param.identifier,
                    param.user,
                    param.email,
                    param.password,
                    param.colorBox],
                    (_, { rowsAffected, insertId }) => {
                        console.log(`Linhas afetadas: ${rowsAffected}, ID do usuário inserido: ${insertId}`)
                    },
                    (_, error) => {
                        console.log('Erro na inserção', error)
                        return error
                    }


                )
            })
        } catch (error) {
            return error
        }
    }

    public async getAllPassword(): Promise<accountData[]> {
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql('SELECT * FROM data',
                    [],
                    (_, { rows }) => {
                        const data = rows._array;
                        resolve(data)
                    }, (_, error) => {
                        reject(error);
                    });
            });
        });
    }

    public async getPasswordById(id: string): Promise<accountData[]> {
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql('SELECT * FROM data where id = ?',
                    [id],
                    (_, { rows }) => {
                        const data = rows._array;

                        resolve(data)
                    }, (_, error) => {
                        reject(error);
                    });
            });
        });
    }

    public deletePassowrdById(id: string) {
        this.db.transaction((tx) => {
            tx.executeSql('DELETE FROM data WHERE id = ?', [id], (_, { rowsAffected }) => {
                console.log(`Linhas afetadas: ${rowsAffected}`)
            },
                (_, error) => {
                    console.log('Erro ao deletar', error)
                })
        })
    }

    public updateById(param: Password): any {

        try {
            this.db.transaction(tx => {
                tx.executeSql(
                    `update data
                    set identifier = ?, user = ?, email = ?, password = ?, colorBox = ?
                    where id = ?`,
                    [
                        param.identifier,
                        param.user,
                        param.email,
                        param.password,
                        param.colorBox,
                        param.id
                    ],
                    (_, { rowsAffected, insertId }) => {
                        console.log(`Linhas afetadas: ${rowsAffected}, ID do usuário inserido: ${insertId}`)
                    },
                    (_, error) => {
                        console.log('Erro no update', error)
                    }
                )
            })
        } catch (error) {
            console.log(error)
        }
    }

    public async getSearchPassword(search: string): Promise<accountData[]> {
        
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(`SELECT * FROM data
                 where identifier like ?
                 order by identifier`,
                    ['%' + search + '%'],
                    (_, { rows }) => {
                        const data = rows._array;
                        resolve(data)
                    }, (_, error) => {
                        reject(error);
                    });
            });
        });
    }
}
