import { db } from '../config/db';
import { Actions } from 'react-native-router-flux';

export const addStudent =  (camera, location, summonid, offence) => {
    db.ref('/summon').child(summonid).set({
        camera: camera,
        location: location,
        summonid: summonid,
        offence: offence
    }, () => Actions.Personal());
}

export const removeStudent =  (summonid) => {
    db.ref('/students').child(summonid).remove();
}