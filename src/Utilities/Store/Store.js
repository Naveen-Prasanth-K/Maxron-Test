

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
    deviceOrderData = [];
    deviceOrderCompleteData = [];
    deviceServiceData = [];
    deviceServiceCompleteData = [];
    activeDeviceData= [];
    activeDeviceNumberData = [];
    rechargeDeviceData=[];
    customerData = [];
    dealerData = [];
    staffData = [];
    adminDashBoard = [];
    dealerDashBoard = [];
    bindDistrict = [];
    bindPermission = [];

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
            setActiveDeviceData: action,
            setCustomerData: action,
            setStaffData: action,
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
            updateResetPinData: action,
            // Device Register
            getDeviceData: action,
            postDeviceData: action,
            updateDeviceData: action,
            deleteDeviceData: action,
            setDeviceRegisterData: action,
            //Active Device
            postActiveDeviceData: action,
            getActiveDeviceFilterData: action,
            putActiveDeviceNumberData:action,
            //Active Device Number
            postActiveDeviceNumberData: action,
            putActiveDeviceNumberData:action,
            getActiveDeviceNumberFilterData: action,
            setActiveDeviceNumberData:action,
            //Recharge Device Data
            postRechargeDeviceData:action,
            getRechargeDeviceFilterData:action,
            setActiveDeviceRechargeData:action,

            //Device Order
            postDeviceOrderData: action,
            putDeviceOrderData: action,
            getDeviceOrderData: action,
            getFilterDeviceOrderData: action,
            setDeviceOrderRegisterData: action,
            setDeviceOrderCompleteRegisterData: action,
            // Device Service Data
            postDeviceServiceData: action,
            putDeviceServiceData: action,
            getDeviceServiceData: action,
            setDeviceServiceRegisterData: action,
            setDeviceServiceCompleteRegisterData: action,
            getFilterDeviceServiceData: action,
            //Bind Table
            getDistrictData: action,
            getPermissionData: action,
            setPermissionData: action,
            setDistrictData: action,
            getLocalDataUserDetails: action,
            getLocalDataUserFullDetails: action,

            memberRegister: observable,
            adminDashBoard: observable,
            dealerDashBoard: observable,
            customerData: observable,
            dealerData: observable,
            deviceRegister: observable,
            soldDeviceData: observable,
            unsoldDeviceData: observable,
            saleDeviceData: observable,
            deviceOrderData: observable,
            activeDeviceData: observable,
            activeDeviceNumberData:observable,
            rechargeDeviceData:observable,
            deviceOrderCompleteData: observable,
            deviceServiceCompleteData: observable,
            deviceServiceData: observable,
            bindDistrict: observable,
            bindPermission: observable,

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
                addAndUpdateAlert(200, `You have successfully registered as a ${registerType}`)
                this.getFilterMemberData(0, 0, 0, registerType);
            }
        }).catch((error) => {
            // console.log(`error -${ JSON.stringify(error) }`)
            if (error?.response?.status == 400) {
                errorAlert(error?.response?.status, "You are already registered as a user")
            } else if (error?.response?.status == 404 || error?.response?.status == 500) {
                errorAlert(error?.response?.status, "Server Error")
            } else if (error?.message == "Network Error") {
                errorAlert(error?.message, "Please check network connectivity")
            }
        })
    }
    // PUT Member based data
    putMemberData = async (registerType, formData) => {
        await axios.put(`${URL}member`, formData).then(async (response) => {
            if (response?.status == 200) {
                addAndUpdateAlert(200, `${registerType} Data Updated .`)
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
                registerType == "Dealer" ? this.setDealerData(response?.data?.data) : registerType == "Staff" ? this.setStaffData(response?.data?.data) : this.setCustomerData(response?.data?.data)
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
    // Update Reset Pin
    updateResetPinData = async (formData) => {
        await axios.post(`${URL}member/reset-pin`, formData).then(async (response) => {
            if (response?.status == 200) {
                addAndUpdateAlert(200, "Pin Reset Updated.")
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
    // Customer Data Set
    setCustomerData = async (data) => {
        this.customerData = [];
        this.customerData = data != "null" ? data : [];
    }
    // Staff Data Set
    setStaffData = async (data) => {
        this.staffData = [];
        this.staffData = data != "null" ? data : [];
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
        //console.log(`form Data -${JSON.stringify(formData)}`)
        await axios.post(`${URL}dashboard`, formData).then(async (response) => {
            if (response?.data?.message == "Success") {
                // console.log(`response?.data -${JSON.stringify(response?.data)}`)
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
                await this.getDeviceData();
                await this.getDashboardMemberData(formData?.ownerId, "Admin");
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
    updateDeviceData = async (formData, alertType) => {
        // console.log(`motor update -${ JSON.stringify(formData) }`)
        await axios.put(`${URL}device`, formData).then(async (response) => {
            if (response?.data?.message == "Success") {
                addAndUpdateAlert(200, `${ alertType } status updated in device`);
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
            "soldStatus": soldStatus == false ? false : true,
            "deviceActiveStatus": ""
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

    // POst Active Device based data
    postActiveDeviceData = async (formData) => {
        await axios.post(`${URL}active-device`, formData).then(async (response) => {
            if (response?.status == 200) {
                addAndUpdateAlert(200, "Active Device Data Added.")
                await this.getDeviceData();
                await this.filterGetDeviceData(0,0,0,0,0, false);
                await this.getDashboardMemberData(formData?.ownerId, "Admin");
            }
        }).catch((error) => {
            if (error?.response?.status == 404 || error?.response?.status == 500) {
                errorAlert(error?.response?.status, "Server Error")
            } else if (error?.message == "Network Error") {
                errorAlert(error?.message, "Please check network connectivity")
            }
        })
    }
    // Active Device Filter Based Data
    getActiveDeviceFilterData = async (_id = 0, fromDate = 0, toDate = 0, search = 0, buyerId = 0, customerId = 0 ,deviceId = 0 ) => {

        const formData ={
            "_id" : "", 
            "fromDate" : "", 
            "toDate": "" , 
            "pageNumber" : ""  , 
            "limit" : "", 
            "search" : "" ,
            "buyerId" : buyerId == 0 ? "" : buyerId,
            "customerId" : customerId == 0 ? "" : customerId,
            "deviceId" :  deviceId == 0 ? "" : deviceId
        }


        await axios.post(`${URL}active-device-filter`, formData).then(async (response) => {
            if (response?.status == 200) {            
                this.setActiveDeviceData(response?.data?.data)
            }
        }).catch((error) => {
            if (error?.response?.status == 404 || error?.response?.status == 500) {
                errorAlert(error?.response?.status, "Server Error")
            } else if (error?.message == "Network Error") {
                errorAlert(error?.message, "Please check network connectivity")
            }
        })
    }
    //set Active device data
    setActiveDeviceData = (data) => {
        this.activeDeviceData = [];
        this.activeDeviceData = data != "null" ? data : [];
    }
    // POst Active Device Number based data
    postActiveDeviceNumberData = async (formData) => {
        console.log("form Data", JSON.stringify(formData))
        await axios.post(`${URL}device-numbers`, formData).then(async (response) => {
            if (response?.status == 200) {
                addAndUpdateAlert(200, "Device Number Added.")
                await this.getActiveDeviceNumberFilterData(0,0,0,0,0,0,formData?.deviceId, 0);
            }
        }).catch((error) => {
            if (error?.response?.status == 404 || error?.response?.status == 500) {
                errorAlert(error?.response?.status, "Server Error")
            } else if (error?.message == "Network Error") {
                errorAlert(error?.message, "Please check network connectivity")
            }
        })
    }
     // Update Active Device Number based data
     putActiveDeviceNumberData = async (formData) => {
        await axios.put(`${URL}device-numbers`, formData).then(async (response) => {
            if (response?.status == 200) {
                addAndUpdateAlert(200, "Device Number Updated.")
                await this.getActiveDeviceNumberFilterData(0,0,0,0,0,0,formData?.deviceId, 0);
            }
        }).catch((error) => {
            if (error?.response?.status == 404 || error?.response?.status == 500) {
                errorAlert(error?.response?.status, "Server Error")
            } else if (error?.message == "Network Error") {
                errorAlert(error?.message, "Please check network connectivity")
            }
        })
    }
       // Active Device Number Filter Based Data
       getActiveDeviceNumberFilterData = async (_id = 0, fromDate = 0, toDate = 0, search = 0, mobileNo = 0, customerId = 0 ,deviceId = 0, deviceViewType = 0 ) => {

        const formData ={
            "_id" : "", 
            "fromDate" : "", 
            "toDate": "" , 
            "pageNumber" : ""  , 
            "limit" : "", 
            "search" : "" ,
            "mobileNo" : mobileNo == 0 ?  "" : mobileNo,
            "customerId" : customerId == 0 ? "" : customerId,
            "deviceId" :  deviceId == 0 ? "" : deviceId,
            "deviceViewType": deviceViewType == 0 ? "" : deviceViewType
        }


        await axios.post(`${URL}device-numbers-filter`, formData).then(async (response) => {
            if (response?.status == 200) {            
                this.setActiveDeviceNumberData(response?.data?.data)
            }
        }).catch((error) => {
            if (error?.response?.status == 404 || error?.response?.status == 500) {
                errorAlert(error?.response?.status, "Server Error")
            } else if (error?.message == "Network Error") {
                errorAlert(error?.message, "Please check network connectivity")
            }
        })
    }
    //set Active device Number data
    setActiveDeviceNumberData = (data) => {
        this.activeDeviceNumberData = [];
        this.activeDeviceNumberData = data != "null" ? data : [];
    }
     // POst Recharge Number based data
     postRechargeDeviceData = async (formData) => {
        await axios.post(`${URL}device-recharge`, formData).then(async (response) => {
            if (response?.status == 200) {
                addAndUpdateAlert(200, "Device Recharge Notification Updated.")
                await this.getRechargeDeviceFilterData(0,0,0,0,0,formData?.deviceId);
            }
        }).catch((error) => {
            if (error?.response?.status == 404 || error?.response?.status == 500) {
                errorAlert(error?.response?.status, "Server Error")
            } else if (error?.message == "Network Error") {
                errorAlert(error?.message, "Please check network connectivity")
            }
        })
    }
    // Recharge Device Filter Data
    getRechargeDeviceFilterData = async (_id = 0, fromDate = 0, toDate = 0, search = 0,customerId = 0 ,deviceId = 0 ) => {

        const formData ={
            "_id" : "", 
            "fromDate" : "", 
            "toDate": "" , 
            "pageNumber" : ""  , 
            "limit" : "", 
            "search" : "" ,
            "customerId" : customerId == 0 ? "" : customerId,
            "deviceId" :  deviceId == 0 ? "" : deviceId
        }


        await axios.post(`${URL}device-recharge-filter`, formData).then(async (response) => {
            if (response?.status == 200) {            
                this.setActiveDeviceRechargeData(response?.data?.data)
            }
        }).catch((error) => {
            if (error?.response?.status == 404 || error?.response?.status == 500) {
                errorAlert(error?.response?.status, "Server Error")
            } else if (error?.message == "Network Error") {
                errorAlert(error?.message, "Please check network connectivity")
            }
        })
    }
    //set Active device Recharge
    setActiveDeviceRechargeData = (data) => {
        this.rechargeDeviceData = [];
        this.rechargeDeviceData = data != "null" ? data : [];
    }
    // POst Device Order
    postDeviceOrderData = async (registerType, formData) => {
        await axios.post(`${URL}device-order`, formData).then(async (response) => {
            if (response?.status == 200) {
                addAndUpdateAlert(200, "Device Order Added.")
                this.getFilterDeviceOrderData(0, 0, 0, 0, 0, formData?.buyerId);
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
    // PUT Device Order based data
    putDeviceOrderData = async (registerType, formData) => {
        // console.log(`putMemberData triggered`)
        // console.log(`formData -${JSON.stringify(formData)}`)
        await axios.put(`${URL}device-order`, formData).then(async (response) => {
            //  console.log(`putMemberData response = ${JSON.stringify(response?.data?.data)}`)
            if (response?.status == 200) {
                addAndUpdateAlert(200, "Device Order Updated .")
                this.getFilterDeviceOrderData(0, 0, 0, 0, 0, formData?.buyerId);
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
    // Get Device Order based data
    getDeviceOrderData = async (memberType) => {
        await axios.get(`${URL}device-order`).then(async (response) => {
            if (response?.data?.data?.length > 0 && response?.data?.data != "null") {
                this.setDeviceOrderRegisterData(response?.data?.data)
            }
        }).catch((error) => {
            if (error?.response?.status == 404 || error?.response?.status == 500) {
                errorAlert(error?.response?.status, "Server Error")
            } else if (error?.message == "Network Error") {
                errorAlert(error?.message, "Please check network connectivity")
            }
            this.setDeviceOrderRegisterData([]);
        })
    }
    setDeviceOrderRegisterData = (data) => {
        // console.log(`set device data -${data?.length}`)
        this.deviceOrderData = [];
        this.deviceOrderData = data != "null" ? data : [];
    }
    setDeviceOrderCompleteRegisterData = (data) => {
        // console.log(`set device completed data -${data?.length}`)
        this.deviceOrderCompleteData = [];
        this.deviceOrderCompleteData = data != "null" ? data : [];
    }
    // Get Device Order based data - Filter
    getFilterDeviceOrderData = async (fromDate = 0, toDate = 0, search = 0, memberType = 0, status = 0, buyerId = 0) => {
        const formData = {
            "fromDate": fromDate == 0 ? "" : fromDate,
            "toDate": toDate == 0 ? "" : toDate,
            "pageNumber": "",
            "limit": "",
            "search": search == 0 ? "" : search,
            "buyerId": buyerId == 0 ? "" : buyerId,
            "status": status == 0 ? "" : status,
            "memberType": memberType == 0 ? "" : memberType
        }
        await axios.post(`${URL}device-order-filter`, formData).then(async (response) => {
            if (response?.data?.data?.length > 0 && response?.data?.data != "null") {
                status == "Pending" ? this.setDeviceOrderRegisterData(response?.data?.data) : this.setDeviceOrderCompleteRegisterData(response?.data?.data)
            }
        }).catch((error) => {
            if (error?.response?.status == 404 || error?.response?.status == 500) {
                errorAlert(error?.response?.status, "Server Error")
            } else if (error?.message == "Network Error") {
                errorAlert(error?.message, "Please check network connectivity")
            }
            status == "Pending" ? this.setDeviceOrderRegisterData([]) : this.setDeviceOrderCompleteRegisterData([])
        })
    }
    // POst Device Service
    postDeviceServiceData = async (registerType, formData) => {
        await axios.post(`${URL}device-service`, formData).then(async (response) => {
            if (response?.status == 200) {
                addAndUpdateAlert(200, "Device Service Added.")
                this.getFilterDeviceServiceData(0, 0, 0, registerType);
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
    // PUT Device Service based data
    putDeviceServiceData = async (registerType, formData) => {
        await axios.put(`${URL}device-service`, formData).then(async (response) => {
            // console.log(`putMemberData response = ${JSON.stringify(response?.data?.data)}`)
            if (response?.status == 200) {
                addAndUpdateAlert(200, "Device Service Updated .")
                this.getFilterDeviceServiceData(0, 0, 0, registerType);
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
    // Get Device Service based data
    getDeviceServiceData = async (memberType) => {
        await axios.get(`${URL}device-service`).then(async (response) => {
            if (response?.data?.data?.length > 0 && response?.data?.data != "null") {
                this.setDeviceServiceRegisterData(response?.data?.data)
            }
        }).catch((error) => {
            if (error?.response?.status == 404 || error?.response?.status == 500) {
                errorAlert(error?.response?.status, "Server Error")
            } else if (error?.message == "Network Error") {
                errorAlert(error?.message, "Please check network connectivity")
            }
            this.setDeviceServiceRegisterData([]);
        })
    }
    setDeviceServiceRegisterData = (data) => {
        this.deviceServiceData = [];
        this.deviceServiceData = data != "null" ? data : [];
    }
    setDeviceServiceCompleteRegisterData = (data) => {
        this.deviceServiceCompleteData = [];
        this.deviceServiceCompleteData = data != "null" ? data : [];
    }
    // Get Device Service based data - Filter
    getFilterDeviceServiceData = async (fromDate = 0, toDate = 0, search = 0, memberType = 0, status = 0, buyerId = 0) => {
        const formData = {
            "fromDate": fromDate == 0 ? "" : fromDate,
            "toDate": toDate == 0 ? "" : toDate,
            "pageNumber": "",
            "limit": "",
            "search": search == 0 ? "" : search,
            "buyerId": buyerId == 0 ? "" : buyerId,
            "status": status == 0 ? "" : status,
            "memberType": memberType == 0 ? "" : memberType
        }
        //console.log(`form Data -${JSON.stringify(formData)}`)
        await axios.post(`${URL}device-service-filter`, formData).then(async (response) => {
            if (response?.data?.data?.length > 0 && response?.data?.data != "null") {
                status == "Pending" ? this.setDeviceServiceRegisterData(response?.data?.data) :
                    this.setDeviceServiceCompleteRegisterData(response?.data?.data)
            }
        }).catch((error) => {
            if (error?.response?.status == 404 || error?.response?.status == 500) {
                errorAlert(error?.response?.status, "Server Error")
            } else if (error?.message == "Network Error") {
                errorAlert(error?.message, "Please check network connectivity")
            }
            this.setDeviceServiceRegisterData([])
        })
    }
    // Sale Device Data
    postSaleDeviceData = async (registerType, formData, id) => {
        await axios.post(`${URL}sale`, formData).then(async (response) => {
            if (response?.status == 200) {
                addAndUpdateAlert(200, "Device Sale Data Added.");
                await this.filterGetDeviceData(0, 0, 0, 0, 0, true);
                await this.filterGetDeviceData(0, 0, 0, 0, 0, false);
                await this.getDashboardMemberData(id, "Admin");
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
    // Bind Permission Data
    getPermissionData = async () => {
        await axios.get(`${URL}bind-permission`).then(async (response) => {
            if (response?.data?.data?.length > 0 && response?.data?.data != "null") {
                this.setPermissionData(response?.data?.data)
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
    // Set Permission Data
    setPermissionData = (data) => {
        this.bindPermission = [];
        this.bindPermission = data != "null" ? data : [];
    }

    getLocalDataUserDetails = async (key, tableName = "memberData") => {
        let data = await localStorageGetSingleItem(tableName);
        // console.log(`localstorage data data -${JSON.stringify(data)}`)
        return data == null ? "null" : data[key];
    }
  
    deleteLocalStorageData = async (key) => {
        let memberData = await localStorageDelete("memberData");
        let toten = await localStorageDelete("ownerToken");
        let data = await localStorageGetSingleItem("memberData");
        return "key deleted";
    }

    getLocalDataUserFullDetails = async (tableName = "memberData") => {
        let data = await localStorageGetSingleItem(tableName);
        // console.log(`localstorage data data -${JSON.stringify(data)}`)
        return data == null ? "null" : data;
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
