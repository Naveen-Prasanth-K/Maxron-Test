

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
    soldDeviceData = [];
    unsoldDeviceData = [];
    saleDeviceData = [];
    customerData = [];
    dealerData = [];
    adminDashBoard = [];
    dealerDashBoard = [];
    bindDistrict = [];

    constructor() {
        makeAutoObservable(
            this, {
            loginMember: action,
            setLoginData: action,
            setMainLoader: action,
            setIsLoggedIn: action,
            setScreen: action,
            setSoldDeviceData: action,
            setUnSoldDeviceData: action,
            setCustomerData: action,
            setDealerData: action,
            setAdminDashboardData: action,
            setDealerDashboardData: action,

            // Member regsiter Dealer, user
            getMemberData: action,
            getFilterMemberData: action,
            getDashboardMemberData: action,
            postMemberData: action,
            postSaleDeviceData: action,
            putMemberData: action,
            deleteMemberData: action,
            setMemberRegisterData: action,
            filterGetDeviceData: action,
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
            adminDashBoard: observable,
            dealerDashBoard: observable,
            customerData: observable,
            dealerData: observable,
            deviceRegister: observable,
            soldDeviceData: observable,
            unsoldDeviceData: observable,
            saleDeviceData: observable,
            bindDistrict: observable,

            loginData: observable,
            mainLoader: observable,
            isLoggedIn: observable,
            screen: observable,

        }, { autoBind: true }

        )
    }

    // POst Member based data
    postMemberData = async (registerType, formData) => {
        await axios.post(`${URL}member`, formData).then(async (response) => {
            if (response?.status == 200) {
                addAndUpdateAlert(200, "Member Data Added.")
                this.getFilterMemberData(0, 0, 0, registerType);
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
    // PUT Member based data
    putMemberData = async (registerType, formData) => {
        console.log(`formData -${JSON.stringify(formData)}`)
        await axios.put(`${URL}member`, formData).then(async (response) => {
            if (response?.status == 200) {
                addAndUpdateAlert(200, "Dealer Data Updated .")
                this.getFilterMemberData(0, 0, 0, registerType);
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

    // Get Member based data
    getFilterMemberData = async (fromDate = 0, toDate = 0, search = 0, registerType = 0) => {
        const formData = {
            "fromDate": fromDate == 0 ? "" : fromDate,
            "toDate": toDate == 0 ? "" : toDate,
            "pageNumber": "",
            "limit": "",
            "search": search == 0 ? "" : search,
            "registerType": registerType == 0 ? "" : registerType
        }
        await axios.post(`${URL}member/filter`, formData).then(async (response) => {
            if (response?.data?.data?.length > 0 && response?.data?.data != "null") {
                registerType == "Dealer" ? this.setDealerData(response?.data?.data) : this.setCustomerData(response?.data?.data)
            }
        }).catch((error) => {
            if (error?.response?.status == 404 || error?.response?.status == 500) {
                errorAlert(error?.response?.status, "Server Error")
            } else if (error?.message == "Network Error") {
                errorAlert(error?.message, "Please check network connectivity")
            }
            registerType == "Dealer" ? this.setDealerData([]) : this.customerData([])
        })
    }
    // Customer Data Set
    setCustomerData = async (data) => {
        this.customerData = [];
        this.customerData = data != "null" ? data : [];
    }
    // Set dealer data
    setDealerData = async (data) => {
        this.dealerData = [];
        this.dealerData = data != "null" ? data : [];
    }
    // Get Member Dashboard
    getDashboardMemberData = async (id, registerType) => {
        const formData = {
            "_id": id,
            "registerType": registerType
        }
        await axios.post(`${URL}dashboard`, formData).then(async (response) => {
            if (response?.data?.message == "Success") {
                registerType == "Admin" ? this.setAdminDashboardData(response?.data?.data) : this.setDealerDashboardData(response?.data?.data)
            }
        }).catch((error) => {
            if (error?.response?.status == 404 || error?.response?.status == 500) {
                errorAlert(error?.response?.status, "Server Error")
            } else if (error?.message == "Network Error") {
                errorAlert(error?.message, "Please check network connectivity")
            }
            registerType == "Admin" ? this.setAdminDashboardData([]) : this.setDealerDashboardData([])
        })
    }
    // Customer Data Set
    setAdminDashboardData = async (data) => {
        this.adminDashBoard = [];
        this.adminDashBoard = data != "null" ? data : [];
    }
    // Set dealer data
    setDealerDashboardData = async (data) => {
        this.dealerDashBoard = [];
        this.dealerDashBoard = data != "null" ? data : [];
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

    // Filter Device based data
    filterGetDeviceData = async (_id = 0, fromDate = 0, toDate = 0, search = 0, ownerId = 0, soldStatus) => {

        const formData = {
            "_id": "",
            "fromDate": "",
            "toDate": "",
            "pageNumber": "",
            "limit": "",
            "search": search == 0 ? "" : search,
            "ownerId": ownerId == 0 ? "" : ownerId,
            "soldStatus": soldStatus == false ? false : true
        }
        await axios.post(`${URL}device-filter`, formData).then(async (response) => {
            if (response?.data?.data?.length > 0 && response?.data?.data != "null") {
                soldStatus == false ? this.setUnSoldDeviceData(response?.data?.data) :
                    this.setSoldDeviceData(response?.data?.data)
            }
        }).catch((error) => {
            if (error?.response?.status == 404 || error?.response?.status == 500) {
                errorAlert(error?.response?.status, "Server Error")
            } else if (error?.message == "Network Error") {
                errorAlert(error?.message, "Please check network connectivity")
            }
            soldStatus == false ? this.setUnSoldDeviceData([]) :
                this.setSoldDeviceData([])
        })
    }
    // Sold Device Data Set
    setSoldDeviceData = async (data) => {
        this.soldDeviceData = [];
        this.soldDeviceData = data != "null" ? data : [];
    }

    // Unsold Device Data Set
    setUnSoldDeviceData = async (data) => {
        this.unsoldDeviceData = [];
        this.unsoldDeviceData = data != "null" ? data : [];
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
    // Sale Device Data
    postSaleDeviceData = async (registerType, formData) => {
        await axios.post(`${URL}sale`, formData).then(async (response) => {
            if (response?.status == 200) {
                addAndUpdateAlert(200, "Device Sale Data Added.");
                await this.filterGetDeviceData(0, 0, 0, 0, 0, true);
                await this.filterGetDeviceData(0, 0, 0, 0, 0, false);
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
