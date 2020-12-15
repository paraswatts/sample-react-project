import { ROUTES } from "./routes";
const {
  defaultConfig: { LOCATION }
} = require(`../../../config/default`);
const { STRINGS } = require(`./${LOCATION}/strings`);

export const USER_PLATFORM = 7;

export const EMAIL_REGX = /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const NAME_REGX = /^[A-Z.a-z'\b ]+$/;
export const FIRST_WHITE_SPACE_NOT_ALLOWED_NAME_REGEX = /^[^-\s][a-z.A-Z_\s-]+$/
export const PHONE_REGX = /^[0-9]+$/;
export const PRICE_REGX = /^[0-9]*\.?[0-9]{0,2}$/;
export const WEBSITE_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm
///^([0-9]*([.,](?=[0-9]{3}))?[0-9]+)+((?!\2)[.,][0-9][0-9])?$/
// export const POST_CODE_REGX=/^[A-Za-z0-9]/;
export const REFERENCE_REGX = /^[A-Za-z0-9\b]+$/;
export const PASSWORD_LENGTH = 6;
export const MIN_PHONE_LENGTH = 7;
export const MAX_PHONE_LENGTH = 15;
export const LABELS = {
  signUpHeading: STRINGS.SIGNUP_HEADING,
  signUpSubHeading: STRINGS.SIGNUP_SUBHEADING,
  signUpSubSubHeading: STRINGS.SIGNUP_SUB_SUBHEADING,
  forgotPassword: STRINGS.FORGOT_PASSWORD,
  orConnectWith: STRINGS.OR_CONNECT_WITH,
  login: STRINGS.LOGIN,
  login_heading: STRINGS.LOGIN_HEADING,
  register: STRINGS.REGISTER_HEADING_LABEL,
  email: STRINGS.EMAIL,
  password: STRINGS.PASSWORD,
  forgotPassword: STRINGS.FORGOT_PASSWORD,
  checkYourMail: STRINGS.CHECK_YOUR_MAIL,
  name: STRINGS.NAME,
  requestDate: STRINGS.REQUEST_DATE,
  role: STRINGS.ROLE,
  action: STRINGS.ACTION,
  freedaysAvailableLabel: STRINGS.FREE_DAYS_AVAILABLE_LABEL,
  availabledays: STRINGS.AVAILABLE_DAYS,
  selectedPaidDays: STRINGS.SELECTED_PAID_DAYS,
  selectedFreeDays: STRINGS.SELECTED_FREE_DAYS,
  freeDaysLabel: STRINGS.FREE_DAYS_LABEL,
  paidDaysLabel: STRINGS.PAID_DAYS_LABEL,
  totalLabel: STRINGS.TOTAL,
  extraPaidDaysAvailLabel: STRINGS.EXTRA_PAID_DAYS_AVAILABLE_LABEL,
  all: STRINGS.ALL,
  drivers: STRINGS.DRIVERS,
  yourRequest: STRINGS.REQUEST,
  media: STRINGS.MEDIA,
  security: STRINGS.SECURITY,
  noOfRows: STRINGS.NO_OF_ROWS,
  usersList: STRINGS.USERS_LIST,
  status: STRINGS.STATUS,
  active: STRINGS.ACTIVE,
  registered: STRINGS.REGISTERED,
  requested: STRINGS.REQUESTED,
  invited: STRINGS.INVITED,
  pickupFromLabel: STRINGS.PICKUPFROM_LABEL,
  pickupTimeLabel: STRINGS.PICKUPTIME_LABEL,
  travelDistLabel: STRINGS.TRAVEL_DIST_LABEL,
  kmAllowLabel: STRINGS.KMALLOW_LABEL,
  dropOffTimeLabel: STRINGS.DROP_OFFTIME_LABEL,
  makeRequestBtnLabel: STRINGS.MAKE_REQUEST_BTN_LABEL,
  done: STRINGS.DONE,
  rejectedFileType: STRINGS.REJECTED_FILE_TYPE,
  addUser: STRINGS.ADD_USER,
  startDate: STRINGS.START_DATE,
  endDate: STRINGS.END_DATE,
  selectTravelDate: STRINGS.TRAVEL_DATE,
  attempt: STRINGS.ATTEMPT,
  percentage: STRINGS.PERCENTAGE,
  date: STRINGS.DATE,
  time: STRINGS.START_TIME,
  emptyTestHeading: STRINGS.EMPTY_TEST_HEADING,
  emptyTestDescription: STRINGS.EMPTY_TEST_DESCRIPTION,
  addTest: STRINGS.ADD_TEST,
  questionTitle: STRINGS.QUESTION_TITLE,
  questionType: STRINGS.QUESTION_TYPE,
  testType: STRINGS.TEST_TYPE,
  costSummaryLabel: STRINGS.COST_SUMMARY_LABEL,
  tripDetailsLabel: STRINGS.TRIP_DETAILS_LABEL,
  questionTypeLabel: STRINGS.QUESTION_TYPE_LABEL,
  access: STRINGS.ACCESS,
  eventDate: STRINGS.EVENT_DATE,
  eventTime: STRINGS.EVENT_TIME,
  additionalInfoLabel: STRINGS.ADDITIONAL_INFO_LABEL,
  ambassadorAccess: STRINGS.AMBASSADOR_ACCESS,
  iMNew: STRINGS.I_M_NEW,
  vehicle: STRINGS.VEHICLE,
  quantity: STRINGS.QUANTITY,
  pickUpLocation: STRINGS.PICK_UP_LOCATION,
  pickUpDate: STRINGS.PICK_UP_DATE,
  dropOffLocation: STRINGS.DROP_OFF_LOCATION,
  dropOffDate: STRINGS.DROP_OFF_DATE,
  listingDate: STRINGS.LISTING_DATE,
  lastUpdated: STRINGS.LAST_UPDATED,
  operator: STRINGS.OPERATOR,
  driverName: STRINGS.DRIVER_NAME,
  reference: STRINGS.REFERENCE,
  id: STRINGS.ID,
  action: STRINGS.ACTION,
  starRating: STRINGS.STAR_RATING,
  comments: STRINGS.COMMENTS,
  rego: STRINGS.REGO,
  addNewBranch: STRINGS.ADD_NEW_BRANCH,
  ratePageHeader: STRINGS.DRIVER_RATING_HEADER,
  pastRatings: STRINGS.PAST_RATINGS,
  addNewListing: STRINGS.ADD_NEW_LISTING,
  hereYourDashboard: STRINGS.HERE_YOUR_DASHBOARD,
  view: STRINGS.VIEW,
  go: STRINGS.GO,
  addNew: STRINGS.ADD_NEW,
  changePasswordheading: STRINGS.CHANGE_PASSWORD,
  driverTripLabel: STRINGS.DRIVER_TRIP_LABEL,
  upcomingTripLabel: STRINGS.UPCOMING_TRIP_LABEL,
  pastTripLabel: STRINGS.PAST_TRIP_LABEL,
  cancelledtripLabel: STRINGS.CANCELLED_TRIP_LABEL,
  overallScoreLabel: STRINGS.OVERALL_SCORE,
  favorite: STRINGS.FAVORITE,
  bookingId: STRINGS.BOOKING_ID,
  RatingByDrivers: STRINGS.RATING_BY_DRIVERS,
  accept: STRINGS.ACCEPT,
  driverDetails: STRINGS.DRIVER_DETAILS
};

export const PAGE_TITLES = {
  dashboard: STRINGS.DASHBOARD_PAGE_TITLE,
  users: STRINGS.USERS_PAGE_TITLE,
  requests: STRINGS.REQUESTS_PAGE_TITLE,
  forgot: STRINGS.FORGOT_PAGE_TITLE,
  login: STRINGS.LOGIN_PAGE_TITLE,
  register: STRINGS.REGISTER_PAGE_TITLE,
  roles: STRINGS.MANAGE_ROLES_TITLE,
}

export const KEY_CODES = {
  enterKey: 13,
  nine: 57,
  zero: 48,
  backSpace: 8
};

export const INSURANCE_TYPE = {
  PLATINUM: 1,
  GOLD: 2,
  BRONZE: 3
}

export const InsuranceListTable = [
  'ID', "Inurance Name", "Bond", "Daily Fee", "Excess"
]

export const VALIDATION_MESSAGES = {
  EMAIL_REQUIRED: STRINGS.EMAIL_REQUIRED,
  EMAIL_IS_NOT_VALID: STRINGS.EMAIL_IS_NOT_VALID,
  PASSWORD_REQUIRED: STRINGS.PASSWORD_REQUIRED,
  PASSWORDS_DO_NOT_MATCH: STRINGS.PASSWORD_DO_NOT_MATCH,
  PASSWORD_MINLENGTH: STRINGS.PASSWORD_MINLENGTH,
  CAPTCHA_REQUIRED: STRINGS.CAPTCHA_REQUIRED,
  EMAIL_INVALID: STRINGS.EMAIL_INVALID,
  LOCATION_REQUIRED: STRINGS.LOCATION_REQUIRED,
  NAME_REQUIRED: STRINGS.NAME_REQUIRED,
  DESCRIPTION_REQUIRED: STRINGS.DESCRIPTION_REQUIRED,
  DATE_REQUIRED: STRINGS.DATE_REQUIRED,
  EVENT_NAME_REQUIRED: STRINGS.EVENT_NAME_REQUIRED,
  COUNTRY_REQUIRED: STRINGS.COUNTRY_REQUIRED,
  CITY_REQUIRED: STRINGS.CITY_REQUIRED,
  SURNAME_REQUIRED: STRINGS.SURNAME_REQUIRED,
  DOB_REQUIRED: STRINGS.DOB_REQUIRED,
  ADDRESS_REQUIRED: STRINGS.ADDRESS_REQUIRED,
  SUBURB_REQUIRED: STRINGS.SUBURB_REQUIRED,
  POSTCODE_REQUIRED: STRINGS.POSTCODE_REQUIRED,
  CODE_REQUIRED: STRINGS.CODE_REQUIRED,
  PICK_DROP_REQUIRED: STRINGS.PICK_DROP_REQUIRED,
  BRANCH_REQUIRED: STRINGS.BRANCH_REQUIRED,
  OPEN_FROM_REQUIRED: STRINGS.OPEN_FROM_REQUIRED,
  CLOSE_BY_REQUIRED: STRINGS.CLOSE_BY_REQUIRED,
  BRANCH_MANAGER_REQUIRED: STRINGS.BRANCH_MANAGER_REQUIRED,
  CIRCUIT_NAME_REQUIRED: STRINGS.CIRCUIT_NAME_REQUIRED,
  PICK_DROP_TO_REQUIRED: STRINGS.PICK_DROP_TO_REQUIRED,
  VALUE_CANNOT_BE_ONLY_SPACES: STRINGS.VALUE_CANNOT_BE_ONLY_SPACES,
  START_DATE_REQUIRED: STRINGS.START_DATE_REQUIRED,
  END_DATE_REQUIRED: STRINGS.END_DATE_REQUIRED,
  START_TIME_REQUIRED: STRINGS.START_TIME_REQUIRED,
  ADMIN_NAME_REQUIRED: STRINGS.ADMIN_NAME_REQUIRED,
  EVENT_DESCRIPTION_REQUIRED: STRINGS.EVENT_DESCRIPTION_REQUIRED,
  TEST_INSTRUCTION_REQUIRED: STRINGS.TEST_INSTRUCTION_REQUIRED,
  USER_TYPE_REQUIRED: STRINGS.USER_TYPE_REQUIRED,
  QUESTION_TYPE_REQUIRED: STRINGS.QUESTION_TYPE_REQUIRED,
  ANSWER_TYPE_REQUIRED: STRINGS.ANSWER_TYPE_REQUIRED,
  QUESTION_TITLE_REQUIRED: STRINGS.QUESTION_TITLE_REQUIRED,
  END_DATE_MUST_BE_GREATER: STRINGS.END_DATE_MUST_BE_GREATER,
  INVALID_NAME: STRINGS.INVALID_NAME,
  CHECKIN_HOURS_REQUIRED: STRINGS.CHECKIN_HOURS_REQUIRED,
  NUMBER_REQUIRED: STRINGS.NUMBER_REQUIRED,
  NO_OF_QUESTION_REQUIRED: STRINGS.NO_OF_QUESTION_REQUIRED,
  QUESTION_CANNOT_BE_NEGATIVE: STRINGS.QUESTION_CANNOT_BE_NEGATIVE,
  TEST_TYPE_IS_REQUIRED: STRINGS.TEST_TYPE_IS_REQUIRED,
  INVALID_CAPTCHA: STRINGS.INVALID_CAPTCHA,
  PASSWORD_LENGTH_VALIDATION: STRINGS.PASSWORD_LENGTH_VALIDATION,
  COMPANY_NAME_REQUIRED: STRINGS.COMPANY_NAME_REQUIRED,
  SUBSCRIBE_REQUIRED: STRINGS.SUBSCRIBE_REQUIRED,
  PHONE_NUMBER_REQUIRED: STRINGS.PHONE_NUMBER_REQUIRED,
  PHONE_CODE_KEY_REQUIRED: STRINGS.PHONE_CODE_KEY_REQUIRED,
  VALUE_CANNOT_BE_EMPTY_SPACES: STRINGS.VALUE_CANNOT_BE_EMPTY_SPACES,
  PHONE_NUMBER_CHARACTER_LENGTH: STRINGS.PHONE_NUMBER_CHARACTER_LENGTH,
  NAME_VALIDATION: STRINGS.NAME_VALIDATION,
  SURNAME_INPUT: STRINGS.SURNAME_INPUT,
  CITY_NAME_VALIDATION: STRINGS.CITY_NAME_VALIDATION,
  SURNAME_VALIDATION: STRINGS.SURNAME_VALIDATION,
  PHONE_NO_VALIDATION: STRINGS.PHONE_NO_VALIDATION,
  PHONE_CODE_MISMATCH_WITH_COUNTRY: STRINGS.PHONE_CODE_MISMATCH_WITH_COUNTRY,
  INVALID_TIME: STRINGS.INVALID_TIME,
  INVALID_NUMBER_FOR_COUNTRY: STRINGS.INVALID_NUMBER_FOR_COUNTRY,
  PICK_UP_DROP_OFF_FROM_GREATER_THAN_OPENING_TIME: STRINGS.PICK_UP_DROP_OFF_FROM_GREATER_THAN_OPENING_TIME,
  PICK_UP_DROP_OFF_FROM_GREATER_THAN_PICK_UP_DROP_OFF_TO: STRINGS.PICK_UP_DROP_OFF_FROM_GREATER_THAN_PICK_UP_DROP_OFF_TO,
  PICK_UP_DROP_OFF_FROM_20MINT_GREATER_THAN_PICK_UP_DROP_OFF_TO: STRINGS.PICK_UP_DROP_OFF_FROM_20MINT_GREATER_THAN_PICK_UP_DROP_OFF_TO,
  OPENING_TIME_LESS_THAN_PICK_DROP_OFF: STRINGS.OPENING_TIME_LESS_THAN_PICK_DROP_OFF,
  PICK_DROP_TO_LESS_THAN_CLOSING_TIME: STRINGS.PICK_DROP_TO_LESS_THAN_CLOSING_TIME,
  PICK_DROP_1HOUR_GREATER_THAN_OPRNING: STRINGS.PICK_DROP_1HOUR_GREATER_THAN_OPRNING,
  PICK_DROP_TO_GREATER_THAN_PICK_DROP_FROML: STRINGS.PICK_DROP_TO_GREATER_THAN_PICK_DROP_FROM,
  PICK_UP_DROP_OFF_TO_20MINT_LESS_THAN_PICK_UP_DROP_OFF_FROM: STRINGS.PICK_UP_DROP_OFF_TO_20MINT_LESS_THAN_PICK_UP_DROP_OFF_FROM,
  CLOSING_TIME_GREATER_THAN_PICK_DROP_OFF_TO: STRINGS.CLOSING_TIME_GREATER_THAN_PICK_DROP_OFF_TO,
  CLOSING_TIME_LESS_THAN_PICK_DROP_OFF_FROM: STRINGS.CLOSING_TIME_LESS_THAN_PICK_DROP_OFF_FROM,
  CLOSING_TIME_MUST_GREATER_THAN_OPENING_TIME: STRINGS.CLOSING_TIME_MUST_GREATER_THAN_OPENING_TIME,
  CLOSING_TIME_1HOUR_GREATER_THAN_OPENING_TIME: STRINGS.CLOSING_TIME_1HOUR_GREATER_THAN_OPENING_TIME,
  EXCESS_REQUIRED: STRINGS.EXCESS_REQUIRED,
  BOND_REQUIRED: STRINGS.BOND_REQUIRED,
  DAILY_FEE_REQUIRED: STRINGS.DAILY_FEE_REQUIRED,
  RANGE_REQUIRED: STRINGS.RANGE_REQUIRED,
  VEHICLE_TYPE_REQUIRED: STRINGS.VEHICLE_TYPE_REQUIRED,
  RANGE_REQUIRED: STRINGS.RANGE_REQUIRED,
  VEHICLE_CATEGORY_REQUIRED: STRINGS.VEHICLE_CATEGORY_REQUIRED,
  VEHICLE_NAME_REQUIRED: STRINGS.VEHICLE_NAME_REQUIRED,
  VEHICLE_CODE_REQUIRED: STRINGS.VEHICLE_CODE_REQUIRED,
  DOORS_REQUIRED: STRINGS.DOORS_REQUIRED,
  VEHICLE_DESCRIPTION_REQUIRED: STRINGS.VEHICLE_DESCRIPTION_REQUIRED,
  FUEL_TYPE_REQUIRED: STRINGS.FUEL_TYPE_REQUIRED,
  VEHICLE_TRANSMISSION_REQUIRED: STRINGS.VEHICLE_TRANSMISSION_REQUIRED,
  ADULTS_SEAT_REQUIRED: STRINGS.ADULTS_SEAT_REQUIRED,
  CHILDS_SEAT_REQUIRED: STRINGS.CHILDS_SEAT_REQUIRED,
  LARGE_LUGGAGE_REQUIRED: STRINGS.LARGE_LUGGAGE_REQUIRED,
  SMALL_LUGGAGE_REQUIRED: STRINGS.SMALL_LUGGAGE_REQUIRED,
  AIR_CONDITION_REQUIRED: STRINGS.AIR_CONDITION_REQUIRED,
  UPLOAD_AT_LEAST_REQUIRED: STRINGS.UPLOAD_AT_LEAST_REQUIRED,
  CATEGORY_NAME_REQUIRED: STRINGS.CATEGORY_NAME_REQUIRED,
  CATEGORY_DESCRIPTION_REQUIRED: STRINGS.CATEGORY_DESCRIPTION_REQUIRED,
  START_RANGE_REQUIRED: STRINGS.START_RANGE_REQUIRED,
  VALID_RANGE_REQUIRED: STRINGS.VALID_RANGE_REQUIRED,
  MAX_YEAR_VALDITION: STRINGS.MAX_YEAR_VALDITION,
  EXCEEDING_MAX_RANGE: STRINGS.EXCEEDING_MAX_RANGE,
  END_RANGE_REQUIRED: STRINGS.END_RANGE_REQUIRED,
  MAX_VALUE_25: STRINGS.MAX_VALUE_25,
  MAX_VALUE_5: STRINGS.MAX_VALUE_5,
  MIN_VALUE_2: STRINGS.MIN_VALUE_2,
  DRIVER_AGE_REQUIRED: STRINGS.DRIVER_AGE_REQUIRED,
  ESTIMATED_DISTANCE_REQUIRED: STRINGS.ESTIMATED_DISTANCE_REQUIRED,
  ESTIMATED_DISTANCE_GREATER_THAN_0: STRINGS.ESTIMATED_DISTANCE_GREATER_THAN_0,
  DRIVER_AGE_GREATER_THAN_15: STRINGS.DRIVER_AGE_GREATER_THAN_15,
  DRIVER_AGE_LESS_THAN_100: STRINGS.DRIVER_AGE_LESS_THAN_100,
  VEHICLE_REQUIRED: STRINGS.VEHICLE_REQUIRED,
  QUANTITY_REQUIRED: STRINGS.QUANTITY_REQUIRED,
  MIN_VALUE_1: STRINGS.MIN_VALUE_1,
  PICK_UP_LOCATION_REQUIRED: STRINGS.PICK_UP_LOCATION_REQUIRED,
  PICK_UP_DATE_REQUIRED: STRINGS.PICK_UP_DATE_REQUIRED,
  PICK_UP_TIME_REQUIRED: STRINGS.PICK_UP_TIME_REQUIRED,
  DROP_OFF_REQUIRED: STRINGS.DROP_OFF_REQUIRED,
  DROP_OFF_DATE_REQUIRED: STRINGS.DROP_OFF_DATE_REQUIRED,
  DROP_OFF_TIME_REQUIRED: STRINGS.DROP_OFF_TIME_REQUIRED,
  INSURANCE_REQUIRED: STRINGS.INSURANCE_REQUIRED,
  INSURANCE_CHECKBOX_REQUIRED: STRINGS.INSURANCE_CHECKBOX_REQUIRED,
  FERRY_REQUIRED: STRINGS.FERRY_REQUIRED,
  PRICE_REQUIRED: STRINGS.PRICE_REQUIRED,
  FREQUENCY_REQUIRED: STRINGS.FREQUENCY_REQUIRED,
  LIST_NAME_REQUIRED: STRINGS.LIST_NAME_REQUIRED,
  FERRY_CHECKBOX_REQUIRED: STRINGS.FERRY_CHECKBOX_REQUIRED,
  FUEL_REQUIRED: STRINGS.FUEL_REQUIRED,
  FUEL_CHECKBOX_REQUIRED: STRINGS.FUEL_CHECKBOX_REQUIRED,
  DETAILS_REQUIRED: STRINGS.DETAILS_REQUIRED,
  EXPENSES_CHECKBOX_REQUIRED: STRINGS.EXPENSES_CHECKBOX_REQUIRED,
  FREE_DAYS_REQUIRED: STRINGS.FREE_DAYS_REQUIRED,
  FREE_DAYS_LESS_THAN_46: STRINGS.FREE_DAYS_LESS_THAN_46,
  EXTRA_PAID_DAYS_REQUIRED: STRINGS.EXTRA_PAID_DAYS_REQUIRED,
  RATE_PER_DAY_REQUIRED: STRINGS.RATE_PER_DAY_REQUIRED,
  TEMPLATE_REQUIRED: STRINGS.TEMPLATE_REQUIRED,
  TEMPLATE_DESCRIPTION_REQUIRED: STRINGS.TEMPLATE_DESCRIPTION_REQUIRED,
  LIST_CONDITION_REQUIRED: STRINGS.LIST_CONDITION_REQUIRED,
  COMPANY_NAME_REQUIRED: STRINGS.COMPANY_NAME_REQUIRED,
  ENTER_PHONE_NUMBER_REQUIRED: STRINGS.ENTER_PHONE_NUMBER_REQUIRED,
  ENTER_EMAIL_REQUIRED: STRINGS.ENTER_EMAIL_REQUIRED,
  ENTER_ADDRESS_REQUIRED: STRINGS.ENTER_ADDRESS_REQUIRED,
  ENETR_CITY_REQUIRED: STRINGS.ENETR_CITY_REQUIRED,
  ENTER_PHONE_CODE_REQUIRED: STRINGS.ENTER_PHONE_CODE_REQUIRED,
  ENTER_COUNTRY_REQUIRED: STRINGS.ENTER_COUNTRY_REQUIRED,
  ENTER_BRANCH_NAME_REQUIRED: STRINGS.ENTER_BRANCH_NAME_REQUIRED,
  ENTER_POSTCODE_REQUIRED: STRINGS.ENTER_POSTCODE_REQUIRED,
  ENTER_CODE_REQUIRED: STRINGS.ENTER_CODE_REQUIRED,
  PICK_UP_DROP_OFF_GREATER_THAN_OPENING_TIME: STRINGS.PICK_UP_DROP_OFF_GREATER_THAN_OPENING_TIME,
  ENTER_SUBURB_REQUIRED: STRINGS.ENTER_SUBURB_REQUIRED,
  ENTER_VEHICLE_TYPE_REQUIRED: STRINGS.ENTER_VEHICLE_TYPE_REQUIRED,
  ENTER_VEHICLE_NAME_REQUIRED: STRINGS.ENTER_VEHICLE_NAME_REQUIRED,
  ENTER_VEHICLE_DESCRIPTION_REQUIRED: STRINGS.ENTER_VEHICLE_DESCRIPTION_REQUIRED,
  ENTER_VEHICLE_CODE_REQUIRED: STRINGS.ENTER_VEHICLE_CODE_REQUIRED,
  ENTER_CHILD_SEATS_REQUIRED: STRINGS.ENTER_CHILD_SEATS_REQUIRED,
  ENTER_SMALL_LUGGAGE_REQUIRED: STRINGS.ENTER_SMALL_LUGGAGE_REQUIRED,
  MAX_UPTO_25: STRINGS.MAX_UPTO_25,
  ENTER_ADULTS_SEATS_REQUIRED: STRINGS.ENTER_ADULTS_SEATS_REQUIRED,
  ENTER_LARGE_LUGGAGE_REQUIRED: STRINGS.ENTER_LARGE_LUGGAGE_REQUIRED,
  ENTER_TRANSMISSION_TYPE: STRINGS.ENTER_TRANSMISSION_TYPE,
  ENTER_FUEL_TYPE_REQUIRED: STRINGS.ENTER_FUEL_TYPE_REQUIRED,
  ENTER_VEHICLE_CATEGORY_REQUIRED: STRINGS.ENTER_VEHICLE_CATEGORY_REQUIRED,
  ENTER_AIR_CON_REQUIRED: STRINGS.ENTER_AIR_CON_REQUIRED,
  MAX_UPTO_5: STRINGS.MAX_UPTO_5,
  MIN_MUST_2: STRINGS.MIN_MUST_2,
  ENTER_DOORS_REQUIRED: STRINGS.ENTER_DOORS_REQUIRED,
  ENTER_VEHICLE_RANGE_REQUIRED: STRINGS.ENTER_VEHICLE_RANGE_REQUIRED,
  VALID_VEHICLE_RANGE_VALIDATION: STRINGS.VALID_VEHICLE_RANGE_VALIDATION,
  MIN_YEAR_MUST_1980: STRINGS.MIN_YEAR_MUST_1980,
  MAX_EXCEED_VALIDATION: STRINGS.MAX_EXCEED_VALIDATION,
  ENTER_FUEL_TYPE_REQUIRED: STRINGS.ENTER_FUEL_TYPE_REQUIRED,
  REFERENCE_LENGTH_MUST_BE_LESS_THAN_13: STRINGS.REFERENCE_LENGTH_MUST_BE_LESS_THAN_13
};

export const MESSAGES = {
  noRecordsFound: STRINGS.NO_RECORDS_FOUND,
};

export const ALT_TEXTS = {
  companyLogo: "company-logo-image",
  topShapeImage: "top-shape-image",
  bottomShapeImage: "bottom-shape-image",
  badgeImage: "badge image",
  backArrow: "back-arrow",
  calender: "calender",
  loader: "loader"
};
export const BOOKING_STATUS = {
  AVAILABLE: 1,
  PENDING: 6,
  BOOKED: 2,
  COMPLETE: 3,
  EXPIRE: 8,
  CANCELLED_BY_DRIVER: 4,
  CANCELLED_BY_AGENCY: 5,
  NO_SHOW: 7,
}

export const DASHBOARD_LISTING_TABLE = [
  { elementName: STRINGS.PUBLISHED_LISTING, class: "box-blue", statusCode: BOOKING_STATUS.AVAILABLE, elementLabel: "Available" },
  { elementName: STRINGS.PENDING_REQUESTS, class: "box-orange", statusCode: BOOKING_STATUS.PENDING, elementLabel: "Requested" },
  { elementName: STRINGS.CANCELLATIONS, class: 'box-red', statusCode: BOOKING_STATUS.CANCELLED_BY_AGENCY, elementLabel: "Cancelled" },
  { elementName: STRINGS.LISTING_IMPRESSIONS, class: 'box-green', statusCode: BOOKING_STATUS.CANCELLED_BY_DRIVER, elementLabel: "Cancelled" },
  { elementName: STRINGS.CANCEL, class: 'box-green', statusCode: BOOKING_STATUS.COMPLETE, elementLabel: "Completed" },
  { elementName: STRINGS.BOOK, class: 'box-green', statusCode: BOOKING_STATUS.BOOKED, elementLabel: "Booked" },
  { elementName: STRINGS.NO_SHOW, class: 'box-green', statusCode: BOOKING_STATUS.NO_SHOW, elementLabel: "No Show" },
  { elementName: STRINGS.EXPIRE, class: 'box-green', statusCode: BOOKING_STATUS.EXPIRE, elementLabel: "Expired" },
]
export const DASHBOARD_LISTING = [
  { elementName: STRINGS.PUBLISHED_LISTING, class: "box-blue", statusCode: BOOKING_STATUS.AVAILABLE, elementLabel: "Available" },
  { elementName: STRINGS.PENDING_REQUESTS, class: "box-orange", statusCode: BOOKING_STATUS.PENDING, elementLabel: "Requested" },
  { elementName: STRINGS.CANCELLATIONS, class: 'box-red', statusCode: BOOKING_STATUS.CANCELLED_BY_AGENCY, elementLabel: "Cancelled" },
  // { elementName: STRINGS.LISTING_IMPRESSIONS, class: 'box-green', statusCode: BOOKING_STATUS.CANCELLED_BY_DRIVER, elementLabel: "Cancelled" },

]

export const ELEMENT_ID = {
  welcomeText: 'welcome-text',
  loginPage: 'login-page',
  loginButton: 'login-button',
  submitButton: 'submit-button',
  challengePage: 'challenge-page',
  challengesDiv: 'challenges-div',
  challengeButton: 'challenge-button',
  redirectingLink: 'redirecting-link',
  profilePage: 'profile-page',
  leaderboardPage: 'leaderboard-page',
  inputWebUrl: 'input-website-url',
  emailInput: 'email-input',
  passwordInput: 'password-input',
  challengeDetailPage: 'challenge-detail-page',
  challengeDetailDiv: 'challenge-detail-div',
  dropInput: 'drop-input',
  customInput: 'custom-input',
  default: 'default',
  name: 'name',
  email: 'email',
  date: 'date',
  role: 'role',
  action: 'action',
  status: 'status',
  active: 'active',
  createTestAction: 'createTestAction',
  endDate: 'endDate',
  startDate: 'startDate',
  championship: 'championship',
  attempt: 'totalAttempts',
  percentage: 'latestScore',
  time: 'time',
  dateTime: 'dateTime',
  questionTitle: 'question',
  questionType: 'questionType',
  testType: 'testType',
  noOfQuestions: 'noOfQuestion',
  access: 'access',
  championshipName: 'championship-name',
  ambassadorAccess: "ambassadorAccess",
  userTypeName: 'user-type-name',
  status: 'status',
  vehicle: 'vehicle',
  quantity: 'quantity',
  pickUpLocation: 'pickupLocation',
  pickUpDate: "pickupDate",
  dropOffLocation: 'dropoffLocation',
  dropOffDate: "dropoffDate",
  listingData: "listingData",
  lastUpdated: 'lastUpdated',
  operator: "operator",
  reference: 'reference',
  driverName: "driverName",
  id: "id",
  bookingId: "bookingId",
  starRating: "starRating",
  comment: "comments",
  rego: 'rego',
  favorite: "Favorite",
  createdAt: 'createdAt',
  accept: 'accept',
  driverDetails: 'driverDetails'
};

export const STATUS_CODE = {
  successful: 200,
  unAuthorized: 401
};



export const DRIVER_ACTION_MENU = [
  {
    name: 'Cancelled by driver',
    status: "Cancel"
  }
]

export const ACTION_MENU = [
  {
    name: 'Available and live',
    status: 'Available',
  },
  {
    name: "Requested",
    status: 'Request'
  },
  {
    name: 'Booked',
    status: "Booked"
  },
  {
    name: "Completed",
    status: 'Complete'
  },
  {
    name: "Expired",
    status: "Expired"
  },
  {
    name: 'Cancelled by driver',
    status: "CancelByDriver"
  },
  {
    name: "Cancelled by us",
    status: "CancelByAgency"
  },
  {
    name: 'No show',
    status: 'No show'
  }
]
export const FREQUENCY = [
  { label: 'per day' },
  { label: 'per hire' }
];


export const DRIVER_DRAWER_ITEMS = [
  {
    label: "My Profile",
    routeUrl: ROUTES.DRIVER_PROFILE,
  },
  {
    label: "Trips",
    routeUrl: ROUTES.DRIVER_TRIPS,
  },
  {
    label: "Ratings",
    routeUrl: ROUTES.DRIVER_RATINGS,
  },
  {
    label: "Logout",
    routeUrl: 'logout',
  },
]

const upcomingTrips = [
  "Agency",
  "Vehicle",
  "Pick-up Location",
  "Pick-up Date",
  "Drop-off Location",
  "Drop-off Date",
  "Reference",
  "ID"
]

export const DRIVER_TRIPS = {
  upcomingTrips: ['Status', ...upcomingTrips, "Action"],
  pastTrips: [
    ...upcomingTrips,
    'RatedOn',
    "Rated",
    "Agency Rate"
  ],
  cancelledTrips: ['Status', "Vehicle", "Agency Name", "Pick-up Location", "Start Date", "Drop-off Location", "End Date", 'Rego', 'ID']
}

export const DRIVER_RATINGS = ["Agency", "Vehicle", "Rego", "Pick-up Location", "Pick-up date", "Drop-off Location", "Drop-off Date", "ID", "Star Rating", "Comments"]

export const AGENCY_DRAWER_ITEMS_ACCOUNT_SETTING = [
  {
    label: "Dashboard",
    routeUrl: ROUTES.DASHBOARD,
  },
  {
    label: "Driver rating",
    routeUrl: ROUTES.DRIVER_RATING,
  },
  {
    label: "Company Details",
    routeUrl: ROUTES.COMPANY_DETAILS,
  },
  {
    label: "Branches",
    routeUrl: ROUTES.BRANCH,
  },
  {
    label: "Vehicles",
    routeUrl: ROUTES.VEHICLE,
  },
  {
    label: "Insurance",
    routeUrl: ROUTES.INSURANCE,
  },
  {
    label: "Email Options",
    routeUrl: ROUTES.EMAIL_OPTIONS,
  },

  {
    label: "Contact",
    routeUrl: ROUTES.CONTACT,
  },
  // {
  //   label: "Billing",
  //   routeUrl: ROUTES.BILLING,
  // },
  {
    label: "Statements",
    routeUrl: ROUTES.STATEMENT,
  },
  {
    label: "Ratings",
    routeUrl: ROUTES.RATINGS,
  },
]

export const DISCOUNT_TYPE = {
  PERCENTAGE: 1,
  FLAT: 2
}

export const MEMBER_DRAWER_ITEMS_ACCOUNT_SETTING = [
  {
    label: "Dashboard",
    routeUrl: ROUTES.DASHBOARD,
  },
  {
    label: "Driver rating",
    routeUrl: ROUTES.DRIVER_RATING,
  }
]

export const ACTIVE_PAGE_STYLE = {
  backgroundColor: "white",
  color: "#18191f",
  borderColor: "#18191f",
  fontWeight: "500"
};

export const LAYOUTS = {

  userTypes: [
    {
      id: ELEMENT_ID.userTypeName,
      label: LABELS.name,
      minWidth: 5,
      align: 'left',
    },
    {
      id: ELEMENT_ID.action,
      label: LABELS.action,
      minWidth: 5,
      align: 'left',
    },
  ],

  dashboardTable: [
    {
      id: ELEMENT_ID.status,
      label: LABELS.status,
    },
    {
      id: ELEMENT_ID.vehicle,
      label: LABELS.vehicle,
    },
    {
      id: ELEMENT_ID.quantity,
      label: LABELS.quantity,
    },
    {
      id: ELEMENT_ID.driverDetails,
      label: LABELS.driverDetails,
    },
    {
      id: ELEMENT_ID.pickUpLocation,
      label: LABELS.pickUpLocation,
    },
    {
      id: ELEMENT_ID.pickUpDate,
      label: LABELS.pickUpDate,
    },
    {
      id: ELEMENT_ID.dropOffLocation,
      label: LABELS.dropOffLocation,
    },
    {
      id: ELEMENT_ID.dropOffDate,
      label: LABELS.dropOffDate,
    },
    {
      id: ELEMENT_ID.listingData,
      label: LABELS.listingDate,
    },
    {
      id: ELEMENT_ID.lastUpdated,
      label: LABELS.lastUpdated,
    },
    {
      id: ELEMENT_ID.operator,
      label: LABELS.operator,
    },
    {
      id: ELEMENT_ID.reference,
      label: LABELS.reference,
    },
    {
      id: ELEMENT_ID.id,
      label: LABELS.id,
    },
    {
      id: ELEMENT_ID.action,
      label: LABELS.action,
    }
  ],
  driverRatedTable: [
    {
      id: ELEMENT_ID.driverName,
      label: LABELS.driverName,
      class: 'cursor'
    },
    {
      id: ELEMENT_ID.vehicle,
      label: LABELS.vehicle,
      class: 'cursor'

    },
    {
      id: ELEMENT_ID.rego,
      label: LABELS.rego,
      class: 'cursor'

    },
    {
      id: ELEMENT_ID.pickUpLocation,
      label: LABELS.pickUpLocation,
      class: 'cursor'

    },
    {
      id: ELEMENT_ID.pickUpDate,
      label: LABELS.pickUpDate,
      class: 'cursor'

    },
    {
      id: ELEMENT_ID.dropOffLocation,
      label: LABELS.dropOffLocation,
      class: 'cursor'

    },
    {
      id: ELEMENT_ID.dropOffDate,
      label: LABELS.dropOffDate,
      class: 'cursor'

    },
    {
      id: ELEMENT_ID.lastUpdated,
      label: LABELS.lastUpdated,
      class: 'cursor'

    },
    {
      id: ELEMENT_ID.bookingId,
      label: LABELS.bookingId,

    },
    {
      id: ELEMENT_ID.favorite,
      label: LABELS.favorite
    },
    {
      id: ELEMENT_ID.starRating,
      label: LABELS.starRating,
      class: 'cursor'
    },
    {
      id: ELEMENT_ID.comment,
      label: LABELS.comments
    },
  ],
  driverYettoRate: [
    {
      id: ELEMENT_ID.driverName,
      label: LABELS.driverName,
      class: 'cursor'
    },
    {
      id: ELEMENT_ID.vehicle,
      label: LABELS.vehicle,
      class: 'cursor'
    },
    {
      id: ELEMENT_ID.rego,
      label: LABELS.rego,
      class: 'cursor'
    },
    {
      id: ELEMENT_ID.pickUpLocation,
      label: LABELS.pickUpLocation,
      class: 'cursor'
    },
    {
      id: ELEMENT_ID.pickUpDate,
      label: LABELS.pickUpDate,
      class: 'cursor'
    },
    {
      id: ELEMENT_ID.dropOffLocation,
      label: LABELS.dropOffLocation,
      class: 'cursor'
    },
    {
      id: ELEMENT_ID.dropOffDate,
      label: LABELS.dropOffDate,
      class: 'cursor'
    },
    {
      id: ELEMENT_ID.bookingId,
      label: LABELS.bookingId,
    },
    {
      id: ELEMENT_ID.favorite,
      label: LABELS.favorite
    }
  ],

  agencyRatingTable: [
    {
      id: ELEMENT_ID.driverName,
      label: LABELS.driverName,
      class: 'cursor'
    },
    {
      id: ELEMENT_ID.vehicle,
      label: LABELS.vehicle,
      class: 'cursor'
    },
    {
      id: ELEMENT_ID.rego,
      label: LABELS.rego,
      class: 'cursor'
    },
    {
      id: ELEMENT_ID.pickUpLocation,
      label: LABELS.pickUpLocation,
      class: 'cursor'
    },
    {
      id: ELEMENT_ID.pickUpDate,
      label: LABELS.pickUpDate,
      class: 'cursor'
    },
    {
      id: ELEMENT_ID.dropOffLocation,
      label: LABELS.dropOffLocation,
      class: 'cursor'
    },
    {
      id: ELEMENT_ID.dropOffDate,
      label: LABELS.dropOffDate,
      class: 'cursor'
    },
    {
      id: ELEMENT_ID.bookingId,
      label: LABELS.bookingId,
    },
    {
      id: ELEMENT_ID.starRating,
      label: LABELS.starRating,
      class: 'cursor'
    },
    {
      id: ELEMENT_ID.accept,
      label: LABELS.accept
    }
  ],

  dashboardDataView: [
    {
      id: ELEMENT_ID.vehicle,
      label: LABELS.vehicle,
    },
    {
      id: ELEMENT_ID.pickUpLocation,
      label: LABELS.pickUpLocation,
    },
    {
      id: ELEMENT_ID.dropOffLocation,
      label: LABELS.dropOffLocation,
    },
    {
      id: ELEMENT_ID.pickUpDate,
      label: LABELS.pickUpDate,
    },
    {
      id: ELEMENT_ID.dropOffDate,
      label: LABELS.dropOffDate,
    },
    {
      id: ELEMENT_ID.lastUpdated,
      label: LABELS.lastUpdated
    }
  ]
};



export const LIMITS = {
  limitPerPage: 5,
  extendedLimitPerPage: 10
};



export const USER_ROLES = {
  DRIVER: 1,
  AGENCY: 2,
  MEMBER: 3
};

export const LOGIN_TYPES = {
  NORMAL: 1,
  FACEBOOK: 2,
  GOOGLE: 3
}


export const DATE_FORMAT = 'DD/MM/YYYY'

export const FREQUECY = [
  { value: 1, label: 'Per Day' },
  { value: 2, label: 'Per Hire' }
]


export const USER_TABS = [
  { label: 'Driver' },
  { label: "Agency" }
];

export const TAB_VALUES = {
  driverTab: 0,
  agencyTab: 1
};

export const DRIVER_RATING_STATUS = {
  accepted: 1,
  rejected: 2
}
