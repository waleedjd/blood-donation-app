import Auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import firestore from '@react-native-firebase/firestore';
import {NavService} from '../../config';
import firebaseErrors from '../../config/Utils/firebaseErrors';
import {loaderStart, loaderStop, logoutUser, saveUser} from '../actions';

var passwordValidator = require('password-validator');
var schema = new passwordValidator();
var nameValidator = new passwordValidator();
var addressValidator = new passwordValidator();
schema.is().min(8).has().not().spaces();
nameValidator.is().min(3).has().not().digits().has().not().symbols();
addressValidator.is().min(3).has().not().symbols();

export const errorToast = message => {
  Toast.show({
    type: 'error',
    text1: message,
    visibilityTime: 4000,
  });
};

export const successToast = message => {
  Toast.show({
    type: 'success',
    text1: message,
    visibilityTime: 4000,
  });
};

export async function getUser(phone) {
  try {
    const doc = await firestore().collection('users').doc(phone).get();
    const user = doc.data();
    return user;
  } catch (e) {
    errorToast('Unable to get user');
    return null;
  }
}

export async function setUser(user) {
  try {
    await firestore().collection('users').doc(user.phone).set(user);
    return true;
  } catch (e) {
    errorToast('Unable to create user');
    return false;
  }
}

export async function updateUser(user) {
  try {
    await firestore().collection('users').doc(user.phone).update(user);
    return true;
  } catch (e) {
    errorToast('Unable to update user');
    return false;
  }
}

export async function deleteUser(phone) {
  try {
    loaderStart();
    await firestore().collection('users').doc(phone).delete();
    loaderStop();
    NavService.reset(0, [{name: 'AuthStack'}]);
    successToast('Account Deleted');
  } catch (e) {
    loaderStop();
    errorToast('Unable to delete user');
  }
}

export async function getOtp(phone) {
  try {
    const confirmation = await Auth().signInWithPhoneNumber(phone);
    return confirmation;
  } catch (e) {
    errorToast('Unable to send OTP');
    return null;
  }
}

export async function login(phone, password) {
  if (!phone || !password) {
    errorToast('Please enter phone and password');
    return;
  } else if (phone.length != 13) {
    errorToast('Please enter valid phone number');
    return;
  } else if (phone.startsWith('+92') === false) {
    errorToast('Phone number must start with +92');
    return;
  } else if (!schema.validate(password)) {
    errorToast(
      'Password must be 8 characters long and should not contain spaces',
    );
    return;
  }
  try {
    loaderStart();
    const user = await getUser(phone);
    if (user.password === password) {
      if (user.isVerified) {
        loaderStop();
        saveUser(user);
        NavService.reset(0, [{name: 'AppStack'}]);
        successToast('Login Successful');
      } else {
        const confirmation = await getOtp(phone);
        loaderStop();
        errorToast('Please verify your phone number');
        if (confirmation) {
          NavService.navigate('Verification', {
            nextRoute: 'Success',
            confirmation,
            user,
          });
        }
      }
    } else {
      loaderStop();
      errorToast('Invalid Phone Number or Password');
    }
  } catch (e) {
    loaderStop();
    const errText = firebaseErrors[`${e.code}`];
    errorToast(errText?.length ? errText : 'Something Went Wrong');
    return [];
  }
}

export async function register(
  name,
  phone,
  password,
  confirmPassword,
  bloodGroup,
  city,
  address,
) {
  if (
    !name.length ||
    !phone.length ||
    !password.length ||
    !confirmPassword ||
    !bloodGroup.length ||
    !city.length ||
    !address.length
  ) {
    errorToast('Please fill all the fields');
    return;
  } else if (!nameValidator.validate(name)) {
    errorToast(
      'Name must be 3 characters long and should not contain digits or symbols',
    );
    return;
  } else if (!addressValidator.validate(address)) {
    errorToast(
      'Address must be 3 characters long and should not contain symbols',
    );
    return;
  } else if (!phone.startsWith('+92')) {
    errorToast('Phone number must start with +92');
    return;
  } else if (phone.length !== 13) {
    errorToast('Please enter a valid phone number');
    return;
  } else if (schema.validate(password) === false) {
    errorToast('Password must be 8 characters long');
    return;
  } else if (password !== confirmPassword) {
    errorToast('Password and Confirm Password must be same');
    return;
  } else {
    try {
      loaderStart();
      const existingUser = await getUser(phone);
      if (existingUser) {
        errorToast('User already exists. Please Login!');
        loaderStop();
        return;
      } else {
        const user = {
          name,
          phone,
          password,
          bloodGroup,
          city,
          address,
          password,
          isVerified: false,
          isAvailableToDonate: false,
        };
        const newUser = await setUser(user);
        if (newUser) {
          const confirmation = await getOtp(phone);
          loaderStop();
          errorToast('Please verify your phone number');
          if (confirmation) {
            NavService.navigate('Verification', {
              nextRoute: 'Success',
              confirmation,
              user,
            });
          }
        }
      }
    } catch (e) {
      loaderStop();
      const errText = firebaseErrors[`${e.code}`];
      errorToast(errText?.length ? errText : 'Something Went Wrong');
      return [];
    }
  }
}

