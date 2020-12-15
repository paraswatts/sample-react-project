export const SAVE_STEP_NO = "SAVE_STEP_NO";
export const SET_VEHICLE_DATA = "SET_VEHICLE_DATA";
export const GET_VEHICLE_DATA = "GET_VEHICLE_DATA";
export const GET_BRANCH_LIST = "GET_BRANCH_LIST";
export const SET_BRANCH_LIST = "SET_BRANCH_LIST";
export const GET_FUEL_TYPE_LIST = "GET_FUEL_TYPE_LIST";
export const SET_FUEL_TYPE_LIST = "SET_FUEL_TYPE_LIST";
export const GET_INSURANCE_LIST = "GET_INSURANCE_LIST";
export const SET_INSURANCE_LIST = "SET_INSURANCE_LIST";
export const FILE_UPLOAD = "FILE_UPLOAD";
export const SET_VEHICLE_IMAGES = "VEHICLE_IMAGES";
export const LOCAL_SAVED_IMAGES = "LOCAL_SAVED_IMAGES";
export const GET_VEHICLE_TYPE = "GET_VEHICLE_TYPE";
export const SET_VEHICLE_TYPE = "SET_VEHICLE_TYPE";
export const GET_VEHICLE_TRANSMISSION = "GET_VEHICLE_TRANSMISSION";
export const SET_VEHICLE_TRANSMISSION = "SET_VEHICLE_TRANSMISSION";
export const GET_VEHICLE_TYPE_LIST = "GET_VEHICLE_TYPE_LIST";
export const SET_VEHICLE_TYPE_LIST = "SET_VEHICLE_TYPE_LIST";
export const GET_TRANSMISSION_TYPE_LIST = "GET_TRANSMISSION_TYPE_LIST";
export const SET_TRANSMISSION_TYPE_LIST = "SET_TRANSMISSION_TYPE_LIST";
export const GET_BRANCH_MANGERS = "GET_BRANCH_MANGERS";
export const SET_BRANCH_MANAGER = "SET_BRANCH_MANAGER";
export const CREATE_BRANCH = "CREATE_BRANCH";
export const GET_TERMS = "GET_TERMS";
export const SET_TERMS = "SET_TERMS";
export const UPDATE_REQUEST = "UPDATE_REQUEST";
export const UPDATE_SUCCESS = "UPDATE_SUCCESS";
export const UPDATE_FAILURE = "UPDATE_FAILURE";
export const ADD_INSURANCE = "ADD_INSURANCE";
export const ADD_FERRY = "ADD_FERRY";
export const GET_FERRY = "GET_FERRY";
export const SET_FERRY = "SET_FERRY";
export const GET_FUEL_OFFER = "GET_FUEL_OFFER";
export const SET_FUEL_OFFER = "SET_FUEL_OFFER";
export const ADD_FUEL_OFFER = "ADD_FUEL_OFFER";
export const ADD_EXTRA_ITEMS = "ADD_EXTRA_ITEMS";
export const GET_EXTRA_ITEMS = "GET_EXTRA_ITEMS";
export const SET_EXTRA_ITEMS = "SET_EXTRA_ITEMS";
export const ADD_NEW_TERMS = "ADD_NEW_TERMS";
export const SET_FORM_STEP2 = "SET_FORM_STEP2";
export const SET_FORM_STEP1 = "SET_FORM_STEP1";
export const SET_FORM_STEP3 = "SET_FORM_STEP3";
export const CLEAR_VEHICLE_IMAGES = "CLEAR_VEHICLE_IMAGES";
export const CHANGE_ORDER_IMAGES = "CHANGE_ORDER_IMAGES";
export const GET_VEHCILE_CATEGORY = "GET_VEHCILE_CATEGORY";
export const SET_VEHCILE_CATEGORY = "SET_VEHCILE_CATEGORY";
export const ADD_NEW_VEHICLE = "ADD_NEW_VEHICLE";
export const CREATE_NEW_LISTING = "CREATE_NEW_LISTING";
export const CREATE_VEHICLE_CATEGORY = "CREATE_VEHICLE_CATEGORY";
export const ADD_NEW_MEMBER = "ADD_NEW_MEMBER";
export const NEW_LISTING_ID = "NEW_LISTING_ID";
export const DELETE_INSURANCE = "DELETE_INSURANCE";
export const DELETE_MEMBER = "DELETE_MEMBER";
export const EDIT_INSURANCE = "EDIT_INSURANCE";
export const GET_INSURANCE_BY_ID = "GET_INSURANCE_BY_ID";
export const UPDATE_MEMBER = "UPDATE_MEMBER";
export const SET_INSURANCE_INDEX = "SET_INSURANCE_INDEX";

