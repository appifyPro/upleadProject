export const s: Partial<{
  info: {
    title: string;
    roomType: string;
    accommodationType: string;
    location1: string;
    location2: string;
    availability: string;
    facilities: string[];
    about: string;

    _id?: string | number;
    __v?: string;
    image?: string | string[];
  };
  roomId?: string;
}> = {
  info: {
    title: "",
    roomType: "",
    accommodationType: "",
    availability: "",
    location1: "",
    location2: "",
    facilities: [],

    about: "",
    _id: "",
    __v: "",
  },
};

type Info = {
  title: string;
  roomType: string;
  accommodationType: string;
  location1: string;
  location2: string;
  facilities: string[];
  availability: string;
  about: string;

  _id?: string | number;
  __v?: string;
  image?: string | string[];
  roomId?: string;
};

type Program = {
  name: string;
  programType: string;
  duration: string;
  degreeType: string;
  startDate: string;
  classType: string;
  about: string;
  currency: string;
  tuitionFee: string;
  admissionSemester: string;
  language: string;
  otherFee: string;
  requiredDocuments: string[];
  needBasedScholarships: boolean;
  meritBasedScholarships: boolean;
  OnCampus: boolean;
  OffCampus: boolean;
};

type Tuition = {
  tuitionFee: string;
  otherFee: string;
  otherInformation: string;
  currency: string;
};

type AdmissionRequirement = {
  requiredDocuments: string[];
  financialAid: string[];
  accomodationOptions: string[];
};

type Other = {
  availableInternshipOpportunities: string;
  formOfAssement: string;
  availableInternationalStudentSupport: string;
  availableStudentArrivalSupport: string;
  academicRequirements: string[];
  requiredDocuments: string[];
};

type RoomInformationInitialState = {
  info: Info | undefined;
  program: Program | undefined;
  tuition?: Tuition;
  admissionRequirement?: AdmissionRequirement;
  other?: Other;
  schoolId?: string;
};

export const roomInformationInitialState: RoomInformationInitialState = {
  info: {
    title: "",
    roomType: "",
    accommodationType: "",
    availability: "",
    location1: "",
    location2: "",
    facilities: [],
    about: "",
  },
  program: {
    name: "",
    programType: "",
    duration: "",
    degreeType: "",
    startDate: "",
    classType: "",
    about: "",
    admissionSemester: "",
    language: "",
    currency: "USD",
    tuitionFee: "",
    otherFee: "",
    requiredDocuments: ["", "", "", ""],
    needBasedScholarships: false,
    meritBasedScholarships: false,
    OnCampus: false,
    OffCampus: false,
  },
  tuition: {
    tuitionFee: "",
    otherFee: "",
    otherInformation: "",
    currency: "USD",

    // tuitionFee: 0,
    // avgAccomodationCost: 0,
    // avgFeedingCost: 0,
    // avgTransportationCost: 0,
    // avgLivingCost: 0,
    // currency: "USD",
    // other: "",
  },
  admissionRequirement: {
    requiredDocuments: ["", "", "", ""],
    financialAid: ["", "", "", ""],
    accomodationOptions: ["", "", "", ""],
  },
  other: {
    availableInternshipOpportunities: "true",
    formOfAssement: "Physical",
    availableInternationalStudentSupport: "true",
    availableStudentArrivalSupport: "true",
    academicRequirements: ["", "", "", ""],
    requiredDocuments: ["", "", "", ""],
  },
  schoolId: "",
};
