import { GET_EMOJI, GET_OURTEAM_MEMBER, GET_ACTIVE_JOBS, UPLOAD_FILE } from '../constants';

const initialState = {
  emojis: {},
  ourTeamMember: [],
  activeJobs: [],
  uploadImageUrls: {},
  error: {},
};

export default function file(state = initialState, action) {
  if (action.type.indexOf('_REQUEST') !== -1) {
    return {
      ...state,
      error: {},
    };
  }
  switch (action.type) {
    case UPLOAD_FILE.SUCCESS:
      return {
        ...state,
        uploadImageUrls: action.payload,
      };
    case UPLOAD_FILE.FAILURE:
      return {
        ...state,
        error: { uploadImageUrls: action.payload },
      };
    case GET_EMOJI.SUCCESS:
      return {
        ...state,
        emojis: action.payload,
      };
    case GET_EMOJI.FAILURE:
      return {
        ...state,
        error: { emojis: action.payload },
      };
    case GET_OURTEAM_MEMBER.SUCCESS:
      return {
        ...state,
        ourTeamMember: action.payload,
      };

    case GET_OURTEAM_MEMBER.FAILURE:
      return {
        ...state,
        ourTeamMember: [],
        errorMessage: { ourTeamMember: action.payload },
      };

    case GET_ACTIVE_JOBS.SUCCESS:
      return {
        ...state,
        activeJobs: action.payload,
      };

    case GET_ACTIVE_JOBS.FAILURE:
      return {
        ...state,
        activeJobs: [],
        errorMessage: { activeJobs: action.payload },
      };

    default:
      return state;
  }
}