export const updateMember = (data, success, failure) => {
  return {
    type: UPDATE_MEMBER,
    data,
    success,
    failure,
  };
};

export const deleteMember = (id, success, failure) => {
  return {
    type: DELETE_MEMBER,
    id,
    success,
    failure,
  };
};
export const newListingId = (id) => {
  return {
    type: NEW_LISTING_ID,
    id,
  };
};

export const addNewMember = (data, success, failure) => {
  return {
    type: ADD_NEW_MEMBER,
    data,
    success,
    failure,
  };
};

export const createVehicleCategory = (data, success, failure) => {
  return {
    type: CREATE_VEHICLE_CATEGORY,
    data,
    success,
    failure,
  };
};

export const createNewListing = (data, success, failure) => {
  return {
    type: CREATE_NEW_LISTING,
    data,
    success,
    failure,
  };
};

export const addNewVehicle = (data, success, failure) => {
  return {
    type: ADD_NEW_VEHICLE,
    data,
    success,
    failure,
  };
};
export const getVehcileCategory = () => {
  return {
    type: GET_VEHCILE_CATEGORY,
  };
};

export const setVehcileCategory = (data) => {
  return {
    type: SET_VEHCILE_CATEGORY,
    data,
  };
};

export const changeOrderImages = (data) => {
  return {
    type: CHANGE_ORDER_IMAGES,
    data,
  };
};
export const setFormStep3Data = (data) => {
  return {
    type: SET_FORM_STEP3,
    data,
  };
};

export const setFormStep1Data = (data) => {
  return {
    type: SET_FORM_STEP1,
    data,
  };
};
export const setFormStep2Data = (data) => {
  return {
    type: SET_FORM_STEP2,
    data,
  };
};

export const addNewTerms = (data, success, failure) => {
  return {
    type: ADD_NEW_TERMS,
    data,
    success,
    failure,
  };
};

export const getExtraItems = () => {
  return {
    type: GET_EXTRA_ITEMS,
  };
};

export const setExtraItems = (data) => {
  return {
    type: SET_EXTRA_ITEMS,
    data,
  };
};

export const addExtraItems = (data, success, failure) => {
  return {
    type: ADD_EXTRA_ITEMS,
    data,
    success,
    failure,
  };
};

export const addFuelOffer = (data, success, failure) => {
  return {
    type: ADD_FUEL_OFFER,
    data,
    success,
    failure,
  };
};

export const getFuelOffer = () => {
  return {
    type: GET_FUEL_OFFER,
  };
};

export const setFuelOffer = (data) => {
  return {
    type: SET_FUEL_OFFER,
    data,
  };
};
export const getFerry = () => {
  return {
    type: GET_FERRY,
  };
};

export const setFerry = (data) => {
  return {
    type: SET_FERRY,
    data,
  };
};

export const addFerry = (data, success, failure) => {
  return {
    type: ADD_FERRY,
    data,
    success,
    failure,
  };
};

export const addInsurance = (data, success, failure) => {
  return {
    type: ADD_INSURANCE,
    data,
    success,
    failure,
  };
};

export const updateRequest = () => {
  return {
    type: UPDATE_REQUEST,
  };
};

