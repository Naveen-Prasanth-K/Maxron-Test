

import axios from "axios";
import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { Alert, ToastAndroid } from 'react-native';
import { URL } from "../Constant/Environment";
import { localStorageDelete, localStorageGetSingleItem, localStorageStoreItem } from '../Storage/Storage'

class Store {

    loginData = [];
    isLoggedIn = false;
    mainLoader = false;
    screen = 'Admin'

    constructor() {
        makeAutoObservable(
            this, {
            loginMember: action,
            setLoginData: action,
            setMainLoader: action,
            setIsLoggedIn: action,
            setScreen: action,

            loginData: observable,
            mainLoader: observable,
            isLoggedIn: observable,
            screen: observable,

        }, { autoBind: true }

        )
    }

    //Screen Admin or Dealer
    setScreen = (data) => {
        this.screen = data;
    }

    setLoginData = (data) => {
        this.loginData = [];
        this.loginData = data;
    }
    setIsLoggedIn(value) {
        this.isLoggedIn = value;
    }
    setMainLoader = (data) => {
        this.mainLoader = data;
    }

}

export default Store = new Store();
