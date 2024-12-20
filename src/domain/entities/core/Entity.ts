import crypto from 'crypto';


export abstract class Entity<T extends Object> {
    public id: string;
    public props: T;

    constructor(props: T, id?: string) {
        this.props = props;
        this.id = id ?? crypto.randomUUID();
    }

    checkDifferenceExist<T extends Object>(objCompared: T) {
        const keysOrigin = Object.keys(this.props);
        const valuesOrigin = Object.values(this.props);

        const keysObjCompared = Object.keys(objCompared);
        const valuesObjCompared = Object.values(objCompared)
        console.log(keysOrigin, valuesOrigin)
        console.log(keysObjCompared, valuesObjCompared)

        if (keysOrigin.length < keysObjCompared.length) {
            console.log("encontrou divergencia por quantidade de contigencia")
            return true
        }
        console.log("passou e iniciou verificação por chave/valor")
        const inconsistenceFound = keysObjCompared.reduce((prev, curr, index) => {
            if (prev) {
                return prev
            }
            const elementMatchIndex = keysOrigin.findIndex((v) => v == curr)
            console.log(`------ match field inconsitencia-------\n
                ${elementMatchIndex} - ${valuesObjCompared[index]} - ${valuesOrigin[elementMatchIndex]}
                `)
            if ((elementMatchIndex > -1) && (valuesObjCompared[index] !== valuesOrigin[elementMatchIndex])) {

                return true
            }
            return prev
        }, false)

        console.log("achou divergencia:", inconsistenceFound)
        return inconsistenceFound
    }
}