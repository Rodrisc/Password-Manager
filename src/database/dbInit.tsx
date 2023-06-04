import { dbConnection } from "./dbConnection";

// var db = null

export default class dbInit {
    
    db: any;

    constructor() {
        this.db = dbConnection.getConnection()
    }

    DbInit() {

        this.db.transaction((tx: { executeSql: (arg0: string) => void; }) => {

            tx.executeSql(`create table if not exists data(
                    id text primary key not null,
                    identifier text not null,
                    user text,
                    email text,
                    password text not null,
                    colorBox text)`)
            console.log('tabela criada')
            
        },
            (_, Error) => {
                console.log('Erro ao criar tabela ', Error)
            }
        )

    }

}