export async function forgotPassword(phone) {
  if (!phone.length) {
    errorToast('Please enter phone number');
    return;
  } else if (!phone.startsWith('+92')) {
    errorToast('Phone number must start with +92');
    return;
  } else if (phone.length !== 13) {
    errorToast('Please enter a valid phone number');
    return;
  }
  try {
    loaderStart();
    const user = await getUser(phone);
    if (user) {
      const confirmation = await getOtp(phone);
      loaderStop();
      errorToast('Please verify your phone number');
      if (confirmation) {
        NavService.navigate('Verification', {
          nextRoute: 'ResetPassword',
          confirmation,
          user,
        });
      }
    } else {
      loaderStop();
      errorToast('User does not exist');
    }
  } catch (e) {
    loaderStop();
    const errText = firebaseErrors[`${e.code}`];
    errorToast(errText?.length ? errText : 'Something Went Wrong');
    return [];
  }
}

export async function resetPassword(newPassword, confirmPassword, user) {
  // NavService.navigate('Login');
  if (!newPassword || !confirmPassword) {
    errorToast('Please enter password');
    return;
  } else if (schema.validate(newPassword) === false) {
    errorToast('Password must be 8 characters long');
    return;
  } else if (newPassword !== confirmPassword) {
    errorToast('Password and Confirm Password must be same');
    return;
  }
  try {
    loaderStart();
    if (user) {
      user.password = newPassword;
      await updateUser(user);
      loaderStop();
      successToast('Password reset successfully');
      NavService.navigate('Login');
    } else {
      loaderStop();
      errorToast('User does not exist');
    }
  } catch (e) {
    loaderStop();
    const errText = firebaseErrors[`${e.code}`];
    errorToast(errText?.length ? errText : 'Something Went Wrong');
    return [];
  }
}

export async function logout() {
  logoutUser();
  NavService.reset(0, [{name: 'AuthStack'}]);
  successToast('Logged out successfully');
}

export async function updateProfile(name, bloodGroup, city, address, user) {
  // NavService.reset(0, [{name: 'ProfileStack'}]);
  if (!name.length || !bloodGroup.length || !city.length || !address.length) {
    errorToast('Please fill all the fields');
    return;
  } else if (!nameValidator.validate(name)) {
    errorToast(
      'Name must be 3 characters long and should not contain digits or symbols',
    );
    return;
  } else if (!addressValidator.validate(address)) {
    errorToast(
      'Address must be 3 characters long and should not contain symbols',
    );
    return;
  }

  try {
    loaderStart();
    const updatedUser = {
      ...user,
      name,
      bloodGroup,
      city,
      address,
    };
    await updateUser(updatedUser);
    saveUser(updatedUser);
    loaderStop();
    successToast('Profile updated successfully');
    NavService.reset(0, [{name: 'ProfileStack'}]);
  } catch (e) {
    loaderStop();
    const errText = firebaseErrors[`${e.code}`];
    errorToast(errText?.length ? errText : 'Something Went Wrong');
    return [];
  }
}

export async function changeAvailability(user) {
  try {
    loaderStart();
    const updatedUser = {
      ...user,
      isAvailableToDonate: !user?.isAvailableToDonate,
    };
    await updateUser(updatedUser);
    saveUser(updatedUser);
    loaderStop();
  } catch (e) {
    loaderStop();
    const errText = firebaseErrors[`${e.code}`];
    errorToast(errText?.length ? errText : 'Something Went Wrong');
    return [];
  }
}

export async function findDonors(bloodGroup, city, phone) {
  try {
    loaderStart();
    const data = await firestore()
      .collection('users')
      .where('isAvailableToDonate', '==', true)
      .where('city', '==', city)
      .where('bloodGroup', '==', bloodGroup)
      .get();

    const donors = data.docs
      .map(doc => doc.data())
      .filter(doc => doc.phone !== phone);

    loaderStop();

    if (donors.length) {
      successToast('Donors found successfully');
      return donors;
    } else {
      errorToast('No donors found');
      return [];
    }
  } catch (e) {
    loaderStop();
    const errText = firebaseErrors[`${e.code}`];
    errorToast(errText?.length ? errText : 'Something Went Wrong');
    return [];
  }
}

