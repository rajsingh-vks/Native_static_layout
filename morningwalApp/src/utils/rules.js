export default rules = {
  saveAddress:{
    name: ['required', 'string'],
    locality: ['required', 'string'],
    landmark: ['optional'],
    area: ['required', 'string'],
    city: ['required', 'string'],
    pin_code: ['required', 'numeric'],
    state_id: ['required', 'integer'],
    mobile: ['required', 'numeric'],
    alternate_phone: ['optional', 'numeric'],
    address_type: ['required', 'string'],
  },
  saveAddErrMsg:{
    pin_code: 'Please enter a valid pincode.',
    mobile: 'Please enter a valid phone number.',
    alternate_phone: 'Please enter a valid phone number.',
  },
  saveProfile:{
    first_name: ['required', 'string'],
    last_name: ['required', 'string'],
    email: ['required', 'string'],
    // phone: ['required', 'numeric'],
    alternate_phone: ['required', 'numeric'],
    gender: ['required', 'string'],
  },
  saveProfileMsg:{
    first_name: 'Please enter your first name.',
    last_name: 'Please enter your last name.',
    email: 'Please enter your email.',
    // phone: 'Please enter a valid phone number.',
    alternate_phone: 'Please enter a valid phone number.',
  },
};
