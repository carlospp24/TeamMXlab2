import React from 'react';
import * as SQLite from 'expo-sqlite';

const db=SQLite.openDatabase('survey.db');


export const init=()=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            
            tx.executeSql('create table if not exists survey(id integer not null primary key, day text not null, rating real not null, accomplished text not null,goal text not null);',
            //second parameters of execution:empty brackets - this parameter is not needed when creating table            
            [],
            //If the transaction succeeds, this is called
            ()=>{
                resolve();
            },
            //If the transaction fails, this is called
            (_,err)=>{
                reject(err);
            }
            );
        });
    });
    return promise;
};

export const addSurvey=(day, rating, accomplished,goal)=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            
            tx.executeSql('insert into survey(day, rating, accomplished, goal) values(?,?,?,?);',
            
            [day, rating, accomplished,goal],
         
            (_, result)=>{
                resolve(result);
            },
            
            (_,err)=>{
                reject(err);
            }
            );
        });
    });
    return promise;
};




export const fetchAllSurvey=()=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            //Here we select all from the table fish
            tx.executeSql('select * from survey;',
            [],
            (tx, result)=>{
                resolve(result);
            },
            (tx,err)=>{
                reject(err);
            }
            );
        });
    });
    
    return promise;
};

export const fetchLastSurvey=()=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            //Here we select all from the table fish
            tx.executeSql('SELECT * FROM survey ORDER BY ID DESC LIMIT 1;',
            [],
            (tx, result)=>{
                resolve(result);
            },
            (tx,err)=>{
                reject(err);
            }
            );
        });
    });
    
    return promise;
};