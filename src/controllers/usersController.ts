import firebase from '.././db';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { Request, Response, NextFunction } from 'express';
import User from '../models/user';

// Initialize Firestore
const firestore = getFirestore(firebase);
 
export const addUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = req.body;
        const userDataWithRole = {
            ...data,
            role: 'user',
        };
        const docRef = await addDoc(collection(firestore, 'users'), userDataWithRole);
        res.send(`User added: ${docRef}`);
    } catch (error:any) {
        res.status(400).send(error.message);
    }
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users = await collection(firestore, 'users');
        const data = await getDocs(users);
        const usersArray: User[] = [];
        const currentTime = new Date();
        if (data.empty) {
            res.status(404).send('No Users record found');
        } else {
            data.forEach((doc) => {
                const user = new User(
                    doc.id,
                    doc.data().firstName,
                    doc.data().lastName,
                    doc.data().email,
                    doc.data().role,
                );
                usersArray.push(user);
            });
            res.status(200).send(usersArray);
        }
    } catch (error:any) {
        res.status(400).send(error.message);
    }
};
export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.userId; 
        const userDocRef = doc(firestore, 'users', userId);

        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            const user = new User(
                userDoc.id,
                userData.firstName,
                userData.lastName,
                userData.email,
                userData.role
            );
            res.status(200).send(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error:any) {
        res.status(400).send(error.message);
    }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.userId;
        const userData = req.body;

        const userDocRef = doc(firestore, 'users', userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            await setDoc(userDocRef, {
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
            });

            const updatedUserDoc = await getDoc(userDocRef);
            const updatedUserData = updatedUserDoc.data();
            if (updatedUserData) {
                const updatedUser = new User(
                    updatedUserDoc.id,
                    updatedUserData.firstName,
                    updatedUserData.lastName,
                    updatedUserData.email,
                    updatedUserData.role,
                );

            res.status(200).send(updatedUser);
        } else {
            res.status(404).send('User not found');
        }
    } else {
        res.status(404).send('User not found');
    }
    } catch (error:any) {
        res.status(400).send(error.message);
    }
    
};
export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.userId; 

        const requestingUserId = req.body.requestingUserId;

        if (userId === requestingUserId) {
            res.status(400).send("Users cannot delete themselves.");
            return;
        }
        const userDocRef = doc(firestore, 'users', userId);
        
        await deleteDoc(userDocRef);

        res.send(`User deleted: ${userId}`);
    } catch (error:any) {
        res.status(400).send(error.message);
    }
};