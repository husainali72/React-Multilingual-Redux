import { shape, number, string, oneOf, bool, oneOfType, arrayOf, object } from 'prop-types';

const basicProfile = {
  id: number,
  name: string,
  email: string,
  roles: arrayOf(number),
  profile_pic: string,
  gender: oneOf(['', 'male', 'female']),
  about_me: string,
  phone: string,
  verified_email: number,
  verified_phone: number,
  DOB: string,
  city: string,
  zipcode: number,
  country_id: number,
  school_id: number,
};

export const userType = shape({
  ...basicProfile,
  score: oneOfType([number, string]),
  rank: number,
  grade: oneOfType([number, string]),
  is_new_user: bool,
  school_name: string,
  city_id: number,
  class: number,
  company_id: number,
  is_takaful: bool,
  referral_code: string,
  region_id: number,
  school: shape({
    area: string,
    category: string,
    city: string,
    country_id: number,
    id: number,
    logo_url: string,
    name: string,
    section: oneOf(['boys', 'girls', 'coed']),
    specialisation: string,
    stage: string,
    type: string,
  }),
  state: string,
  street: string,
});

export const elasticType = shape({
  email: string,
  gender: string,
  grade_id: number,
  grade_name: string,
  school_id: number,
  school_name: string,
  semester_id: number,
  semester_name: string,
  user_id: number,
  name: string,
});
export const elasticProfileType = arrayOf(elasticType);

export const teacherType = shape({
  ...basicProfile,
  rating: oneOfType([number, string]),
});

export const playerType = shape({
  id: number,
  name: string,
  email: string,
  profile_pic: string,
  score: oneOfType([number, string]),
  rank: number,
  likes: oneOfType([number, string]),
});

export const schoolType = shape({
  id: number,
  name: string,
  city: string,
  area: string,
  category: string,
  type: string,
  country_id: number,
  section: string,
  specialisation: string,
  stage: oneOfType([number, string]),
  logo_url: string,
  is_review: number,
});

export const schoolListType = arrayOf(schoolType);

export const playerListType = arrayOf(playerType);

export const teacherListType = arrayOf(teacherType);

export const classType = shape({
  id: number,
  title: string,
  description: string,
  student_id: number,
  class_type: string,
  rating: number,
  reason: string,
  state: string,
  teacher_id: number,
  teacher_rating: number,
  coins: number,
  credits: number,
  start_time: string,
  teacher_arrival_time: string,
  end_time: string,
  resource_type: string,
  resource_id: number,
  folder_id: number,
  product_id: number,
  tokbox_session_id: string,
  grade: number,
  share_url: string,
  tokbox_token: string,
  tokbox_api: string,
  group_tutoring_id: number,
  roles_allowed: arrayOf(number),
  min_requirement_type: string,
  min_requirement_value: number,
  prize_one_name: string,
  prize_one_image_uri: string,
  prize_two_name: string,
  prize_two_image_uri: string,
  prize_three_name: string,
  prize_three_image_uri: string,
  score: number,
  likes: number,
  waiting_time: number,
  students_required: number,
});

export const translationType = shape({
  value: oneOfType([string, number]),
});

export const addonType = shape({
  type: string,
  description: string,
});
export const addonListType = arrayOf(addonType);

export const productType = shape({
  id: number,
  hierarchy_level: number,
  name: string,
  slug: string,
  image_uri: string,
  background_image_uri: string,
  negative_image_uri: string,
  image_thumbnail_uri: string,
  color_start: string,
  color_end: string,
  ondemand_tutoring: bool,
  private_tutoring: bool,
  mocktest: string,
});
export const productListType = arrayOf(productType);

export const packageType = shape({
  id: number,
  name: string,
  description: string,
  slug: string,
  addons: addonListType,
  products: arrayOf(
    shape({
      id: number,
      name: string,
      slug: string,
      price: number,
      expiry: string,
      all_products: number,
      expiry_type: string,
      discount: number,
      discount_type: string,
    }),
  ),
});
export const packageListType = arrayOf(packageType);

export const matchType = shape({
  params: shape({
    id: string,
  }),
});

export const bankType = shape({
  id: number,
  name: string,
  slug: string,
  IBAN: string,
  account_holder_name: string,
  account_no: string,
});
export const bankListType = arrayOf(bankType);

export const createClassType = shape({
  folder_id: number,
  resource_id: number,
  title: string,
  description: string,
  class_type: oneOf(['group', 'competition', 'private']),
  grade: oneOfType([string, number]),
  no_of_questions: number,
  device: string,
  difficulty: number,
  preferred_teacher_gender: string,
  preferred_teacher_id: number,
  product_id: number,
  resource_type: string,
  user_id: number,
});

export const errorType = shape();

export const paginationType = shape({
  count: number,
  offset: number,
  list: arrayOf(object),
});
