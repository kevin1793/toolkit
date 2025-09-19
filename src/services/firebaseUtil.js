// src/firebaseUtils.js
import { doc, setDoc,getDoc,addDoc,deleteDoc, updateDoc } from "firebase/firestore";
import { auth,db  } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

export const createUserWithEmailPassword = async (email, password, userData) => {
  try {
    // Create user with email and password using Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.error("Error creating user: ", error.message);
    throw new Error(error.message); // Throw error to be handled in the calling component
  }
};

// get User record from firebase
export const getCurrentUserRecord = async () => {
  if (auth.currentUser) {
    const userDocRef = doc(db, "Users", auth.currentUser.uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      return userDoc.data();
    }
  }
  return null;
};

export const getAllRecordsFromCollectionByUserID = async (collectionName) => {
  // Ensure the user is logged in
  if (!auth.currentUser) {
    console.log("User is not logged in.");
    return [];
  }

  const user = auth.currentUser;
  const uid = user.uid; // Get the current logged-in user's UID

  // Create a reference to the collection
  const collectionRef = collection(db, collectionName);
  
  // Create a query to filter the documents where userId matches the current user's UID
  const q = query(collectionRef, where("userId", "==", uid));

  try {
    // Execute the query to fetch documents
    const querySnapshot = await getDocs(q);

    // Check if there are any documents
    if (querySnapshot.empty) {
      console.log("No records found for this user.");
      return [];
    }

    // Map through the documents and return the data
    const records = querySnapshot.docs.map(doc => ({
      id: doc.id,  // Include the Firestore document ID here
      ref: doc.ref, // Include the Firestore document reference (if needed)
      ...doc.data(), // Include the document data
    }));
    return records;
    
  } catch (error) {
    console.error("Error fetching records:", error);
    return [];
  }
};

export const deleteRecordFromCollection = async (collectionName, docId) => {
  if (!auth.currentUser) {
    console.log("User is not logged in.");
    return;
  }

  console.log("Deleting from collection:", collectionName);
  console.log("Document ID:", docId);

  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    console.log("Record deleted successfully!");
  } catch (error) {
    console.error("Error deleting record: ", error);
  }
};

export const addRecordToCollectionOLD = async (collectionName, recordData) => {
  try {
    if (!auth.currentUser) {
      console.log("User is not logged in.");
      return;
    }
    const user = auth.currentUser;
    const uid = user.uid; // Get the current logged-in user's UID
    const docRef = doc(db, collectionName, uid); // Reference to the Firestore document
    await setDoc(docRef, {
      ...recordData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log("Record added successfully!");
  }
  catch (error) {
    console.error("Error adding record: ", error);
  }
};

export const addRecordToCollection = async (collectionName, recordData) => {
  try {
    if (!auth.currentUser) {
      console.log("User is not logged in.");
      return;
    }

    // Reference to the Firestore collection where you want to add the record
    const collectionRef = collection(db, collectionName);

    // Add a new document with a random doc ID
    const docRef = await addDoc(collectionRef, {
      ...recordData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("Record added successfully with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding record: ", error);
  }
};

// Function to create a profile in Firestore
export const createProfile = async (profileData) => {
  // if (!auth.currentUser) {
  //   console.log("User is not logged in.");
  //   return;
  // }

  try {
    const user = auth.currentUser;
    const uid = user.uid; // Get the current logged-in user's UID

    const userDocRef = doc(db, "Users", uid); // Reference to the Firestore document

    // Create or update the user profile data in Firestore
    await setDoc(userDocRef, {
      ...profileData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("Profile created successfully!");
  } catch (error) {
    console.error("Error creating profile: ", error);
  }
};

// Function to update the user profile in Firestore
export const updateProfile = async (profileData) => {
  if (!auth.currentUser) {
    console.log("User is not logged in.");
    return;
  }

  try {
    const user = auth.currentUser;
    const uid = user.uid; // Get the current logged-in user's UID

    const userDocRef = doc(db, "users", uid); // Reference to the Firestore document

    // Update the user profile data in Firestore
    await updateDoc(userDocRef, {
      ...profileData,
      updatedAt: new Date(), // Update the timestamp
    });

    console.log("Profile updated successfully!");
  } catch (error) {
    console.error("Error updating profile: ", error);
  }
};