export async function requestDonation(
  city,
  hospital,
  bloodGroup,
  phone,
  note,
  userPhone,
  userName,
) {
  if (
    !city.length ||
    !hospital.length ||
    !bloodGroup.length ||
    !phone.length ||
    !note.length
  ) {
    errorToast('Please fill all the fields');
    return;
  } else if (!phone.startsWith('+92')) {
    errorToast('Phone number must start with +92');
    return;
  } else if (phone.length !== 13) {
    errorToast('Please enter a valid phone number');
    return;
  }

  try {
    loaderStart();
    const data = await firestore().collection('donationRequests').add({
      city,
      hospital,
      bloodGroup,
      phone,
      note,
      userPhone,
      name: userName,
      date: Date.now(),
    });
    loaderStop();
    NavService.goBack();
    successToast('Donation request sent successfully');

    return data;
  } catch (e) {
    loaderStop();
    const errText = firebaseErrors[`${e.code}`];
    errorToast(errText?.length ? errText : 'Something Went Wrong');
    return [];
  }
}

export async function getMyRequests(phone) {
  try {
    loaderStart();
    const data = await firestore()
      .collection('donationRequests')
      .where('userPhone', '==', phone)
      .get();

    const requests = data.docs.map(doc => {
      return {...doc.data(), id: doc.id};
    });

    loaderStop();

    if (requests.length) {
      // successToast('Requests found successfully');
      return requests;
    } else {
      errorToast('No requests found');
      return [];
    }
  } catch (e) {
    loaderStop();
    const errText = firebaseErrors[`${e.code}`];
    errorToast(errText?.length ? errText : 'Something Went Wrong');
    return [];
  }
}

export async function deleteRequest(id) {
  try {
    loaderStart();
    await firestore().collection('donationRequests').doc(id).delete();
    loaderStop();
    // successToast('Request deleted successfully');
    return true;
  } catch (e) {
    loaderStop();
    const errText = firebaseErrors[`${e.code}`];
    errorToast(errText?.length ? errText : 'Something Went Wrong');
    return false;
  }
}

export async function getDonationRequests(phone) {
  try {
    loaderStart();
    const data = await firestore()
      .collection('donationRequests')
      .where('userPhone', '!=', phone)
      .get();

    const requests = data.docs.map(doc => {
      return {...doc.data(), id: doc.id};
    });

    loaderStop();

    if (requests.length) {
      successToast('Requests found successfully');
      return requests;
    } else {
      errorToast('No requests found');
      return [];
    }
  } catch (e) {
    loaderStop();
    const errText = firebaseErrors[`${e.code}`];
    errorToast(errText?.length ? errText : 'Something Went Wrong');
    return [];
  }
}

export const getChats = async myUid => {
  try {
    loaderStart();
    const data = await firestore()
      .collection('chatRooms')
      .where('uids', 'array-contains', myUid)
      .get();

    const chats = data.docs
      .map(doc => {
        return {...doc.data(), id: doc.id};
      })
      .filter(chat => chat.lastMessageTime != null)
      .sort((a, b) => {
        return b.lastMessageTime - a.lastMessageTime;
      });

    loaderStop();
    return chats;
  } catch (e) {
    loaderStop();
    const errText = firebaseErrors[`${e.code}`];
    errorToast(errText?.length ? errText : 'Something Went Wrong');
    return [];
  }
};

export const getAllMessages = async (myUid, chatWith) => {
  try {
    const res = await firestore()
      .collection('chatRooms')
      .where('uids', 'in', [
        [myUid, chatWith],
        [chatWith, myUid],
      ])
      .get();
    return res;
  } catch (e) {
    const errText = firebaseErrors[`${e.code}`];
    errorToast(errText?.length ? errText : 'Something Went Wrong');
    return {};
  }
};

export const sendMessages = async (myUid, textMessage, chatRoomId) => {
  loaderStart();
  try {
    const newMessageId = Date.now();
    const chatRoomRef = firestore().collection('chatRooms').doc(chatRoomId);
    await chatRoomRef.update({
      lastMessage: textMessage,
      lastMessageTime: Date.now(),
    });
    await chatRoomRef.collection('messages').add({
      sentBy: myUid,
      id: newMessageId,
      message: textMessage,
      time: Date.now(),
    });
    loaderStop();
  } catch (e) {
    loaderStop();
    const errText = firebaseErrors[`${e.code}`];
    errorToast(errText?.length ? errText : 'Something Went Wrong');
  }
};

export const getMessage = (chatRoomId, callBack) => {
  loaderStop();

  firestore()
    .collection('chatRooms')
    .doc(chatRoomId)
    .collection('messages')
    .orderBy('time', 'desc')
    .onSnapshot(
      data => {
        const messages = data.docs.map(doc => {
          return {...doc.data(), id: doc.id};
        });
        callBack(messages);
      },
      e => {
        const errText = firebaseErrors[`${e.code}`];
        errorToast(errText?.length ? errText : 'Something Went Wrong');
      },
    );
};

export const createChatRoom = async (uids, users) => {
  loaderStart();
  try {
    const res = await firestore()
      .collection('chatRooms')
      .add({uids, users, lastMessage: '', lastMessageTime: null});
    loaderStop();
    return res.id;
  } catch (e) {
    loaderStop();
    const errText = firebaseErrors[`${e.code}`];
    errorToast(errText?.length ? errText : 'Something Went Wrong');
    return [];
  }
};