export const updateSuccess = () => {
  return {
    type: UPDATE_SUCCESS,
  };
};
export const updateFailure = () => {
  return {
    type: UPDATE_FAILURE,
  };
};
export const getTerms = () => {
  return {
    type: GET_TERMS,
  };
};

export const setTerms = (data) => {
  return {
    type: SET_TERMS,
    data,
  };
};

export const createBranch = (data, success, failure) => {
  return {
    type: CREATE_BRANCH,
    data,
    success,
    failure,
  };
};

export const getBranchManager = () => {
  return {
    type: GET_BRANCH_MANGERS,
  };
};

export const setBranchManager = (data) => {
  return {
    type: SET_BRANCH_MANAGER,
    data,
  };
};

export const getVehicleTransmission = () => {
  return {
    type: GET_VEHICLE_TRANSMISSION,
  };
};

export const setVehicleTransmission = (data) => {
  return {
    type: SET_VEHICLE_TRANSMISSION,
    data,
  };
};

export const getVehicleType = (data) => {
  return {
    type: GET_VEHICLE_TYPE,
    data,
  };
};

export const setVehicleType = (data) => {
  return {
    type: SET_VEHICLE_TYPE,
    data,
  };
};
export const getVehicleTypeList = (data) => {
  return {
    type: GET_VEHICLE_TYPE_LIST,
    data,
  };
};

export const getTransmissionTypeList = (data) => {
  return {
    type: GET_TRANSMISSION_TYPE_LIST,
    data,
  };
};

export const setTransmissionTypeList = (data) => {
  return {
    type: SET_TRANSMISSION_TYPE_LIST,
    data,
  };
};

export const localSavedImages = (index, data) => {
  return {
    type: LOCAL_SAVED_IMAGES,
    index,
    data,
  };
};
export const clearVehiclesImages = () => {
  return {
    type: CLEAR_VEHICLE_IMAGES,
  };
};
export const getVehiclesImages = (data) => {
  return {
    type: SET_VEHICLE_IMAGES,
    data,
  };
};
export const fileUploader = (data, index, length, success, failure) => {
  return {
    type: FILE_UPLOAD,
    index,
    length,
    data,
    success,
    failure,
  };
};

export const getInsuranceList = (data) => {
  return {
    type: GET_INSURANCE_LIST,
    data,
  };
};

export const setVehicleTypeList = (data) => {
  return {
    type: SET_VEHICLE_TYPE_LIST,
    data,
  };
};

export const setInsuranceData = (data) => {
  return {
    type: SET_INSURANCE_LIST,
    data,
  };
};
export const setInsuranceList = (data) => {
  return {
    type: SET_INSURANCE_LIST,
    data,
  };
};

export const getFuelList = (data) => {
  return {
    type: GET_FUEL_TYPE_LIST,
    data,
  };
};

export const setFuelList = (fuelData) => {
  return {
    type: SET_FUEL_TYPE_LIST,
    fuelData,
  };
};

export const getBranchList = (data) => {
  return {
    type: GET_BRANCH_LIST,
    data,
  };
};

export const setBranchList = (data) => {
  return {
    type: SET_BRANCH_LIST,
    data,
  };
};
export const saveStepNo = (no) => {
  return {
    type: SAVE_STEP_NO,
    no,
  };
};

export const getVehicleData = (data) => {
  return {
    type: GET_VEHICLE_DATA,
    data,
  };
};
export const setVehicleData = (data) => {
  return {
    type: SET_VEHICLE_DATA,
    data,
  };
};
export const deleteInsurance = (data, success, failure) => {
  return {
    type: DELETE_INSURANCE,
    data,
    success,
    failure,
  };
};

export const setInsuranceListIndex = (data) => {
  return {
    type: SET_INSURANCE_INDEX,
    data,
  };
};

export const editInsurance = (data, success, failure) => {
  return {
    type: EDIT_INSURANCE,
    data,
    success,
    failure,
  };
};
export const getINsuranceByID = (data, success, failure) => {
  return {
    type: GET_INSURANCE_BY_ID,
    data,
  };
};
