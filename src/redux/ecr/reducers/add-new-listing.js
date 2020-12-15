import { REHYDRATE } from "redux-persist";
import {
  SAVE_STEP_NO,
  SET_VEHICLE_DATA,
  SET_BRANCH_LIST,
  SET_FUEL_TYPE_LIST,
  SET_INSURANCE_LIST,
  SET_VEHICLE_IMAGES,
  LOCAL_SAVED_IMAGES,
  SET_VEHICLE_TYPE,
  SET_VEHICLE_TRANSMISSION,
  SET_VEHICLE_TYPE_LIST,
  SET_TRANSMISSION_TYPE_LIST,
  SET_BRANCH_MANAGER,
  SET_TERMS,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  SET_INSURANCE_INDEX,
  UPDATE_FAILURE,
  SET_FERRY,
  SET_FUEL_OFFER,
  SET_EXTRA_ITEMS,
  SET_FORM_STEP2,
  SET_FORM_STEP1,
  SET_FORM_STEP3,
  CHANGE_ORDER_IMAGES,
  CLEAR_VEHICLE_IMAGES,
  SET_VEHCILE_CATEGORY,
  NEW_LISTING_ID,
  ADD_IMAGES,
  GET_INSURANCE_BY_ID,
} from "../actions";

const {
  defaultConfig: { PLATFORM },
} = require(`../../../config/default`);
const { updateAuthToken } = require(`../../../helpers/${PLATFORM}/axios`);

const initialCommonState = {
  stepNo: 1,
  vehicleOptions: [],
  branchList: [],
  insuranceList: [],
  fuelList: [],
  vehiclesImages: [],
  localSavedImages: ["file", , , , , , , , , ,],
  vehicleTypes: [],
  vehicleTransmission: [],
  vehicleTypeList: [],
  transmissionTypeList: [],
  lastIndex: "",
  branchManager: [],
  terms: [],
  update: false,
  ferryData: [],
  fuelOffer: [],
  extraItemsData: [],
  formStep2Data: {},
  formStep1Data: {},
  formStep3Data: {},
  vehicleCategory: [],
  newListingId: "",
  insuranceCount: "",
  editInsuranceData: {},
  listIndex: 0,
};

const AddNewListingReducer = (state = { ...initialCommonState }, action) => {
  // ADD_IMAGES
  switch (action.type) {
    case ADD_IMAGES:
      return {
        ...state,
        vehiclesImages: action.data,
      };
    case NEW_LISTING_ID:
      return {
        ...state,
        newListingId: action.id,
      };

    case SAVE_STEP_NO:
      return {
        ...state,
        stepNo: action.no,
      };
    case CHANGE_ORDER_IMAGES:
      return {
        ...state,
        vehiclesImages: action.data,
      };
    case SET_VEHCILE_CATEGORY:
      return {
        ...state,
        vehicleCategory: action.data,
      };

    case SET_FORM_STEP2:
      return {
        ...state,
        formStep2Data: action.data,
      };
    case SET_FORM_STEP1:
      return {
        ...state,
        formStep1Data: action.data,
      };
    case SET_FORM_STEP3:
      return {
        ...state,
        formStep3Data: action.data,
      };
    case SET_EXTRA_ITEMS:
      return {
        ...state,
        extraItemsData: action.data,
      };
    case UPDATE_REQUEST:
      return {
        ...state,
        update: false,
      };
    case SET_FUEL_OFFER:
      return {
        ...state,
        fuelOffer: action.data,
      };
    case SET_FERRY:
      return {
        ...state,
        ferryData: action.data,
      };

    case UPDATE_SUCCESS:
      return {
        ...state,
        update: true,
      };
    case UPDATE_FAILURE:
      return {
        ...state,
        update: false,
      };
    case SET_VEHICLE_DATA:
      return {
        ...state,
        vehicleOptions: action.data,
      };
    case SET_BRANCH_LIST:
      return {
        ...state,
        branchList: action.data,
      };
    case SET_FUEL_TYPE_LIST:
      return {
        ...state,
        fuelList: action.fuelData,
      };
    case GET_INSURANCE_BY_ID:
      return {
        ...state,
        editInsuranceData: action.data,
      };
    case SET_INSURANCE_LIST:
      return {
        ...state,
        insuranceList: action.data.items,
        insuranceCount: action.data.totalCount,
      };
    case SET_INSURANCE_INDEX:
      return {
        ...state,
        listIndex: action.data,
      };
    case CLEAR_VEHICLE_IMAGES:
      return {
        ...state,
        vehiclesImages: [],
      };

    case SET_VEHICLE_IMAGES:
      state.vehiclesImages.push(
        action.data && action.data[0] && action.data[0].Location
      );
      return {
        ...state,
      };
    case SET_BRANCH_MANAGER:
      return {
        ...state,
        branchManager: action.data,
      };
    case LOCAL_SAVED_IMAGES:
      if (initialCommonState.lastIndex !== action.index) {
        initialCommonState.localSavedImages.splice(
          action.index,
          1,
          action.data
        );
      }
      return {
        ...state,
      };

    case SET_VEHICLE_TYPE:
      return {
        ...state,
        vehicleTypes: action.data,
      };
    case SET_VEHICLE_TRANSMISSION:
      return {
        ...state,
        vehicleTransmission: action.data,
      };

    case SET_FUEL_TYPE_LIST:
      return {
        ...state,
        fuelList: action.data,
      };
    case SET_VEHICLE_TYPE_LIST:
      return {
        ...state,
        vehicleTypeList: action.data,
      };
    case SET_TRANSMISSION_TYPE_LIST:
      return {
        ...state,
        transmissionTypeList: action.data,
      };
    case SET_TERMS:
      return {
        ...state,
        terms: action.data,
      };
    case REHYDRATE:
      let common =
        ((action || {}).payload || {}).AddNewListingReducer ||
        initialCommonState;
      return {
        ...state,
        stepNo: common.stepNo,
        formStep2Data: common.formStep2Data,
        formStep1Data: common.formStep1Data,
        formStep3Data: common.formStep3Data,
        newListingId: common.newListingId,
        vehiclesImages: common.vehiclesImages,
        vehicleOptions: common.vehicleOptions,
        branchList: common.branchList,
        insuranceList: common.insuranceList,
        fuelList: common.fuelList,
        vehicleTypes: common.vehicleTypes,
        vehicleTransmission: common.vehicleTransmission,
        vehicleTypeList: common.vehicleTypeList,
        transmissionTypeList: common.transmissionTypeList,
        vehicleCategory: common.vehicleCategory,
      };
    default:
      return state;
  }
};

export default AddNewListingReducer;
