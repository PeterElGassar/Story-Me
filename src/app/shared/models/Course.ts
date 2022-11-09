export interface ICourse {

  date: string;
  description: string;
  id: 0;
  // img: string;
  img_path: string;
  instructors_id: number;
  name: string;
  price_after_discount: number;
  price_before_discount: number;
  sections_courses_id: number;
  instructor_first_name: string;
  instructor_second_name: string;
  instructor_last_name: string;
  instructor_img: string;
  nameSection: string;
  created_at:string;
  is_aproved:number;
}



export interface ICourseForBasket {
  description: string;
  id: 0;
  img_path: string;
  instructors_id: number;
  name: string;
  price_after_discount: number;
  price_before_discount: number;
  sections_courses_id: number;
  instructor_first_name: string;
  instructor_second_name: string;
  instructor_last_name: string;
  instructor_img: string;
  nameSection: string;
  created_at:string;
}




// {
//   "id": "122333",
//     "basketItems": [
//         2,3 
//     ],
//      "diplomaItems": [
//         1 
//     ]

// }

export interface basketShapToSend {
  id: string;
  basketItems: [];
  diplomaItems: [];
}



// {
//     id: 2,
//         name: "jkgdvhvv",
//         price_before_discount: 30,
//         price_after_discount: 15,
//         "img": "Courses-60699ee5edf8f.jpg",
//         "description": "klkldec jejcec ecechelhc ejlehlch ehclehc lhelche chehce cheche cehlche hcle chelhcle hclehlc ehciehc h",
//         "date": "2021-03-29",
//         "instructors_id": 5,
//         "sections_courses_id": 1,
//         "created_at": null,
//         "updated_at": null,
//         "img_path": "http://127.0.0.1:8000/uploads/Coursess/Courses-60699ee5edf8f.jpg"

//         "instructor_first_name": "alaa",
//         "instructor_second_name": "tarek",
//         "instructor_last_name": "alaaa",
// "instructor_img": "http://127.0.0.1:8000/uploads/Ps_instructors/img/Ps_instructor-606afe21bf899.jpg",
// "nameSection": "ali",

// }



// {
//   id: "sdvsdbcx",
//     basketItems: [

//       {
//         id: 0,
//         date: string,
//         description: string,
//         img_path: string,
//         instructors_id: number,
//         name: string,
//         price_after_discount: number,
//         price_before_discount: number,
//         sections_courses_id: number,
//         instructor_first_name: string,
//         instructor_second_name: string,
//         instructor_last_name: string,
//         instructor_img: string,
//         nameSection: string,
//         created_at: string,
//       },
//       {
//         id: 0,
//         date: "",
//         description: "",
//         img_path: "",
//         instructors_id: "",
//         name: "",
//         price_after_discount: number,
//         price_before_discount: number,
//         sections_courses_id: number,
//         instructor_first_name: string,
//         instructor_second_name: string,
//         instructor_last_name: string,
//         instructor_img: string,
//         nameSection: string,
//         created_at: string,
//       },
//     ]
// }