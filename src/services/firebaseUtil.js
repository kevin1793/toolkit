// src/firebaseUtils.js
import { doc, setDoc,getDoc, updateDoc } from "firebase/firestore";
import { auth,db  } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";


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
