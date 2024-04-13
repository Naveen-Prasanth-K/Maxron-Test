import axios from "axios";
import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { ToastAndroid } from 'react-native';
import { URL } from "../Constant/Environment";
import { addAndUpdateAlert, errorAlert } from "../Error/ErrorAlert";
// import { localStorageDelete, localStorageGetSingleItem, localStorageStoreItem } from "../storage/Storage";

class Store {

    loginData = [];
    isLoggedIn = false;
    mainLoader = false;
    screen = 'Admin';
    memberRegister = [];
    deviceRegister = [];
    bindDistrict = [];

    constructor() {
        makeObservable(
            this, {

            setLoginData: action,
            setMainLoader: action,
            setIsLoggedIn: action,
            setScreen: action,

            loginData: observable,
            mainLoader: observable,
            isLoggedIn: observable,
            screen: observable,
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
    setMemberRegisterData = (data) => {
        this.memberRegister = [];
        this.memberRegister = data != "null" ? data : [];
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

    setDeviceRegisterData = (data) => {
        this.deviceRegister = [];
        this.deviceRegister = data != "null" ? data : [];
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

    setDistrictData = (data) => {
        this.bindDistrict = [];
        this.bindDistrict = data != "null" ? data : [];
    }

    //Other Set State
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