import bcrypt from 'bcryptjs';

const students = [
  {
    fullNameEn: 'John Doe',
    fullNameAr: 'جون دو',
    nid: '29501012000123',
    birthday: '1995-01-01',
    gender: 'male',
    militaryStatus: 'exempted',
    photo: '/uploads/default.jpg',
    degree: 'BSc in electric engineering',
    gradYear: '2017',
    address: 'Giza, Cairo',
    phoneNumber: '01012345678',
    department: 'CS'
  },
  {
    fullNameEn: 'Jane Doe',
    fullNameAr: 'جين دو',
    nid: '29501012000124',
    birthday: '1995-01-01',
    gender: 'female',
    militaryStatus: 'NA',
    photo: '/uploads/default.jpg',
    degree: 'BA in English literature',
    gradYear: '2017',
    address: 'Giza, Cairo',
    phoneNumber: '01212345678',
    department: 'CS'
  }
];

export default students;
