

import axios from "axios";
import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { Alert, ToastAndroid } from 'react-native';
import { URL } from "../Constant/Environment";
import { localStorageDelete, localStorageGetSingleItem, localStorageStoreItem } from '../Storage/Storage'
import { addAndUpdateAlert, errorAlert } from "../Error/ErrorAlert";

class Store {

    loginData = [];
    isLoggedIn = false;
    mainLoader = false;
    screen = 'Admin';
    memberRegister = [];
    deviceRegister = [];
    bindDistrict = [];

    constructor() {
        makeAutoObservable(
            this, {
            loginMember: action,
            setLoginData: action,
            setMainLoader: action,
            setIsLoggedIn: action,
            setScreen: action,

            // Member regsiter Dealer, user
            getMemberData: action,
            postMemberData: action,
            deleteMemberData: action,
            setMemberRegisterData: action,
            // Device Register
            getDeviceData: action,
            postDeviceData: action,
            updateDeviceData: action,
            deleteDeviceData: action,
            setDeviceRegisterData: action,
            //Bind Table
            getDistrictData: action,
            setDistrictData: action,

            memberRegister: observable,
            deviceRegister: observable,
            bindDistrict: observable,

            loginData: observable,
            mainLoader: observable,
            isLoggedIn: observable,
            screen: observable,

        }, { autoBind: true }

        )
    }

    // POst Member based data
    postMemberData = async (memberType, formData) => {
        await axios.post(`${URL}member`, formData).then(async (response) => {
            if (response?.status == 200) {
                addAndUpdateAlert(200, "Member Data Added.")
                this.getMemberData(memberType);
            }
        }).catch((error) => {
            // console.log(`error -${ JSON.stringify(error) }`)
            if (error?.response?.status == 404 || error?.response?.status == 500) {
                errorAlert(error?.response?.status, "Server Error")
            } else if (error?.message == "Network Error") {
                errorAlert(error?.message, "Please check network connectivity")
            }
        })
    }
    // Get Member based data
    getMemberData = async (memberType) => {
        await axios.get(`${URL}member/${memberType}`).then(async (response) => {
            if (response?.data?.data?.length > 0 && response?.data?.data != "null") {
                this.setMemberRegisterData(response?.data?.data)
            }
        }).catch((error) => {
            if (error?.response?.status == 404 || error?.response?.status == 500) {
                errorAlert(error?.response?.status, "Server Error")
            } else if (error?.message == "Network Error") {
                errorAlert(error?.message, "Please check network connectivity")
            }

            this.setMemberRegisterData([]);
        })
    }
    // Delete Member based data
    deleteMemberData = async (memberId, formData) => {
        await axios.delete(`${URL}member/${memberId}`).then(async (response) => {
            if (response?.data?.data?.length > 0 && response?.data?.data != "null") {
                addAndUpdateAlert(200, "Member Data Delete.")
                this.getMemberData(memberType);
            }
        }).catch((error) => {
            if (error?.response?.status == 404 || error?.response?.status == 500) {
                errorAlert(error?.response?.status, "Server Error")
            } else if (error?.message == "Network Error") {
                errorAlert(error?.message, "Please check network connectivity")
            }
        })
    }

    // POst Device based data
    postDeviceData = async (formData) => {
        await axios.post(`${URL}device`, formData).then(async (response) => {
            if (response?.status == 200) {
                addAndUpdateAlert(200, "Device Data Added.")
                this.getDeviceData();
            }
        }).catch((error) => {
            if (error?.response?.status == 404 || error?.response?.status == 500) {
                errorAlert(error?.response?.status, "Server Error")
            } else if (error?.message == "Network Error") {
                errorAlert(error?.message, "Please check network connectivity")
            }
        })
    }
    // Update Device based data
    updateDeviceData = async (memberType, formData) => {
        await axios.post(`${URL}device`, formData).then(async (response) => {
            if (response?.data?.data?.length > 0 && response?.data?.data != "null") {
                addAndUpdateAlert(200, "Device Data updated.")
                this.getDeviceData(memberType);
            }
        }).catch((error) => {
            if (error?.response?.status == 404 || error?.response?.status == 500) {
                errorAlert(error?.response?.status, "Server Error")
            } else if (error?.message == "Network Error") {
                errorAlert(error?.message, "Please check network connectivity")
            }
        })
    }
    // Get Device based data
    getDeviceData = async () => {
        await axios.get(`${URL}device`).then(async (response) => {
            if (response?.data?.data?.length > 0 && response?.data?.data != "null") {
                this.setDeviceRegisterData(response?.data?.data)
            }
        }).catch((error) => {
            if (error?.response?.status == 404 || error?.response?.status == 500) {
                errorAlert(error?.response?.status, "Server Error")
            } else if (error?.message == "Network Error") {
                errorAlert(error?.message, "Please check network connectivity")
            }

            this.setDeviceRegisterData([]);
        })
    }
    // Delete Device based data
    deleteDeviceData = async (memberId, formData) => {
        await axios.delete(`${URL}device/${memberId}`).then(async (response) => {
            if (response?.data?.data?.length > 0 && response?.data?.data != "null") {
                addAndUpdateAlert(200, "Member Data Delete.")
                this.getDeviceData(memberType);
            }
        }).catch((error) => {
            if (error?.response?.status == 404 || error?.response?.status == 500) {
                errorAlert(error?.response?.status, "Server Error")
            } else if (error?.message == "Network Error") {
                errorAlert(error?.message, "Please check network connectivity")
            }
        })
    }
    // Bind table
    getDistrictData = async (memberType) => {
        await axios.get(`${URL}bind-city`).then(async (response) => {
            if (response?.data?.data?.length > 0 && response?.data?.data != "null") {
                this.setDistrictData(response?.data?.data)
            }
        }).catch((error) => {
            if (error?.response?.status == 404 || error?.response?.status == 500) {
                errorAlert(error?.response?.status, "Server Error")
            } else if (error?.message == "Network Error") {
                errorAlert(error?.message, "Please check network connectivity")
            }

            this.setDistrictData([]);
        })
    }

    setMemberRegisterData = (data) => {
        this.memberRegister = [];
        this.memberRegister = data != "null" ? data : [];
    }
    setDeviceRegisterData = (data) => {
        this.deviceRegister = [];
        this.deviceRegister = data != "null" ? data : [];
    }
    setDistrictData = (data) => {
        this.bindDistrict = [];
        this.bindDistrict = data != "null" ? data : [];
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
